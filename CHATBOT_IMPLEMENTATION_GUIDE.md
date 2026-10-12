# VOXI Chat — Implementation and Porting Guide

This document describes how the chatbot currently works in the VORTEX website and how to reproduce the same feature set in another project. Its behavior and configuration details are derived from the TypeScript source files. It describes how the code loads and searches the Markdown knowledge source, but does not rely on the contents of knowledge documents or product-planning documents.

## 1. Feature overview

The chatbot has two independent conversation modes:

| Mode | Input | Model/API | Output |
| --- | --- | --- | --- |
| Text chat | Typed text | Gemini `generateContent` REST API | Text response |
| Voice chat | Live microphone audio | Gemini Live WebSocket API | Generated audio plus input/output transcripts |

Voice mode does **not** run the text model and then read its answer using browser text-to-speech. Gemini Live hears and responds with generated audio directly. The transcript is separately added to the chat UI.

The UI is a floating launcher that opens a right-side, full-height chat panel. Messages persist in browser `localStorage` and can be cleared by the user.

## 2. Project layout

```text
src/
├── components/chatbot/
│   ├── VortexChatbot.tsx  # App-level launcher/open state
│   ├── ChatButton.tsx     # Floating chatbot logo button
│   ├── ChatWindow.tsx     # Chat state, text/voice orchestration, history
│   ├── ChatMessages.tsx   # Message list and text loading animation
│   ├── ChatMessage.tsx    # Individual message bubble
│   ├── ChatInput.tsx      # Text input, send and microphone controls
│   └── chatbot.css        # Panel, messages and responsive styling
├── services/
│   ├── gemini.ts          # Text request, prompt and model fallback
│   └── geminiLive.ts      # Live audio session, PCM conversion and playback
└── data/
    └── markdownKnowledge.ts # Markdown discovery, indexing and retrieval

MarkDowns/VORTEX_KNOWLEDGE/*.md # Source of business facts
public/chatbot-icon.png        # Assistant logo used in the interface
```

`VortexChatbot` is mounted once at the application root (`src/App.tsx`), so the assistant is available across pages. The component stores whether the panel is open. `ChatWindow` owns the conversation and closes any active voice session when dismissed or unmounted.

## 3. Text chat flow

```text
User types a message
        ↓
ChatInput calls ChatWindow.handleSend
        ↓
ChatWindow adds the user message and sets loading state
        ↓
sendMessage(message, previous messages)
        ↓
retrieveRelevantKnowledge(message, history)
        ↓
Gemini generateContent with system prompt + relevant knowledge + history
        ↓
ChatWindow adds the model response
        ↓
Chat history is saved to localStorage
```

### Request details

`src/services/gemini.ts`:

1. Reads the Gemini key from the configured environment variable.
2. Retrieves relevant knowledge for the current query, including follow-up context.
3. Sends up to the supplied chat history and the current user message as `contents`.
4. Adds the persona, language, concise-response and factuality rules as `system_instruction`.
5. Sends only the retrieved knowledge snippets rather than every Markdown file.
6. Sets `temperature: 0.7` and `maxOutputTokens: 768`.
7. Extracts the first candidate's text and returns it to the UI.

Typed responses are text-only. This path does not synthesize audio.

### Current text model order

The configured order in `src/services/gemini.ts` is:

1. `gemini-3.1-flash-lite`
2. `gemini-3.5-flash`

The second model is tried when the first returns one of these HTTP status codes: `404`, `408`, `429`, `500`, `502`, `503`, or `504`. Other errors (for example, invalid credentials or malformed requests) fail immediately. If all configured models fail, the last error is reported.

These are the model IDs configured in this project, **not a guarantee that they are enabled for another API key**. Before porting, check the target key's available models and supported methods in Google AI Studio / the Gemini API. Update the fallback list to models that support `generateContent` for that key.

## 4. Knowledge base and retrieval

The source data lives in `MarkDowns/VORTEX_KNOWLEDGE/`. The chatbot does not send the whole folder with every text question.

### How indexing works

`src/data/markdownKnowledge.ts` uses Vite's eager raw Markdown glob import:

```ts
import.meta.glob('/MarkDowns/VORTEX_KNOWLEDGE/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});
```

The Markdown is split into sections based on headings. Each section retains its source filename and heading path. The chatbot excludes the internal chatbot PRD from answers.

### How retrieval works

1. Normalize query text to lowercase and remove punctuation while retaining Unicode letters and numbers.
2. Check topic aliases (English, Malayalam script and Manglish phrases) for known categories such as services, products, institute and locations.
3. Detect follow-up questions such as “tell me more” and combine them with the last substantive user question in the conversation history.
4. Tokenize the query, ignore common stop words and score sections for matching terms and topic hints.
5. Return a small set of the highest scoring sections, up to four sections and approximately 5,000 characters.
6. Special handling keeps general service questions focused on the six main service headings and product questions focused on the “Products We Build” section.

