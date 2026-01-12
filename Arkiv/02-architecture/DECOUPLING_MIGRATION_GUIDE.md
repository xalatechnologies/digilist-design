# Decoupling Migration Guide

## Quick Start

### 1. Install Dependencies

```bash
cd tools/decoupling
pnpm install
cd ../..
```

### 2. Run Baseline Scan

```bash
pnpm decouple:scan
```

This creates:
- `reports/decoupling/BASELINE.md` - Initial state
- `reports/decoupling/LATEST.md` - Current state
- `reports/decoupling/scan.json` - Machine-readable data
- `reports/monitoring/quality-gates.json` - Quality gate status

### 3. Review Reports

```bash
cat reports/decoupling/LATEST.md
```

### 4. Preview Automated Fixes

```bash
pnpm decouple:fix
```

Review `reports/decoupling/codemod-preview.md`

### 5. Apply Fixes (when ready)

```bash
pnpm decouple:fix:apply
```

### 6. Verify

```bash
pnpm decouple:verify
pnpm typecheck
pnpm test
```

## Migration Phases

### Phase 0: Baseline & Setup ✅

**Status:** Complete

**Deliverables:**
- ✅ Boundary scanner tool
- ✅ ESLint plugin with 3 rules
- ✅ Codemod tool for automated migration
- ✅ Dependency graph checker
- ✅ CI/CD integration
- ✅ Quality gates integration
- ✅ Documentation

**Actions:**
1. Run baseline scan
2. Review violation counts
3. Identify top offending files
4. Plan migration order

### Phase 1: Guardrails (Week 1-2)

**Goal:** Prevent new violations

**Tasks:**

#### 1.1 Enable ESLint Rules (Warn Mode)

Add to root `eslint.config.mjs`:

```javascript
import decouplingConfig from './tools/decoupling/eslint.config.mjs';

export default [
  // ... existing config
  ...decouplingConfig,
];
```

#### 1.2 Add Pre-commit Hook

Create `.husky/pre-commit-decoupling`:

```bash
#!/bin/bash
STAGED_TS=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

if [ -n "$STAGED_TS" ]; then
  echo "🔍 Checking decoupling boundaries..."
  pnpm decouple:scan
  
  if [ -f "reports/decoupling/scan.json" ]; then
    NEW_VIOLATIONS=$(jq --arg files "$STAGED_TS" \
      '.violations | map(select(.file as $f | $files | contains($f))) | length' \
      reports/decoupling/scan.json)
    
    if [ "$NEW_VIOLATIONS" -gt 0 ]; then
      echo "❌ Found $NEW_VIOLATIONS violations in staged files"
      echo "Run: pnpm decouple:fix"
      exit 1
    fi
  fi
fi
```

#### 1.3 Enable CI Workflow

The workflow at `.github/workflows/decoupling-verification.yml` is ready.

Ensure it runs on PRs:
- Scans boundaries
- Checks dependencies
- Comments results on PR
- Fails if errors found

#### 1.4 Monitor Trends

Weekly review:
- Violation counts
- New vs fixed violations
- Top offending files
- Team awareness

**Acceptance:**
- CI runs on all PRs ✓
- No new violations in changed files ✓
- Team trained on tools ✓

### Phase 2: Migration (Week 3-8)

**Goal:** Fix existing violations incrementally

#### Priority Order

**P0: Critical Paths (Week 3-4)**
1. `apps/frontend/src/` - User-facing code
2. `packages/ui/` - Shared components
3. `apps/api/src/routes/` - API endpoints

**P1: Domain Services (Week 5-6)**
1. `packages/booking-domain/`
2. `packages/listing-domain/`
3. `packages/platform/`

**P2: Utilities & Shared (Week 7-8)**
1. Shared hooks
2. Utility functions
3. Legacy modules

#### Per-Slice Migration Process

**Step 1: Identify Slice**

```bash
# Example: Migrate apps/frontend
cd apps/frontend
```

**Step 2: Run Codemod**

```bash
pnpm decouple:fix
# Review reports/decoupling/codemod-preview.md
pnpm decouple:fix:apply
```

**Step 3: Manual Fixes**

Replace direct data access with services:

```typescript
// ❌ BEFORE
import { db } from '@xalatechnologies/platform-data';
import { users } from '@xalatechnologies/platform-data/schema';

const user = await db.select().from(users).where(eq(users.id, userId));

// ✅ AFTER
import { UserService } from '@xalatechnologies/platform/services';
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';

const user: UserDTO = await userService.findById(userId);
```

**Step 4: Update Imports**

```typescript
// ❌ BEFORE
import type { User } from '@xalatechnologies/platform-data/schema';

// ✅ AFTER
import type { UserDTO } from '@xalatechnologies/platform-contracts/dtos';
```

**Step 5: Inject Services**

```typescript
// ❌ BEFORE
export class BookingHandler {
  async handle(req: Request) {
    const booking = await db.select()...
  }
}

// ✅ AFTER
export class BookingHandler {
  constructor(private bookingService: BookingService) {}
  
  async handle(req: Request) {
    const booking = await this.bookingService.findById(id);
  }
}
```

