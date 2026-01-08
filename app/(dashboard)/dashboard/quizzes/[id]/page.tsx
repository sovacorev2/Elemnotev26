"use client"

import { useState } from "react"
import { QuestionCard } from "@/components/quiz/question-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

// Mock quiz data
const mockQuiz = {
  title: "Algorithms Quiz #1",
  questions: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: "O(log n)",
      explanation:
        "Binary search divides the search space in half with each iteration, resulting in logarithmic time complexity.",
    },
    {
      question: "Which data structure uses LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: "Stack",
      explanation: "A stack follows the LIFO principle where the last element added is the first one to be removed.",
    },
    {
      question: "What is the worst-case time complexity of quicksort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      correctAnswer: "O(n²)",
      explanation:
        "Quicksort has a worst-case time complexity of O(n²) when the pivot selection is poor, though average case is O(n log n).",
    },
  ],
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(mockQuiz.questions.length).fill(""))
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100
  const question = mockQuiz.questions[currentQuestion]

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFeedback(false)
    }
  }

  const handleSubmit = () => {
    setShowFeedback(true)
  }

  const handleComplete = () => {
    setIsCompleted(true)
  }

  const calculateScore = () => {
    let correct = 0
    mockQuiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++
    })
    return Math.round((correct / mockQuiz.questions.length) * 100)
  }

  if (isCompleted) {
    const score = calculateScore()
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center p-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
          <p className="text-muted-foreground mb-6">Great job on finishing the quiz</p>
          <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
          <p className="text-muted-foreground mb-8">
            You got {mockQuiz.questions.filter((q, i) => answers[i] === q.correctAnswer).length} out of{" "}
            {mockQuiz.questions.length} questions correct
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retake Quiz
            </Button>
            <Button onClick={() => (window.location.href = "/dashboard/quizzes")}>Back to Quizzes</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{mockQuiz.title}</h1>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {mockQuiz.questions.length}
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <QuestionCard
        question={question.question}
        options={question.options}
        selectedAnswer={answers[currentQuestion]}
        correctAnswer={question.correctAnswer}
        explanation={question.explanation}
        onSelect={handleAnswer}
        showFeedback={showFeedback}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {!showFeedback && answers[currentQuestion] && (
            <Button onClick={handleSubmit} variant="outline">
              Check Answer
            </Button>
          )}

          {currentQuestion === mockQuiz.questions.length - 1 ? (
            <Button onClick={handleComplete} disabled={!answers[currentQuestion]}>
              Complete Quiz
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!answers[currentQuestion]}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
