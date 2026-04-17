# Full SEO Audit Report — ABC Bouw BV

**Domain:** abc-bouwbv.nl (not yet live)
**Audit Date:** 2026-03-22
**Pages Crawled:** 5 (index.html, over-ons.html, diensten.html, projecten.html, contact.html)
**Business Type Detected:** Local Construction Company (Aannemer / Bouwbedrijf)
**Language:** Dutch (nl)
**Location:** Brunssum, Zuid-Limburg, Nederland

---

## Executive Summary

### Overall SEO Health Score: **78 / 100**

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 82/100 | 25% | 20.5 |
| Content Quality | 80/100 | 25% | 20.0 |
| On-Page SEO | 85/100 | 20% | 17.0 |
| Schema / Structured Data | 90/100 | 10% | 9.0 |
| Performance (CWV) | 55/100 | 10% | 5.5 |
| Images | 50/100 | 5% | 2.5 |
| AI Search Readiness | 85/100 | 5% | 4.25 |
| **Total** | | | **78.75** |

### Top 5 Critical Issues
1. **Original source images (5.1 MB) still in `/images/` folder** — unnecessary weight if deployed
2. **CSS/JS not minified** — 76 KB CSS + 48 KB JS served unminified
3. **Diensten & Projecten pages are thin content** — short card descriptions only
4. **No proper favicon set** — using full-size PNG logo as favicon (no ICO/SVG/apple-touch-icon)
5. **IndexNow key file missing** — referenced in memory but not present in project

### Top 5 Quick Wins
1. Delete 20 original source images (save ~5 MB deployment size)
2. Add `<meta name="theme-color">` for mobile browser chrome
3. Add `apple-touch-icon` and proper favicon sizes
4. Add `changefreq` and `priority` to sitemap.xml entries
5. Add Twitter Card meta tags to all pages

---

## 1. Technical SEO (82/100)

### Crawlability ✅
- **robots.txt:** Well-configured. Allows all crawlers, blocks training-only bots (CCBot, Bytespider). Sitemap reference present.
- **Sitemap:** Valid XML sitemap with all 5 pages, `lastmod` dates set (2026-03-20).
- **Internal linking:** All pages linked from header nav and footer on every page. Service anchor links work correctly.
- **URL structure:** Clean `.html` extensions, no query parameters, no dynamic URLs.

### Crawlability Issues
- **Sitemap missing `changefreq` and `priority`** — optional but recommended for signal weighting.

### Indexability ✅
- **Canonical tags:** Present on all 5 pages, pointing to correct absolute URLs.
- **No `noindex` directives:** All pages are indexable.
- **Language declaration:** `<html lang="nl">` on all pages ✅

### Indexability Issues
- **No hreflang tags** — Single-language site (nl). Adding `x-default` + `nl` self-referencing hreflang is best practice for Dutch sites to signal geo-targeting.

### Security ✅
- `X-Content-Type-Options: nosniff` ✅ (meta tag)
- `X-Frame-Options: DENY` ✅ (meta tag)
- `Referrer-Policy: strict-origin-when-cross-origin` ✅
- External links have `rel="noopener"` ✅

### Security Notes
- **Meta-based security headers** work partially — `X-Frame-Options` and `X-Content-Type-Options` should also be set as HTTP response headers on hosting for full browser support.
- **No Content-Security-Policy** — Low priority for a static site but good practice.
- **HSTS** must be set at server level once deployed.

### Core Web Vitals (Estimated from code analysis)

| Metric | Estimate | Status |
|---|---|---|
| LCP | ~2.5-3.5s | ⚠️ Needs improvement (large hero images) |
| INP | <100ms | ✅ Good (minimal JS, passive listeners) |
| CLS | <0.05 | ✅ Good (width/height on all images) |

### Render-Blocking Resources
- 6 local CSS files loaded synchronously (76 KB total unminified)
- Flaticon CDN CSS (render-blocking)
- img-comparison-slider CSS on index.html + projecten.html (render-blocking)
- Google Fonts: Non-blocking ✅ (media="print" onload pattern)

