# 📘 THIN APPS RULEBOOK
## Package Ownership & Extraction Rules

**Date:** January 2025  
**Status:** Active Governance Document  
**Purpose:** Define what belongs in apps vs packages

---

## 🎯 THIN APP CONTRACT

### **Apps MUST Only Contain:**

```
apps/{app}/
├── app/ (or src/)
│   ├── root.tsx              # Bootstrap/composition root
│   ├── routes.ts             # Route definitions (React Router)
│   ├── routes/                # Route components (pages)
│   │   ├── _layout.tsx       # Layout wrapper
│   │   ├── _index.tsx        # Home page
│   │   └── {feature}/        # Feature pages
│   ├── app.css               # App-specific styles (minimal, token-only)
│   └── providers/            # App-specific provider wiring (if not reusable)
│       └── AppProviders.tsx  # Only if app needs unique provider composition
```

### **Apps MUST NOT Contain:**

- ❌ Components (except route/page components)
- ❌ Hooks (except route-specific hooks)
- ❌ Services/API clients
- ❌ Stores/state management
- ❌ Utilities/helpers
- ❌ Validators/schemas
- ❌ Constants/config
- ❌ Feature flags logic
- ❌ Navigation builders
- ❌ Monitoring/analytics logic
- ❌ Content loaders/MDX compilers
- ❌ Domain business logic

---

## 📦 PACKAGE OWNERSHIP RULES

### **1. UI Primitives & Components**
**Target:** `@xalatechnologies/ui`

**Owns:**
- All reusable React components
- Layout components (Sidebar, Header, Footer)
- Form components
- Data display components (tables, cards, lists)
- Navigation components
- MDX rendering components (if reusable)
- UI-specific hooks (useDialog, useToast, etc.)

**Does NOT Own:**
- App-specific route components
- App-specific page compositions
- Business logic hooks

**Example:**
```tsx
// ✅ CORRECT - In @xalatechnologies/ui
export function Button({ children, variant, ...props }) { ... }

// ❌ WRONG - In apps/web/src/components
export function Navigation() { ... } // Should be in UI package
```

---

### **2. Design Tokens & Theming**
**Target:** `@xalatechnologies/design-tokens`

**Owns:**
- CSS variables (tokens.css)
- Tailwind v4 preset configuration
- Color palettes
- Typography scales
- Spacing scales
- Shadow definitions
- Component class definitions (tailwind.css)

**Does NOT Own:**
- Component implementations
- App-specific theme overrides

---

### **3. Internationalization (i18n)**
**Target:** `@xalatechnologies/i18n`

**Owns:**
- Translation strings (nb/en/fr/ar)
- Translation formatters
- Locale utilities
- Date/number formatting
- Pluralization rules

**Does NOT Own:**
- App-specific i18n providers (should use platform package)
- Route-specific translation loading

---

### **4. HTTP Client & API**
**Target:** `@xalatechnologies/http`

**Owns:**
- Base HTTP client
- Request/response interceptors
- Error handling (ApiError)
- Authentication headers
- Retry logic
- Request cancellation

**Does NOT Own:**
- Domain-specific API services (see domain packages)
- App-specific API wrappers

**Example:**
```tsx
// ✅ CORRECT - In @xalatechnologies/http
export const httpClient = { request, get, post, ... }

// ❌ WRONG - In apps/web/src/services/api
export class BookingsService { ... } // Should be in @xalatechnologies/domain/booking
```

---

### **5. Authentication & Authorization**
**Target:** `@xalatechnologies/auth`

**Owns:**
- Session management
- OAuth providers (BankID, Vipps, Google, Microsoft)
- RBAC utilities (hasPermission, isRoleHigherOrEqual)
- Auth hooks (useAuth, usePermissions, useRole)
- Auth stores (if Zustand-based)
- Session token generation/hashing

**Does NOT Own:**
- App-specific auth providers (should use platform package)
- Route guards (should be in platform or domain)

---

### **6. Domain Business Logic**
**Target:** `@xalatechnologies/domain/{domain}`