**Step 6: Test**

```bash
pnpm typecheck
pnpm lint
pnpm test
```

**Step 7: Verify**

```bash
pnpm decouple:verify
```

**Step 8: Commit**

```bash
git add .
git commit -m "refactor: migrate [slice] to use domain services"
```

#### Migration Patterns

**Pattern 1: Schema Type → DTO**

```typescript
// Before
import { users } from '@xalatechnologies/platform-data/schema';
type User = typeof users.$inferSelect;

// After
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';
type User = UserDTO;
```

**Pattern 2: Direct DB Query → Service Call**

```typescript
// Before
import { db } from '@xalatechnologies/platform-data';
const results = await db.select().from(users).where(...);

// After
import { UserService } from '@xalatechnologies/platform/services';
const results = await userService.findBy({ ... });
```

**Pattern 3: Repository → Service**

```typescript
// Before
import { UserRepository } from '@xalatechnologies/platform-data';
const repo = new UserRepository(db);
const user = await repo.findById(id);

// After
import { UserService } from '@xalatechnologies/platform/services';
const user = await userService.findById(id);
```

**Pattern 4: Mapper in Wrong Layer → Move to Data Layer**

```typescript
// Before (in domain)
import { users } from '@xalatechnologies/platform-data/schema';
function toDTO(dbUser: typeof users.$inferSelect) { ... }

// After (in data/mappers)
// packages/platform-data/src/mappers/user-mapper.ts
import { users } from '../schema';
export function toDTO(dbUser: typeof users.$inferSelect): UserDTO { ... }
```

#### Tracking Progress

Create `reports/decoupling/MIGRATION_PROGRESS.md`:

```markdown
# Migration Progress

## Summary
- Total Violations: 150 → 45 (70% reduction)
- P0 Complete: 3/3 ✅
- P1 Complete: 2/3 🚧
- P2 Complete: 0/3 ⏳

## By Layer
- apps/frontend: 50 → 0 ✅
- packages/ui: 30 → 0 ✅
- apps/api: 40 → 5 🚧
- packages/domain: 30 → 40 🚧

## Top Offenders
1. packages/booking-domain/src/services/booking-service.ts (15)
2. apps/api/src/routes/listings.ts (10)
3. packages/platform/src/services/user-service.ts (8)
```

**Acceptance:**
- P0 violations = 0 ✓
- P1 violations < 10 ✓
- All tests passing ✓
- No breaking changes ✓

### Phase 3: Enforcement (Week 9+)

**Goal:** Zero tolerance for violations

#### 3.1 Tighten ESLint Rules

Change from `warn` to `error`:

```javascript
// tools/decoupling/eslint.config.mjs
rules: {
  'decoupling/no-data-package-imports': 'error',  // was: 'warn'
  'decoupling/no-schema-imports': 'error',        // was: 'warn'
  'decoupling/no-cross-domain-imports': 'error',  // was: 'warn'
}
```

#### 3.2 Enforce in CI

Update `.github/workflows/decoupling-verification.yml`:

```yaml
- name: Verify decoupling gate
  run: |
    pnpm decouple:verify
    # Exit 1 if any violations (no longer continue-on-error)
```

#### 3.3 Update Documentation

- Mark migration complete
- Update architecture docs
- Train team on new patterns
- Create onboarding guide

#### 3.4 Remove Legacy Shims

If any legacy-compat packages were created, remove them:

```bash
rm -rf packages/legacy-compat
```

**Acceptance:**
- All violations = 0 ✓
- ESLint rules = error ✓
- CI enforcing boundaries ✓
- Documentation updated ✓
- Team trained ✓

## Common Scenarios

### Scenario 1: API Route Handler

**Before:**
```typescript
// apps/api/src/routes/users.ts
import { db } from '@xalatechnologies/platform-data';
import { users } from '@xalatechnologies/platform-data/schema';
import { eq } from 'drizzle-orm';

export async function getUser(req: Request) {
  const { id } = req.params;
  const user = await db.select().from(users).where(eq(users.id, id));
  return user;
}
```

**After:**
```typescript
// apps/api/src/routes/users.ts
import { UserService } from '@xalatechnologies/platform/services';
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';

export async function getUser(
  req: Request,
  userService: UserService
): Promise<UserDTO> {
  const { id } = req.params;
  const user = await userService.findById(id);
  return user;
}
```

### Scenario 2: React Component

**Before:**
```typescript
// apps/frontend/src/components/UserProfile.tsx
import { users } from '@xalatechnologies/platform-data/schema';

type User = typeof users.$inferSelect;

export function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>;
}
```

**After:**
```typescript
// apps/frontend/src/components/UserProfile.tsx
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';

export function UserProfile({ user }: { user: UserDTO }) {
  return <div>{user.name}</div>;
}
```

### Scenario 3: Domain Service

