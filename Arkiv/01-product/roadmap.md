# Project Roadmap & Requirements Plan

## Digilist Platform

**Version:** 2.0  
**Last Updated:** January 2025  
**Status:** Active Development  
**Document Owner:** Project Management  
**Review Cycle:** Monthly

---

## Document Purpose

This document serves dual purposes:
1. **Project Requirements Plan (PRP)** - Project organization, team structure, workflows
2. **Product Roadmap** - Release planning, milestones, feature timeline

For detailed product requirements, see [PRD](./prd/digilist-prd.md).  
For technical requirements, see [SRSD](./srsd/digilist-srsd.md).

---

## 1. Project Overview

### 1.1 Project Identity

| Attribute | Value |
|-----------|-------|
| **Project Name** | Digilist Platform |
| **Project Type** | SaaS Web Application |
| **Target Market** | Norwegian Municipalities |
| **Development Model** | Agile/Scrum |
| **Repository** | Monorepo (pnpm workspaces) |

### 1.2 Project Objectives

1. **Primary:** Deliver a production-ready municipal listing booking platform
2. **Secondary:** Establish reusable component library and design system
3. **Tertiary:** Create reference implementation for Norwegian public sector SaaS

### 1.3 Success Criteria

| Criterion | Metric | Target |
|-----------|--------|--------|
| Feature Completeness | PRD requirements delivered | 100% P0, 90% P1 |
| Code Quality | Test coverage | > 80% |
| Performance | LCP | < 2.5s |
| Accessibility | WCAG compliance | AA |
| Security | Vulnerability scan | 0 critical/high |

---

## 2. Project Organization

### 2.1 Team Structure

```
┌─────────────────────────────────────────────────────────┐
│                    PROJECT TEAM                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Product   │  │ Engineering │  │   Design    │    │
│  │   Owner     │  │    Lead     │  │    Lead     │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
│         │                │                │            │
│         ▼                ▼                ▼            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Business   │  │  Frontend   │  │    UX       │    │
│  │  Analyst    │  │  Developers │  │  Designer   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
│                   ┌─────────────┐                       │
│                   │   Backend   │                       │
│                   │  Developers │                       │
│                   └─────────────┘                       │
│                                                         │
│                   ┌─────────────┐                       │
│                   │   DevOps    │                       │
│                   │  Engineer   │                       │
│                   └─────────────┘                       │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Responsibilities

| Role | Responsibilities |
|------|------------------|
| **Product Owner** | Backlog prioritization, stakeholder management, acceptance |
| **Engineering Lead** | Architecture decisions, code quality, technical direction |
| **Design Lead** | Design system ownership, UX standards, accessibility |
| **Frontend Developers** | UI implementation, client-side logic, performance |
| **Backend Developers** | API development, business logic, integrations |
| **DevOps Engineer** | CI/CD, infrastructure, monitoring, security |
| **QA Engineer** | Test strategy, automation, quality gates |

---

## 3. Technical Requirements

### 3.1 Development Environment

| Component | Requirement |
|-----------|-------------|
| **Runtime** | Node.js 22+ |
| **Package Manager** | pnpm 9+ |
| **Container Runtime** | Podman (preferred) or Docker |
| **IDE** | VS Code with recommended extensions |
| **Version Control** | Git with conventional commits |

### 3.2 Technology Stack

#### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React Router | 7.x | Frontend routing framework |
| React | 19.x | UI library |
| React Router | 7.x | Routing (backoffice, learning-hub) |
| TailwindCSS | 4.x | Styling |
| Tanstack Query | 5.x | Data fetching |
| Zod | 3.x | Validation |

#### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Fastify | 5.x | API framework |
| Drizzle ORM | 0.38.x | Database ORM |
| PostgreSQL | 16.x | Database |
| Redis | 7.x | Cache/sessions |
| BullMQ | 5.x | Job queue |

#### Infrastructure

| Technology | Purpose |
|------------|---------|
| Podman/Docker | Containerization |
| Kubernetes | Orchestration |
| GitHub Actions | CI/CD |
| Azure | Cloud hosting |

### 3.3 Code Quality Standards

| Standard | Requirement |
|----------|-------------|
| TypeScript | Strict mode, no `any` |
| ESLint | Zero errors, zero warnings |
| Prettier | Consistent formatting |
| Test Coverage | Minimum 80% |
| File Length | Maximum 200 lines |
| Function Length | Maximum 20 lines |

### 3.4 Design System Requirements

| Requirement | Description |
|-------------|-------------|
| **Token-only Styling** | No hardcoded colors/spacing |
| **Component Library** | shadcn-based registry |
| **Accessibility** | WCAG 2.1 AA |
| **Dark Mode** | CSS variable-based theming |
| **Documentation** | Storybook for all components |

---

## 4. Development Workflow

### 4.1 Git Workflow

```
main (production)
  │
  └── staging (pre-production)
        │
        └── test (QA)
              │
              └── dev (development)
                    │
                    ├── feature/ISSUE-123-feature-name
                    ├── bugfix/ISSUE-456-bug-description
                    └── hotfix/ISSUE-789-critical-fix
