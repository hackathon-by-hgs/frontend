// src/utils/logger.ts - Logging Utility
const isDev = process.env.EXPO_PUBLIC_ENABLE_DEBUG === 'true'

export const logger = {
  log: (message: string, data?: any) => {
    if (isDev) console.log(`[LOG] ${message}`, data)
  },

  info: (message: string, data?: any) => {
    if (isDev) console.info(`[INFO] ${message}`, data)
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data)
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error)
  },

  debug: (message: string, data?: any) => {
    if (isDev) console.debug(`[DEBUG] ${message}`, data)
  },
}

export default logger
