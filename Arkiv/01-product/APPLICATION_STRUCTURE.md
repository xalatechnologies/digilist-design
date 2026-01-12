# Digilist Application Structure & Functionalities

**Version:** 1.0.0  
**Last Updated:** 2025-01-06  
**Status:** Active

---

## Table of Contents

1. [Overview](#overview)
2. [Application Architecture](#application-architecture)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Web Application (`apps/web`)](#web-application-appsweb)
5. [Backoffice Application (`apps/backoffice`)](#backoffice-application-appsbackoffice)
6. [Sidebar Navigation Structure](#sidebar-navigation-structure)
7. [Feature Placement Guidelines](#feature-placement-guidelines)
8. [Role-Based Access Matrix](#role-based-access-matrix)

---

## Overview

Digilist is a Norwegian municipal facility booking platform organized into multiple applications, each serving distinct user roles and use cases. This document provides a comprehensive guide to application structure, functionalities, and navigation.

### Application Hierarchy

```
apps/
├── web/              # Public-facing web application (main product)
├── backoffice/       # Standalone admin application (legacy, being migrated)
├── saas/            # Platform admin (tenant/subscription management)
├── monitoring/      # System monitoring & operations
├── docs/            # Documentation site
├── learning-hub/    # E-learning platform
└── worker/          # Background job processor
```

---

## Application Architecture

### Web Application (`apps/web`)

**Purpose:** Main public-facing application for all user types  
**URL Pattern:** `https://digilist.no/*`  
**Shells:** `PublicPageShell`, `DashboardPageShell`

**Route Structure:**
- **Public Routes** (`/`): No authentication required
- **User Routes** (`/app/*`): Authenticated users
- **Backoffice Routes** (`/backoffice/*`): Admin/staff roles

### Backoffice Application (`apps/backoffice`)

**Purpose:** Standalone administrative interface (legacy)  
**URL Pattern:** `https://backoffice.digilist.no/*` or `/admin/*`  
**Shell:** `DashboardPageShell`  
**Status:** Being migrated to `apps/web/backoffice/*` routes

---

## User Roles & Permissions

### Platform Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| `platform_admin` | Full system access across all organizations | SaaS app, platform settings |
| `user` | Standard platform user | Organization-specific permissions |

### Organization Roles

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| `owner` | Full control over organization | All permissions including billing, user management, settings |
| `admin` | Administrative access | Manage members, listings, bookings, settings (except billing) |
| `case_handler` | Operational role for booking processing | Approve/reject bookings, manage availability, view reports |
| `editor` | Content management | Edit listing descriptions, upload images, manage tags (no booking/user management) |
| `read_only` | View-only access | View listings, bookings, reports (no modifications) |
| `customer` | Standard customer | View listings, create bookings, manage own profile |

### Role Priority

Higher priority = more privileges:
1. `owner` (highest)
2. `admin`
3. `case_handler`
4. `editor`
5. `read_only`
6. `customer` (lowest)

---

## Web Application (`apps/web`)

### Public Routes (`/`)

**Shell:** `PublicPageShell`  
**Authentication:** None required  
**Access:** Everyone

#### Pages & Functionalities

| Route | Page | Functionality |
|-------|------|---------------|
| `/` | Home | - Browse featured listings<br>- Search listings<br>- View categories<br>- Language toggle<br>- Login/Sign up CTA |
| `/listings` | Listing Catalog | - Search & filter listings<br>- Map view<br>- List view<br>- Category filters<br>- Location search |
| `/listings/:slug` | Listing Detail | - View listing details<br>- Check availability calendar<br>- View images & amenities<br>- See pricing<br>- "Book Now" CTA (redirects to login if not authenticated) |
| `/login` | Login | - OAuth providers (Google, ID-porten, Microsoft, Vipps, Feide)<br>- Email/password (if enabled)<br>- Redirect to intended destination |
| `/unauthorized` | Unauthorized | - Access denied message<br>- Link back to home |

#### Sidebar Navigation (Public)

**Not applicable** - Public pages use `PublicPageShell` with header navigation only.

**Header Navigation:**
- Logo (links to home)
- Search bar
- Language toggle (nb/en)
- Login button (if not authenticated)
- User menu (if authenticated)

---

### User Routes (`/app/*`)

**Shell:** `DashboardPageShell`  
**Authentication:** Required (`RequireAuth`)  
**Access:** All authenticated users  
**Base Path:** `/app`

#### Pages & Functionalities

| Route | Page | Functionality |
|-------|------|---------------|
| `/app` | User Dashboard | - Booking statistics (pending, confirmed, total)<br>- Recent bookings<br>- Quick actions<br>- Upcoming bookings calendar |
| `/app/bookings` | My Bookings | - List all user bookings<br>- Filter by status (pending, confirmed, cancelled)<br>- View booking details<br>- Cancel bookings (within deadline)<br>- View booking history |
| `/app/checkout` | Checkout | - Review booking details<br>- Select payment method (Vipps, card)<br>- Accept terms & conditions<br>- Complete booking<br>- View booking confirmation |
| `/app/profile` | User Profile | - View/edit personal information<br>- Organization details<br>- Actor type (private, business, sports_club, etc.)<br>- Verification status<br>- Contact preferences |
| `/app/settings` | User Settings | - Notification preferences<br>- Language settings<br>- Privacy settings<br>- Account security |

#### Sidebar Navigation (User)

**Section: Hovedmeny (Main Menu)**
- 🏠 **Dashboard** (`/app`) - Overview and statistics
- 📅 **Bookinger** (`/app/bookings`) - My bookings list
- 🛒 **Kasse** (`/app/checkout`) - Checkout page
- 👤 **Min profil** (`/app/profile`) - User profile
- ⚙️ **Innstillinger** (`/app/settings`) - User settings

**User Section (Bottom):**
- User name & email
- Sign out button

---

### Backoffice Routes (`/backoffice/*`)

**Shell:** `DashboardPageShell`  
**Authentication:** Required + role check  
**Access:** `admin`, `case_handler`, `property_owner`  
**Base Path:** `/backoffice`

#### Pages & Functionalities

| Route | Page | Functionality | Required Role |
|-------|------|---------------|---------------|
| `/backoffice` | Admin Dashboard | - Organization statistics<br>- Pending approvals count<br>- Recent bookings<br>- Quick actions<br>- Utilization metrics | `admin`, `case_handler`, `owner` |
| `/backoffice/bookings` | Booking Management | - View all bookings<br>- Filter by status, date, listing<br>- View booking details<br>- Admin cancellation<br>- Check-in/check-out<br>- Booking history | `admin`, `case_handler`, `owner` |
| `/backoffice/listings` | Listing Management | - List all listings<br>- Create new listing<br>- Edit listing details<br>- Configure zones<br>- Set pricing rules<br>- Manage availability<br>- Upload images | `admin`, `owner` |
| `/backoffice/users` | User Management | - List organization users<br>- Invite users<br>- Manage roles & permissions<br>- View user activity<br>- Deactivate users | `admin`, `owner` |
| `/backoffice/approvals` | Approval Queue | - View pending approvals<br>- Approve/reject bookings<br>- Request clarification<br>- View approval history<br>- Batch operations | `case_handler`, `admin`, `owner` |
| `/backoffice/compliance` | Compliance Tools | - GDPR compliance tools<br>- Data export<br>- Deletion requests<br>- Audit log access | `admin`, `owner` |
| `/backoffice/reports` | Reports & Analytics | - Utilization reports<br>- Economy reports<br>- Visitor statistics<br>- Export data (CSV, PDF) | `admin`, `case_handler`, `owner` |
| `/backoffice/settings` | Organization Settings | - Organization details<br>- Billing information<br>- Integration settings<br>- Feature flags | `admin`, `owner` |
| `/backoffice/communications` | Communications | - Send notifications<br>- Email templates<br>- Communication history | `admin`, `owner` |

#### Sidebar Navigation (Backoffice)

**Section: Hovedmeny (Main Menu)**
- 🏠 **Dashboard** (`/backoffice`) - Overview and statistics
- 📅 **Bookinger** (`/backoffice/bookings`) - All bookings management
- 📄 **Lokaler** (`/backoffice/listings`) - Listing management
- 👥 **Brukere** (`/backoffice/users`) - User management
- ✅ **Godkjenninger** (`/backoffice/approvals`) - Approval queue (with badge count)

**Section: Administrasjon (Administration)**
- 🛡️ **Compliance** (`/backoffice/compliance`) - Compliance tools
- 📊 **Rapporter** (`/backoffice/reports`) - Reports & analytics
- 💬 **Kommunikasjon** (`/backoffice/communications`) - Communications
- ⚙️ **Innstillinger** (`/backoffice/settings`) - Organization settings

**User Section (Bottom):**
- User name & email
- Sign out button

---

## Backoffice Application (`apps/backoffice`)

**Status:** Legacy application, being migrated to `apps/web/backoffice/*`  
**Purpose:** Standalone admin interface (temporary during migration)  
**Note:** This app will be deprecated once migration to `apps/web/backoffice/*` is complete

### Routes & Functionalities

| Route | Page | Functionality | Target Migration |
|-------|------|---------------|------------------|
| `/admin` | Overview | - Dashboard with KPI cards<br>- Pending approvals count<br>- Recent bookings<br>- Quick actions<br>- Activity feed | `/backoffice` in web app |
| `/admin/listings` | Listings | - List all listings with filters<br>- Create new listing<br>- Edit listing (`/admin/listings/:id/edit`)<br>- Manage zones<br>- Configure pricing<br>- Upload images | `/backoffice/listings` in web app |
| `/admin/bookings` | Bookings | - View all bookings<br>- Filter by status, date, listing<br>- View booking details<br>- Admin cancellation<br>- Check-in/check-out<br>- Export bookings | `/backoffice/bookings` in web app |
| `/admin/approvals` | Approvals | - Approval queue with filters<br>- Batch operations<br>- Approve/reject with reasons<br>- Request clarification<br>- View approval history<br>- Priority indicators | `/backoffice/approvals` in web app |
| `/admin/users` | Users | - List organization users<br>- Invite users<br>- Manage roles<br>- View user activity<br>- Deactivate users<br>- User search and filters | `/backoffice/users` in web app |
| `/admin/reports` | Reports | - Utilization reports<br>- Economy reports<br>- Visitor statistics<br>- Export reports (CSV, PDF)<br>- Report scheduling | `/backoffice/reports` in web app |
| `/admin/audit-logs` | Audit Logs | - View audit trail<br>- Filter by action, user, date range<br>- Search audit entries<br>- Export audit logs<br>- View detailed audit entry | `/backoffice/compliance` in web app (audit section) |
| `/admin/integrations` | Integrations | - Configure third-party integrations<br>- API key management<br>- Webhook configuration<br>- Integration status<br>- Test integrations | `/backoffice/settings` in web app (integrations section) |
| `/admin/settings` | Settings | - Organization details<br>- Booking settings<br>- Notification preferences<br>- Feature flags<br>- Billing information (owner only) | `/backoffice/settings` in web app |
| `/admin/localization` | Localization | - Manage translations (nb/en)<br>- Edit translation keys<br>- Import/export translations<br>- Language content management | `/backoffice/settings` in web app (localization section) |
| `/admin/notifications` | Notifications | - Email templates<br>- Notification preferences<br>- Send notifications<br>- Notification history<br>- Template editor | `/backoffice/communications` in web app |
| `/admin/deletion-plan` | Deletion Plan | - GDPR deletion requests<br>- Data retention policies<br>- Deletion schedule<br>- Data export before deletion | `/backoffice/compliance` in web app (deletion section) |
| `/admin/admin-messages` | Admin Messages | - Internal messaging system<br>- Messages between admins<br>- Message threads | Future feature (may be removed) |

### Sidebar Navigation (Backoffice App)

**Section: Hovedmeny (Main Menu)**
- 🏠 **Oversikt** (`/admin`) - Dashboard
- 🏢 **Anlegg** (`/admin/listings`) - Listings
- 📅 **Bookinger** (`/admin/bookings`) - Bookings
- 🛡️ **Godkjenninger** (`/admin/approvals`) - Approvals (with badge showing pending count)
- 👥 **Brukere** (`/admin/users`) - Users

**Section: Administrasjon (Administration)**
- 📊 **Rapporter** (`/admin/reports`) - Reports
- 📜 **Revisjonslogg** (`/admin/audit-logs`) - Audit logs
- 🌐 **Integrasjoner** (`/admin/integrations`) - Integrations

**Section: Innstillinger (Settings)**
- ⚙️ **Innstillinger** (`/admin/settings`) - Settings
- 📝 **Oversettelser** (`/admin/localization`) - Localization
- 🔔 **Varsler** (`/admin/notifications`) - Notifications
- 🗑️ **Sletteplan** (`/admin/deletion-plan`) - Deletion plan

---

## Sidebar Navigation Structure

### Navigation Component Pattern

All sidebars use `DashboardSidebar` with `SidebarSection` and `SidebarItem` components from `@xalatechnologies/ui`.

**Structure:**
```tsx
<DashboardSidebar>
  <SidebarSection title="Section Title">
    <SidebarItem
      as={NavLink}
      to="/path"
      icon={<Icon />}
      label="Label"
      badge={{ value: count, variant: "warning" }} // Optional
    />
  </SidebarSection>
</DashboardSidebar>
```

### Role-Based Sidebar Visibility

Sidebar items should be conditionally rendered based on user permissions:

```tsx
{hasPermission('booking:view:org') && (
  <SidebarItem to="/backoffice/bookings" ... />
)}
```

---

## Feature Placement Guidelines

### What Goes Where?

#### Public Features (`apps/web` - Public Routes)

**Place here:**
- Listing discovery & search
- Listing detail pages
- Public information pages
- Login/signup flows
- Public documentation
- Homepage with featured listings

**Do NOT place here:**
- User-specific data
- Administrative functions
- Protected content
- Booking creation (redirects to login)

**Architecture Rules:**
- Use `PublicPageShell` component
- No authentication required
- Can link to authenticated routes (will redirect to login)

#### User Features (`apps/web` - `/app/*` Routes)

**Place here:**
- User dashboard
- Personal bookings (own bookings only)
- User profile management
- User settings
- Checkout flow
- Booking history

**Do NOT place here:**
- Organization management
- Listing management (use `/backoffice/listings`)
- Approval workflows (use `/backoffice/approvals`)
- Administrative reports (use `/backoffice/reports`)
- Other users' bookings

**Architecture Rules:**
- Use `DashboardPageShell` with user sidebar
- Require authentication (`RequireAuth`)
- Accessible to all authenticated users
- User-specific data only

#### Backoffice Features (`apps/web` - `/backoffice/*` Routes)

**Place here:**
- Booking management (all bookings in organization)
- Listing management (all listings in organization)
- User management (organization users)
- Approval queue
- Reports & analytics (organization-level)
- Organization settings
- Compliance tools
- Communications

**Do NOT place here:**
- Platform-level administration (use `apps/saas`)
- User personal features (use `/app/*`)
- Cross-tenant features

**Architecture Rules:**
- Use `DashboardPageShell` with backoffice sidebar
- Require authentication + role check (`RequireAuth roles={["admin", "case_handler", "owner"]}`)
- Organization-scoped data
- Role-based feature visibility

#### Platform Admin Features (`apps/saas`)

**Place here:**
- Tenant management (all organizations)
- Subscription management
- Plan management
- Platform-wide billing
- Cross-tenant analytics
- Platform settings

**Do NOT place here:**
- Organization-specific features
- User-facing features
- Booking management
- Listing management

**Architecture Rules:**
- Use `DashboardPageShell` with SaaS sidebar
- Require `platform_admin` role
- Cross-tenant access
- Platform-level operations only

### Decision Tree: Where Should This Feature Go?

```
Is it platform-wide (affects all tenants)?
├─ YES → apps/saas
└─ NO → Is it organization-specific?
    ├─ YES → Is it administrative?
    │   ├─ YES → apps/web/backoffice/*
    │   └─ NO → Is it user-specific?
    │       ├─ YES → apps/web/app/*
    │       └─ NO → apps/web (public routes)
    └─ NO → Is it public?
        ├─ YES → apps/web (public routes)
        └─ NO → apps/web/app/*
```

---

## Role-Based Access Matrix

### Permission Matrix

| Feature | Public | Customer | Case Handler | Editor | Admin | Owner | Platform Admin |
|---------|--------|---------|--------------|--------|-------|-------|----------------|
| **View Listings** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Create Booking** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **View Own Bookings** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Cancel Own Booking** | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **View All Bookings** | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Approve/Reject** | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Manage Listings** | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Manage Users** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **View Reports** | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Export Data** | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Manage Settings** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **Manage Billing** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **View Audit Logs** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **Manage Tenants** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

### Route Access Matrix

| Route Pattern | Public | Customer | Case Handler | Editor | Admin | Owner | Platform Admin |
|----------------|--------|----------|--------------|--------|-------|-------|----------------|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/listings` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/listings/:slug` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/app/*` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/backoffice/*` | ❌ | ❌ | ✅* | ❌ | ✅ | ✅ | ❌ |
| `/saas/*` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

*Case handlers have limited access (approvals, bookings view only)

---

## Detailed Functionality Breakdown

### Case Handler Functionalities

**Primary Responsibilities:**
- Process booking approval requests
- Review booking applications
- Approve or reject bookings with documented reasons
- Request clarification from applicants
- Manage booking availability
- View booking history and patterns
- Check-in/check-out bookings
- Handle booking conflicts

**Accessible Pages:**
- `/backoffice` - Dashboard (limited view: pending approvals, recent bookings)
- `/backoffice/bookings` - View all bookings (read-only, can check-in/out)
- `/backoffice/approvals` - Approval queue (primary workspace)
- `/backoffice/reports` - View reports (read-only, can export)

**Key Features:**

**Approval Queue (`/backoffice/approvals`):**
- View pending approval requests
- Filter by priority (high, normal, low)
- Filter by listing, date range, applicant type
- Sort by submission date, urgency
- Batch selection for bulk operations
- Approval decision panel:
  - Approve with optional notes
  - Reject with mandatory reason (from predefined list or custom)
  - Request clarification (sends message to applicant)
- View approval history and status timeline
- See related bookings (overlapping, same applicant)
- View applicant details and booking history
- Priority indicators (overdue, expiring soon)

**Booking Management (`/backoffice/bookings`):**
- View all bookings (all statuses)
- Filter by status (pending, confirmed, cancelled, completed)
- Filter by listing, date range, applicant
- View booking details:
  - Booking information (dates, times, purpose)
  - Applicant information
  - Pricing breakdown
  - Payment status
  - Approval history
- Check-in/check-out functionality
- View booking calendar (monthly/weekly view)
- Export booking list (CSV)

**Reports (`/backoffice/reports`):**
- View utilization reports (read-only)
- View economy reports (read-only)
- Export report data (CSV, PDF)
- View visitor statistics

**Restrictions:**
- Cannot create/edit listings
- Cannot manage users
- Cannot modify organization settings
- Cannot access billing information
- Cannot view audit logs (unless explicitly granted)
- Cannot delete bookings (admin only)
- Cannot modify booking pricing (admin only)

### Admin Functionalities

**Primary Responsibilities:**
- Manage organization settings
- Manage users and roles
- Manage listings and zones
- View and export reports
- Configure integrations
- Manage notifications
- Access audit logs
- Process approvals (can override case handler decisions)
- Manage all bookings (including admin cancellation)

**Accessible Pages:**
- `/backoffice` - Full dashboard with all statistics
- `/backoffice/bookings` - All booking management
- `/backoffice/listings` - Listing management
- `/backoffice/users` - User management
- `/backoffice/approvals` - Approval queue
- `/backoffice/compliance` - Compliance tools
- `/backoffice/reports` - Reports & analytics
- `/backoffice/settings` - Organization settings
- `/backoffice/communications` - Communications

**Key Features:**

**Dashboard (`/backoffice`):**
- Organization statistics (total bookings, active listings, users)
- Pending approvals count (with badge)
- Recent bookings activity
- Quick actions (create listing, invite user, view reports)
- Utilization metrics
- Revenue overview (if applicable)

**Listing Management (`/backoffice/listings`):**
- List all listings with filters
- Create new listing:
  - Basic information (name, description, type)
  - Location and address
  - Images and media
  - Amenities and features
  - Pricing configuration
  - Availability rules
  - Booking rules and constraints
- Edit existing listings
- Configure zones (sub-areas within listing)
- Set pricing rules (base price, discounts, actor type pricing)
- Manage availability (block dates, recurring availability)
- Upload and manage images
- Publish/unpublish listings
- Delete listings (with confirmation)

**Booking Management (`/backoffice/bookings`):**
- View all bookings (all statuses, all users)
- Filter by status, listing, date, applicant
- View booking details (full access)
- Admin cancellation (bypasses user cancellation deadline)
- Modify booking details (dates, times, pricing)
- Refund processing
- Check-in/check-out
- Booking calendar view
- Export bookings (CSV, PDF)
- Booking conflict resolution

**User Management (`/backoffice/users`):**
- List all organization users
- Invite new users (email invitation)
- View user details:
  - Personal information
  - Organization membership
  - Roles and permissions
  - Booking history
  - Activity log
- Assign roles (admin, case_handler, editor, read_only, customer)
- Remove users from organization
- Deactivate/reactivate users
- View user permissions
- Search and filter users

**Approval Queue (`/backoffice/approvals`):**
- All case handler features PLUS:
- Override case handler decisions
- Assign approvals to specific case handlers
- View all approval history (not just own)
- Configure approval workflows
- Set approval rules and criteria

**Reports (`/backoffice/reports`):**
- Utilization reports:
  - Listing utilization by time period
  - Peak usage times
  - Popular listings
  - Booking trends
- Economy reports:
  - Revenue by listing
  - Revenue by time period
  - Payment status overview
  - Outstanding payments
- Visitor statistics:
  - Total visitors
  - Unique visitors
  - Visitors by listing
  - Booking frequency
- Export all reports (CSV, PDF, Excel)
- Schedule automated reports (future)

**Settings (`/backoffice/settings`):**
- Organization details:
  - Name, address, contact information
  - Organization number (Brønnøysund)
  - Logo and branding
- Booking settings:
  - Default booking rules
  - Cancellation policies
  - Approval workflows
  - Pricing defaults
- Notification settings:
  - Email templates
  - Notification preferences
  - Automated notifications
- Feature flags:
  - Enable/disable features
  - Beta features
- Integration settings:
  - API keys
  - Webhook endpoints
  - Third-party integrations

**Compliance (`/backoffice/compliance`):**
- GDPR compliance tools:
  - Data export (user data, booking data)
  - Data deletion requests
  - Consent management
- Audit log access:
  - View organization audit trail
  - Filter by action, user, date
  - Export audit logs
- Data retention policies
- Privacy settings

**Communications (`/backoffice/communications`):**
- Send notifications to users
- Email templates management
- Communication history
- Bulk messaging

**Restrictions:**
- Cannot manage billing (owner only)
- Cannot delete organization (owner only)
- Cannot access platform admin features (SaaS app)
- Cannot modify platform-wide settings

### Owner Functionalities

**Primary Responsibilities:**
- All admin functionalities PLUS:
- Manage billing and subscriptions
- Delete organization
- Manage organization roles
- Full audit access

**Accessible Pages:**
- All admin pages PLUS:
- Billing management (if separate page exists)
- Organization deletion (if applicable)

**Key Features:**
- Everything admin can do PLUS:
- Billing management
- Organization deletion
- Full role management
- Complete audit access

### Customer (User) Functionalities

**Primary Responsibilities:**
- Browse and search listings
- Create booking requests
- Manage own bookings
- Update profile information
- View booking history
- Make payments

**Accessible Pages:**
- `/` - Home
- `/listings` - Browse listings
- `/listings/:slug` - View listing details
- `/app` - User dashboard
- `/app/bookings` - My bookings
- `/app/checkout` - Checkout
- `/app/profile` - Profile
- `/app/settings` - Settings

**Key Features:**

**Listing Discovery (`/`, `/listings`):**
- Search listings by name, location, type
- Filter by:
  - Listing type (SPACE, RESOURCE, EVENT, SERVICE, VEHICLE, OTHER)
  - Category
  - Amenities
  - Price range
  - Availability date
- Map view and list view toggle
- View listing cards with:
  - Images
  - Name and location
  - Price range
  - Availability indicator
  - Quick view

**Listing Detail (`/listings/:slug`):**
- View full listing information:
  - Description and details
  - Image gallery
  - Amenities and features
  - Location and map
  - Pricing information
  - Rules and restrictions
- Availability calendar:
  - Monthly/weekly view
  - Available time slots highlighted
  - Booked slots shown
- "Book Now" button (redirects to login if not authenticated)

**User Dashboard (`/app`):**
- Booking statistics:
  - Pending bookings count
  - Confirmed bookings count
  - Total bookings
- Recent bookings (last 5-10)
- Upcoming bookings calendar
- Quick actions:
  - Browse listings
  - View all bookings
  - Create new booking

**My Bookings (`/app/bookings`):**
- List all user bookings
- Filter by status:
  - Pending (awaiting approval)
  - Confirmed
  - Cancelled
  - Completed
- View booking details:
  - Listing information
  - Dates and times
  - Purpose and attendee count
  - Pricing breakdown
  - Payment status
  - Approval status
- Cancel bookings:
  - Within cancellation deadline
  - With cancellation reason
  - Automatic refund (if applicable)
- View booking history
- Download booking confirmations (PDF)
- Share booking link (if enabled)

**Checkout (`/app/checkout`):**
- Review booking summary:
  - Selected listing
  - Selected time slots
  - Pricing breakdown
  - Total amount
- Enter booking details:
  - Purpose
  - Attendee count
  - Special requirements
- Accept terms and conditions
- Select payment method:
  - Vipps (mobile payment)
  - Credit/debit card
  - Invoice (if eligible)
- Complete booking
- View confirmation

**Profile (`/app/profile`):**
- View/edit personal information:
  - Name
  - Email
  - Phone number
  - Address
- Organization details:
  - Organization name
  - Organization number
  - Actor type (private, business, sports_club, youth_organization, school, municipality)
  - Verification status
- Profile picture upload
- Contact preferences

**Settings (`/app/settings`):**
- Notification preferences:
  - Email notifications (booking confirmations, reminders, updates)
  - Push notifications (if enabled)
  - SMS notifications (if enabled)
- Language settings (Norwegian/English)
- Privacy settings:
  - Data sharing preferences
  - Marketing communications opt-in/out
- Account security:
  - Change password
  - Two-factor authentication (if enabled)
  - Connected accounts (OAuth providers)

**Restrictions:**
- Cannot approve/reject bookings
- Cannot manage listings
- Cannot view other users' bookings
- Cannot access administrative features
- Cannot modify booking pricing
- Cannot access organization settings
- Cannot view audit logs

---

## Navigation Best Practices

### Sidebar Organization

1. **Main Menu Section** - Primary navigation items (most frequently used)
2. **Administration Section** - Secondary administrative functions
3. **Settings Section** - Configuration and preferences

### Badge Usage

Use badges to indicate:
- Pending approvals count (`/backoffice/approvals`)
- Unread notifications (if applicable)
- Urgent items requiring attention

### Icon Selection

Use consistent icons from `lucide-react`:
- 🏠 `Home` - Dashboard/home
- 📅 `Calendar` - Bookings
- 🏢 `Building2` - Listings
- 👥 `Users` - Users
- ✅ `CheckCircle2` or `Shield` - Approvals
- 📊 `BarChart3` - Reports
- ⚙️ `Settings` - Settings
- 🛡️ `Shield` - Compliance/security
- 💬 `MessageSquare` - Communications
- 📜 `History` - Audit logs

---

## Migration Notes

### Backoffice App → Web App Backoffice Routes

**Current State:**
- `apps/backoffice` exists as standalone app
- `apps/web/backoffice/*` routes are being implemented
- Both coexist during migration

**Target State:**
- All backoffice functionality in `apps/web/backoffice/*`
- `apps/backoffice` deprecated and removed
- Single application for all user-facing features

**Migration Strategy:**
1. Implement routes in `apps/web/backoffice/*`
2. Migrate functionality page by page
3. Update navigation and links
4. Deprecate `apps/backoffice` routes
5. Remove `apps/backoffice` app

---

## Complete Sidebar Navigation Reference

### Web App - User Sidebar (`/app/*`)

```
📱 USER NAVIGATION
├─ 🏠 Dashboard (/app)
├─ 📅 Bookinger (/app/bookings)
├─ 🛒 Kasse (/app/checkout)
├─ 👤 Min profil (/app/profile)
└─ ⚙️ Innstillinger (/app/settings)
```

### Web App - Backoffice Sidebar (`/backoffice/*`)

```
📱 BACKOFFICE NAVIGATION

Hovedmeny (Main Menu):
├─ 🏠 Dashboard (/backoffice)
├─ 📅 Bookinger (/backoffice/bookings)
├─ 📄 Lokaler (/backoffice/listings)
├─ 👥 Brukere (/backoffice/users)
└─ ✅ Godkjenninger (/backoffice/approvals) [badge: pending count]

Administrasjon (Administration):
├─ 🛡️ Compliance (/backoffice/compliance)
├─ 📊 Rapporter (/backoffice/reports)
├─ 💬 Kommunikasjon (/backoffice/communications)
└─ ⚙️ Innstillinger (/backoffice/settings)
```

### Backoffice App Sidebar (`/admin/*`) - Legacy

```
📱 BACKOFFICE APP NAVIGATION (Legacy)

Hovedmeny (Main Menu):
├─ 🏠 Oversikt (/admin)
├─ 🏢 Anlegg (/admin/listings)
├─ 📅 Bookinger (/admin/bookings)
├─ 🛡️ Godkjenninger (/admin/approvals) [badge]
└─ 👥 Brukere (/admin/users)

Administrasjon (Administration):
├─ 📊 Rapporter (/admin/reports)
├─ 📜 Revisjonslogg (/admin/audit-logs)
└─ 🌐 Integrasjoner (/admin/integrations)

Innstillinger (Settings):
├─ ⚙️ Innstillinger (/admin/settings)
├─ 📝 Oversettelser (/admin/localization)
├─ 🔔 Varsler (/admin/notifications)
└─ 🗑️ Sletteplan (/admin/deletion-plan)
```

### SaaS App Sidebar (`/saas/*`) - Platform Admin

```
📱 PLATFORM ADMIN NAVIGATION

Home:
└─ 🏠 Home (/)

Management:
├─ 🏢 Tenants (/tenants)
├─ 📦 Subscriptions (/subscriptions)
├─ 💳 Plans (/plans)
└─ 📄 Billing (/billing)

Settings:
└─ ⚙️ Settings (/settings)
```

---

## Feature Implementation Checklist

When implementing a new feature, use this checklist:

### 1. Determine User Type
- [ ] Public user (no auth)
- [ ] Authenticated user (customer)
- [ ] Case handler
- [ ] Admin
- [ ] Owner
- [ ] Platform admin

### 2. Determine Application
- [ ] `apps/web` (public/user/backoffice)
- [ ] `apps/backoffice` (legacy, avoid new features)
- [ ] `apps/saas` (platform admin)
- [ ] `apps/monitoring` (operations)

### 3. Determine Route Path
- [ ] Public route (`/`)
- [ ] User route (`/app/*`)
- [ ] Backoffice route (`/backoffice/*`)
- [ ] Platform admin route (`/saas/*`)

### 4. Determine Sidebar Placement
- [ ] Main Menu section (primary features)
- [ ] Administration section (secondary features)
- [ ] Settings section (configuration)

### 5. Determine Required Permissions
- [ ] Check RBAC permissions
- [ ] Add role checks to route
- [ ] Add permission checks to components
- [ ] Update sidebar visibility

### 6. Implementation
- [ ] Create route file
- [ ] Add to routes.ts
- [ ] Add sidebar item (if applicable)
- [ ] Implement page component
- [ ] Add i18n translations
- [ ] Add tests

---

## Common Patterns

### Pattern 1: List Page with Filters

```tsx
// Example: /backoffice/bookings
<PageHeader title="Bookings" />
<FilterBar filters={filterGroups} />
<DataTable data={bookings} columns={columns} />
```

### Pattern 2: Detail Page with Actions

```tsx
// Example: /backoffice/bookings/:id
<PageHeader 
  title="Booking Details"
  actions={<Button>Approve</Button>}
/>
<Card>Details</Card>
<Card>History</Card>
```

### Pattern 3: Dashboard with Stats

```tsx
// Example: /backoffice
<PageHeader title="Dashboard" />
<StatsGrid stats={statItems} columns={4} />
<Grid>Recent Activity</Grid>
```

### Pattern 4: Form Page

```tsx
// Example: /backoffice/listings/new
<PageHeader title="Create Listing" />
<Card>
  <Form>
    <FormField />
    <FormActions />
  </Form>
</Card>
```

---

## Related Documentation

- [PRD - Main Product Requirements](./prd/digilist-prd.md)
- [Requirements Index](./requirements/requirements.json)
- [Role System Constants](../../packages/server/core/src/constants/roles.ts)
- [RBAC Permissions](../../packages/shared/auth/src/rbac.ts)
- [Web App Documentation](../04-apps/web/README.md)
- [Backoffice App Documentation](../04-apps/backoffice/README.md)
- [Architecture Overview](../02-architecture/README.md)
- [Discovery Document](../06-governance/OPTION_C/DISCOVERY.md)

---

**Document Status:** Active  
**Maintained By:** Platform Team  
**Review Frequency:** Quarterly or when major features are added  
**Last Updated:** 2025-01-06
