// src/utils/errorHandler.ts - Error Handling Utility
export interface AppError {
  message: string
  code?: string
  statusCode?: number
  details?: any
}

export const handleError = (error: any): AppError => {
  if (error.response) {
    // API error
    return {
      message: error.response.data?.message || 'An error occurred',
      code: error.response.data?.code,
      statusCode: error.response.status,
      details: error.response.data,
    }
  } else if (error.message) {
    // Other errors
    return {
      message: error.message,
      details: error,
    }
  } else {
    return {
      message: 'An unexpected error occurred',
      details: error,
    }
  }
}

export const isNetworkError = (error: any): boolean => {
  return !error.response || error.code === 'ECONNABORTED'
}

export const isAuthError = (error: any): boolean => {
  return error.response?.status === 401 || error.response?.status === 403
}

export const isValidationError = (error: any): boolean => {
  return error.response?.status === 400
}
