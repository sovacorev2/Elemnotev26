import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Brain, BookOpen, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface DocumentCardProps {
  id: string
  title: string
  subject: string
  uploadDate: string
  pageCount?: number
}

export function DocumentCard({ id, title, subject, uploadDate, pageCount }: DocumentCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{title}</h3>
            <p className="text-sm text-muted-foreground">{subject}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{uploadDate}</span>
              {pageCount && <span>{pageCount} pages</span>}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-4 flex gap-2">
        <Link href={`/dashboard/chat?doc=${id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
        </Link>
        <Link href={`/dashboard/quizzes/new?doc=${id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
            <Brain className="h-4 w-4" />
            Quiz
          </Button>
        </Link>
        <Link href={`/dashboard/flashcards/new?doc=${id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
            <BookOpen className="h-4 w-4" />
            Cards
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
