# Installasjon av designsystemet.no

## Versjonskonflikt

**Problem:** `@navikt/ds-react` versjon 5.x krever React 17 eller 18, men prosjektet bruker React 19.

**Løsning:** Bruk `--legacy-peer-deps` flagget ved installasjon:

```bash
npm install --legacy-peer-deps
```

Dette tillater installasjon selv om det er peer dependency konflikter. designsystemet.no komponenter skal fortsatt fungere med React 19, selv om de formelt krever React 18.

## Alternativ løsning

Hvis du vil unngå `--legacy-peer-deps`, kan du:

1. **Downgrade React til versjon 18** (anbefales ikke hvis du trenger React 19 features)
2. **Vente på designsystemet.no versjon 6** som støtter React 19 (hvis den kommer)
3. **Bruke --legacy-peer-deps** (anbefalt for nå)

## Etter installasjon

1. Aktiver CSS import i `src/index.css`:
   ```css
   @import "@navikt/ds-css";
   ```

2. Start migrasjon av komponenter (se `docs/designsystemet-migration.md`)
