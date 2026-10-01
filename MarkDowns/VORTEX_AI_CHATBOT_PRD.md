# VORTEX AI Chatbot — Product Requirements Document

**Status:** Draft  
**Project:** VORTEX Website  
**Feature:** VORTEX AI Voice & Chat Assistant

## 1. Product Overview

A floating AI assistant available across the entire VORTEX website.

Visitors can:
- Ask questions about VORTEX, its services, projects, technology and contact information.
- Type in English, Malayalam or Manglish.
- Speak using a microphone.
- Receive text and spoken responses.
- Have natural, conversational interactions.

The assistant should behave like a knowledgeable VORTEX team member while remaining transparent that it is an AI assistant.

## 2. Goals

1. Make VORTEX information easy to discover.
2. Provide a modern AI experience.
3. Support English, Malayalam and Manglish.
4. Support text and voice conversations.
5. Make responses natural and human-like.
6. Keep responses grounded in verified VORTEX information.
7. Protect Gemini credentials.
8. Keep the implementation scalable and maintainable.



## Knowledge Retrieval

The chatbot should use the VORTEX knowledge folder located at:

`MarkDowns/VORTEX_KNOWLEDGE/`

as its primary source of company information.

When a user asks a question:

1. Analyze the user's question and identify the relevant topic or intent.
2. Search the VORTEX knowledge folder for the most relevant information related to the user's question.
3. Retrieve only the relevant content needed to answer the question.
4. Provide the retrieved information as context to Gemini.
5. Generate a natural and helpful response based on the retrieved VORTEX information.
6. If the required information cannot be found in the knowledge base, the chatbot should not invent or assume an answer. It should clearly say that the information is not currently available.

The chatbot should search the knowledge folder dynamically based on the user's input rather than relying on specific filenames.

New knowledge files can be added to `MarkDowns/VORTEX_KNOWLEDGE/` at any time, and the retrieval system should be able to use the relevant information from them.

The chatbot should not send the entire knowledge folder to Gemini for every question. Only relevant information should be retrieved and provided as context to reduce unnecessary token usage and improve response accuracy.

## 3. User Experience

### Floating Assistant
- Fixed bottom-right position.
- Available across the whole website.
- VORTEX-branded icon.
- Does not block important content.
- Responsive on desktop and mobile.

### Chat Panel
Should contain:
- VORTEX AI identity.
- Conversation area.
- User and AI messages.
- Text input.
- Send button.
- Microphone button.
- Listening/speaking indicators.
- Loading state.
- Error state.
- Close button.

### Voice Flow

User opens chatbot → presses microphone → grants permission → speaks → Gemini processes audio → AI responds → response is played through the user's speakers/headphones.

Where supported, users should be able to interrupt the assistant.

## 4. Language Requirements

Supported:
- English text
- Malayalam text
- Manglish text
- English speech
- Malayalam speech
- Mixed-language speech where supported

Rules:
- English input → English response.
- Malayalam input → Malayalam response.
- Manglish input → natural Manglish response when appropriate.
- Mixed input → follow the dominant language/context.
- User can explicitly request another language.

Manglish means Malayalam expressed using Latin characters, for example:
`Vortex entha cheyyunne?`

## 5. AI Personality

The assistant should feel:
- Friendly
- Warm
- Confident
- Professional
- Modern
- Helpful
- Conversational
- Slightly energetic

Avoid:
- Robotic wording.
- Excessive formality.
- Repeated greetings.
- Unnecessarily long answers.
- Fake claims about emotions or experiences.
- Invented VORTEX information.

Example style:

**User:** `Vortex entha cheyyunne?`

**Assistant:** `VORTEX AI, automation, and modern technology solutions build cheyyunna company aanu. Ningalkku services-ne kurichaano ariyendath, atho VORTEX projects-ne kurichaano?`

Final personality will be refined from the company information supplied later.

## 6. VORTEX Knowledge

The assistant must primarily answer from verified VORTEX information.

Initial categories:

```text
company
services
projects
technology
solutions
training
faq
contact
```

If information is unavailable, the assistant must say so instead of inventing an answer.

### Initial knowledge structure

```text
ai/
├── knowledge/
│   ├── company.md
│   ├── services.md
│   ├── projects.md
│   ├── technology.md
│   ├── training.md
│   ├── faq.md
│   └── contact.md
└── prompts/
    └── vortex-system-prompt.md
```

Start with structured knowledge. Introduce RAG/vector search only if the knowledge base becomes large enough to justify it.

## 7. Gemini Integration

Google Gemini API is the primary AI provider.

Potential split:
- Gemini API for normal text chat.
- Gemini Live API for real-time voice conversations.

The exact model should be selected during implementation based on current availability, latency, language support, voice quality, limits and cost.

Do not hard-code a model choice in this PRD until testing.

## 8. Security

The Gemini API key must never be exposed directly in the React client.

Preferred architecture:

```text
Browser
   ↓
VORTEX Backend
   ↓
Gemini API
```

