# Migrasjon til designsystemet.no

## Status
- ✅ Pakker lagt til i package.json (@navikt/ds-react, @navikt/ds-css)
- ✅ CSS import lagt til i index.css
- ⏳ Komponenter må migreres gradvis

## Migrasjonsplan

### Steg 1: Installer pakker
```bash
npm install
```

### Steg 2: Komponent-mapping

| Nåværende (shadcn/ui) | designsystemet.no | Status |
|------------------------|-------------------|--------|
| Button | Button | ⏳ |
| Input | TextField | ⏳ |
| Badge | Tag | ⏳ |
| Tabs | Tabs | ⏳ |
| Card | Card | ⏳ |

### Steg 3: Oppdateringer nødvendig

1. **Button**: Endre props fra `variant`, `size` til designsystemet.no API
2. **Input/TextField**: Endre fra `Input` til `TextField` med riktige props
3. **Badge/Tag**: Endre fra `Badge` til `Tag`
4. **Tabs**: Oppdater til designsystemet.no Tabs API
5. **Styling**: Erstatt Tailwind classes med designsystemet.no tokens der mulig

### Steg 4: Testing
- Test alle komponenter fungerer
- Verifiser at styling matcher designsystemet.no
- Sjekk accessibility (WCAG 2.1 AA)

## Notater
- designsystemet.no bruker tema-basert styling
- Brand accent #33649E må konfigureres i tema
- Spacing og typography følger designsystemet.no tokens
