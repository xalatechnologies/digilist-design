# SaaS Licensing System - Quick Start Guide

**Last Updated:** January 5, 2026

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Generate RSA Keys

```bash
# Generate private key
openssl genrsa -out private.pem 2048

# Generate public key
openssl rsa -in private.pem -pubout -out public.pem

# View keys
cat private.pem
cat public.pem
```

### Step 2: Configure Environment

```bash
# Copy example configuration
cp .env.licensing.example .env.local

# Edit .env.local and add your keys
nano .env.local
```

**Required variables:**
```bash
LICENSE_ISSUER=xala-license-service
LICENSE_AUDIENCE=digilist-api
LICENSE_KEY_ID=key-2024-01
LICENSE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
LICENSE_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
```

### Step 3: Run Database Migration

```bash
# Generate migration
pnpm db:generate

# Push to database
pnpm db:push
```

### Step 4: Integrate into API

```typescript
// apps/api/src/index.ts
import { createLicenseMiddleware, registerLicenseRoutes } from '@xalatechnologies/licensing';
import { LicenseTokenRepository, SubscriptionRepository, UsageRepository, EntitlementRepository } from '@xalatechnologies/licensing';

// Initialize repositories
const db = /* your drizzle db instance */;
const tokenRepo = new LicenseTokenRepository(db);
const subscriptionRepo = new SubscriptionRepository(db);
const usageRepo = new UsageRepository(db);
const entitlementRepo = new EntitlementRepository(db);

// Configure licensing
const licenseConfig = {
  issuer: process.env.LICENSE_ISSUER!,
  audience: process.env.LICENSE_AUDIENCE!.split(','),
  privateKey: process.env.LICENSE_PRIVATE_KEY!,
  publicKeys: [process.env.LICENSE_PUBLIC_KEY!],
  keyId: process.env.LICENSE_KEY_ID!,
  hostedTtlSeconds: parseInt(process.env.LICENSE_HOSTED_TTL_SECONDS ?? '3600'),
  selfHostedTtlSeconds: parseInt(process.env.LICENSE_SELF_HOSTED_TTL_SECONDS ?? '31536000'),
  deploymentMode: process.env.DEPLOYMENT_MODE as 'hosted' | 'self_hosted',
  enableRevocationCheck: process.env.LICENSE_ENABLE_REVOCATION_CHECK === 'true',
  enableSubscriptionCheck: process.env.LICENSE_ENABLE_SUBSCRIPTION_CHECK === 'true',
  cachePublicKeys: process.env.LICENSE_CACHE_PUBLIC_KEYS === 'true',
  cacheTtlSeconds: parseInt(process.env.LICENSE_CACHE_TTL_SECONDS ?? '300'),
};

// Add middleware (optional - for protected routes)
const licenseMiddleware = createLicenseMiddleware(
  licenseConfig,
  tokenRepo,
  subscriptionRepo
);

// Apply to specific routes or globally
app.addHook('onRequest', async (request, reply) => {
  // Skip license check for public routes
  if (request.url.startsWith('/public') || request.url.startsWith('/health')) {
    return;
  }
  await licenseMiddleware(request, reply);
});

// Register license management routes
await registerLicenseRoutes(app, licenseConfig, {
  tokenRepository: tokenRepo,
  entitlementRepository: entitlementRepo,
  subscriptionRepository: subscriptionRepo,
  usageRepository: usageRepo,
});
```

### Step 5: Test the System

```bash
# Issue a license token
curl -X POST http://localhost:3000/platform/license/issue \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "tenant-uuid",
    "deploymentMode": "hosted"
  }'

# Get license summary
curl http://localhost:3000/me/license \
  -H "Authorization: Bearer <token>"
```

---

## 📋 Complete Integration Example

### API Server Setup

```typescript
// apps/api/src/plugins/licensing.ts
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
  createLicenseMiddleware,
  registerLicenseRoutes,
  LicenseTokenRepository,
  SubscriptionRepository,
  UsageRepository,
  EntitlementRepository,
} from '@xalatechnologies/licensing';

export default fp(async function licensingPlugin(app: FastifyInstance) {
  // Get database instance
  const db = app.db;

  // Initialize repositories
  const repositories = {
    tokenRepository: new LicenseTokenRepository(db),
    subscriptionRepository: new SubscriptionRepository(db),
    usageRepository: new UsageRepository(db),
    entitlementRepository: new EntitlementRepository(db),
  };

  // Configure licensing
  const licenseConfig = {
    issuer: process.env.LICENSE_ISSUER!,
    audience: process.env.LICENSE_AUDIENCE!.split(','),
    privateKey: process.env.LICENSE_PRIVATE_KEY!,
    publicKeys: [
      process.env.LICENSE_PUBLIC_KEY!,
      process.env.LICENSE_PUBLIC_KEY_2,
      process.env.LICENSE_PUBLIC_KEY_3,
    ].filter(Boolean) as string[],
    keyId: process.env.LICENSE_KEY_ID!,
    hostedTtlSeconds: parseInt(process.env.LICENSE_HOSTED_TTL_SECONDS ?? '3600'),
    selfHostedTtlSeconds: parseInt(process.env.LICENSE_SELF_HOSTED_TTL_SECONDS ?? '31536000'),
    deploymentMode: (process.env.DEPLOYMENT_MODE ?? 'hosted') as 'hosted' | 'self_hosted',
    enableRevocationCheck: process.env.LICENSE_ENABLE_REVOCATION_CHECK !== 'false',
    enableSubscriptionCheck: process.env.LICENSE_ENABLE_SUBSCRIPTION_CHECK !== 'false',
    cachePublicKeys: process.env.LICENSE_CACHE_PUBLIC_KEYS !== 'false',
    cacheTtlSeconds: parseInt(process.env.LICENSE_CACHE_TTL_SECONDS ?? '300'),
  };

  // Create middleware
  const licenseMiddleware = createLicenseMiddleware(
    licenseConfig,
    repositories.tokenRepository,
    repositories.subscriptionRepository
  );

  // Register middleware for protected routes
  app.addHook('onRequest', async (request, reply) => {
    // Public routes - skip license check
    const publicRoutes = ['/health', '/public', '/auth/login', '/auth/callback'];
    if (publicRoutes.some(route => request.url.startsWith(route))) {
      return;
    }

    // Apply license verification
    await licenseMiddleware(request, reply);
  });

  // Register license management routes
  await registerLicenseRoutes(app, licenseConfig, repositories);

  // Decorate app with repositories for use in routes
  app.decorate('licensing', repositories);
});

declare module 'fastify' {
  interface FastifyInstance {
    licensing: {
      tokenRepository: LicenseTokenRepository;
      subscriptionRepository: SubscriptionRepository;
      usageRepository: UsageRepository;
      entitlementRepository: EntitlementRepository;
    };
  }
}
```