Use environment variables, for example:

```env
GEMINI_API_KEY=your_key_here
```

For browser-based Live API connections, use the currently recommended secure authentication mechanism, including short-lived/ephemeral credentials where applicable.

Never commit secrets to Git.

## 9. Voice Experience

Target voice characteristics:
- Natural
- Warm
- Conversational
- Clear
- Moderately paced
- Professional
- Slightly energetic

Avoid constant excitement or an obviously synthetic delivery.

The system prompt should describe desired conversational behavior and the selected Gemini voice should be tested for Malayalam, English and mixed-language quality.


## 9. Chat History Persistence

The chatbot should preserve the user's conversation history locally so that refreshing the website does not clear the chat.

### Requirements

- Save chat messages in the browser's `localStorage`.
- Restore the previous conversation when the chatbot is opened after a page refresh.
- Preserve both user and AI messages.
- Keep the most recent conversation available automatically.
- Do not send locally stored chat history to Gemini unless it is intentionally included as conversation context.
- Do not store sensitive information unnecessarily.
- Provide a clear **Clear Chat / Delete History** option.
- If localStorage is unavailable, the chatbot should continue working in the current session without crashing.

### Suggested Storage Structure

```js
localStorage.setItem(
  "vortex-ai-chat-history",
  JSON.stringify(messages)
);
```

Example message structure:

```js
{
  id: "unique-id",
  role: "user",
  content: "What does VORTEX do?",
  timestamp: 1727430000000
}
```

### Privacy

Chat history is stored locally in the user's browser. It should not automatically be uploaded to a VORTEX database.

Users should be able to clear their locally stored history at any time.


## 10. Error Handling

### API error
`Something went wrong. Please try again.`

### Microphone denied
`Microphone access is required for voice conversations. You can continue using text chat.`

### Network failure
`Connection lost. Please check your internet connection and try again.`

### Unknown VORTEX information
The assistant must clearly state that it does not currently have the information.

## 11. Performance

Goals:
- Fast chatbot opening.
- Low perceived response latency.
- Streaming responses where supported.
- Do not load heavy voice functionality until needed where practical.
- Do not noticeably slow the main website.

## 12. Accessibility

Support:
- Keyboard navigation.
- Screen readers.
- Visible focus states.
- Accessible button labels.
- Clear microphone status.
- Adequate contrast.
- Mobile-friendly controls.

## 13. Responsive Behavior

### Desktop
Floating bottom-right chatbot.

### Tablet
Chat panel scales to the viewport.

### Mobile
Chat panel can become a near/full-screen experience with an obvious close control.

## 14. Development Phases

### Phase 1 — Text Chat
- Floating button.
- Chat window.
- Gemini connection.
- VORTEX system prompt.
- VORTEX knowledge.
- English/Malayalam/Manglish text support.

### Phase 2 — Voice
- Microphone input.
- Gemini Live API.
- Real-time audio.
- Voice response.
- Listening/speaking states.
- Interruption handling where supported.

### Phase 3 — Human-Like Experience
- Refined VORTEX personality.
- Natural response length.
- Better greetings.
- Context-aware follow-ups.
- Voice tuning.

### Phase 4 — VORTEX Actions
Potential actions:
- Navigate to Services.
- Navigate to About.
- Navigate to Contact.
- Open enquiry form.
- Explain a specific service.
- Provide contact information.

### Phase 5 — RAG
Only if required:
- Knowledge ingestion.
- Chunking.
- Embeddings.
- Vector database.
- Retrieval.
- Grounded responses.

## 15. Future Knowledge Inputs

The following information will be supplied and added incrementally.

### Company
- Official description
- Mission
- Vision
- Values
- History
- Location
- Team

### Services
- Complete service list
- Service descriptions
- Target customers
- Technologies
- FAQs

### Projects
- Project names
- Descriptions
- Technologies
- Industries
- Outcomes/capabilities

### Training / Education
- Programs
- Courses
- Audience
- Duration
- Curriculum
- Certification
- Enquiry process

### Contact
- Phone
- Email
- Address
- Social links
- Business hours
- Enquiry process

### FAQ
- Common questions
- Preferred answers
- Questions that should be redirected or refused

## 16. Testing

Test:
- English text
- Malayalam text
- Manglish text
- English voice
- Malayalam voice
- Mixed-language voice
- Desktop
- Mobile
- Microphone denied
- API failure
- Network failure
- Unknown questions
- Hallucination attempts
- Long conversations
- Rapid language switching

## 17. Success Criteria

The feature is successful when:
- The assistant is available across the whole website.
- Users can ask about VORTEX in English, Malayalam and Manglish.
- Voice input works.
- Voice responses work.
- Answers are accurate and grounded in VORTEX information.
- The assistant does not invent company facts.
- The interaction feels natural rather than robotic.
- Gemini credentials remain secure.
- Website performance is not noticeably affected.

## 18. Final System Prompt

A production system prompt will be created after all VORTEX company information is supplied.

