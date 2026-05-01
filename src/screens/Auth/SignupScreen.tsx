import React, { useState } from 'react'
import { View, ScrollView, TextInput, Pressable, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { isValidEmail, meetsApiPasswordMinLength } from '@/utils/validation'
import { theme } from '@/theme'
import { useRouter } from 'expo-router'
import { useContext } from 'react'
import { NotificationContext } from '@/contexts/NotificationContext'

export default function SignupScreen() {
  const router = useRouter()
  const { signup, loading, error: authError } = useAuth()
  const notification = useContext(NotificationContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!meetsApiPasswordMinLength(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    if (!validateForm()) return

    try {
      const loggedIn = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      if (loggedIn) {
        notification?.showToast('Welcome!', 'success')
      } else {
        notification?.showToast('Account created. Please sign in.', 'success')
        router.push('/(auth)/login')
      }
    } catch (err) {
      // Error is handled by useAuth hook
    }
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
          <View style={{ marginBottom: theme.spacing[24], marginTop: theme.spacing[8] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Create Account
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.secondary,
                lineHeight: theme.typography.lineHeight.relaxed,
              }}
            >
              Sign up to get started
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

          {/* Name Input */}
          <View style={{ marginBottom: theme.spacing[16] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Full Name
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: errors.name ? theme.colors.error : theme.colors.border.primary,
                borderRadius: theme.radius.md,
                paddingHorizontal: theme.spacing[12],
                paddingVertical: theme.spacing[12],
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.background.primary,
              }}
              placeholder="John Doe"
              placeholderTextColor={theme.colors.text.tertiary}
              autoCapitalize="words"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              editable={!loading}
            />
            {errors.name && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[4] }}>
                {errors.name}
              </Text>
            )}
          </View>

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
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              editable={!loading}
            />
            {errors.email && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[4] }}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: theme.spacing[16] }}>
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
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                editable={!loading}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                  padding: theme.spacing[8],
                })}
              >
                <Text style={{ color: theme.colors.primary, fontWeight: theme.typography.fontWeight.semibold, fontSize: theme.typography.fontSize.xs }}>
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

          {/* Confirm Password Input */}
          <View style={{ marginBottom: theme.spacing[24] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Confirm Password
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: errors.confirmPassword ? theme.colors.error : theme.colors.border.primary,
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
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                editable={!loading}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                  padding: theme.spacing[8],
                })}
              >
                <Text style={{ color: theme.colors.primary, fontWeight: theme.typography.fontWeight.semibold, fontSize: theme.typography.fontSize.xs }}>
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>
            {errors.confirmPassword && (
              <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing[4] }}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          {/* Sign Up Button */}
          <Pressable
            onPress={handleSignup}
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
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </View>
          </Pressable>

          {/* Sign In Link */}
          <View style={{ marginTop: theme.spacing[24], alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }}>
              Already have an account?{' '}
            </Text>
            <Pressable onPress={() => router.push('/(auth)/login')}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

