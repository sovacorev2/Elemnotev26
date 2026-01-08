import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface QuizCardProps {
  id: string
  title: string
  documentTitle: string
  questionCount: number
  score?: number
  completedAt?: string
  status: "completed" | "in-progress" | "not-started"
}

export function QuizCard({ id, title, documentTitle, questionCount, score, completedAt, status }: QuizCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{documentTitle}</p>
          </div>
          <Badge
            variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}
            className="flex-shrink-0"
          >
            {status === "completed" ? "Completed" : status === "in-progress" ? "In Progress" : "New"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span>{questionCount} questions</span>
          </div>
          {completedAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{completedAt}</span>
            </div>
          )}
        </div>
        {score !== undefined && (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-lg font-semibold">{score}%</span>
            <span className="text-sm text-muted-foreground">Score</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/quizzes/${id}`} className="w-full">
          <Button className="w-full">
            {status === "completed" ? "Review" : status === "in-progress" ? "Continue" : "Start Quiz"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
