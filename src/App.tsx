// App.tsx - Root App Component
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { initializeApiClient } from '@/services/api/client'
import { AuthProvider } from '@/contexts/AuthContext'
import { WalletProvider } from '@/contexts/WalletContext'
import { NotificationProvider } from '@/contexts/NotificationContext'

const RootApp = () => {
  const [apiInitialized, setApiInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeApiClient()
        setApiInitialized(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize app')
      }
    }

    initializeApp()
  }, [])

  if (!apiInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>Error: {error}</Text>
      </View>
    )
  }

  return null
}

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <WalletProvider>
          <RootApp />
        </WalletProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}
