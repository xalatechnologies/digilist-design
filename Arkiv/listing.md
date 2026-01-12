1. domain.listings - Primary Bookable Entity
sql
CREATE TABLE domain.listings (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  org_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  listing_type text NOT NULL, -- 'SPACE' | 'RESOURCE' | 'EVENT' | 'SERVICE' | 'VEHICLE' | 'OTHER'
  booking_model text NOT NULL, -- 'TIME_RANGE' | 'SLOT' | 'ALL_DAY' | 'QUANTITY' | 'CAPACITY' | 'PACKAGE'
  status text DEFAULT 'draft', -- 'draft' | 'published' | 'archived' | 'maintenance'
  capacity integer,
  quantity integer,
  default_bookable_unit_id uuid REFERENCES domain.bookable_units(id),
  metadata jsonb,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

2. domain.bookable_units - Unit of Availability
sql
CREATE TABLE domain.bookable_units (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  listing_id uuid NOT NULL REFERENCES domain.listings(id),
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  unit_type text, -- 'space' | 'equipment' | 'resource' | 'service'
  bookable_mode text, -- 'time_slot' | 'date_range' | 'hybrid'
  charge_unit text, -- 'per_slot' | 'per_hour' | 'per_day' | 'per_week' | 'per_booking' | 'per_unit_quantity'
  capacity integer,
  min_capacity integer,
  base_price_cents integer NOT NULL DEFAULT 0,
  currency text DEFAULT 'NOK',
  is_default boolean DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer DEFAULT 0,
  time_policy_id uuid,
  extra jsonb
);

3. domain.booking_time_policies - Time Constraints
sql
CREATE TABLE domain.booking_time_policies (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  bookable_unit_id uuid REFERENCES domain.bookable_units(id),
  bookable_mode text, -- 'time_slot' | 'date_range' | 'hybrid'
  timezone text DEFAULT 'Europe/Oslo',
  slot_step_minutes integer DEFAULT 60,
  default_duration_minutes integer DEFAULT 60,
  min_duration_minutes integer DEFAULT 60,
  max_duration_minutes integer,
  day_checkin_time text,  -- HH:mm
  day_checkout_time text, -- HH:mm
  min_days integer,
  max_days integer,
  min_lead_time_minutes integer DEFAULT 60,
  max_advance_days integer DEFAULT 90,
  buffer_before_minutes integer DEFAULT 0,
  buffer_after_minutes integer DEFAULT 0,
  rounding text DEFAULT 'ceil',
  enforce_boundary_alignment boolean DEFAULT true
);

4. domain.bookings - Booking Records
sql
CREATE TABLE domain.bookings (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  listing_id uuid NOT NULL REFERENCES domain.listings(id),
  bookable_unit_id uuid REFERENCES domain.bookable_units(id),
  user_id uuid NOT NULL,
  status text, -- 'pending' | 'confirmed' | 'cancelled' | 'completed'
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  quantity integer DEFAULT 1,
  total_price_cents integer,
  currency text DEFAULT 'NOK',
  notes text,
  metadata jsonb,
  created_at timestamptz DEFAULT NOW()
);

5. domain.allocations - Anti-Double Booking
sql
CREATE TABLE domain.allocations (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  listing_id uuid NOT NULL REFERENCES domain.listings(id),
  booking_id uuid REFERENCES domain.bookings(id),
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  quantity integer DEFAULT 1,
  allocation_type text, -- 'BOOKING' | 'BLOCK' | 'MAINTENANCE' | 'SEASONAL'
  status text -- 'active' | 'released' | 'expired'
);

6. Other Domain Tables
Table	Purpose
listing_media	Images/videos for listings
listing_categories	Category taxonomy
listing_event_details	Event-specific data
pricing_rules	Dynamic pricing logic
availability_rules	Operating hours, blackouts
activity_calendar	Calendar events
payments	Payment records
invoices	Invoice generation
refunds	Refund processing
add_ons	Optional extras (e.g., equipment rental)
recurring_bookings	Recurring booking patterns
shareable_links	Public booking links