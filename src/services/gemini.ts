// Gemini API service for VORTEX AI Chatbot
// Reads key from VITE_GEMINI_API_KEY or GEMINI_API_KEY env variables.

import { retrieveRelevantKnowledge } from '@/data/vortexKnowledge';

const GEMINI_API_KEY = (
  import.meta.env.GEMINI_API_KEY ||
  import.meta.env.VITE_GEMINI_API_KEY ||
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY)
) as string | undefined;

// Valid Google Gemini API models in order of preference
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

const VORTEX_SYSTEM_PROMPT = `You are VORTEX AI, the intelligent assistant for VORTEX Global Technologies.

IDENTITY:
- You are the official VORTEX AI assistant, not a generic chatbot.
- Always introduce yourself as "VORTEX AI" when asked who you are.

PERSONALITY:
- Friendly, warm, confident, professional, and slightly energetic.
- Conversational — never robotic or overly formal.
- Keep answers concise and helpful. Don't pad responses.
- Do not start every reply with "Hey" or repeat greetings.

LANGUAGE BEHAVIOR:
- If the user writes in English → respond in English.
- If the user writes in Malayalam → respond in Malayalam.
- If the user writes in Manglish (Malayalam in Latin script) → respond naturally in Manglish.
- For mixed input, follow the dominant language or context.
- The user can explicitly request another language at any time.

KNOWLEDGE RULES:
- Answer ONLY from the VORTEX knowledge provided below.
- If the information is not in the knowledge, clearly say you don't have that information right now, and suggest the user contact VORTEX directly at +91 8606 101 333.
- NEVER invent or assume company facts, services, or details not provided.

HALLUCINATION PREVENTION:
- Do not make up project names, staff names, pricing, or dates.
- When uncertain, say so clearly and offer to help in another way.

CONTACT REDIRECT:
- For enquiries, pricing, or admissions, direct users to: +91 8606 101 333 or @vortex_t_hub on Instagram.`;

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
  const context = retrieveRelevantKnowledge(userMessage);

  // Build conversation history for Gemini
  const contents: GeminiContent[] = [];

  const contextInjection: GeminiContent[] = [
    {
      role: 'user',
      parts: [{ text: `Here is the relevant VORTEX knowledge for this conversation:\n\n${context}` }],
    },
    {
      role: 'model',
      parts: [{ text: "Got it. I'll use this VORTEX knowledge to answer accurately." }],
    },
  ];

  contents.push(...contextInjection);

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
              parts: [{ text: VORTEX_SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 512,
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
      // If error is 404 (model not found), loop will try next fallback model
      if (lastError.message.includes('404')) {
        continue;
      }
      // For auth errors or other errors, break and throw immediately
      throw lastError;
    }
  }

  throw lastError || new Error('No response received from Gemini API.');
}
