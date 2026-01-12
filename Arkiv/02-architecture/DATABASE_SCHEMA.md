# Database Schema Documentation

**Version:** 2.0.0  
**Last Updated:** 2026-01-04  
**Database:** PostgreSQL 14+  
**ORM:** Drizzle ORM

## Overview

The Digilist platform uses a multi-layered database architecture:

- **Platform Layer**: Multi-tenant SaaS core (identity, RBAC, licensing)
- **Product Layer**: Digilist booking domain with canonical Listing model
- **Shared Infrastructure**: Observability, integrations, compliance

All tables include tenant isolation via `tenant_id` for data security and multi-tenancy.

---

## Table of Contents

1. [Platform Layer](#platform-layer)
   - [Identity & Authentication](#identity--authentication)
   - [RBAC (Role-Based Access Control)](#rbac-role-based-access-control)
   - [Licensing & Subscriptions](#licensing--subscriptions)
2. [Product Layer (Digilist)](#product-layer-digilist)
   - [Listings & Bookable Resources](#listings--bookable-resources)
   - [Availability & Pricing](#availability--pricing)
   - [Bookings](#bookings)
   - [Payments & Invoicing](#payments--invoicing)
3. [Database Features](#database-features)
4. [Indexes & Performance](#indexes--performance)

---

## Platform Layer

### Identity & Authentication

#### `tenants`
Top-level SaaS customers (municipalities).

**Columns:**
- `id` (uuid, PK) - Unique tenant identifier
- `name` (text) - Tenant name (e.g., "Oslo Kommune")
- `slug` (text, unique) - URL-safe identifier
- `status` (enum) - active | suspended | pending | archived
- `domain` (text) - Custom domain (e.g., "oslo.digilist.no")
- `logo_url` (text) - Tenant logo
- `settings` (jsonb) - Tenant configuration
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Settings Schema:**
```typescript
{
  theme?: { primaryColor, secondaryColor, logoUrl, faviconUrl },
  features?: string[],
  locale?: string,
  timezone?: string,
  currency?: string,
  defaultBookingRules?: { minDuration, maxDuration, advanceBookingDays, cancellationHours },
  integrations?: { idporten, vipps, bankid },
  contact?: { email, phone, address }
}
```

**Indexes:**
- `tenants_slug_unique` (unique)
- `tenants_status_idx`

---

#### `users`
Core user accounts with authentication data.

**Columns:**
- `id` (uuid, PK) - User identifier (matches auth.users.id)
- `email` (text, unique) - User email
- `phone` (text) - Phone number
- `name` (text) - Full name
- `avatar_url` (text) - Profile picture
- `platform_role` (text) - platform_admin | platform_support | null
- `status` (enum) - active | inactive | suspended | pending_verification
- `email_verified` (boolean)
- `phone_verified` (boolean)
- `last_login_at` (timestamptz)
- `deleted_at` (timestamptz) - GDPR soft delete
- `anonymized_at` (timestamptz) - GDPR anonymization
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `users_email_unique` (unique)
- `users_status_idx`
- `users_phone_idx`

---

#### `profiles`
Extended user profile data (user-controlled preferences).

**Columns:**
- `user_id` (uuid, PK, FK → users.id)
- `display_name` (text)
- `language` (text) - nb | nn | en (default: nb)
- `timezone` (text) - Default: Europe/Oslo
- `avatar_url` (text)
- `preferences` (jsonb) - User preferences
- `default_tenant_id` (uuid, FK → tenants.id)
- `default_org_id` (uuid, FK → organizations.id)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Preferences Schema:**
```typescript
{
  notifications?: { email, sms, push },
  accessibility?: { highContrast, reduceMotion, fontSize },
  calendar?: { defaultView, weekStartsOn }
}
```

---

#### `sessions`
Session management (Lucia Auth or custom).

**Columns:**
- `id` (text, PK) - Session identifier
- `user_id` (uuid, FK → users.id)
- `expires_at` (timestamptz)
- `created_at` (timestamptz)

**Indexes:**
- `sessions_user_id_idx`
- `sessions_expires_at_idx`

---

#### `oauth_accounts`
OAuth provider credentials (ID-porten, Vipps Login, BankID).

**Columns:**
- `id` (uuid, PK)
- `user_id` (uuid, FK → users.id)
- `provider` (text) - idporten | vipps | github | bankid
- `provider_account_id` (text) - External provider ID
- `access_token_encrypted` (text)
- `refresh_token_encrypted` (text)
- `token_expires_at` (timestamptz)
- `scopes` (text) - Comma-separated
- `metadata` (jsonb) - Provider-specific data
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `oauth_accounts_provider_account_unique` (unique on provider + provider_account_id)
- `oauth_accounts_user_id_idx`

---

#### `oauth_states`
Short-lived CSRF state tokens for OAuth flows.

**Columns:**
- `state` (text, PK)
- `code_verifier` (text) - PKCE code verifier
- `redirect_uri` (text)
- `provider` (text)
- `expires_at` (timestamptz)
- `created_at` (timestamptz)

---

### RBAC (Role-Based Access Control)

#### `organizations`
Operational units under tenants (departments, clubs, schools).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `name` (text) - Organization name
- `slug` (text) - URL-safe identifier
- `org_number` (text) - Brønnøysund org number (9 digits)
- `timezone` (text) - Default: Europe/Oslo
- `status` (enum) - active | inactive | suspended | pending_verification
- `logo_url` (text)
- `settings` (jsonb) - Organization configuration
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `organizations_tenant_slug_unique` (unique on tenant_id + slug)
- `organizations_tenant_org_number_unique` (unique on tenant_id + org_number, where org_number IS NOT NULL)
- `organizations_tenant_id_idx`
- `organizations_status_idx`

---

#### `actor_types`
Pricing tiers and booking permissions (private, sports_club, school, municipality, commercial).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id, nullable)
- `code` (text) - private | sports_club | school | municipality | commercial
- `name` (text) - Display name
- `description` (text)
- `discount_percentage` (text) - Numeric as text for precision
- `requires_verification` (boolean)
- `is_active` (boolean)
- `metadata` (jsonb)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `actor_types_tenant_code_unique` (unique on tenant_id + code)
- `actor_types_tenant_id_idx`
- `actor_types_org_id_idx`
- `actor_types_is_active_idx`

---

#### `memberships`
User ↔ Organization links with actor types.

**Columns:**
- `tenant_id` (uuid, PK, FK → tenants.id)
- `org_id` (uuid, PK, FK → organizations.id)
- `user_id` (uuid, PK, FK → users.id)
- `status` (enum) - active | inactive | pending | suspended
- `actor_type_id` (uuid, FK → actor_types.id)
- `invited_by` (uuid, FK → users.id)
- `invited_at` (timestamptz)
- `joined_at` (timestamptz)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Primary Key:** (tenant_id, org_id, user_id)

**Indexes:**
- `memberships_tenant_user_idx`
- `memberships_tenant_org_idx`
- `memberships_status_idx`
- `memberships_actor_type_idx`

---

#### `permissions`
Granular permissions with scope (user, org, tenant, saas).

**Columns:**
- `id` (uuid, PK)
- `scope` (enum) - user | org | tenant | saas
- `code` (text, unique) - e.g., org.booking.approve, tenant.org.create
- `name` (text)
- `description` (text)
- `created_at` (timestamptz)

**Indexes:**
- `permissions_code_unique` (unique)
- `permissions_scope_idx`

---

#### `roles`
System and custom roles (tenant/org-scoped).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id, nullable)
- `org_id` (uuid, FK → organizations.id, nullable)
- `scope` (enum) - user | org | tenant | saas
- `name` (text)
- `description` (text)
- `is_system` (boolean) - Built-in role
- `is_default` (boolean) - Default for new members
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `roles_tenant_id_idx`
- `roles_org_id_idx`
- `roles_scope_idx`
- `roles_is_system_idx`
- `idx_roles_tenant_name` (unique on tenant_id + name, where tenant_id IS NOT NULL)
- `idx_roles_system_name` (unique on name, where tenant_id IS NULL AND is_system = true)

---

#### `role_permissions`
Many-to-many mapping of roles to permissions.

**Columns:**
- `role_id` (uuid, PK, FK → roles.id)
- `permission_id` (uuid, PK, FK → permissions.id)
- `created_at` (timestamptz)

**Primary Key:** (role_id, permission_id)

---

#### `user_roles`
User role assignments (tenant/org-scoped).

**Columns:**
- `tenant_id` (uuid, PK, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id, nullable)
- `user_id` (uuid, PK, FK → users.id)
- `role_id` (uuid, PK, FK → roles.id)
- `granted_by` (uuid, FK → users.id)
- `granted_at` (timestamptz)
- `expires_at` (timestamptz, nullable)
- `created_at` (timestamptz)

**Primary Key:** (tenant_id, user_id, role_id)

---

### Licensing & Subscriptions

#### `plans`
Subscription tiers (basic, pro, enterprise).

**Columns:**
- `id` (uuid, PK)
- `key` (text, unique) - basic | pro | enterprise
- `name` (text)
- `description` (text)
- `price_cents` (integer) - Price in cents
- `currency` (text) - Default: NOK
- `billing_interval` (enum) - month | year
- `trial_days` (integer)
- `features` (jsonb) - Plan features
- `metadata` (jsonb)
- `is_active` (boolean)
- `sort_order` (integer)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

---

#### `subscriptions`
Active tenant subscriptions.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `plan_id` (uuid, FK → plans.id)
- `status` (enum) - trialing | active | past_due | canceled | unpaid | paused
- `starts_at` (timestamptz)
- `ends_at` (timestamptz, nullable)
- `trial_ends_at` (timestamptz, nullable)
- `current_period_starts_at` (timestamptz)
- `current_period_ends_at` (timestamptz)
- `price_cents` (integer)
- `currency` (text)
- `billing_interval` (enum)
- `canceled_at` (timestamptz, nullable)
- `cancel_at_period_end` (boolean)
- `metadata` (jsonb)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `subscriptions_tenant_active_unique` (unique on tenant_id, where status IN ('trialing', 'active', 'past_due'))

---

#### `entitlements`
Feature access granted via subscriptions.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `subscription_id` (uuid, FK → subscriptions.id)
- `module_key` (text) - e.g., digilist.booking, backoffice.access
- `status` (enum) - active | suspended | expired
- `enabled` (boolean)
- `limits` (jsonb) - Usage limits
- `metadata` (jsonb)
- `granted_at` (timestamptz)
- `expires_at` (timestamptz, nullable)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `entitlements_tenant_module_unique` (unique on tenant_id + module_key)

---

#### `usage_limits`
Track consumption against entitlement limits.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `entitlement_id` (uuid, FK → entitlements.id)
- `metric` (text) - e.g., bookings_per_month, active_users
- `current_value` (integer)
- `max_value` (integer, nullable) - null = unlimited
- `period` (enum) - daily | weekly | monthly | yearly | total
- `reset_at` (timestamptz, nullable)
- `last_reset_at` (timestamptz, nullable)
- `metadata` (jsonb)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

---

## Product Layer (Digilist)

### Listings & Bookable Resources

#### `listings`
Canonical bookable resources (spaces, equipment, events, services).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `slug` (text, unique)
- `title_i18n` (jsonb) - Multilingual titles
- `description_i18n` (jsonb) - Multilingual descriptions
- `short_description_i18n` (jsonb)
- `listing_type` (enum) - SPACE | RESOURCE | EVENT | SERVICE
- `booking_model` (enum) - TIME_RANGE | RESOURCE_ALLOCATION | EVENT_REGISTRATION | SERVICE_APPOINTMENT
- `status` (enum) - draft | published | archived | maintenance
- `visibility` (enum) - DRAFT | PUBLISHED | PRIVATE
- `is_active` (boolean)
- `default_approval_mode` (enum) - AUTO_APPROVE | REQUIRE_APPROVAL
- `requires_approval` (boolean)
- `address`, `postal_code`, `city`, `country`, `municipality_code` (text)
- `latitude`, `longitude` (text)
- `capacity` (integer)
- `area_sqm` (text)
- `image_urls` (jsonb) - string[]
- `hero_image_url` (text)
- `seo_title`, `seo_description` (text)
- `published_at` (timestamptz)
- `created_at`, `updated_at` (timestamptz)

**Indexes:**
- `listings_tenant_org_slug_unique` (unique on tenant_id + org_id + slug)
- `listings_tenant_org_idx`
- `listings_status_idx`
- `listings_type_published_idx`

---

#### `space_details`
Specific details for SPACE type listings.

**Columns:**
- `listing_id` (uuid, PK, FK → listings.id)
- `building_type` (text)
- `floor_level` (text)
- `room_number` (text)
- `square_meters` (real)
- `access_instructions` (text)
- `parking_info` (text)
- `public_transport_info` (text)
- `accessibility_features` (jsonb) - string[]
- `amenities` (jsonb) - string[]
- `equipment_included` (jsonb) - string[]
- `max_occupancy` (integer)
- `contact_name`, `contact_phone`, `contact_email` (text)
- `created_at`, `updated_at` (timestamptz)

---

#### `listing_media`
Images, videos, floor plans, documents for listings.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `listing_id` (uuid, FK → listings.id)
- `type` (enum) - image | video | document | floor_plan | virtual_tour
- `url` (text)
- `thumbnail_url` (text)
- `alt_text`, `caption` (text)
- `mime_type` (text)
- `file_size`, `width`, `height`, `duration` (integer)
- `is_primary` (boolean)
- `sort_order` (integer)
- `uploaded_by` (uuid, FK → users.id)
- `created_at` (timestamptz)

---

#### `listing_policies`
Terms, safety rules, cancellation policies (versioned, reusable).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `type` (enum) - terms | cancellation | safety | general
- `name` (text)
- `description` (text)
- `content` (text)
- `summary` (text)
- `is_required` (boolean)
- `is_active` (boolean)
- `version` (integer)
- `applies_to_listing_types` (jsonb) - listing_type[]
- `created_at`, `updated_at` (timestamptz)
- `created_by` (uuid, FK → users.id)
- `type` (enum) - booking | safety | cancellation | general | equipment | access
- `title`, `body`, `summary` (text)
- `is_required`, `requires_acceptance`, `is_active` (boolean)
- `version` (integer)
- `terms_url` (text)
- `sort_order` (integer)
- `effective_from`, `effective_until` (timestamptz)
- `created_by` (uuid, FK → users.id)
- `created_at`, `updated_at` (timestamptz)

---

#### `booking_terms_acceptances`
Audit trail of user consent (append-only).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `booking_id` (uuid)
- `user_id` (uuid, FK → users.id)
- `listing_rule_id` (uuid, FK → listing_rules.id)
- `rule_version` (integer) - Snapshot
- `rule_title` (text) - Snapshot
- `accepted_at` (timestamptz)
- `ip_address`, `user_agent` (text)

---

### Availability & Pricing

#### `availability_rules`
Weekly opening hours for zones/listings.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `listing_id` (uuid, FK → listings.id)
- `zone_id` (uuid, FK → zones.id, nullable)
- `day_of_week` (integer) - 0 = Sunday, 6 = Saturday
- `open_time`, `close_time` (time)
- `slot_duration_minutes` (integer)
- `is_active` (boolean)
- `valid_from`, `valid_until` (timestamptz)
- `created_at`, `updated_at` (timestamptz)

---

#### `blackouts`
Maintenance, holidays, closures (supports recurring patterns).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `listing_id` (uuid, FK → listings.id)
- `zone_id` (uuid, FK → zones.id, nullable)
- `name`, `description` (text)
- `reason` (enum) - maintenance | holiday | private_event | renovation | weather | emergency | administrative | other
- `starts_at`, `ends_at` (timestamptz)
- `is_all_day`, `is_recurring` (boolean)
- `recurring_pattern` (jsonb)
- `affects_all_zones`, `notify_users` (boolean)
- `created_by` (uuid, FK → users.id)
- `created_at`, `updated_at` (timestamptz)

---

#### `pricing_rules`
Dynamic pricing with priority and conditions.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `listing_id` (uuid, FK → listings.id)
- `zone_id` (uuid, FK → zones.id, nullable)
- `name`, `description` (text)
- `type` (enum) - base | peak | off_peak | weekend | holiday | early_bird | last_minute | member | custom
- `price_per_hour_cents` (integer)
- `currency` (text)
- `conditions` (jsonb) - Time, duration, actor type filters
- `priority` (integer) - Higher = precedence
- `is_active` (boolean)
- `valid_from`, `valid_until` (timestamptz)
- `created_by` (uuid, FK → users.id)
- `created_at`, `updated_at` (timestamptz)

---

#### `special_dates`
Norwegian public holidays and special dates.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id, nullable)
- `date` (timestamptz)
- `name`, `name_en` (text)
- `type` (text) - public_holiday | school_holiday | local_event
- `is_national` (boolean)
- `affects_pricing`, `affects_availability` (boolean)
- `year` (integer, nullable) - NULL for recurring
- `created_at` (timestamptz)

---

### Bookings

#### `bookings`
Core booking entity with approval workflow.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `listing_id` (uuid, FK → listings.id)
- `zone_id` (uuid, FK → zones.id, nullable)
- `created_by_user_id` (uuid, FK → users.id)
- `booked_for_org_id`, `booked_for_user_id` (uuid, nullable)
- `actor_type_id` (uuid, FK → actor_types.id)
- `status` (enum) - draft | pending | awaiting_payment | awaiting_approval | confirmed | rejected | cancelled | completed | no_show | refunded | expired
- `source` (enum) - user | org | admin | import | api | recurring
- `booking_type` (enum) - single | recurring | seasonal_rental
- `seasonal_rental_status` (enum, nullable)
- `application_deadline` (timestamptz, nullable)
- `cancelled_by` (uuid, FK → users.id)
- `cancellation_type`, `municipal_cancellation_reason` (text)
- `archive_reference`, `archived_at` (text, timestamptz)
- `share_token` (text, unique), `share_enabled` (boolean), `share_expires_at` (timestamptz)
- `starts_at`, `ends_at` (timestamptz)
- `purpose`, `notes`, `internal_notes` (text)
- `attendee_count` (integer)
- `show_in_public_calendar` (boolean), `public_title` (text)
- `approval_required` (boolean)
- `approved_at`, `approved_by`, `rejected_at`, `rejected_by`, `rejection_reason` (timestamptz, uuid, text)
- `price_subtotal_cents`, `discount_cents`, `vat_cents`, `total_cents` (integer)
- `currency` (text)
- `price_breakdown` (jsonb)
- `recurring_booking_id`, `payment_id` (uuid)
- `metadata` (jsonb)
- `confirmed_at`, `cancelled_at`, `completed_at` (timestamptz)
- `created_at`, `updated_at` (timestamptz)

**Indexes:**
- `bookings_tenant_org_idx`
- `bookings_listing_idx`, `bookings_zone_idx`
- `bookings_status_idx`
- `bookings_starts_at_idx`, `bookings_ends_at_idx`
- `bookings_zone_time_status_idx` (composite for availability queries)
- `bookings_share_token_idx`

---

#### `booking_status_history`
Audit trail for status changes (append-only).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `booking_id` (uuid, FK → bookings.id)
- `from_status`, `to_status` (enum)
- `changed_by` (uuid, FK → users.id)
- `changed_at` (timestamptz)
- `reason` (text)
- `metadata` (jsonb)

---

#### `recurring_bookings`
Recurrence patterns for series bookings.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `listing_id` (uuid, FK → listings.id)
- `zone_id` (uuid, FK → zones.id, nullable)
- `created_by_user_id` (uuid, FK → users.id)
- `actor_type_id` (uuid, FK → actor_types.id)
- `pattern` (jsonb) - Recurrence rules
- `start_time`, `end_time` (text) - HH:mm
- `start_date`, `end_date` (timestamptz)
- `status` (enum) - active | paused | cancelled | completed
- `purpose`, `notes` (text)
- `last_generated_at` (timestamptz)
- `generation_horizon_days` (integer)
- `created_at`, `updated_at` (timestamptz)

---

#### `recurring_occurrences`
Individual instances from recurring patterns.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `recurring_booking_id` (uuid, FK → recurring_bookings.id)
- `booking_id` (uuid, FK → bookings.id, nullable)
- `occurrence_date` (timestamptz)
- `status` (enum) - scheduled | generated | skipped | cancelled | conflict
- `conflict_reason`, `skipped_reason` (text)
- `created_at`, `updated_at` (timestamptz)

**Indexes:**
- `recurring_occurrences_unique` (unique on recurring_booking_id + occurrence_date)

---

#### `seasonal_rental_allocations`
Allocation proposals for seasonal rentals.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `recurring_booking_id` (uuid, FK → recurring_bookings.id)
- `listing_id` (uuid, FK → listings.id)
- `zone_id` (uuid, FK → zones.id, nullable)
- `allocated_slots` (jsonb) - Array of time slots
- `priority_score` (integer)
- `allocation_reason` (text)
- `status` (text) - proposed | approved | rejected | adjusted
- `adjusted_by` (uuid, FK → users.id)
- `adjusted_at` (timestamptz)
- `adjustment_reason` (text)
- `created_at`, `updated_at` (timestamptz)

---

#### `booking_cancellation_policies`
Policy snapshots at booking time (for disputes).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `booking_id` (uuid, FK → bookings.id)
- `deadline_at` (timestamptz)
- `fee_policy` (jsonb) - Cancellation fee rules
- `created_at` (timestamptz)

**Indexes:**
- `booking_cancellation_policies_booking_unique` (unique on booking_id)

---

#### `booking_holds`
Temporary holds during checkout (15-min expiry).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `zone_id` (uuid, FK → zones.id)
- `user_id` (uuid, FK → users.id)
- `starts_at`, `ends_at`, `expires_at` (timestamptz)
- `booking_id` (uuid, FK → bookings.id, nullable)
- `session_id` (text)
- `created_at` (timestamptz)

**Indexes:**
- `booking_holds_zone_time_idx` (composite for conflict detection)
- `booking_holds_expires_idx`

---

### Payments & Invoicing

#### `payment_methods`
Vipps, Nets, Stripe configuration per org.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `provider` (enum) - vipps | nets | stripe | invoice | manual | free
- `name`, `description` (text)
- `is_active`, `is_default` (boolean)
- `config` (jsonb) - Provider credentials (encrypted)
- `transaction_fee_percent` (text), `transaction_fee_cents` (integer)
- `min_amount_cents`, `max_amount_cents` (integer)
- `supported_currencies` (jsonb)
- `created_at`, `updated_at` (timestamptz)

---

#### `payments`
Payment transactions with idempotency keys.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `booking_id` (uuid, FK → bookings.id)
- `user_id` (uuid, FK → users.id)
- `payment_method_id` (uuid, FK → payment_methods.id)
- `provider` (enum)
- `provider_payment_id` (text) - External reference
- `amount_cents` (integer)
- `currency` (text)
- `status` (enum) - pending | processing | completed | failed | cancelled | refunded | partially_refunded
- `idempotency_key` (uuid)
- `refunded_amount_cents` (integer)
- `refunded_at` (timestamptz), `refund_reason` (text)
- `metadata` (jsonb)
- `completed_at`, `failed_at` (timestamptz)
- `failure_reason` (text)
- `created_at`, `updated_at` (timestamptz)

**Indexes:**
- `payments_idempotency_unique` (unique on tenant_id + idempotency_key, where idempotency_key IS NOT NULL)
- `payments_provider_payment_idx`

---

#### `invoices`
Municipal billing with EHF support, sales receipts (salgsbilag).

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `org_id` (uuid, FK → organizations.id)
- `invoice_number` (text, unique)
- `document_number` (text, unique) - Sales receipt number
- `customer_org_id`, `customer_user_id` (uuid)
- `customer_name`, `customer_address`, `customer_email`, `customer_org_number` (text)
- `booking_id`, `payment_id` (uuid)
- `subtotal_cents`, `vat_cents`, `total_cents` (integer)
- `currency` (text)
- `line_items` (jsonb)
- `status` (enum) - draft | sent | paid | overdue | cancelled | credited
- `issued_at`, `due_at`, `paid_at` (timestamptz)
- `pdf_url` (text)
- `receipt_number` (text, unique), `receipt_generated_at` (timestamptz), `receipt_locked` (boolean)
- `notes`, `internal_notes` (text)
- `metadata` (jsonb)
- `created_at`, `updated_at` (timestamptz)

**Indexes:**
- `invoices_tenant_invoice_number_unique` (unique on tenant_id + invoice_number)

---

#### `payment_webhook_events`
Webhook tracking for idempotent processing.

**Columns:**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK → tenants.id)
- `payment_id` (uuid, FK → payments.id, nullable)
- `provider` (text) - vipps | nets | stripe
- `event_type` (text) - e.g., payment.completed, refund.created
- `provider_event_id`, `delivery_id` (text, unique)
- `signature_valid` (boolean)
- `payload` (jsonb) - Raw webhook payload
- `processed_status` (text) - pending | processing | completed | failed
- `processed_at` (timestamptz)
- `retry_count` (integer)
- `last_error` (text)
- `created_at` (timestamptz)

**Indexes:**
- `idx_webhook_events_delivery` (unique on delivery_id)
- `idx_webhook_events_status`
- `idx_webhook_events_retry` (composite on processed_status + retry_count)

---

## Database Features

### Multi-Tenancy
- All tables include `tenant_id` for data isolation
- Row-level security (RLS) policies enforce tenant boundaries
- Composite indexes on `(tenant_id, org_id)` for performance

### GDPR Compliance
- Soft deletes: `deleted_at`, `anonymized_at` columns
- Audit trails: Append-only history tables
- Right to erasure: Anonymization functions
- Consent tracking: `booking_terms_acceptances`

### Audit & Compliance
- **Append-only tables**: `booking_status_history`, `booking_terms_acceptances`
- **Versioning**: `listing_rules.version`, policy snapshots
- **Immutable receipts**: `invoices.receipt_locked`
- **IP tracking**: `ip_address`, `user_agent` fields

### Performance Optimizations
- **Composite indexes** for common query patterns
- **Partial indexes** for active records only
- **JSONB indexes** for metadata queries
- **Time-based indexes** for availability lookups

### Data Integrity
- **Foreign key constraints** with cascading deletes
- **Unique constraints** on business keys
- **Check constraints** on enums and ranges
- **NOT NULL constraints** on required fields

---

## Indexes & Performance

### Critical Indexes

**Tenant Queries:**
```sql
CREATE INDEX idx_table_tenant_org ON table(tenant_id, org_id);
CREATE INDEX idx_table_tenant_user ON table(tenant_id, user_id);
```

**Time-Based Queries:**
```sql
CREATE INDEX idx_bookings_zone_time_status 
  ON bookings(zone_id, starts_at, ends_at, status);
CREATE INDEX idx_bookings_starts_at ON bookings(starts_at);
```

**Status Filtering:**
```sql
CREATE INDEX idx_table_status ON table(status) WHERE status = 'active';
```

**Unique Business Keys:**
```sql
CREATE UNIQUE INDEX idx_listings_tenant_org_slug 
  ON listings(tenant_id, org_id, slug);
```

### Query Patterns

**Availability Check:**
```sql
SELECT * FROM bookings
WHERE zone_id = $1
  AND status IN ('confirmed', 'pending')
  AND starts_at < $3
  AND ends_at > $2;
-- Uses: idx_bookings_zone_time_status
```

**Tenant Data Fetch:**
```sql
SELECT * FROM listings
WHERE tenant_id = $1 AND org_id = $2
  AND status = 'published';
-- Uses: idx_listings_tenant_org, idx_listings_status
```

---

## Schema Maintenance

### Migrations
- **Tool**: Drizzle Kit
- **Location**: `packages/data/migrations/`
- **Naming**: `YYYYMMDD_HHMMSS_description.sql`

### Seeding
- **Location**: `packages/data/src/seeds/`
- **Command**: `pnpm seed:minimal`
- **Test Data**: 2 tenants, 4 orgs, 6 users, 4 listings

### Backup Strategy
- **Frequency**: Daily automated backups
- **Retention**: 30 days
- **Point-in-time recovery**: Enabled
- **Replication**: Multi-region for production

---

**Last Updated:** 2026-01-04  
**Schema Version:** 1.0.0  
**Maintainer:** Digilist Platform Team
