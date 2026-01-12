# Non-Functional Requirements

**Extracted from:** Main SRSD document

---

## Performance Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PERF-001 | Page load time (LCP) | < 2.5s |
| NFR-PERF-002 | Time to Interactive (TTI) | < 3.5s |
| NFR-PERF-003 | API response time (p50) | < 200ms |
| NFR-PERF-004 | API response time (p95) | < 500ms |
| NFR-PERF-005 | Concurrent users supported | 1,000+ |
| NFR-PERF-006 | Database query time (p95) | < 100ms |

---

## Security Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-SEC-001 | TLS 1.3 for all connections | P0 |
| NFR-SEC-002 | httpOnly, Secure, SameSite cookies | P0 |
| NFR-SEC-003 | CSRF protection | P0 |
| NFR-SEC-004 | SQL injection prevention (ORM) | P0 |
| NFR-SEC-005 | XSS prevention (CSP headers) | P0 |
| NFR-SEC-006 | Rate limiting (100 req/min/IP) | P0 |
| NFR-SEC-007 | Input validation (Zod schemas) | P0 |
| NFR-SEC-008 | Audit logging for all state changes | P0 |
| NFR-SEC-009 | PII encryption at rest | P1 |
| NFR-SEC-010 | Secrets in environment variables only | P0 |

---

## Reliability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-REL-001 | System availability | 99.9% |
| NFR-REL-002 | Mean Time to Recovery (MTTR) | < 1 hour |
| NFR-REL-003 | Data backup frequency | Daily |
| NFR-REL-004 | Backup retention | 30 days |
| NFR-REL-005 | Recovery Point Objective (RPO) | < 24 hours |

---

## Accessibility Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-A11Y-001 | WCAG 2.1 AA compliance | P0 |
| NFR-A11Y-002 | Keyboard navigation | P0 |
| NFR-A11Y-003 | Screen reader support | P0 |
| NFR-A11Y-004 | Color contrast 4.5:1 (text) | P0 |
| NFR-A11Y-005 | Focus visible indicators | P0 |
| NFR-A11Y-006 | Touch targets 44x44px minimum | P0 |

---

## Localization Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-L10N-001 | Norwegian (nb) as primary | P0 |
| NFR-L10N-002 | English (en) as fallback | P0 |
| NFR-L10N-003 | French (fr) support | P2 |
| NFR-L10N-004 | Arabic (ar) with RTL | P2 |
| NFR-L10N-005 | Date format: dd.MM.yyyy | P0 |
| NFR-L10N-006 | Time format: HH:mm (24h) | P0 |
| NFR-L10N-007 | Currency: NOK | P0 |

---

## Related Documentation

- [Main SRSD](./digilist-srsd.md)
- [System Architecture](../../02-architecture/system-architecture.md)

---

*Last Updated: 2025-01-27*
