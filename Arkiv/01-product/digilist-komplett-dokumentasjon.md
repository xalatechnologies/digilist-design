---
title: "Digilist Platform - Komplett Prosjektdokumentasjon"
subtitle: "Løsningsforslag med Kravkorrelasjon"
date: "Januar 2026"
author: "Xala Technologies AS"
---

# Digilist Platform

## Komplett Prosjektdokumentasjon med Kravkorrelasjon

**Versjon:** 2.0\
**Dato:** 8. januar 2026\
**Status:** Produksjonsklar\
**Dokument-type:** Løsningsforslag (Tender Response)

---

# Del 1: Innledning og Visjon

## 1.1 Sammendrag

Digilist er en komplett SaaS-plattform for digitalisering av kommunale
bookingsystemer i Norge. Plattformen erstatter fragmenterte, manuelle prosesser
med én digital løsning som dekker hele verdikjeden - fra publisering av
tilgjengelige anlegg, gjennom søknad, godkjenning og betaling, til rapportering
og revisjon.

## 1.2 Problemstilling

Norske kommuner står overfor betydelige utfordringer:

| Problem                  | Konsekvens                                        |
| ------------------------ | ------------------------------------------------- |
| Fragmenterte systemer    | Ulike systemer for ulike anlegg                   |
| Manuelle prosesser       | Papirbaserte søknader, telefon, e-post            |
| Urettferdig tilgang      | Manglende transparens i tildelingsbeslutninger    |
| Administrativ belastning | Saksbehandlere overveldet av forespørsler         |
| Dårlig synlighet         | Innbyggere uvitende om tilgjengelige tider        |
| Etterlevelsesrisiko      | Vanskelig å spore GDPR-samtykker, revisjonslogger |

## 1.3 Løsningen

Digilist tilbyr:

- **Én inngangsport** for alle kommunale bookinger
- **Selvbetjening** for innbyggere, lag og foreninger
- **Rettferdig tildeling** basert på transparente regler
- **Automatisering** som reduserer manuelt arbeid
- **Innebygd compliance** for GDPR, Offentleglova, Arkivlova

---

# Del 2: Kravspesifikasjon og Korrelasjon

## 2.1 Domenekrav (DOM-001 til DOM-017)

### DOM-001: Listing som ENESTE Bokbare Enhet

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | DOM-001      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**Funksjonelle krav:**

- Alle bookinger MÅ referere til en Listing-entitet
- Bookinger som refererer til Facility-entiteter MÅ avvises med feilkode
  `BOOKING_INVALID_ENTITY`
- API-endepunkter MÅ kun akseptere Listing-IDer for bookingoperasjoner

**Arkitekturkrav:**

- Termen "Facility" MÅ IKKE forekomme i noe offentlig skjema, API-rute, eller
  frontend-komponent
- Kun Listing-entiteter KAN eksponeres i offentlige grensesnitt
- Skjemafiler MÅ eksklusivt bruke "listing" eller "listings" terminologi

**Implementasjon:**

```
apps/api/src/routes/listings/
├── index.ts                    # Hovedruting
├── listings-routes-thin.ts     # Tynnlag-ruter
└── schemas.ts                  # Zod-valideringsskjemaer

packages/shared/domain/src/listings/services/
├── listing.business.service.ts  # Forretningslogikk
├── listing.service.factory.ts   # Service-fabrikk
└── zone.business.service.ts     # Sonelogikk (intern)

packages/client/domain-hooks/src/listings/hooks/
├── useListing.ts               # Enkelthenting
├── useListings.ts              # Listehenting
├── useListingDetail.ts         # Detaljvisning
└── useListingManagement.ts     # CRUD-operasjoner
```

---

### DOM-002: 6 Anleggstyper (Listing Types)

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | DOM-002      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**De 6 typenavnene:**

