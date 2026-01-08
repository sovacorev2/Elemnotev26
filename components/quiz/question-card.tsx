"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface QuestionCardProps {
  question: string
  options: string[]
  selectedAnswer?: string
  correctAnswer?: string
  explanation?: string
  onSelect: (answer: string) => void
  showFeedback?: boolean
}

export function QuestionCard({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  explanation,
  onSelect,
  showFeedback,
}: QuestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedAnswer} onValueChange={onSelect}>
          <div className="space-y-3">
            {options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index)
              const isSelected = selectedAnswer === option
              const isCorrect = correctAnswer === option
              const showCorrect = showFeedback && isCorrect
              const showIncorrect = showFeedback && isSelected && !isCorrect

              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border-2 transition-colors cursor-pointer",
                    isSelected && !showFeedback && "border-primary bg-primary/5",
                    showCorrect && "border-green-500 bg-green-500/10",
                    showIncorrect && "border-red-500 bg-red-500/10",
                    !isSelected && !showCorrect && "border-border hover:border-primary/50",
                  )}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} disabled={showFeedback} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal leading-relaxed">
                    <span className="font-semibold mr-2">{optionLetter}.</span>
                    {option}
                  </Label>
                </div>
              )
            })}
          </div>
        </RadioGroup>

        {showFeedback && explanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Explanation:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
