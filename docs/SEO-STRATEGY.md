# SEO Strategie — ABC Bouw BV

**Bedrijf:** ABC Bouw BV
**Locatie:** Brunssum, Zuid-Limburg
**Type:** Bouwbedrijf / Aannemer (familiebedrijf)
**Diensten:** Verbouw, Uitbouw, Onderhoud, Sloopwerk, Straatwerk
**Datum:** 2026-03-20

---

## 1. Bedrijfsprofiel & Doelgroep

### Bedrijf
- Familiebedrijf sinds 2009, overgenomen door Lars Vootz in 2025
- Vast team van 7 vakmensen
- 250+ afgeronde projecten, 16+ jaar ervaring
- Werkgebied: Zuid-Limburg (Brunssum, Heerlen, Sittard, Parkstad)

### Doelgroep
- **Primair:** Woningeigenaren in Zuid-Limburg die willen verbouwen, renoveren of onderhouden
- **Secundair:** Vastgoedeigenaren, VvE's, kleine zakelijke panden
- **Zoekintenties:** "Ik wil mijn keuken/badkamer/woning laten verbouwen" → zoekt lokale aannemer

---

## 2. Keyword Strategie

### Primaire Keywords (hoog volume, lokale intentie)

| Keyword | Prioriteit | Pagina |
|---------|-----------|--------|
| aannemer Brunssum | Hoog | index.html |
| bouwbedrijf Zuid-Limburg | Hoog | index.html |
| verbouwing Brunssum | Hoog | diensten.html |
| aannemer Zuid-Limburg | Hoog | index.html |
| renovatie Zuid-Limburg | Hoog | diensten.html |

### Secundaire Keywords (dienst-specifiek)

| Keyword | Prioriteit | Pagina |
|---------|-----------|--------|
| keuken verbouwen Limburg | Medium | diensten.html |
| badkamer renovatie Brunssum | Medium | diensten.html |
| uitbouw laten plaatsen Zuid-Limburg | Medium | diensten.html |
| sloopwerk aannemer Limburg | Medium | diensten.html |
| straatwerk oprit Brunssum | Medium | diensten.html |
| onderhoud woning Limburg | Medium | diensten.html |

### Long-tail Keywords (laag volume, hoge conversie)

| Keyword | Pagina |
|---------|--------|
| aannemer verbouwing offerte Brunssum | contact.html |
| badkamer laten renoveren Heerlen | diensten.html |
| betrouwbare aannemer Parkstad | over-ons.html |
| woning verbouwen kosten Zuid-Limburg | diensten.html |
| familiebedrijf aannemer Limburg | over-ons.html |

### Geo-modificaties (toevoegen aan alle keywords)
- Brunssum, Heerlen, Sittard, Geleen, Kerkrade, Landgraaf, Parkstad, Zuid-Limburg, Limburg

---

## 3. Huidige Site Analyse

