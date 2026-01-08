"use client"

import { useState } from "react"
import { Flashcard } from "@/components/flashcards/flashcard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw } from "lucide-react"

// Mock flashcard data
const mockDeck = {
  title: "Algorithms Fundamentals",
  cards: [
    {
      front: "What is the time complexity of binary search?",
      back: "O(log n) - Binary search divides the search space in half with each iteration.",
    },
    {
      front: "What data structure uses LIFO principle?",
      back: "Stack - Last In First Out, where the last element added is the first one removed.",
    },
    {
      front: "What is a hash table?",
      back: "A data structure that maps keys to values using a hash function for O(1) average lookup time.",
    },
    {
      front: "What is the difference between BFS and DFS?",
      back: "BFS explores level by level (uses queue), while DFS explores as deep as possible first (uses stack).",
    },
    {
      front: "What is dynamic programming?",
      back: "An optimization technique that solves complex problems by breaking them into simpler subproblems and storing results.",
    },
  ],
}

export default function StudyFlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set())
  const [difficultCards, setDifficultCards] = useState<Set<number>>(new Set())
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = ((currentCard + 1) / mockDeck.cards.length) * 100

  const handleMastered = () => {
    setMasteredCards(new Set([...masteredCards, currentCard]))
    difficultCards.delete(currentCard)
    handleNext()
  }

  const handleDifficult = () => {
    setDifficultCards(new Set([...difficultCards, currentCard]))
    masteredCards.delete(currentCard)
    handleNext()
  }

  const handleNext = () => {
    if (currentCard < mockDeck.cards.length - 1) {
      setCurrentCard(currentCard + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
    }
  }

  const handleRestart = () => {
    setCurrentCard(0)
    setMasteredCards(new Set())
    setDifficultCards(new Set())
    setIsCompleted(false)
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center p-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Study Session Complete!</h1>
          <p className="text-muted-foreground mb-6">Great job reviewing your flashcards</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-3xl font-bold text-green-500 mb-1">{masteredCards.size}</div>
              <p className="text-sm text-muted-foreground">Mastered</p>
            </div>
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-500 mb-1">{difficultCards.size}</div>
              <p className="text-sm text-muted-foreground">Need Review</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={handleRestart}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Study Again
            </Button>
            <Button onClick={() => (window.location.href = "/dashboard/flashcards")}>Back to Decks</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{mockDeck.title}</h1>
        <p className="text-muted-foreground">
          Card {currentCard + 1} of {mockDeck.cards.length}
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                Mastered: {masteredCards.size} | Difficult: {difficultCards.size}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flashcard */}
      <Flashcard front={mockDeck.cards[currentCard].front} back={mockDeck.cards[currentCard].back} />

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleDifficult} className="flex-1 gap-2 bg-transparent">
            <XCircle className="h-4 w-4" />
            Need Review
          </Button>
          <Button onClick={handleMastered} className="flex-1 gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Mastered
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handlePrevious} disabled={currentCard === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button variant="ghost" onClick={handleNext}>
            {currentCard === mockDeck.cards.length - 1 ? "Finish" : "Skip"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
