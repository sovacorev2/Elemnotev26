import { streamObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const quizSchema = z.object({
  title: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctAnswer: z.number().min(0).max(3),
      explanation: z.string(),
      difficulty: z.enum(["easy", "medium", "hard"]),
      topic: z.string(),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const { documentId, numQuestions, difficulty, topics } = await req.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get document content
    const { data: document } = await supabase
      .from("documents")
      .select("title, content, summary, key_concepts")
      .eq("id", documentId)
      .single()

    if (!document) {
      return Response.json({ error: "Document not found" }, { status: 404 })
    }

    const prompt = `Generate ${numQuestions} ${difficulty} quiz questions based on this educational material:

Title: ${document.title}
Summary: ${document.summary || "Not available"}
Content: ${document.content}

${topics?.length ? `Focus on these topics: ${topics.join(", ")}` : ""}

Create challenging, educational questions that test deep understanding, not just memorization. Include detailed explanations for each answer.`

    const result = streamObject({
      model: "openai/gpt-5",
      schema: quizSchema,
      prompt,
      maxOutputTokens: 4000,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("[v0] Quiz generation error:", error)
    return Response.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
