import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { createClient } from "@/lib/supabase/server"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const {
      messages,
      documentIds,
      mode = "standard",
    }: {
      messages: UIMessage[]
      documentIds: string[]
      mode?: "eli5" | "beginner" | "standard" | "advanced" | "socratic"
    } = await req.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Fetch document context
    let context = ""
    if (documentIds?.length > 0 && user) {
      const { data: documents } = await supabase
        .from("documents")
        .select("title, content, summary, key_concepts")
        .in("id", documentIds)

      if (documents) {
        context = documents
          .map((doc) => {
            const keyConcepts = doc.key_concepts ? `\nKey Concepts: ${JSON.stringify(doc.key_concepts)}` : ""
            return `Document: ${doc.title}\nSummary: ${doc.summary || "N/A"}${keyConcepts}\nContent: ${doc.content.substring(0, 5000)}...`
          })
          .join("\n\n---\n\n")
      }
    }

    const modePrompts = {
      eli5: `You are an expert at explaining complex concepts in the simplest possible terms, as if explaining to a 5-year-old. Use analogies, simple language, and relatable examples. Break down jargon into everyday words.`,
      beginner: `You are a patient tutor for beginners. Explain concepts clearly with step-by-step breakdowns. Use simple examples and avoid assuming prior knowledge. Define technical terms when you use them.`,
      standard: `You are an expert AI tutor helping students understand their study materials deeply. Provide clear, comprehensive explanations with examples. Balance depth with clarity.`,
      advanced: `You are an advanced academic tutor. Provide in-depth, nuanced explanations. Discuss edge cases, theoretical implications, and connections to related concepts. Use technical terminology appropriately.`,
      socratic: `You are a Socratic tutor. Instead of giving direct answers, guide students to discover answers themselves through thoughtful questions. Help them think critically and develop problem-solving skills.`,
    }

    const systemMessage = {
      role: "system" as const,
      content: `${modePrompts[mode]}

${context ? `Here are the documents the student is studying:\n\n${context}` : ""}

Your capabilities:
- Analyze and simplify complex concepts into digestible explanations
- Provide multi-level explanations (simple to advanced)
- Break down difficult topics into clear, logical steps
- Use analogies and real-world examples to illustrate abstract concepts
- Generate practice problems with detailed step-by-step solutions
- Identify connections between different concepts
- Adapt explanations based on student's understanding level
- Provide visual descriptions of concepts when helpful
- Offer memory techniques and study strategies
- Explain WHY things work, not just HOW

Guidelines:
- Always prioritize student understanding over showing off knowledge
- Use the Feynman Technique: explain as if teaching someone else
- Provide concrete examples before abstract theory
- Check for understanding by asking clarifying questions
- Reference specific parts of the documents when relevant
- If a concept is unclear, break it down further
- Encourage active learning and critical thinking
- Be encouraging and supportive
- Admit when something is outside your knowledge

Remember: Your goal is to make the student truly understand, not just memorize.`,
    }

    const prompt = [systemMessage, ...convertToModelMessages(messages)]

    const result = streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      messages: prompt,
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Chat error:", error)
    return Response.json({ error: "Failed to process chat" }, { status: 500 })
  }
}
