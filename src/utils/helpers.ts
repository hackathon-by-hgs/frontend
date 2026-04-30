// src/utils/helpers.ts - General Helper Functions
export const helpers = {
  sleep: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  },

  retry: async <T,>(
    fn: () => Promise<T>,
    maxAttempts = 3,
    delayMs = 1000
  ): Promise<T> => {
    let lastError: any
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        if (i < maxAttempts - 1) {
          await helpers.sleep(delayMs * Math.pow(2, i)) // Exponential backoff
        }
      }
    }
    throw lastError
  },

  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  },

  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  generateId: (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
}

export default helpers
