// src/services/nfc/nfcParser.ts - NFC Payload Parser
import { NFCPayload } from '@/types'
import { NFC_ERRORS } from '@/constants'

export const nfcParser = {
  parsePayload: (data: string): NFCPayload => {
    try {
      const parsed = JSON.parse(data)
      
      // Validate required fields
      if (!parsed.senderId || !parsed.amount || !parsed.token || !parsed.timestamp || !parsed.nonce) {
        throw new Error(NFC_ERRORS.INVALID_TAG)
      }

      return {
        senderId: parsed.senderId,
        amount: parsed.amount,
        token: parsed.token,
        timestamp: parsed.timestamp,
        nonce: parsed.nonce,
      }
    } catch (error) {
      throw new Error(NFC_ERRORS.INVALID_TAG)
    }
  },

  createPayload: (senderId: string, amount: number, token: string): NFCPayload => {
    return {
      senderId,
      amount,
      token,
      timestamp: Date.now(),
      nonce: Math.random().toString(36).substring(7),
    }
  },
}