| Type       | Norsk          | Eksempler                       | Primær Bookingmodell |
| ---------- | -------------- | ------------------------------- | -------------------- |
| `SPACE`    | Rom/Hall       | Idrettshall, møterom, kultursal | TIME_RANGE, SLOTS    |
| `RESOURCE` | Ressurs/Utstyr | Projektor, sportsutstyr         | QUANTITY             |
| `EVENT`    | Arrangement    | Konserter, kurs, workshops      | CAPACITY             |
| `SERVICE`  | Tjeneste       | Vaktmester, renhold             | TIME_RANGE           |
| `VEHICLE`  | Kjøretøy       | Kommunebil, båt, sykkel         | ALL_DAY              |
| `OTHER`    | Annet          | Spesialtilpasset                | Alle modeller        |

**Funksjonelle krav:**

- Listing-oppretting MÅ støtte nøyaktig 6 typer
- Ugyldige listing-typer MÅ avvises med feilkode `LISTING_INVALID_TYPE`
- Listing-type MÅ være uforanderlig etter oppretting
- Listing-type MÅ være påkrevd og validert på skjemanivå

**Testkrav:**

- Unit tests MÅ verifisere at alle 6 typer aksepteres
- Unit tests MÅ verifisere at ugyldige typer avvises
- Skjematester MÅ verifisere enum-constraint håndhevelse

---

### DOM-003: 6 Bookingmodeller

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | DOM-003      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**De 6 modellene:**

| Modell       | Beskrivelse            | Brukstilfelle                  |
| ------------ | ---------------------- | ------------------------------ |
| `TIME_RANGE` | Start og sluttid       | Standard timebookinger         |
| `SLOTS`      | Predefinerte tidsluker | Faste treningstider, timer     |
| `ALL_DAY`    | Heldags booking        | Arrangementer, konferanser     |
| `QUANTITY`   | Antallsbasert          | Utstyrsleie                    |
| `CAPACITY`   | Kapasitetsbasert       | Events med deltagerbegrensning |
| `PACKAGE`    | Pakkeløsning           | Bundle-tilbud                  |

**Funksjonelle krav:**

- Booking-oppretting MÅ støtte nøyaktig 6 modeller
- Bookingmodell MÅ bestemmes av Listing-konfigurasjon
- Ugyldig bookingmodell for Listing-type MÅ avvises
- Bookingmodell MÅ være uforanderlig etter oppretting

**Arkitekturkrav:**

- Bookingmodell MÅ defineres som enum i domain-data skjema
- Bookingmodell-logikk MÅ ligge i domenelag, ikke API-lag
- Modellvalidering MÅ skje før database-skriving

**Testdekning:**

- Testdekning MÅ være minst 95% for DOM-003

---

### DOM-004: Unified Booking Engine

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | DOM-004      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**Funksjonelle krav:**

- Alle bookingmodeller MÅ bruke én enkelt bookings-tabell
- Bookings-tabellen MÅ lagre modell-agnostiske fellesfelter
- Modellspesifikke data MÅ lagres i `booking_items` eller `allocations` tabeller
- Bookingspørringer MÅ fungere på tvers av alle modeller uten modellspesifikk
  logikk

**Arkitekturkrav:**

- Skjema MÅ definere enkelt bookings-tabell med tenant_id FK
- Ingen modellspesifikke bookingtabeller MÅ eksistere
- Domenetjenester MÅ håndtere alle modeller gjennom unified interface

**Databaseskjema:**

