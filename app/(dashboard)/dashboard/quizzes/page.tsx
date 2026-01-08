import { QuizCard } from "@/components/quiz/quiz-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

// Mock data
const mockQuizzes = [
  {
    id: "1",
    title: "Algorithms Quiz #1",
    documentTitle: "Introduction to Algorithms",
    questionCount: 10,
    score: 85,
    completedAt: "2 hours ago",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Chemistry Practice Test",
    documentTitle: "Organic Chemistry Notes",
    questionCount: 15,
    score: 92,
    completedAt: "1 day ago",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "History Chapter 5 Quiz",
    documentTitle: "World History Chapter 5",
    questionCount: 12,
    status: "in-progress" as const,
  },
  {
    id: "4",
    title: "Calculus Practice",
    documentTitle: "Calculus II Study Guide",
    questionCount: 20,
    status: "not-started" as const,
  },
]

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge with AI-generated quizzes</p>
        </div>
        <Link href="/dashboard/quizzes/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Generate Quiz
          </Button>
        </Link>
      </div>

      {/* Quizzes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} {...quiz} />
        ))}
      </div>
    </div>
  )
}
