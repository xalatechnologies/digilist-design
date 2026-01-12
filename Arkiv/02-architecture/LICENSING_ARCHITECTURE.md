# SaaS Licensing Architecture

**Status:** Implementation In Progress  
**Date:** January 5, 2026  
**Version:** 1.0

---

## Overview

Comprehensive SaaS licensing and subscription management system supporting:
- **Multi-tenant hosted** (primary SaaS deployment)
- **Single-tenant self-hosted** (municipalities running their own stack)
- JWT-based license tokens for fast authorization
- Entitlement isolation and auditing
- Feature flags and usage limits
- Subscription lifecycle management

---

## Core Concepts

### 1. Tenant Subscription State (Source of Truth)

Platform schema stores:
- **Tenants** - Organization/municipality accounts
- **Subscriptions** - Active subscription linking tenant to plan
- **Plans** - Subscription tiers (Free, Standard, Professional, Enterprise)
- **Entitlements** - Issued rights per tenant-module
- **Usage Limits** - Metered usage tracking
- **Feature Flags** - Tenant-specific feature toggles
- **License Tokens** - Issued JWT metadata, rotation, revocation

### 2. License Token (Portable Proof)

Signed JWT representing:
- Tenant identity
- Subscription/entitlements snapshot
- Usage limits
- Validity window
- Issuer + key ID
- Optional deployment binding (self-hosted)

**Purpose:** Fast verification without DB lookup on every request

---

## Token Structure

### JWT Claims

```typescript
{
  // Standard JWT claims
  iss: 'xala-license-service',        // Issuer
  aud: 'digilist-api',                 // Audience
  sub: 'tenant-uuid',                  // Tenant ID
  jti: 'token-uuid',                   // Unique token ID
  iat: 1704441600,                     // Issued at
  nbf: 1704441600,                     // Not before
  exp: 1704445200,                     // Expiration
  
  // License claims
  planId: 'plan-uuid',
  subscriptionId: 'subscription-uuid',
  entitlements: [
    'digilist.booking',
    'digilist.approvals',
    'monitoring.dashboard'
  ],
  limits: {
    monthlyBookings: 100,
    seats: 10,
    storage: 1000
  },
  flags: {
    'monitoring.scanArtifacts': true,
    'booking.advancedFilters': false
  },
  
  // Deployment
  deployment: {
    mode: 'hosted',                    // or 'self_hosted'
    instanceId: 'instance-uuid',       // Self-hosted only
    domain: 'municipality.example.com' // Self-hosted only
  },
  
  // Key rotation
  kid: 'key-2024-01',                  // Key ID
  keyVersion: '1'
}
```

### Token TTL Strategy

| Deployment Mode | Default TTL | Rationale |
|----------------|-------------|-----------|
| **Hosted** | 1-24 hours | Short-lived, frequent refresh, DB checks available |
| **Self-hosted** | 30-365 days | Long-lived, offline verification, renewal process |

---

## Process Flows

### A) Hosted Multi-Tenant SaaS Flow

```
1. Tenant purchases plan
   ↓
2. Subscription created (status: active)
   ↓
3. Entitlements computed (plan + add-ons + overrides)
   ↓
4. License token issued by License Issuer Service
   ↓
5. Token metadata stored (jti, tenantId, expiresAt, kid)
   ↓
6. API middleware verifies token on each request
   - Signature check
   - Expiry check
   - Revocation check (DB lookup)
   - Subscription status check (DB lookup)
   ↓
7. License context attached to request
   req.license = { tenantId, entitlements, limits, flags }
   ↓
8. Domain services enforce entitlements
   - requireEntitlement('digilist.booking')
   - requireFeatureFlag('monitoring.dashboard')
   - checkLimit('monthlyBookings', 1)
   ↓
9. Token refresh/rotation (before expiry)
```

### B) Single-Tenant Self-Hosted Flow

