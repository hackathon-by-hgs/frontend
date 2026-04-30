// src/services/nfc/nfcWriter.ts - NFC Write Service
import { NFC_CONFIG, NFC_ERRORS } from '@/constants'
import { NFCPayload } from '@/types'

export const nfcWriter = {
  write: async (payload: NFCPayload, timeout = NFC_CONFIG.WRITE_TIMEOUT): Promise<void> => {
    try {
      if (NFC_CONFIG.ENABLE_MOCK) {
        // Mock NFC write for development
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Mock NFC write:', payload)
            resolve()
          }, 1500)
        })
      }

      // TODO: Implement real NFC writing with expo-nfc
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
