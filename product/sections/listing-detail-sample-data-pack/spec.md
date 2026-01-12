# Listing Detail Sample Data Pack Specification

## Overview

Defines realistic sample data for validating the Listing Detail UI across different listing types and booking models. This data pack ensures that all UI components, states, and edge cases can be properly tested and demonstrated.

The sample data includes four distinct listings representing different booking models (TIME_RANGE, QUANTITY, SLOT, PACKAGE) with variations in opening hours, booking rules, and availability patterns. This comprehensive dataset allows for thorough UI validation and testing.

## User Flows

- User views Space listing with TIME_RANGE booking model
- User views Equipment listing with QUANTITY booking model
- User views Space listing with SLOT booking model
- User views Service listing with PACKAGE booking model
- User encounters different opening hours across listings
- User sees various booking rules and constraints
- User views listings with blocked and available slots
- User interacts with listings that have different capacity/quantity limits

## UI Requirements

### Sample Listings

**1. Space – Conference Room:**
- Booking model: TIME_RANGE
- Capacity: 50 persons
- Facilities: Projector, WiFi, Video conferencing
- Standard opening hours
- Normal availability patterns

**2. Equipment – Sound System:**
- Booking model: QUANTITY
- Quantity: 5 units available
- Price per unit
- Different opening hours
- Quantity-based booking rules

**3. Space – Sports Hall:**
- Booking model: SLOT
- Fixed time slots (e.g., 1-hour slots)
- Seasonal availability
- Different booking rules (advance booking limits)
- Blocked slots for maintenance

**4. Service – Event Package:**
- Booking model: PACKAGE
- Includes equipment + staff
- Package-specific pricing
- Different availability patterns
- Package-specific rules

### Data Variations

**Opening Hours Variations:**
- Standard: Monday-Friday 08:00-22:00, Saturday 09:00-20:00, Sunday 10:00-18:00
- Extended: Monday-Sunday 06:00-24:00
- Limited: Monday-Friday 09:00-17:00 only
- Weekend only: Saturday-Sunday 10:00-18:00

**Booking Rules Variations:**
- Minimum booking duration (e.g., 2 hours)
- Maximum advance booking (e.g., 3 months)
- Lead time requirements (e.g., 24 hours notice)
- Buffer time between bookings
- Maximum concurrent bookings

**Availability Patterns:**
- Fully available (all slots open)
- Partially booked (mix of available/booked slots)
- Seasonal blocks (certain periods unavailable)
- Maintenance blocks (specific dates/times)
- Fully booked (no availability)

**Capacity/Quantity Variations:**
- High capacity (50+)
- Medium capacity (20-50)
- Low capacity (<20)
- Multiple units (quantity-based)
- Single unit (implicit)

### Data Structure Requirements

- Complete listing information (name, type, location, description)
- Media assets (images with proper URLs and alt text)
- Facility tags with icons
- Additional services with descriptions and pricing
- Rules with categories and required flags
- FAQ items
- Contact information
- Opening hours
- Booking model configuration
- Time policy settings
- Availability data (allocations)

## Configuration

- shell: true