This is lightweight keyword/topic retrieval, **not embeddings or vector search**. For another project, the same approach works well for a small and structured knowledge base. A larger corpus may need chunking, embeddings and a vector store.

### Add or change knowledge

Add verified `.md` files under the knowledge directory. New files are discovered by the glob at build time. For reliable retrieval, use clear headings and plain language. If a topic needs strong matching or a specialized response rule, add its aliases and scoring hints in `TOPIC_HINTS`. Keep internal prompts or implementation notes outside the answerable knowledge corpus or explicitly excluded.

## 5. Voice chat flow

```text
User presses microphone
        ↓
VoiceSession creates/resumes audio contexts and requests microphone access
        ↓
Connects WebSocket to Gemini Live and sends setup
        ↓
Waits for setupComplete
        ↓
Streams microphone PCM audio in realtimeInput messages
        ↓
Gemini Live detects speech, responds with native audio and transcript events
        ↓
Audio chunks are queued and played in order
        ↓
Input and output transcripts are appended to the chat history
```

### Current voice model and voice

- Live model: `gemini-3.8-live`
- Prebuilt voice: `Achird`
- Input audio target: mono raw PCM, 16 kHz, signed 16-bit little-endian
- Output audio: raw PCM, 24 kHz
- WebSocket endpoint: Gemini `v1beta` `BidiGenerateContent`

The voice setup requests `responseModalities: ['AUDIO']`, a `speechConfig` with Achird, plus both `inputAudioTranscription` and `outputAudioTranscription` so spoken turns also appear in the message list. The system prompt is sent with the session setup.

### Browser audio processing

`src/services/geminiLive.ts` currently:

1. Resumes input and playback `AudioContext`s from the microphone click handler, helping satisfy browser autoplay rules.
2. Requests microphone access with echo cancellation, noise suppression and automatic gain control.
3. Opens a WebSocket and waits for Gemini's `setupComplete` before sending audio.
4. Uses a `ScriptProcessorNode` to read microphone samples. It downsamples to 16 kHz when necessary, clamps/encodes samples as Int16 PCM, base64-encodes them and sends JSON `realtimeInput.audio` messages.
5. Parses string, `ArrayBuffer` and `Blob` WebSocket messages. It handles setup acknowledgements, API errors, server content, transcripts, audio and interruptions.
6. Decodes output PCM chunks into floats, queues them and plays them sequentially through an `AudioContext` at 24 kHz.
7. Buffers transcript fragments and appends them to the UI as user/model messages after a turn completes.
8. Stops the mic tracks, audio nodes, audio contexts and WebSocket when the user stops voice mode, closes the chat or an error occurs.

The UI displays connecting, listening and speaking states. The microphone button ends the voice session. The browser Web Speech API and `speechSynthesis` are not part of the current voice path.

### Voice knowledge context limitation

Unlike text chat's per-question retrieval, voice mode cannot inspect a completed transcript and then fetch a new knowledge snippet before the model starts answering: it streams audio directly to Gemini Live. At session setup, it builds a bounded context by retrieving representative snippets for company, services, products, institute, learning features, locations and contact, then adds recent chat history. This allows grounded answers on those common topics but is less precise than query-specific retrieval. To scale voice knowledge, consider Live API function calling that invokes a secure retrieval backend after the user asks a question.

## 6. Language and response behavior

The text system prompt currently instructs the assistant to:

- Respond in English to English.
- Respond in Malayalam script to Malayalam and Manglish input; do not answer Manglish in Roman letters.
- For mixed language, primarily use Malayalam while retaining technical terms such as AI, CRM and ERP in English.
- Be concise by default and expand only when requested.
- Keep the six main services distinct from the software products it can build.
- Use company facts only from retrieved knowledge and say when a fact is unavailable.

The Live voice prompt includes similar response and language constraints. Native audio models detect and speak languages automatically; prompts steer which language/script to use, while the optional output transcript is displayed in the chat UI. Test each target language and code-switching behavior with the exact model and voice before shipping.

## 7. Conversation state and UI behavior

- Message shape: `{ id, role: 'user' | 'model', content, timestamp, type?: 'text' | 'voice' }`.
- Text history is read from and written to `localStorage` under `vortex-ai-chat-history`.
- The text path sends the last 20 existing messages as model history.
- Voice mode sends the last 20 existing messages as textual session context.
- The **Clear all chat** action clears React state and removes the local storage item.
- Text loading and voice connection/listening/speaking states are separate.
- The assistant is mounted once in the root app; the launcher opens a responsive right-side panel.
- Voice session cleanup runs on stop, close, unmount and service failure.

