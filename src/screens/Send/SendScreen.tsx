import React, { useState } from 'react'
import { View, ScrollView, TextInput, Pressable, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { useWallet } from '@/hooks/useWallet'
import { isValidPhone, isValidAmount } from '@/utils/validation'
import { formatCurrency } from '@/utils/formatting'
import { theme } from '@/theme'
import { useRouter } from 'expo-router'

export default function SendScreen() {
  const router = useRouter()
  const { balance, loading } = useWallet()
  const [formData, setFormData] = useState({
    recipientPhone: '',
    amount: '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState<'form' | 'confirm'>('form')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.recipientPhone.trim()) {
      newErrors.recipientPhone = 'Recipient phone number is required'
    } else if (!isValidPhone(formData.recipientPhone)) {
      newErrors.recipientPhone = 'Invalid phone number'
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required'
    } else if (!isValidAmount(formData.amount)) {
      newErrors.amount = 'Invalid amount'
    } else if (parseFloat(formData.amount) > (balance || 0)) {
      newErrors.amount = 'Insufficient balance'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      setStep('confirm')
    }
  }

  const handleSendMoney = async () => {
    // TODO: Implement send money API call
    // For now, just show success
    router.push({
      pathname: '/success',
      params: {
        type: 'send',
        amount: formData.amount,
        recipient: formData.recipientPhone,
      },
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  if (step === 'confirm') {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: theme.spacing[16],
              paddingVertical: theme.spacing[24],
              justifyContent: 'space-between',
            }}
          >
            {/* Header */}
            <View style={{ marginBottom: theme.spacing[8] }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing[8],
                }}
              >
                Confirm Transfer
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.secondary,
                }}
              >
                Review the details below
              </Text>
            </View>

            {/* Confirmation Details */}
            <View
              style={{
                backgroundColor: theme.colors.border.primary,
                borderRadius: theme.radius.lg,
                padding: theme.spacing[20],
                marginBottom: theme.spacing[24],
              }}
            >
              <View style={{ marginBottom: theme.spacing[16] }}>
                <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing[4] }}>
                  Recipient
                </Text>
                <Text style={{ color: theme.colors.text.primary, fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold }} selectable>
                  {formData.recipientPhone}
                </Text>
              </View>

              <View style={{ marginBottom: theme.spacing[16] }}>
                <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing[4] }}>
                  Amount
                </Text>
                <Text style={{ color: theme.colors.primary, fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold }} selectable>
                  {formatCurrency(parseFloat(formData.amount) || 0)}
                </Text>
              </View>

              {formData.description && (
                <View>
                  <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing[4] }}>
                    Description
                  </Text>
                  <Text style={{ color: theme.colors.text.primary, fontSize: theme.typography.fontSize.sm }}>
                    {formData.description}
                  </Text>
                </View>
              )}
            </View>

            {/* Buttons */}
            <View style={{ gap: theme.spacing[12] }}>
              <Pressable
                onPress={handleSendMoney}
                disabled={loading}
                style={({ pressed }) => ({
                  backgroundColor: loading ? theme.colors.primary + '80' : theme.colors.primary,
                  borderRadius: theme.radius.md,
                  paddingVertical: theme.spacing[12],
                  alignItems: 'center',
                  opacity: pressed && !loading ? 0.9 : 1,
                })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing[8] }}>
                  {loading && <ActivityIndicator color="white" size="small" />}
                  <Text
                    style={{
                      color: 'white',
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    {loading ? 'Processing...' : 'Confirm & Send'}
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setStep('form')}
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
                  Edit Details
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
      >
        <View
          style={{
            paddingHorizontal: theme.spacing[16],
            paddingVertical: theme.spacing[24],
          }}
        >
          {/* Header */}
          <View style={{ marginBottom: theme.spacing[24] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Send Money
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.secondary,
              }}
            >
              Available: {formatCurrency(balance || 0)}
            </Text>
          </View>

          {/* Recipient Phone Input */}
          <View style={{ marginBottom: theme.spacing[16] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Recipient Phone Number
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.recipientPhone ? theme.colors.error : theme.colors.border.primary,
                borderRadius: theme.radius.md,
                paddingHorizontal: theme.spacing[12],
                paddingVertical: theme.spacing[12],
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.background.primary,
              }}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="phone-pad"
              value={formData.recipientPhone}
              onChangeText={(text) => handleInputChange('recipientPhone', text)}
            />
            {errors.recipientPhone && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[4] }}>
                {errors.recipientPhone}
              </Text>
            )}
          </View>

          {/* Amount Input */}
          <View style={{ marginBottom: theme.spacing[16] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Amount
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: errors.amount ? theme.colors.error : theme.colors.border.primary,
                borderRadius: theme.radius.md,
                paddingHorizontal: theme.spacing[12],
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.colors.background.primary,
              }}
            >
              <Text style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.secondary }}>$</Text>
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: theme.spacing[12],
                  paddingHorizontal: theme.spacing[8],
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.primary,
                }}
                placeholder="0.00"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="decimal-pad"
                value={formData.amount}
                onChangeText={(text) => handleInputChange('amount', text)}
              />
            </View>
            {errors.amount && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[4] }}>
                {errors.amount}
              </Text>
            )}
          </View>

          {/* Description Input */}
          <View style={{ marginBottom: theme.spacing[24] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Description (Optional)
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border.primary,
                borderRadius: theme.radius.md,
                paddingHorizontal: theme.spacing[12],
                paddingVertical: theme.spacing[12],
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.background.primary,
                maxHeight: 100,
              }}
              placeholder="What is this payment for?"
              placeholderTextColor={theme.colors.text.tertiary}
              multiline
              numberOfLines={3}
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
            />
          </View>

          {/* Next Button */}
          <Pressable
            onPress={handleNext}
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
              Continue
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

