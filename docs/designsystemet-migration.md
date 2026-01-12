# Migrasjon til designsystemet.no

## Status

✅ **Pakker lagt til i package.json**
- `@navikt/ds-react` - React komponenter
- `@navikt/ds-css` - CSS styling

⏳ **CSS import kommentert ut**
- `@import "@navikt/ds-css";` er kommentert ut i `src/index.css` (aktiveres etter npm install)

⏳ **Neste steg:**
1. ✅ Kjør `npm install --legacy-peer-deps` for å installere pakkene (se `docs/designsystemet-installation.md`)
2. ✅ Aktiver CSS import i `src/index.css` (fjern `/* */` rundt `@import "@navikt/ds-css";`)
3. Migrer komponenter gradvis (se nedenfor)

**Viktig:** Bruk `--legacy-peer-deps` flagget fordi designsystemet.no v5 krever React 18, men prosjektet bruker React 19. Komponentene skal fortsatt fungere med React 19.

## Komponent-mapping

| Nåværende (shadcn/ui) | designsystemet.no | Migrasjonsstatus |
|------------------------|-------------------|-------------------|
| `Button` | `Button` | ⏳ Pending |
| `Input` | `TextField` | ⏳ Pending |
| `Badge` | `Tag` | ⏳ Pending |
| `Tabs` | `Tabs` | ⏳ Pending |
| `Card` | `Card` | ⏳ Pending |

## Migrasjonsinstruksjoner

### 1. Button migrasjon

**Før (shadcn/ui):**
```tsx
<Button variant="outline" size="sm">
  Logg inn
</Button>
```

**Etter (designsystemet.no):**
```tsx
import { Button } from '@navikt/ds-react'

<Button variant="secondary" size="small">
  Logg inn
</Button>
```

**Props mapping:**
- `variant="default"` → `variant="primary"`
- `variant="outline"` → `variant="secondary"`
- `variant="ghost"` → `variant="tertiary"`
- `size="sm"` → `size="small"`
- `size="default"` → `size="medium"`
- `size="lg"` → `size="large"`

### 2. Input → TextField migrasjon

**Før:**
```tsx
<Input
  type="search"
  placeholder="Søk etter fasiliteter…"
  className="..."
/>
```

**Etter:**
```tsx
import { TextField } from '@navikt/ds-react'

<TextField
  type="search"
  label="Søk" // designsystemet.no krever label
  hideLabel // Hvis label skal skjules visuelt
  placeholder="Søk etter fasiliteter…"
/>
```

### 3. Badge → Tag migrasjon

**Før:**
```tsx
<Badge variant="outline">Rom</Badge>
```

**Etter:**
```tsx
import { Tag } from '@navikt/ds-react'

<Tag variant="neutral">Rom</Tag>
```

**Props mapping:**
- `variant="outline"` → `variant="neutral"`
- `variant="destructive"` → `variant="error"`

### 4. Tabs migrasjon

**Før:**
```tsx
<Tabs defaultValue="oversikt">
  <TabsList>
    <TabsTrigger value="oversikt">Oversikt</TabsTrigger>
  </TabsList>
  <TabsContent value="oversikt">...</TabsContent>
</Tabs>
```

**Etter:**
```tsx
import { Tabs } from '@navikt/ds-react'

<Tabs defaultValue="oversikt">
  <Tabs.List>
    <Tabs.Tab value="oversikt">Oversikt</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="oversikt">...</Tabs.Panel>
</Tabs>
```

## Styling og tokens

### Spacing
Designsystemet.no bruker spacing tokens som `spacing-2`, `spacing-4`, etc.
Erstatt Tailwind spacing classes (`p-4`, `gap-2`) med designsystemet.no tokens der mulig.

### Typography
Designsystemet.no har predefined typography scales.
Bruk designsystemet.no typography tokens i stedet for custom Tailwind classes.

### Colors
Brand accent #33649E må konfigureres i designsystemet.no tema.
Bruk designsystemet.no color tokens for neutrals og semantics.

## Filer som må oppdateres

1. `src/shell/components/AppShell.tsx` - Hovedkomponent
2. `src/sections/screen-designs-desktop-mobile/ListingDetailDesktop.tsx`
3. `src/sections/screen-designs-desktop-mobile/ListingDetailMobile.tsx`
4. `src/sections/listing-detail-ui-spec/ComponentDiagram.tsx`

## Testing checklist

- [ ] Alle komponenter renderer korrekt
- [ ] Styling matcher designsystemet.no
- [ ] Interaktivitet fungerer (klikk, hover, focus)
- [ ] Keyboard navigation fungerer
- [ ] Screen reader kompatibilitet
- [ ] Mobile responsive fungerer
- [ ] Brand accent #33649E vises korrekt

## Notater

- designsystemet.no er tema-basert - tema må konfigureres først
- Noen komponenter kan kreve wrapper-komponenter for kompleks funksjonalitet
- Dokumenter eventuelle avvik fra designsystemet.no
