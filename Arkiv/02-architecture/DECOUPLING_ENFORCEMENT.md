# Decoupling Enforcement Architecture

## Overview

This document describes the comprehensive decoupling enforcement system that ensures architectural boundaries and domain separation across the Digilist platform.

## Objectives

1. **UI/Apps** never import DB schema types or data packages
2. **Domain logic** depends only on domain contracts (DTOs + ports), not schema
3. **Schema types** exist ONLY inside mapper modules and data packages
4. **SaaS Platform** (multi-tenant, auth, RBAC, licensing) stays separate from **Domain** (bookable engine)

## Architecture Boundaries

### Dependency Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     apps/* (frontend, api)                   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              packages/ui (components)                │   │
│  │                                                       │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │        packages/domain (services)             │ │   │
│  │  │                                               │ │   │
│  │  │  ┌─────────────────────────────────────────┐ │ │   │
│  │  │  │  packages/domain-contracts (DTOs)       │ │ │   │
│  │  │  │                                         │ │ │   │
│  │  │  │  ┌───────────────────────────────────┐ │ │ │   │
│  │  │  │  │  packages/*-data (repositories)   │ │ │ │   │
│  │  │  │  │                                   │ │ │ │   │
│  │  │  │  │  ┌─────────────────────────────┐ │ │ │ │   │
│  │  │  │  │  │         Database            │ │ │ │ │   │
│  │  │  │  │  └─────────────────────────────┘ │ │ │ │   │
│  │  │  │  └───────────────────────────────────┘ │ │ │   │
│  │  │  └─────────────────────────────────────────┘ │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Hard Boundaries

#### Protected Layers

**A) apps/* and packages/ui MUST NOT import:**
- `@xalatechnologies/*-data` packages
- Drizzle schema types
- DB clients (Drizzle ORM)
- Schema path imports (`/schema`, `/schema/*`)

**B) packages/domain MUST NOT import:**
- `@xalatechnologies/*-data` packages
- Schema tables/types
- Direct database access

**C) Schema imports ONLY allowed in:**
- `packages/*-data/**/mappers/**` modules
- Data layer repository implementations

#### Domain Separation

**Platform Packages** (SaaS concerns):
- `@xalatechnologies/platform`
- `@xalatechnologies/auth`
- `@xalatechnologies/tenants`
- `@xalatechnologies/licensing`
- `@xalatechnologies/platform-data`

**Domain Packages** (Business logic):
- `@xalatechnologies/booking-domain`
- `@xalatechnologies/listing-domain`
- `@xalatechnologies/booking-data`
- `@xalatechnologies/listing-data`

**Rules:**
- Platform MUST NOT depend on Domain packages
- Domain MUST NOT depend on Platform packages
- Both can depend on shared contracts/utilities

## Enforcement Tools

### 1. Boundary Scanner

**Purpose:** Detect all boundary violations across the codebase

**Location:** `tools/decoupling/scanner.ts`

**Detection:**
- Data package imports in protected layers
- Schema imports outside mappers
- Drizzle imports outside data layer
- Cross-domain imports (Platform ↔ Domain)

**Usage:**
```bash
pnpm decouple:scan       # Scan and generate reports
pnpm decouple:verify     # Scan and fail if violations found
```

**Output:**
- `reports/decoupling/scan.json` - Machine-readable
- `reports/decoupling/LATEST.md` - Human-readable
- `reports/decoupling/BASELINE.md` - Initial baseline
- `reports/monitoring/quality-gates.json` - Quality gate status

### 2. ESLint Plugin

**Purpose:** Enforce boundaries at lint time

**Location:** `tools/decoupling/eslint-plugin.ts`

**Rules:**

#### `decoupling/no-data-package-imports`
Prevents data package imports in protected layers (apps, ui, domain, contracts)

```typescript
// ❌ BAD
import { UserRepository } from '@xalatechnologies/platform-data';

// ✅ GOOD
import { UserService } from '@xalatechnologies/platform/services';
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';
```

#### `decoupling/no-schema-imports`
Prevents schema imports outside mapper modules

```typescript
// ❌ BAD (in domain service)
import { users } from '@xalatechnologies/platform-data/schema';

// ✅ GOOD (in mapper only)
// packages/platform-data/src/mappers/user-mapper.ts
import { users } from '../schema';
```

#### `decoupling/no-cross-domain-imports`
Prevents platform ↔ domain cross-imports

```typescript
// ❌ BAD (in platform)
import { BookingService } from '@xalatechnologies/booking-domain';

// ❌ BAD (in domain)
import { AuthService } from '@xalatechnologies/auth';

// ✅ GOOD - Use contracts/events for communication
```

**Configuration:**
- Initial mode: `warn` (non-blocking)
- Target mode: `error` (blocking after migration)

### 3. Codemod Tool

**Purpose:** Automated migration from schema imports to DTO imports

**Location:** `tools/decoupling/codemod.ts`

**Transformations:**

```typescript
// Schema to DTO
'@xalatechnologies/platform-data/schema' 
  → '@xalatechnologies/platform-contracts/dtos'

// Data to Service
'@xalatechnologies/platform-data' 
  → '@xalatechnologies/platform/services'
```

**Usage:**
```bash
pnpm decouple:fix              # Preview changes (dry run)
pnpm decouple:fix:apply        # Apply changes
```

**Output:**
- `reports/decoupling/codemod-preview.md` - Dry run results
- `reports/decoupling/codemod-applied.md` - Applied changes

### 4. Dependency Graph Checker

**Purpose:** Validate package dependencies and detect cycles

**Location:** `tools/decoupling/dependency-checker.ts`

**Checks:**
- Circular dependencies between packages
- Platform → Domain violations
- Domain → Platform violations
- Data → UI violations
- Data → Domain violations (outside data layer)

**Usage:**
```bash
pnpm decouple:deps
```

**Output:**
- `reports/decoupling/dependencies.json` - Machine-readable
- `reports/decoupling/dependencies.md` - Human-readable

## Quality Gates

### Decoupling Gate

The decoupling gate is integrated into the monitoring system at:
- `reports/monitoring/quality-gates.json`

**Structure:**
```json
{
  "decoupling": {
    "name": "decoupling",
    "status": "PASS" | "FAIL",
    "errors": 0,
    "warnings": 5,
    "details": {
      "totalViolations": 5,
      "byLayer": {
        "apps": 2,
        "ui": 3
      },
      "byType": {
        "SCHEMA_IMPORT": 5
      },
      "topOffenders": [
        { "file": "apps/frontend/src/...", "count": 3 }
      ]
    }
  }
}
```

**Pass Criteria:**
- Zero errors in protected layers
- Schema imports only in mappers
- No circular dependencies
- No cross-domain imports

## Migration Strategy

### Phase 0 — Baseline (No code changes)

**Goal:** Establish current state

**Actions:**
1. Run baseline scan: `pnpm decouple:scan`
2. Generate reports
3. Set quality gate to WARN mode
4. Document violations

**Deliverables:**
- `reports/decoupling/BASELINE.md`
- Initial violation count
- Migration roadmap

### Phase 1 — Guardrails (Errors for new code only)

**Goal:** Prevent new violations

**Actions:**
1. Enable ESLint rules as WARN
2. Add CI job: `verify:decoupling` (report-only)
3. Add pre-commit hooks for new PRs
4. Monitor trends

**Acceptance:**
- CI job runs on all PRs
- Reports generated automatically
- No new violations in changed files

### Phase 2 — Migration (Slice-by-slice)

**Goal:** Fix existing violations incrementally

**Priority Order:**
1. `apps/frontend` and `packages/ui` (must be schema-free)
2. `apps/api` route handlers and services
3. Shared hooks and utilities
4. Domain services
5. Legacy modules

**Per Slice:**
1. Run codemod: `pnpm decouple:fix`
2. Review changes
3. Replace schema imports with DTOs
4. Replace direct DB queries with domain services
5. Keep endpoint behavior stable
6. Add tests to lock outputs
7. Verify: `pnpm decouple:verify`

**Tracking:**
- Violation count decreasing
- Test coverage maintained
- No breaking changes

### Phase 3 — Tighten Gates (Repo-wide hard enforcement)

**Goal:** Zero tolerance for violations

**Actions:**
1. Turn warnings into errors once counts reach near-zero
2. Enforce 0 violations in protected layers
3. Remove legacy-compat shims
4. Update documentation

**Acceptance:**
- `apps/*` violations = 0
- `packages/ui` violations = 0
- `packages/domain` violations = 0
- Schema imports only in mappers
- All tests passing
- CI enforcing boundaries

## CI/CD Integration

### GitHub Actions Workflow

**File:** `.github/workflows/decoupling-verification.yml`

**Jobs:**

#### 1. verify-boundaries
- Run boundary scanner
- Check dependency graph
- Upload reports as artifacts
- Comment PR with results
- Fail if decoupling gate fails

#### 2. lint-boundaries
- Run ESLint with decoupling rules
- Check changed files for new violations
- Fail if new violations in PR

**Triggers:**
- Pull requests to main/develop
- Push to main
- Manual workflow dispatch

### Pre-commit Hook

```bash
#!/bin/bash
# .husky/pre-commit-decoupling

# Check staged files for violations
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

if [ -n "$STAGED_FILES" ]; then
  echo "Checking decoupling boundaries..."
  pnpm decouple:scan
  
  # Check if staged files have violations
  if [ -f "reports/decoupling/scan.json" ]; then
    VIOLATIONS=$(jq --arg files "$STAGED_FILES" '.violations | map(select(.file as $f | $files | contains($f))) | length' reports/decoupling/scan.json)
    
    if [ "$VIOLATIONS" -gt 0 ]; then
      echo "❌ Decoupling violations detected in staged files"
      exit 1
    fi
  fi
fi
```

## Monitoring Integration

### Endpoints

**GET /monitoring/quality-gates**
Returns all quality gates including decoupling

**GET /monitoring/decoupling-report**
Returns detailed decoupling report

### Dashboard

**Metrics:**
- Total violations
- Violations by layer
- Violations by type
- Top offending files
- Trend over time

**Alerts:**
- New violations introduced
- Violation count increasing
- Critical boundary breaches

## Troubleshooting

### Common Issues

#### Issue: "Data package import detected"

**Cause:** Code in apps/ui/domain importing from `@xalatechnologies/*-data`

**Solution:**
1. Replace with domain service: `@xalatechnologies/*-domain/services`
2. Use DTOs from contracts: `@xalatechnologies/*-contracts/dtos`
3. Inject services via DI

**Example:**
```typescript
// ❌ BEFORE
import { UserRepository } from '@xalatechnologies/platform-data';
const users = await userRepository.findAll();

// ✅ AFTER
import { UserService } from '@xalatechnologies/platform/services';
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';
const users: UserDTO[] = await userService.findAll();
```

#### Issue: "Schema import outside mapper"

**Cause:** Schema types imported outside mapper modules

**Solution:**
1. Move schema imports to mapper modules only
2. Use DTOs in business logic
3. Mappers in `packages/*-data/**/mappers/**`

**Example:**
```typescript
// ❌ BEFORE (in service)
import { users } from '@xalatechnologies/platform-data/schema';

// ✅ AFTER (in mapper)
// packages/platform-data/src/mappers/user-mapper.ts
import { users } from '../schema';
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';

export function toDTO(dbUser: typeof users.$inferSelect): UserDTO {
  return { ... };
}
```

#### Issue: "Platform importing domain"

**Cause:** Platform packages depend on domain packages

**Solution:**
1. Platform and domain must remain independent
2. Use contracts/interfaces for shared types
3. Consider event-driven communication

**Example:**
```typescript
// ❌ BEFORE
import { BookingService } from '@xalatechnologies/booking-domain';

// ✅ AFTER - Use events
import { EventBus } from '@xalatechnologies/core/events';
eventBus.emit('booking.created', { bookingId, userId });
```

## Acceptance Criteria

### Decoupling Gate PASS

- ✅ Zero violations in `apps/*`
- ✅ Zero violations in `packages/ui`
- ✅ Zero violations in `packages/domain`
- ✅ Zero violations in `packages/*-contracts`
- ✅ Schema imports only in `packages/*-data/**/mappers/**`
- ✅ No circular dependencies
- ✅ Platform and domain independent
- ✅ All tests passing
- ✅ No breaking changes to public APIs

## References

- [Decoupling Enforcement Kit README](../../tools/decoupling/README.md)
- [Architecture Decision Records](./decision-records/)
- [Domain Contracts](../03-packages/domain-contracts/)
- [Quality Gates](../../reports/monitoring/quality-gates.json)

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-05 | 1.0.0 | Initial decoupling enforcement system |
