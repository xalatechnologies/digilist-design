# Thin Apps Refactoring Plan

**Date:** 2026-01-06  
**Status:** 🎯 Planning  
**Goal:** Refactor Digilist into "thin app shell + reusable packages" architecture

---

## Executive Summary

This document outlines the refactoring plan to transform Digilist into a clean "thin app shell + reusable packages" architecture. Apps become composition-only (routes/layout/providers), while all reusable code moves to packages.

**Key Changes:**
- ✅ Combine `apps/learning-hub` + `apps/docs` → `apps/knowledge`
- ✅ Keep `apps/monitoring` separate (scanners, compliance, requirements)
- ✅ Move all reusable UI/features/content/scanners to packages
- ✅ Enforce strict package boundaries (no apps ↔ apps imports)

---

## Target Architecture

### Apps (Thin Shells Only)

```
apps/
├── web/              # Public + end-user (port 8000)
├── backoffice/       # Admin + case handler (port 3005)
├── monitoring/       # Scanners, compliance, requirements (port 3025)
└── knowledge/        # Combined learning + docs + kb (NEW)
```

**App Responsibilities:**
- ✅ Route definitions (`routes.ts`)
- ✅ Layout composition (`root.tsx`, layout components)
- ✅ Provider setup (auth, tenant, i18n, query client)
- ✅ App-specific configuration
- ❌ NO business logic
- ❌ NO reusable components
- ❌ NO feature code

---

## Package Structure

### New Packages

```
packages/
├── client/
│   ├── ui/                    # ✅ EXISTS - Components + tokens + Tailwind preset
│   ├── content/               # ✅ EXISTS - MDX processing (expand for kb)
│   ├── scanners/              # 🆕 NEW - UI chemistry + requirements + security scanners
│   ├── requirements/          # 🆕 NEW - Requirements index + traceability model
│   └── monitoring-model/      # 🆕 NEW - Types + DB models + query helpers
├── server/
│   ├── dev-tools/             # ✅ EXISTS - Scanner runners (move UI parts out)
│   └── ...
└── shared/
    └── ...
```

### Package Responsibilities

#### `@xalatechnologies/ui`
**Status:** ✅ Exists  
**Purpose:** Design tokens, Tailwind preset, reusable components

**Exports:**
- `@xalatechnologies/ui` - Components, tokens
- `@xalatechnologies/ui/features/*` - Feature modules (listings, bookings, etc.)
- `@xalatechnologies/ui/style.css` - Global styles

**Rules:**
- All styling via design tokens
- No app-specific code
- Components use ports/adapters pattern

---

#### `@xalatechnologies/content` (Expand)
**Status:** ✅ Exists, needs expansion  
**Purpose:** MDX content pipeline, navigation model, content index

**Current Structure:**
```
packages/client/content/src/
├── mdx/              # MDX compiler + loader
├── components/       # Content components
└── ...
```

**New Structure:**
```
packages/client/content/src/
├── mdx/              # MDX compiler + loader
├── components/       # Content components
├── content-types/    # 🆕 Content type definitions
│   ├── docs.ts       # Documentation content type
│   ├── learning.ts   # Learning content type
│   └── kb.ts         # Knowledge base content type
├── navigation/       # 🆕 Navigation tree model
│   ├── builder.ts    # Build nav tree from content
│   ├── types.ts      # Nav tree types
│   └── index.ts
├── indexer/          # 🆕 Content indexing
│   ├── build-index.ts # Generate contentIndex.json
│   └── search.ts     # Search across all content types
└── index.ts
```

**Content Types:**
- `docs/*` - Developer documentation
- `learn/*` - Learning courses and lessons
- `kb/*` - Knowledge base articles, policies, playbooks

**Exports:**
- `@xalatechnologies/content` - Content loading
- `@xalatechnologies/content/navigation` - Navigation tree
- `@xalatechnologies/content/indexer` - Content index + search
- `@xalatechnologies/content/types` - Content type definitions

---

#### `@xalatechnologies/scanners` (NEW)
**Status:** 🆕 New package  
**Purpose:** UI chemistry, requirements, security, quality scanners

