// src/utils/biometric.ts - Biometric Authentication
// Note: Requires expo-local-authentication for production
// TODO: Implement when expo-local-authentication is available

export const biometric = {
  isAvailable: async (): Promise<boolean> => {
    console.log('Biometric check not yet implemented')
    return false
  },

  authenticate: async (): Promise<boolean> => {
    console.log('Biometric authentication not yet implemented')
    return false
  },

  getSupportedTypes: async (): Promise<any[]> => {
    return []
  },
}

export default biometric
