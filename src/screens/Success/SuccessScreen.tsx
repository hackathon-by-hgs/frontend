import React, { useEffect } from 'react'
import { View, ScrollView, Pressable, Text } from 'react-native'
import { formatCurrency } from '@/utils/formatting'
import { theme } from '@/theme'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function SuccessScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const type = (params?.type as string) || 'transfer'
  const amount = (params?.amount as string)
  const recipient = (params?.recipient as string)

  useEffect(() => {
    // Auto-navigate to home after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <ScrollView 
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing[16],
          paddingVertical: theme.spacing[24],
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
        }}
      >
        {/* Success Icon */}
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: theme.colors.success + '20',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing[24],
          }}
        >
          <Text style={{ fontSize: theme.typography.fontSize['3xl'] }}>✓</Text>
        </View>

        {/* Success Message */}
        <Text
          style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            textAlign: 'center',
            marginBottom: theme.spacing[8],
          }}
        >
          {type === 'send' ? 'Money Sent!' : 'Money Received!'}
        </Text>
        <Text
          style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.secondary,
            textAlign: 'center',
            marginBottom: theme.spacing[24],
          }}
        >
          Your transaction has been completed
        </Text>

        {/* Transaction Details */}
        <View
          style={{
            backgroundColor: theme.colors.border.primary,
            borderRadius: theme.radius.lg,
            padding: theme.spacing[20],
            width: '100%',
            marginBottom: theme.spacing[24],
          }}
        >
          <View style={{ marginBottom: theme.spacing[16] }}>
            <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.xs, marginBottom: theme.spacing[4] }}>
              {type === 'send' ? 'Sent to' : 'Received from'}
            </Text>
            <Text style={{ color: theme.colors.text.primary, fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold }} selectable>
              {recipient}
            </Text>
          </View>

          <View>
            <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.xs, marginBottom: theme.spacing[4] }}>
              Amount
            </Text>
            <Text style={{ color: theme.colors.success, fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold }} selectable>
              {type === 'send' ? '-' : '+'}
              {formatCurrency(parseFloat(amount) || 0)}
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={{ gap: theme.spacing[12], width: '100%' }}>
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            style={({ pressed }) => ({
              backgroundColor: theme.colors.primary,
              borderRadius: theme.radius.md,
              paddingVertical: theme.spacing[12],
              alignItems: 'center',
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: 'white',
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              Go to Home
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/(tabs)/history')}
            style={({ pressed }) => ({
              borderWidth: 1,
              borderColor: theme.colors.border.primary,
              borderRadius: theme.radius.md,
              paddingVertical: theme.spacing[12],
              alignItems: 'center',
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              style={{
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              View History
            </Text>
          </Pressable>
        </View>

        {/* Auto-redirect message */}
        <Text
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.tertiary,
            marginTop: theme.spacing[24],
            textAlign: 'center',
          }}
        >
          Redirecting to home in a few seconds...
        </Text>
      </View>
    </ScrollView>
  )
}

