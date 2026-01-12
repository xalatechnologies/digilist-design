# System Architecture

## Digilist Platform

**Version:** 1.0  
**Last Updated:** December 2024

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ Browser │  │ Mobile  │  │ Desktop │  │  Admin  │  │ Learning│          │
│  │ (RR7)   │  │  (RN)   │  │ (Tauri) │  │  (RR7)  │  │  (RR7)  │          │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘          │
│       │            │            │            │            │                │
│       └────────────┴────────────┴────────────┴────────────┘                │
│                                  │                                          │
│                          ┌───────▼───────┐                                 │
│                          │   CDN / LB    │                                 │
│                          └───────┬───────┘                                 │
└──────────────────────────────────┼──────────────────────────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────────────────┐
│                           API LAYER                                          │
├──────────────────────────────────┼──────────────────────────────────────────┤
│                          ┌───────▼───────┐                                 │
│                          │  API Gateway  │                                 │
│                          │  (Fastify)    │                                 │
│                          └───────┬───────┘                                 │
│                                  │                                          │
│    ┌─────────────────────────────┼─────────────────────────────┐           │
│    │                             │                             │           │
│    ▼                             ▼                             ▼           │
│ ┌──────────┐              ┌──────────┐              ┌──────────┐          │
│ │   Auth   │              │ Bookings │              │ Payments │          │
│ │  Module  │              │  Module  │              │  Module  │          │
│ └──────────┘              └──────────┘              └──────────┘          │
│                                                                            │
│ ┌──────────┐              ┌──────────┐              ┌──────────┐          │
│ │Listings│              │  Rules   │              │   Notif  │          │
│ │  Module  │              │  Module  │              │  Module  │          │
│ └──────────┘              └──────────┘              └──────────┘          │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────────────────┐
│                           DATA LAYER                                         │
├──────────────────────────────────┼──────────────────────────────────────────┤
│    ┌─────────────────────────────┼─────────────────────────────┐           │
│    │                             │                             │           │
│    ▼                             ▼                             ▼           │
│ ┌──────────┐              ┌──────────┐              ┌──────────┐          │
│ │PostgreSQL│              │  Redis   │              │  Worker  │          │
│ │(Drizzle) │              │ (Cache)  │              │ (BullMQ) │          │
│ └──────────┘              └──────────┘              └──────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────────────────┐
│                       EXTERNAL SERVICES                                      │
├──────────────────────────────────┼──────────────────────────────────────────┤
│    ┌─────────────────────────────┼─────────────────────────────┐           │
│    │                             │                             │           │
│    ▼                             ▼                             ▼           │
│ ┌──────────┐              ┌──────────┐              ┌──────────┐          │
│ │ID-porten │              │  Vipps   │              │  BRREG   │          │
│ │  (Auth)  │              │(Payments)│              │ (Verify) │          │
│ └──────────┘              └──────────┘              └──────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Architecture Principles

| Principle | Description |
|-----------|-------------|
| **Multi-tenant** | Strict tenant isolation at database level |
| **Layered** | Clear separation of concerns |
| **API-first** | All functionality exposed via REST API |
| **Token-based Design** | Design tokens as single source of truth |
| **Type-safe** | TypeScript strict mode throughout |
| **Monorepo** | Shared packages, coordinated releases |

---

## 2. Component Architecture

### 2.1 Applications

