# Advigrow — Automated Postings Setup (free tier, ~30 min)

Goal: hands-free Mon-Sun posting for @advigrowpeptides once accounts exist.
Stack: Meta Business Suite (IG + FB free, no extra tool) + Buffer free (X + LinkedIn + TikTok + Reddit via integration) + Gmail advigrow@gmail.com as login.

## Option A — Zero-cost (recommended, 10h/week friendly)
1. business.facebook.com → Log in with advigrow@gmail.com → Connect IG @advigrowpeptides (Business account) → Content → Create → Upload from social/POSTS-30.md 1-12 → Schedule Mon 10am / Wed 2pm / Fri 11am ET → Repeat weekly. Stories: reuse same asset.
2. buffer.com → Sign up with Google (advigrow@gmail.com) → Free plan 10 posts/channel → Connect LinkedIn Company (advigrowpeptides), X (@advigrowpeptides), TikTok (@advigrowpeptides) → Queues: LI Tue/Thu 9am, X Mon/Wed/Fri 12pm, TikTok Wed/Sat 6pm → Paste posts 13-30 → Start queue.
3. Reddit: do NOT auto-post (spam filters ban bots). Manual 1x Sat from calendar. Use Buffer reminder, not auto-publish.
4. UTM: every link already has utm_source per platform in POSTS-30.md. Verify in Buffer analytics.

## Option B — Code (advanced)
- `scripts/schedule.mjs`: reads POSTS-30.md, posts to Buffer API (`BUFFER_TOKEN`), LinkedIn/X via Buffer. Run weekly via `cron` or GitHub Action Sunday 8pm ET.
- Get token: buffer.com/developers → Create app → copy token → `export BUFFER_TOKEN=xxx`.
- Script prints dry-run by default. Use `--live` to publish.

## Guardrails (auto = risk if sloppy)
- Every caption must contain "Research use only" — script checks and refuses to queue without it.
- No words: dosage, cycle, injection, weight loss, before/after, wellness, glow-up. Blocklist in script.
- If TikTok flags: pause queue, appeal with legal.html link, resume with educational only.
- Owner does Friday replies manually — never auto-DM sell.

## After accounts live
1. Replace footer #social-links with real URLs.
2. Turn on Meta + Buffer email notifications to advigrow@gmail.com.
3. Weekly 15-min review: saves >30, site clicks 150/mo, COA requests.