**Structure:**
```
packages/client/scanners/src/
├── ui-chemistry/     # Design token scanners
│   ├── token-purity.ts
│   ├── token-gaps.ts
│   └── registry-compliance.ts
├── requirements/     # Requirements coverage scanners
│   ├── coverage.ts
│   ├── traceability.ts
│   └── gaps.ts
├── security/         # Security scanners
│   └── ...
├── quality/          # Code quality scanners
│   └── ...
└── index.ts
```

**Exports:**
- `@xalatechnologies/scanners` - Scanner runners
- `@xalatechnologies/scanners/ui-chemistry` - UI scanners
- `@xalatechnologies/scanners/requirements` - Requirements scanners

**Note:** Backend scanner runners stay in `packages/server/dev-tools`. This package provides UI/client-side scanner utilities.

---

#### `@xalatechnologies/requirements` (NEW)
**Status:** 🆕 New package  
**Purpose:** Requirements index, acceptance criteria, traceability model

**Structure:**
```
packages/shared/requirements/src/
├── index/            # Requirements index
│   ├── loader.ts     # Load requirements-index.json
│   ├── types.ts      # Requirement types
│   └── validator.ts  # Validate requirements
├── traceability/     # Traceability model
│   ├── layers.ts     # 6 traceability layers
│   ├── mapper.ts     # Map artifacts to requirements
│   └── coverage.ts   # Calculate coverage
├── acceptance/       # Acceptance criteria
│   └── ...
└── index.ts
```

**Exports:**
- `@xalatechnologies/requirements` - Requirements index
- `@xalatechnologies/requirements/traceability` - Traceability utilities
- `@xalatechnologies/requirements/types` - TypeScript types

**Data:**
- `requirements-index.json` - Canonical requirements
- `coverage.json` - Coverage artifacts
- `gaps.json` - Coverage gaps

---

#### `@xalatechnologies/monitoring-model` (NEW)
**Status:** 🆕 New package  
**Purpose:** Monitoring types, DB models, query helpers

**Structure:**
```
packages/shared/monitoring-model/src/
├── types/            # TypeScript types
│   ├── scan.ts
│   ├── finding.ts
│   ├── requirement.ts
│   └── coverage.ts
├── queries/          # Query helpers (if needed)
│   └── ...
└── index.ts
```

**Exports:**
- `@xalatechnologies/monitoring-model` - Types and models

**Note:** Database schema stays in `packages/server/platform-data`. This package provides shared types.

---

## Dependency Graph Rules

### Hard Rules (Enforced by ESLint)

1. **Apps CANNOT import from other apps**
   ```typescript
   // ❌ FORBIDDEN
   import { ... } from 'apps/web/...';
   import { ... } from 'apps/monitoring/...';
   ```

2. **Packages CANNOT import from apps**
   ```typescript
   // ❌ FORBIDDEN
   import { ... } from 'apps/web/...';
   ```

3. **Apps MUST use package imports**
   ```typescript
   // ✅ CORRECT
   import { Button } from '@xalatechnologies/ui';
   import { loadContent } from '@xalatechnologies/content';
   ```

4. **Packages can import from other packages**
   ```typescript
   // ✅ CORRECT
   import { Button } from '@xalatechnologies/ui';
   ```

### Package Dependency Graph

```
apps/web
  ↓
@xalatechnologies/ui
@xalatechnologies/content
@xalatechnologies/domain-hooks
@xalatechnologies/platform

apps/backoffice
  ↓
@xalatechnologies/ui
@xalatechnologies/content
@xalatechnologies/domain-hooks
@xalatechnologies/platform

apps/monitoring
  ↓
@xalatechnologies/ui
@xalatechnologies/scanners
@xalatechnologies/requirements
@xalatechnologies/monitoring-model

apps/knowledge
  ↓
@xalatechnologies/ui
@xalatechnologies/content
@xalatechnologies/platform

packages/client/content
  ↓
@xalatechnologies/ui

packages/client/scanners
  ↓
@xalatechnologies/ui
@xalatechnologies/requirements

packages/shared/requirements
  ↓
(no dependencies - pure types)
```

---

## Migration Plan

### Phase 1: Create New Packages ✅

1. ✅ Expand `@xalatechnologies/content` with:
   - Content types (docs, learning, kb)
   - Navigation tree builder
   - Content indexer

