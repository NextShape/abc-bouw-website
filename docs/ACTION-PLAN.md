# SEO Action Plan — ABC Bouw BV

**Generated:** 2026-03-22
**Based on:** Full SEO Audit (score: 78/100)
**Target score:** 90+/100

---

## Critical (Fix Immediately)

### 1. Delete unused source images
**Impact:** Performance, deployment size
**Files:** 20 original images in `/images/` (~5 MB) that are not referenced in HTML. Only responsive variants (-480w, -768w, -1200w) are used.
**Action:** Delete the following files:
- `abc-bouw-bus-storten.jpeg` (206 KB)
- `abc-bouw-bus-trailer.jpeg` (315 KB)
- `abc-bouw-team-werk.jpeg` (193 KB)
- `badkamer-douche-tegels.jpeg` (223 KB)
- `grondwerk-tuin-grond.jpeg` (473 KB)
- `grondwerk-tuin-voor.jpeg` (405 KB)
- `keuken-voor-renovatie.jpeg` (179 KB)
- `lars.png` (size varies)
- `sloopwerk-badkamer-muren.jpeg` (332 KB)
- `sloopwerk-grote-ruimte.jpeg` (256 KB)
- `sloopwerk-keuken-baksteen.jpeg` (279 KB)
- `sloopwerk-keuken-vloer.jpeg` (size varies)
- `sloopwerk-toilet-gestript.jpeg` (246 KB)
- `straatwerk-tuinpad-af.jpeg` (429 KB)
- `straatwerk-tuinpad-detail.jpeg` (539 KB)
- `toilet-voor-renovatie.jpeg` (size varies)
- `uitbouw-baksteen-ramen.jpeg` (239 KB)
- `uitbouw-wit-patio.jpeg` (277 KB)
- `abcbouwlogo.png` — KEEP (used as favicon + OG image)

### 2. Delete unused JS files
**Impact:** Clean deployment
**Action:** Delete `js/config.js` (10.5 KB) and `js/template.js` (20 KB) — not loaded by any HTML page.

### 3. Expand diensten.html content
**Impact:** Content quality, rankings for service keywords
**Current:** Each service has 1-2 sentences in a card layout.
**Action:** Add detailed content section below each service card with:
- 3-4 paragraphs describing scope, process, materials, timeline
- When to choose this service
- Example project reference
- CTA to contact page
- Target: 200+ words per service, 1000+ words total page content

### 4. Expand projecten.html content
**Impact:** Content quality, local SEO, image search
**Current:** Project cards have 1-sentence descriptions.
**Action:** Add per project:
- Location (e.g., "Keukenrenovatie in Brunssum")
- Scope of work (what was done)
- Duration / timeline
- Challenge and solution narrative
- Target: 50-100 words per project

---

## High (Fix Within 1 Week)

### 5. Add proper favicon set
**Impact:** Branding, mobile UX, PWA readiness
**Action:**
- Generate `favicon.ico` (16x16 + 32x32) from logo
- Generate `apple-touch-icon.png` (180x180)
- Generate `favicon-32x32.png` and `favicon-16x16.png`
- Optionally create SVG favicon
- Add to all pages:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### 6. Minify CSS and JS for production
**Impact:** Performance, LCP
**Action:** Set up a simple build step:
- Combine 6 CSS files into 1 minified `style.min.css`
- Combine 3 JS files into 1 minified `app.min.js`
- Expected savings: ~40-50% file size reduction
- Tools: `csso`, `terser`, or simple npm script

### 7. Add Twitter Card meta tags
**Impact:** Social sharing, click-through from Twitter/X
**Action:** Add to all 5 pages:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[page title]">
<meta name="twitter:description" content="[page description]">
<meta name="twitter:image" content="https://abc-bouwbv.nl/images/[page-hero-image].webp">
```

### 8. Use page-specific OG images
**Impact:** Social sharing CTR
**Current:** All pages use `abcbouwlogo.png` as OG image.
**Action:** Update `og:image` on each page to use the page's hero image:
- index.html → abc-bouw-bus-storten-1200w.jpeg
- diensten.html → sloopwerk-grote-ruimte-768w.jpeg
- over-ons.html → abc-bouw-team-werk-1200w.jpeg
- projecten.html → uitbouw-baksteen-ramen-1200w.jpeg
- contact.html → abc-bouw-bus-trailer-1200w.jpeg

### 9. Recreate IndexNow key file
**Impact:** Faster indexing after content changes
**Action:** Generate a new IndexNow API key and create the key file at root (e.g., `abc123.txt`). Update any IndexNow submission scripts.

### 10. Add AggregateRating to LocalBusiness schema
**Impact:** Rich snippet stars in search results
**Action:** Add to LocalBusiness schema in index.html (only if real reviews exist):
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "5",
  "bestRating": "5"
}
```

