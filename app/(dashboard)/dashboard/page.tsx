"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Brain, BookOpen, TrendingUp, Upload, Sparkles } from "lucide-react"
import Link from "next/link"
import { useStats } from "@/lib/hooks/use-stats"
import { useDocuments } from "@/lib/hooks/use-documents"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { stats, isLoading: statsLoading } = useStats()
  const { documents, isLoading: docsLoading } = useDocuments()

  const recentDocs = documents.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your learning overview.</p>
        </div>
        <Link href="/dashboard/documents">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <StatsCard
              title="Total Documents"
              value={stats?.totalDocuments || 0}
              description="Across all subjects"
              icon={FileText}
            />
            <StatsCard
              title="AI Conversations"
              value={stats?.totalChats || 0}
              description="Questions answered"
              icon={MessageSquare}
            />
            <StatsCard
              title="Quizzes Taken"
              value={stats?.totalQuizzes || 0}
              description={`Average score: ${stats?.averageScore || 0}%`}
              icon={Brain}
            />
            <StatsCard
              title="Flashcards Mastered"
              value={stats?.masteredFlashcards || 0}
              description="Keep it up!"
              icon={BookOpen}
            />
          </>
        )}
      </div>

      {/* AI Features Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Study Tools</CardTitle>
          </div>
          <CardDescription>Advanced features to supercharge your learning</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Smart Quiz Generation</p>
              <p className="text-xs text-muted-foreground">AI creates custom quizzes from your notes</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="font-medium text-sm">Document Analysis</p>
              <p className="text-xs text-muted-foreground">Extract key concepts automatically</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Multi-Document Chat</p>
              <p className="text-xs text-muted-foreground">Ask questions across all your materials</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="font-medium text-sm">Personalized Study Plans</p>
              <p className="text-xs text-muted-foreground">AI-generated schedules for exam prep</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your latest uploaded study materials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {docsLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </>
            ) : recentDocs.length > 0 ? (
              <>
                {recentDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">{doc.subject || "No subject"}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                <Link href="/dashboard/documents">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Documents
                  </Button>
                </Link>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">No documents yet</p>
                <Link href="/dashboard/documents">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Upload className="h-4 w-4" />
                    Upload Your First Document
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your learning activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/chat">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Start AI Chat</p>
                  <p className="text-sm text-muted-foreground">Ask questions about your notes</p>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/quizzes">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Generate Quiz</p>
                  <p className="text-sm text-muted-foreground">Test your knowledge</p>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/flashcards">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Study Flashcards</p>
                  <p className="text-sm text-muted-foreground">Review and memorize</p>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm text-muted-foreground">Track your progress</p>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