```sql
CREATE TABLE domain.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  org_id UUID NOT NULL,
  listing_id UUID NOT NULL,
  user_id UUID NOT NULL,
  booking_model booking_model NOT NULL,
  status booking_status DEFAULT 'draft' NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  quantity INTEGER,
  total_price_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'NOK' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

---

### DOM-005: Booking Items (Linjeartikler)

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | DOM-005      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**Funksjonelle krav:**

- Hver booking MÅ ha én eller flere booking_items
- Booking items MÅ inneholde listing snapshot på bookingtidspunkt
- Booking items MÅ være uforanderlige etter oppretting
- Booking items MÅ støtte antall og prisinformasjon

**Arkitekturkrav:**

- Skjema MÅ definere `booking_items` tabell med `booking_id` FK
- Listing snapshot MÅ lagres som JSONB eller separate kolonner
- Ingen direkte referanse til listings-tabell fra booking_items

---

### DOM-006: Allocations (Kalender)

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | DOM-006      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**Funksjonelle krav:**

- Tidsblokk-allokeringer MÅ opprettes for hver booking
- Allokeringer MÅ støtte start_time og end_time
- Konfliktdeteksjon MÅ sjekke allokeringer for overlappende tidsblokker
- Allokeringer MÅ være søkbare etter datoområde

**Arkitekturkrav:**

- Skjema MÅ definere allocations-tabell med tidsrange-kolonner
- Databaseindekser MÅ støtte effektive konfliktspørringer
- Konfliktdeteksjon MÅ skje i domenetjeneste, ikke databasetrigger

**Implementasjon:**

```sql
CREATE TABLE domain.allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  booking_id UUID NOT NULL,
  bookable_unit_id UUID NOT NULL,
  time_range TSTZRANGE NOT NULL,
  status allocation_status DEFAULT 'confirmed',
  EXCLUDE USING GIST (bookable_unit_id WITH =, time_range WITH &&)
);
```

---

### DOM-007: Tilgjengelighetsregler (Availability Rules)

| Attribute     | Verdi     |
| ------------- | --------- |
| **ID**        | DOM-007   |
| **Prioritet** | P1        |
| **Status**    | ✅ Dekket |
| **Kilde**     | PRD v2.0  |

**Funksjonelle krav:**

- Hvert listing MÅ støtte per-listing tilgjengelighetsregler
- Tilgjengelighetsregler MÅ støtte ukedag og tid-på-dagen begrensninger
- Tilgjengelighetsregler MÅ evalueres før booking-oppretting
- Bookinger utenfor tilgjengelighetsvinduer MÅ avvises

---

### DOM-008: Prisregler - Periodebasert

| Attribute     | Verdi     |
| ------------- | --------- |
| **ID**        | DOM-008   |
| **Prioritet** | P1        |
| **Status**    | ✅ Dekket |
| **Kilde**     | PRD v2.0  |

**Funksjonelle krav:**

- Prisregler MÅ støtte basis, peak, og helgeprising per listing
- Prisregler MÅ evalueres ved bookingtidspunkt
- Prisregler MÅ støtte datoområde-definisjoner

---

### DOM-009: Prisregler - Brukergruppebasert

| Attribute     | Verdi     |
| ------------- | --------- |
| **ID**        | DOM-009   |
| **Prioritet** | P1        |
| **Status**    | ✅ Dekket |
| **Kilde**     | PRD v2.0  |

**Funksjonelle krav:**

- Prisregler MÅ støtte brukergruppe-definisjoner: barn, frivillige,
  organisasjoner
- Brukergruppe-prising MÅ overstyre periodebasert prising når aktuelt
- Brukergruppe-deteksjon MÅ skje ved bookingtidspunkt
- Prisregler MÅ støtte gratis prising for spesifikke grupper

**De 6 brukergruppene (Actor Types):**

| Brukergruppe | Kode           | Rabatt   | Verifisering      |
| ------------ | -------------- | -------- | ----------------- |
| Privatperson | `privatperson` | 0%       | Nei               |
| Næringsliv   | `naringsliv`   | 0%       | BRREG (valgfritt) |
| Forening     | `forening`     | Varierer | Ja                |
| Idrettslag   | `idrettslag`   | 30-70%   | NIF               |
| Skole        | `skole`        | 100%     | Ja                |
| Kommune      | `kommune`      | 100%     | Ja                |

---

### DOM-010: Gjentakende Bookinger

| Attribute     | Verdi     |
| ------------- | --------- |
| **ID**        | DOM-010   |
| **Prioritet** | P1        |
| **Status**    | ✅ Dekket |
| **Kilde**     | PRD v2.0  |

**Funksjonelle krav:**

- Booking-oppretting MÅ støtte gjentakelsesmønstre: daglig, ukentlig, månedlig,
  årlig
- Gjentakende bookinger MÅ generere individuelle booking-instanser
- Gjentakende booking-kansellering MÅ kansellere alle fremtidige instanser
- Gjentakende booking-endring MÅ oppdatere alle fremtidige instanser

---

### DOM-011: Sesongutleie (Seasonal Leasing)

| Attribute     | Verdi     |
| ------------- | --------- |
| **ID**        | DOM-011   |
| **Prioritet** | P1        |
| **Status**    | ✅ Dekket |
| **Kilde**     | PRD v2.0  |

**Funksjonelle krav:**

- Sesongutleie MÅ støtte langsiktige allokeringsregler
- Sesongutleier MÅ overstyre vanlig booking-tilgjengelighet
- Sesongutleie-allokering MÅ være synlig i kalender
- Sesongutleie-konflikter med vanlige bookinger MÅ forhindres

**Statusflyt:**

```
søknad_sendt → søknad_godkjent → tildelt → bekreftet
```

---

### DOM-012: Kanselleringsregler

| Attribute     | Verdi     |
| ------------- | --------- |
| **ID**        | DOM-012   |
| **Prioritet** | P1        |
| **Status**    | ✅ Dekket |
| **Kilde**     | PRD v2.0  |

**Funksjonelle krav:**

- Hvert listing MÅ støtte kanselleringsfrist-regler
- Kanselleringsforespørsler etter frist MÅ avvises eller kreve admin-godkjenning
- Kanselleringsregler MÅ støtte refusjonsprosent basert på timing
- Kansellering MÅ trigge varslinger til relevante parter

---

### DOM-013: Tilleggstjenester (Additional Services)

| Attribute     | Verdi     |
| ------------- | --------- |
| **ID**        | DOM-013   |
| **Prioritet** | P1        |
| **Status**    | ✅ Dekket |
| **Kilde**     | PRD v2.0  |

**Funksjonelle krav:**

- Bookinger MÅ støtte tilleggstjenester: utstyr, catering, etc.
- Tilleggstjenester MÅ være valgbare under booking-oppretting
- Tilleggstjenester MÅ ha uavhengig prising
- Tilleggstjenester MÅ inkluderes i booking-total

**Seed-data (27 tjenester):**

| Kategori  | Tjenester                                                 |
| --------- | --------------------------------------------------------- |
| Personell | Vaktmester, Dommer, Ordensvakt, Lydtekniker, DJ, Fotograf |
| Renhold   | Renhold, Klargjøring, Omfattende renhold                  |
| Utstyr    | Stoler, Scene, Lydanlegg, Prosjektor, Bord                |
| Servering | Kaffe/te, Enkel servering, Lunsjservering, Full catering  |
| Sport     | Tidtaking, Speaker, Resultatservice                       |
| Teknisk   | Streaming, Kameramann, Videokonferanse                    |

---

### DOM-014: Vilkår og Betingelser

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | DOM-014      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**Funksjonelle krav:**

- Booking-oppretting MÅ kreve aksept av vilkår og betingelser
- Vilkår-aksept MÅ registreres med tidsstempel og bruker-ID
- Vilkår-aksept MÅ kreves for hver booking, ikke per bruker
- Booking uten vilkår-aksept MÅ avvises

---

### DOM-015 til DOM-017: Øvrige domenekrav

| ID      | Tittel                       | Prioritet | Status    |
| ------- | ---------------------------- | --------- | --------- |
| DOM-015 | Offentlig aktivitetskalender | P1        | ✅ Dekket |
| DOM-016 | Hierarkiske kategorier       | P1        | ✅ Dekket |
| DOM-017 | Listing mediehåndtering      | P1        | ✅ Dekket |

---

## 2.2 Plattformkrav (SAAS-001 til SAAS-010)

### SAAS-001: Multi-Tenant Arkitektur

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | SAAS-001     |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |
| **Kilde**     | PRD v2.0     |

**Funksjonelle krav:**

- Alle tenant-scoped tabeller MÅ ha `tenant_id` kolonne
- Alle spørringer MÅ filtrere basert på tenant-kontekst
- API guards MÅ validere tenant-tilgang
- Kryssing av tenant-data krever saas scope

**Implementasjon:**

```sql
-- Tenant-tabell
CREATE TABLE platform.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status tenant_status DEFAULT 'active',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row-Level Security
ALTER TABLE domain.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON domain.listings
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

