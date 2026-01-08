import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"

interface MessageProps {
  role: "user" | "assistant"
  content: string
}

export function Message({ role, content }: MessageProps) {
  return (
    <div className={cn("flex gap-3 p-4", role === "user" ? "bg-muted/50" : "bg-background")}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary"}>
          {role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-sm font-medium">{role === "assistant" ? "AI Assistant" : "You"}</p>
        <div className="text-sm text-foreground whitespace-pre-wrap break-words">{content}</div>
      </div>
    </div>
  )
}