It will define:
1. VORTEX identity.
2. Knowledge boundaries.
3. Personality.
4. Language behavior.
5. Manglish behavior.
6. Voice behavior.
7. Response length.
8. Hallucination prevention.
9. Contact/enquiry behavior.
10. Safety and privacy rules.

## 19. Implementation Checklist

### UI
- [ ] Floating chatbot button
- [ ] Chat panel
- [ ] Responsive layout
- [ ] Message bubbles
- [ ] Text input
- [ ] Send button
- [ ] Microphone button
- [ ] Voice state UI
- [ ] Loading state
- [ ] Error state

### AI
- [ ] Gemini API integration
- [ ] System prompt
- [ ] VORTEX knowledge
- [ ] Language handling
- [ ] Manglish handling
- [ ] Personality tuning

### Voice
- [ ] Gemini Live integration
- [ ] Microphone permission
- [ ] Audio streaming
- [ ] Audio playback
- [ ] Speaking state
- [ ] Listening state
- [ ] Interruption handling

### Security
- [ ] API key protection
- [ ] Backend endpoint
- [ ] Rate limiting
- [ ] Environment variables
- [ ] Abuse protection

### Final Testing
- [ ] English
- [ ] Malayalam
- [ ] Manglish
- [ ] Voice
- [ ] Mobile
- [ ] Desktop
- [ ] Error handling
- [ ] Knowledge accuracy

## 20. Change Log

| Date | Change |
|---|---|
| 2026-09-27 | Initial VORTEX AI Chatbot PRD created. |


## 4.1 Detailed Chatbot UI Specification

The chatbot should open as an interactive panel over the existing website rather than navigating the user to a separate chatbot page.

### Desktop UI

- Floating chatbot button remains fixed at the bottom-right of the viewport.
- Clicking the button smoothly expands the chatbot panel from the floating button.
- Recommended desktop width: approximately 380–420px.
- Use large rounded corners, approximately 24px.
- Use a subtle shadow and clean spacing.
- The panel should feel like a premium VORTEX assistant rather than a separate website.
- Recommended visual direction:
  - White/light primary surface.
  - VORTEX purple/indigo as the main accent.
  - VORTEX yellow as a secondary accent.
  - Subtle borders and shadows.
- The chatbot should remain visually consistent with the existing VORTEX website design.

### Mobile UI

- The chatbot should adapt to small screens.
- On mobile, the panel can expand to an almost full-screen experience.
- The close button must remain clearly visible.
- Input and microphone controls must remain easy to access.

### Chat Opening / Closing

Initial state:

```text
Website
                         [ VORTEX AI ]
```

After clicking:

```text
┌──────────────────────────┐
│ VORTEX AI             ✕  │
├──────────────────────────┤
│                          │
│ Hey 👋                   │
│ How can I help you?      │
│                          │
│ [ Our Services ]         │
│ [ Our Projects ]         │
│ [ About VORTEX ]         │
│                          │
│ Conversation messages    │
│                          │
├──────────────────────────┤
│ 🎙 Type your message  ➤ │
└──────────────────────────┘
```

The opening and closing transition should be smooth and lightweight.

### Quick Actions

The initial chatbot experience may show contextual quick-action buttons such as:

- Our Services
- Our Projects
- About VORTEX
- Contact VORTEX

These should send a predefined user query into the conversation rather than creating separate chatbot logic.

### Voice Mode

Voice interaction should happen inside the same chatbot component.

Listening state:

```text
┌──────────────────────────┐
│                          │
│      🔵 Listening...     │
│                          │
│       Speak to VORTEX    │
│                          │
│           🎙             │
│                          │
└──────────────────────────┘
```

Speaking state:

```text
┌──────────────────────────┐
│                          │
│       🔊 VORTEX AI       │
│                          │
│        ● ● ● ●           │
│         Speaking...      │
│                          │
└──────────────────────────┘
```

Voice mode should not navigate to another page or require a separate chatbot screen.

### Suggested React Component Structure

```text
src/
├── components/
│   └── chatbot/
│       ├── VortexChatbot.jsx
│       ├── ChatButton.jsx
│       ├── ChatWindow.jsx
│       ├── ChatMessages.jsx
│       ├── ChatInput.jsx
│       ├── VoiceControls.jsx
│       └── ChatMessage.jsx
│
├── services/
│   └── gemini.js
│
├── data/
│   └── markdownKnowledge.ts
└── MarkDowns/
    └── VORTEX_KNOWLEDGE/
        └── *.md
```

`VortexChatbot` should be mounted at the application/root level so the floating assistant is available across the entire website without needing to add it separately to every page section.

### Interaction Model

```text
User visits website
       ↓
Floating VORTEX AI button
       ↓
User clicks button
       ↓
Chat panel expands
       ↓
User types OR speaks
       ↓
Gemini processes request
       ↓
VORTEX AI responds with text
       ↓
Optional voice playback
       ↓
Conversation saved locally
```

