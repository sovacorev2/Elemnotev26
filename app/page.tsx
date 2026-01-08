import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, MessageSquare, Brain, BarChart3, Sparkles, Upload, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">Elem Notes</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
            Your AI-Powered Study Companion
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Transform your study materials into interactive learning experiences. Upload documents, chat with AI,
            generate quizzes, and track your progress.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg gap-2">
                <ArrowRight className="h-5 w-5" />
                Try Now - No Sign Up Required
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="text-lg bg-transparent">
                Create Free Account
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Start using immediately in guest mode, or create an account to save your progress
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Upload Documents</h3>
            <p className="text-muted-foreground">
              Support for PDF, Word, and text files. Your study materials, instantly accessible.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">AI Chat</h3>
            <p className="text-muted-foreground">
              Ask questions about your notes and get instant, intelligent answers powered by AI.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Smart Quizzes</h3>
            <p className="text-muted-foreground">
              Auto-generate quizzes from your materials with instant feedback and explanations.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Flashcards</h3>
            <p className="text-muted-foreground">
              Create and study with AI-generated flashcards. Track your progress over time.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Learning Analytics</h3>
            <p className="text-muted-foreground">
              Visualize your study patterns and track improvement across all subjects.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">AI-Powered</h3>
            <p className="text-muted-foreground">Advanced AI understands context and adapts to your learning style.</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-card/50 backdrop-blur">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Ready to transform your studying?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students already learning smarter with Elem Notes.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 Elem Notes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