2. ✅ Create `@xalatechnologies/scanners`:
   - Move UI scanner utilities from `apps/monitoring`
   - Move scanner UI components from `apps/monitoring`

3. ✅ Create `@xalatechnologies/requirements`:
   - Move requirements types from `packages/client/monitoring`
   - Move requirements index loader
   - Move traceability utilities

4. ✅ Create `@xalatechnologies/monitoring-model`:
   - Extract shared types from `packages/client/monitoring`
   - Extract DB model types

### Phase 2: Combine Learning + Docs → Knowledge 🔄

1. Create `apps/knowledge`:
   - Copy route structure from `apps/learning-hub`
   - Add routes from `apps/docs`
   - Merge layouts (use shared `DocsShell`)

2. Update routes:
   - `/docs/*` - Documentation (from apps/docs)
   - `/learn/*` - Learning paths (from apps/learning-hub)
   - `/kb/*` - Knowledge base (from apps/learning-hub)

3. Move content:
   - `apps/docs/content/*` → `packages/client/content/src/docs/*`
   - `apps/learning-hub/content/*` → `packages/client/content/src/learning/*`
   - Create `packages/client/content/src/kb/*` for knowledge base

4. Update `apps/knowledge` to use `@xalatechnologies/content`

### Phase 3: Move Reusable Code to Packages 🔄

1. **From `apps/web` to `@xalatechnologies/ui`:**
   - Feature components (already done ✅)
   - Layout components (if reusable)
   - Common components

2. **From `apps/monitoring` to `@xalatechnologies/scanners`:**
   - Scanner UI components
   - Scanner result displays
   - Compliance dashboards (if reusable)

3. **From `apps/monitoring` to `@xalatechnologies/requirements`:**
   - Requirements sidebar component
   - Requirement detail pages (if reusable)
   - Coverage status displays

### Phase 4: Update Apps to Use Packages ⏳

1. **apps/knowledge:**
   - Import from `@xalatechnologies/content`
   - Use shared navigation components
   - Use shared search components

2. **apps/monitoring:**
   - Import from `@xalatechnologies/scanners`
   - Import from `@xalatechnologies/requirements`
   - Import from `@xalatechnologies/monitoring-model`

3. **apps/web & apps/backoffice:**
   - Already using `@xalatechnologies/ui` ✅
   - Ensure no app-specific components remain

### Phase 5: Cleanup & Verification ⏳

1. Remove old apps:
   - Delete `apps/docs` (merged into `apps/knowledge`)
   - Delete `apps/learning-hub` (merged into `apps/knowledge`)

2. Update workspace:
   - Update `pnpm-workspace.yaml`
   - Update `package.json` scripts

3. Verify boundaries:
   - Run ESLint boundary checks
   - Run import scanner
   - Verify no cross-app imports

---

## Minimal Working Route Shells

### apps/knowledge

**Structure:**
```
apps/knowledge/
├── app/
│   ├── routes.ts              # Route definitions
│   ├── root.tsx               # Root layout (providers only)
│   ├── routes/
│   │   ├── docs-layout.tsx   # Docs layout shell
│   │   ├── docs.tsx          # /docs/* routes
│   │   ├── learn.tsx         # /learn/* routes
│   │   └── kb.tsx            # /kb/* routes
│   └── ...
├── package.json
└── ...
```

**routes.ts:**
```typescript
import { type RouteConfig, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/docs-layout.tsx', [
    route('docs/*', 'routes/docs.tsx'),
    route('learn/*', 'routes/learn.tsx'),
    route('kb/*', 'routes/kb.tsx'),
  ]),
] satisfies RouteConfig;
```

**docs-layout.tsx:**
```typescript
import { DocsShell } from '@xalatechnologies/ui';
import { ContentNavigation } from '@xalatechnologies/content/navigation';
import { Outlet } from 'react-router';

export default function DocsLayout() {
  return (
    <DocsShell>
      <ContentNavigation />
      <Outlet />
    </DocsShell>
  );
}
```

---

### apps/monitoring

