# Advigrow Peptides — Social Media Strategy

**Version:** 1.0 · 2026-09-11
**Domain:** advigrow.online
**Voice spec:** see DESIGN.md — precise, authoritative, no marketing fluff, no emoji.

---

## 1. The One Rule Before Everything: Compliance

Research-use-only peptides sit in one of the most moderated ad categories on social platforms. Meta and TikTok ban accounts whose content implies human use; "research chemicals" sold with consumer-coded imagery are the textbook ban pattern.

**Therefore:**
- Every post says **"For laboratory research use only."** (in caption, every time)
- Never: dosing, reconstitution protocols for personal use, before/after framing, weight-loss or longevity claims, "my cycle," injection content, euphemisms like "wellness" or "glow-up"
- Never run paid ads promoting compounds. Organic only.
- If a post can be read as advice for human consumption, it does not ship.

**Positioning:** We are a documentation company that sells to laboratories. Social content proves the standard, educates on analytical chemistry, and builds institutional trust — it does not sell vials.

---

## 2. Platforms (Start With Two)

| Platform | Role | Cadence | Why |
|----------|------|---------|-----|
| **Instagram** | Primary brand home | 3 posts/week + stories | Visual documentation aesthetic; lab scientists and biotech buyers are active; carousels for COA literacy |
| **LinkedIn** | B2B credibility | 2 posts/week | Institutional and bulk buyers live here; process + compliance posts build procurement trust |
| X (Twitter) | Optional, later | 3–5/week when ready | Science Twitter discusses methods, HPLC, reproducibility — good conversation surface, lower priority |
| TikTok | Skip | — | Highest moderation risk for this category |
| Facebook | Skip | — | Policy risk highest, audience fit lowest |

**10 hours/week budget:** 2h batching (write/capture), 30 min/day engagement.

---

## 3. Content Pillars

| Pillar | Share | What it is | Example |
|--------|-------|------------|---------|
| **The Standard** | 30% | Documentation as the product: COAs, chromatograms, third-party verification | "How to read a COA in 60 seconds" |
| **The Lab** | 25% | Process: SPPS, HPLC purification, MS identity, storage discipline | "Why every lot is lyophilized under nitrogen" |
| **Documentation Desk** | 20% | What to check before any compound enters your bench — regardless of vendor | "5 things a COA must contain" |
| **Discourse** | 15% | Commentary on published methods, reproducibility, standards in peptide supply | "Why '≥99%' without a chromatogram is a claim, not data" |
| **The Collection** | 10% | Compound pages, lot announcements — always RUO-stated | "Lot ADV-G1-1042 — COA published" |

Every pillar trades in the same currency: **evidence, not adjectives.** If a post makes a claim, the visual shows the documentation.

---

## 4. Visual Identity (from DESIGN.md)

- Ink `#0C0A09` backgrounds, warm off-white `#FAFAF9` for light variants
- Gold `#CA8A04` accent — key data only (purity values, lot IDs, rules)
- Playfair Display for headlines (italic = emphasis), Inter for everything else
- JetBrains Mono for every lot number, CAS number, and purity value
- Uppercase micro-labels as the recurring brand device (`RESEARCH USE ONLY`, `COA PUBLISHED`)
- No emoji. No gradients. No stock "science" clichés (DNA helixes, glowing brains)
- Ready-made layouts live in `social/templates/` — screenshot at full size to export

---

## 5. Cadence (Sustainable for 10h/week)

**Instagram (primary):** Mon / Wed / Fri — one carousel or single-image post per slot. Stories: reuse post assets + lot status updates.

**LinkedIn:** Tue / Thu — text + image, repurposed from IG carousels (different hook, same insight).

**Batching:** 2–3h Sunday — draft the week, render templates, schedule (Meta Business Suite free scheduler), leave Friday open for live replies.

---

## 6. First 30 Days — Growth Mechanics

1. **Profiles before content.** Set handles, bios, link (advigrow.online), highlight covers before posting (see BIOS.md).
2. **Follow-and-engage list.** 30 accounts: peptide chemistry labs, analytical chemists, lab-supply reviewers, university core facilities. Comment with substance on 5–10 posts/day for 2 weeks before expecting reach.
3. **Anchor post.** Pin "How to read a COA" — it is the brand thesis in one carousel and the evergreen referencer.
4. **Hashtag lanes (5 per post max):** `#ResearchUseOnly #PeptideScience #AnalyticalChemistry #HPLC #LabDocumentation` — niche > broad. Avoid banned-connotation tags (`#peptidesforsale` etc. — never).
5. **Every claim → artifact.** If the post says ≥99%, the image shows the chromatogram.
6. **DM policy.** Answer COA questions in DMs with the published lot page link; never discuss use in DMs.

---

## 7. Metrics (Weekly Review, 15 min)

| Metric | Target (90 days) |
|--------|------------------|
| IG followers | 1,000 engaged (saves + shares > likes) |
| LinkedIn followers | 500 lab-affiliated |
| Saves per carousel | > 30 (saves are the purchase-intent proxy here) |
| Profile → site clicks | 150/month |
| COA requests citing social | Tracked at contact@advigrow.online |

Kill rule: any format that underperforms for 3 consecutive weeks gets replaced, not defended.

---

## 8. When Accounts Are Live

Add real links to the site footer (`.site-footer` bottom row) **only after** accounts exist — dead links violate the site's own Delivery Gate. Ready-to-paste snippet:

```html
<span>Instagram · LinkedIn · X</span>  <!-- wrap each in <a href="..."> once live -->
```

---

## 9. Non-Negotiables

1. Every post carries the RUO statement.
2. No DM selling, no discount codes, no urgency tactics — the brand is evidence, not hype.
3. Lot IDs appear in mono font, exact as published (`ADV-G1-1042`).
4. No invented metrics, no fake testimonials, no borrowed lab photos without license.
5. One person owns replies — response within 24h, business hours only.