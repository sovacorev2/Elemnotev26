"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getGuestDocuments } from "@/lib/storage/guest-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Zap, BookMarked, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function SummaryPage() {
  const params = useParams()
  const id = params.id as string
  const [document, setDocument] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docs = getGuestDocuments()
    const doc = docs.find((d) => d.id === id)
    setDocument(doc)
    setLoading(false)
  }, [id])

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!document) return <div className="text-center py-12">Document not found</div>

  const analysis = document.analysis || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/documents">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{document.title}</h1>
          <p className="text-muted-foreground">{document.subject}</p>
        </div>
      </div>

      {/* Summary Tabs */}
      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quick">Quick Summary</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Revision</TabsTrigger>
          <TabsTrigger value="exam">Exam Focus</TabsTrigger>
          <TabsTrigger value="quiz">Test Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Summary
              </CardTitle>
              <CardDescription>Fast revision points from your notes</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.quickSummary ? (
                <div className="space-y-2 whitespace-pre-wrap text-sm">{analysis.quickSummary}</div>
              ) : (
                <div className="text-muted-foreground">Analyzing your document...</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-blue-500" />
                Detailed Revision Guide
              </CardTitle>
              <CardDescription>Comprehensive explanation of all concepts</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.summary ? (
                <div className="space-y-4">
                  <div className="whitespace-pre-wrap text-sm">{analysis.summary}</div>
                </div>
              ) : (
                <div className="text-muted-foreground">Analyzing your document...</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                High Focus Topics
              </CardTitle>
              <CardDescription>Topics likely to appear in exams</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.examFocusAreas && analysis.examFocusAreas.length > 0 ? (
                <div className="space-y-3">
                  {analysis.examFocusAreas.map((area: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{area.topic || area}</h4>
                        {area.confidence && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {Math.round(area.confidence * 100)}% likely
                          </span>
                        )}
                      </div>
                      {area.reason && <p className="text-sm text-muted-foreground">{area.reason}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">Analyzing your document...</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sample Exam Questions</CardTitle>
              <CardDescription>Practice questions based on your material</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.potentialQuestions && analysis.potentialQuestions.length > 0 ? (
                <div className="space-y-4">
                  {analysis.potentialQuestions.map((question: string, idx: number) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <p className="font-semibold text-sm mb-2">
                        {idx + 1}. {question}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">Generating exam questions...</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Concepts */}
      {analysis.keyConceptsExplained && Object.keys(analysis.keyConceptsExplained).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key Concepts Explained Simply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analysis.keyConceptsExplained).map(([concept, explanation]: any, idx: number) => (
                <div key={idx} className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">{concept}</h4>
                  <p className="text-sm text-muted-foreground">{explanation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