**Submodules:**
- `domain/booking` - Booking engine logic
- `domain/commerce` - Cart, checkout, payments
- `domain/comms` - Notifications, messages, support
- `domain/compliance` - Audit, compliance checks
- `domain/listings` - Listing management
- `domain/users` - User profiles, management
- `domain/approvals` - Approval workflows

**Each Domain Owns:**
- Domain types/interfaces
- Domain hooks (useBooking, useListings, etc.)
- Domain stores (if Zustand-based)
- Domain services (API wrappers)
- Domain constants
- Domain schemas (Zod)
- Domain query keys (TanStack Query)

**Does NOT Own:**
- UI components (belongs in UI package)
- HTTP client (belongs in http package)
- Auth logic (belongs in auth package)

**Example:**
```tsx
// ✅ CORRECT - In @xalatechnologies/domain/booking
export function useBooking(bookingId: string) { ... }
export const bookingKeys = { ... }

// ❌ WRONG - In apps/web/src/hooks
export function useBooking(bookingId: string) { ... }
```

---

### **7. Feature Flags & Registry**
**Target:** `@xalatechnologies/registry`

**Owns:**
- Feature flag definitions
- Feature flag evaluation
- Route registry
- Navigation registry
- Component registry
- Registry hooks (useFeatureFlag, useRegistry)

**Does NOT Own:**
- App-specific feature flag providers
- App-specific navigation builders

---

### **8. Monitoring & Observability**
**Target:** `@xalatechnologies/monitoring`

**Owns:**
- Error tracking utilities
- Performance monitoring
- Analytics hooks
- Scanner logic (UI chemistry, code scanning)
- Audit utilities
- Compliance checking

**Does NOT Own:**
- App-specific monitoring dashboards (can stay in apps/monitoring routes)
- App-specific scanner UI (can stay in apps/monitoring routes)

---

### **9. Configuration & Environment**
**Target:** `@xalatechnologies/config`

**Owns:**
- Environment variable schemas (Zod)
- Vite configurations (shared presets)
- Vitest configurations (shared presets)
- Playwright configurations (shared presets)
- Port definitions
- Build configurations

**Does NOT Own:**
- App-specific env variables (can stay in app, but schema should be in config)
- App-specific build configs (can extend shared configs)

---

### **10. Test Utilities**
**Target:** `@xalatechnologies/testing`

**Owns:**
- Test setup utilities
- Mock factories
- Test fixtures
- Test helpers
- Test reporters
- Integration test utilities

**Does NOT Own:**
- App-specific test files (belongs in apps/{app}/**/__tests__)

---

### **11. Integrations & Adapters**
**Target:** `@xalatechnologies/integrations`

**Owns:**
- Third-party API clients
- Webhook handlers
- External service adapters
- Integration types

**Does NOT Own:**
- Domain-specific integrations (belongs in domain packages)

---

### **12. Platform Composition**
**Target:** `@xalatechnologies/platform`

**Owns:**
- Provider composition (AppShell, providers)
- Route guard utilities
- App initialization logic
- Platform-level hooks
- Platform-level stores

**Does NOT Own:**
- App-specific providers (can stay in apps if truly app-specific)

---

### **13. Core Utilities**
**Target:** `@xalatechnologies/core`

**Owns:**
- Pure utility functions (no React dependencies)
- Type utilities
- Validation utilities (generic)
- Date/time utilities
- Formatting utilities
- Array/object manipulation

**Does NOT Own:**
- Domain-specific utilities (belongs in domain packages)
- React-specific utilities (belongs in UI or platform)

---

### **14. Content & MDX**
**Target:** `@xalatechnologies/content`

**Owns:**
- MDX content files
- MDX compilation utilities
- Content loading utilities
- Search index generation

**Does NOT Own:**
- App-specific MDX components (can stay in app if truly app-specific)
- App-specific content loading (can stay in app routes)

---

### **15. Redis & Caching**
**Target:** `@xalatechnologies/redis`

**Owns:**
- Redis client
- Cache utilities
- Pub/sub utilities
- Cache key builders

**Does NOT Own:**
- Domain-specific cache keys (belongs in domain packages)

---

