# TapSwap Mobile App - Detailed File Structure

## Overview
React Native + Expo Router mobile app for iOS and Android with NFC tap-to-pay support.

---

## 📁 Root Structure

```
mobile/
├── app/                          # Expo Router routes (file-based routing)
├── src/                          # Source code (business logic, utilities, reusable components)
├── assets/                       # Static assets (images, fonts, icons)
├── node_modules/                 # Dependencies (npm install)
├── .expo/                        # Expo configuration
├── .vscode/                      # VS Code settings
├── app.json                      # Expo app configuration
├── package.json                  # Dependencies (using npm)
├── package-lock.json             # Dependency lock file
├── tsconfig.json                 # TypeScript config
├── expo-env.d.ts                 # Expo type definitions
└── README.md                     # Documentation
```

---

## 📂 `app/` Directory - Routes & Screens (Expo Router)

```
app/
├── _layout.tsx                   # Root layout wrapper
├── modal.tsx                     # Modal screen template
├── +html.tsx                     # HTML fallback
├── +not-found.tsx                # 404 page
│
├── (tabs)/                       # Tab navigation group
│   ├── _layout.tsx               # Tab bar configuration
│   ├── index.tsx                 # Home tab (/)
│   ├── send.tsx                  # Send money tab (/send)
│   ├── receive.tsx               # Receive money tab (/receive)
│   ├── assistant.tsx             # AI assistant tab (/assistant)
│   └── profile.tsx               # Profile tab (/profile)
│
├── (auth)/                       # Auth flow group (no tab bar)
│   ├── _layout.tsx               # Auth stack layout
│   ├── login.tsx                 # Login screen (/auth/login)
│   ├── signup.tsx                # Signup screen (/auth/signup)
│   ├── otp-verify.tsx            # OTP verification (/auth/otp-verify)
│   └── forgot-password.tsx       # Password recovery (/auth/forgot-password)
│
└── (account)/                    # Account flow group
    ├── _layout.tsx               # Account stack layout
    ├── settings.tsx              # Settings screen (/account/settings)
    ├── wallet.tsx                # Wallet details (/account/wallet)
    ├── history.tsx               # Transaction history (/account/history)
    ├── edit-profile.tsx          # Edit profile (/account/edit-profile)
    ├── security.tsx              # Security settings (/account/security)
    └── help.tsx                  # Help & support (/account/help)
```

---

## 📂 `src/components/` - Reusable UI Components

```
src/components/
├── buttons/
│   ├── PrimaryButton.tsx         # Primary CTA button
│   ├── SecondaryButton.tsx       # Secondary button
│   ├── IconButton.tsx            # Icon-only button
│   └── FloatingActionButton.tsx  # FAB component
│
├── inputs/
│   ├── TextInput.tsx             # Text input field
│   ├── PhoneInput.tsx            # Phone number input
│   ├── OTPInput.tsx              # OTP input field
│   ├── CurrencyInput.tsx         # Amount input
│   └── SearchInput.tsx           # Search bar
│
├── cards/
│   ├── WalletCard.tsx            # Wallet balance card
│   ├── TransactionCard.tsx       # Transaction list item
│   ├── UserCard.tsx              # User profile card
│   └── ContactCard.tsx           # Contact suggestion card
│
├── modals/
│   ├── ConfirmDialog.tsx         # Confirmation modal
│   ├── SuccessModal.tsx          # Success notification
│   ├── ErrorModal.tsx            # Error alert
│   ├── LoadingModal.tsx          # Loading overlay
│   └── PickerModal.tsx           # Date/option picker
│
├── navigation/
│   ├── TabBar.tsx                # Custom tab bar
│   ├── Header.tsx                # Screen header
│   └── Breadcrumb.tsx            # Navigation breadcrumb
│
├── loaders/
│   ├── SkeletonLoader.tsx        # Skeleton screens
│   ├── SpinnerLoader.tsx         # Loading spinner
│   └── ProgressBar.tsx           # Progress indicator
│
├── lists/
│   ├── FlatList.tsx              # Custom flat list
│   ├── SectionList.tsx           # Grouped list
│   └── EmptyState.tsx            # Empty state component
│
├── headers/
│   ├── ScreenHeader.tsx          # Screen title header
│   ├── SearchHeader.tsx          # Header with search
│   └── FilterHeader.tsx          # Header with filters
│
└── common/
    ├── SafeAreaView.tsx          # Safe area wrapper
    ├── Container.tsx             # Page container
    ├── Divider.tsx               # Separator line
    ├── Badge.tsx                 # Status badge
    ├── Avatar.tsx                # User avatar
    ├── Alert.tsx                 # Alert box
    └── Chip.tsx                  # Tag/chip component
```

