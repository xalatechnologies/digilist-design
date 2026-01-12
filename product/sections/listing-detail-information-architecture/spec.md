# Listing Detail Information Architecture Specification

## Overview

Defines the structural information architecture of the Listing Detail page. This specification outlines the page structure, information hierarchy, and progressive disclosure patterns that guide users through understanding a listing and initiating a booking.

The Listing Detail page is the primary entry point for users to view listing information, understand availability, and select booking parameters. The architecture prioritizes clarity and progressive disclosure, ensuring users can quickly understand what the listing is, where it is, and how to proceed with booking.

## User Flows

- User arrives at Listing Detail page from search results or direct link
- User views hero image and thumbnails to understand the listing visually
- User reads listing header (type, name, location) to identify the listing
- User navigates tabs to discover details (Oversikt, Aktivitetskalender, Retningslinjer, FAQ)
- User views availability calendar to understand when the listing is available
- User selects time slots or booking parameters based on booking model
- User reviews selected parameters before proceeding to next booking step

## UI Requirements

### Page Structure

- **Global header:** Logo, search field (centered), login button
- **Breadcrumb navigation:** Shows path from home to current listing
- **Hero section:** Primary image (large) with thumbnail navigation (3 thumbnails)
- **Listing header:** Type label (badge), name (H1), address with icon, Like/Share actions
- **Section navigation (tabs):** Four tabs: Oversikt, Aktivitetskalender, Retningslinjer, Ofte stilte spørsmål
- **Main content area:** Tab-specific content displayed below tabs
- **Booking section:** Availability calendar, booking process steps, selected time summary

### Information Hierarchy

1. **What is this listing?** - Hero image, type badge, name
2. **Where is it?** - Address with location icon
3. **What can I use it for?** - Description, capacity, facilities (Oversikt tab)
4. **What rules apply?** - Retningslinjer tab
5. **When is it available?** - Aktivitetskalender tab, Booking section calendar
6. **What happens next?** - Booking process steps, selected time summary

### Progressive Disclosure

- **Details hidden behind tabs:** Detailed information (description, rules, calendar, FAQ) is organized in tabs to reduce cognitive load
- **Booking selection visible when relevant:** Booking section is always visible but only interactive when user is ready to select parameters
- **Tab content loads on demand:** Only active tab content is rendered/displayed

### Layout Principles

- **Desktop:** Two-column layout (main content + sidebar) for Oversikt tab; full-width for other tabs
- **Mobile:** Single-column layout with tabs scrollable horizontally
- **Booking section:** Full-width below tabs, responsive grid (calendar + summary panel)

## Configuration

- shell: true