### **16. Data & Database**
**Target:** `@xalatechnologies/data`

**Owns:**
- Drizzle ORM schemas
- Database queries
- Database types
- Migration utilities

**Does NOT Own:**
- Domain-specific queries (belongs in domain packages, but can use data schemas)

---

## 🔍 DECISION TREE

### **Where does this code belong?**

1. **Is it a React component?**
   - Reusable across apps? → `@xalatechnologies/ui`
   - App-specific route/page? → `apps/{app}/app/routes/`
   - Domain-specific block? → `@xalatechnologies/domain/{domain}` (if complex) or `@xalatechnologies/ui` (if simple)

2. **Is it a hook?**
   - UI-specific (useDialog, useToast)? → `@xalatechnologies/ui`
   - Domain-specific (useBooking, useListings)? → `@xalatechnologies/domain/{domain}`
   - Auth-related? → `@xalatechnologies/auth`
   - Platform-level? → `@xalatechnologies/platform`
   - App-specific route hook? → `apps/{app}/app/routes/{route}/hooks/`

3. **Is it a service/API wrapper?**
   - Domain-specific? → `@xalatechnologies/domain/{domain}/services/`
   - Generic HTTP? → `@xalatechnologies/http`
   - Integration-specific? → `@xalatechnologies/integrations`

4. **Is it a store/state?**
   - Domain-specific? → `@xalatechnologies/domain/{domain}/stores/`
   - Auth-related? → `@xalatechnologies/auth` or `@xalatechnologies/platform`
   - UI-specific? → `@xalatechnologies/ui` (if simple) or `@xalatechnologies/platform` (if complex)

5. **Is it a utility function?**
   - Pure function (no React, no domain)? → `@xalatechnologies/core`
   - Domain-specific? → `@xalatechnologies/domain/{domain}/utils/`
   - React-specific? → `@xalatechnologies/ui` or `@xalatechnologies/platform`

6. **Is it a constant/config?**
   - Domain-specific? → `@xalatechnologies/domain/{domain}/constants/`
   - App-specific env? → `apps/{app}` (but schema in `@xalatechnologies/config`)
   - Shared config? → `@xalatechnologies/config`

7. **Is it a type/interface?**
   - Domain-specific? → `@xalatechnologies/domain/{domain}/types/`
   - Shared type? → `@xalatechnologies/core/types/`

---

## ⚠️ EDGE CASES & EXCEPTIONS

### **App-Specific Providers**
If an app needs unique provider composition that cannot be reused:
- Keep in `apps/{app}/app/providers/AppProviders.tsx`
- But prefer using `@xalatechnologies/platform` composition

### **Route-Specific Hooks**
Hooks that are only used by a single route:
- Can stay in `apps/{app}/app/routes/{route}/hooks/`
- But consider if they can be generalized

### **App-Specific MDX Components**
If MDX components are truly app-specific:
- Can stay in `apps/{app}/app/lib/mdx/components.tsx`
- But prefer using `@xalatechnologies/ui` components

### **Monitoring Dashboard Routes**
Routes in `apps/monitoring` that display monitoring data:
- Can stay in `apps/monitoring/app/routes/`
- But monitoring utilities/logic should be in `@xalatechnologies/monitoring`

---

## ✅ VERIFICATION CHECKLIST

Before moving code, verify:

- [ ] Does this code belong in a package according to the rulebook?
- [ ] Is there already equivalent code in packages?
- [ ] Can this code be reused by other apps?
- [ ] Does this code have tests?
- [ ] Does this code have documentation?
- [ ] Will moving this code break any imports?
- [ ] Is this code SSR-safe (if React code)?
- [ ] Does this code use design tokens (if UI code)?

---

## 📝 MIGRATION NOTES

- **Always check for duplicates** before creating new package code
- **Prefer extending existing packages** over creating new ones
- **Use compatibility shims** temporarily if needed for big-bang migrations
- **Delete shims** after migration is complete
- **Update all imports** before deleting old code
- **Archive removed code** for traceability

---

**Last Updated:** January 2025  
**Maintainer:** Monorepo Architecture Team