---

## 📂 `src/screens/` - Feature Screens (Complex Screens)

```
src/screens/
├── Auth/
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── OTPVerifyScreen.tsx
│
├── Home/
│   ├── HomeScreen.tsx            # Dashboard/home screen
│   ├── QuickActionsPanel.tsx     # Quick send/receive buttons
│   └── RecentTransactions.tsx    # Recent activity
│
├── Send/
│   ├── SendScreen.tsx            # Send money main flow
│   ├── SelectRecipient.tsx       # Choose recipient
│   ├── EnterAmount.tsx           # Amount input
│   ├── ConfirmTransaction.tsx    # Review before sending
│   └── TransactionSuccess.tsx    # Success confirmation
│
├── Receive/
│   ├── ReceiveScreen.tsx         # Receive money flow
│   ├── NFCReader.tsx             # NFC tag reading
│   └── ReceiveConfirm.tsx        # Confirm receiving
│
├── Assistant/
│   ├── AssistantScreen.tsx       # AI assistant chat
│   ├── ChatBubble.tsx            # Chat message component
│   └── SuggestionPanel.tsx       # AI suggestions
│
├── Profile/
│   ├── ProfileScreen.tsx         # User profile view
│   ├── EditProfileScreen.tsx     # Edit profile form
│   └── VerificationScreen.tsx    # ID/email verification
│
├── Wallet/
│   ├── WalletScreen.tsx          # Wallet details
│   └── WithdrawalScreen.tsx      # Cash out
│
└── History/
    ├── HistoryScreen.tsx         # Full transaction history
    ├── HistoryFilters.tsx        # Filter transactions
    └── TransactionDetail.tsx     # Single transaction details
```

---

## 📂 `src/hooks/` - Custom Hooks

```
src/hooks/
├── useAuth.ts                    # Authentication logic & state
├── useWallet.ts                  # Wallet operations
├── useNFC.ts                     # NFC read/write operations
├── useSocket.ts                  # WebSocket connection
├── useAI.ts                      # AI assistant interactions
├── useTheme.ts                   # Theme switching
├── useNotification.ts            # Toast/notification management
├── useNavigation.ts              # Navigation utilities
├── usePagination.ts              # Pagination logic
├── useForm.ts                    # Form handling
├── useKeyboard.ts                # Keyboard visibility
├── useOrientation.ts             # Screen orientation
├── useFetch.ts                   # Data fetching
└── useDebounce.ts                # Debounced values
```

---

## 📂 `src/contexts/` - State Management

```
src/contexts/
├── AuthContext.tsx               # Authentication state
├── WalletContext.tsx             # Wallet/balance state
├── SocketContext.tsx             # WebSocket state
├── ThemeContext.tsx              # Theme/styling state
├── NotificationContext.tsx       # Toast notifications
└── AppContext.tsx                # Global app state
```

---

## 📂 `src/services/` - API & External Services

```
src/services/
├── api/
│   ├── client.ts                 # Axios/fetch client setup
│   ├── auth.ts                   # Authentication endpoints
│   ├── wallet.ts                 # Wallet endpoints
│   ├── transfers.ts              # Transfer endpoints
│   ├── ai.ts                     # AI endpoints
│   └── interceptors.ts           # Request/response interceptors
│
├── nfc/
│   ├── nfcReader.ts              # NFC read implementation
│   ├── nfcWriter.ts              # NFC write implementation
│   └── nfcParser.ts              # Parse NFC data
│
├── websocket/
│   ├── socket.ts                 # Socket.io setup
│   ├── events.ts                 # Socket event handlers
│   └── reconnect.ts              # Reconnection logic
│
├── storage/
│   ├── localStorage.ts           # Async storage wrapper
│   ├── secureStorage.ts          # Secure token storage
│   └── cache.ts                  # App caching logic
│
└── notifications/
    ├── push.ts                   # Push notification setup
    └── local.ts                  # Local notifications
```

---

## 📂 `src/utils/` - Utility Functions