---

### SAAS-002: Rollebasert Tilgangskontroll (RBAC)

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | SAAS-002     |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |

**Fire nivåer av tilgangskontroll:**

| Scope    | Nivå         | Beskrivelse    | Eksempel-rettigheter                |
| -------- | ------------ | -------------- | ----------------------------------- |
| `user`   | Personlig    | Egen portal    | Se egne bookinger, opprette booking |
| `org`    | Organisasjon | Avdeling/enhet | Administrere anlegg, godkjenne      |
| `tenant` | Kommune      | Hele tenant    | Administrere organisasjoner         |
| `saas`   | Platform     | Alle tenants   | Systemkonfigurasjon                 |

---

### SAAS-003: ID-porten Integrasjon

| Attribute     | Verdi          |
| ------------- | -------------- |
| **ID**        | SAAS-003       |
| **Prioritet** | P0 (Kritisk)   |
| **Status**    | 🔄 I utvikling |

**Funksjonelle krav:**

- System MÅ støtte autentisering via ID-porten (BankID/MinID)
- OpenID Connect med PKCE flow
- Sikkerhetsnivå 3/4

---

## 2.3 Sikkerhetskrav (SEC-001 til SEC-004)

### SEC-001: Datakryptering

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | SEC-001      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |

**Krav:**

