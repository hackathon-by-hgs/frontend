// Validation utilities

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export const isValidPassword = (password: string): { isValid: boolean; feedback?: string } => {
  const errors = []
  if (password.length < 8) errors.push('At least 8 characters')
  if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter')
  if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter')
  if (!/[0-9]/.test(password)) errors.push('At least one number')
  if (!/[!@#$%^&*]/.test(password)) errors.push('At least one special character')
  return {
    isValid: errors.length === 0,
    feedback: errors.length > 0 ? errors.join(', ') : undefined,
  }
}

export const isValidAmount = (amount: string | number): boolean => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return !isNaN(num) && num > 0
}

export const validation = {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidAmount,
}

export default validation
