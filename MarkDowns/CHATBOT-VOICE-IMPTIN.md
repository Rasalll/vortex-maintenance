# VORTEX Chatbot — Voice Interaction Implementation PRD

## 1. Purpose

This document defines the voice interaction layer for the existing VORTEX AI Chatbot.

The existing chatbot already supports:
- VORTEX-specific knowledge
- Text-based conversations
- Malayalam
- Manglish
- English
- Chat history persistence
- LocalStorage-based conversation history
- Existing chatbot UI and Gemini API integration

This PRD ONLY covers adding natural voice interaction.

Do not rebuild or replace the existing chatbot architecture unnecessarily.

---

# 2. Core Voice Behavior

The chatbot must support two different interaction modes.

### Mode A — Text Chat

When the user types a message:

User:
"Tell me about VORTEX Institute"

Chatbot:
Returns a normal TEXT response.

The chatbot must NOT automatically play a voice response.

---

### Mode B — Voice Chat

When the user uses the microphone:

User:
🎤 Speaks into microphone

The system:
1. Captures the user's voice.
2. Sends the audio through the voice interaction pipeline.
3. Understands the spoken language.
4. Uses the existing VORTEX knowledge/context.
5. Generates a response.
6. Returns the response as AUDIO.
7. Optionally displays the generated text transcript alongside the audio.

Example:

User speaks:
"Vortex institute-il entha courses ullath?"

Bot speaks:
"VORTEX Institute-il AI integrated learning programs und..."

The user should hear the response instead of only seeing text.

---

# 3. Language Requirements

Voice interaction must support:

- English
- Malayalam
- Manglish

Examples:

### English

User:
"What services does VORTEX provide?"

Bot:
Speaks an English response.

---

### Malayalam

User:
"വോർടെക്സിൽ എന്തൊക്കെ കോഴ്സുകൾ ഉണ്ട്?"

Bot:
Speaks the response in Malayalam.

---

### Manglish

User:
"Vortex institute-il ethokke course und?"

Bot:
Understands the Manglish input and responds naturally.

The system should determine the language from the user's input instead of requiring the user to manually select a language.

---

# 4. Voice Response Rule

The most important rule:

### INPUT TYPE determines OUTPUT TYPE.

| User Input | AI Output |
|---|---|
| Typed text | Text |
| Microphone / voice | Voice |
| Voice + transcript | Voice + optional text transcript |

Do NOT make every chatbot response voice-enabled.

If the user is typing, keep the experience as a normal text chatbot.

If the user starts a microphone interaction, switch the response to audio.

---

# 5. Gemini Live API

Use Gemini Live API for the voice interaction layer.

The Live API should be used for:

- Real-time audio input
- Real-time audio output
- Bidirectional communication
- Low-latency voice interaction
- Natural conversational responses
- Malayalam voice responses
- English voice responses
- Mixed-language conversations

The existing normal Gemini text API implementation should remain available for normal text chat.

The Live API is an additional voice layer, not a replacement for the entire chatbot.

---

# 6. Recommended Architecture

The chatbot should have two paths.

## Text Path

User
↓
Text Input
↓
Existing Gemini Chat Logic
↓
VORTEX Knowledge / Context
↓
Gemini
↓
Text Response
↓
Chat UI

---

## Voice Path

User
↓
Microphone
↓
Audio Stream
↓
Gemini Live API
↓
VORTEX Knowledge / Context
↓
Gemini
↓
Audio Response
↓
Speaker

Optional:

Audio Response
↓
Text Transcript
↓
Chat UI

---

# 7. Existing VORTEX Knowledge Must Remain

Voice responses must use the same VORTEX knowledge used by the existing chatbot.

The voice implementation must NOT create a separate knowledge base.

When a user asks:

"What courses does VORTEX offer?"

the voice assistant should use the existing VORTEX knowledge documents.

The system should continue checking the VORTEX knowledge source for relevant information before answering.

Knowledge should be sourced from the existing VORTEX knowledge folder:

`MarkDowns/VORTEX_KNOWLEDGE`

The voice implementation must dynamically use relevant information from this knowledge source when required.

Do not hardcode company information directly inside the voice component.

---

# 8. Voice Button

