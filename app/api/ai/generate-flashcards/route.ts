import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const flashcardsSchema = z.object({
  cards: z.array(
    z.object({
      front: z.string().describe("The question or prompt"),
      back: z.string().describe("The answer or explanation"),
      hint: z.string().optional().describe("Optional hint to help remember"),
      difficulty: z.enum(["easy", "medium", "hard"]),
      topic: z.string(),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const { documentId, numCards, topics } = await req.json()

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

    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: flashcardsSchema,
      messages: [
        {
          role: "user",
          content: `Create ${numCards} flashcards from this educational material:

Title: ${document.title}
Summary: ${document.summary || "Not available"}
Content: ${document.content}

${topics?.length ? `Focus on these topics: ${topics.join(", ")}` : ""}

Create flashcards that:
- Test key concepts and definitions
- Include memory aids and mnemonics where helpful
- Progress from basic to advanced concepts
- Are concise but complete
- Help with active recall and spaced repetition`,
        },
      ],
    })

    return Response.json({ flashcards: object.cards })
  } catch (error) {
    console.error("[v0] Flashcard generation error:", error)
    return Response.json({ error: "Failed to generate flashcards" }, { status: 500 })
  }
}