```

### 4.2 Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/ISSUE-{number}-{description}` | `feature/ISSUE-123-add-booking-cart` |
| Bugfix | `bugfix/ISSUE-{number}-{description}` | `bugfix/ISSUE-456-fix-date-picker` |
| Hotfix | `hotfix/ISSUE-{number}-{description}` | `hotfix/ISSUE-789-critical-auth-fix` |

### 4.3 Commit Convention

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

**Example:**
```
feat(bookings): add recurring booking support

Implements weekly, biweekly, and monthly recurrence patterns.
Includes conflict detection for individual occurrences.

Closes #123
```

### 4.4 Pull Request Process

1. **Create PR** from feature branch to `dev`
2. **Automated Checks:**
   - TypeScript compilation
   - ESLint
   - Unit tests
   - Build verification
3. **Code Review:** Minimum 1 approval required
4. **Merge:** Squash and merge

### 4.5 Release Process

| Environment | Branch | Trigger | Approval |
|-------------|--------|---------|----------|
| Development | `dev` | Auto on merge | None |
| Test | `test` | Manual | QA |
| Staging | `staging` | Manual | Product |
| Production | `main` | Manual | Product + Engineering |

---

## 5. Testing Strategy

### 5.1 Test Pyramid

```
                    ┌─────────┐
                    │   E2E   │  (5-10%)
                    │  Tests  │
                   ┌┴─────────┴┐
                   │Integration│  (20-30%)
                   │   Tests   │
                  ┌┴───────────┴┐
                  │    Unit     │  (60-70%)
                  │    Tests    │
                  └─────────────┘
```

### 5.2 Test Types

| Type | Tool | Coverage Target |
|------|------|-----------------|
| Unit | Vitest | 80% |
| Integration | Vitest + Supertest | Critical paths |
| E2E | Playwright | Top 5 user journeys |
| Visual Regression | Chromatic | All components |
| Accessibility | axe-core | All pages |

### 5.3 Critical Test Paths

1. **Authentication Flow**
   - Login via ID-porten
   - Session management
   - Logout

2. **Booking Flow**
   - Search listings
   - Select time slot
   - Complete booking
   - Payment

3. **Approval Flow**
   - Submit booking
   - Review request
   - Approve/reject

4. **Payment Flow**
   - Calculate price
   - Process payment
   - Refund

5. **Admin Flow**
   - Create listing
   - Configure rules
   - Manage users

---

## 6. Security Requirements

### 6.1 Authentication

| Requirement | Implementation |
|-------------|----------------|
| National ID | ID-porten OIDC |
| Session Management | httpOnly cookies |
| Session Duration | 8 hours (configurable) |
| MFA | Handled by ID-porten |

### 6.2 Authorization

| Scope | Description | Access |
|-------|-------------|--------|
| `user` | Personal portal | Own bookings, profile |
| `org` | Organization | Org listings, members |
| `tenant` | Tenant admin | All orgs, billing |
| `saas` | Platform admin | All tenants |

### 6.3 Data Protection

| Measure | Implementation |
|---------|----------------|
| Encryption in Transit | TLS 1.3 |
| Encryption at Rest | AES-256 |
| PII Handling | GDPR compliant |
| Audit Logging | All state changes |

### 6.4 Security Scanning

| Tool | Frequency | Threshold |
|------|-----------|-----------|
| Dependabot | Daily | Auto-merge patch |
| npm audit | On PR | 0 critical |
| Snyk | Weekly | 0 high |
| OWASP ZAP | Monthly | 0 medium |

---

## 7. Infrastructure Requirements

### 7.1 Development Environment

| Service | Port | Purpose |
|---------|------|---------|
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache/Queue |
| pgAdmin | 5050 | DB Management |
| Redis Commander | 8081 | Redis UI |
| Mailpit | 8025 | Email testing |

### 7.2 Application Ports

| Application | Port | Domain | Status |
|-------------|------|--------|--------|
| API | 3020 | api.digilist.no | Active |
| Frontend | 8000 | digilist.no | Active |
| Backoffice | 3005 | admin.digilist.no | Active |
| Learning Hub | 3024 | learn.digilist.no | Planned |
| Docs | 3022 | docs.digilist.no | Active |
| Monitoring | 3025 | monitoring.digilist.no | Active |

