"use client"

import { useEffect, useState } from "react"
import { UploadDialog } from "@/components/documents/upload-dialog"
import { DocumentCard } from "@/components/documents/document-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, BookOpen } from "lucide-react"
import { getGuestDocuments } from "@/lib/storage/guest-storage"
import Link from "next/link"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load documents from localStorage
    const loadDocuments = () => {
      const docs = getGuestDocuments()
      console.log("[v0] Loaded documents:", docs)
      setDocuments(docs)
      setLoading(false)
    }

    loadDocuments()

    // Listen for document updates
    window.addEventListener("documents-updated", loadDocuments)
    return () => window.removeEventListener("documents-updated", loadDocuments)
  }, [])

  // Filter documents based on search
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subject?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
          <p className="text-muted-foreground">Upload and analyze your notes for smart studying</p>
        </div>
        <UploadDialog />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Documents Grid */}
      {!loading && filteredDocuments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Link key={doc.id} href={`/dashboard/summary/${doc.id}`}>
              <DocumentCard
                id={doc.id}
                title={doc.title}
                subject={doc.subject || "General"}
                uploadDate={new Date(doc.created_at).toLocaleDateString()}
                pageCount={doc.content?.split("\n").length || 0}
              />
            </Link>
          ))}
        </div>
      ) : !loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
          <p className="text-muted-foreground mb-4">Upload your first study material to get AI-powered analysis</p>
          <UploadDialog />
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  )
}
