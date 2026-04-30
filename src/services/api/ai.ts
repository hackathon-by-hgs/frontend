// src/services/api/ai.ts - AI API
import { getApiClient } from './client'
import { API_ENDPOINTS } from '@/constants'

export const aiApi = {
  suggest: async (recipientId?: string): Promise<{ suggestion: number }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AI.SUGGEST, {
      recipientId,
    })
    return response.data
  },

  parseAmount: async (text: string): Promise<{ suggestion: number }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AI.PARSE_AMOUNT, {
      text,
    })
    return response.data
  },

  chat: async (message: string): Promise<{ response: string }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AI.CHAT, {
      message,
    })
    return response.data
  },
}
