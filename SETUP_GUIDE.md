# Mobile App Setup & Development Guide

## 🚀 Quick Start

### Installation
```bash
cd mobile
npm install
```

### Development
```bash
npm start              # Start Expo dev server
npm run android       # Run on Android emulator
npm run ios          # Run on iOS simulator
npm run web          # Run on web
```

## 📁 Project Structure

See [MOBILE_STRUCTURE.md](MOBILE_STRUCTURE.md) for detailed documentation.

### Key Directories
- **app/** - Expo Router file-based routes
- **src/components/** - Reusable UI components
- **src/screens/** - Feature screens (complex pages)
- **src/services/** - API, NFC, WebSocket, Storage
- **src/hooks/** - Custom React hooks
- **src/contexts/** - State management (Auth, Wallet, Notifications)
- **src/utils/** - Utilities (validation, formatting, helpers)
- **src/theme/** - Design tokens (colors, typography, spacing)
- **src/types/** - TypeScript definitions
- **assets/** - Images, fonts, icons

## 🔧 Environment Setup

Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Configure your environment variables:
```
EXPO_PUBLIC_API_BASE_URL=https://api.tapswap.com
EXPO_PUBLIC_SOCKET_URL=wss://socket.tapswap.com
EXPO_PUBLIC_ENABLE_DEBUG=false
EXPO_PUBLIC_ENABLE_MOCK_NFC=true  # Set to true for development
```

## 📦 Installed Dependencies

### Core
- **expo-router** - File-based routing
- **react-native** - Native mobile framework
- **react** - React library

### State & Forms
- **zustand** - Lightweight state management
- **react-hook-form** - Form handling
- **zod** - Schema validation

### Services
- **axios** - HTTP client
- **socket.io-client** - Real-time communication
- **expo-secure-store** - Secure token storage
- **@react-native-async-storage/async-storage** - Local storage

### Hardware & Features
- **expo-nfc** - NFC read/write
- **expo-local-authentication** - Biometric auth (Face/Touch ID)
- **expo-notifications** - Push notifications
- **@react-navigation/native** - Navigation primitives

### UI & Animations
- **react-native-reanimated** - Smooth animations
- **react-native-safe-area-context** - Safe area handling
- **@expo/vector-icons** - Icon library

## 🏗️ Core Services

### API Client (`src/services/api/client.ts`)
- Initialized with base URL and timeout
- Request interceptor for auth token
- Response interceptor for error handling

### Storage Services
- **secureStorage** - Secure token storage (AuthContext)
- **localStorage** - User data caching (AsyncStorage)

### NFC Service (`src/services/nfc/`)
- `nfcReader.ts` - Read NFC tags
- `nfcWriter.ts` - Write NFC tags
- `nfcParser.ts` - Parse NFC payloads
- Mock mode for development

### WebSocket (`src/services/websocket/socket.ts`)
- Auto-reconnection
- Token-based authentication
- Event listeners

## 🎨 Theming

All theme values are centralized in `src/theme/`:
- **colors.ts** - Color palette
- **typography.ts** - Font sizes & weights
- **spacing.ts** - Padding/margin scale
- **shadows.ts** - Shadow definitions
- **radius.ts** - Border radius values

Use in components:
```typescript
import { colors, spacing, typography } from '@/theme'

<View style={{ padding: spacing[4], backgroundColor: colors.primary }}>
  <Text style={{ fontSize: typography.fontSize.lg }}>Hello</Text>
</View>
```

## 🔐 Authentication Flow

1. User enters credentials on login screen
2. `authApi.login()` sends request to backend
3. Backend returns `{ user, token }`
4. Token stored securely via `secureStorage`
5. User data cached via `localStorage`
6. Navigation automatically switches to main app

## 🔄 State Management

### AuthContext
- Manages authentication state
- Persists login on app restart
- Token refresh on expiry

### WalletContext
- Manages wallet balance
- Stores recent transfers
- Syncs with backend

### NotificationContext
- Toast messages
- Push notifications (future)

## 🎯 Next Steps

### Implement These Screens
- [ ] Login screen
- [ ] Signup screen
- [ ] Home dashboard
- [ ] Send money flow
- [ ] Receive money flow
- [ ] Transaction history
- [ ] Settings/Profile

### Add Features
- [ ] NFC integration (real devices)
- [ ] Push notifications
- [ ] Offline support
- [ ] App signing & deployment

### Testing
- [ ] Unit tests (Jest)
- [ ] Component tests
- [ ] Integration tests

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router](https://docs.expo.dev/routing/introduction)
- [Socket.io Client](https://socket.io/docs/v4/client-api)

## 🐛 Debugging

### Enable Debug Mode
In `.env`:
```
EXPO_PUBLIC_ENABLE_DEBUG=true
```

### Mock NFC (Development)
In `.env`:
```
EXPO_PUBLIC_ENABLE_MOCK_NFC=true
```

### View Logs
```bash
npm start
# Press 'j' for logs
```

## ⚠️ Common Issues

### Metro Bundler Issues
```bash
npm start -- --clear
```

### Permission Errors
```bash
npm install --legacy-peer-deps
```

### NFC Not Working
- Ensure device has NFC hardware
- Enable NFC in device settings
- For development, use EXPO_PUBLIC_ENABLE_MOCK_NFC=true

## 📋 Checklist

- [ ] Environment variables configured
- [ ] API endpoints match backend
- [ ] NFC mock mode working
- [ ] Authentication flow tested
- [ ] All required permissions added
- [ ] App icons added to assets
- [ ] Release build tested

---

**Created:** 2026-04-28
**Updated:** 2026-04-28
