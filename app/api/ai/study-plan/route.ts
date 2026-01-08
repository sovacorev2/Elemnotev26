import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const studyPlanSchema = z.object({
  totalDays: z.number(),
  dailySessions: z.array(
    z.object({
      day: z.number(),
      date: z.string(),
      topics: z.array(z.string()),
      activities: z.array(
        z.object({
          type: z.enum(["read", "quiz", "flashcards", "practice", "review"]),
          description: z.string(),
          duration: z.number().describe("Duration in minutes"),
          documentId: z.string().optional(),
        }),
      ),
      goals: z.array(z.string()),
      estimatedTime: z.number().describe("Total time in minutes"),
    }),
  ),
  tips: z.array(z.string()),
  milestones: z.array(
    z.object({
      day: z.number(),
      description: z.string(),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const { examDate, subjects, studyHoursPerDay, weakAreas } = await req.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's documents
    const { data: documents } = await supabase
      .from("documents")
      .select("id, title, subject, topics, difficulty, estimated_study_time")
      .eq("user_id", user.id)

    const today = new Date()
    const exam = new Date(examDate)
    const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: studyPlanSchema,
      messages: [
        {
          role: "user",
          content: `Create a personalized study plan for a student with the following details:

Days until exam: ${daysUntilExam}
Subjects: ${subjects.join(", ")}
Available study hours per day: ${studyHoursPerDay}
Weak areas: ${weakAreas?.join(", ") || "None specified"}

Available study materials:
${documents?.map((doc) => `- ${doc.title} (${doc.subject}, ${doc.difficulty}, ~${doc.estimated_study_time} min)`).join("\n")}

Create a comprehensive, realistic study plan that:
- Distributes topics evenly across available days
- Prioritizes weak areas
- Includes variety (reading, quizzes, flashcards, practice)
- Builds in review sessions
- Increases intensity as exam approaches
- Includes rest days if appropriate
- Provides specific, actionable daily goals
- Uses spaced repetition principles`,
        },
      ],
    })

    return Response.json({ studyPlan: object })
  } catch (error) {
    console.error("[v0] Study plan generation error:", error)
    return Response.json({ error: "Failed to generate study plan" }, { status: 500 })
  }
}