---

## 2. Content Quality (80/100)

### E-E-A-T Assessment

| Signal | Status | Notes |
|---|---|---|
| **Experience** | ✅ Good | Before/after project photos, 250+ projects stat, 16+ years |
| **Expertise** | ✅ Good | Detailed service descriptions, specific service types |
| **Authoritativeness** | ⚠️ Medium | KvK number present, but no external trust signals (reviews, certifications, industry memberships) |
| **Trustworthiness** | ✅ Good | Real business info, named director (Lars Vootz), phone number, GDPR consent |

### Content Depth by Page

| Page | Word Count (est.) | Assessment |
|---|---|---|
| index.html | ~500 | ✅ Good for homepage |
| diensten.html | ~200 | ⚠️ Thin — service cards have short descriptions only |
| over-ons.html | ~450 | ✅ Good — history, mission, vision, team |
| projecten.html | ~150 | ⚠️ Thin — project cards have minimal text |
| contact.html | ~100 | ✅ Acceptable for contact page |

### Content Issues
1. **diensten.html is thin content** — Each service has only 1-2 sentences in a card. Needs substantial body text per service (scope, process, benefits, when to choose this service).
2. **projecten.html lacks descriptive content** — Project cards have 1-sentence descriptions. Adding location, scope, timeline, challenge/solution narrative would significantly improve SEO value and citability.
3. **No customer testimonials or reviews** — Major gap for local construction SEO.
4. **No blog or news section** — No mechanism for fresh content signals.

### Readability
- Clear, concise Dutch ✅
- Short paragraphs ✅
- Good heading structure ✅
- No jargon overload ✅

### Duplicate Content
- Service card text on index.html matches diensten.html — acceptable as summary vs. detail
- No cross-page duplicate content issues ✅

---

## 3. On-Page SEO (85/100)

### Title Tags

| Page | Title | Length |
|---|---|---|
| index.html | Aannemer Brunssum \| Verbouw & Renovatie Zuid-Limburg — ABC Bouw BV | 67 ✅ |
| diensten.html | Onze Diensten: Verbouw, Uitbouw, Sloopwerk & Meer \| ABC Bouw BV | 64 ✅ |
| over-ons.html | Over ABC Bouw BV — Familiebedrijf & Aannemer Brunssum | 55 ✅ |
| projecten.html | Projecten & Referenties \| Verbouw & Renovatie Zuid-Limburg — ABC Bouw BV | 73 ⚠️ |
| contact.html | Contact & Offerte Aanvragen \| ABC Bouw BV Brunssum | 51 ✅ |

All titles are unique with primary keywords included ✅

### Meta Descriptions ✅
All 5 pages have unique, keyword-rich meta descriptions within 120-160 chars ✅

### Heading Structure ✅
- All pages have exactly 1 H1 ✅
- H2/H3 hierarchy correct across all pages ✅
- No heading level skips ✅

### On-Page Issues
1. **H1 on index.html ("Samenwerken met ons?")** — Not keyword-optimized. Known user preference — keep as-is.
2. **No contextual internal links in body text** — Service cards link well, but paragraphs don't contain in-text links to related pages.
3. **OG images all point to logo PNG** — Should use page-specific hero images.
4. **No Twitter Card meta tags** on any page.

