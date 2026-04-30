// API configuration constants
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.tapswap.com',
  VERSION: process.env.EXPO_PUBLIC_API_VERSION || 'v1',
  TIMEOUT: 30000,
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  WALLET: {
    GET_BALANCE: '/wallet/balance',
    GET_HISTORY: '/wallet/history',
  },
  TRANSFER: {
    INITIATE: '/transfer/initiate',
    CONFIRM: '/transfer/confirm',
  },
  AI: {
    SUGGEST: '/ai/suggest',
    PARSE_AMOUNT: '/ai/parse-amount',
    CHAT: '/ai/chat',
  },
}
