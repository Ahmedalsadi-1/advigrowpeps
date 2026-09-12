# Advigrow — Payments + Notifications Setup (owner, ~45 min)

Gmail in use: advigrow@gmail.com (confirmed logged in via BrowserClaw).
Site: advigrow.online. Contact: advigrow@gmail.com for everything (orders, COA, quotes). Phone: (347) 968-3894.

## 1. Stripe (card payments)
1. stripe.com → Sign up with advigrow@gmail.com → Activate business (EIN or SSN, bank, ID, business address, support email advigrow@gmail.com).
2. Dashboard → Payment Links → Create 3 links:
   - GLP-1 10mg $95, GLP-2 10mg $120, GLP-3 10mg $110. Add RUO text to description: "Research Use Only. Not for human/veterinary use."
3. Copy each URL → paste into `js/cart.js` STRIPE_LINKS. They auto-appear on checkout.html.
4. Settings → Customer emails ON. Test mode first, then Live.
5. Cannot be automated — Stripe requires owner ID verification.

## 2. Order + contact notifications
- Fastest (free): formspree.io → New Form → destination advigrow@gmail.com → paste endpoint into `js/checkout.js` FORMSPREE_ENDPOINT and into contact form (same pattern).
- Alternative: Basin / Web3Forms, same one-line change.
- Until then: checkout falls back to `mailto:advigrow@gmail.com` with prefilled JSON.
- Gmail filter: Settings → Filters → to:advigrow@gmail.com → label Inquiry, forward to phone for urgent.

## 3. Pipeline (quote → COA → paid)
1. Quote arrives (Formspree → Gmail label Inquiry).
2. Reply template: confirm lot (ADV-G1-1042 etc), attach COA, send Stripe Payment Link.
3. On payment: Stripe email → ship in 1-2 days → tracking email.
4. Post-delivery: request lab documentation feedback (never testimonials implying human use).

## 4. Email capture / nurture (ConvertKit free or Mailchimp)
- Embed form on index.html hero (TODO). 3-email sequence: 1) COA literacy, 2) storage discipline, 3) lot announcement. All end with RUO + advigrow.online link.
