// src/contexts/AuthContext.tsx - Authentication Context
import React, { createContext, useState, useEffect, useCallback } from 'react'
import { User, AuthToken } from '@/types'
import { secureStorage, localStorage } from '@/services/storage'
import { initializeApiClient } from '@/services/api/client'
import { authApi } from '@/services/api/auth'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  accessToken: string | null
  refreshToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  /** Returns true when the API returned JWTs and the user is logged in */
  signup: (emailOrData: string | any, password?: string, name?: string) => Promise<boolean>
  verifyOTP: (email: string, otp: string) => Promise<void>
  loading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await initializeApiClient()

        const savedToken = await secureStorage.getToken()
        const savedRefreshToken = await secureStorage.getRefreshToken()
        const savedUser = await localStorage.getUserData()

        if (savedToken && savedUser) {
          setAccessToken(savedToken)
          setRefreshToken(savedRefreshToken)
          setUser(savedUser)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const setSession = useCallback(async (nextUser: User, nextToken: AuthToken) => {
    await secureStorage.setToken(nextToken.accessToken)
    await secureStorage.setRefreshToken(nextToken.refreshToken)
    await localStorage.setUserData(nextUser)

    setUser(nextUser)
    setAccessToken(nextToken.accessToken)
    setRefreshToken(nextToken.refreshToken)
    setIsAuthenticated(true)
  }, [])

  const extractErrorMessage = (err: unknown) => {
    if (err && typeof err === 'object') {
      const anyErr = err as any
      const data = anyErr?.data
      const rawMsg = data?.message ?? data?.error ?? anyErr?.message ?? (typeof data === 'string' ? data : null)
      if (Array.isArray(rawMsg)) return rawMsg.map(String).join(', ')
      if (typeof rawMsg === 'string' && rawMsg.trim()) return rawMsg
    }
    return 'Something went wrong. Please try again.'
  }

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const session = await authApi.login(email, password)
      await setSession(session.user, session.token)
    } catch (err) {
      setError(extractErrorMessage(err))
      throw err
    } finally {
      setLoading(false)
    }
  }, [setSession])

  const logout = useCallback(async () => {
    try {
      try {
        await authApi.logout()
      } catch {
        // Best-effort: user may already be logged out server-side.
      }
      await secureStorage.removeToken()
      await secureStorage.removeRefreshToken()
      await localStorage.clearAll()
      setUser(null)
      setAccessToken(null)
      setRefreshToken(null)
      setIsAuthenticated(false)
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }, [])

  const signup = useCallback(async (emailOrData: string | any, password?: string, name?: string) => {
    setLoading(true)
    setError(null)
    try {
      // Support both object and parameter formats
      const email = typeof emailOrData === 'string' ? emailOrData : emailOrData.email
      const pwd = typeof emailOrData === 'string' ? password : emailOrData.password
      const displayName = typeof emailOrData === 'string' ? name : emailOrData.displayName ?? emailOrData.name

      // Swagger `SignupDto`: name, email, password
      const session = await authApi.register(displayName ?? '', email, pwd)
      if (!session) return false
      await setSession(session.user, session.token)
      return true
    } catch (err) {
      setError(extractErrorMessage(err))
      throw err
    } finally {
      setLoading(false)
    }
  }, [setSession])

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    setLoading(true)
    setError(null)
    try {
      const session = await authApi.verifyOTP(email, otp)
      await setSession(session.user, session.token)
    } catch (err) {
      setError(extractErrorMessage(err))
      throw err
    } finally {
      setLoading(false)
    }
  }, [setSession])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token: accessToken,
        accessToken,
        refreshToken,
        login,
        logout,
        signup,
        verifyOTP,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextType }
