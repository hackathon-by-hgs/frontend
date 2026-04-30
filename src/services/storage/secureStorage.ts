// src/services/storage/secureStorage.ts - Secure Token Storage
// Note: Requires expo-secure-store for production
// Using memory cache for development
const secureMemory: Record<string, string> = {}

const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
}

export const secureStorage = {
  // Token management
  setToken: async (token: string) => {
    try {
      secureMemory[KEYS.ACCESS_TOKEN] = token
      // TODO: Connect to SecureStore when expo-secure-store is available
      // await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token)
    } catch (error) {
      console.error('Error saving token:', error)
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      return secureMemory[KEYS.ACCESS_TOKEN] || null
    } catch (error) {
      console.error('Error retrieving token:', error)
      return null
    }
  },

  removeToken: async () => {
    try {
      delete secureMemory[KEYS.ACCESS_TOKEN]
    } catch (error) {
      console.error('Error removing token:', error)
    }
  },

  // Refresh token management
  setRefreshToken: async (token: string) => {
    try {
      secureMemory[KEYS.REFRESH_TOKEN] = token
    } catch (error) {
      console.error('Error saving refresh token:', error)
    }
  },

  getRefreshToken: async (): Promise<string | null> => {
    try {
      return secureMemory[KEYS.REFRESH_TOKEN] || null
    } catch (error) {
      console.error('Error retrieving refresh token:', error)
      return null
    }
  },

  // User ID storage
  setUserId: async (userId: string) => {
    try {
      secureMemory[KEYS.USER_ID] = userId
    } catch (error) {
      console.error('Error saving user ID:', error)
    }
  },

  getUserId: async (): Promise<string | null> => {
    try {
      return secureMemory[KEYS.USER_ID] || null
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
    } catch (error) {
      console.error('Error clearing secure storage:', error)
    }
  },
}

