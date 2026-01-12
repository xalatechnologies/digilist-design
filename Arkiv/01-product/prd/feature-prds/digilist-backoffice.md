---
source: docs/knowledge_base/requirements/digilist-backoffice.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.265Z
---

---
source: docs/knowledge_base/requirements/digilist-backoffice.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.225Z
---

---
source: digilist/docs/claude/digilist-backoffice.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.169Z
---

# Backoffice (Admin/Case Handler) — CLAUDE.md

## Inheritance
- Inherits root /CLAUDE.md; adds constraints; stricter wins.

## Purpose & Objectives
- Internal admin/case handler app for operations, approvals, compliance, and support.
- Objectives: maximum security, auditability, least privilege, stable UX.

## UI/UX Stability (Must)
- Do not change UI/UX unnecessarily.
- Changes require issue link and Backoffice product owner approval.

## Security & Compliance (Must)
- Strong RBAC; least privilege per role; admin actions double-confirmed.
- Full audit trail for CRUD, role grants, exports; no PII in logs.
- EU data residency enforced.

## Boundaries (Must)
- Import only from packages/* via @xalatechnologies/* aliases. No cross-app imports.

## Testing (Must)
- Unit + integration tests for case workflows, approvals, and exports.
- Negative tests for authorization failures.

## Observability (Should)
- Structured logs with correlation IDs; admin action metrics and alerts.

## Docs & Changelog (Must)
- Update README for operational process changes; record admin-visible changes.

## Reference Web App Reuse (Must)
- The `web` app is the reference implementation for shared flows and patterns.
- Do not fork UI from `web`; extract reusable parts into shared packages (`@xalatechnologies/ui`, `@xalatechnologies/core`, `@xalatechnologies/domain`).
- Consume shared API client/types from shared packages; avoid copy/paste.
- Differences are implemented via component variants, composition, feature flags, and RBAC guards.

## Checklist
- [ ] RBAC and audit trail enforced.
- [ ] No unnecessary UI/UX changes.
- [ ] Boundaries respected; secure logging.
- [ ] Tests cover critical and negative paths.
- [ ] Docs/changelog updated.

## Code Structure
```
app/
  components/         # Admin UI composed from @xalatechnologies/ui
  contexts/           # Auth/session, permissions, feature flags
  providers/          # AppProviders (RBAC guards, QueryClient)
  routes/             # Admin routes (case workflows, approvals)
  root.tsx            # Root layout with navigation and audit banners
  app.css             # Imports @xalatechnologies/ui/styles/digilist.css first
  services/
    shared/
      httpClient.ts   # Centralized API client with auth headers
      audit.ts        # Client-side audit helpers (redact PII)
  i18n/               # Admin-specific locales and keys
```
