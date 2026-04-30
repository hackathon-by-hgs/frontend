import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, TextInput, Pressable, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { theme } from '@/theme'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function OTPScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const email = (params?.email as string) || ''
  const { verifyOTP, loading, error: authError } = useAuth()
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState<{ otp?: string }>({})
  const [resendTimer, setResendTimer] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [resendTimer])

  const validateForm = () => {
    const newErrors: { otp?: string } = {}

    if (!otp.trim()) {
      newErrors.otp = 'OTP is required'
    } else if (otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits'
    } else if (!/^\d+$/.test(otp)) {
      newErrors.otp = 'OTP must contain only numbers'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleVerifyOTP = async () => {
    if (!validateForm()) return

    try {
      await verifyOTP(otp, email)
    } catch (err) {
      // Error is handled by useAuth hook
    }
  }

  const handleResendOTP = async () => {
    // TODO: Implement resend OTP logic
    setResendTimer(60)
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
            flex: 1,
            paddingHorizontal: theme.spacing[16],
            paddingVertical: theme.spacing[24],
            justifyContent: 'center',
          }}
        >
          {/* Header */}
          <View style={{ marginBottom: theme.spacing[8], marginTop: theme.spacing[16] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Verify Code
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.secondary,
                lineHeight: theme.typography.lineHeight.relaxed,
              }}
            >
              We've sent a 6-digit code to {email}
            </Text>
          </View>

          {/* Error Message */}
          {authError && (
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
                {authError}
              </Text>
            </View>
          )}

          {/* OTP Input */}
          <View style={{ marginBottom: theme.spacing[24] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Enter Code
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: errors.otp ? theme.colors.error : theme.colors.border.primary,
                borderRadius: theme.radius.lg,
                paddingHorizontal: theme.spacing[16],
                paddingVertical: theme.spacing[16],
                backgroundColor: theme.colors.background.primary,
                alignItems: 'center',
              }}
            >
              <TextInput
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary,
                  textAlign: 'center',
                  letterSpacing: theme.spacing[8],
                  width: '100%',
                }}
                placeholder="000000"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
                editable={!loading}
                autoFocus
              />
            </View>
            {errors.otp && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[8] }}>
                {errors.otp}
              </Text>
            )}
          </View>

          {/* Verify Button */}
          <Pressable
            onPress={handleVerifyOTP}
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
                {loading ? 'Verifying...' : 'Verify Code'}
              </Text>
            </View>
          </Pressable>

          {/* Resend OTP */}
          <View
            style={{
              marginTop: theme.spacing[20],
              alignItems: 'center',
              paddingHorizontal: theme.spacing[8],
            }}
          >
            <Text
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                marginBottom: theme.spacing[8],
              }}
            >
              Didn't receive the code?
            </Text>
            <Pressable
              onPress={handleResendOTP}
              disabled={resendTimer > 0 || loading}
              style={{ opacity: resendTimer > 0 ? 0.5 : 1 }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
              </Text>
            </Pressable>
          </View>

          {/* Go Back Link */}
          <Pressable
            onPress={() => router.back()}
            style={{ marginTop: theme.spacing[24], alignItems: 'center' }}
          >
            <Text
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              ← Back
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