- TLS 1.3 for all trafikk
- AES-256 for persondata i hvile
- httpOnly, Secure, SameSite cookies

---

### SEC-002: Inputvalidering

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | SEC-002      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |

**Krav:**

- Alle inputs MÅ valideres med Zod-skjemaer
- SQL injection forebygges via ORM (Drizzle)
- XSS forebygges via CSP headers
- CSRF-beskyttelse på alle muterende operasjoner

---

### SEC-003: Revisjonslogging

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | SEC-003      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |

**Krav:**

- Alle tilstandsendringer MÅ logges med brukerkontekst
- Revisjonslogg MÅ være uforanderlig (append-only)
- Oppbevaringstid: 10 år

---

### SEC-004: GDPR Etterlevelse

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | SEC-004      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |

**Artikkel-mapping:**

| GDPR Artikkel | Krav                 | Implementasjon                  |
| ------------- | -------------------- | ------------------------------- |
| Art. 6        | Lovlig behandling    | Eksplisitt samtykke per booking |
| Art. 12-14    | Informasjonsplikt    | Personvernerklæring             |
| Art. 15       | Rett til innsyn      | JSON eksport                    |
| Art. 16       | Rett til retting     | Profilredigering                |
| Art. 17       | Rett til sletting    | Anonymisering                   |
| Art. 20       | Dataportabilitet     | JSON eksport innen 30 dager     |
| Art. 30       | Behandlingsprotokoll | Automatisk logging              |
| Art. 32       | Sikkerhet            | Kryptering, tilgangskontroll    |

---

## 2.3 Anbudskrav (TND-001 til TND-009)

### TND-001: Offentlig Kalender

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | TND-001      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |

**Funksjonelle krav:**

- Sanntids tilgjengelighetsvisning med flere visninger
- Måneds-, uke-, og dagvisning
- Offentlig kalender viser belegg uten persondata
- Fargekodede statusindikatorer

---

### TND-008: Bookingstatus-sporing

