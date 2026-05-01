// AI API — gated until backend exposes `/api/ai/*` (see Swagger; flag: EXPO_PUBLIC_ENABLE_AI_API).
import { getApiClient } from './client'
import { API_ENDPOINTS, FEATURE_FLAGS } from '@/constants'

export class AiApiDisabledError extends Error {
  constructor() {
    super(
      'AI API calls are disabled. Set EXPO_PUBLIC_ENABLE_AI_API=true when the backend exposes /api/ai/* routes.'
    )
    this.name = 'AiApiDisabledError'
  }
}

export const isAiApiEnabled = () => FEATURE_FLAGS.AI_API

function assertAiEnabled(): void {
  if (!FEATURE_FLAGS.AI_API) {
    throw new AiApiDisabledError()
  }
}

export const aiApi = {
  suggest: async (recipientId?: string): Promise<{ suggestion: number }> => {
    assertAiEnabled()
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AI.SUGGEST, {
      recipientId,
    })
    return response.data as { suggestion: number }
  },

  parseAmount: async (text: string): Promise<{ suggestion: number }> => {
    assertAiEnabled()
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AI.PARSE_AMOUNT, {
      text,
    })
    return response.data as { suggestion: number }
  },

  chat: async (message: string): Promise<{ response: string }> => {
    assertAiEnabled()
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AI.CHAT, {
      message,
    })
    return response.data as { response: string }
  },
}
