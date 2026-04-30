import React, { useEffect, useState } from 'react'
import { View, ScrollView, Pressable, Text, ActivityIndicator, RefreshControl } from 'react-native'
import { useWallet } from '@/hooks/useWallet'
import { useAuth } from '@/hooks/useAuth'
import { formatCurrency } from '@/utils/formatting'
import { theme } from '@/theme'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { balance, transfers, loading, error, fetchBalance, fetchHistory } = useWallet()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      await Promise.all([fetchBalance(), fetchHistory()])
    } catch (err) {
      // Error handled by hooks
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await loadData()
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <ScrollView 
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ paddingHorizontal: theme.spacing[16], paddingVertical: theme.spacing[16] }}>
        {/* Header */}
        <View style={{ marginBottom: theme.spacing[24] }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing[4],
            }}
          >
            Welcome back,
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            {user?.name || 'User'}
          </Text>
        </View>

        {/* Balance Card */}
        <View
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.lg,
            padding: theme.spacing[20],
            marginBottom: theme.spacing[24],
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: theme.spacing[8],
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            Available Balance
          </Text>
          {loading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <>
              <Text
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: 'white',
                  marginBottom: theme.spacing[16],
                }}
                selectable
              >
                {formatCurrency(balance || 0)}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: theme.spacing[12],
                  justifyContent: 'space-between',
                  paddingTop: theme.spacing[16],
                  borderTopWidth: 1,
                  borderTopColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <View>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: theme.typography.fontSize.xs }}>
                    Account Number
                  </Text>
                  <Text style={{ color: 'white', fontWeight: theme.typography.fontWeight.semibold, marginTop: theme.spacing[4], fontSize: theme.typography.fontSize.sm }} selectable>
                    •••• 4589
                  </Text>
                </View>
                <View>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: theme.typography.fontSize.xs }}>
                    Status
                  </Text>
                  <Text style={{ color: '#4ade80', fontWeight: theme.typography.fontWeight.semibold, marginTop: theme.spacing[4], fontSize: theme.typography.fontSize.sm }}>
                    Active
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Error Message */}
        {error && (
          <View
            style={{
              backgroundColor: theme.colors.error + '15',
              borderRadius: theme.radius.md,
              padding: theme.spacing[12],
              marginBottom: theme.spacing[16],
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.error,
            }}
          >
            <Text
              style={{
                color: theme.colors.error,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {error}
            </Text>
          </View>
        )}

        {/* Quick Actions */}
        <View style={{ marginBottom: theme.spacing[24] }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing[12],
            }}
          >
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', gap: theme.spacing[12] }}>
            <Pressable
              onPress={() => router.push('/send')}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: theme.colors.accent,
                borderRadius: theme.radius.md,
                paddingVertical: theme.spacing[12],
                paddingHorizontal: theme.spacing[12],
                alignItems: 'center',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: theme.typography.fontWeight.semibold,
                  fontSize: theme.typography.fontSize.sm,
                }}
              >
                Send Money
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/receive')}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: theme.colors.success,
                borderRadius: theme.radius.md,
                paddingVertical: theme.spacing[12],
                paddingHorizontal: theme.spacing[12],
                alignItems: 'center',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: theme.typography.fontWeight.semibold,
                  fontSize: theme.typography.fontSize.sm,
                }}
              >
                Receive Money
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Recent Transactions */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing[12],
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
              }}
            >
              Recent Transactions
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/history')}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.primary,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                View All
              </Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={{ alignItems: 'center', paddingVertical: theme.spacing[20] }}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : transfers && transfers.length > 0 ? (
            <View style={{ gap: theme.spacing[8] }}>
              {transfers.slice(0, 5).map((transfer, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: theme.spacing[12],
                    paddingHorizontal: theme.spacing[12],
                    backgroundColor: theme.colors.border.primary,
                    borderRadius: theme.radius.md,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.text.primary,
                        marginBottom: theme.spacing[4],
                      }}
                    >
                      {transfer.type === 'sent' ? 'Sent to' : 'Received from'} {transfer.recipientName}
                    </Text>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {transfer.date ? new Date(transfer.date).toLocaleDateString() : new Date(transfer.timestamp).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: transfer.type === 'sent' ? theme.colors.error : theme.colors.success,
                    }}
                    selectable
                  >
                    {transfer.type === 'sent' ? '-' : '+'}
                    {formatCurrency(transfer.amount)}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: theme.spacing[20],
                backgroundColor: theme.colors.border.primary,
                borderRadius: theme.radius.md,
              }}
            >
              <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }}>
                No transactions yet
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

