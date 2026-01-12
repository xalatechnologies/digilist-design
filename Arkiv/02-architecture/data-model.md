# Data Model Architecture - Digilist Platform

**Generated:** 2025-01-04  
**Version:** 1.0  
**Status:** Active

---

## **1. Architecture Overview**

### **1.1 Hard Separation Design**

The Digilist platform implements a **hard schema separation** between PLATFORM and DIGILIST domains, even when using a single database. This separation ensures:

- **Clear Domain Boundaries** - Platform infrastructure vs Product business logic
- **Reusability** - Platform schema can support multiple SaaS products
- **Maintainability** - Each domain has its own evolution cycle
- **Security** - Platform-level isolation from product-specific data

### **1.2 Schema Organization**

```
packages/data/src/
├── platform/
│   └── schema.ts          # PLATFORM: SaaS foundation
├── products/
│   └── digilist/
│       └── schema.ts      # DIGILIST: Product domain
└── schema/                # Legacy consolidated (deprecated)
```

---

## **2. PLATFORM Schema (SaaS Foundation)**

### **2.1 Core Responsibilities**

The PLATFORM schema handles all multi-tenant SaaS infrastructure concerns:

| Domain | Tables | Purpose |
|--------|--------|---------|
| **Identity & Auth** | tenants, users, sessions, oauth_accounts | Multi-tenant authentication |
| **Tenancy** | organizations, memberships, tenant_settings | Organizational hierarchy |
| **RBAC** | roles, permissions, user_roles | Access control |
| **Licensing** | plans, subscriptions, entitlements, usage_limits | Feature gating & limits |
| **Compliance** | audit_logs, gdpr_consents, data_subject_requests | Legal compliance |
| **Integrations** | integration_configs, webhook_endpoints | Third-party connections |
| **System** | feature_flags, system_configs | Platform configuration |

### **2.2 Key Design Principles**

1. **Tenant Isolation** - All tenant-scoped tables have `tenant_id`
2. **Organization Scoping** - Org-scoped tables have `tenant_id + org_id`
3. **Audit Trail** - All state changes tracked with user context
4. **Generic Licensing** - Module keys and limits are product-agnostic
5. **Multi-Product Ready** - No Digilist-specific assumptions in platform tables

### **2.3 Entity Relationships**

```
tenants (1) → (n) organizations (1) → (n) users
    ↓              ↓                    ↓
subscriptions   memberships          roles
    ↓              ↓                    ↓
entitlements   permissions       user_roles
```

---

## **3. DIGILIST Schema (Product Domain)**

### **3.1 Core Responsibilities**

The DIGILIST schema contains all business logic specific to listing booking:

| Domain | Tables | Purpose |
|--------|--------|---------|
| **Listings** | listings, zones, listing_types | Physical locations |
| **Bookings** | bookings, recurring_bookings, booking_history | Reservation lifecycle |
| **Approvals** | booking_approvals, approval_workflows | Review processes |
| **Pricing** | pricing_rules, discount_codes, actor_pricing | Cost calculation |
| **Payments** | payments, invoices, refunds | Financial transactions |
| **Notifications** | notifications, notification_templates | User communications |
| **Rules** | booking_rules, availability_rules | Business validation |

### **3.2 Key Design Principles**

1. **Tenant-Scoped** - All tables reference `tenant_id`
2. **Organization-Scoped** - Listing management tables reference `org_id`
3. **Status-Driven** - All entities have explicit status enums
4. **Audit-Ready** - Change history tracked for critical entities
5. **Integration-Ready** - Foreign keys to platform entities only

### **3.3 Entity Relationships**

```
tenants → organizations → listings → zones
    ↓           ↓           ↓         ↓
bookings ← zones → pricing_rules → approvals
    ↓           ↓           ↓
payments → notifications → rules
```

---

## **4. Cross-Domain Relationships**

### **4.1 Foreign Key Strategy**

| DIGILIST Table | PLATFORM Reference | Purpose |
|----------------|-------------------|---------|
| listings.tenant_id | tenants.id | Tenant isolation |
| listings.org_id | organizations.id | Organization ownership |
| bookings.user_id | users.id | User association |
| bookings.created_by | users.id | Audit trail |
| payments.subscription_id | subscriptions.id | Licensing validation |

### **4.2 Data Flow Patterns**

