import React, { useState } from 'react'
import { View, ScrollView, TextInput, Pressable, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { isValidEmail, meetsApiPasswordMinLength } from '@/utils/validation'
import { theme } from '@/theme'
import { useRouter } from 'expo-router'
import { useContext } from 'react'
import { NotificationContext } from '@/contexts/NotificationContext'

export default function LoginScreen() {
  const router = useRouter()
  const { login, loading, error: authError } = useAuth()
  const notification = useContext(NotificationContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (!meetsApiPasswordMinLength(password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    try {
      await login(email, password)
      notification?.showToast('Welcome back!', 'success')
    } catch (err) {
      // Error is handled by useAuth hook
    }
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
              Welcome Back
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.secondary,
                lineHeight: theme.typography.lineHeight.relaxed,
              }}
            >
              Sign in to your account to continue
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

          {/* Email Input */}
          <View style={{ marginBottom: theme.spacing[16] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Email Address
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.email ? theme.colors.error : theme.colors.border.primary,
                borderRadius: theme.radius.md,
                paddingHorizontal: theme.spacing[12],
                paddingVertical: theme.spacing[12],
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.background.primary,
              }}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
            {errors.email && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[4] }}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: theme.spacing[24] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Password
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: errors.password ? theme.colors.error : theme.colors.border.primary,
                borderRadius: theme.radius.md,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: theme.spacing[12],
                backgroundColor: theme.colors.background.primary,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: theme.spacing[12],
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.primary,
                }}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.text.tertiary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                  padding: theme.spacing[8],
                })}
              >
                <Text style={{ color: theme.colors.primary, fontWeight: theme.typography.fontWeight.semibold }}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>
            {errors.password && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[4] }}>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
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
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </View>
          </Pressable>

          {/* Sign Up Link */}
          <View style={{ marginTop: theme.spacing[24], alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }}>
              Don't have an account?{' '}
            </Text>
            <Pressable onPress={() => router.push('/(auth)/signup')}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