| Attribute     | Verdi        |
| ------------- | ------------ |
| **ID**        | TND-008      |
| **Prioritet** | P0 (Kritisk) |
| **Status**    | ✅ Dekket    |

**Fullstendig tilstandsmaskin:**

```
draft → pending → awaiting_payment → awaiting_approval → confirmed → completed
              ↓           ↓                ↓               ↓
           expired    expired          rejected        cancelled
                                                            ↓
                                                        refunded
```

---

# Del 3: Teknisk Arkitektur

## 3.1 Systemarkitektur

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DIGILIST PLATFORM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   FRONTEND LAYER (React Router 7 / React 19)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │   Web App   │  │  Backoffice │  │ Learning Hub│  │   Docs    │ │
│  │    :8000    │  │    :8001    │  │    :8003    │  │   :8002   │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬─────┘ │
│         │                │                │                │       │
│         └────────────────┴────────────────┴────────────────┘       │
│                                   │                                 │
│   API LAYER (Fastify 5 - Thin Transport)                          │
│                          ┌───────▼───────┐                         │
│                          │   API Server  │                         │
│                          │    :4000      │                         │
│                          └───────┬───────┘                         │
│                                  │                                  │
│   DATA LAYER                     │                                  │
│         ┌────────────────────────┼────────────────────────┐        │
│         │                        │                        │        │
│  ┌──────▼──────┐          ┌──────▼──────┐          ┌──────▼──────┐│
│  │ PostgreSQL  │          │    Redis    │          │   Worker    ││
│  │     16      │          │    7.x      │          │  (BullMQ)   ││
│  └─────────────┘          └─────────────┘          └─────────────┘│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
 ┌───────▼───────┐          ┌───────▼───────┐          ┌───────▼───────┐
 │   ID-porten   │          │     Vipps     │          │     BRREG     │
 │   (Auth)      │          │   (Payment)   │          │ (Verification)│
 └───────────────┘          └───────────────┘          └───────────────┘
```

## 3.2 Teknologivalg

| Komponent   | Teknologi            | Versjon | Begrunnelse             |
| ----------- | -------------------- | ------- | ----------------------- |
| Frontend    | React + React Router | 19 / 7  | SSR, streaming, moderne |
| API         | Fastify              | 5.x     | Høy ytelse, TypeScript  |
| Database    | PostgreSQL           | 16.x    | ACID, JSON, Range-typer |
| ORM         | Drizzle              | 0.30+   | Type-sikker, performant |
| Cache/Queue | Redis                | 7.x     | Sessions, BullMQ        |
| Språk       | TypeScript           | 5.x     | Strict mode             |
| Monorepo    | pnpm + Turbo         | -       | Effektiv, caching       |
| UI          | @shared/ui           | -       | OKLCH tokens, WCAG AA   |

## 3.3 Databaseskjema

**Fire logiske skjemaer:**

```sql
-- Plattformtjenester
CREATE SCHEMA platform;  -- tenants, users, orgs, auth

-- Domenelogikk
CREATE SCHEMA domain;    -- listings, bookings, payments

-- Overvåkning
CREATE SCHEMA monitoring; -- scans, reports, alerts

