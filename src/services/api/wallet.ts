// Wallet API — Swagger: `/api/wallet/balance`, `/api/wallet/transactions`
import { getApiClient } from './client'
import { API_ENDPOINTS } from '@/constants'
import { Wallet, Transfer } from '@/types'

export const walletApi = {
  getBalance: async (): Promise<Wallet> => {
    const client = getApiClient()
    const response = await client.get(API_ENDPOINTS.WALLET.GET_BALANCE)
    return response.data as Wallet
  },

  getTransactions: async (
    page = 1,
    limit = 20,
    filters?: { startDate?: string; endDate?: string; transactionType?: string }
  ): Promise<Transfer[]> => {
    const client = getApiClient()
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    })
    if (filters?.startDate) params.set('startDate', filters.startDate)
    if (filters?.endDate) params.set('endDate', filters.endDate)
    if (filters?.transactionType) params.set('transactionType', filters.transactionType)

    const query = params.toString()
    const path = `${API_ENDPOINTS.WALLET.GET_TRANSACTIONS}?${query}`
    const response = await client.get(path)
    return response.data as Transfer[]
  },

  /** @deprecated Use `getTransactions` */
  getHistory: async (page = 1, limit = 20): Promise<Transfer[]> => walletApi.getTransactions(page, limit),
}
