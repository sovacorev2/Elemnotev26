import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"

interface DeckCardProps {
  id: string
  title: string
  documentTitle: string
  cardCount: number
  masteredCount: number
  lastStudied?: string
}

export function DeckCard({ id, title, documentTitle, cardCount, masteredCount, lastStudied }: DeckCardProps) {
  const progress = Math.round((masteredCount / cardCount) * 100)

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{documentTitle}</p>
          </div>
          <Badge variant="secondary" className="flex-shrink-0">
            {progress}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{cardCount} cards</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>{masteredCount} mastered</span>
          </div>
        </div>
        {lastStudied && <p className="text-xs text-muted-foreground">Last studied: {lastStudied}</p>}
        <div className="w-full bg-secondary rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/flashcards/${id}`} className="w-full">
          <Button className="w-full">Study Now</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