### Domain Service Integration

```typescript
// packages/domain/src/booking/use-cases/create-booking.ts
import { assertEntitled, assertWithinLimit } from '@xalatechnologies/licensing';
import type { LicenseContext } from '@xalatechnologies/licensing';

export class CreateBookingUseCase {
  async execute(
    input: CreateBookingInput,
    context: LicenseContext
  ): Promise<Booking> {
    // Check entitlement
    assertEntitled(context, 'digilist.booking');

    // Check usage limit
    await assertWithinLimit(context, 'monthlyBookings', 1);

    // Business logic
    const booking = await this.bookingRepository.create(input);

    // Record usage
    await this.usageRepository.incrementUsage(
      context.tenantId,
      'monthlyBookings',
      1
    );

    // Audit log
    await this.auditLogger.log({
      tenantId: context.tenantId,
      action: 'booking_created',
      resource: booking.id,
      result: 'success',
    });

    return booking;
  }
}
```

### Route-Level Guards

```typescript
// apps/api/src/routes/bookings.ts
import { requireEntitlement, requireFeatureFlag } from '@xalatechnologies/licensing';

// Require module entitlement
app.get('/bookings', {
  preHandler: requireEntitlement('digilist.booking')
}, async (request, reply) => {
  // request.license is available
  const bookings = await getBookings(request.license.tenantId);
  return reply.send(bookings);
});

// Require feature flag
app.get('/bookings/advanced', {
  preHandler: [
    requireEntitlement('digilist.booking'),
    requireFeatureFlag('booking.advancedFilters', true)
  ]
}, async (request, reply) => {
  // Advanced filtering logic
  return reply.send({ advanced: true });
});
```

---

## 🧪 Testing

### Unit Tests

```typescript
// packages/licensing/src/services/license-issuer.test.ts
import { describe, it, expect } from 'vitest';
import { LicenseIssuerService } from './license-issuer';

describe('LicenseIssuerService', () => {
  it('should issue valid token', async () => {
    const issuer = new LicenseIssuerService(config, mockRepo);
    
    const result = await issuer.issueToken({
      tenantId: 'test-tenant',
      subscriptionId: 'test-sub',
      planId: 'test-plan',
      entitlements: ['digilist.booking'],
      limits: { monthlyBookings: 100 },
      deployment: { mode: 'hosted' },
    });

    expect(result.token).toBeDefined();
    expect(result.expiresIn).toBe(3600);
  });
});
```

### Integration Tests

```typescript
// apps/api/src/__tests__/licensing.test.ts
import { describe, it, expect } from 'vitest';
import { createTestApp } from './helpers';

describe('Licensing Integration', () => {
  it('should protect routes with license middleware', async () => {
    const app = await createTestApp();

    // Without token
    const response1 = await app.inject({
      method: 'GET',
      url: '/bookings',
    });
    expect(response1.statusCode).toBe(401);

    // With valid token
    const token = await issueTestToken();
    const response2 = await app.inject({
      method: 'GET',
      url: '/bookings',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    expect(response2.statusCode).toBe(200);
  });
});
```

---

## 🔧 Troubleshooting

### Common Issues

**1. "Invalid signature" error**
- Check that `LICENSE_PUBLIC_KEY` matches the private key used to sign
- Verify key format (PEM with newlines as `\n`)
- Ensure no extra whitespace in keys

**2. "Module not entitled" error**
- Verify tenant has active subscription
- Check entitlements are issued for the module
- Review subscription plan includes the module

**3. "Limit exceeded" error**
- Check current usage with `GET /me/license`
- Verify limit configuration in plan
- Consider upgrading subscription tier

**4. Database migration fails**
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Verify user has CREATE TABLE permissions

---

## 📚 Additional Resources

- [Complete Architecture Documentation](./LICENSING_ARCHITECTURE.md)
- [Implementation Summary](./LICENSING_IMPLEMENTATION_SUMMARY.md)
- [API Reference](./API_REFERENCE.md)
- [Self-Hosted Deployment Guide](./SELF_HOSTED_GUIDE.md)

---

## ✅ Checklist

- [ ] Generate RSA key pair
- [ ] Configure environment variables
- [ ] Run database migration
- [ ] Integrate middleware into API
- [ ] Register license routes
- [ ] Test token issuance
- [ ] Test token verification
- [ ] Test entitlement enforcement
- [ ] Set up monitoring
- [ ] Configure audit logging

---

**Need Help?** Contact Xala Technologies support or refer to the complete documentation.
