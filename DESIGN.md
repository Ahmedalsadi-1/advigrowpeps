# Advigrow Peptides — Design System

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Status:** Active — Source of truth for all visual decisions

---

## 1. Design Philosophy

**Clarity. Deference. Depth.** — Apple's three principles, adopted here because they map to our product:

- **Clarity**: Research compounds demand precision. Every visual choice must reduce ambiguity, not add decoration.
- **Deference**: The content (compounds, COAs, data) is the hero. UI gets out of the way.
- **Depth**: Layered information (overview → detail → documentation) mirrors how researchers evaluate compounds.

**No defaults.** Every token, component, and pattern exists because the product needs it. If we can't write the reason, it doesn't ship.

---

## 2. Brand Identity

### Product Position
Precision research compounds for qualified laboratories. Documented purity. Verified identity. Shown in the lookbook — proven in the lab.

### Visual Character
**Editorial laboratory.** Not "tech startup," not "wellness brand." The aesthetic borrows from scientific publishing and archival photography: restrained typography, deliberate whitespace, gold as the single accent representing the "gold standard" of purity.

### Voice
Precise. Authoritative. No marketing fluff. "≥99% HPLC" not "premium quality." "Research Use Only" not "for your wellness journey."

---

## 3. Color System

### Core Palette (2 colors + 1 accent + neutrals)

| Token | Value | Role | Reason |
|-------|-------|------|--------|
| `--ink` | `#0C0A09` | Primary text, primary surfaces | Near-black with warmth; softer than pure #000 for long-form reading |
| `--bg` | `#FAFAF9` | Page background | Warm off-white (Stone 50); reduces eye strain vs clinical white |
| `--gold` | `#CA8A04` | **Single accent** — CTAs, key data, focus rings | Gold = "gold standard." Chosen for warmth against ink; not yellow, not orange |
| `--muted` | `#57534E` | Secondary text, labels | Stone 600; readable but clearly subordinate |
| `--line` | `#E7E5E4` | Borders, dividers, subtle structure | Stone 200; visible but not loud |

### Semantic Colors (derived, not new)

| Token | Value | Use Case |
|-------|-------|----------|
| `--bg-card` | `#FFFFFF` | Card surfaces on `--bg` |
| `--bg-elevated` | `#FFFFFF` | Modals, dropdowns, toast |
| `--primary` | `#1C1917` | Card text on `--bg-card` (Stone 900) |
| `--secondary` | `#44403C` | Subdued card text (Stone 700) |
| `--gold-bright` | `#EAB308` | Hover state for `--gold` (Gold 500) |
| `--focus` | `#CA8A04` | Focus rings (matches `--gold`) |
| `--success` | `#16A34A` | In-stock indicator only (Green 600) |
| `--error` | `#DC2626` | Form validation only (Red 600) |

### Forbidden
- Blue-purple gradients (default AI tell)
- Purple/pink/orange accent sprawl
- More than 3 active colors on any screen
- Semantic colors used decoratively (no green badges for "premium," no red for "hot")

### Dark Mode
**Not implemented by default.** Product is content-first; lab researchers work in light environments. If requested, implement as a proper toggle with persisted preference — not a forced default.

---

## 4. Typography

### Typefaces

| Role | Font | Weights | Reason |
|------|------|---------|--------|
| **Display/Headlines** | `Playfair Display` | 400, 500, 600, 700 | Editorial serif; high contrast, distinctive italics; signals "published standard" |
| **UI/Body** | `Inter` | 300, 400, 500, 600, 700 | System-ui fallback; exceptional readability at small sizes; neutral character |
| **Data/Monospace** | `JetBrains Mono` | 400, 500, 600 | COA values, lot numbers, technical specs; tabular figures |

**No Satoshi, Geist, Space Grotesk, Averia Serif Libre.** Those were template defaults.

### Type Scale (Fluid, Clamp-based)

