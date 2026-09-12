// scripts/schedule.mjs — Advigrow auto-posting helper (Buffer API, dry-run default)
// Usage: BUFFER_TOKEN=xxx node scripts/schedule.mjs [--live]
// Reads ../social/POSTS-30.md, validates RUO + blocklist, queues to Buffer.
import { readFileSync } from "node:fs";

const LIVE = process.argv.includes("--live");
const TOKEN = process.env.BUFFER_TOKEN || "";
const BLOCKLIST = ["dosage", "cycle", "injection", "weight loss", "before/after", "wellness", "glow-up", "lose weight"];
const file = readFileSync(new URL("../social/POSTS-30.md", import.meta.url), "utf8");

// naive split by numbered posts
const posts = file.split(/\n\d+\.\s/).slice(1).map((t) => t.trim()).filter(Boolean);
console.log(`Found ${posts.length} posts.`);
let blocked = 0;
for (const [i, p] of posts.entries()) {
  const low = p.toLowerCase();
  if (!low.includes("research use only") && !low.includes("ruo only")) { console.log(`SKIP ${i + 1}: missing RUO`); blocked++; continue; }
  const hit = BLOCKLIST.find((w) => low.includes(w));
  if (hit) { console.log(`SKIP ${i + 1}: blocklisted "${hit}"`); blocked++; continue; }
}
console.log(blocked ? `${blocked} blocked, fix before scheduling.` : "All clear for scheduling.");
if (!LIVE) { console.log("Dry run. Re-run with --live + BUFFER_TOKEN to queue via Buffer API."); process.exit(0); }
if (!TOKEN) { console.error("Missing BUFFER_TOKEN"); process.exit(1); }
// TODO: POST https://api.bufferapp.com/1/updates/create.json with profile ids.
// See https://buffer.com/developers/api/updates — kept as TODO so no accidental publish.
console.log("Live mode TODO: wire profile IDs for @advigrowpeptides, then enable.");
