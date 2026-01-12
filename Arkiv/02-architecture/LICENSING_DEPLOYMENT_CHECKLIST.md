# SaaS Licensing System - Deployment Checklist

**Status:** Ready for Deployment  
**Date:** January 5, 2026

---

## ✅ What's Complete

### 1. Database Schema
- ✅ Migration generated: `drizzle/0000_white_gateway.sql`
- ✅ 7 new tables: `feature_flags`, `license_tokens`, `license_audit_log`, `features`, `entitlements`, `subscriptions`, `usage_counters`
- ✅ All enums defined
- ✅ Indexes and foreign keys configured

### 2. Core Implementation
- ✅ Type system (225 lines)
- ✅ License issuer service (270 lines)
- ✅ License verifier service (211 lines)
- ✅ Entitlement enforcer service (217 lines)
- ✅ 4 repository implementations (422 lines)
- ✅ API middleware (126 lines)
- ✅ API endpoints (203 lines)
- ✅ Self-hosted utilities (88 lines)

### 3. Documentation
- ✅ Architecture documentation (687 lines)
- ✅ Implementation summary (571 lines)
- ✅ Quick start guide (complete)
- ✅ Environment configuration template
- ✅ This deployment checklist

---

## 📋 Pre-Deployment Checklist

### Database Setup

- [ ] **Start PostgreSQL database**
  ```bash
  # Check if running
  pg_isready
  
  # Start if needed (macOS)
  brew services start postgresql@14
  
  # Or Docker
  docker-compose up -d postgres
  ```

- [ ] **Create platform schema**
  ```bash
  psql $DATABASE_URL -c "CREATE SCHEMA IF NOT EXISTS platform;"
  ```

- [ ] **Run migration**
  ```bash
  pnpm db:push
  ```

### Cryptographic Keys

- [ ] **Generate RSA key pair**
  ```bash
  openssl genrsa -out private.pem 2048
  openssl rsa -in private.pem -pubout -out public.pem
  ```

- [ ] **Store keys securely**
  - Add to `.env.local` (development)
  - Add to secrets manager (production)
  - Never commit to git

### Environment Configuration

- [ ] **Copy configuration template**
  ```bash
  cp .env.licensing.example .env.local
  ```

- [ ] **Set required variables**
  ```bash
  LICENSE_ISSUER=xala-license-service
  LICENSE_AUDIENCE=digilist-api,digilist-frontend
  LICENSE_KEY_ID=key-2024-01
  LICENSE_PRIVATE_KEY="<your-private-key>"
  LICENSE_PUBLIC_KEY="<your-public-key>"
  ```

- [ ] **Configure deployment mode**
  ```bash
  DEPLOYMENT_MODE=hosted  # or 'self_hosted'
  ```

### API Integration

- [ ] **Add licensing plugin to API**
  - Create `apps/api/src/plugins/licensing.ts`
  - Register in main server file
  - Configure middleware for protected routes

- [ ] **Test endpoints**
  ```bash
  # Health check
  curl http://localhost:3000/health
  
  # Issue token (requires auth)
  curl -X POST http://localhost:3000/platform/license/issue \
    -H "Content-Type: application/json" \
    -d '{"tenantId":"test-tenant","deploymentMode":"hosted"}'
  ```

### Testing

- [ ] **Unit tests**
  ```bash
  pnpm test packages/licensing
  ```

- [ ] **Integration tests**
  ```bash
  pnpm test:integration apps/api
  ```

- [ ] **End-to-end verification**
  - Issue token
  - Verify token
  - Check entitlements
  - Test usage limits
  - Review audit logs

---

## 🚀 Deployment Steps

### Development Environment

```bash
# 1. Start database
brew services start postgresql@14

# 2. Create schema
psql $DATABASE_URL -c "CREATE SCHEMA IF NOT EXISTS platform;"

# 3. Run migration
pnpm db:generate
pnpm db:push

# 4. Generate keys
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# 5. Configure environment
cp .env.licensing.example .env.local
# Edit .env.local with your keys

# 6. Start API
pnpm dev:api

# 7. Test
curl http://localhost:3000/health
```

### Production Environment

```bash
# 1. Set environment variables in secrets manager
# - LICENSE_PRIVATE_KEY
# - LICENSE_PUBLIC_KEY
# - LICENSE_ISSUER
# - LICENSE_AUDIENCE
# - LICENSE_KEY_ID

# 2. Run migration
pnpm db:generate
pnpm db:push --force  # Only if you're sure

# 3. Deploy application
pnpm build
pnpm start

# 4. Verify deployment
curl https://api.yourdomain.com/health
curl https://api.yourdomain.com/me/license \
  -H "Authorization: Bearer <token>"
```

