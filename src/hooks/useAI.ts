// useAI.ts - AI assistant integration
import { useState, useCallback } from 'react'

export interface UseAIReturn {
  suggest: (recipientId?: string) => Promise<number | null>
  parseAmount: (text: string) => Promise<number | null>
  chat: (message: string) => Promise<string>
  isSuggestLoading: boolean
  isParsingLoading: boolean
  isChatLoading: boolean
  error: string | null
}

export const useAI = (): UseAIReturn => {
  const [isSuggestLoading, setIsSuggestLoading] = useState(false)
  const [isParsingLoading, setIsParsingLoading] = useState(false)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const suggest = useCallback(async (recipientId?: string): Promise<number | null> => {
    setIsSuggestLoading(true)
    try {
      // TODO: Call AI suggestion endpoint
      return null
    } finally {
      setIsSuggestLoading(false)
    }
  }, [])

  const parseAmount = useCallback(async (text: string): Promise<number | null> => {
    setIsParsingLoading(true)
    try {
      // TODO: Call AI parse-amount endpoint
      return null
    } finally {
      setIsParsingLoading(false)
    }
  }, [])

  const chat = useCallback(async (message: string): Promise<string> => {
    setIsChatLoading(true)
    try {
      // TODO: Call AI chat endpoint
      return ''
    } finally {
      setIsChatLoading(false)
    }
  }, [])

  return {
    suggest,
    parseAmount,
    chat,
    isSuggestLoading,
    isParsingLoading,
    isChatLoading,
    error,
  }
}
