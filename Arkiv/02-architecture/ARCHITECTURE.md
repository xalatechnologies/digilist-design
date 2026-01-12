---
source: docs/knowledge_base/requirements/ARCHITECTURE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.249Z
---

---
source: packages/localization/ARCHITECTURE.md
auto_indexed: true
indexed_at: 2025-12-27T01:56:47.240Z
---

# Localization Architecture: i18next + PostgreSQL

## Overview

Robust, production-ready localization architecture using **i18next** (industry standard) with **PostgreSQL backend** for scalability and UI management.

**Status:** Foundation → Admin UI (phased rollout)

## Why i18next?

### Battle-Tested
- ✅ **10+ years in production** at Microsoft, IBM, NASA, SAP
- ✅ **50K+ GitHub stars**, 5M+ weekly downloads
- ✅ **Edge cases handled**: pluralization, gender, context, interpolation
- ✅ **Framework agnostic**: React, Vue, Angular, Node.js

### Features We Need
- ✅ **Lazy loading**: Load only needed namespaces
- ✅ **Backend plugins**: PostgreSQL, Redis, HTTP API
- ✅ **Type safety**: Full TypeScript support
- ✅ **ICU MessageFormat**: Complex plurals (Norwegian has different rules than English)
- ✅ **RTL support**: Arabic out of the box
- ✅ **Fallback chains**: nb → en → key
- ✅ **Hot reload**: Change translations without restart

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Applications                         │
│  (web, api, worker, learning-hub, docs, monitoring)     │
└────────────────────┬────────────────────────────────────┘
                     │ import { useTranslation }
                     ↓
┌─────────────────────────────────────────────────────────┐
│              @xalatechnologies/i18n                                  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              i18next Instance                     │  │
│  │  • Namespaces: admin, booking, common, etc.      │  │
│  │  • Locales: nb (primary), en, fr, ar             │  │
│  │  • Plugins: Backend, LanguageDetector, React     │  │
│  └───────────────────┬──────────────────────────────┘  │
│                      │                                  │
│  ┌──────────────────┴──────────────────────────────┐  │
│  │         Dual-Source Backend Plugin               │  │
│  │                                                   │  │
│  │  Priority 1: PostgreSQL (if available)           │  │
│  │  Priority 2: Static JSON (fallback)              │  │
│  │  Priority 3: Return key (missing translation)    │  │
│  └───────────────────┬──────────────────────────────┘  │
│                      │                                  │
└──────────────────────┼──────────────────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         ↓                            ↓
┌─────────────────┐         ┌──────────────────┐
│   PostgreSQL    │         │   Static JSON    │
│                 │         │                  │
│ • translation_  │         │ • translations/  │
│   keys          │         │   ├─ common/     │
│ • translations  │         │   ├─ admin/      │
│ • Full history  │         │   └─ booking/    │
│ • Audit trail   │         │                  │
└────────┬────────┘         └──────────────────┘
         │
         │ HTTP API
         ↓
┌─────────────────────────┐
│   Translation Admin UI  │
│   (Future Phase)        │
│                         │
│ • CRUD interface        │
│ • Search & filter       │
│ • Bulk operations       │
│ • Import/Export         │
│ • Translation memory    │
│ • Approval workflow     │
└─────────────────────────┘
```

## PostgreSQL Schema

Based on your existing README design (lines 279-303):

```sql
-- Translation keys (canonical list)
CREATE TABLE translation_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) NOT NULL UNIQUE,  -- e.g., "admin.settings.title"
  namespace VARCHAR(100) NOT NULL,    -- e.g., "admin"
  description TEXT,                   -- Context for translators
  context TEXT,                       -- Usage context (formal, informal, etc.)
  max_length INT,                     -- UI constraint
  placeholders JSONB,                 -- {{name}}, {{count}}, etc.
  tags TEXT[],                        -- For categorization
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES users(id),

  -- Indexes
  CONSTRAINT key_format CHECK (key ~ '^[a-z][a-z0-9]*(\.[a-z][a-z0-9_-]*)+$')
);

CREATE INDEX idx_translation_keys_namespace ON translation_keys(namespace);
CREATE INDEX idx_translation_keys_key ON translation_keys(key);
CREATE INDEX idx_translation_keys_tags ON translation_keys USING GIN(tags);