| Token | Mobile | Desktop | Use Case |
|-------|--------|---------|----------|
| `--text-display` | `clamp(2.5rem, 7vw, 5.5rem)` | `clamp(3.5rem, 8vw, 7rem)` | Hero headline |
| `--text-h1` | `clamp(2rem, 5vw, 3.5rem)` | `clamp(2.5rem, 5.5vw, 4.5rem)` | Page titles |
| `--text-h2` | `clamp(1.75rem, 4vw, 2.75rem)` | `clamp(2rem, 4.5vw, 3.5rem)` | Section heads |
| `--text-h3` | `1.25rem` | `1.5rem` | Card titles, subsection heads |
| `--text-body` | `1rem` | `1.0625rem` | Primary body copy |
| `--text-body-lg` | `1.0625rem` | `1.125rem` | Lead paragraphs |
| `--text-sm` | `0.875rem` | `0.875rem` | Metadata, captions |
| `--text-xs` | `0.75rem` | `0.75rem` | Labels, kickers, legal |
| `--text-micro` | `0.6875rem` | `0.6875rem` | Purity badges, timestamps |

### Typographic Details

- **Line height**: Body `1.7`, Headlines `1.05–1.15`, Tight data `1.3`
- **Letter spacing**: Body `0`, Headlines `-0.015em`, Uppercase labels `0.18–0.24em`
- **Text wrap**: `balance` on headlines; `pretty` on body where supported
- **Font feature settings**: `cv02`, `cv03`, `cv04`, `cv11` on Inter (OpenType discretionary ligatures)

### Kicker Pattern (Reusable)

```css
.kicker {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--text-xs); font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--gold);
}
.kicker::before {
  content: ""; width: 2.5rem; height: 1px; background: var(--gold);
}
```
**Reason**: Section marker that scales; the line is structural, not decorative.

---

## 5. Spacing System

### Scale (8px base, semantic naming)

