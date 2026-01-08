import { DeckCard } from "@/components/flashcards/deck-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

// Mock data
const mockDecks = [
  {
    id: "1",
    title: "Algorithms Fundamentals",
    documentTitle: "Introduction to Algorithms",
    cardCount: 25,
    masteredCount: 18,
    lastStudied: "2 hours ago",
  },
  {
    id: "2",
    title: "Organic Chemistry Reactions",
    documentTitle: "Organic Chemistry Notes",
    cardCount: 30,
    masteredCount: 22,
    lastStudied: "1 day ago",
  },
  {
    id: "3",
    title: "World War II Events",
    documentTitle: "World History Chapter 5",
    cardCount: 20,
    masteredCount: 8,
    lastStudied: "3 days ago",
  },
  {
    id: "4",
    title: "Calculus Formulas",
    documentTitle: "Calculus II Study Guide",
    cardCount: 35,
    masteredCount: 12,
  },
]

export default function FlashcardsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
          <p className="text-muted-foreground">Study and memorize with AI-generated flashcards</p>
        </div>
        <Link href="/dashboard/flashcards/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Deck
          </Button>
        </Link>
      </div>

      {/* Decks Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDecks.map((deck) => (
          <DeckCard key={deck.id} {...deck} />
        ))}
      </div>
    </div>
  )
}
