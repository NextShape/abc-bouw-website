# Site Structuur — ABC Bouw BV

**Datum:** 2026-03-20

---

## Huidige structuur

```
abc-bouwbv.nl/
├── index.html          (Homepage)
├── over-ons.html       (Over Ons)
├── diensten.html       (Alle diensten op 1 pagina)
├── projecten.html      (Projecten met voor/na sliders)
└── contact.html        (Contactformulier + gegevens)
```

**Pagina's:** 5
**Diepte:** 1 niveau

---

## Aanbevolen structuur (einddoel)

```
abc-bouwbv.nl/
│
├── index.html                          ← Homepage
├── over-ons.html                       ← Over Ons + E-E-A-T
├── contact.html                        ← Contact + Offerte
│
├── diensten.html                       ← Diensten overzicht
│   ├── diensten/verbouw.html           ← Verbouw detail
│   ├── diensten/uitbouw.html           ← Uitbouw detail
│   ├── diensten/onderhoud.html         ← Onderhoud detail
│   ├── diensten/sloopwerk.html         ← Sloopwerk detail
│   └── diensten/straatwerk.html        ← Straatwerk detail
│
├── projecten.html                      ← Projecten overzicht
│
├── werkgebied/                         ← Location pages
│   ├── werkgebied/brunssum.html
│   ├── werkgebied/heerlen.html
│   ├── werkgebied/sittard.html
│   ├── werkgebied/kerkrade.html
│   ├── werkgebied/landgraaf.html
│   └── werkgebied/parkstad.html
│
├── blog/                               ← Kennisbank
│   ├── blog/index.html
│   └── blog/[artikel-slug].html
│
├── robots.txt
├── sitemap.xml
└── llms.txt                            ← AI search optimalisatie
```

**Pagina's:** 20+ (einddoel)
**Diepte:** max 2 niveaus

---

## URL Structuur

### Conventies
- Kleine letters, geen hoofdletters
- Koppeltekens als scheidingsteken
- Nederlands-talig
- Kort en beschrijvend
- Geen trailing slash voor .html bestanden

### Voorbeelden
```
/diensten/verbouw.html          ✅ Goed
/diensten/verbouw/              ✅ Goed (als je naar clean URLs overgaat)
/diensten/Verbouw.html          ❌ Fout (hoofdletter)
/dienst_verbouw.html            ❌ Fout (underscore, geen map-structuur)
```

---

## Internal Linking Strategie

### Homepage → linkt naar
- Alle 5 diensten (service cards)
- Projecten pagina
- Contact pagina (CTA)
- Over Ons (in "Over ons" sectie)

### Diensten overzicht → linkt naar
- Individuele dienstpagina's (wanneer aangemaakt)
- Relevante projecten
- Contact (CTA)

### Dienstpagina → linkt naar
- Gerelateerde diensten (sidebar of onderin)
- Relevante projecten als voorbeeld
- Contact (CTA voor offerte)
- Blog artikelen over dit onderwerp

### Projecten → linkt naar
- Relevante dienstpagina
- Contact (CTA)

### Blog artikel → linkt naar
- Relevante dienstpagina (keyword anchor text)
- Gerelateerde blogartikelen
- Contact (CTA)

---

## Navigatie Structuur

### Hoofdnavigatie (huidige 5 items — behouden)
```
Home | Over Ons | Diensten | Projecten | Contact
```

### Toekomstige uitbreiding met dropdown
```
Home | Over Ons | Diensten ▼ | Projecten | Blog | Contact
                  ├── Verbouw
                  ├── Uitbouw
                  ├── Onderhoud
                  ├── Sloopwerk
                  └── Straatwerk
```