| Token | Value | Use Case |
|-------|-------|----------|
| `--space-1` | `0.5rem` (8px) | Micro gaps, inline gaps |
| `--space-2` | `1rem` (16px) | Component internal padding |
| `--space-3` | `1.5rem` (24px) | Component external margins |
| `--space-4` | `2rem` (32px) | Section element separation |
| `--space-5` | `3rem` (48px) | Section-to-section (default) |
| `--space-6` | `4.5rem` (72px) | Major section breaks |
| `--space-7` | `6.5rem` (104px)` | Page-level rhythm anchors |

### Responsive Containers

| Token | Value | Use Case |
|-------|-------|----------|
| `--gutter` | `clamp(1.25rem, 4vw, 2rem)` | Page horizontal padding |
| `--container-max` | `1280px` | Content max-width |
| `--container-narrow` | `880px` | Prose, CTA bands |
| `--section-pad` | `clamp(4rem, 8vw, 7rem)` | Standard section vertical padding |
| `--section-pad-tight` | `clamp(3rem, 6vw, 5rem)` | Dense sections (stats, FAQ) |

### Rhythm Principle (RHYTHM = 2: Varied)
Sections alternate density: spacious hero → tight stats band → editorial split → spacious CTA. **No uniform section padding.**

---

## 6. Border Radius System

**Deliberate, not uniform.** Three radii only:

| Token | Value | Use Case | Reason |
|-------|-------|----------|--------|
| `--radius-sharp` | `2px` | Cards, tables, inputs, badges | Editorial precision; matches lab aesthetic |
| `--radius-pill` | `9999px` | Primary CTAs, filter chips, toast | Single generous radius on action elements |
| `--radius-media` | `16px` | Hero media, product images | Softens photographic content without pill look |

**Forbidden:** `8px`, `12px`, `16px` on everything. Radius is a hierarchy tool, not decoration.

---

## 7. Shadow & Elevation System

**Elevation is meaning.** Three levels only:

| Token | Value | Use Case | Reason |
|-------|-------|----------|--------|
| `--shadow-ground` | `none` | Default — everything sits on the page | Ground plane is the default |
| `--shadow-card` | `0 1px 3px rgba(12,10,9,0.04), 0 4px 12px rgba(12,10,9,0.06)` | Product cards, elevated panels | Barely perceptible; separates card from page |
| `--shadow-elevated` | `0 10px 40px rgba(12,10,9,0.15), 0 2px 8px rgba(12,10,9,0.1)` | Modals, dropdowns, mobile nav | Clear separation for overlay surfaces |
| `--shadow-gold` | `0 0 0 3px rgba(202,138,4,0.35)` | Focus rings only | Visible, on-brand, accessible |

**No glow, no inner shadows, no colored shadows.** Gold focus ring is the only colored shadow.

---

## 8. Motion System

### MOTION Dial: 2 (Purposeful transitions only)

| Token | Value | Use Case |
|-------|-------|----------|
| `--ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default easing (Apple's spring feel) |
| `--ease-expressive` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hero entrance, scale transforms |
| `--dur-fast` | `150ms` | Hover, focus, press |
| `--dur-standard` | `300ms` | Transitions, reveals, accordion |
| `--dur-slow` | `500ms` | Hero entrance, page transitions |

### Motion Rules

1. **No endless loops.** Hero scroll indicator pulses once per 2s — **not infinite**. Marquee pauses on hover.
2. **Motion serves hierarchy.** Hero text rises in sequence (staggered 120ms). Cards lift on hover (-4px). Accordion expands with grid-template-rows.
3. **Respect `prefers-reduced-motion`.** All animations disable; reveals become instant; parallax off.
4. **No stacked animations.** One transition per element per interaction.

### Forbidden
- `animation-iteration-count: infinite` on UI elements (except marquee)
- Bounce, elastic, or spring on non-interactive elements
- Fade-up on every section (template default)

---

## 9. Component Library

### 9.1 Buttons

| Variant | Background | Text | Border | Radius | Use Case |
|---------|------------|------|--------|--------|----------|
| **Primary** | `--gold` | `--ink` | none | `--radius-pill` | One per view: main CTA |
| **Secondary** | transparent | `--bg` (on dark) / `--ink` (on light) | `1px solid currentColor` | `--radius-pill` | Alternative actions |
| **Tertiary** | transparent | `--muted` | none | `--radius-sharp` | Inline links styled as buttons |
| **Destructive** | `--error` | `#fff` | none | `--radius-pill` | Delete, remove (rare) |

**States:** Hover (brighten 10%), Active (scale 0.98), Focus (gold ring), Disabled (opacity 0.4, no pointer)

### 9.2 Navigation

**Desktop:** Floating glass pill (14px radius, blur 16px) — *single glass element, dose cap respected*. Scrolled state: darker, shadow, progress hairline.

**Mobile:** Full-screen overlay, staggered item entrance (60ms stagger). Burger animates to X.

**Links:** Underline on hover (gold, scaleX transition). Active page: gold underline + gold text.

### 9.3 Product Cards (Lookbook)

- Aspect ratio: 4:5 (portrait, editorial)
- Media: zoom on hover (1.06x, 700ms ease)
- Flag: pill badge, glass backdrop, gold text — *glass dose used here*
- Quick view: slides up on hover (functional, not decorative)
- Meta: serif title, muted subtitle, price/purity row with hairline border

### 9.4 Stats Band

- 4-column grid, 1px dividers (not cards)
- Values in Playfair, gold — **real data only**
- Labels in micro uppercase, muted
- No delta badges without real comparison period

### 9.5 Forms

- Labels: micro uppercase, muted, 0.5rem bottom margin
- Inputs: `--radius-sharp`, 1px `--line` border, 48px min height
- Focus: `--gold` border + `--shadow-gold` ring
- Placeholders: descriptive (`email@lab.edu`), never fake data (`john@example.com`)
- Error: `--error` border, inline message below field

### 9.6 Accordion (FAQ)

- Border-top on each item (hairline)
- Plus icon rotates 45° on open (gold)
- Grid-template-rows animation (smooth, no height calc)
- One open at a time (radio behavior)

### 9.7 Toast

- Fixed bottom-center, pill radius, gold border
- Slide up from 150% translate
- Auto-dismiss 3.2s, persistent on hover

### 9.8 Marquee

- Gold background, ink text, uppercase micro
- Pauses on hover (respects user intent)
- 28s cycle, 50% duplicate for seamless loop

---

## 10. Layout Patterns

### Section Composition (Varied by Intent)

| Section Type | Composition | Rhythm |
|--------------|-------------|--------|
| **Hero** | Full-bleed media + overlay content, bottom-aligned | `--space-7` after |
| **Collection** | Section head (left) + View All (right) → 3-col grid | `--space-6` after |
| **Stats** | 4-col divider grid, no cards | `--space-5` after |
| **Editorial Split** | 50/50 image + prose, inner border on image | `--space-6` after |
| **CTA Band** | Centered on pure ink; serif type + gold italic carry the moment (no glow) | `--space-7` after |
| **Footer** | 4-col grid → 2-col → 1-col responsive | Page end |

**No bento grids. No fake terminal windows. No 3-step "How It Works" unless the process is genuinely 3 steps.**

---

## 11. Content Standards

### Real Data Only
- Stats: real numbers or omit the stat
- COA values: actual batch data or "Pending verification"
- Stock: real inventory or "Contact for availability"
- Timelines: actual processing times or "Varies by compound"

### Placeholders (Honest)
- Inputs: `email@lab.edu`, `Your Name`, `Drop your message here...`
- Empty states: "No compounds match your filter. Try 'All' or contact us."
- Loading: "Loading compound data…" (specific)
- Error: "Failed to load COA. Retry or contact support."

### Legal
- RUO disclaimer in footer (mandatory)
- Terms, Privacy, RUO Policy pages exist and link
- No "demo without product" — every product page shows real compound data

---

## 12. Accessibility (Non-Negotiable)

- **Contrast**: All text ≥ 4.5:1 (AA), large text ≥ 3:1. Gold on ink: 4.8:1 ✓
- **Focus**: Visible gold ring (3px offset) on every interactive element
- **Keyboard**: Full navigation, logical tab order, Escape closes modals/nav
- **Screen readers**: Semantic HTML, ARIA labels on icon-only buttons, live regions for toast
- **Reduced motion**: All animations disable via media query
- **Zoom**: Layout holds at 200% zoom, no horizontal scroll

---

## 13. Breakpoints

| Breakpoint | Width | Strategy |
|------------|-------|----------|
| Mobile | `< 640px` | Single column, stacked nav, reduced padding |
| Tablet | `640px – 1023px` | 2-col grids, floating nav |
| Desktop | `≥ 1024px` | Full layouts, 3-col grids, hover states |

**No device-specific breakpoints.** Content-driven only.

---

## 14. Implementation Checklist (Delivery Gate)

Before any PR merges:

- [ ] Palette uses only defined tokens (no hex in components)
- [ ] Accent (`--gold`) appears at key moments only (count ≤ 3 per viewport)
- [ ] No decorative emoji in UI text
- [ ] Section compositions vary (no repeated template)
- [ ] No default AI shapes (bento, fake terminal, 3-col pricing, meaningless stripes)
- [ ] Every link/button has real destination or visible "Coming soon"
- [ ] Motion follows MOTION=2 (no infinite loops, purpose written)
- [ ] Glass/glow/shadow/radius at dose caps (glass ≤ 2, glow ≤ 1, shadow only elevated, radius 3 values)
- [ ] Layout built around user decision, not dashboard template
- [ ] All numbers/deltas/feeds real or labelled placeholders
- [ ] Empty fields use honest placeholders, never fake data
- [ ] Empty/loading/error states name cause + next action
- [ ] Passes keyboard-only, 200% zoom, reduced motion, WCAG AA

---

## 15. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-09-11 | Initial system — renamed to Advigrow Peptides (advigrow.online), removed dual-theme conflict and gradient hero panels, established single editorial laboratory language, defined all tokens with reasons |

---

**This document is the contract. If a design decision isn't here, it doesn't exist. If it's here but the reason is weak, challenge it.**