---
source: docs/knowledge_base/requirements/digilist-learning-hub.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.265Z
---

---
source: docs/knowledge_base/requirements/digilist-learning-hub.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.225Z
---

---
source: digilist/docs/claude/digilist-learning-hub.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.169Z
---

# Learning Hub (E-lærings- og kunnskapsplattform) — CLAUDE.md

## Inheritance
- Inherits root /CLAUDE.md; adds constraints; stricter wins.

## Language Policy (Must)
- **Norwegian (bokmål) is PRIMARY** and source of truth for all content.
- English is SECONDARY and always derived from Norwegian.
- All content authored in Norwegian first (`nb`), then translated.

## Purpose & Core Principle

### What This Is
E-learning platform teaching users **how to use Digilist correctly according to rules, responsibilities, and role-specific requirements**.

### What This Is NOT
- Technical documentation
- System architecture
- Developer guides
- API reference
- Regulatory analysis

### Core Principle: Rules First, Functions Second
All learning follows this sequence:
1. These are the rules that apply to you
2. This is the responsibility that comes with your role
3. This is how you use Digilist within these rules
4. This is what happens when rules are followed
5. This is what happens when rules are broken

**Users never learn an action without simultaneously learning the rule behind it.**

## Target User Experience

### Goal
Fast mastery → Fewer errors → High trust → Low barrier to use

### User Should Feel
- It's easy to get started
- It's safe to use Digilist
- It's simple to find the right answer
- The system helps me, doesn't test me
- I don't have to read things that don't apply to me

## Role-Based Learning (Entry Point)

When user opens e-learning, they see only:
> "Hva er din rolle?" (What is your role?)

This single choice controls all subsequent content.

| Role | Norwegian | Focus | Learning Goal |
|------|-----------|-------|---------------|
| Leietaker | Tenant/User | Booking rules, access, payment, cancellation | Understand limitations, avoid rejections |
| Saksbehandler | Case Handler | Approval rules, rejection criteria, documentation | Equal treatment, defensible decisions |
| Eiendomseier | Property Owner | Listing rules, availability, conflict handling | Correct management, fewer conflicts |
| Admin | Administrator | Configuration rules, overrides, consequences | Stable operation, reduced risk |
| Kommune | Municipality | Governance, compliance, oversight | Safe administration, full overview |

## Quick Onboarding (5-10 minutes)

Each learning path starts with super-short onboarding:
- What is Digilist for you
- What you can do
- What you must be careful about
- What rules apply to you
- What happens if something goes wrong

Format:
- Text + visual explanation
- Maximum 5-7 short steps
- No depth, only overview

Goal: "Now I understand what I can and cannot do"

## Need-Based Navigation

Users navigate by **need**, not by topic:
- I want to book
- I want to evaluate a request
- I want to change or reject
- I'm unsure about the rules
- Something has gone wrong

Behind each choice:
- Only relevant content
- Only correct role
- Only necessary rules

## Content Architecture

### A. Læringsløp (Learning Paths)
Role-based, progressive e-learning with rule focus.
- Structured by role, not by feature
- Each module ties action to rule

### B. Kunnskapsbase (Knowledge Base)
Atomic, search-first articles. One question = one article.
- **B1**: Grunnbegreper (Booking Concepts)
- **B2**: Regler og begrensninger (Rules & Constraints)
- **B3**: Roller og rettigheter (Roles & Permissions)
- **B4**: Betaling og økonomi (Payments & Economics)

### C. Operative veiledere (Playbooks)
Do-this-now guides for use during work, not training.

### D. Scenario- og caselibrary (Scenarios)
Real-world examples showing rules and practice in action.

### E. Mediebibliotek (Media Library)
Videos, infographics, checklists mapped to content.

## Rule Presentation Structure

Every learning module follows this structure:
1. **This is the rule**
2. **Why the rule exists**
3. **Who the rule applies to**
4. **What Digilist allows**
5. **What Digilist stops**
6. **Examples of correct use**
7. **Examples of rule violations**
8. **Consequences**

