import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

import { AuthProvider, WalletProvider } from '@/contexts'
import { NotificationProvider } from '@/contexts'
import { ToastHost } from '@/components/ToastHost'
import { useAuth } from '@/hooks/useAuth'
import { useRouter, useSegments } from 'expo-router'

export default function RootLayout() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <WalletProvider>
          <RootLayoutNav />
          <ToastHost />
        </WalletProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}

function RootLayoutNav() {
  const router = useRouter()
  const segments = useSegments()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login')
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)')
    }
  }, [segments, isAuthenticated, loading, router])

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync()
    }
  }, [loading])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="send"
        options={{
          title: 'Send Money',
          presentation: 'modal',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="receive"
        options={{
          title: 'Receive Money',
          presentation: 'modal',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="success"
        options={{
          title: '',
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  )
}
