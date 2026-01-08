import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const documentAnalysisSchema = z.object({
  summary: z.string().describe("A comprehensive summary of the document in clear, simple language"),
  simplifiedSummary: z.string().describe("An ELI5 (Explain Like I'm 5) version of the summary"),
  keyConcepts: z
    .array(
      z.object({
        concept: z.string(),
        explanation: z.string().describe("Clear explanation of the concept"),
        simpleExplanation: z.string().describe("Simplified explanation suitable for beginners"),
        realWorldExample: z.string().describe("Real-world example or analogy"),
        importance: z.enum(["high", "medium", "low"]),
        relatedConcepts: z.array(z.string()).describe("Related concepts in the document"),
      }),
    )
    .describe("Key concepts extracted and explained at multiple levels"),
  topics: z.array(z.string()).describe("Main topics covered"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedStudyTime: z.number().describe("Estimated study time in minutes"),
  suggestedQuizTopics: z.array(z.string()).describe("Topics suitable for quiz generation"),
  studyTips: z.array(z.string()).describe("Specific study tips for this material"),
  prerequisites: z.array(z.string()).describe("Concepts students should know before studying this"),
  learningObjectives: z.array(z.string()).describe("What students should be able to do after studying"),
})

export async function POST(req: Request) {
  try {
    const { documentId, content, fileType } = await req.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user && !documentId.startsWith("guest-")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4-20250514",
      schema: documentAnalysisSchema,
      messages: [
        {
          role: "user",
          content: `You are an expert educational AI that excels at analyzing study materials and making complex concepts accessible to students.

Analyze this educational document with the following goals:
1. Create a comprehensive summary AND a simplified ELI5 version
2. Extract key concepts and explain them at multiple levels (standard + simplified)
3. Provide real-world examples and analogies for each concept
4. Identify relationships between concepts
5. Suggest effective study strategies specific to this material
6. Identify prerequisites and learning objectives

Document content:
${content}

Make your analysis thorough, accurate, and genuinely helpful for student learning.`,
        },
      ],
    })

    // Store the analysis in the database (if authenticated user)
    if (user) {
      const { error } = await supabase
        .from("documents")
        .update({
          summary: object.summary,
          key_concepts: object.keyConcepts,
          topics: object.topics,
          difficulty: object.difficulty,
          estimated_study_time: object.estimatedStudyTime,
          processed: true,
        })
        .eq("id", documentId)

      if (error) throw error
    }

    return Response.json({ analysis: object })
  } catch (error) {
    console.error("[v0] Document processing error:", error)
    return Response.json({ error: "Failed to process document" }, { status: 500 })
  }
}
