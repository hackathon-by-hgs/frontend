import React, { useEffect, useState } from 'react'
import { View, ScrollView, Pressable, Text, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
import { useWallet } from '@/hooks/useWallet'
import { formatCurrency, formatDate } from '@/utils/formatting'
import { theme } from '@/theme'
import { useRouter } from 'expo-router'

export default function HistoryScreen() {
  const router = useRouter()
  const { transfers, loading, error, fetchHistory } = useWallet()
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      await fetchHistory()
    } catch (err) {
      // Error handled by hook
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

  const filteredTransfers = transfers?.filter(t => {
    if (filter === 'sent') return t.type === 'sent'
    if (filter === 'received') return t.type === 'received'
    return true
  }) || []

  const renderTransactionItem = ({ item }: any) => (
    <Pressable
      onPress={() => {
        // TODO: Navigate to transaction detail when route exists
        // router.push({
        //   pathname: '/transaction-detail',
        //   params: { transaction: JSON.stringify(item) }
        // })
      }}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.border.primary,
        borderRadius: theme.radius.md,
        padding: theme.spacing[16],
        marginBottom: theme.spacing[8],
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing[12],
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {/* Icon */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: item.type === 'sent' ? theme.colors.error + '20' : theme.colors.success + '20',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: theme.typography.fontSize.lg }}>
          {item.type === 'sent' ? '📤' : '📥'}
        </Text>
      </View>

      {/* Transaction Info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing[4],
          }}
        >
          {item.type === 'sent' ? 'Sent to' : 'Received from'} {item.recipientName}
        </Text>
        <Text
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
          }}
        >
          {formatDate(new Date(item.date))}
        </Text>
      </View>

      {/* Amount */}
      <Text
        style={{
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.bold,
          color: item.type === 'sent' ? theme.colors.error : theme.colors.success,
        }}
        selectable
      >
        {item.type === 'sent' ? '-' : '+'}
        {formatCurrency(item.amount)}
      </Text>
    </Pressable>
  )

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: theme.spacing[16],
          paddingVertical: theme.spacing[16],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border.primary,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing[16],
          }}
        >
          Transaction History
        </Text>

        {/* Filter Buttons */}
        <View style={{ flexDirection: 'row', gap: theme.spacing[8] }}>
          {(['all', 'sent', 'received'] as const).map(filterOption => (
            <Pressable
              key={filterOption}
              onPress={() => setFilter(filterOption)}
              style={({ pressed }) => ({
                paddingHorizontal: theme.spacing[12],
                paddingVertical: theme.spacing[8],
                borderRadius: theme.radius.md,
                backgroundColor: filter === filterOption ? theme.colors.primary : theme.colors.border.primary,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: filter === filterOption ? 'white' : theme.colors.text.primary,
                  textTransform: 'capitalize',
                }}
              >
                {filterOption}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <View
          style={{
            backgroundColor: theme.colors.error + '15',
            borderRadius: theme.radius.md,
            padding: theme.spacing[12],
            marginHorizontal: theme.spacing[16],
            marginVertical: theme.spacing[16],
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

      {/* Transactions List */}
      {loading && !refreshing ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : filteredTransfers.length > 0 ? (
        <FlatList
          data={filteredTransfers}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => `${item.id || index}`}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing[16],
            paddingVertical: theme.spacing[16],
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollIndicatorInsets={{ right: 1 }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: theme.spacing[16],
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.border.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing[16],
            }}
          >
            <Text style={{ fontSize: theme.typography.fontSize['2xl'] }}>📭</Text>
          </View>
          <Text
            style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing[4],
              textAlign: 'center',
            }}
          >
            No Transactions Yet
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              textAlign: 'center',
            }}
          >
            Your transactions will appear here
          </Text>
        </View>
      )}
    </View>
  )
}

