"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FlashcardProps {
  front: string
  back: string
}

export function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={cn(
          "relative w-full h-80 transition-transform duration-500 transform-style-3d cursor-pointer",
          isFlipped && "rotate-y-180",
        )}
      >
        {/* Front */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden flex items-center justify-center p-8 text-center",
            "bg-card border-2",
          )}
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Question</p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">{front}</p>
            <p className="text-xs text-muted-foreground">Click to reveal answer</p>
          </div>
        </Card>

        {/* Back */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-8 text-center",
            "bg-primary/5 border-2 border-primary",
          )}
        >
          <div className="space-y-4">
            <p className="text-sm text-primary uppercase tracking-wide">Answer</p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">{back}</p>
            <p className="text-xs text-muted-foreground">Click to flip back</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
