# MEC OSH AI Chatbot Setup

The website includes a multilingual floating chatbot with:

- English, Hindi and Arabic text chat
- Microphone input using the browser speech-recognition feature
- Spoken replies using browser speech synthesis
- Secure AI requests through a Supabase Edge Function
- Basic offline OSH answers when the Edge Function is not available

## Required one-time deployment

### 1. Install and sign in to Supabase CLI

Use the Supabase CLI and link it to the existing project.

```bash
supabase login
supabase link --project-ref absfyhdyirrdwkgjwqqn
```

### 2. Add the OpenAI API key as a Supabase secret

Never place the key in `index.html`, `app.js`, `supabase-config.js`, GitHub or
other public website files.

```bash
supabase secrets set OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

Optional model setting:

```bash
supabase secrets set OPENAI_MODEL=gpt-4.1-mini
```

### 3. Deploy the Edge Function

Run this command from the website package root:

```bash
supabase functions deploy osh-chatbot --no-verify-jwt
```

### 4. Upload the website files

Replace all GitHub Pages files with the contents of this package and refresh
the website using `Ctrl + F5`.

## Voice notes

- Microphone permission must be allowed by the visitor.
- Voice input depends on browser speech-recognition availability.
- Text chat remains available when voice input is unavailable.
- Spoken replies can be turned off inside the chatbot.

## Safety behavior

The assistant gives general OSH guidance and directs emergency users to:

- Site Emergency: +971 50 332 5318
- Police: 999
- Ambulance: 998
- Civil Defence: 997

The chatbot does not replace an approved risk assessment, permit, competent
person, emergency response procedure or medical professional.
