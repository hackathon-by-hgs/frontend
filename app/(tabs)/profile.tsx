import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { theme } from '@/theme'
import { useAuth } from '@/hooks/useAuth'
import { useContext, useState } from 'react'
import { NotificationContext } from '@/contexts/NotificationContext'

export default function ProfileRoute() {
  const { user, logout } = useAuth()
  const notification = useContext(NotificationContext)
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      notification?.showToast('Logged out', 'info')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <View style={{ paddingHorizontal: theme.spacing[16], paddingVertical: theme.spacing[24] }}>
        <Text style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.text.primary }}>
          Profile
        </Text>
        <Text style={{ color: theme.colors.text.secondary, marginTop: theme.spacing[8] }}>
          {user?.displayName || user?.name || user?.email || 'Signed in'}
        </Text>

        <Pressable
          onPress={handleLogout}
          disabled={loading}
          style={({ pressed }) => ({
            marginTop: theme.spacing[24],
            backgroundColor: loading ? theme.colors.error + '80' : theme.colors.error,
            borderRadius: theme.radius.md,
            paddingVertical: theme.spacing[12],
            paddingHorizontal: theme.spacing[16],
            alignItems: 'center',
            opacity: pressed && !loading ? 0.9 : 1,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: theme.spacing[8],
            ...theme.shadows.sm,
          })}
        >
          {loading && <ActivityIndicator color="white" size="small" />}
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold }}>
            {loading ? 'Signing out…' : 'Sign out'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
