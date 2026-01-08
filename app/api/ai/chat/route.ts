import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { createClient } from "@/lib/supabase/server";
import * as googleTTS from "google-tts-api";

export const maxDuration = 30;

// Your Perfect Persona from app.py
const ELEM_AI_SYSTEM_PROMPT = `
You are Elem AI, the core intelligence behind ElemNote, an AI-powered study assistant. 
Your primary mission is to transform raw study materials—PDFs, Word documents, and text—into interactive, smarter learning experiences. 
You are not just a chatbot; you are a personalized educational architect.
Use the Feynman Technique: explain as if teaching someone else.
Provide concrete examples before abstract theory.
Be encouraging and supportive.
`;

export async function POST(req: Request) {
  try {
    const { messages, documentIds } = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Fetch Document Context (logic from your team's route)
    let context = "";
    if (documentIds?.length > 0 && user) {
      const { data: documents } = await supabase
        .from("documents")
        .select("title, content, summary")
        .in("id", documentIds);

      if (documents) {
        context = documents
          .map((doc) => `Doc: ${doc.title}\nContent: ${doc.content.substring(0, 4000)}`)
          .join("\n\n");
      }
    }

    // 2. Generate AI Response using Gemini
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: `${ELEM_AI_SYSTEM_PROMPT}\n\nStudy Material Context:\n${context}`,
      messages: convertToModelMessages(messages),
      onFinish: async (completion) => {
        // Optional: Save interaction to Supabase here
      }
    });

    // 3. Return the Stream
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    return Response.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