```
apps/
├── api/            # Fastify Backend API
│   ├── src/
│   │   ├── core/           # Guards, interceptors, filters
│   │   ├── db/             # Database module
│   │   ├── modules/        # Feature modules
│   │   └── openapi/        # Swagger configuration
│   └── package.json
│
├── web/            # React Router 7 Public Portal
│   ├── app/
│   │   ├── components/     # UI components
│   │   ├── contexts/       # React contexts
│   │   ├── routes/         # Page routes
│   │   └── services/       # API client
│   └── package.json
│
├── backoffice/     # React Router 7 Admin Panel
│   ├── app/
│   │   ├── components/     # Admin UI
│   │   ├── routes/         # Admin routes
│   │   └── services/       # API client
│   └── package.json
│
├── learning-hub/   # React Router 7 E-learning
│   ├── app/
│   │   ├── components/     # Learning UI
│   │   └── routes/         # Content routes
│   ├── content/            # Markdown content
│   └── package.json
│
├── docs/           # Documentation Site
├── monitoring/     # System Monitoring
├── saas-admin/     # Platform Admin
├── desktop/        # Tauri Desktop App
└── mobile/         # React Native Mobile
```

### 2.2 Shared Packages

```
packages/
├── core/           # Domain types, utilities, auth
│   ├── src/
│   │   ├── auth/           # Authentication helpers
│   │   ├── types/          # Domain types
│   │   ├── utils/          # Shared utilities
│   │   ├── hooks/          # React hooks
│   │   └── services/       # Business logic
│   └── package.json
│
├── ui/             # Design System Components
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── styles/         # Global styles
│   │   └── tokens/         # Design tokens
│   └── package.json
│
├── db/             # Database Layer
│   ├── src/
│   │   ├── schema/         # Drizzle schemas
│   │   ├── queries/        # Query builders
│   │   └── seed.ts         # Seed data
│   ├── drizzle/            # Migrations
│   └── package.json
│
├── design-tokens/  # Design Token System
│   ├── src/
│   │   └── tokens/         # Token definitions
│   ├── registry/           # shadcn registry
│   └── package.json
│
├── localization/   # i18n
│   ├── src/
│   │   ├── locales/        # Translation files
│   │   └── hooks/          # i18n hooks
│   └── package.json
│
└── [other packages...]
```

---

## 3. Data Architecture

### 3.1 Multi-Tenant Model

```
┌─────────────────────────────────────────────────────────────┐
│                     SAAS SCOPE                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 TENANT (Municipality)                │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │              ORGANIZATION                      │  │   │
│  │  │  ┌─────────────────────────────────────────┐  │  │   │
│  │  │  │              USER SCOPE                  │  │  │   │
│  │  │  │  - Own bookings                         │  │  │   │
│  │  │  │  - Own profile                          │  │  │   │
│  │  │  │  - Own payments                         │  │  │   │
│  │  │  └─────────────────────────────────────────┘  │  │   │
│  │  │                                               │  │   │
│  │  │  - Listings                                │  │   │
│  │  │  - Zones                                     │  │   │
│  │  │  - Bookings (all in org)                    │  │   │
│  │  │  - Members                                   │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  │  - Organizations                                    │   │
│  │  - Billing                                          │   │
│  │  - Tenant settings                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  - All tenants                                             │
│  - System configuration                                     │
│  - Platform analytics                                       │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Database Schema Overview

See [ERD.md](./ERD.md) for complete Entity Relationship Diagram.

**Core Tables:**

| Domain | Tables |
|--------|--------|
| **Identity** | `tenants`, `users`, `sessions`, `oauth_accounts` |
| **RBAC** | `organizations`, `memberships`, `roles`, `permissions`, `user_roles` |
| **Listings** | `listings`, `zones`, `listing_media`, `listing_rules` |
| **Bookings** | `bookings`, `recurring_bookings`, `booking_status_history` |
| **Availability** | `availability_rules`, `blackouts`, `pricing_rules` |
| **Payments** | `payments`, `invoices`, `payment_methods` |
| **Compliance** | `audit_logs`, `gdpr_consents`, `data_subject_requests` |

### 3.3 Data Flow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  User   │───▶│   UI    │───▶│   API   │───▶│   DB    │
│ Action  │    │ Event   │    │ Request │    │ Query   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                   │
                                   ▼
                            ┌─────────────┐
                            │   Worker    │
                            │  (BullMQ)   │
                            └─────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              ┌─────────┐   ┌─────────┐   ┌─────────┐
              │  Email  │   │   SMS   │   │  Push   │
              └─────────┘   └─────────┘   └─────────┘
```

