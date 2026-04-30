// src/services/nfc/nfcReader.ts - NFC Read Service
import { NFC_CONFIG, NFC_ERRORS } from '@/constants'

export interface NFCTag {
  id: string
  payload: string
}

export const nfcReader = {
  read: async (timeout = NFC_CONFIG.READ_TIMEOUT): Promise<NFCTag> => {
    try {
      if (NFC_CONFIG.ENABLE_MOCK) {
        // Mock NFC read for development
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id: 'mock_tag_123',
              payload: JSON.stringify({
                senderId: 'user_456',
                amount: 100,
                token: 'jwt_token',
                timestamp: Date.now(),
                nonce: 'nonce_789',
              }),
            })
          }, 2000)
        })
      }

      // TODO: Implement real NFC reading with expo-nfc
      throw new Error(NFC_ERRORS.NOT_SUPPORTED)
    } catch (error) {
      throw error
    }
  },

  isSupported: async (): Promise<boolean> => {
    try {
      // TODO: Check NFC support
      return false
    } catch {
      return false
    }
  },
}