-- Delte ressurser
CREATE SCHEMA cross_cutting; -- files, assets
```

## 3.4 Monorepo-struktur

```
digilist-platform/
├── apps/                          # 8 applikasjoner
│   ├── api/                       # Fastify REST API
│   ├── web/                       # Publikumsportal
│   ├── backoffice/               # Saksbehandler-UI
│   ├── monitoring/               # QA Dashboard
│   ├── docs/                     # Dokumentasjon
│   ├── learning-hub/             # E-læring
│   ├── saas/                     # Tenant Admin
│   └── worker/                   # BullMQ jobs
│
├── packages/                      # Delte pakker
│   ├── server/
│   │   ├── data/                 # Drizzle ORM (domain)
│   │   ├── platform-data/        # Platform-skjema
│   │   └── monitoring-data/      # Overvåkning-skjema
│   │
│   ├── shared/
│   │   ├── ui/                   # @shared/ui komponentbibliotek
│   │   ├── i18n/                 # Internasjonalisering
│   │   ├── validation/           # Zod-skjemaer
│   │   └── contracts/            # DTOs og kontrakter
│   │
│   └── client/
│       ├── api-client/           # API-klient
│       └── domain-hooks/         # React Query hooks
│
├── infra/                         # Infrastruktur
│   └── deploy/
│       ├── scripts/deploy.sh     # Deployment-skript
│       └── environments/         # Miljøkonfig
│
└── docs/                          # Dokumentasjon
    ├── 01-product/               # PRD, SRSD
    ├── 02-architecture/          # Arkitektur
    └── requirements/             # Kravsporing
```

---

# Del 4: Testing og Kvalitetssikring

## 4.1 Teststrategi

```
          ▲ E2E (Journey Tests)
         ╱ ╲  Playwright - 10%
        ╱   ╲
       ╱     ╲
      ▲───────▲ Integration (Scenario)
     ╱         ╲  76 assertions - 20%
    ╱           ╲
   ╱             ╲
  ▲───────────────▲ Unit Tests
 ╱                 ╲  Vitest - 70%
╱___________________╲
```

## 4.2 Testtyper og Dekning

| Type          | Verktøy            | Dekningsgrad    | Formål          |
| ------------- | ------------------ | --------------- | --------------- |
| Unit          | Vitest             | >95%            | Domenelogikk    |
| Integration   | Vitest + Supertest | >90%            | API-endepunkter |
| Scenario      | Scenario Hub       | 76 assertions   | Brukerhistorier |
| E2E/Journey   | Playwright         | Kritiske flyter | Brukerreiser    |
| Accessibility | axe-core           | WCAG 2.1 AA     | Tilgjengelighet |
| Security      | Semgrep, Gitleaks  | 100% kode       | Sårbarheter     |
| Performance   | Lighthouse         | Core Web Vitals | Ytelse          |

## 4.3 Kravsporing

Alle krav har full sporbarhet gjennom `requirements.json`:

```json
{
  "id": "DOM-001",
  "title": "Listing as ONLY Bookable Entity",
  "priority": "P0",
  "status": "covered",
  "traceability": {
    "schema": ["listings.ts"],
    "api": ["listings-routes.ts"],
    "services": ["listing.service.ts"],
    "hooks": ["useListing.ts"],
    "frontend": ["ListingCard.tsx"],
    "tests": ["listing.test.ts"]
  },
  "acceptanceCriteria": {
    "functional": [...],
    "architecture": [...],
    "testing": [...],
    "monitoring": [...]
  }
}
```

## 4.4 Monitoring Dashboard

Sanntids overvåkning via `apps/monitoring`:

- Kravstatuser per modul
- Testkjøringshistorikk
- Journey-rapporter med skjermbilder
- Dekningsmålinger
- Sikkerhetsalarmer

---

# Del 5: Infrastruktur og Drift

## 5.1 Produksjonsmiljø

| Komponent  | Spesifikasjon           |
| ---------- | ----------------------- |
| Leverandør | Hostinger VPS           |
| Lokasjon   | Nederland (EU)          |
| IP         | 72.61.23.56             |
| OS         | Ubuntu 22.04            |
| Node.js    | 20.x LTS                |
| PM2        | v6.x                    |
| Nginx      | Reverse Proxy + SSL     |
| PostgreSQL | 16.x (lokal)            |
| Redis      | 7.x                     |
| SSL        | Let's Encrypt (Certbot) |

## 5.2 Domener

| Subdomen            | Port | Formål          |
| ------------------- | ---- | --------------- |
| digilist.no         | 8000 | Publikumsportal |
| api.digilist.no     | 4000 | REST API        |
| admin.digilist.no   | 8001 | Backoffice      |
| docs.digilist.no    | 8002 | Dokumentasjon   |
| learn.digilist.no   | 8003 | Opplæring       |
| monitor.digilist.no | 8004 | QA Dashboard    |

## 5.3 Deployment Protocol

Fire-fase deployment:

```bash
./infra/deploy/scripts/deploy.sh production api

