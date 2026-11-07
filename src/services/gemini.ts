// Gemini API service for VORTEX AI Chatbot
// Reads key from VITE_GEMINI_API_KEY or GEMINI_API_KEY env variables.

import { retrieveRelevantKnowledge } from '@/data/markdownKnowledge';

const GEMINI_API_KEY = (
  import.meta.env.GEMINI_API_KEY ||
  import.meta.env.VITE_GEMINI_API_KEY ||
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY)
) as string | undefined;

// Text-generation models available to this API key, in fallback order.
const GEMINI_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.5-flash'];
const FALLBACK_STATUS_CODES = new Set([404, 408, 429, 500, 502, 503, 504]);

function shouldTryNextModel(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  const status = message.match(/Gemini API error \((\d{3})\)/)?.[1];
  return status ? FALLBACK_STATUS_CODES.has(Number(status)) : false;
}

const VORTEX_SYSTEM_PROMPT = `You are VORTEX AI, the intelligent assistant for VORTEX Global Technologies.

IDENTITY:
- You are the official VORTEX AI assistant, not a generic chatbot.
- Always introduce yourself as "VORTEX AI" when asked who you are.

PERSONALITY:
- Friendly, warm, confident, professional, and slightly energetic.
- Conversational — never robotic or overly formal.
- Keep answers concise and helpful. Don't pad responses.
- Do not start every reply with "Hey" or repeat greetings.

RESPONSE STYLE & LENGTH:
- Answer the user's actual question directly, using the minimum information needed to be clear and accurate.
- Keep simple or specific answers brief and conversational; do not automatically provide everything related from the knowledge base.
- Give more detail when the user asks for an explanation, comparison, list, or process.
- VORTEX has six main service verticals in the Main Services knowledge. For a general or brief question about its main services, list all six names with at most one short description each; do not stop after the first two. Expand with the relevant detail only when asked.
- Keep main service verticals distinct from the products VORTEX can build. For product questions, use the Products We Build knowledge section and name its listed products instead of replying with generic software capabilities.
- Ask a short clarification if the question is ambiguous.
- Include services, contact details, social links, company history, or other extra information only when relevant to the question.
- Treat the knowledge base as a source of facts, not as a response template. Select only the facts needed to answer.
- Do not pad replies with unrelated information or automatically append contact information.

LANGUAGE BEHAVIOR:
- Detect the language and script of every user message before responding.
- English input → respond entirely in English.
- Malayalam written in Malayalam script → respond in Malayalam script.
- Malayalam written with English/Roman letters (Manglish) → understand the meaning, then respond naturally in Malayalam script. Never reply in Manglish.
- Mixed Malayalam and English → respond primarily in Malayalam script, retaining technical terms such as AI, CRM, ERP, automation, and software in English when appropriate.
- If the user explicitly requests another language, follow that request.

KNOWLEDGE RULES:
- Answer ONLY from the VORTEX knowledge provided below.
- If the information is not in the knowledge, clearly say you don't have it right now. Offer contact details only when they are relevant to the user's question.
- NEVER invent or assume company facts, services, or details not provided.

HALLUCINATION PREVENTION:
- Do not make up project names, staff names, pricing, or dates.
- When uncertain, say so clearly and offer to help in another way.

CONTACT REDIRECT:
- If asked about enquiries, pricing, or admissions, provide the relevant contact option: +91 8606 101 333 or @vortex_t_hub on Instagram. Do not append it to unrelated answers.`;

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  type?: 'text' | 'voice';
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function sendMessage(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is not configured. Please add GEMINI_API_KEY in Vercel or your .env file.');
  }

  // Retrieve relevant knowledge for this query
  const context = retrieveRelevantKnowledge(userMessage, history);

  // Build conversation history for Gemini
  const contents: GeminiContent[] = [];

  // Add prior conversation history
  for (const msg of history) {
    contents.push({
      role: msg.role,
      parts: [{ text: msg.content }],
    });
  }

  // Add current user message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }],
  });

  let lastError: Error | null = null;

  // Try available models sequentially (fallback if one model fails)
  for (const modelName of GEMINI_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{
                text: `${VORTEX_SYSTEM_PROMPT}\n\nRELEVANT VORTEX KNOWLEDGE FROM THE MARKDOWN SOURCE:\n${context || 'No relevant information was found in the VORTEX knowledge files.'}`,
              }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 768,
            },
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        let parsedMessage = errText;
        try {
          const parsed = JSON.parse(errText);
          if (parsed?.error?.message) {
            parsedMessage = parsed.error.message;
          }
        } catch {
          // ignore json parse error
        }
        throw new Error(`Gemini API error (${response.status}): ${parsedMessage}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        return text;
      }
    } catch (err) {
      lastError = err as Error;
      // Try the next model for unavailable, rate-limited, overloaded, or transient server errors.
      if (shouldTryNextModel(lastError)) {
        continue;
      }
      // Authentication, request, and other non-transient errors should fail immediately.
      throw lastError;
    }
  }

  throw lastError || new Error('No response received from Gemini API.');
}