### 7.3 Production Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| API Instances | 2 | 4 |
| Worker Instances | 1 | 2 |
| PostgreSQL | 4 vCPU, 16GB RAM | 8 vCPU, 32GB RAM |
| Redis | 2GB RAM | 4GB RAM |

---

## 8. Product Roadmap

> **Note:** This section provides the product roadmap. For detailed feature requirements, see [PRD](./prd/digilist-prd.md).

### 8.1 Release Timeline

```
2025 Q1 ──────────────────────────────────────────────────────────────►
         │
         ├─ Phase 1: Foundation (MVP)
         │  ├─ Core booking engine (all 6 models)
         │  ├─ Listing management (all 6 types)
         │  ├─ ID-porten authentication
         │  ├─ Basic approval workflow
         │  └─ Multi-tenant architecture
         │
2025 Q2 ──────────────────────────────────────────────────────────────►
         │
         ├─ Phase 2: Payments & Scale
         │  ├─ Vipps integration
         │  ├─ Invoice generation
         │  ├─ Recurring bookings
         │  ├─ Public calendar
         │  └─ Mobile-responsive web
         │
2025 Q3 ──────────────────────────────────────────────────────────────►
         │
         ├─ Phase 3: Advanced Features
         │  ├─ Rules engine enhancements
         │  ├─ Advanced reporting
         │  ├─ RCO integration
         │  ├─ Seasonal rental allocation
         │  └─ Calendar integrations
         │
2025 Q4 ──────────────────────────────────────────────────────────────►
         │
         ├─ Phase 4: Enterprise
         │  ├─ Cross-municipality booking
         │  ├─ Public API
         │  ├─ Advanced analytics
         │  ├─ Custom branding
         │  └─ Mobile apps (iOS/Android)
```

### 8.2 Phase 1: Foundation (Q1 2025) - MVP

**Goal:** Deliver production-ready MVP with core booking functionality

**Key Deliverables:**
- ✅ Core booking engine supporting all 6 booking models
- ✅ Listing management with all 6 listing types
- ✅ ID-porten authentication integration
- ✅ Basic approval workflow (auto-approve, approval required)
- ✅ Multi-tenant architecture with tenant isolation
- ✅ RBAC and permissions system
- ✅ Email notifications
- ✅ Basic reporting

**Success Criteria:**
- 100% P0 requirements implemented
- Test coverage > 95%
- Performance targets met (LCP < 2.5s)
- Security audit passed
- First municipality onboarded

**Milestones:**
- Week 4: Core booking engine complete
- Week 8: ID-porten integration complete
- Week 12: MVP ready for pilot

### 8.3 Phase 2: Payments & Scale (Q2 2025)

**Goal:** Enable payments and scale to multiple municipalities

**Key Deliverables:**
- Vipps payment integration (P0)
- Invoice generation for organizations
- Recurring booking support
- Public availability calendar
- Mobile-responsive web application
- Advanced search and filtering
- BRREG organization verification

**Success Criteria:**
- Payment success rate > 98%
- Mobile usage > 40%
- Online booking rate > 80%
- 3+ municipalities onboarded

**Milestones:**
- Week 16: Vipps integration complete
- Week 20: Recurring bookings live
- Week 24: Public calendar launched

### 8.4 Phase 3: Advanced Features (Q3 2025)

**Goal:** Advanced features for complex use cases

**Key Deliverables:**
- Enhanced rules engine with templates
- Advanced reporting and analytics dashboard
- RCO lock code integration
- Seasonal rental allocation engine
- Calendar integrations (iCal, Google, Outlook)
- NIF sports club verification
- Age restriction enforcement

**Success Criteria:**
- Auto-approval rate > 60%
- Listing utilization > 70%
- Integration uptime > 99.9%
- 5+ municipalities onboarded

**Milestones:**
- Week 28: Rules engine enhancements
- Week 32: RCO integration complete
- Week 36: Calendar integrations live

### 8.5 Phase 4: Enterprise (Q4 2025)

**Goal:** Enterprise features and scalability

**Key Deliverables:**
- Cross-municipality booking support
- Public REST API for third-party integrations
- Advanced analytics dashboard
- Custom branding per tenant
- White-label support
- Native mobile apps (iOS/Android)
- Altinn integration

**Success Criteria:**
- 10+ municipalities onboarded
- API adoption by 3+ third parties
- Customer satisfaction > 4.2/5
- System handles 1,000+ concurrent users

