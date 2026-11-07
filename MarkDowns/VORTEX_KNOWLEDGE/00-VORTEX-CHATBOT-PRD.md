# VORTEX AI Chatbot — Product Requirements Document

## 1. Overview

A website-wide AI chatbot for VORTEX that helps visitors understand the company, its services, learning programs, locations, and contact options.

The chatbot should primarily answer from VORTEX-provided company knowledge and should not invent unsupported company information.

## 2. Core Experience

- Floating chatbot button visible across the website.
- Fixed at the bottom-right of the screen.
- Clicking the button opens a dedicated chat panel/component.
- Users can type questions and receive conversational answers.
- Chat history persists in browser `localStorage`.
- Refreshing the page must not remove the user's chat history.
- Support desktop and mobile layouts.
- Responses should feel natural and conversational rather than robotic.

## 3. Languages

The chatbot should support:
- English
- Malayalam
- Manglish (Malayalam written using English characters)

The assistant should understand mixed-language questions where practical and respond naturally in the language/style used by the visitor.

## 4. Voice Interaction

Preferred experience:
- Microphone button for voice input.
- Speech-to-text converts the visitor's speech into a message.
- Chatbot generates its response.
- Text-to-speech reads the response aloud.
- Malayalam and English voice interaction should be supported where the selected browser/API capabilities allow it.

## 5. AI Provider

The planned AI provider is the Gemini API.

The implementation should keep the Gemini API key secure and must not expose a private server-side key directly in production frontend code.

## 6. Conversation Style

The chatbot should:
- Be friendly and natural.
- Use human-like conversational wording.
- Avoid unnecessarily long answers.
- Adapt tone to the visitor.
- Explain VORTEX services clearly.
- Ask a useful follow-up question when the visitor's request is unclear.
- Avoid pretending to know information that is not in the VORTEX knowledge base.

## 7. Knowledge Scope

The chatbot's primary knowledge should include:
- VORTEX company overview
- Main services
- Why VORTEX / learning features
- AI Integrated Technology Institute
- Learning programs
- Institute differentiators
- Locations
- Contact information

Additional company information can be added to the knowledge base later.

## 8. Local Chat History

Use browser `localStorage` to persist chat history.

Requirements:
- Save messages after each conversation update.
- Restore history when the chatbot component loads.
- Keep history after browser refresh.
- Provide a clear-chat option.
- Store only the necessary conversation data.
- Do not store API keys in localStorage.

## 9. Suggested UI

Closed state:
- Circular floating chatbot button at bottom-right.

Open state:
- Chat panel anchored to the bottom-right.
- Header with VORTEX/chatbot identity.
- Scrollable conversation area.
- Message bubbles.
- Text input.
- Send button.
- Microphone button.
- Optional voice-output control.
- Clear-history option.

Mobile:
- Chat panel should expand to an appropriate near-full-screen layout while retaining easy access to close/minimize controls.

## 10. Safety / Accuracy

The chatbot should not fabricate:
- Course fees
- Course duration
- Admissions guarantees
- Placement guarantees
- Service pricing
- Availability
- Company policies
- Unprovided locations or services

If information is unavailable, it should clearly say that it does not currently have that information and provide an appropriate VORTEX contact option when possible.

## 11. Future Enhancements

Possible future features:
- Lead collection
- Course enquiry forms
- Direct WhatsApp/contact actions
- Appointment or callback requests
- Analytics
- Server-side conversation storage
- Retrieval-augmented knowledge base
