// API configuration — aligned with Swagger: https://nfcsender.up.railway.app/api-docs#/
// All documented routes live under `/api` (e.g. `/api/auth/login`).

export const API_CONFIG = {
  BASE_URL: (process.env.EXPO_PUBLIC_API_BASE_URL || 'https://nfcsender.up.railway.app').replace(/\/$/, ''),
  /** Path prefix before resource paths below (default `/api`) */
  API_PREFIX: (process.env.EXPO_PUBLIC_API_PREFIX || '/api').replace(/\/$/, ''),
  TIMEOUT: Number(process.env.EXPO_PUBLIC_AUTH_TIMEOUT) || 30000,
}

/** Full origin + `/api` (no trailing slash) */
export const getApiBaseUrl = () => `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}`

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  WALLET: {
    CREATE: '/wallet',
    GET_BALANCE: '/wallet/balance',
    GET_TRANSACTIONS: '/wallet/transactions',
  },
  TRANSFER: {
    INITIATE: '/transfer/initiate',
    EXECUTE: '/transfer/execute',
  },
  AI: {
    SUGGEST: '/ai/suggest',
    PARSE_AMOUNT: '/ai/parse-amount',
    CHAT: '/ai/chat',
  },
}