**Milestones:**
- Week 40: Public API launched
- Week 44: Mobile apps in beta
- Week 48: Enterprise features complete

### 8.6 Future Phases (2026+)

**Potential Features:**
- AI-powered booking recommendations
- Predictive analytics for utilization
- Advanced access control (NFC, biometrics)
- International expansion (Sweden, Denmark)
- Marketplace for third-party integrations
- Advanced reporting with ML insights

---

## 9. Documentation Requirements

### 9.1 Documentation Types

| Type | Audience | Location |
|------|----------|----------|
| PRD | Product, Business | `/docs/01-product/prd/digilist-prd.md` |
| SRSD | Engineering, QA | `/docs/01-product/srsd/digilist-srsd.md` |
| API Reference | Developers | `/docs/04-apps/api/` |
| User Guide | End users | Learning Hub |
| Admin Guide | Administrators | `/docs/04-apps/backoffice/` |
| Architecture | Engineering | `/docs/02-architecture/` |

### 9.2 Code Documentation

| Requirement | Standard |
|-------------|----------|
| Public Functions | JSDoc comments |
| Complex Logic | Inline comments |
| API Endpoints | OpenAPI/Swagger |
| Components | Storybook stories |
| Domain Logic | TypeScript interfaces with JSDoc |

### 9.3 Documentation Updates

- Documentation updated with code changes
- PRD reviewed quarterly
- SRSD reviewed monthly
- API docs auto-generated from code
- Changelog updated on each release
- All docs in `/docs` directory (AI_RULES.md compliance)

---

## 10. Quality Gates

### 10.1 Definition of Done

- [ ] Code complete and compiles
- [ ] Unit tests written and passing
- [ ] Integration tests for critical paths
- [ ] TypeScript strict compliance
- [ ] ESLint passing (0 errors/warnings)
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Accessibility verified
- [ ] Design token compliance
- [ ] Localization complete (nb/en)

### 10.2 Release Criteria

| Gate | Requirement |
|------|-------------|
| Code Quality | All checks passing |
| Test Coverage | > 80% |
| Performance | LCP < 2.5s |
| Security | 0 critical/high vulnerabilities |
| Accessibility | WCAG AA |
| Documentation | Updated |

---

## 11. Risk Management

### 11.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| ID-porten integration complexity | High | Medium | Early POC, dedicated resource |
| Performance at scale | Medium | Medium | Load testing, caching strategy |
| Data migration issues | Medium | Low | Migration scripts, rollback plan |
| Third-party API changes | Medium | Low | Version pinning, abstraction layer |

### 11.2 Operational Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Key person dependency | High | Medium | Documentation, knowledge sharing |
| Scope creep | Medium | High | Strict backlog management |
| Timeline slippage | Medium | Medium | Buffer in estimates, MVP focus |

---

## 12. Communication Plan

### 12.1 Meetings

| Meeting | Frequency | Participants |
|---------|-----------|--------------|
| Daily Standup | Daily | Development team |
| Sprint Planning | Bi-weekly | All |
| Sprint Review | Bi-weekly | All + stakeholders |
| Retrospective | Bi-weekly | Development team |
| Architecture Review | Monthly | Tech leads |

### 12.2 Channels

| Channel | Purpose |
|---------|---------|
| Slack #digilist-dev | Development discussion |
| Slack #digilist-alerts | Production alerts |
| GitHub Issues | Task tracking |
| GitHub Discussions | Technical discussions |

---

## 13. Appendices

### A. Tool Configuration

See individual tool configuration files in repository root:
- `eslint.config.js` - ESLint configuration
- `vitest.config.ts` - Test configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration

### B. Environment Variables

See `.env.example` files in each application directory:
- `apps/api/.env.example`
- `apps/frontend/.env.example`
- `apps/backoffice/.env.example`

### C. API Contracts

See OpenAPI specifications in `/docs/04-apps/api/`:
- API endpoint documentation
- Request/response schemas
- Authentication requirements

### D. Related Documentation

- [Product Requirements Document (PRD)](./prd/digilist-prd.md)
- [Software Requirements Specification (SRSD)](./srsd/digilist-srsd.md)
- [System Architecture](../../02-architecture/system-architecture.md)
- [Requirements Database](../../requirements/requirements.json)

### E. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 2024 | Project Management | Initial version |
| 2.0 | January 2025 | Project Management | Added roadmap section, enhanced structure, updated ports |

---

**Document Owner:** Project Management  
**Review Cycle:** Monthly  
**Next Review:** February 2025  
**Approval:** Product Owner, Engineering Lead
