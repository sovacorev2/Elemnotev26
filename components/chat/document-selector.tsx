"use client"
import { Card } from "@/components/ui/card"
import { FileText, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Document {
  id: string
  title: string
  subject: string
}

interface DocumentSelectorProps {
  documents: Document[]
  selectedDocId?: string
  onSelect: (docId: string) => void
}

export function DocumentSelector({ documents, selectedDocId, onSelect }: DocumentSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-3">Select a document to chat about:</h3>
      <div className="grid gap-2">
        {documents.map((doc) => {
          const isSelected = selectedDocId === doc.id
          return (
            <Card
              key={doc.id}
              className={cn(
                "p-3 cursor-pointer transition-colors hover:border-primary/50",
                isSelected && "border-primary bg-primary/5",
              )}
              onClick={() => onSelect(doc.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">{doc.subject}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