---

## 🔐 Security Checklist

- [ ] Private keys stored in secrets manager (not in code)
- [ ] Public keys can be in code/config (they're public)
- [ ] Environment variables validated at startup
- [ ] HTTPS enabled for all API endpoints
- [ ] Token TTL appropriate for deployment mode
- [ ] Revocation checking enabled for hosted
- [ ] Audit logging enabled
- [ ] Database backups configured
- [ ] Monitoring alerts configured

---

## 📊 Monitoring Setup

### Metrics to Track

```typescript
// Add to your monitoring system
{
  "licensing.tokens.issued": "counter",
  "licensing.tokens.verified": "counter",
  "licensing.tokens.revoked": "counter",
  "licensing.verification.failures": "counter",
  "licensing.entitlement.denials": "counter",
  "licensing.limit.exceeded": "counter",
  "licensing.tokens.expiring_soon": "gauge"
}
```

### Alerts to Configure

- Token verification failure rate > 5%
- License expiring in < 7 days (self-hosted)
- Unusual entitlement denial patterns
- Database connection failures
- Audit log write failures

---

## 🧪 Verification Commands

```bash
# Check database schema
psql $DATABASE_URL -c "\dt platform.*"

# Verify tables exist
psql $DATABASE_URL -c "SELECT COUNT(*) FROM platform.license_tokens;"

# Check API health
curl http://localhost:3000/health

# Issue test token
curl -X POST http://localhost:3000/platform/license/issue \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "tenantId": "test-tenant-id",
    "deploymentMode": "hosted"
  }'

# Verify token
curl http://localhost:3000/me/license \
  -H "Authorization: Bearer <issued-token>"

# Check audit log
curl http://localhost:3000/platform/license/audit/test-tenant-id \
  -H "Authorization: Bearer <admin-token>"
```

---

## 📝 Post-Deployment Tasks

### Immediate (Day 1)

- [ ] Verify all endpoints responding
- [ ] Check audit logs are being written
- [ ] Monitor error rates
- [ ] Test token issuance for real tenant
- [ ] Verify entitlement enforcement

### Week 1

- [ ] Review audit logs for anomalies
- [ ] Check token expiry patterns
- [ ] Monitor usage limit tracking
- [ ] Verify revocation working
- [ ] Test key rotation procedure

### Month 1

- [ ] Review security posture
- [ ] Analyze usage patterns
- [ ] Optimize cache settings
- [ ] Plan key rotation schedule
- [ ] Document lessons learned

---

## 🔄 Key Rotation Procedure

```bash
# 1. Generate new key pair
openssl genrsa -out private-new.pem 2048
openssl rsa -in private-new.pem -pubout -out public-new.pem

# 2. Add new public key to config (keep old one)
LICENSE_PUBLIC_KEY="<old-key>"
LICENSE_PUBLIC_KEY_2="<new-key>"

# 3. Deploy config update

# 4. Update key ID and private key
LICENSE_KEY_ID=key-2024-02
LICENSE_PRIVATE_KEY="<new-private-key>"

# 5. Deploy application

# 6. Monitor for 24-48 hours

# 7. Remove old public key after grace period
```

---

## 🆘 Rollback Procedure

If issues occur:

```bash
# 1. Revert application deployment
git revert <commit-hash>
pnpm build && pnpm start

# 2. If database issues, restore from backup
pg_restore -d $DATABASE_URL backup.sql

# 3. Verify system health
curl http://localhost:3000/health

# 4. Check audit logs for impact
psql $DATABASE_URL -c "
  SELECT action, result, COUNT(*) 
  FROM platform.license_audit_log 
  WHERE timestamp > NOW() - INTERVAL '1 hour'
  GROUP BY action, result;
"
```

---

## 📞 Support Contacts

- **Technical Issues:** Xala Technologies Support
- **Security Concerns:** security@xala.no
- **Documentation:** See `/docs/02-architecture/`

---

## ✅ Final Checklist

Before marking deployment complete:

- [ ] All database tables created
- [ ] Keys generated and stored securely
- [ ] Environment configured
- [ ] API endpoints responding
- [ ] Token issuance working
- [ ] Token verification working
- [ ] Entitlement enforcement working
- [ ] Usage tracking working
- [ ] Audit logging working
- [ ] Monitoring configured
- [ ] Alerts configured
- [ ] Documentation reviewed
- [ ] Team trained
- [ ] Rollback plan tested

---

**Deployment Status:** Ready  
**Next Step:** Start PostgreSQL and run `pnpm db:push`  
**Estimated Time:** 15-30 minutes for complete setup
