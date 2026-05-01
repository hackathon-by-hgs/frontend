// Transfer API — Swagger: `InitiateTransferDto`, `ExecuteTransferDto`
import { getApiClient } from './client'
import { API_ENDPOINTS } from '@/constants'

export const transfersApi = {
  /** Swagger fields: `recieverId`, `amount`, `description` */
  initiate: async (amount: number, recieverId: string, description: string): Promise<unknown> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.TRANSFER.INITIATE, {
      recieverId,
      amount,
      description,
    })
    return response.data
  },

  /** Receiver executes transfer with signed JWT / token from NFC payload */
  execute: async (token: string): Promise<unknown> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.TRANSFER.EXECUTE, {
      token,
    })
    return response.data
  },

  /** @deprecated Prefer `execute` — legacy name used earlier in the app scaffold */
  confirm: async (token: string) => transfersApi.execute(token),
}