-- Translation values (per locale)
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_id UUID NOT NULL REFERENCES translation_keys(id) ON DELETE CASCADE,
  locale VARCHAR(10) NOT NULL,        -- 'nb', 'en', 'fr', 'ar'
  value TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft', -- draft, approved, deprecated
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one translation per key per locale
  UNIQUE(key_id, locale),

  -- Constraints
  CONSTRAINT status_values CHECK (status IN ('draft', 'approved', 'deprecated'))
);

CREATE INDEX idx_translations_key_id ON translations(key_id);
CREATE INDEX idx_translations_locale ON translations(locale);
CREATE INDEX idx_translations_status ON translations(status);

-- Translation history (audit trail)
CREATE TABLE translation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_id UUID NOT NULL REFERENCES translations(id) ON DELETE CASCADE,
  old_value TEXT,
  new_value TEXT NOT NULL,
  changed_by UUID REFERENCES users(id),
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  change_reason TEXT
);

CREATE INDEX idx_translation_history_translation_id ON translation_history(translation_id);
CREATE INDEX idx_translation_history_changed_at ON translation_history(changed_at);

-- Trigger: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_translation_keys_updated_at
  BEFORE UPDATE ON translation_keys
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translations_updated_at
  BEFORE UPDATE ON translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Record translation changes in history
CREATE OR REPLACE FUNCTION record_translation_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.value != NEW.value THEN
    INSERT INTO translation_history (translation_id, old_value, new_value, changed_by)
    VALUES (NEW.id, OLD.value, NEW.value, NEW.approved_by);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER translation_change_history
  AFTER UPDATE ON translations
  FOR EACH ROW
  EXECUTE FUNCTION record_translation_change();
```

## i18next Configuration

### Package Dependencies

```json
{
  "dependencies": {
    "i18next": "^23.7.0",
    "react-i18next": "^13.5.0",
    "i18next-http-backend": "^2.4.2",
    "i18next-browser-languagedetector": "^7.2.0"
  }
}
```

### Core Configuration

```typescript
// src/i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const DEFAULT_LOCALE = 'nb';
export const SUPPORTED_LOCALES = ['nb', 'en', 'fr', 'ar'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

// Dual-source backend: PostgreSQL (API) → Static JSON (fallback)
const backendOptions = {
  backends: [
    // Priority 1: PostgreSQL via HTTP API
    HttpBackend,
    // Priority 2: Static JSON files
    {
      type: 'backend',
      read(language: string, namespace: string, callback: any) {
        import(`./translations/${namespace}/${language}.json`)
          .then((resources) => callback(null, resources.default))
          .catch((error) => callback(error, null));
      }
    }
  ],
  backendOptions: [
    {
      // PostgreSQL API endpoint
      loadPath: '/api/v1/translations/{{lng}}/{{ns}}',
      addPath: '/api/v1/translations/{{lng}}/{{ns}}',
    },
    {} // Static JSON has no options
  ]
};

await i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES,

    // Namespaces (lazy loaded)
    ns: ['common', 'admin', 'booking', 'listing', 'user'],
    defaultNS: 'common',

    // Loading
    load: 'languageOnly', // 'nb' not 'nb-NO'

    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes
      format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        if (value instanceof Date) {
          return new Intl.DateTimeFormat(lng).format(value);
        }
        return value;
      }
    },

    // React
    react: {
      useSuspense: true,
      transSupportBasicHtmlNodes: true,
    },

    // Backend
    backend: backendOptions,

    // Development
    debug: process.env.NODE_ENV === 'development',
  });

export default i18next;
```

## API Endpoints

### Translation CRUD API

```typescript
// API routes (in digilist-api or separate service)

/**
 * GET /api/v1/translations/:locale/:namespace
 * Load all translations for a locale + namespace
 *
 * Response: { "key": "value", ... }
 */
router.get('/translations/:locale/:namespace', async (c) => {
  const { locale, namespace } = c.req.param();

  const translations = await db
    .select({
      key: translation_keys.key,
      value: translations.value,
    })
    .from(translations)
    .innerJoin(translation_keys, eq(translations.key_id, translation_keys.id))
    .where(
      and(
        eq(translations.locale, locale),
        eq(translation_keys.namespace, namespace),
        eq(translations.status, 'approved')
      )
    );

  return c.json(
    Object.fromEntries(translations.map(t => [t.key, t.value]))
  );
});