---

## 4. API Architecture

### 4.1 Fastify Route Structure

```
src/
├── server.ts               # Entry point
├── routes/                 # HTTP routes
│   ├── auth/
│   ├── listings/
│   ├── bookings/
│   ├── payments/
│   └── [others...]
├── middleware/            # Request middleware
│   ├── auth.ts            # Session validation
│   ├── tenant-scope.ts    # Tenant isolation
│   └── rbac.ts            # Permission check
├── schemas/               # Zod schemas
│   └── [domain]/schemas.ts
└── controllers/           # Map HTTP → domain use-cases
    └── [domain]/controller.ts
```

### 4.2 Request Flow

```
Request
   │
   ▼
┌──────────────────┐
│   Middleware     │  Request context, tenant validation
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Auth & RBAC     │  Session validation → Tenant scope → Permissions
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Entitlement     │  Module access check (licensing)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Route Handler  │  Zod validation, map to domain use-case
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Domain Use-Case │  Business logic (packages/domain)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Repository     │  Data access (packages/data)
└────────┬─────────┘
         │
         ▼
Response
```

### 4.3 API Modules

| Module | Endpoints | Description |
|--------|-----------|-------------|
| `auth` | `/api/auth/*` | OAuth, sessions |
| `health` | `/api/health` | Health checks |
| `organizations` | `/api/organizations/*` | Org CRUD |
| `listings` | `/api/listings/*` | Listing CRUD |
| `zones` | `/api/zones/*` | Zone CRUD |
| `bookings` | `/api/bookings/*` | Booking CRUD |
| `availability` | `/api/availability/*` | Slot checking |
| `payments` | `/api/payments/*` | Payment processing |
| `rules` | `/api/rules/*` | Business rules |
| `approvals` | `/api/approvals/*` | Approval workflow |

---

## 5. Frontend Architecture

### 5.1 React Router 7 App Structure (Thin App)

```
app/
├── shell.config.ts         # Shell configuration
├── root.tsx                # Root layout (uses shell)
├── root.css                # Imports design tokens
├── routes/                 # Page routes
│   ├── _index.tsx          # Home page
│   ├── bookings/
│   ├── listings/
│   └── [others...]
└── [minimal app-specific code only]

All business logic, hooks, components come from packages:
- @xalatechnologies/ui - UI components
- @xalatechnologies/domain - Business logic & hooks
- @xalatechnologies/http - API client
- @xalatechnologies/auth - Auth hooks
- @xalatechnologies/registry - Navigation & feature flags
```

### 5.2 State Management

```
┌─────────────────────────────────────────────────────────┐
│                    STATE ARCHITECTURE                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Server    │  │    Local    │  │    URL      │    │
│  │    State    │  │    State    │  │    State    │    │
│  │ (TanStack)  │  │  (useState) │  │  (Router)   │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
│         │                │                │            │
│         ▼                ▼                ▼            │
│  ┌─────────────────────────────────────────────────┐  │
│  │              React Context                       │  │
│  │  (Auth, Locale, User, Theme)                    │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

| State Type | Tool | Use Case |
|------------|------|----------|
| Server State | TanStack Query | API data, caching |
| Local State | useState/useReducer | Form state, UI state |
| URL State | Router | Filters, pagination |
| Global State | React Context | Auth, locale, theme |

---

## 6. Security Architecture

### 6.1 Authentication Flow

```
┌──────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐
│ User │────▶│ Frontend │────▶│   API   │────▶│ID-porten │
└──────┘     └──────────┘     └─────────┘     └──────────┘
                                   │                │
                                   │    ┌───────────┘
                                   │    │
                                   ▼    ▼
                              ┌─────────────┐
                              │   Session   │
                              │   Cookie    │
                              └─────────────┘
