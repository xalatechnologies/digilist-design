---
source: docs/knowledge_base/requirements/digilist-docs.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.265Z
---

---
source: docs/knowledge_base/requirements/digilist-docs.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.225Z
---

---
source: digilist/docs/claude/digilist-docs.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.169Z
---

# Docs (Internal Documentation) — CLAUDE.md

## Inheritance
- Inherits root /CLAUDE.md; adds constraints; stricter wins.

## Purpose & Objectives
- Internal knowledge base and architecture docs aligned to RAG ingestion.
- Objectives: accuracy, currency, source-linked content, and RBAC visibility.

## Content Boundaries (Must)
- End-user onboarding/training content belongs in `apps/learning-hub`.
- `apps/docs` is for developer/API documentation, ADRs, architecture, and operational runbooks.

## Content Rules (Must)
- No secrets or credentials in docs.
- Update ADRs/diagrams with significant changes; reference commit SHAs.
- Provide canonical links and metadata suitable for RAG citations.

## UI/UX Stability (Should)
- Do not change docs theme/navigation without documentation owner approval.

## RAG Alignment (Should)
- Structure pages with clear headings, IDs, and source metadata for ingestion.

## Testing/Validation (Should)
- Lint docs for broken links; validate frontmatter schema.

## Checklist
- [ ] No secrets.
- [ ] ADRs/diagrams updated; canonical links present.
- [ ] RAG-friendly structure and metadata.
- [ ] Changelog/README cross-referenced.

## Code Structure
```
app/
  content/            # Markdown/MDX docs with frontmatter (source, canonical)
  components/         # Docs components (callouts, link cards) using @xalatechnologies/ui
  routes/             # Docs routes (topics, guides, ADRs)
  root.tsx            # Layout with navigation/search
  app.css             # Imports @xalatechnologies/ui/styles/digilist.css first
  rag/                # Ingestion config, page metadata helpers
```
