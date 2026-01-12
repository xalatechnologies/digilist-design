# Project Overview

**Xala Technologies Platform** - SaaS platform ecosystem

---

## What is This Platform?

This repository contains a comprehensive SaaS platform ecosystem built for multiple domains and applications. The platform provides shared infrastructure, design systems, and reusable components that power various SaaS applications.

**Digilist** is one domain/application within this ecosystem - a Norwegian SaaS platform for municipal listing booking. The platform architecture supports multiple SaaS applications sharing common infrastructure.

---

## Platform Components

This platform supports multiple SaaS applications and domains. Current applications include:

### Applications

| App | Purpose | Port | Domain |
|-----|---------|------|--------|
| **API** | Backend REST API | 3020 | Shared |
| **Web** | Public booking portal (Digilist) | 8000 | Digilist |
| **Backoffice** | Tenant admin panel (Digilist) | 3005 | Digilist |
| **Docs** | Developer documentation | 3022 | Platform |
| **Learning Hub** | End-user learning portal (Digilist) | 3024 | Digilist |
| **Monitoring** | System monitoring dashboard | 3025 | Platform |

### Shared Packages

| Package | Purpose |
|---------|---------|
| **@xalatechnologies/core** | Domain types, utilities, auth |
| **@xalatechnologies/ui** | Design system components |
| **@xalatechnologies/data** | Database schemas (Drizzle ORM) |
| **@xalatechnologies/design-tokens** | Design tokens & theming |
| **@xalatechnologies/i18n** | Localization (nb/en) |
| **@xalatechnologies/domain** | Business logic services |
| **@xalatechnologies/registry** | Feature flags & navigation |
| **@xalatechnologies/http** | HTTP client |
| **@xalatechnologies/monitoring** | Observability utilities |
| **@xalatechnologies/testing** | Test utilities |

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, React Router 7, TailwindCSS 4 |
| **Backend** | Fastify 5, Drizzle ORM, PostgreSQL |
| **Auth** | Lucia Auth, OAuth providers |
| **Jobs** | BullMQ, Redis |
| **Testing** | Vitest, Playwright |
| **Infrastructure** | Podman, Docker Compose |

---

## Key Features

- **Listing Discovery** - Search and browse available listings
- **Booking Management** - Single and recurring bookings
- **Approval Workflows** - Configurable approval processes
- **Payment Processing** - Vipps, Nets, invoice support
- **Multi-Tenant** - Strict tenant isolation
- **RBAC** - Role-based access control
- **Localization** - Norwegian (primary) and English
- **Compliance** - GDPR, accessibility (WCAG 2.1 AA)

---

## Architecture Principles

1. **Monorepo** - Single repository for all code
2. **Shared Packages** - Reusable packages across apps
3. **Thin Apps** - Apps are thin shells over shared packages
4. **Design Tokens** - All styling via semantic tokens
5. **Type Safety** - TypeScript strict mode throughout
6. **Test Coverage** - 95% coverage threshold

---

## Getting Started

See [Local Development](../05-development/local-development.md) for setup instructions.

---

## Related Documentation

- [Product Requirements](../01-product/prd/digilist-prd.md)
- [System Architecture](../02-architecture/system-architecture.md)
- [Design System](../02-architecture/design-system.md)

---

*Last Updated: 2025-01-27*
