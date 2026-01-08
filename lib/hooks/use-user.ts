"use client"

import { useEffect, useState } from "react"

export function useUser() {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  return { user, loading }
}
