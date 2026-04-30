// NFC configuration constants
export const NFC_CONFIG = {
  READ_TIMEOUT: parseInt(process.env.EXPO_PUBLIC_NFC_READ_TIMEOUT || '15000'),
  WRITE_TIMEOUT: parseInt(process.env.EXPO_PUBLIC_NFC_WRITE_TIMEOUT || '10000'),
  ENABLE_MOCK: process.env.EXPO_PUBLIC_ENABLE_MOCK_NFC === 'true',
}

export const NFC_ERRORS = {
  NOT_SUPPORTED: 'NFC is not supported on this device',
  USER_CANCELLED: 'NFC reading was cancelled by user',
  TIMEOUT: 'NFC operation timed out',
  INVALID_TAG: 'Invalid NFC tag format',
  WRITE_FAILED: 'Failed to write to NFC tag',
}
