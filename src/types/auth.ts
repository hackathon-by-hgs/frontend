// Type definitions for authentication
export interface User {
  id: string
  email?: string
  phoneOrEmail?: string
  phone?: string
  name?: string
  displayName?: string
  avatar?: string
  accountNumber?: string
  createdAt?: Date
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginRequest {
  phoneOrEmail: string
  password: string
}

export interface SignupRequest {
  phoneOrEmail: string
  password: string
  displayName?: string
}

export interface OTPVerifyRequest {
  phoneOrEmail: string
  otp: string
}
