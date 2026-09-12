# Advigrow — Login Setup with Clerk (owner, ~10 min)

The site is static, so login runs through Clerk. Until you paste a key,
the Sign in button stays hidden and everything else works.

## Steps

1. clerk.com → Sign up with advigrow@gmail.com → Create application
   "AdviGrow". Enable Google + Email code.
2. Dashboard → API Keys → copy the **Publishable key**
   (`pk_test_...` to start, `pk_live_...` later).
3. Open `js/auth.js` → replace `pk_test_REPLACE_ME` with your key.
4. Clerk Dashboard → Paths / Allowed origins → add:
   - `https://advigrow.online`
   - `https://www.advigrow.online`
   - `http://localhost:8000` (local testing)
5. Commit + push. Sign in appears in the nav automatically.

## Later (production hardening)

- Swap to `pk_live_...` + `sk_live_...` (secret stays out of the repo).
- Clerk Dashboard → Webhooks if you ever need server-side events
  (requires a tiny backend — ask before building one).
- Sessions + MFA options live in Clerk → User & Authentication.
