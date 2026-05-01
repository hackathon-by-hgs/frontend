// src/services/storage/secureStorage.ts - Secure Token Storage
//
// Uses expo-secure-store on native platforms. Falls back to in-memory storage
// (e.g. web / environments where SecureStore isn't available).
let SecureStore: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SecureStore = require('expo-secure-store')
} catch {
  SecureStore = null
}

const secureMemory: Record<string, string> = {}

const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
}

export const secureStorage = {
  // Access token management
  setToken: async (token: string) => {
    try {
      secureMemory[KEYS.ACCESS_TOKEN] = token
      await SecureStore?.setItemAsync(KEYS.ACCESS_TOKEN, token)
    } catch (error) {
      console.error('Error saving token:', error)
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      const stored = (await SecureStore?.getItemAsync(KEYS.ACCESS_TOKEN)) ?? null
      const token = stored ?? secureMemory[KEYS.ACCESS_TOKEN] ?? null
      if (token) secureMemory[KEYS.ACCESS_TOKEN] = token
      return token
    } catch (error) {
      console.error('Error retrieving token:', error)
      return null
    }
  },

  removeToken: async () => {
    try {
      delete secureMemory[KEYS.ACCESS_TOKEN]
      await SecureStore?.deleteItemAsync(KEYS.ACCESS_TOKEN)
    } catch (error) {
      console.error('Error removing token:', error)
    }
  },

  // Refresh token management
  setRefreshToken: async (token: string) => {
    try {
      secureMemory[KEYS.REFRESH_TOKEN] = token
      await SecureStore?.setItemAsync(KEYS.REFRESH_TOKEN, token)
    } catch (error) {
      console.error('Error saving refresh token:', error)
    }
  },

  getRefreshToken: async (): Promise<string | null> => {
    try {
      const stored = (await SecureStore?.getItemAsync(KEYS.REFRESH_TOKEN)) ?? null
      const token = stored ?? secureMemory[KEYS.REFRESH_TOKEN] ?? null
      if (token) secureMemory[KEYS.REFRESH_TOKEN] = token
      return token
    } catch (error) {
      console.error('Error retrieving refresh token:', error)
      return null
    }
  },

  removeRefreshToken: async () => {
    try {
      delete secureMemory[KEYS.REFRESH_TOKEN]
      await SecureStore?.deleteItemAsync(KEYS.REFRESH_TOKEN)
    } catch (error) {
      console.error('Error removing refresh token:', error)
    }
  },

  // User ID storage
  setUserId: async (userId: string) => {
    try {
      secureMemory[KEYS.USER_ID] = userId
      await SecureStore?.setItemAsync(KEYS.USER_ID, userId)
    } catch (error) {
      console.error('Error saving user ID:', error)
    }
  },

  getUserId: async (): Promise<string | null> => {
    try {
      const stored = (await SecureStore?.getItemAsync(KEYS.USER_ID)) ?? null
      const userId = stored ?? secureMemory[KEYS.USER_ID] ?? null
      if (userId) secureMemory[KEYS.USER_ID] = userId
      return userId
    } catch (error) {
      console.error('Error retrieving user ID:', error)
      return null
    }
  },

  // Clear all secure data
  clearAll: async () => {
    try {
      Object.keys(secureMemory).forEach(key => {
        delete secureMemory[key]
      })
      await Promise.all([
        SecureStore?.deleteItemAsync(KEYS.ACCESS_TOKEN),
        SecureStore?.deleteItemAsync(KEYS.REFRESH_TOKEN),
        SecureStore?.deleteItemAsync(KEYS.USER_ID),
      ])
    } catch (error) {
      console.error('Error clearing secure storage:', error)
    }
  },
}