### Internal Linking
All pages are well-connected through header nav, footer links, and CTAs. Contact.html receives the most inbound link equity (conversion page). Service anchor links (#verbouw, #uitbouw etc.) from homepage and footer to diensten.html work correctly. ✅

---

## 4. Schema / Structured Data (90/100)

### Implementation

| Page | Schema Types |
|---|---|
| index.html | LocalBusiness, WebSite, WebPage, BreadcrumbList, SpeakableSpecification |
| diensten.html | WebPage, 5× Service, BreadcrumbList |
| over-ons.html | WebPage, BreadcrumbList |
| projecten.html | WebPage, BreadcrumbList |
| contact.html | ContactPage, BreadcrumbList |

### Strengths
- `@graph` pattern with `@id` cross-references ✅
- LocalBusiness includes: telephone, email, address, geo, areaServed, openingHours, offerCatalog ✅
- SpeakableSpecification on homepage ✅
- BreadcrumbList on all pages ✅

### Issues
1. **No AggregateRating** in LocalBusiness — would boost local search visibility (requires real review data)
2. **No ImageObject schema** for project photos
3. **Logo is PNG** in schema — should ideally reference a high-quality PNG URL (acceptable as-is)

---

## 5. Performance (55/100)

### Resource Inventory

| Resource | Count | Size | Minified |
|---|---|---|---|
| Local CSS | 6 files | 76 KB | ❌ |
| Local JS (loaded) | 3 files | ~17 KB | ❌ |
| External CSS (CDN) | 3 | ~50 KB | ✅ |
| External JS (CDN) | 1 | ~15 KB | ✅ |
| Responsive images | ~80 files | ~9 MB | — |
| Original images (unused) | 20 files | ~5 MB | — |

### Issues
1. **CSS not minified or concatenated** — 6 separate files served synchronously
2. **JS not minified** — app.js, animations.js, sliders.js served raw
3. **Unused JS files** — config.js (10.5 KB) and template.js (20 KB) exist but are not loaded. Safe to delete.
4. **20 original source images** (~5 MB) not referenced in HTML — should be deleted before deployment.
5. **Flaticon full icon library** loaded for ~6 icons — consider self-hosting only used icons or inline SVGs.
6. **No AVIF image format** — would improve compression 30-50% over WebP.
7. **Some 768w images exceed 200 KB** — e.g., straatwerk-tuinpad-detail-768w.webp (225 KB), should target <100 KB.

### LCP Optimization (Already Good)
- `<link rel="preload">` for hero images ✅
- `fetchpriority="high"` on LCP images ✅
- Responsive srcset with WebP fallback ✅

---

## 6. Images (50/100)

### Alt Text ✅
- 48 images with alt attributes across all pages
- 0 empty alt attributes ✅
- Descriptive, keyword-rich alt text ✅
- Brand name in key images ✅

### Format & Optimization

| Aspect | Status |
|---|---|
| WebP format | ✅ All responsive images |
| AVIF format | ❌ Not implemented |
| Responsive srcset | ✅ 480w, 768w, 1200w |
| Width/height | ✅ All images |
| Lazy loading | ✅ Below-fold images |
| fetchpriority | ✅ LCP images |
| decoding="async" | ✅ Lazy-loaded images |

### Issues
1. **20 original source images** (~5 MB) unused — delete before deployment
2. **No AVIF variants** — next-gen format for better compression
3. **Favicon is full-size PNG** — needs proper ICO/SVG + apple-touch-icon
4. **Some responsive images too large** — several 768w images >200 KB

---

## 7. AI Search Readiness (85/100)

### AI Crawler Access ✅
GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai all allowed. Training-only bots blocked. ✅

### llms.txt ✅
- Present at root ✅
- Business summary, services, contacts, page links ✅
- `<link rel="alternate">` from homepage ✅

### Citability Signals
- Clear factual statements ✅
- Named entities (Lars Vootz, ABC Bouw BV, Brunssum) ✅
- SpeakableSpecification ✅
- article:modified_time freshness signal on all pages ✅

### Issues
1. **IndexNow key file missing** — needs to be recreated
2. **No FAQ content** — highly citable by AI assistants (user prefers no FAQ)

---

## Previous Audit Comparison

Previous technical audit (2026-03-20): **72/100**
Current full audit: **78/100** (+6 points)

Major improvements since last audit:
- ✅ Schema markup on all pages
- ✅ AI crawler configuration + llms.txt
- ✅ Content improvements (keywords, KvK, service descriptions)
- ✅ SpeakableSpecification
- ✅ Security meta tags

Remaining gaps: performance (minification, image optimization), content depth on diensten.html and projecten.html.
