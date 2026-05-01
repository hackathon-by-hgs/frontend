// useAI.ts — calls `aiApi` only when EXPO_PUBLIC_ENABLE_AI_API=true
import { useState, useCallback } from 'react'
import { aiApi, AiApiDisabledError, isAiApiEnabled } from '@/services/api/ai'

export interface UseAIReturn {
  /** False until backend ships `/api/ai/*` and env flag is enabled */
  isAiAvailable: boolean
  suggest: (recipientId?: string) => Promise<number | null>
  parseAmount: (text: string) => Promise<number | null>
  chat: (message: string) => Promise<string>
  isSuggestLoading: boolean
  isParsingLoading: boolean
  isChatLoading: boolean
  error: string | null
}

const formatHookError = (err: unknown): string => {
  if (err instanceof AiApiDisabledError) return err.message
  if (err instanceof Error) return err.message
  return 'AI request failed'
}

export const useAI = (): UseAIReturn => {
  const [isSuggestLoading, setIsSuggestLoading] = useState(false)
  const [isParsingLoading, setIsParsingLoading] = useState(false)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const suggest = useCallback(async (recipientId?: string): Promise<number | null> => {
    if (!isAiApiEnabled()) {
      setError(new AiApiDisabledError().message)
      return null
    }
    setError(null)
    setIsSuggestLoading(true)
    try {
      const data = await aiApi.suggest(recipientId)
      return typeof data?.suggestion === 'number' ? data.suggestion : null
    } catch (e) {
      setError(formatHookError(e))
      return null
    } finally {
      setIsSuggestLoading(false)
    }
  }, [])

  const parseAmount = useCallback(async (text: string): Promise<number | null> => {
    if (!isAiApiEnabled()) {
      setError(new AiApiDisabledError().message)
      return null
    }
    setError(null)
    setIsParsingLoading(true)
    try {
      const data = await aiApi.parseAmount(text)
      return typeof data?.suggestion === 'number' ? data.suggestion : null
    } catch (e) {
      setError(formatHookError(e))
      return null
    } finally {
      setIsParsingLoading(false)
    }
  }, [])

  const chat = useCallback(async (message: string): Promise<string> => {
    if (!isAiApiEnabled()) {
      const msg = new AiApiDisabledError().message
      setError(msg)
      return ''
    }
    setError(null)
    setIsChatLoading(true)
    try {
      const data = await aiApi.chat(message)
      return typeof data?.response === 'string' ? data.response : ''
    } catch (e) {
      setError(formatHookError(e))
      return ''
    } finally {
      setIsChatLoading(false)
    }
  }, [])

  return {
    isAiAvailable: isAiApiEnabled(),
    suggest,
    parseAmount,
    chat,
    isSuggestLoading,
    isParsingLoading,
    isChatLoading,
    error,
  }
}
