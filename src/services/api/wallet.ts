// src/services/api/wallet.ts - Wallet API
import { getApiClient } from './client'
import { API_ENDPOINTS } from '@/constants'
import { Wallet, Transfer } from '@/types'

export const walletApi = {
  getBalance: async (): Promise<Wallet> => {
    const client = getApiClient()
    const response = await client.get(API_ENDPOINTS.WALLET.GET_BALANCE)
    return response.data
  },

  getHistory: async (page = 1, limit = 20): Promise<Transfer[]> => {
    const client = getApiClient()
    // TODO: Update to support query parameters
    const response = await client.get(API_ENDPOINTS.WALLET.GET_HISTORY)
    return response.data
  },
}
