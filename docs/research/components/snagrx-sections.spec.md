# SnagRx Sections → APEX RUO Specification (GLP-1 / GLP-2 / GLP-3)

Source: https://snagrx.com/ (fetched 2026-09-08, markdown extraction).
Target: static site — `product-glp1.html`, `product-glp2.html`, `product-glp3.html` + shared `css/styles.css` + `js/main.js`.
Design language: existing APEX tokens only (no new palette). Fonts: Inter + Playfair Display. Gold #CA8A04 / bright #EAB308, ink #0C0A09, bg #FAFAF9, line #E7E5E4, muted #57534E. Radius 2px, ease cubic-bezier(0.22,1,0.36,1), reveal via IntersectionObserver (.reveal/.visible).

## COMPLIANCE (hard rule, all pages)
RUO research-chemical site. NEVER copy SnagRx medical/prescription language: no weight-loss efficacy claims, no dosing instructions for humans, no "doctor prescribed / shipped to your door in 1-2 days" as medication, no $69/mo telehealth pricing, no countdown timers implying Rx urgency, no Forbes/Stanford/NBC press logos (we have no such coverage — fabricating press is deceptive). Every adapted section keeps a Research-Use-Only qualifier where SnagRx implies human use.

## SnagRx topology → APEX mapping (each GLP page gets all 8, top to bottom)
1. **Promo bar** (SnagRx: orange "Fall Sale $69/$119" bar) → `.promo-bar`: gold bg, ink text, one line: batch-in-stock + COA-published + 24h processing. Static (no timer). Sits above fixed nav; body gets top padding equal to bar height. Dismissible via × button (JS, session-only, no storage needed).
2. **Benefit ticker** (SnagRx: "Accessible & Affordable / 125k+ Happy Customers" marquee) → reuse existing `.marquee` as-is. No change unless page lacks it (product pages currently lack it — ADD it directly below hero, items: ≥99% HPLC Verified ◆ Third-Party Tested ◆ Made in USA ◆ COA With Every Lot ◆ Research Use Only).
3. **Hero commerce block** (SnagRx: headline + $69/mo card + countdown + product img + CTAs) → extend existing `.pd-grid` hero, do NOT replace spec table. Add above price: `.stock-row` (pulsing green dot + "In Stock — Lot #APX-<CODE> · COA published" + link "View COA →" to contact.html), keep price/qty/quote form, add `.lot-line` under form ("Ships in 24h · Cold-chain guidance included · Batch-matched documentation"), add `.assurance-row` (three inline items: No hidden fees / Batch-matched COA / Cancel anytime before fulfillment). No countdown.
4. **Assay strip** (SnagRx: Forbes/Stanford/healthline/Fortune/NBC/NYT/Bloomberg logo row) → `.assay-strip`: dark band, kicker "Verified on every lot", 4 text cells (HPLC ≥99% / Mass Spec identity / Endotoxin screened / Heavy-metals screened). Text only, no external logos.
5. **Fulfillment timeline** (SnagRx: "Get meds in 1-2 days" 5-step + phone image) → `.fulfill` section reusing `.steps` (4 steps: Request quote → COA confirmation → Cold-chain shipment → Batch-matched docs). Static, no phone mockup; keep existing pd-media image in hero.
6. **In-stock cards** (SnagRx: Semaglutide/Tirzepatide $299→$69 cards) → upgrade existing "You May Also Study" `.product-grid`: add `.card-stock` badge ("In Stock" green pill) on each card-media top-right. No price-slash fakery (keep real prices).
7. **FAQ accordion** (SnagRx: 12-Q chat-style FAQ) → `.faq` accordion, 6 Qs per product (4 shared + 2 compound-specific). Click-to-expand, one open at a time, plus/minus icon rotation, max-height transition 350ms ease. Shared Qs: How is purity verified? What ships with my order? How is it shipped/stored? What if my lot's COA is missing? GLP-1 specific: structure/half-life + reconstitution solvent. GLP-2 specific: DPP-4 resistance + study endpoints. GLP-3 specific: triple-receptor scope + investigational status.
8. **Final CTA** (SnagRx: "Ready to Stop Food Cravings? Save $230 OFF") → reuse `.cta-band`: product-specific headline, no discount fakery. GLP-1: "Build GLP-1R research on a verifiable lot." GLP-2: "Study gut-barrier biology on a documented lot." GLP-3: "Run multi-receptor pharmacology on a verified lot." Sub: qualified labs only, batch-matched docs, cold-chain guidance. Button → products.html or contact.html.

## Shared class contract (foundation agent implements; page agents consume — do not rename)
- `.promo-bar`, `.promo-bar p`, `.promo-bar button.promo-close` (gold #CA8A04 bg, ink text, 0.72rem/700/0.18em uppercase, centered, 2.5rem min-height; body.has-promo padding-top)
- `.stock-row` (flex, 0.78rem, green dot pulse via @keyframes stockPulse), `.stock-dot`, `.lot-line` (0.8rem muted), `.assurance-row` (flex wrap gap, 0.72rem uppercase muted with gold ◆ separators)
- `.assay-strip` (ink bg, 4-col grid → 2-col ≤768px → 1-col ≤480px, gold serif values + muted uppercase labels)
- `.fulfill` (section wrapper, reuses .steps/.step/.step-num — only add eyebrow spacing if needed)
- `.faq` (max-width 880px centered), `.faq-item` (border-bottom 1px line), `.faq-q` (button, full-width, 1rem/600 left + plus icon ::after rotate 45deg when open), `.faq-a` (grid-template-rows 0fr→1fr transition 350ms ease, inner p muted 0.92rem)
- `.card-stock` (absolute top-right pill, green tint bg rgba(22,163,74,.15), green text #15803d, 0.62rem/700 uppercase)
- Responsive follows existing breakpoints (1024/768/480). prefers-reduced-motion: disable pulse/marquee/accordion animation.
- JS (js/main.js, extend IIFE): promo dismiss, FAQ accordion (one-open, aria-expanded), stock dot is CSS-only.

## Per-page content codes
- GLP-1: lot APX-G1-1042, Semaglutide NN9535, CAS 910463-68-2, 31-AA, 4113.58 Da, ~7d half-life, sizes 2/5/10/20 mg, $95/10mg, img vial-tray.jpg
- GLP-2: lot APX-G2-0871, Teduglutide, 33-AA Gly2→Ala, ~3900 Da, sizes 5/10/20 mg, $120/10mg, img glass-vials.jpg
- GLP-3: lot APX-G3-0593, Retatrutide LY3437943, CAS 2381089-83-2, 39-AA, 4731.33 Da, ~6d half-life, investigational/Phase 3 TRIUMPH, sizes 5/10/20/30 mg, $110/10mg, img lab-scientist.jpg

## Responsive / interaction models
Promo: static. Ticker: time-driven CSS marquee (existing). Hero additions: static. Assay: static + reveal. Fulfillment: static + reveal stagger. Cards: hover lift (existing). FAQ: click-driven accordion. Final CTA: static + reveal.
Desktop 1440 / tablet 768 / mobile 390. Breakpoints match styles.css (1024/768/480).
