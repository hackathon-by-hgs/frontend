// src/services/api/auth.ts - Authentication API
import { getApiClient } from './client'
import { API_ENDPOINTS } from '@/constants'
import { AuthToken, User } from '@/types'

export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: AuthToken }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    })
    return response.data
  },

  signup: async (
    email: string,
    password: string,
    displayName: string
  ): Promise<{ user: User; token: AuthToken }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AUTH.SIGNUP, {
      email,
      password,
      displayName,
    })
    return response.data
  },

  verifyOTP: async (email: string, otp: string): Promise<{ user: User; token: AuthToken }> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      email,
      otp,
    })
    return response.data
  },

  logout: async (): Promise<void> => {
    const client = getApiClient()
    await client.post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  refreshToken: async (refreshToken: string): Promise<AuthToken> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    })
    return response.data
  },
}
