// src/services/api/client.ts - API Client Setup (fetch-based)
import { getApiBaseUrl, API_ENDPOINTS } from '@/constants'
import { secureStorage } from '@/services/storage'
import { extractTokens, unwrapPayload } from '@/services/api/authNormalize'

interface ApiClientOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  signal?: AbortSignal
}

let baseURL: string
let refreshInFlight: Promise<string | null> | null = null

export const initializeApiClient = async () => {
  baseURL = getApiBaseUrl()
  return { success: true }
}

type ApiResponse<T> = {
  data: T
  status: number
  headers: Headers
}

type ApiError = Error & {
  status?: number
  data?: unknown
}

const toApiError = async (response: Response) => {
  const err: ApiError = new Error(`Request failed with status ${response.status}`)
  err.status = response.status
  try {
    err.data = await response.clone().json()
  } catch {
    try {
      err.data = await response.clone().text()
    } catch {
      err.data = null
    }
  }
  return err
}

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await secureStorage.getRefreshToken()
  if (!refreshToken) return null

  // Coalesce concurrent refresh attempts.
  if (refreshInFlight) return refreshInFlight

  refreshInFlight = (async () => {
    try {
      const response = await fetch(`${baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        await secureStorage.clearAll()
        return null
      }

      const json = await response.json()
      const parsed = extractTokens(json)
      const inner = unwrapPayload(json) as Record<string, unknown>

      const accessToken =
        parsed?.accessToken ??
        (typeof inner?.accessToken === 'string' ? inner.accessToken : undefined)

      if (!accessToken) return null

      const newRefresh =
        parsed?.refreshToken ??
        (typeof inner?.refreshToken === 'string' ? inner.refreshToken : undefined)
      const refreshTokenToStore = newRefresh ?? (await secureStorage.getRefreshToken())
      if (!refreshTokenToStore) return null

      await secureStorage.setToken(accessToken)
      await secureStorage.setRefreshToken(refreshTokenToStore)

      return accessToken
    } finally {
      refreshInFlight = null
    }
  })()

  return refreshInFlight
}

export const getApiClient = () => {
  if (!baseURL) {
    throw new Error('API Client not initialized. Call initializeApiClient first.')
  }
  
  return {
    async request<T = any>(endpoint: string, options: ApiClientOptions = {}, _retried = false): Promise<ApiResponse<T>> {
      try {
        const token = await secureStorage.getToken()
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...options.headers,
        }
        
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }
        
        const response = await fetch(`${baseURL}${endpoint}`, {
          method: options.method || 'GET',
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: options.signal,
        })
        
        if (response.status === 401 && !_retried) {
          const newAccessToken = await refreshAccessToken()
          if (newAccessToken) {
            return this.request<T>(
              endpoint,
              {
                ...options,
                headers: {
                  ...options.headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              },
              true
            )
          }
        }

        if (!response.ok) {
          throw await toApiError(response)
        }

        const json = await response.json()
        // Support both `{ data: ... }` and raw JSON responses.
        const data = (json?.data ?? json) as T
        return { data, status: response.status, headers: response.headers }
      } catch (error) {
        console.error('API request error:', error)
        throw error
      }
    },
    
    async get<T = any>(endpoint: string, options: ApiClientOptions = {}) {
      return this.request<T>(endpoint, { ...options, method: 'GET' })
    },
    
    async post<T = any>(endpoint: string, body?: any, options: ApiClientOptions = {}) {
      return this.request<T>(endpoint, { ...options, method: 'POST', body })
    },
    
    async put<T = any>(endpoint: string, body?: any, options: ApiClientOptions = {}) {
      return this.request<T>(endpoint, { ...options, method: 'PUT', body })
    },
    
    async delete<T = any>(endpoint: string, options: ApiClientOptions = {}) {
      return this.request<T>(endpoint, { ...options, method: 'DELETE' })
    },
  }
}