### Never Start With
- "Click here"
- "This is how you use the function"

### Always Start With
- "These are the boundaries you must follow"

## Content Types (Rule-Driven)

- Short rule-based explanations
- Examples of right and wrong choices
- Scenarios with decision points
- Checklists: "Have you followed the rules?"
- Short videos explaining consequences

## Interactive Chatbot (Central, Not Optional)

The chatbot is an **active guide**, not a supplement.

### Chatbot Capabilities
- Asks questions when user is uncertain
- Explains rules in plain language
- Guides user step by step
- Clearly states when something is not allowed
- Suggests correct learning content

### Chatbot Always Responds
- Role-aware
- Rule-based
- Concrete
- Without technical language

### Example User Statements
- "Can I approve this?"
- "Why was the booking rejected?"
- "What applies to free use?"
- "I'm unsure about the rules here"

## Content Boundaries (Must)
- Developer/API docs, runbooks, ADRs belong in `apps/docs` only.
- Learning Hub contains end-user content only.
- No cross-linking internal-only material.
- No technical jargon or system terminology.

## RAG Metadata (Must)
All content items must include:
```yaml
id: unique-slug
tittel: Norwegian title
innholdstype: learning | knowledge | playbook | scenario
rolle: [leietaker, saksbehandler, eiendomseier, admin, kommune]
nivå: grunnleggende | viderekommen | avansert | ekspert
tema: [booking, payment, rules, governance]
fase: before | during | after
sist_revidert: YYYY-MM-DD
språk: nb-NO
regel_referanse: [list of rules covered]
```

## Content Rules (Must)
- No secrets, credentials, or internal procedures.
- Norwegian primary; translate to EN, FR, AR as needed.
- Plain language, step-by-step instructions.
- One question per knowledge article.
- No mixed roles in single content item.
- Explicit rules and outcomes (do/don't).
- Maximum 2 minutes reading time per article.
- Rules presented with concrete consequences.

## AI Agent Rules (Must)
AI agents CAN: draft, structure, summarize, translate, generate metadata.
AI agents CANNOT: invent rules, guess policies, mix roles, write without source.

## Accessibility (Must)
- WCAG 2.1 AA for all content, media, and interactive elements.
- Captions/transcripts required for video/audio.

## Testing/Validation (Should)
- Validate frontmatter/metadata schema.
- Lint for broken links.
- Verify RAG metadata completeness.

## Checklist
- [ ] Norwegian source of truth written first.
- [ ] RAG metadata complete and valid.
- [ ] Role-specific content (no mixing).
- [ ] Rule clearly stated before action.
- [ ] Consequences explained.
- [ ] No internal-only content.
- [ ] WCAG AA met; captions where applicable.
- [ ] Links and frontmatter validated.

## Code Structure
```
content/
  nb/                    # Norwegian (primary)
    learning/            # A-series: Role-based learning paths
    knowledge/           # B-series: Kunnskapsbase (atomic articles)
    playbooks/           # C-series: Operative veiledere
    scenarios/           # D-series: Case library
  en/                    # English (derived)
    ...
app/
  components/            # Reusable learning UI using @xalatechnologies/ui
  routes/
    learning.tsx         # Learning path routes
    knowledge.tsx        # Knowledge base routes
    playbooks.tsx        # Playbook routes
    scenarios.tsx        # Scenario routes
  root.tsx               # Layout with navigation/search
  styles/app.css         # Imports @xalatechnologies/ui/styles/digilist.css first
```

## Types Reference
See `@xalatechnologies/data` for TypeScript types:
- `RagMetadata` - base metadata interface
- `KnowledgeArticleMetadata` - KB article specifics
- `LearningPathMetadata` - course/module metadata
- `PlayDigilisttadata` - operational guide metadata
- `ScenarioMetadata` - case study metadata
