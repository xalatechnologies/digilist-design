---
source: docs/knowledge_base/requirements/digilist-mobile.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.265Z
---

---
source: docs/knowledge_base/requirements/digilist-mobile.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.225Z
---

---
source: digilist/docs/claude/digilist-mobile.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.170Z
---

# DIGILIST Mobile — CLAUDE.md

## Inheritance
Inherits from workspace root `/digilist/CLAUDE.md`. Stricter rule wins on conflict.

## Project Overview
React Native mobile application for DIGILIST booking platform.

## Tech Stack
- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **State**: Zustand, TanStack Query
- **Styling**: NativeWind (Tailwind for RN)

## Shared Packages
- `@xalatechnologies/core` — Core types, utilities
- `@xalatechnologies/domain` — Business logic services

## Reuse Policy (Must)
- Reuse shared TS packages (core, types, localization)
- Do NOT attempt 1:1 UI reuse with web
- Reuse design tokens and primitives only
- Native components for platform feel

## Features
- Listing discovery with maps
- Booking creation and management
- Push notifications
- Offline-first architecture
- Biometric authentication

## Code Standards
- TypeScript strict mode
- Explicit return types
- No `any` types
- Platform-specific code in `.ios.tsx` / `.android.tsx`

## Commands
```bash
pnpm dev        # Start Expo dev server
pnpm ios        # Run on iOS simulator
pnpm android    # Run on Android emulator
pnpm build      # Build for production
```

## Security
- Secure storage for tokens (Keychain/Keystore)
- Certificate pinning for API calls
- No sensitive data in async storage
