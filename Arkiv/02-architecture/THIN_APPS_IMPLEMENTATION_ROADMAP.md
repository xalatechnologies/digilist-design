# Thin Apps Refactoring - Implementation Roadmap

**Date:** 2026-01-06  
**Status:** 🎯 Ready for Implementation  
**Reference:** See `THIN_APPS_REFACTORING_PLAN.md` for full architecture details

---

## Quick Reference

### Target Apps (4 total)
1. `apps/web` - Public + end-user (port 8000)
2. `apps/backoffice` - Admin + case handler (port 3005)
3. `apps/monitoring` - Scanners, compliance, requirements (port 3025)
4. `apps/knowledge` - Combined learning + docs + kb (NEW)

### New Packages (4 total)
1. `packages/client/scanners` - UI scanner utilities (NEW)
2. `packages/shared/requirements` - Requirements index + traceability (NEW)
3. `packages/shared/monitoring-model` - Monitoring types (NEW)
4. `packages/client/content` - Expand existing with navigation + indexer

---

## Implementation Phases

### Phase 1: Create New Packages ⏳

#### 1.1 Create `packages/shared/requirements`

**Structure:**
```
packages/shared/requirements/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                    # Main exports
    ├── index/
    │   ├── loader.ts              # Load requirements-index.json
    │   ├── types.ts               # Requirement types (move from monitoring)
    │   └── validator.ts           # Validate requirements
    ├── traceability/
    │   ├── layers.ts              # 6 traceability layers
    │   ├── mapper.ts              # Map artifacts to requirements
    │   └── coverage.ts            # Calculate coverage
    ├── acceptance/
    │   └── criteria.ts            # Acceptance criteria utilities
    └── data/
        └── requirements-index.json # Canonical requirements (copy from docs/specs/)
```

**package.json:**
```json
{
  "name": "@xalatechnologies/requirements",
  "version": "1.0.0",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./index": "./src/index/index.ts",
    "./traceability": "./src/traceability/index.ts",
    "./acceptance": "./src/acceptance/index.ts",
    "./types": "./src/index/types.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/"
  }
}
```

**Migration Steps:**
1. Create package structure
2. Copy types from `packages/client/monitoring/src/requirements/types.ts`
3. Copy `docs/specs/requirements-index.json` to `src/data/`
4. Create loader for requirements-index.json
5. Create traceability utilities

---

#### 1.2 Create `packages/shared/monitoring-model`

**Structure:**
```
packages/shared/monitoring-model/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    └── types/
        ├── scan.ts               # Scan types
        ├── finding.ts            # Finding types
        ├── requirement.ts        # Requirement types (re-export from requirements)
        └── coverage.ts           # Coverage types
```

**package.json:**
```json
{
  "name": "@xalatechnologies/monitoring-model",
  "version": "1.0.0",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./types": "./src/types/index.ts"
  },
  "dependencies": {
    "@xalatechnologies/requirements": "workspace:*"
  }
}
```

**Migration Steps:**
1. Create package structure
2. Extract shared types from `packages/client/monitoring`
3. Re-export requirement types from `@xalatechnologies/requirements`

---

#### 1.3 Create `packages/client/scanners`

**Structure:**
```
packages/client/scanners/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── ui-chemistry/
    │   ├── index.ts
    │   ├── token-purity.ts
    │   ├── token-gaps.ts
    │   └── registry-compliance.ts
    ├── requirements/
    │   ├── index.ts
    │   ├── coverage.ts
    │   ├── traceability.ts
    │   └── gaps.ts
    ├── security/
    │   └── index.ts
    └── quality/
        └── index.ts
```

**package.json:**
```json
{
  "name": "@xalatechnologies/scanners",
  "version": "1.0.0",
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./ui-chemistry": "./src/ui-chemistry/index.ts",
    "./requirements": "./src/requirements/index.ts",
    "./security": "./src/security/index.ts",
    "./quality": "./src/quality/index.ts"
  },
  "dependencies": {
    "@xalatechnologies/ui": "workspace:*",
    "@xalatechnologies/requirements": "workspace:*"
  },
  "peerDependencies": {
    "react": "catalog:"
  }
}
```

**Migration Steps:**
1. Create package structure
2. Move scanner UI components from `apps/monitoring`
3. Move scanner utilities from `apps/monitoring`
4. Keep backend runners in `packages/server/dev-tools`

---

#### 1.4 Expand `packages/client/content`

**New Structure:**
```
packages/client/content/src/
├── ... (existing files)
├── content-types/    # 🆕 NEW
│   ├── index.ts
│   ├── docs.ts
│   ├── learning.ts
│   └── kb.ts
├── navigation/       # 🆕 NEW
│   ├── index.ts
│   ├── builder.ts
│   ├── types.ts
│   └── tree.ts
└── indexer/          # 🆕 NEW
    ├── index.ts
    ├── build-index.ts
    └── search.ts
```

**New Exports (add to package.json):**
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

**Migration Steps:**
1. Create content-types module
2. Create navigation builder
3. Create content indexer
4. Update package.json exports

---

### Phase 2: Combine Learning + Docs → Knowledge ⏳

#### 2.1 Create `apps/knowledge`

