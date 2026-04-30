// src/services/api/client.ts - API Client Setup
import { API_CONFIG, API_ENDPOINTS } from '@/constants'
import { secureStorage } from '@/services/storage'

interface ApiClientOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

let baseURL: string

export const initializeApiClient = async () => {
  baseURL = `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}`
  return { success: true }
}

export const getApiClient = () => {
  if (!baseURL) {
    throw new Error('API Client not initialized. Call initializeApiClient first.')
  }
  
  return {
    async request(endpoint: string, options: ApiClientOptions = {}) {
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
        })
        
        if (response.status === 401) {
          console.log('Token expired, redirecting to login')
        }
        
        return response.json()
      } catch (error) {
        console.error('API request error:', error)
        throw error
      }
    },
    
    async get(endpoint: string, options: ApiClientOptions = {}) {
      return this.request(endpoint, { ...options, method: 'GET' })
    },
    
    async post(endpoint: string, body?: any, options: ApiClientOptions = {}) {
      return this.request(endpoint, { ...options, method: 'POST', body })
    },
    
    async put(endpoint: string, body?: any, options: ApiClientOptions = {}) {
      return this.request(endpoint, { ...options, method: 'PUT', body })
    },
    
    async delete(endpoint: string, options: ApiClientOptions = {}) {
      return this.request(endpoint, { ...options, method: 'DELETE' })
    },
  }
}


