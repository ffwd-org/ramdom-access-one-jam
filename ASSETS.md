# Asset manifest — poc-timeline

## Generated assets pipeline (preferred)

Assets produced into `public/generated/fan-images/` and `public/generated/fan-videos/`
(with their `manifest.json`) are wired in automatically:

1. Generate/add assets in `public/generated/` (any aspect ratio — cards take the
   asset's true aspect from the manifest).
2. Run `python3 build-media-map.py` here — it rewrites `public/generated.js`.
3. Assign an asset to a contribution in `public/data.js` by adding its id as the
   last argument: `C('m5','dv_taped_it','video','caption', 97, 'fan-019-laser-hands')`.

Videos show their thumbnail on the card and play (with sound) in theater
mode. Next.js serves these files from the `public/` site root.

## Real master footage (Hozier — Outside Lands 2025)

The moment masters in `public/media/` (`m1-c1`, `m2-c7`, `m3-c13`, `m4-c19`, `m5-c24`,
`m6-c32`, `m7-c37` + `.jpg` thumbs) are 45s cuts from the team's real footage
in the GCS bucket (`randomaccessone-masterevents-…/masterevents/hozieroutsidelands2025/`),
made with ffmpeg straight from the URLs — see git history for the exact
commands. m2/m3/m5/m6/m7 come from the per-song clips ("Would That I",
"Like Real People Do", "Nina Cried Power", "Work Song", "Take Me to Church");
m1/m4 are blind cuts from the full show at 2:00 and 45:00.

CORS: the bucket now allows `Origin: *` for GET/HEAD with Range (verified:
range GETs return 206 + `Access-Control-Allow-Origin: *`, and canvas readback
is untainted), so bucket URLs CAN be streamed straight into WebGL video
textures if wanted. The demo still uses local 480p cuts on purpose — smaller,
instant seeks, and no network dependency on stage.

## Drop-in convention (fallback)

For one-off files without touching manifests: drop into `poc-timeline/public/media/`.
**No code changes needed** — the pages try each file and fall back to a
generated placeholder card if it's missing, so you can deliver assets in any
order and refresh to see them appear.

## Naming convention

Every contribution in `public/data.js` has an id like `m5-c25` (moment 5, contribution 25).

| File | Used for | Required? |
|---|---|---|
| `media/<id>.jpg` | Thumbnail on the timeline / feed / profile wall | Yes, per media contribution |
| `media/<id>.mp4` | Plays (with sound) when the card is expanded in theater mode | Only for `master` and `video` types |

`text` contributions need no files — they render as text cards.

## Format guide

- **master** (official): 16:9 landscape, pro look — stage-wide, drone, multicam. ~1280×720 is plenty.
- **video** (fan clip): 9:16 portrait, phone look — shaky, crowd heads, venue lighting, slight blur/noise. Keep clips 5–15s, they loop.
- **photo** (fan still): roughly square, phone photo look.
- Keep files small (thumbs ≤300KB, clips ≤8MB) — everything loads at once.

## The shot list (from `data.js`)

The night: **Aurora Skies — Live at Red Rocks, 2026-07-18.** Consistent stage =
consistent night: purple/blue rig, one guitarist-frontman, big amphitheater.

**Priority 1 — the demo money shots (same instant, different angles):**
Moment 5 "The drop": nuclear lasers + fog + confetti-less peak moment.
- `m5-c24` master — all-cameras cut of the drop (16:9)
- `m5-c25` dv_taped_it — pit angle, chaotic, screaming (9:16)
- `m5-c26` lzrgrl — light rig going off, shot from mid-bowl (9:16)
- `m5-c27` rxidnight — soundboard angle, steadier (9:16)
- `m5-c28` moonkid — photo: crowd mid-jump (square)
- `m5-c29` jjupiter — section C crowd cam (9:16)
- `m5-c30` polaroidburn — photo: lasers cutting fog (square)

**Priority 2 — one per remaining moment (master + top fan clip):**
- `m1-c1` master opening / `m1-c2` lzrgrl lights-die clip / `m1-c3`, `m1-c4`, `m1-c5`
- `m2-c7` master Static Bloom / `m2-c8` dv_taped_it rail / `m2-c9` moonkid crowd verse / `m2-c10`, `m2-c12`
- `m3-c13` master solo close-up / `m3-c14` moonkid rail hands / `m3-c15` soundboard / `m3-c16`, `m3-c18`
- `m4-c19` master artist speech / `m4-c20` nocturne_cc / `m4-c21` / `m4-c23` photo spotlight
- `m6-c32` master drone singalong / `m6-c33` moonkid / `m6-c34` / `m6-c35` photo phone lights
- `m7-c37` master confetti finale / `m7-c38` jjupiter confetti / `m7-c39` photo confetti frozen / `m7-c40`, `m7-c41`

(Ids are stable as long as nobody reorders `CONTRIBUTIONS` in `data.js` — the
`c<n>` counter is sequential over that array. Check `data.js` if in doubt;
captions there describe each shot.)

## Running it

Run `npm run dev`, then open `http://localhost:3000/submit.html` for the full flow
(QR entry → consent → fake validation → your clip on the timeline).
