"use client"

import useSWR from "swr"
import { getGuestDocuments, enableGuestMode } from "@/lib/storage/guest-storage"

export function useDocuments() {
  const { data, error, isLoading, mutate } = useSWR("documents", async () => {
    enableGuestMode()
    return getGuestDocuments()
  })

  return {
    documents: data || [],
    isLoading,
    error,
    mutate,
  }
}