**Structure:**
```
apps/knowledge/
├── app/
│   ├── routes.ts
│   ├── root.tsx
│   ├── routes/
│   │   ├── docs-layout.tsx
│   │   ├── docs.tsx
│   │   ├── learn.tsx
│   │   └── kb.tsx
│   └── ...
├── package.json
├── react-router.config.ts
├── vite.config.ts
└── tsconfig.json
```

**package.json:**
```json
{
  "name": "@digilist-no/knowledge",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint app/"
  },
  "dependencies": {
    "@xalatechnologies/content": "workspace:*",
    "@xalatechnologies/ui": "workspace:*",
    "@xalatechnologies/platform": "workspace:*",
    "react": "catalog:",
    "react-dom": "catalog:",
    "react-router": "catalog:"
  }
}
```

**Migration Steps:**
1. Create `apps/knowledge` directory
2. Copy base structure from `apps/learning-hub`
3. Merge routes from `apps/docs`
4. Update routes.ts with `/docs/*`, `/learn/*`, `/kb/*`
5. Update to use `@xalatechnologies/content`

---

#### 2.2 Move Content to Packages

**Content Migration:**
```
apps/docs/content/*          → packages/client/content/src/docs/*
apps/learning-hub/content/*  → packages/client/content/src/learning/*
(create new)                 → packages/client/content/src/kb/*
```

**Steps:**
1. Move MDX files to content package
2. Update content loader to handle all types
3. Update navigation builder
4. Generate content index

---

### Phase 3: Update Apps to Use Packages ⏳

#### 3.1 Update `apps/monitoring`

**Changes:**
- Import from `@xalatechnologies/scanners`
- Import from `@xalatechnologies/requirements`
- Import from `@xalatechnologies/monitoring-model`
- Remove local scanner components (moved to packages)

**Example:**
```typescript
// Before
import { ScannerResult } from './components/scanner-result';

// After
import { ScannerResult } from '@xalatechnologies/scanners';
```

---

#### 3.2 Update `apps/knowledge`

**Changes:**
- Import from `@xalatechnologies/content`
- Use shared navigation components
- Use shared search components

**Example:**
```typescript
import { loadContent } from '@xalatechnologies/content';
import { ContentNavigation } from '@xalatechnologies/content/navigation';
```

---

#### 3.3 Verify `apps/web` & `apps/backoffice`

**Check:**
- ✅ Already using `@xalatechnologies/ui`
- ✅ No app-specific reusable components remain
- ✅ All feature components in packages

---

### Phase 4: Cleanup ⏳

#### 4.1 Remove Old Apps

**Delete:**
- `apps/docs` (merged into `apps/knowledge`)
- `apps/learning-hub` (merged into `apps/knowledge`)

**Update:**
- `pnpm-workspace.yaml` - Remove old apps
- `package.json` scripts - Update references

---

#### 4.2 Verify Boundaries

**Run:**
```bash
pnpm lint                    # ESLint boundary checks
pnpm arch:scan              # Architecture compliance
pnpm cross-app:scan         # Cross-app import scanner
```

**Verify:**
- ✅ No cross-app imports
- ✅ No packages importing apps
- ✅ All apps using package imports

---

## Package Dependencies

### Dependency Graph

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

packages/client/scanners
  ↓
@xalatechnologies/ui
@xalatechnologies/requirements

packages/shared/monitoring-model
  ↓
@xalatechnologies/requirements

packages/client/content
  ↓
@xalatechnologies/ui
```

---

## Verification Checklist

### Before Starting
- [ ] Review `THIN_APPS_REFACTORING_PLAN.md`
- [ ] Understand current structure
- [ ] Identify all code to migrate

### Phase 1: Packages
- [ ] Create `packages/shared/requirements`
- [ ] Create `packages/shared/monitoring-model`
- [ ] Create `packages/client/scanners`
- [ ] Expand `packages/client/content`
- [ ] Update package.json files
- [ ] Run `pnpm install`

### Phase 2: Knowledge App
- [ ] Create `apps/knowledge`
- [ ] Merge routes from learning-hub + docs
- [ ] Move content to packages
- [ ] Update content loader
- [ ] Test routes work

### Phase 3: Update Apps
- [ ] Update `apps/monitoring`
- [ ] Update `apps/knowledge`
- [ ] Verify `apps/web` & `apps/backoffice`
- [ ] Remove duplicate code

### Phase 4: Cleanup
- [ ] Delete `apps/docs`
- [ ] Delete `apps/learning-hub`
- [ ] Update workspace config
- [ ] Run boundary checks
- [ ] Run tests

---

## Success Criteria

✅ **All apps are thin shells:**
- No business logic in apps
- No reusable components in apps
- Apps only compose routes/layout/providers

✅ **All reusable code in packages:**
- Clear package boundaries
- Proper exports
- No app dependencies

✅ **Boundaries enforced:**
- ESLint prevents violations
- Import scanner verifies compliance
- Tests pass

✅ **Knowledge app works:**
- Combined learning + docs + kb
- Single content pipeline
- Unified navigation

✅ **Monitoring app works:**
- Uses scanner packages
- Uses requirements packages
- Shows coverage and traceability

---

## Next Steps

1. **Start with Phase 1** - Create new packages
2. **Test incrementally** - Verify each package works
3. **Update apps gradually** - One app at a time
4. **Clean up last** - Remove old code after verification

---

## Questions?

See `THIN_APPS_REFACTORING_PLAN.md` for detailed architecture and decisions.
