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

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after a short delay
    SplashScreen.hideAsync()
  }, [])

  return (
    <AuthProvider>
      <WalletProvider>
        <RootLayoutNav />
      </WalletProvider>
    </AuthProvider>
  )
}

function RootLayoutNav() {
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
