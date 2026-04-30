// src/services/storage/localStorage.ts - Async Storage Wrapper
// Note: AsyncStorage requires @react-native-async-storage/async-storage package
// For now, using memory cache as fallback
const memoryCache: Record<string, any> = {}

const KEYS = {
  USER_DATA: 'user_data',
  WALLET_DATA: 'wallet_data',
  RECENT_TRANSFERS: 'recent_transfers',
  THEME: 'theme',
  LANGUAGE: 'language',
}

export const localStorage = {
  // User data
  setUserData: async (data: any) => {
    try {
      memoryCache[KEYS.USER_DATA] = JSON.stringify(data)
      // TODO: Connect to AsyncStorage when package is installed
      // await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  },

  getUserData: async () => {
    try {
      const data = memoryCache[KEYS.USER_DATA]
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error retrieving user data:', error)
      return null
    }
  },

  // Wallet data
  setWalletData: async (data: any) => {
    try {
      memoryCache[KEYS.WALLET_DATA] = JSON.stringify(data)
    } catch (error) {
      console.error('Error saving wallet data:', error)
    }
  },

  getWalletData: async () => {
    try {
      const data = memoryCache[KEYS.WALLET_DATA]
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error retrieving wallet data:', error)
      return null
    }
  },

  // Recent transfers
  setRecentTransfers: async (data: any[]) => {
    try {
      memoryCache[KEYS.RECENT_TRANSFERS] = JSON.stringify(data)
    } catch (error) {
      console.error('Error saving recent transfers:', error)
    }
  },

  getRecentTransfers: async () => {
    try {
      const data = memoryCache[KEYS.RECENT_TRANSFERS]
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error retrieving recent transfers:', error)
      return []
    }
  },

  // Clear all local data
  clearAll: async () => {
    try {
      Object.keys(memoryCache).forEach(key => {
        delete memoryCache[key]
      })
    } catch (error) {
      console.error('Error clearing local storage:', error)
    }
  },
}
