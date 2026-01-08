"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock documents
const mockDocuments = [
  { id: "1", title: "Introduction to Algorithms" },
  { id: "2", title: "Organic Chemistry Notes" },
  { id: "3", title: "World History Chapter 5" },
]

export default function NewFlashcardsPage() {
  const [selectedDoc, setSelectedDoc] = useState("")
  const [cardCount, setCardCount] = useState("20")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = () => {
    if (!selectedDoc) {
      setError("Please select a document")
      return
    }

    setIsGenerating(true)
    setError("")

    // TODO: Implement actual flashcard generation when AI integration is added
    setTimeout(() => {
      setIsGenerating(false)
      setError("Flashcard generation not yet configured. Please add an AI integration to generate flashcards.")
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Flashcard Deck</h1>
        <p className="text-muted-foreground">Generate AI-powered flashcards from your study materials</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deck Settings</CardTitle>
          <CardDescription>Configure your flashcard deck</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="document">Select Document</Label>
            <Select value={selectedDoc} onValueChange={setSelectedDoc}>
              <SelectTrigger id="document">
                <SelectValue placeholder="Choose a document" />
              </SelectTrigger>
              <SelectContent>
                {mockDocuments.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Number of Cards</Label>
            <Select value={cardCount} onValueChange={setCardCount}>
              <SelectTrigger id="count">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 cards</SelectItem>
                <SelectItem value="20">20 cards</SelectItem>
                <SelectItem value="30">30 cards</SelectItem>
                <SelectItem value="50">50 cards</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gap-2">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Flashcards...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Flashcards
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
