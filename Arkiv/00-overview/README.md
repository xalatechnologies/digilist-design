# Digilist Platform Documentation

**Welcome to the Digilist Platform documentation.**

This is the **single source of truth** for all platform documentation.

---

## 🚀 Quick Start

- **New to the platform?** → Start with [Project Overview](./project-overview.md)
- **Developer?** → Jump to [Local Development](../05-development/local-development.md)
- **Looking for a specific package?** → Browse [Packages](../03-packages/index.md)
- **Working on an app?** → See [Applications](../04-apps/index.md)

---

## 📚 Documentation Structure

```
docs/
├── 00-overview/          # Start here - platform overview
├── 01-product/          # PRD, SRSD, roadmap
├── 02-architecture/     # System architecture, design decisions
├── 03-packages/         # Package documentation & runbooks
├── 04-apps/             # Application documentation & runbooks
├── 05-development/      # Development guides, testing, troubleshooting
├── 06-governance/       # Rules, guardrails, standards
├── 07-runbooks/        # Operational runbooks
├── 08-reports/          # Reports, audits, verification
└── 99-archive/          # Historical documentation
```

---

## 🎯 Documentation Principles

1. **Single Source of Truth** - All documentation lives in `/docs`
2. **Canonical** - One authoritative version of each document
3. **Versioned** - Important docs include version numbers
4. **Linked** - Documents cross-reference each other
5. **Maintained** - Documentation is treated as product infrastructure

---

## 📖 Key Documents

### Product
- [Product Requirements Document (PRD)](../01-product/prd/digilist-prd.md)
- [Software Requirements Specification (SRSD)](../01-product/srsd/digilist-srsd.md)
- [Roadmap](../01-product/roadmap.md)

### Architecture
- [System Architecture](../02-architecture/system-architecture.md)
- [Shell System](../02-architecture/shell-system.md)
- [Design System](../02-architecture/design-system.md)
- [Decision Records](../02-architecture/decision-records/index.md)

### Development
- [Local Development](../05-development/local-development.md)
- [Testing Strategy](../05-development/testing-strategy.md)
- [Troubleshooting](../05-development/troubleshooting.md)

### Governance
- [Rules and Guardrails](../06-governance/rules-and-guardrails.md)
- [Documentation Standards](../06-governance/documentation-standards.md)

---

## 🔍 Finding Information

### By Role

| Role | Start Here |
|------|------------|
| **Product Manager** | [PRD](../01-product/prd/digilist-prd.md) |
| **Developer** | [Local Development](../05-development/local-development.md) |
| **Architect** | [System Architecture](../02-architecture/system-architecture.md) |
| **Designer** | [Design System](../02-architecture/design-system.md) |
| **DevOps** | [Runbooks](../07-runbooks/) |
| **Auditor** | [Governance](../06-governance/rules-and-guardrails.md) |

### By Topic

| Topic | Location |
|-------|----------|
| **Authentication** | [Architecture](../02-architecture/system-architecture.md#authentication) |
| **Design Tokens** | [Design System](../02-architecture/design-system.md) |
| **API** | [API Documentation](../04-apps/api/overview.md) |
| **Testing** | [Testing Strategy](../05-development/testing-strategy.md) |
| **Deployment** | [Runbooks](../07-runbooks/release-runbook.md) |

---

## 📝 Contributing to Documentation

1. **Location** - All docs go in `/docs` (no exceptions)
2. **Format** - Markdown with clear headings
3. **Style** - Clear, concise, written for junior developers AND AI agents
4. **Links** - Use relative paths within `/docs`
5. **Updates** - Update docs when code changes

See [Documentation Standards](../06-governance/documentation-standards.md) for details.

---

## 🔗 External Resources

- [GitHub Repository](https://github.com/Digilist-no/digilist-platform)
- [Design System Storybook](https://storybook.digilist.no)
- [API Documentation](https://api.digilist.no/docs)

---

*Last Updated: 2025-01-27*