### Wat er goed is
- `lang="nl"` correct ingesteld
- Meta titles en descriptions aanwezig op alle pagina's
- Responsive viewport meta tag
- Breadcrumbs op subpagina's
- Goede interne navigatiestructuur (5 pagina's)
- Telefoon-CTA prominent in header
- Voor/na projectfoto's (social proof)
- Sterke "Over Ons" content met E-E-A-T signalen (ervaring, team, directeur)

### Wat er ontbreekt / verbeterd moet worden

#### Kritiek
1. **Geen canonical tags** — risico op duplicate content
2. **Geen Open Graph / social meta tags** — slechte previews bij delen
3. **Geen structured data (Schema.org)** — geen rich results in Google
4. **Geen robots.txt** — crawlers weten niet wat ze moeten doen
5. **Geen sitemap.xml** — Google kan pagina's missen
6. **Geen H2-structuur op diensten.html** — alleen H3's, ontbreekt hiërarchie

#### Belangrijk
7. **Title tags kunnen sterker** — meer keyword-gericht
8. **Geen aparte dienstpagina's** — alle diensten op één pagina, geen diepte
9. **Geen blog/kennisbank** — mist topical authority
10. **Geen Google Business Profile optimalisatie** — essentieel voor local SEO
11. **Geen reviews/testimonials** — mist social proof in zoekresultaten
12. **Contact formulier heeft geen `action`** — `onsubmit="return false;"` doet niets

#### Nice-to-have
13. **Geen hreflang nodig** — site is alleen Nederlands
14. **Footer diensten niet gelinkt** — footer items zijn geen links
15. **Afbeeldingen missen `width`/`height` attributen** — CLS risico

---

## 4. Concurrentie Analyse

### Top 5 Concurrenten in Zuid-Limburg

| # | Bedrijf | Sterke punten | Zwakke punten |
|---|---------|--------------|---------------|
| 1 | **Kelleners Bouw** | 40+ jaar ervaring, sterke SEO, dienstpagina's | Grote concurrent, moeilijk te verslaan op generieke termen |
| 2 | **PBI Bouw** | "Aannemers Zuid Limburg" pagina, location targeting | Minder persoonlijk, focus op prijs |
| 3 | **Bouwbedrijf Van der Werf** | 25+ jaar, gevestigd in Brunssum, directe concurrent | Oudere website |
| 4 | **Mirabouw** | Brunssum-gevestigd, vergelijkbare diensten | Minder online zichtbaarheid |
| 5 | **SVW Aannemingsbedrijf** | Lokale SEO pagina's per regio, Sittard | Iets verder weg van kerngebied |

### Kansen vs. Concurrentie
- **Familiebedrijf-verhaal** — uniek E-E-A-T signaal dat concurrenten minder sterk hebben
- **Voor/na foto's** — sterke visuele content die concurrenten minder gebruiken
- **Brunssum-focus** — directe lokale relevantie, minder concurrentie dan "Heerlen" of "Maastricht"
- **Aparte dienstpagina's** — de meeste lokale concurrenten hebben dit niet goed uitgewerkt

---

## 5. Site Architectuur (Aanbevolen)

### Huidige structuur (5 pagina's)
```
/ (index.html)
├── /over-ons
├── /diensten
├── /projecten
└── /contact
```

### Aanbevolen structuur (fase 1 + fase 2)
```
/ (index.html)
├── /over-ons
├── /diensten
│   ├── /diensten/verbouw
│   ├── /diensten/uitbouw
│   ├── /diensten/onderhoud
│   ├── /diensten/sloopwerk
│   └── /diensten/straatwerk
├── /projecten
├── /contact
├── /robots.txt
└── /sitemap.xml
```

### Toekomstige uitbreiding (fase 3+)
```
├── /werkgebied
│   ├── /werkgebied/brunssum
│   ├── /werkgebied/heerlen
│   ├── /werkgebied/sittard
│   └── /werkgebied/parkstad
├── /blog
│   ├── /blog/kosten-badkamer-renovatie
│   ├── /blog/verbouwing-planning-tips
│   └── /blog/wanneer-uitbouw-vergunning
└── /reviews
```

---

## 6. On-Page Optimalisatie Aanbevelingen

### Title Tags (verbeterd)

| Pagina | Huidig | Aanbevolen |
|--------|--------|-----------|
| index.html | ABC Bouw BV \| Verbouw, Renovatie en Onderhoud in Zuid-Limburg | Aannemer Brunssum \| Verbouw & Renovatie Zuid-Limburg — ABC Bouw BV |
| diensten.html | Diensten \| ABC Bouw BV | Onze Diensten: Verbouw, Uitbouw, Sloopwerk & Meer \| ABC Bouw BV |
| over-ons.html | Over Ons \| ABC Bouw BV | Over ABC Bouw BV — Familiebedrijf & Aannemer Brunssum |
| projecten.html | Projecten \| ABC Bouw BV | Projecten & Referenties \| Verbouw & Renovatie Zuid-Limburg |
| contact.html | Contact \| ABC Bouw BV | Contact & Offerte Aanvragen \| ABC Bouw BV Brunssum |

### Meta Descriptions (verbeterd)
Alle huidige descriptions zijn al redelijk goed. Aanbevelingen:
- Voeg altijd een CTA toe ("Vraag een vrijblijvende offerte aan")
- Noem specifiek "Brunssum" en "Zuid-Limburg"
- Houd onder 155 tekens

---

## 7. E-E-A-T Signalen

### Wat er al is (goed)
- Directeur benoemd (Lars Vootz) met foto
- Bedrijfsgeschiedenis (sinds 2009)
- Concrete cijfers (250+ projecten, 16+ jaar, 7 vakmensen)
- Missie, visie en waarden beschreven

### Wat er nog bij moet
- **Reviews/testimonials** van klanten op de site
- **Google Business Profile** met reviews
- **KvK-nummer** in footer of contact
- **Verzekeringen/certificeringen** vermelden
- **Projectpagina's met details** (locatie, scope, duur, klantquote)
- **Blog/kenniscontent** om expertise te tonen

---

## 8. Technische SEO Basis

### Toe te voegen aan alle pagina's
1. **Canonical tag**: `<link rel="canonical" href="https://abc-bouwbv.nl/[pagina]">`
2. **Open Graph tags**: og:title, og:description, og:image, og:url, og:type
3. **Structured Data**: LocalBusiness + Service schema (JSON-LD)
4. **Robots.txt** + **sitemap.xml**
5. **`width` en `height` op images** voor CLS

### Performance
- Afbeeldingen optimaliseren (WebP formaat overwegen)
- CSS bestanden combineren of critical CSS inline
- Lazy loading al deels aanwezig (goed)

---

## 9. KPI Targets

| Metric | Baseline (nu) | 3 Maanden | 6 Maanden | 12 Maanden |
|--------|--------------|-----------|-----------|------------|
| Organic Traffic | 0 (niet live) | 100-200/mnd | 400-600/mnd | 1000+/mnd |
| "aannemer Brunssum" ranking | - | Top 20 | Top 10 | Top 5 |
| "bouwbedrijf Zuid-Limburg" ranking | - | Top 30 | Top 15 | Top 10 |
| Geïndexeerde pagina's | 0 | 5 | 10-15 | 20+ |
| Google Business reviews | 0 | 5+ | 15+ | 30+ |
| Core Web Vitals | Onbekend | Alle "Good" | Alle "Good" | Alle "Good" |

---

## 10. Samenvatting Quick Wins

1. **Title tags optimaliseren** met keywords + locatie
2. **Canonical tags** toevoegen aan alle pagina's
3. **Schema.org LocalBusiness** JSON-LD toevoegen
4. **robots.txt** en **sitemap.xml** aanmaken
5. **Open Graph meta tags** toevoegen
6. **Footer diensten linkbaar maken** naar diensten.html
7. **Google Business Profile** aanmaken en optimaliseren
8. **KvK-nummer** toevoegen aan footer
