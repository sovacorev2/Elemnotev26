"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Brain, MessageSquare } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your achievements</p>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@university.edu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input id="university" defaultValue="State University" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input id="major" defaultValue="Computer Science" />
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">7 Day Streak</p>
                <p className="text-sm text-muted-foreground">Study every day this week</p>
              </div>
              <Badge className="ml-auto">Active</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Quiz Master</p>
                <p className="text-sm text-muted-foreground">Complete 20 quizzes</p>
              </div>
              <Badge className="ml-auto">Earned</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Flashcard Pro</p>
                <p className="text-sm text-muted-foreground">Master 100 flashcards</p>
              </div>
              <Badge className="ml-auto">Earned</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border border-border rounded-lg opacity-50">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">AI Enthusiast</p>
                <p className="text-sm text-muted-foreground">Ask 100 AI questions</p>
              </div>
              <Badge variant="outline" className="ml-auto">
                48/100
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
