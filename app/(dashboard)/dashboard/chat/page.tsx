"use client"

import { useState, useRef, useEffect } from "react"
import { Message } from "@/components/chat/message"
import { DocumentSelector } from "@/components/chat/document-selector"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Brain, GraduationCap, Lightbulb, BookOpen } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { useDocuments } from "@/lib/hooks/use-documents"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function ChatPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>("")
  const [explanationMode, setExplanationMode] = useState<"eli5" | "beginner" | "standard" | "advanced" | "socratic">(
    "standard",
  )
  const { documents } = useDocuments()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/ai/chat",
    body: {
      documentIds: selectedDocId ? [selectedDocId] : [],
      mode: explanationMode,
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickPrompts = [
    { icon: Brain, label: "Explain this concept", prompt: "Can you explain the main concept in simple terms?" },
    { icon: Lightbulb, label: "Give me an example", prompt: "Can you give me a real-world example of this?" },
    { icon: GraduationCap, label: "Test my understanding", prompt: "Ask me questions to test my understanding" },
    { icon: BookOpen, label: "Break it down", prompt: "Break down this topic into smaller, easier parts" },
  ]

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      <div className="flex-shrink-0 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Chat</h1>
          <p className="text-muted-foreground">Ask questions and get intelligent explanations</p>
        </div>
        <div className="w-48">
          <Label htmlFor="mode" className="text-xs text-muted-foreground">
            Explanation Level
          </Label>
          <Select value={explanationMode} onValueChange={(v: any) => setExplanationMode(v)}>
            <SelectTrigger id="mode" className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eli5">ELI5 (Very Simple)</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="socratic">Socratic (Questions)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Document Selector Sidebar */}
        <aside className="w-80 flex-shrink-0 overflow-y-auto">
          <Card className="p-4">
            <DocumentSelector documents={documents} selectedDocId={selectedDocId} onSelect={setSelectedDocId} />
          </Card>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 border border-border rounded-lg overflow-hidden bg-card">
          {!selectedDocId ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Start a conversation</h3>
                <p className="text-muted-foreground">
                  Select a document from the sidebar to begin chatting with AI about your study materials.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center max-w-2xl space-y-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Ready to help you learn!</h3>
                        <p className="text-muted-foreground">
                          Ask me anything about{" "}
                          <span className="font-medium text-foreground">
                            {documents.find((d) => d.id === selectedDocId)?.title}
                          </span>
                          . I can explain concepts, simplify complex topics, provide examples, and help you truly
                          understand the material.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        {quickPrompts.map((item) => (
                          <Button
                            key={item.label}
                            variant="outline"
                            className="h-auto py-3 px-4 flex flex-col items-start gap-2 bg-transparent"
                            onClick={() => handleQuickPrompt(item.prompt)}
                          >
                            <item.icon className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <Message key={message.id} role={message.role} content={message.content} />
                    ))}
                    {isLoading && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-border p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask a question about this document..."
                    className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    Send
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