```

**Flow:**
1. User clicks "Login with ID-porten"
2. Frontend redirects to API auth endpoint
3. API initiates OIDC flow with ID-porten
4. User authenticates at ID-porten
5. ID-porten redirects back with auth code
6. API exchanges code for tokens
7. API creates session, sets httpOnly cookie
8. User redirected to frontend

### 6.2 Authorization Model

```
┌─────────────────────────────────────────────────────────┐
│                  RBAC ARCHITECTURE                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐                                       │
│  │    User     │                                       │
│  └──────┬──────┘                                       │
│         │ has                                          │
│         ▼                                              │
│  ┌─────────────┐         ┌─────────────┐              │
│  │  UserRole   │────────▶│    Role     │              │
│  │(tenant/org) │         │(user/org/   │              │
│  └─────────────┘         │tenant/saas) │              │
│                          └──────┬──────┘              │
│                                 │ has                  │
│                                 ▼                      │
│                          ┌─────────────┐              │
│                          │ Permission  │              │
│                          │   (scoped)  │              │
│                          └─────────────┘              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Data Isolation

| Level | Mechanism | Enforcement |
|-------|-----------|-------------|
| Tenant | `tenant_id` column | Query filter, RLS |
| Organization | `org_id` column | Query filter |
| User | `user_id` column | Query filter |

---

## 7. Integration Architecture

### 7.1 External Services

```
┌─────────────────────────────────────────────────────────┐
│                 INTEGRATION LAYER                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  ID-porten  │  │    Vipps    │  │   BRREG     │    │
│  │   Adapter   │  │   Adapter   │  │   Adapter   │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
│         │                │                │            │
│         └────────────────┴────────────────┘            │
│                          │                              │
│                   ┌──────▼──────┐                      │
│                   │ Integration │                      │
│                   │   Service   │                      │
│                   └─────────────┘                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Integration Patterns

| Integration | Protocol | Pattern |
|-------------|----------|---------|
| ID-porten | OIDC | Redirect flow |
| Vipps | REST | Async + webhooks |
| BRREG | REST | Sync request |
| NIF | REST | Sync request |
| RCO | REST | Sync request |

---

## 8. Deployment Architecture

### 8.1 Environment Topology

```
┌─────────────────────────────────────────────────────────┐
│                   PRODUCTION                             │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │   LB    │  │   API   │  │ Worker  │  │   DB    │   │
│  │ (Azure) │  │ (x4)    │  │ (x2)    │  │(Primary)│   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
│                                               │         │
│                                         ┌─────▼─────┐  │
│                                         │DB Replica │  │
│                                         └───────────┘  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    STAGING                               │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │   LB    │  │   API   │  │ Worker  │  │   DB    │   │
│  │         │  │ (x2)    │  │ (x1)    │  │         │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  DEVELOPMENT                             │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │PostgreSQL│  │  Redis  │  │ Mailpit │                 │
│  │ (Podman)│  │(Podman) │  │(Podman) │                 │
│  └─────────┘  └─────────┘  └─────────┘                 │
└─────────────────────────────────────────────────────────┘
```

### 8.2 CI/CD Pipeline

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Push   │───▶│  Build  │───▶│  Test   │───▶│ Deploy  │
│         │    │ & Lint  │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              ┌─────────┐   ┌─────────┐   ┌─────────┐
              │  Unit   │   │  Integ  │   │   E2E   │
              │  Tests  │   │  Tests  │   │  Tests  │
              └─────────┘   └─────────┘   └─────────┘
```

---

## 9. Related Documents

| Document | Description |
|----------|-------------|
| [ERD.md](./ERD.md) | Entity Relationship Diagram |
| [API.md](../api/README.md) | API Documentation |
| [Database](../database/README.md) | Database Documentation |
| [Security](./SECURITY.md) | Security Architecture |

---

*Last updated: December 2024*
