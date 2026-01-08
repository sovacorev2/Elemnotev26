"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Sparkles, Save } from "lucide-react"
import Link from "next/link"

interface GuestPromptProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature: string
}

export function GuestPrompt({ open, onOpenChange, feature }: GuestPromptProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Save className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Save Your Progress</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            You're currently using Elem Notes in guest mode. Create a free account to save your {feature} and access
            them from any device.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <Sparkles className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">All your work will be saved</p>
              <p className="text-xs text-muted-foreground">We'll transfer everything to your account</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <Sparkles className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium text-sm">Access from anywhere</p>
              <p className="text-xs text-muted-foreground">Sync across all your devices</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <Sparkles className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Never lose your progress</p>
              <p className="text-xs text-muted-foreground">Cloud backup for all your study materials</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Link href="/signup" className="w-full">
            <Button className="w-full gap-2">
              <Save className="h-4 w-4" />
              Create Free Account
            </Button>
          </Link>
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full bg-transparent">
              I Already Have an Account
            </Button>
          </Link>
          <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
            Continue as Guest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
