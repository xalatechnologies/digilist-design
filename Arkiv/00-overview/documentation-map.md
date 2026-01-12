# Documentation Map

**How documentation is structured and maintained in the Digilist platform.**

---

## Structure Overview

```
docs/
├── 00-overview/          # Platform overview, glossary, this map
├── 01-product/          # Product requirements, roadmap
├── 02-architecture/     # System architecture, design decisions
├── 03-packages/         # Package documentation & runbooks
├── 04-apps/             # Application documentation & runbooks
├── 05-development/      # Development guides
├── 06-governance/       # Rules, standards, guardrails
└── 07-runbooks/         # Operational runbooks
```

---

## Documentation Types

### 1. Overview Documentation (`00-overview/`)

**Purpose:** Entry point for all documentation

**Contents:**
- `README.md` - Main entry point
- `project-overview.md` - High-level platform description
- `glossary.md` - Common terms
- `documentation-map.md` - This file

**Audience:** Everyone

---

### 2. Product Documentation (`01-product/`)

**Purpose:** Product requirements and specifications

**Contents:**
- `prd/` - Product Requirements Documents
- `srsd/` - Software Requirements Specifications
- `roadmap.md` - Product roadmap

**Audience:** Product managers, developers, stakeholders

---

### 3. Architecture Documentation (`02-architecture/`)

**Purpose:** System design and architectural decisions

**Contents:**
- `system-architecture.md` - Overall system design
- `shell-system.md` - Application shell architecture
- `design-system.md` - Design system architecture
- `decision-records/` - Architecture Decision Records (ADRs)
- `frontend-migration/` - Frontend consolidation documentation
- `listing-migration/` - UI Listing component migration

**Audience:** Architects, senior developers

---

### 4. Package Documentation (`03-packages/`)

**Purpose:** Documentation for each shared package

**Structure:**
```
03-packages/
├── index.md
├── ui/
│   ├── overview.md
│   ├── components.md
│   ├── runbook.md
│   └── ...
└── [package-name]/
```

**Contents per package:**
- `overview.md` - What the package does
- `[components|services|hooks].md` - Public API surface
- `design-decisions.md` - Why decisions were made
- `runbook.md` - How to develop, test, debug, release

**Audience:** Package maintainers, consumers

---

### 5. Application Documentation (`04-apps/`)

**Purpose:** Documentation for each application

**Structure:**
```
04-apps/
├── index.md
├── frontend/        # Single frontend app with areas
│   ├── overview.md
│   └── runbook.md
├── api/
│   ├── overview.md
│   └── runbook.md
└── worker/
    ├── overview.md
    └── runbook.md
```

**Contents per app:**
- `overview.md` - What the app does
- `runbook.md` - How to develop, test, debug, deploy

**Note:** The frontend is a single app with route-based areas (public, app, backoffice, docs, learning, monitoring).

**Audience:** App developers, DevOps

---

### 6. Development Documentation (`05-development/`)

**Purpose:** Guides for day-to-day development

**Contents:**
- `local-development.md` - Setting up local environment
- `testing-strategy.md` - Testing approach
- `e2e-playwright.md` - E2E testing guide
- `troubleshooting.md` - Common issues and solutions
- `migration/` - Migration project documentation

**Audience:** All developers

---

### 7. Governance Documentation (`06-governance/`)

**Purpose:** Rules, standards, and guardrails

**Contents:**
- `rules-and-guardrails.md` - Core rules
- `eslint-rules.md` - ESLint configuration
- `scanner-rules.md` - Code scanner rules
- `documentation-standards.md` - Documentation standards
- `ai-rules-contract.md` - AI agent rules reference
- `scanner/` - Automated scanner reports
- `OPTION_C/` - Alternative implementation approach

**Audience:** All developers, reviewers, AI agents

---

### 8. Runbooks (`07-runbooks/`)

**Purpose:** Operational procedures

**Contents:**
- `ui-runbook.md` - UI package maintenance
- `package-maintenance-runbook.md` - General package maintenance
- `release-runbook.md` - Release procedures
- `incident-response.md` - Incident handling
- `testing/` - Testing procedures and verification

**Audience:** DevOps, maintainers

---

## Documentation Standards

### File Naming

- Use kebab-case: `my-document.md`
- Be descriptive: `package-runbook.md` not `runbook.md`
- Use prefixes for types: `adr-0001-*.md`, `runbook-*.md`

### Structure

- Clear headings (H1 for title, H2 for major sections)
- Short paragraphs
- Bullet points preferred
- Code examples where helpful

### Links

- Use relative paths: `../02-architecture/system-architecture.md`
- Link to specific sections: `../02-architecture/system-architecture.md#authentication`
- Verify links work

### Maintenance

- Update docs when code changes
- Review quarterly
- Archive obsolete content

---

## Finding Documentation

### By Role

| Role | Primary Sections |
|------|------------------|
| **Product Manager** | `01-product/` |
| **Developer** | `05-development/`, `03-packages/`, `04-apps/` |
| **Architect** | `02-architecture/` |
| **DevOps** | `07-runbooks/` |
| **Auditor** | `06-governance/` |

### By Task

| Task | Location |
|------|----------|
| **Set up local environment** | `05-development/local-development.md` |
| **Understand a package** | `03-packages/[package]/overview.md` |
| **Work on an app** | `04-apps/[app]/runbook.md` |
| **Review architecture decision** | `02-architecture/decision-records/` |
| **Release a package** | `07-runbooks/package-maintenance-runbook.md` |

---

## Documentation Maintenance

### Responsibilities

- **Package maintainers** - Keep package docs current
- **App maintainers** - Keep app docs current
- **Architects** - Maintain architecture docs
- **Documentation team** - Overall structure and standards

### Review Cycle

- **Quarterly** - Review all docs for accuracy
- **On change** - Update docs when code changes
- **On request** - Update docs when issues found

---

## CI Enforcement

Documentation is enforced via CI:

- **Location check** - Fail if `.md` files outside `/docs` (except allowlist)
- **Link check** - Verify all links work
- **Structure check** - Verify required docs exist

See [Documentation Standards](../06-governance/documentation-standards.md) for details.

---

*Last Updated: 2026-01-04*