Local storage is per browser/device and is not a server-side account history. Do not put secrets or sensitive user data in the conversation by default.

## 8. Error handling

### Text mode

- Missing API key is reported as configuration guidance.
- Network failures get a connection message.
- Selected transient/model availability errors attempt the next model.
- Authentication, invalid request and other non-fallback errors are shown rather than silently switching.

### Voice mode

- Microphone permission denial gets an actionable message.
- Audio-context, WebSocket and server API errors are surfaced in the chat error banner.
- Malformed/unsupported WebSocket frames are logged and surfaced as a voice response decoding error.
- Cleanup runs on failure to release the microphone and audio resources.

## 9. Porting this to another project

### Step 1: Identify the destination stack

Decide whether the new app is React/browser-only, has a backend, or uses another frontend framework. Keep UI, text model, retrieval and Live audio concerns separated even if filenames differ.

### Step 2: Create an answerable knowledge source

Move the new project's verified information into Markdown or another maintainable source. Split it by clear topics, define what the model may answer, and add a reliable “unknown” behavior. Do not copy the VORTEX facts or company-specific prompt into the other project.

### Step 3: Add query-time retrieval for text

Port or replace the topic/keyword scorer. Test broad questions, aliases, misspellings, multilingual queries, follow-ups and questions with no matching information. Send only selected snippets alongside recent chat history.

### Step 4: Implement the text service

Create a provider service that accepts `{ message, history, retrievedContext }`, calls a model supported by the destination API key, parses the response, and normalizes errors. Configure a tested ordered list of model IDs. Retry only when the failure is plausibly transient or indicates an unavailable/rate-limited model; do not retry invalid keys or malformed requests across every model.

### Step 5: Add voice as an independent path

Use a Gemini Live-capable model and the current official Live API schema. Set up WebSocket, audio formats and a voice choice. On the browser, request mic permission, stream correctly encoded PCM after setup completes, play output chunks in order, capture transcripts, handle interruption, and release all resources. Keep a voice UI state machine and an explicit stop action.

### Step 6: Connect both modes to a shared conversation UI

Use a common message format with role, text, timestamp and input type. Route typed input to text generation and microphone input to Live. Show generated audio's transcript when available. Persist only what the product needs and provide a clear-history control.

### Step 7: Secure it before deployment

Use backend endpoints for text generation and short-lived/ephemeral Live credentials when supported. Apply origin checks, rate limits, request size limits and abuse controls. Keep provider secrets server-side. Never commit `.env` files or paste keys into source code.

### Step 8: Verify in the target environment

Try a successful text request; each configured fallback model; invalid/expired key; rate limit; no matching knowledge; follow-up questions; microphone denial; browser with autoplay restrictions; English and target languages; interruption; disconnect; refresh; stop/close during playback; mobile layout. Verify actual model availability for the destination key rather than assuming the VORTEX model list carries over.

## 10. Security and deployment caveat

**The current VORTEX implementation reads the API key in frontend code and sends it directly from the browser.** In a Vite app, any `VITE_*` or otherwise inlined client-side key can be extracted from the built application or network requests. This is acceptable only for controlled local experiments with a restricted key; it is not safe for a public production site.

For a production implementation in another project:

```text
Browser ──HTTPS──> Your backend ──> Gemini generateContent
Browser ──ephemeral credential / approved Live proxy──> Gemini Live
```

Keep permanent keys on the server, apply quotas and rate limits, and use Gemini's current recommended ephemeral-token flow for client-to-server Live connections where available. Do not copy the VORTEX browser-key arrangement as a security template.

## 11. Current configuration summary

```text
Text model order: gemini-3.1-flash-lite → gemini-3.5-flash
Text API:         v1beta generateContent
Voice model:      gemini-3.8-live
Voice:            Achird
Voice API:        v1beta BidiGenerateContent WebSocket
Mic audio:        PCM 16 kHz, mono, Int16
Speaker audio:    PCM 24 kHz
Knowledge:        Markdown + topic aliases + keyword scoring
History:          localStorage, last 20 turns provided to model/session
```

Model IDs, feature support, quotas, prices and account access can change or vary by API key/project. Treat the model names above as this repository's current configuration and verify them for the destination project.

## 12. Key source files

- `src/services/gemini.ts` — text prompts, request structure and model fallback.
- `src/services/geminiLive.ts` — Live API setup, PCM audio, transcripts and cleanup.
- `src/data/markdownKnowledge.ts` — Markdown loading, topic aliases and retrieval logic.
- `src/components/chatbot/ChatWindow.tsx` — conversation history and mode orchestration.
- `src/components/chatbot/ChatInput.tsx` — text/microphone controls and disabled states.
- `MarkDowns/VORTEX_KNOWLEDGE/` — answerable company information.

