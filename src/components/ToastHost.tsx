import React, { useContext } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { NotificationContext } from '@/contexts/NotificationContext'
import { theme } from '@/theme'

const toastBgByType: Record<string, string> = {
  success: '#16a34a',
  error: theme.colors.error,
  info: theme.colors.primary,
  warning: '#f59e0b',
}

export function ToastHost() {
  const ctx = useContext(NotificationContext)
  if (!ctx) return null

  const { toasts, removeToast } = ctx

  if (!toasts.length) return null

  return (
    <View pointerEvents="box-none" style={styles.root}>
      {toasts.slice(-3).map((t) => (
        <Pressable
          key={t.id}
          onPress={() => removeToast(t.id)}
          style={({ pressed }) => [
            styles.toast,
            { backgroundColor: toastBgByType[t.type] ?? theme.colors.primary, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.toastText} numberOfLines={3}>
            {t.message}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 9999,
    gap: 8,
  },
  toast: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    ...theme.shadows.md,
  },
  toastText: {
    color: 'white',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.normal,
  },
})

