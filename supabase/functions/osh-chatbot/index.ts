const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RequestBody = {
  message?: string;
  language?: "en" | "hi" | "ar";
  history?: ChatMessage[];
};

const languageNames = {
  en: "English",
  hi: "Hindi",
  ar: "Arabic",
} as const;

const emergencyTerms =
  /emergency|accident|fire|ambulance|injur|आपात|दुर्घटना|आग|طوارئ|حادث|حريق/i;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function extractResponseText(payload: any): string {
  if (typeof payload?.output_text === "string") {
    return payload.output_text.trim();
  }

  const output = Array.isArray(payload?.output) ? payload.output : [];
  const parts: string[] = [];

  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      if (
        (part?.type === "output_text" || part?.type === "text") &&
        typeof part?.text === "string"
      ) {
        parts.push(part.text);
      }
    }
  }

  return parts.join("\n").trim();
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    const model = Deno.env.get("OPENAI_MODEL") || "gpt-4.1-mini";

    if (!apiKey) {
      return jsonResponse(
        { error: "OPENAI_API_KEY is not configured." },
        503,
      );
    }

    const body = (await request.json()) as RequestBody;
    const message = String(body.message || "").trim().slice(0, 1000);
    const language = body.language in languageNames
      ? body.language!
      : "en";

    if (!message) {
      return jsonResponse({ error: "A message is required." }, 400);
    }

    const history = Array.isArray(body.history)
      ? body.history
          .filter(
            (item): item is ChatMessage =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string",
          )
          .slice(-8)
          .map((item) => ({
            role: item.role,
            content: item.content.slice(0, 1000),
          }))
      : [];

    const emergencyInstruction = emergencyTerms.test(message)
      ? `
The message may describe an emergency. Start by telling the user to call the
Sama Yas site emergency number +971 50 332 5318. Also list Police 999,
Ambulance 998 and Civil Defence 997 where relevant. Do not delay emergency
contact with lengthy discussion.`
      : "";

    const instructions = `
You are the MEC OSH AI Safety Assistant for the Sama Yas Residential
Development in Abu Dhabi.

Respond only in ${languageNames[language]}.

Purpose:
- Give concise, practical occupational safety and health guidance.
- Cover PPE, work at height, scaffolding, lifting, hot work, electrical safety,
  confined spaces, housekeeping, traffic management, heat stress, emergency
  response, risk assessment and reporting safety concerns.
- Use short paragraphs or bullets where useful.
- Encourage compliance with approved project procedures, permits, risk
  assessments, ALDAR requirements and UAE/ADOSH requirements.
- For project-specific authorization, tell the user to contact MEC OSH Admin.
- Never invent an approval, inspection result, certificate, legal clause or
  site condition.
- Do not provide medical diagnosis. For injury or illness, recommend first aid,
  the site medical team and emergency services as appropriate.
- Do not provide instructions that bypass safety controls.
- Do not request or repeat confidential, personal or sensitive information.
- State clearly that your guidance is general when the question requires a
  competent-person assessment.
${emergencyInstruction}
`.trim();

    const input = [
      ...history,
      { role: "user", content: message },
    ];

    const openAiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          instructions,
          input,
          max_output_tokens: 450,
        }),
      },
    );

    const payload = await openAiResponse.json();

    if (!openAiResponse.ok) {
      console.error("OpenAI error:", payload);
      return jsonResponse(
        { error: "The AI service returned an error." },
        502,
      );
    }

    const answer = extractResponseText(payload);

    if (!answer) {
      return jsonResponse(
        { error: "The AI service returned an empty answer." },
        502,
      );
    }

    return jsonResponse({ answer });
  } catch (error) {
    console.error("OSH chatbot function:", error);
    return jsonResponse(
      { error: "Unable to process the chat request." },
      500,
    );
  }
});
