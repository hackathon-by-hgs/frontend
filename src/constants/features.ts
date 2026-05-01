/**
 * Feature flags (Expo public env — rebuild required after change).
 * AI routes (`/api/ai/*`) are not in the TapSwap Swagger spec yet.
 */
export const FEATURE_FLAGS = {
  AI_API: process.env.EXPO_PUBLIC_ENABLE_AI_API === 'true',
} as const