The existing floating chatbot button should continue to open the chatbot.

Inside the chatbot UI, provide a microphone button.

Example:

┌──────────────────────────────────┐
│ VORTEX AI                    ×   │
│                                  │
│  Hello! How can I help you?      │
│                                  │
│  User: What courses do you have? │
│                                  │
│  VORTEX: We offer...             │
│                                  │
│──────────────────────────────────│
│  Type a message...        🎤  ➤  │
└──────────────────────────────────┘

The microphone button should be clearly visible but should not dominate the UI.

---

# 9. Microphone States

The microphone button must have clear states.

### Idle

🎤

User can click to start speaking.

---

### Listening

The UI should clearly indicate that the chatbot is listening.

Example:

🔴 Listening...

Possible animation:
- Pulsing microphone
- Audio waveform
- Animated glow

---

### Processing

After the user stops speaking:

Processing...

The system processes the audio and prepares the response.

---

### Speaking

The chatbot should indicate that it is speaking.

Example:

🔊 VORTEX is speaking...

A subtle waveform animation can be displayed.

---

### Error

If microphone permission is denied or the connection fails:

"Unable to access your microphone. Please check your browser permissions."

Do not crash the chatbot.

---

# 10. Voice Conversation Flow

Example:

### Step 1

User opens chatbot.

### Step 2

User presses microphone.

### Step 3

Browser asks for microphone permission.

### Step 4

User speaks:

"Vortex institute-il enthokke courses und?"

### Step 5

Audio is streamed to Gemini Live API.

### Step 6

Gemini understands the user's Manglish.

### Step 7

Relevant VORTEX knowledge is used.

### Step 8

Gemini generates a natural response.

### Step 9

The response is returned as audio.

### Step 10

User hears:

"VORTEX Institute-il Creative Designing, Web Application Development, Mobile App Development..."

The UI may also show the text transcript.

---

# 11. Human-like Voice

The voice should NOT sound like a robotic text-to-speech system.

The goal is a natural conversational experience.

The AI personality should feel:

- Friendly
- Helpful
- Professional
- Natural
- Confident
- Slightly conversational
- Not overly formal

Avoid responses that sound like:

"According to the available information, VORTEX provides..."

Prefer:

"Yes! VORTEX has several programs. For example, there's Creative Designing, Web Development, Mobile App Development..."

However, the AI must not invent information just to sound conversational.

Natural tone must never override factual accuracy.

---

# 12. Malayalam Voice

Malayalam responses should sound natural and conversational.

Avoid unnecessarily translating Malayalam into English.

If the user speaks Malayalam, the assistant should normally respond in Malayalam.

Example:

User:
"വോർടെക്സിൽ എന്തൊക്കെ കോഴ്സുകൾ ഉണ്ട്?"

Response:
"VORTEX Institute-ൽ Creative Designing, Web Application Development, Mobile App Development തുടങ്ങി നിരവധി programs ഉണ്ട്."

---

# 13. Manglish Handling

Manglish is commonly typed/spoken Malayalam using English characters.

Examples:

- "entha courses ullath?"
- "vortex evide aanu?"
- "course duration ethra aanu?"
- "job placement undo?"

The chatbot should understand these naturally.

If the user speaks Manglish, the response language can be determined contextually.

Prefer Malayalam when the user's intent is clearly Malayalam.

Example:

User:
"vortex institute evideya?"

Response:
"VORTEX Institute Manjeri-il aanu."

The response can naturally mix English technical terms where appropriate.

---

# 14. Voice and Text Must Share Conversation Context

The conversation should remain continuous.

Example:

User types:

"What courses do you offer?"

Bot:
"We offer six major learning programs..."

Then user presses microphone and asks:

"Which one is best for web development?"

The voice interaction must understand that "which one" refers to the previously discussed courses.

Do NOT create a completely separate conversation context for voice.

---

# 15. Chat History

The existing LocalStorage chat history implementation must continue working.

Voice conversations should also be saved.

For a voice interaction, save at minimum:

- User transcript
- Assistant transcript
- Timestamp
- Message type

Example:

```js
{
  role: "user",
  content: "Vortex institute-il entha courses ullath?",
  type: "voice",
  timestamp: 123456789
}