**Structure:**
```
apps/monitoring/
├── app/
│   ├── routes.ts              # Route definitions
│   ├── root.tsx               # Root layout (providers only)
│   ├── routes/
│   │   ├── dashboard.tsx     # / - Dashboard
│   │   ├── scans.tsx         # /scans - Scan results
│   │   ├── requirements.tsx  # /requirements - Requirements list
│   │   └── requirements.$id.tsx # /requirements/:id - Requirement detail
│   └── ...
├── package.json
└── ...
```

**routes.ts:**
```typescript
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/dashboard.tsx'),
  route('scans', 'routes/scans.tsx'),
  route('requirements', 'routes/requirements.tsx'),
  route('requirements/:id', 'routes/requirements.$id.tsx'),
] satisfies RouteConfig;
```

---

## ESLint Boundary Rules

### Update `eslint-app-boundaries.mjs`

```javascript
export default [
  {
    name: 'app-boundaries/no-cross-app-imports',
    files: ['apps/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Prevent any app from importing from other apps
            {
              group: ['**/apps/web/**', '**/apps/backoffice/**', '**/apps/monitoring/**', '**/apps/knowledge/**'],
              message: 'Apps cannot import from other apps. Use @xalatechnologies/* packages instead.',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'app-boundaries/enforce-package-imports',
    files: ['apps/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../../packages/**', '../../../packages/**'],
              message: 'Use @xalatechnologies/* package imports instead of relative paths',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'package-boundaries/no-app-imports',
    files: ['packages/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/apps/**'],
              message: 'Packages cannot import from apps. Packages must be framework-agnostic.',
            },
          ],
        },
      ],
    },
  },
];
```

---

## Package Exports

### @xalatechnologies/content

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./mdx": "./src/mdx/index.ts",
    "./mdx/components": "./src/mdx/components.tsx",
    "./components/content": "./src/components/content/index.ts",
    "./navigation": "./src/navigation/index.ts",
    "./indexer": "./src/indexer/index.ts",
    "./types": "./src/content-types/index.ts"
  }
}
```

### @xalatechnologies/scanners

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./ui-chemistry": "./src/ui-chemistry/index.ts",
    "./requirements": "./src/requirements/index.ts",
    "./security": "./src/security/index.ts",
    "./quality": "./src/quality/index.ts"
  }
}
```

### @xalatechnologies/requirements

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./index": "./src/index/index.ts",
    "./traceability": "./src/traceability/index.ts",
    "./acceptance": "./src/acceptance/index.ts",
    "./types": "./src/index/types.ts"
  }
}
```

### @xalatechnologies/monitoring-model

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./types": "./src/types/index.ts"
  }
}
```

---

## Next Steps

1. ✅ **Review this plan** - Validate approach
2. ⏳ **Create new packages** - Set up package structure
3. ⏳ **Expand content package** - Add navigation + indexer
4. ⏳ **Create knowledge app** - Combine learning + docs
5. ⏳ **Migrate code** - Move reusable code to packages
6. ⏳ **Update ESLint rules** - Enforce boundaries
7. ⏳ **Verify** - Run boundary checks, tests

---

## Questions & Decisions Needed

1. **Content location:** Should content live in `packages/client/content/src/` or separate `content/` directory?
   - **Decision:** Keep in package for now, can move later if needed

2. **Requirements data:** Where should `requirements-index.json` live?
   - **Decision:** `packages/shared/requirements/src/data/requirements-index.json`

3. **Monitoring DB:** Keep schema in `packages/server/platform-data` or move to `packages/shared/monitoring-model`?
   - **Decision:** Keep schema in server package, types in shared package

4. **Scanner runners:** Keep backend runners in `packages/server/dev-tools` or move to `packages/shared/scanners`?
   - **Decision:** Keep backend runners in dev-tools, UI utilities in client/scanners

---

## Success Criteria

✅ **Apps are thin shells:**
- No business logic in apps
- No reusable components in apps
- Apps only compose routes/layout/providers

✅ **Packages are reusable:**
- All reusable code in packages
- Packages have clear exports
- Packages don't depend on apps

✅ **Boundaries enforced:**
- ESLint prevents cross-app imports
- ESLint prevents packages importing apps
- Import scanner verifies compliance

✅ **Knowledge app works:**
- Combined learning + docs + kb
- Single content pipeline
- Unified navigation and search

✅ **Monitoring app works:**
- Uses scanner packages
- Uses requirements packages
- Shows coverage and traceability
