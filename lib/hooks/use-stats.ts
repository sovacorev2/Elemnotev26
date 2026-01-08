"use client"

import useSWR from "swr"
import { getGuestDocuments, getGuestChats, getGuestQuizzes, getGuestFlashcardDecks } from "@/lib/storage/guest-storage"

export function useStats() {
  const { data, error, isLoading } = useSWR("stats", async () => {
    const documents = getGuestDocuments()
    const chats = getGuestChats()
    const quizzes = getGuestQuizzes()
    const flashcards = getGuestFlashcardDecks()

    const totalAttempts = quizzes.reduce((acc, q) => acc + q.attempts.length, 0)
    const totalScore = quizzes.reduce((acc, q) => {
      return acc + q.attempts.reduce((sum, a) => sum + a.score, 0)
    }, 0)
    const avgScore = totalAttempts > 0 ? totalScore / totalAttempts : 0

    const masteredCount = flashcards.reduce((acc, deck) => {
      return acc + deck.flashcards.filter((f) => f.mastered).length
    }, 0)

    return {
      totalDocuments: documents.length,
      totalChats: chats.length,
      totalQuizzes: totalAttempts,
      averageScore: Math.round(avgScore),
      masteredFlashcards: masteredCount,
    }
  })

  return {
    stats: data,
    isLoading,
    error,
  }
}
