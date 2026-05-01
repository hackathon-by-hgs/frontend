// src/services/api/auth.ts — TapSwap auth (Swagger: https://nfcsender.up.railway.app/api-docs#/)
import { getApiClient } from './client'
import { API_ENDPOINTS } from '@/constants'
import type { AuthToken, User } from '@/types'
import { extractTokens, extractUser, unwrapPayload } from '@/services/api/authNormalize'
import { secureStorage } from '@/services/storage'

export type AuthSession = { user: User; token: AuthToken }

async function buildSessionFromAuthResponse(raw: unknown): Promise<AuthSession> {
  const tokens = extractTokens(raw)
  if (!tokens) {
    throw new Error('Login response did not include access and refresh tokens')
  }

  await secureStorage.setToken(tokens.accessToken)
  await secureStorage.setRefreshToken(tokens.refreshToken)

  let user = extractUser(raw)
  if (!user?.id) {
    user = await authApi.getMe()
  }

  if (!user?.id) {
    throw new Error('Could not resolve user after login')
  }

  return { user, token: tokens }
}

export const authApi = {
  /**
   * Swagger: `LoginDto` — `{ email, password }`
   */
  login: async (email: string, password: string): Promise<AuthSession> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    })
    return buildSessionFromAuthResponse(response.data)
  },

  /**
   * Swagger: `SignupDto` — `{ name, email, password }`.
   * Returns a session when the API responds with JWTs; otherwise `null` (sign in manually).
   */
  register: async (name: string, email: string, password: string): Promise<AuthSession | null> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AUTH.REGISTER, {
      name,
      email,
      password,
    })
    const raw = response.data
    if (!extractTokens(raw)) return null
    return buildSessionFromAuthResponse(raw)
  },

  /** Swagger: GET `/api/auth/me`, bearer JWT */
  getMe: async (): Promise<User> => {
    const client = getApiClient()
    const response = await client.get(API_ENDPOINTS.AUTH.ME)
    const payload = unwrapPayload(response.data)
    const user = extractUser(payload)
    if (!user?.id) {
      throw new Error('Invalid profile response from /auth/me')
    }
    return user
  },

  /** No logout route in Swagger — client clears storage only */
  logout: async (): Promise<void> => {},

  refreshToken: async (refreshToken: string): Promise<AuthToken> => {
    const client = getApiClient()
    const response = await client.post(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    })
    const tokens = extractTokens(response.data)
    if (!tokens) {
      throw new Error('Refresh response did not include tokens')
    }
    return tokens
  },

  /**
   * OTP is not part of this API spec — kept for legacy screens.
   */
  verifyOTP: async (_email: string, _otp: string): Promise<AuthSession> => {
    throw new Error('OTP verification is not supported by this backend (see /api/auth/* in Swagger).')
  },
}