```
src/utils/
├── validation.ts                 # Form validation rules
├── formatting.ts                 # Format currency, dates, phone
├── animations.ts                 # Reanimated animation presets
├── helpers.ts                    # General helper functions
├── constants.ts                  # App constants
├── errorHandler.ts               # Error handling & logging
├── logger.ts                     # Logging utility
├── permissions.ts                # Permission requests (NFC, camera)
├── biometric.ts                  # Fingerprint/face auth
├── deepLink.ts                   # Deep linking logic
├── encryption.ts                 # Data encryption
└── retry.ts                      # Retry logic for failed requests
```

---

## 📂 `src/theme/` - Styling & Theme

```
src/theme/
├── colors.ts                     # Color palette
├── typography.ts                 # Font sizes & weights
├── spacing.ts                    # Padding/margin values
├── shadows.ts                    # Shadow definitions
├── radius.ts                     # Border radius presets
└── theme.ts                      # Complete theme object
```

---

## 📂 `src/types/` - TypeScript Definitions

```
src/types/
├── index.ts                      # Exported types
├── auth.ts                       # Auth types
├── wallet.ts                     # Wallet types
├── transfer.ts                   # Transfer types
├── user.ts                       # User types
├── nfc.ts                        # NFC types
├── api.ts                        # API response types
├── navigation.ts                 # Navigation types
└── common.ts                     # Common shared types
```

---

## 📂 `src/constants/` - Static Values

```
src/constants/
├── api.ts                        # API endpoints
├── nfc.ts                        # NFC configurations
├── ui.ts                         # UI constants (sizes, timeouts)
├── messages.ts                   # Error/success messages
├── permissions.ts                # Permission strings
└── features.ts                   # Feature flags
```

---

## 📂 `assets/` - Static Assets

```
assets/
├── images/
│   ├── icon.png                  # App icon (1024x1024)
│   ├── splash-icon.png           # Splash screen
│   ├── adaptive-icon.png         # Android adaptive icon
│   ├── favicon.png               # Web favicon
│   ├── logo.png                  # App logo
│   ├── illustrations/            # SVG/PNG illustrations
│   │   ├── empty-wallet.png
│   │   ├── nfc-reader.png
│   │   └── success.png
│   └── backgrounds/              # Background images
│       ├── gradient-blue.png
│       └── pattern.png
│
├── fonts/
│   ├── Inter-Regular.ttf         # Regular weight
│   ├── Inter-Bold.ttf            # Bold weight
│   └── Inter-SemiBold.ttf        # SemiBold weight
│
└── icons/
    ├── home.svg                  # Navigation icons
    ├── send.svg
    ├── receive.svg
    ├── profile.svg
    └── more.svg
```

---

## 📋 Key File Examples

### **app/_layout.tsx**
```typescript
// Root layout with auth check, theme provider
// Initializes contexts and persisted state
```

### **app/(tabs)/_layout.tsx**
```typescript
// Bottom tab navigation configuration
// 5 tabs: Home, Send, Receive, Assistant, Profile
```

### **src/contexts/AuthContext.tsx**
```typescript
// Manages: isLoggedIn, user data, tokens
// Persists to secure storage
```

### **src/hooks/useNFC.ts**
```typescript
// NFC reader/writer operations
// Error handling and timeout management
```

### **src/services/api/client.ts**
```typescript
// Axios instance with auth interceptor
// Base URL, headers, timeout configuration
```

---

## 🚀 Development Workflow

### Install Dependencies
```bash
npm install
```

### Development Commands
```bash
npm start              # Start Expo
npm run android       # Android emulator
npm run ios          # iOS simulator
npm run web          # Web version
```

### File Organization Best Practices

✅ **DO:**
- Keep components small & focused
- Co-locate related files
- Use descriptive names
- One component per file (unless very small)
- Place styles in component directory

❌ **DON'T:**
- Mix screen & reusable components
- Create deeply nested folders
- Use index exports for constants
- Import from parent directories

---

## 📦 Dependencies Summary

| Package | Purpose |
|---------|---------|
| `expo-router` | File-based routing |
| `react-native-reanimated` | Smooth animations |
| `@react-navigation/native` | Navigation |
| `expo-nfc` | NFC functionality (when added) |
| `socket.io-client` | Real-time updates |
| `expo-secure-store` | Token storage |
| `react-native-safe-area-context` | Safe area handling |

---

## 🔗 Related Files

- Web frontend: `../web/` (React + Vite)
- Backend API: (separate repo)
- Shared types: Consider moving to monorepo root