1. **Authentication Flow**: PLATFORM users → DIGILIST bookings
2. **Authorization Flow**: PLATFORM roles → DIGILIST permissions
3. **Licensing Flow**: PLATFORM subscriptions → DIGILIST feature access
4. **Audit Flow**: DIGILIST actions → PLATFORM audit logs

---

## **5. Schema Compliance Matrix**

### **5.1 Requirements Traceability**

| Requirement | Schema Element | Location | Status |
|-------------|----------------|----------|---------|
| PLAT-001 (Multi-tenant) | tenants.tenant_id columns | PLATFORM | ✅ Implemented |
| PLAT-002 (RBAC) | roles, permissions, user_roles | PLATFORM | ✅ Implemented |
| PLAT-009 (Licensing) | plans, subscriptions, entitlements | PLATFORM | 🔄 In Progress |
| DIG-008 (Listings) | listings, zones | DIGILIST | ✅ Implemented |
| DIG-003 (Bookings) | bookings, booking_history | DIGILIST | ✅ Implemented |
| DIG-004 (Approvals) | booking_approvals | DIGILIST | 🔄 In Progress |

### **5.2 Missing Elements**

| Schema | Missing Tables | Requirements Impact |
|--------|----------------|-------------------|
| PLATFORM | plans, subscriptions, entitlements, usage_limits | PLAT-009 (Licensing) |
| DIGILIST | booking_approvals, pricing_groups, approval_workflows | DIG-004 (Approvals) |

---

## **6. Migration Strategy**

### **6.1 Phase 1: Schema Separation**
1. Create `packages/data/src/platform/schema.ts`
2. Create `packages/data/src/products/digilist/schema.ts`
3. Migrate existing tables to appropriate domains
4. Update imports across codebase

### **6.2 Phase 2: Missing Elements**
1. Add PLATFORM licensing tables
2. Add DIGILIST approval tables
3. Create foreign key relationships
4. Add constraints and indexes

### **6.3 Phase 3: Data Migration**
1. Create migration scripts
2. Preserve existing data
3. Update application code
4. Validate referential integrity

---

## **7. Validation Rules**

### **7.1 Platform Rules**
- All tenant-scoped tables MUST have `tenant_id`
- All org-scoped tables MUST have `tenant_id + org_id`
- Platform tables CANNOT reference DIGILIST tables
- Audit fields MUST be present on state-changing tables

### **7.2 Digilist Rules**
- All tables MUST have `tenant_id`
- Listing management tables MUST have `org_id`
- DIGILIST tables CAN reference PLATFORM tables
- No circular dependencies allowed

### **7.3 Cross-Domain Rules**
- Foreign keys must be单向 (one-directional)
- No Digilist-specific data in Platform tables
- Platform tables must be product-agnostic
- Clear separation of concerns maintained

---

## **8. Performance Considerations**

### **8.1 Indexing Strategy**
- Primary keys on all UUID columns
- Composite indexes on tenant-scoped queries
- Foreign key indexes on cross-domain relationships
- Functional indexes on status columns

### **8.2 Partitioning Strategy**
- Consider partitioning large tables by `tenant_id`
- Time-based partitioning for audit logs
- Geographic partitioning for municipality data

### **8.3 Query Optimization**
- Always filter by `tenant_id` first
- Use prepared statements for cross-domain queries
- Implement query result caching for reference data

---

## **9. Security Considerations**

### **9.1 Data Isolation**
- Row-Level Security (RLS) on tenant-scoped tables
- Application-level checks for org-scoped data
- Audit logging for all cross-tenant access attempts

### **9.2 Access Control**
- Platform roles for schema management
- Product roles for business operations
- API guards enforce schema boundaries

### **9.3 Compliance**
- GDPR compliance in PLATFORM schema
- Business compliance in DIGILIST schema
- Audit trails for all data modifications

---

## **10. Future Extensibility**

### **10.1 Multi-Product Support**
- Platform schema ready for additional products
- Clear extension points for new domains
- Shared infrastructure maintained

### **10.2 Schema Evolution**
- Version-controlled schema changes
- Backward compatibility considerations
- Migration tooling and processes

### **10.3 Integration Patterns**
- Standardized integration interfaces
- Webhook architectures for cross-system sync
- API versioning strategy

---

*This architecture ensures clear separation of concerns while maintaining the flexibility needed for a multi-product SaaS platform.*
