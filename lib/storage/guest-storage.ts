// Guest mode storage using localStorage for unauthenticated users

export interface GuestDocument {
  id: string
  title: string
  content: string
  file_type: string
  file_size: number
  subject?: string
  created_at: string
  updated_at: string
}

export interface GuestChat {
  id: string
  document_ids: string[]
  created_at: string
  messages: Array<{
    id: string
    role: "user" | "assistant"
    content: string
    created_at: string
  }>
}

export interface GuestQuiz {
  id: string
  document_id: string
  title: string
  difficulty: string
  num_questions: number
  created_at: string
  questions: Array<{
    id: string
    question: string
    options: string[]
    correct_answer: number
    explanation: string
  }>
  attempts: Array<{
    id: string
    score: number
    completed_at: string
  }>
}

export interface GuestFlashcardDeck {
  id: string
  document_id: string
  title: string
  created_at: string
  flashcards: Array<{
    id: string
    front: string
    back: string
    mastered: boolean
  }>
}

const STORAGE_KEYS = {
  DOCUMENTS: "elem_guest_documents",
  CHATS: "elem_guest_chats",
  QUIZZES: "elem_guest_quizzes",
  FLASHCARDS: "elem_guest_flashcards",
  IS_GUEST: "elem_is_guest_mode",
}

// Helper to check if we're in guest mode
export function isGuestMode(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(STORAGE_KEYS.IS_GUEST) === "true"
}

export function enableGuestMode() {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.IS_GUEST, "true")
}

export function disableGuestMode() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.IS_GUEST)
}

// Documents
export function getGuestDocuments(): GuestDocument[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS)
  return data ? JSON.parse(data) : []
}

export function saveGuestDocument(doc: GuestDocument) {
  if (typeof window === "undefined") return
  const docs = getGuestDocuments()
  const existing = docs.findIndex((d) => d.id === doc.id)
  if (existing >= 0) {
    docs[existing] = doc
  } else {
    docs.push(doc)
  }
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs))
}

export function deleteGuestDocument(id: string) {
  if (typeof window === "undefined") return
  const docs = getGuestDocuments().filter((d) => d.id !== id)
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs))
}

// Chats
export function getGuestChats(): GuestChat[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.CHATS)
  return data ? JSON.parse(data) : []
}

export function saveGuestChat(chat: GuestChat) {
  if (typeof window === "undefined") return
  const chats = getGuestChats()
  const existing = chats.findIndex((c) => c.id === chat.id)
  if (existing >= 0) {
    chats[existing] = chat
  } else {
    chats.push(chat)
  }
  localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats))
}

// Quizzes
export function getGuestQuizzes(): GuestQuiz[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.QUIZZES)
  return data ? JSON.parse(data) : []
}

export function saveGuestQuiz(quiz: GuestQuiz) {
  if (typeof window === "undefined") return
  const quizzes = getGuestQuizzes()
  const existing = quizzes.findIndex((q) => q.id === quiz.id)
  if (existing >= 0) {
    quizzes[existing] = quiz
  } else {
    quizzes.push(quiz)
  }
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes))
}

// Flashcards
export function getGuestFlashcardDecks(): GuestFlashcardDeck[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.FLASHCARDS)
  return data ? JSON.parse(data) : []
}

export function saveGuestFlashcardDeck(deck: GuestFlashcardDeck) {
  if (typeof window === "undefined") return
  const decks = getGuestFlashcardDecks()
  const existing = decks.findIndex((d) => d.id === deck.id)
  if (existing >= 0) {
    decks[existing] = deck
  } else {
    decks.push(deck)
  }
  localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(decks))
}

// Clear all guest data (used when syncing to account)
export function clearGuestData() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.DOCUMENTS)
  localStorage.removeItem(STORAGE_KEYS.CHATS)
  localStorage.removeItem(STORAGE_KEYS.QUIZZES)
  localStorage.removeItem(STORAGE_KEYS.FLASHCARDS)
  localStorage.removeItem(STORAGE_KEYS.IS_GUEST)
}

// Get all guest data for syncing
export function getAllGuestData() {
  return {
    documents: getGuestDocuments(),
    chats: getGuestChats(),
    quizzes: getGuestQuizzes(),
    flashcards: getGuestFlashcardDecks(),
  }
}