---

## Medium (Fix Within 1 Month)

### 11. Add AVIF image format
**Impact:** Performance, LCP improvement
**Action:** Generate AVIF variants for all responsive images and add as first `<source>` in `<picture>` elements:
```html
<picture>
  <source type="image/avif" srcset="images/photo-480w.avif 480w, ...">
  <source type="image/webp" srcset="images/photo-480w.webp 480w, ...">
  <img src="images/photo-768w.jpeg" ...>
</picture>
```

### 12. Optimize oversized responsive images
**Impact:** Performance
**Action:** Re-compress images exceeding 150 KB at 768w:
- straatwerk-tuinpad-detail-768w.webp (225 KB → target <100 KB)
- grondwerk-tuin-grond-768w.webp (224 KB → target <100 KB)
- grondwerk-tuin-voor-768w.webp (192 KB → target <100 KB)
- straatwerk-tuinpad-af-768w.webp (176 KB → target <100 KB)
- abc-bouw-bus-trailer-1200w.webp (304 KB → target <150 KB)

### 13. Add contextual internal links in body text
**Impact:** Crawl equity, user navigation, topical relevance
**Action:** Add 2-3 natural in-text links per page:
- over-ons.html: link "verbouw, renovatie, onderhoud" to diensten.html anchors
- index.html about section: link "projecten" to projecten.html
- diensten.html: link to specific project examples on projecten.html

### 14. Add `<meta name="theme-color">`
**Impact:** Mobile UX
**Action:** Add to all pages: `<meta name="theme-color" content="#FF0101">` (or whatever the brand primary color is)

### 15. Add hreflang self-referencing tags
**Impact:** International SEO signal
**Action:** Add to all 5 pages:
```html
<link rel="alternate" hreflang="nl" href="https://abc-bouwbv.nl/[page]">
<link rel="alternate" hreflang="x-default" href="https://abc-bouwbv.nl/[page]">
```

### 16. Replace Flaticon CDN with self-hosted icons
**Impact:** Performance (remove render-blocking external CSS)
**Action:** Only ~6 Flaticon icons are used. Either:
- Download only those icon SVGs and inline them, OR
- Self-host the subset CSS file

### 17. Configure HTTP security headers on hosting
**Impact:** Security score
**Action:** When deploying, set these as HTTP response headers (not just meta tags):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy: default-src 'self' ...`

---

## Low (Backlog)

### 18. Add customer testimonials / reviews section
**Impact:** E-E-A-T, local SEO trust signals
**Action:** Add 3-5 customer testimonials with name, project type, and location. Add Review schema markup.

### 19. Add `changefreq` and `priority` to sitemap
**Impact:** Crawl guidance (minor)
**Action:** Update sitemap.xml entries with priority values (homepage 1.0, diensten 0.8, etc.)

### 20. Add webmanifest for PWA basics
**Impact:** Mobile install prompt, branding
**Action:** Create `site.webmanifest` with icons, theme color, display mode.

### 21. Consider service worker for offline caching
**Impact:** Repeat visitor performance
**Action:** Basic service worker to cache CSS, JS, and font files.

### 22. Add blog/news section for fresh content
**Impact:** Long-term SEO growth, topical authority
**Action:** Create a blog with content about construction projects, renovation tips, regional construction news in Zuid-Limburg.

---

## Implementation Priority Summary

| Priority | Items | Est. Score Impact |
|---|---|---|
| Critical (#1-4) | 4 items | +5-8 points |
| High (#5-10) | 6 items | +4-6 points |
| Medium (#11-17) | 7 items | +3-5 points |
| Low (#18-22) | 5 items | +2-3 points |

**Projected score after Critical + High:** ~88/100
**Projected score after all items:** ~92/100