/**
 * GET /api/v1/translations/keys
 * List all translation keys (for admin UI)
 */
router.get('/translations/keys', async (c) => {
  const { namespace, search } = c.req.query();

  // ... implementation
});

/**
 * POST /api/v1/translations/keys
 * Create new translation key
 */
router.post('/translations/keys', async (c) => {
  // ... implementation
});

/**
 * PUT /api/v1/translations/:keyId/:locale
 * Update translation value
 */
router.put('/translations/:keyId/:locale', async (c) => {
  // ... implementation with history tracking
});

/**
 * POST /api/v1/translations/import
 * Bulk import from JSON (for migration)
 */
router.post('/translations/import', async (c) => {
  // ... implementation
});
```

## Migration Strategy

### Phase 1: Foundation (Current Sprint)
- [x] Design architecture
- [ ] Create PostgreSQL schema
- [ ] Set up i18next with dual-source backend
- [ ] Create API endpoints
- [ ] Migrate existing JSON to PostgreSQL
- [ ] Update React hooks to use i18next
- [ ] Testing & validation

### Phase 2: Admin UI (Future Sprint)
- [ ] Create admin UI routes
- [ ] Build translation management interface
- [ ] Search & filter functionality
- [ ] Bulk operations (import/export)
- [ ] Approval workflow
- [ ] Translation memory

### Phase 3: Advanced Features (Optional)
- [ ] Machine translation integration (DeepL, Google Translate)
- [ ] Translation suggestions
- [ ] Usage analytics
- [ ] A/B testing different translations
- [ ] CDN caching for translations

## Benefits of This Architecture

### Immediate
✅ **Robust**: i18next handles edge cases we haven't encountered
✅ **Type-safe**: Full TypeScript support
✅ **Proven**: Battle-tested by major companies
✅ **No downtime**: Dual-source backend (DB + JSON fallback)

### Future
✅ **UI Management**: Easy to build admin interface
✅ **Real-time updates**: Change translations without deploy
✅ **Collaboration**: Multiple translators, approval workflow
✅ **Audit trail**: Full history of changes
✅ **Scalable**: PostgreSQL handles millions of translations

## Developer Experience

### Before (Current)
```typescript
// Hardcoded strings everywhere
<button>Lagre</button>

// Or custom hook with massive JSON files
import { nb } from './locales/nb'; // 10,000 lines!
```

### After (i18next)
```typescript
// Clean, type-safe
import { useTranslation } from '@xalatechnologies/i18n';

function MyComponent() {
  const { t } = useTranslation('admin');

  return (
    <div>
      <h1>{t('settings.title')}</h1>
      <p>{t('settings.description', { name: user.name })}</p>
      <p>{t('items', { count: 5 })}</p> {/* Automatic pluralization */}
    </div>
  );
}
```

## File Structure

```
packages/localization/
├── src/
│   ├── index.ts                    # Main exports
│   ├── i18n.ts                     # i18next configuration
│   ├── types.ts                    # TypeScript types
│   ├── react/
│   │   ├── index.ts               # React hooks
│   │   └── provider.tsx           # I18nextProvider wrapper
│   ├── backend/
│   │   ├── dual-source.ts         # Dual backend plugin
│   │   ├── postgresql.ts          # PostgreSQL backend
│   │   └── static-json.ts         # JSON fallback
│   ├── api/                       # API client (for DB operations)
│   │   ├── translations.ts
│   │   └── types.ts
│   └── translations/              # Static JSON (fallback)
│       ├── common/
│       │   ├── nb.json
│       │   └── en.json
│       ├── admin/
│       └── booking/
├── scripts/
│   ├── migrate-to-db.ts          # JSON → PostgreSQL migration
│   └── validate-translations.ts
├── ARCHITECTURE.md               # This file
├── README.md
└── package.json
```

## Next Steps

1. **Create PostgreSQL migration** (schema above)
2. **Install i18next dependencies**
3. **Configure i18next** with dual-source backend
4. **Create API endpoints** for translation CRUD
5. **Migration script** to import existing JSON to PostgreSQL
6. **Update React hooks** to use i18next
7. **Testing** - ensure no regressions
8. **Documentation** - update README with new usage

Ready to implement! 🚀