# Fase 1: BUILD
# Lokal bundling med tsup

# Fase 2: PACKAGE
# Opprett deployment-pakke

# Fase 3: SYNC
# rsync til VPS

# Fase 4: ACTIVATE
# PM2 restart + helsesjekk
```

---

# Del 6: Ytelsesmål

## 6.1 Tekniske KPIer

| Metrikk                        | Mål     | Måling          |
| ------------------------------ | ------- | --------------- |
| LCP (Largest Contentful Paint) | < 2.5s  | Core Web Vitals |
| Time to Interactive            | < 3.5s  | Lighthouse      |
| API Response (p50)             | < 200ms | Appmonitor      |
| API Response (p95)             | < 500ms | Appmonitor      |
| Database Query (p95)           | < 100ms | DB-monitor      |
| Samtidige brukere              | 1000+   | Lasttesting     |
| Tilgjengelighet                | 99.9%   | Oppetidsmonitor |

## 6.2 Forretningsmål

| Metrikk               | År 1    | År 2    |
| --------------------- | ------- | ------- |
| Registrerte brukere   | 10 000+ | 25 000+ |
| Månedlig aktive       | 5 000+  | 15 000+ |
| Online booking-rate   | > 80%   | > 90%   |
| Auto-godkjenningsrate | > 60%   | > 70%   |
| Anleggsutnyttelse     | > 70%   | > 80%   |
| NPS                   | > 50    | > 60    |

---

# Del 7: Prosjektplan

## 7.1 Fase 1: MVP (Q1 2025) ✅ LEVERT

- ✅ Bookingmotor (alle 6 modeller)
- ✅ Anleggshåndtering (alle 6 typer)
- ✅ Brukerautentisering
- ✅ Grunnleggende godkjenningsflyt
- ✅ E-postvarsling
- ✅ Multi-tenant arkitektur
- ✅ RBAC og tilgangskontroll

## 7.2 Fase 2: Betaling (Q2 2025)

- Vipps-integrasjon
- Fakturagenerering
- Gjentakende bookinger
- Mobiloptimalisert webapp

## 7.3 Fase 3: Avansert (Q3 2025)

- RCO-integrasjon (låskoder)
- Sesongutleie-tildeling
- Kalenderintegrasjoner
- BRREG/NIF-verifisering

## 7.4 Fase 4: Enterprise (Q4 2025)

- Tverrkommunal booking
- Offentlig API
- White-label støtte

---

# Vedlegg A: Ordliste

| Begrep        | Definisjon                                     |
| ------------- | ---------------------------------------------- |
| Tenant        | Kommune eller organisasjon som bruker Digilist |
| Listing       | Bokbart anlegg (idrettshall, møterom, etc.)    |
| Bookable Unit | Underenhet som kan bookes separat              |
| Actor Type    | Prisgruppe (privatperson, idrettslag, etc.)    |
| Allocation    | Tidsblokk-reservasjon i kalender               |
| RBAC          | Role-Based Access Control                      |

---

# Vedlegg B: Kravstatus-Sammendrag

| Modul           | Antall | P0     | P1     | Dekket    |
| --------------- | ------ | ------ | ------ | --------- |
| Domain (DOM)    | 17     | 6      | 11     | 17/17 ✅  |
| Platform (SAAS) | 10     | 4      | 6      | 8/10      |
| Tender (TND)    | 9      | 3      | 6      | 9/9 ✅    |
| Security (SEC)  | 4      | 4      | 0      | 4/4 ✅    |
| **Total**       | **40** | **17** | **23** | **38/40** |

---

_Dokumentet generert: 8. januar 2026_\
_Xala Technologies AS_
