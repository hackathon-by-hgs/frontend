// src/contexts/AuthContext.tsx - Authentication Context
import React, { createContext, useState, useEffect, useCallback } from 'react'
import { User, AuthToken } from '@/types'
import { secureStorage, localStorage } from '@/services/storage'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (emailOrData: string | any, password?: string, name?: string) => Promise<void>
  verifyOTP: (email: string, otp: string) => Promise<void>
  loading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = await secureStorage.getToken()
        const savedUser = await localStorage.getUserData()

        if (savedToken && savedUser) {
          setToken(savedToken)
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

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Call login API
      // const response = await api.post('/auth/login', { email, password })
      // const { user, token } = response.data
      
      // await secureStorage.setToken(token)
      // await localStorage.setUserData(user)
      // setUser(user)
      // setToken(token)
      // setIsAuthenticated(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await secureStorage.removeToken()
      await localStorage.clearAll()
      setUser(null)
      setToken(null)
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
      const nm = typeof emailOrData === 'string' ? name : emailOrData.name
      
      // TODO: Call signup API
      // const response = await api.post('/auth/signup', { email, password: pwd, name: nm })
      // const { user, token } = response.data
      
      // await secureStorage.setToken(token)
      // await localStorage.setUserData(user)
      // setUser(user)
      // setToken(token)
      // setIsAuthenticated(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Call OTP verification API
      // const response = await api.post('/auth/verify-otp', { email, otp })
      // const { user, token } = response.data
      
      // await secureStorage.setToken(token)
      // await localStorage.setUserData(user)
      // setUser(user)
      // setToken(token)
      // setIsAuthenticated(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OTP verification failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
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
