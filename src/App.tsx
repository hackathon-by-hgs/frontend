// App.tsx
import { AuthProvider } from '@/contexts/AuthContext'
import { WalletProvider } from '@/contexts/WalletContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import  NfcManager  from 'react-native-nfc-manager'
import { QueryProvider } from '@/providers/query.provider'
import { Slot } from 'expo-router'
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
  NfcManager.start()
  return () => {
    NfcManager.cancelTechnologyRequest()
  }
}, [])

  return (
    <QueryProvider>
      <NotificationProvider>
        <AuthProvider>
          <WalletProvider>
            <Slot />
          </WalletProvider>
        </AuthProvider>
      </NotificationProvider>
    </QueryProvider>
  )
}