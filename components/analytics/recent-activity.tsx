import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, MessageSquare, FileText } from "lucide-react"

const activities = [
  {
    type: "quiz",
    icon: Brain,
    title: "Completed Algorithms Quiz #1",
    score: "85%",
    time: "2 hours ago",
  },
  {
    type: "flashcard",
    icon: BookOpen,
    title: "Studied Chemistry Reactions deck",
    score: "22/30 mastered",
    time: "5 hours ago",
  },
  {
    type: "chat",
    icon: MessageSquare,
    title: "AI Chat about World History",
    score: "12 questions asked",
    time: "1 day ago",
  },
  {
    type: "document",
    icon: FileText,
    title: "Uploaded Calculus Study Guide",
    score: "52 pages",
    time: "2 days ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest learning activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.score}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