**Before:**
```typescript
// packages/booking-domain/src/services/booking-service.ts
import { db } from '@xalatechnologies/booking-data';
import { bookings } from '@xalatechnologies/booking-data/schema';

export class BookingService {
  async create(data: CreateBookingDTO) {
    const booking = await db.insert(bookings).values(data).returning();
    return booking[0];
  }
}
```

**After:**
```typescript
// packages/booking-domain/src/services/booking-service.ts
import { BookingRepository } from '@xalatechnologies/booking-data';
import { CreateBookingDTO, BookingDTO } from '@xalatechnologies/booking-contracts/dtos';

export class BookingService {
  constructor(private repository: BookingRepository) {}
  
  async create(data: CreateBookingDTO): Promise<BookingDTO> {
    return await this.repository.create(data);
  }
}
```

### Scenario 4: Mapper Module

**Before (in wrong location):**
```typescript
// packages/booking-domain/src/mappers/booking-mapper.ts
import { bookings } from '@xalatechnologies/booking-data/schema';

export function toDTO(db: typeof bookings.$inferSelect) { ... }
```

**After (in data layer):**
```typescript
// packages/booking-data/src/mappers/booking-mapper.ts
import { bookings } from '../schema';
import { BookingDTO } from '@xalatechnologies/booking-contracts/dtos';

export function toDTO(db: typeof bookings.$inferSelect): BookingDTO {
  return {
    id: db.id,
    // ... map fields
  };
}
```

## Troubleshooting

### Issue: Type Mismatch After Migration

**Problem:**
```typescript
Type 'UserDTO' is not assignable to type 'User'
```

**Solution:**
Ensure DTO types match schema inference:

```typescript
// packages/platform-contracts/src/dtos/user.dto.ts
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  // Match schema fields exactly
}
```

### Issue: Missing Service Method

**Problem:**
```typescript
Property 'findByEmail' does not exist on type 'UserService'
```

**Solution:**
Add missing method to service:

```typescript
// packages/platform/src/services/user-service.ts
async findByEmail(email: string): Promise<UserDTO | null> {
  return await this.repository.findByEmail(email);
}
```

### Issue: Circular Dependency

**Problem:**
```
Circular dependency detected: A → B → A
```

**Solution:**
1. Identify cycle: `pnpm decouple:deps`
2. Break cycle using interfaces/contracts
3. Use dependency injection
4. Consider event-driven communication

### Issue: Performance Regression

**Problem:**
Service calls slower than direct DB queries

**Solution:**
1. Add caching layer
2. Optimize repository queries
3. Use batch operations
4. Profile and measure

## Best Practices

### 1. Always Use DTOs in Public APIs

```typescript
// ✅ GOOD
export async function getUser(id: string): Promise<UserDTO> { ... }

// ❌ BAD
export async function getUser(id: string): Promise<typeof users.$inferSelect> { ... }
```

### 2. Keep Mappers in Data Layer

```typescript
// ✅ GOOD: packages/platform-data/src/mappers/
// ❌ BAD: packages/platform/src/mappers/
```

### 3. Inject Services, Don't Import Data

```typescript
// ✅ GOOD
constructor(private userService: UserService) {}

// ❌ BAD
import { db } from '@xalatechnologies/platform-data';
```

### 4. Use Contracts for Shared Types

```typescript
// ✅ GOOD
import { UserDTO } from '@xalatechnologies/platform-contracts/dtos';

// ❌ BAD
import { User } from '@xalatechnologies/platform-data/schema';
```

### 5. Test Boundaries

```typescript
// Test that imports are correct
import { describe, it, expect } from 'vitest';

describe('Boundary compliance', () => {
  it('should not import data packages', () => {
    const fileContent = fs.readFileSync(__filename, 'utf-8');
    expect(fileContent).not.toContain('@xalatechnologies/platform-data');
  });
});
```

## Success Metrics

### Quantitative
- Violations: 150 → 0 (100% reduction)
- Schema imports outside mappers: 0
- Circular dependencies: 0
- Test coverage: Maintained at 95%+
- Build time: No significant increase
- CI time: < 10 min

### Qualitative
- Team understands boundaries
- New code follows patterns
- Onboarding improved
- Architecture clearer
- Maintenance easier

## Next Steps

After completing migration:

1. **Document Patterns** - Create pattern library
2. **Train Team** - Conduct workshops
3. **Monitor Continuously** - Weekly scans
4. **Evolve Architecture** - Refine as needed
5. **Share Learnings** - Document lessons learned

## Support

- **Documentation:** `docs/02-architecture/DECOUPLING_ENFORCEMENT.md`
- **Tools README:** `tools/decoupling/README.md`
- **Reports:** `reports/decoupling/`
- **CI Logs:** GitHub Actions artifacts

## Changelog

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| 2026-01-05 | Phase 0 | ✅ Complete | Tools and baseline established |
| TBD | Phase 1 | ⏳ Pending | Guardrails to be enabled |
| TBD | Phase 2 | ⏳ Pending | Migration to be executed |
| TBD | Phase 3 | ⏳ Pending | Enforcement to be activated |
