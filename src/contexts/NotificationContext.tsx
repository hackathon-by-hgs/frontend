// src/contexts/NotificationContext.tsx - Notification/Toast Context
import React, { createContext, useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface NotificationContextType {
  toasts: Toast[]
  showToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
  clearAll: () => void
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType, duration = 3000) => {
    const id = Date.now().toString()
    const toast: Toast = { id, message, type, duration }

    setToasts((prev) => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <NotificationContext.Provider value={{ toasts, showToast, removeToast, clearAll }}>
      {children}
    </NotificationContext.Provider>
  )
}
