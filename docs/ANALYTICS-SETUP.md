# Advigrow — Analytics Setup (15 min)

Include in every page `<head>` after IDs exist:
```html
<script src="js/analytics.js"></script>
```

## GA4
1. analytics.google.com → Create property with advigrow@gmail.com → Web stream advigrow.online → copy G-XXXX → paste GA4_ID in js/analytics.js → uncomment gtag snippet (see GA docs).
2. Events auto-sent: quote_request, coa_request, catalog_download.

## Meta + TikTok pixels (organic measurement only — do NOT run paid ads for compounds)
- Meta Events Manager → create pixel → META_PIXEL_ID. TikTok Events Manager → TIKTOK_PIXEL_ID.
- Both fire only via AdvigrowAnalytics() stub.

## UTM master convention
`?utm_source=X&utm_medium=Y&utm_campaign=Z&utm_content=W&utm_term=ruo`
- source: tiktok, instagram, linkedin, x, reddit, google
- medium: social, email, search
- campaign: lot_launch, coa_guide, lab_process
- content: video1, carousel2
- Example: `https://advigrow.online/product-glp1.html?utm_source=tiktok&utm_medium=social&utm_campaign=coa_guide&utm_content=video1&utm_term=ruo`

## Weekly 15-min review
Saves/carousel >30, profile→site 150/mo, COA requests citing social. Kill any format underperforming 3 weeks.
