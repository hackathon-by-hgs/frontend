// src/services/api/transfers.ts - Transfer API
import { getApiClient } from './client'
import { API_ENDPOINTS } from '@/constants'
import { NFCPayload } from '@/types'

export const transfersApi = {
  initiate: async (amount: number, recipientId: string): Promise<{ nfcPayload: NFCPayload }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.TRANSFER.INITIATE, {
      amount,
      recipientId,
    })
    return response.data
  },

  confirm: async (nonce: string, transferData: any): Promise<{ success: boolean }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.TRANSFER.CONFIRM, {
      nonce,
      ...transferData,
    })
    return response.data
  },
}
