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
  /** Buyer / seller / admin — when returned by `/api/auth/me` */
  role?: string
  createdAt?: Date
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  /** Seconds until access token expiry, when provided */
  expiresIn?: number
}

export interface LoginRequest {
  phoneOrEmail: string
  password: string
}

export interface SignupRequest {
  /** Swagger: `SignupDto.name` */
  name: string
  email: string
  password: string
}

export interface OTPVerifyRequest {
  phoneOrEmail: string
  otp: string
}
