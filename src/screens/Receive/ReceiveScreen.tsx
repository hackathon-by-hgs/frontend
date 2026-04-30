import React, { useState } from 'react'
import { View, ScrollView, Pressable, Text, ActivityIndicator } from 'react-native'
import { useNFC } from '@/hooks/useNFC'
import { useAuth } from '@/hooks/useAuth'
import { theme } from '@/theme'
import { useRouter } from 'expo-router'

export default function ReceiveScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { isWriting, error: nfcError, write } = useNFC()
  const [step, setStep] = useState<'method' | 'nfc' | 'manual'>('method')
  const [qrCode, setQrCode] = useState<string | null>(null)

  const handleGenerateQR = async () => {
    // TODO: Generate QR code
    setQrCode(`payment://${user?.id}`)
    setStep('manual')
  }

  const handleEnableNFC = async () => {
    try {
      // TODO: Write NFC tag with payment info
      setStep('nfc')
    } catch (err) {
      // Error handled by useNFC hook
    }
  }

  if (step === 'method') {
    return (
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
          <View style={{ marginBottom: theme.spacing[8] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[8],
              }}
            >
              Receive Money
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.secondary,
              }}
            >
              Choose how to receive payment
            </Text>
          </View>

          {/* NFC Option */}
          <Pressable
            onPress={handleEnableNFC}
            style={({ pressed }) => ({
              backgroundColor: theme.colors.border.primary,
              borderRadius: theme.radius.lg,
              padding: theme.spacing[20],
              marginBottom: theme.spacing[16],
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary + '20',
                borderRadius: theme.radius.md,
                padding: theme.spacing[12],
                marginBottom: theme.spacing[12],
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: theme.typography.fontSize['2xl'] }}>📱</Text>
            </View>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[4],
              }}
            >
              NFC Tag
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              Let others tap their phone to your device
            </Text>
          </Pressable>

          {/* QR Code Option */}
          <Pressable
            onPress={handleGenerateQR}
            style={({ pressed }) => ({
              backgroundColor: theme.colors.border.primary,
              borderRadius: theme.radius.lg,
              padding: theme.spacing[20],
              marginBottom: theme.spacing[24],
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <View
              style={{
                backgroundColor: theme.colors.accent + '20',
                borderRadius: theme.radius.md,
                padding: theme.spacing[12],
                marginBottom: theme.spacing[12],
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: theme.typography.fontSize['2xl'] }}>📷</Text>
            </View>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[4],
              }}
            >
              QR Code
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              Generate a QR code to share
            </Text>
          </Pressable>

          {/* Manual Entry Option */}
          <Pressable
            onPress={() => setStep('manual')}
            style={({ pressed }) => ({
              backgroundColor: theme.colors.border.primary,
              borderRadius: theme.radius.lg,
              padding: theme.spacing[20],
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <View
              style={{
                backgroundColor: theme.colors.success + '20',
                borderRadius: theme.radius.md,
                padding: theme.spacing[12],
                marginBottom: theme.spacing[12],
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: theme.typography.fontSize['2xl'] }}>📋</Text>
            </View>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[4],
              }}
            >
              Account Details
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              Share your account information
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    )
  }

  if (step === 'nfc') {
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
          }}
        >
          {isWriting ? (
            <>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: theme.colors.primary + '20',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing[24],
                }}
              >
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                  textAlign: 'center',
                }}
              >
                Getting NFC ready...
              </Text>
            </>
          ) : nfcError ? (
            <>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: theme.colors.error + '20',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing[24],
                }}
              >
                <Text style={{ fontSize: theme.typography.fontSize['3xl'] }}>❌</Text>
              </View>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.error,
                  textAlign: 'center',
                  marginBottom: theme.spacing[16],
                }}
              >
                {nfcError}
              </Text>
              <Pressable
                onPress={() => setStep('method')}
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.md,
                  paddingVertical: theme.spacing[12],
                  paddingHorizontal: theme.spacing[24],
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
                  Try Another Method
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: theme.colors.success + '20',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing[24],
                }}
              >
                <Text style={{ fontSize: theme.typography.fontSize['3xl'] }}>📱</Text>
              </View>
              <Text
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary,
                  textAlign: 'center',
                  marginBottom: theme.spacing[8],
                }}
              >
                Ready to Receive
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  textAlign: 'center',
                  marginBottom: theme.spacing[24],
                }}
              >
                Keep your device visible. Others can tap to send you money.
              </Text>
              <Pressable
                onPress={() => setStep('method')}
                style={({ pressed }) => ({
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.md,
                  paddingVertical: theme.spacing[12],
                  paddingHorizontal: theme.spacing[24],
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
                  Done
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    )
  }

  return (
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
            Your Account Details
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.text.secondary,
            }}
          >
            Share these details to receive money
          </Text>
        </View>

        {/* Account Info Card */}
        <View
          style={{
            backgroundColor: theme.colors.border.primary,
            borderRadius: theme.radius.lg,
            padding: theme.spacing[20],
            marginBottom: theme.spacing[24],
          }}
        >
          <View style={{ marginBottom: theme.spacing[16] }}>
            <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.xs, marginBottom: theme.spacing[4] }}>
              Name
            </Text>
            <Text selectable style={{ color: theme.colors.text.primary, fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold }}>
              {user?.name}
            </Text>
          </View>

          <View style={{ marginBottom: theme.spacing[16] }}>
            <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.xs, marginBottom: theme.spacing[4] }}>
              Account Number
            </Text>
            <Text selectable style={{ color: theme.colors.text.primary, fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold }}>
              {user?.accountNumber || '••••••••'}
            </Text>
          </View>

          <View>
            <Text style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.xs, marginBottom: theme.spacing[4] }}>
              Email
            </Text>
            <Text selectable style={{ color: theme.colors.text.primary, fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold }}>
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Back Button */}
        <Pressable
          onPress={() => setStep('method')}
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
            ← Back
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