```
1. Tenant receives license file from Xala
   /etc/digilist/license.jwt
   ↓
2. License loaded at startup
   LICENSE_TOKEN=eyJhbGc...
   ↓
3. API verifies locally using public keys
   - Signature check (offline)
   - Expiry check (offline)
   - No DB checks (offline mode)
   ↓
4. Entitlements derived from token claims
   ↓
5. If license expires → degraded mode
   - Read-only access
   - Admin-only access
   - Clear error messaging
   ↓
6. License renewal process
   - Contact Xala support
   - Receive new license file
   - Upload/replace license
```

---

## Database Schema

### Plans Table

```sql
CREATE TABLE plans (
  id UUID PRIMARY KEY,
  plan_key TEXT UNIQUE NOT NULL,
  tier plan_tier NOT NULL,
  name TEXT NOT NULL,
  price_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'NOK',
  billing_interval TEXT DEFAULT 'monthly',
  included_modules JSONB DEFAULT '[]',
  default_limits JSONB DEFAULT '{}',
  metadata JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Subscriptions Table

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  plan_id UUID NOT NULL REFERENCES plans(id),
  status subscription_status DEFAULT 'pending',
  billing_provider TEXT,
  billing_provider_subscription_id TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Entitlements Table

```sql
CREATE TABLE entitlements (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  feature_id UUID NOT NULL REFERENCES features(id),
  module_key TEXT NOT NULL,
  status entitlement_status DEFAULT 'active',
  limits JSONB DEFAULT '{}',
  valid_from TIMESTAMPTZ NOT NULL,
  valid_to TIMESTAMPTZ,
  source TEXT DEFAULT 'subscription',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, module_key) WHERE status = 'active'
);
```

### Feature Flags Table

```sql
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  flag_key TEXT NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  environment TEXT DEFAULT 'production',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE(tenant_id, flag_key, environment)
);
```

### License Tokens Table

```sql
CREATE TABLE license_tokens (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  subscription_id UUID REFERENCES subscriptions(id),
  jti TEXT UNIQUE NOT NULL,
  kid TEXT NOT NULL,
  deployment_mode deployment_mode DEFAULT 'hosted',
  instance_id TEXT,
  bound_domain TEXT,
  status license_token_status DEFAULT 'active',
  issued_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  not_before TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  revoked_by UUID,
  revocation_reason TEXT,
  entitlements_snapshot JSONB,
  limits_snapshot JSONB,
  flags_snapshot JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### License Audit Log Table

```sql
CREATE TABLE license_audit_log (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  token_id UUID REFERENCES license_tokens(id),
  action license_audit_action NOT NULL,
  resource TEXT,
  result TEXT NOT NULL,
  user_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  details JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Token Verification

### Two-Layer Verification

#### Layer 1: Cryptographic Verification (Always)
- Validate signature using issuer public keys
- Validate expiry (exp claim)
- Validate not-before (nbf claim)
- Validate audience (aud claim)

#### Layer 2: Policy Verification (Hosted Only)
- Check jti not revoked (DB lookup or cache)
- Check subscription status active (DB lookup or cache)
- Check tenant not suspended

**Self-hosted:** Layer 1 only (offline verification)  
**Hosted:** Both layers (full verification)

---

## Entitlements vs Feature Flags

### Entitlements
**Purpose:** Control access to modules/features  
**Example:** `digilist.booking`, `digilist.approvals`, `monitoring.dashboard`  
**Check:** `isEntitled(context, 'digilist.booking')`  
**Enforcement:** Binary (allowed/denied)

### Feature Flags
**Purpose:** Control feature behavior (on/off/variant)  
**Example:** `monitoring.scanArtifacts=true`, `booking.advancedFilters=false`  
**Check:** `getFlag(context, 'monitoring.scanArtifacts', false)`  
**Enforcement:** Value-based (boolean/string/number)

### Example Usage

```typescript
// Entitlement check
if (isEntitled(context, 'digilist.booking')) {
  // User can access booking module
}

// Feature flag check
const scanEnabled = getFlag(context, 'monitoring.scanArtifacts', false);
if (scanEnabled) {
  // Run artifact scanning
}

// Limit check
await assertWithinLimit(context, 'monthlyBookings', 1);
// Proceed with booking creation
```

---

## Enforcement Points

### 1. API Middleware

```typescript
// Fastify middleware
app.addHook('onRequest', async (request, reply) => {
  const token = extractToken(request);
  const result = await licenseVerifier.verifyToken(token);
  
  if (!result.valid) {
    throw new UnauthorizedError(result.error.message);
  }
  
  request.license = result.context;
});

// Route-level guard
app.get('/bookings', {
  preHandler: requireEntitlement('digilist.booking')
}, async (request, reply) => {
  // Handler code
});
```

### 2. Domain Services

```typescript
export class CreateBookingUseCase {
  async execute(input: CreateBookingInput, context: LicenseContext) {
    // Check entitlement
    assertEntitled(context, 'digilist.booking');
    
    // Check limit
    await assertWithinLimit(context, 'monthlyBookings', 1);
    
    // Proceed with business logic
    const booking = await this.bookingRepository.create(input);
    
    // Record usage
    await this.usageRepository.incrementUsage(
      context.tenantId,
      'monthlyBookings',
      1
    );
    
    return booking;
  }
}
```

### 3. Frontend (UX Only, Not Security)

```typescript
// Hide/show navigation based on entitlements
const { license } = useLicense();

{license.entitlements.has('digilist.booking') && (
  <NavLink to="/bookings">Bookings</NavLink>
)}

// Feature flag for UI behavior
const advancedFilters = license.flags['booking.advancedFilters'];
{advancedFilters && <AdvancedFilterPanel />}
```

---

## Token Distribution

### Hosted SaaS
- Token issued at login/session creation
- Delivered via:
  - HTTP-only session cookie + license context endpoint
  - Embedded in session JWT
  - `/me/license` endpoint (server returns short-lived token)

### Self-Hosted
- Delivered as license file or environment variable
- Rotated by tenant admin uploading new token
- Format: `/etc/digilist/license.jwt` or `LICENSE_TOKEN=...`

---

## API Keys & Machine-to-Machine

For service-to-service communication:

1. Issue API key tied to tenant + scope
2. API key lookup returns license context (cached)
3. Same entitlement enforcement applies
4. Audit all API key usage

---

## Key Rotation

### Strategy
1. Multiple active public keys supported (kid-based)
2. New tokens issued with new kid
3. Old keys remain valid until all tokens expire
4. Gradual rollover (no downtime)

### Process
```
1. Generate new key pair (kid: 'key-2024-02')
2. Add new public key to config
3. Start issuing tokens with new kid
4. Monitor token usage by kid
5. Remove old public key after grace period
```

---

## Revocation

### Hosted SaaS
- Immediate revocation via DB update
- Middleware checks revocation status
- Audit log entry created

### Self-Hosted
- Revocation via expiry (no DB access)
- Short-lived tokens recommended if revocation needed
- Emergency: contact tenant to remove license file

---

## Implementation Checklist

### ✅ Completed
- [x] Database schema (plans, subscriptions, entitlements, feature_flags, license_tokens, audit_log)
- [x] License token types (TypeScript interfaces)
- [x] License issuer service (JWT signing, metadata tracking)
- [x] License verifier service (cryptographic + policy verification)
- [x] Entitlement enforcer service (domain-level enforcement)

### 🚧 In Progress
- [ ] API middleware (Fastify hooks)
- [ ] License management endpoints (`/platform/license/*`, `/me/license`)
- [ ] Self-hosted license file support
- [ ] Usage tracking repository
- [ ] Subscription lifecycle handlers

### 📋 Pending
- [ ] Key rotation tooling
- [ ] License renewal workflows
- [ ] Admin dashboard for license management
- [ ] Monitoring and alerting
- [ ] Migration scripts
- [ ] Integration tests
- [ ] Documentation for self-hosted customers

---

## Security Considerations

### Token Security
- **RS256 algorithm** (asymmetric, secure)
- **Short TTL for hosted** (1-24 hours)
- **Signature verification** (all tokens)
- **Audience validation** (prevent token reuse)
- **Key rotation** (regular schedule)

### Data Protection
- **Entitlements snapshot** (audit trail)
- **Revocation tracking** (compliance)
- **Audit logging** (all enforcement decisions)
- **IP address logging** (security monitoring)

### Self-Hosted Binding
- **Instance ID** (prevent license sharing)
- **Domain binding** (optional, restrict to specific domain)
- **Expiry enforcement** (time-limited licenses)

---

## Monitoring & Observability

### Metrics to Track
- Token issuance rate
- Token verification failures
- Entitlement denial rate
- Limit exceeded events
- Subscription status changes
- Key rotation events

### Alerts
- High token verification failure rate
- Revoked token usage attempts
- License expiry approaching (self-hosted)
- Unusual entitlement patterns
- Limit exceeded threshold

### Audit Requirements
- All token issuance/revocation
- All entitlement checks (denied only)
- All limit exceeded events
- All subscription changes
- All admin actions

---

## Integration with RBAC

Licensing complements RBAC:

| System | Purpose | Example |
|--------|---------|---------|
| **Licensing** | Module/feature access | Can tenant access booking module? |
| **RBAC** | User permissions within module | Can user approve bookings? |

**Combined Check:**
```typescript
// 1. Check license entitlement (tenant-level)
assertEntitled(context, 'digilist.booking');

// 2. Check RBAC permission (user-level)
assertPermission(user, 'booking:approve');

// Both must pass
```

---

## Migration Path

### Phase 1: Schema & Core Services ✅
- Deploy licensing schema
- Implement token issuer/verifier
- Create entitlement enforcer

### Phase 2: API Integration 🚧
- Add middleware
- Create endpoints
- Integrate with existing auth

### Phase 3: Domain Integration
- Update use cases
- Add enforcement checks
- Implement usage tracking

### Phase 4: Self-Hosted Support
- License file format
- Offline verification
- Renewal workflows

### Phase 5: Admin Tools
- License management UI
- Monitoring dashboard
- Reporting tools

---

## Example Configurations

### Hosted SaaS Config

```typescript
const licenseConfig: LicenseConfig = {
  issuer: 'xala-license-service',
  audience: ['digilist-api', 'digilist-frontend'],
  privateKey: process.env.LICENSE_PRIVATE_KEY,
  publicKeys: [
    process.env.LICENSE_PUBLIC_KEY_1,
    process.env.LICENSE_PUBLIC_KEY_2,
  ],
  keyId: 'key-2024-01',
  hostedTtlSeconds: 3600, // 1 hour
  selfHostedTtlSeconds: 31536000, // 365 days
  deploymentMode: 'hosted',
  enableRevocationCheck: true,
  enableSubscriptionCheck: true,
  cachePublicKeys: true,
  cacheTtlSeconds: 300,
};
```

### Self-Hosted Config

```typescript
const licenseConfig: LicenseConfig = {
  issuer: 'xala-license-service',
  audience: 'digilist-api',
  publicKeys: [
    // Embedded public keys for offline verification
    '-----BEGIN PUBLIC KEY-----\n...',
  ],
  keyId: 'key-2024-01',
  hostedTtlSeconds: 3600,
  selfHostedTtlSeconds: 31536000,
  deploymentMode: 'self_hosted',
  instanceId: process.env.INSTANCE_ID,
  enableRevocationCheck: false, // No DB access
  enableSubscriptionCheck: false, // No DB access
  cachePublicKeys: false,
  cacheTtlSeconds: 0,
};
```

---

## Support & Troubleshooting

### Common Issues

**Token expired**
- Hosted: Automatic refresh via middleware
- Self-hosted: Contact support for renewal

**Entitlement denied**
- Check subscription status
- Verify plan includes module
- Check for manual overrides

**Limit exceeded**
- Review usage counters
- Upgrade plan
- Request limit increase

**Invalid signature**
- Check public key configuration
- Verify key rotation completed
- Check token not tampered

---

## References

- [JWT RFC 7519](https://tools.ietf.org/html/rfc7519)
- [PASETO Specification](https://paseto.io/)
- [Subscription Management Best Practices](#)
- [Multi-Tenancy Architecture](#)

---

**Document Version:** 1.0  
**Last Updated:** January 5, 2026  
**Status:** Living Document
