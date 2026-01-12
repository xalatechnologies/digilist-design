# Product Documentation

**Comprehensive product requirements and specifications for the Digilist platform.**

---

## Overview

This directory contains all product-related documentation for the Digilist platform, including:

- **Product Requirements Documents (PRD)** - What we're building and why
- **Software Requirements Specifications (SRSD)** - How we're building it
- **Roadmap** - When we're building it

---

## Documentation Structure

```
docs/01-product/
├── README.md                    # This file
├── roadmap.md                   # Project roadmap & requirements plan
├── prd/                        # Product Requirements Documents
│   ├── index.md               # PRD index and status
│   ├── digilist-prd.md        # Main PRD (v2.0)
│   └── feature-prds/          # Feature-specific PRDs
│       ├── digilist-backoffice.md
│       ├── digilist-docs.md
│       ├── digilist-learning-hub.md
│       └── digilist-mobile.md
└── srsd/                       # Software Requirements Specifications
    ├── index.md               # SRSD index and status
    ├── digilist-srsd.md       # Main SRSD (v1.0)
    ├── non-functional-requirements.md
    └── REQUIREMENTS_VALIDATION_REPORT.md
```

---

## Quick Start

### For Product Managers

1. Start with **[PRD](./prd/digilist-prd.md)** - Product vision, features, user personas
2. Review **[Roadmap](./roadmap.md)** - Release planning and milestones
3. Check **[Feature PRDs](./prd/feature-prds/)** - Feature-specific requirements

### For Engineers

1. Start with **[SRSD](./srsd/digilist-srsd.md)** - Technical requirements and specifications
2. Review **[Non-Functional Requirements](./srsd/non-functional-requirements.md)** - Performance, security, accessibility
3. Reference **[PRD](./prd/digilist-prd.md)** - Product context and user stories

### For Stakeholders

1. Read **[PRD Executive Summary](./prd/digilist-prd.md#1-executive-summary)** - Product vision and problem statement
2. Review **[Success Metrics](./prd/digilist-prd.md#6-success-metrics)** - How we measure success
3. Check **[Roadmap](./roadmap.md#8-product-roadmap)** - Release timeline

---

## Document Status

| Document | Version | Last Updated | Status | Owner |
|----------|--------|--------------|--------|-------|
| **PRD** | 2.0 | 2025-01 | Active | Product Team |
| **SRSD** | 1.0 | 2024-12 | Active | Engineering Team |
| **Roadmap** | 2.0 | 2025-01 | Active | Project Management |
| **Non-Functional Requirements** | 1.0 | 2024-12 | Active | Engineering Team |

---

## Key Concepts

### Listing Types

Digilist supports six listing types, each optimized for different use cases:

- **SPACE** - Physical spaces (sports halls, meeting rooms)
- **RESOURCE** - Equipment and resources
- **EVENT** - Event-based bookings
- **SERVICE** - Service-based bookings
- **VEHICLE** - Vehicle rentals
- **OTHER** - Custom/other types

### Booking Models

The platform supports six booking models:

- **TIME_RANGE** - Start and end time
- **SLOTS** - Pre-defined time slots
- **ALL_DAY** - Full day booking
- **QUANTITY** - Quantity-based
- **CAPACITY** - Capacity-based
- **PACKAGE** - Pre-defined packages

### Actor Types

Pricing tiers based on organization type:

- **private** - Individual citizens (0% discount)
- **business** - Commercial entities (0% discount)
- **sports_club** - Sports organizations (30% discount, NIF verified)
- **youth_organization** - Youth groups (50% discount)
- **school** - Educational institutions (100% free)
- **municipality** - Municipal departments (100% free)

---

## Requirements Traceability

All requirements are tracked in the [requirements.json](../../requirements/requirements.json) file:

- **DOM-001** through **DOM-010**: Domain requirements
- **SAAS-001** through **SAAS-010**: Platform/SaaS requirements
- **TND-001** through **TND-009**: Tender requirements
- **SEC-001** through **SEC-004**: Security requirements

Each requirement in the PRD and SRSD maps to these IDs for full traceability.

---

## Related Documentation

### Architecture & Design

- [System Architecture](../../02-architecture/system-architecture.md) - System design and architecture
- [Design System](../../02-architecture/design-system.md) - Design tokens and components
- [Decision Records](../../02-architecture/decision-records/) - Architecture decisions

### Development

- [Local Development](../../05-development/local-development.md) - Developer setup
- [Testing Strategy](../../05-development/testing-strategy.md) - Test requirements
- [API Documentation](../../04-apps/api/) - API reference

### Governance

- [Rules and Guardrails](../../06-governance/rules-and-guardrails.md) - Development standards
- [Documentation Standards](../../06-governance/documentation-standards.md) - Documentation guidelines

---

## Document Governance

### Review Process

- **PRD:** Quarterly review by Product Team
- **SRSD:** Monthly review by Engineering Team
- **Roadmap:** Monthly review by Project Management
- **Feature PRDs:** Reviewed when features are updated

### Change Management

- **Version Control:** All changes tracked in Git
- **Change Log:** Document history maintained in each document
- **Approval:** Changes require appropriate owner approval

### Maintenance

- **Owners:** Product Team (PRD), Engineering Team (SRSD), Project Management (Roadmap)
- **Contributors:** Product, Engineering, Design, Stakeholders
- **Update Frequency:** As needed for new features, regular reviews per schedule

---

## Getting Help

- **Product Questions:** Contact Product Team
- **Technical Questions:** Contact Engineering Team
- **Documentation Issues:** Create issue in repository
- **Suggestions:** Submit via GitHub Discussions

---

*Last Updated: 2025-01-27*  
*Next Review: February 2025*
