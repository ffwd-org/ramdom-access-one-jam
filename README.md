# RANDOM ACCESS ONE — poc-timeline

## The problem with live events is that they *end*.

A concert or festival brings thousands of people together for one night.
You stand shoulder to shoulder with strangers, sing the same words, share the
same drop — and then the lights come up and everyone goes home.

By Monday:

- **Your clips die scattered.** The videos you filmed get posted to social
  media, stripped of all context, and buried by the algorithm within hours.
- **The people you shared it with become strangers again.** The person who
  screamed next to you at minute 47? You'll never find them.
- **The artist's footage goes unwatched.** Organizers record the whole show
  professionally — and those hours of video sit on a hard drive forever.

Music brings people together for one night. Then the internet scatters them.
**The event ends, but the relationships it could have created never even start.**

## What this is

**RANDOM ACCESS ONE is a social space for one specific event — a place where
the night keeps living, and only the people who were there can enter.**

Think of it like Reddit, except every community is a single night, created by
the event's organizer. Inside an event community:

1. **The timeline is the feed.** The organizer uploads the official footage
   they recorded anyway. The system arranges the night into a scrubbable
   timeline of *Moments* — the songs, the speeches, the drop. You don't post
   into an endless void; you post **at minute 47, when the drop hit**.

2. **Fans add their own angles.** Attendees upload their photos and videos,
   and each one lands at its true moment in the show. The result is the night
   seen from everywhere at once: the soundboard, the pit, the rail — and *your*
   spot in the crowd, pinned right where it belongs.

3. **Presence is the price of admission.** You can only join if you were
   actually there. Your video is your ticket stub. Everyone inside shared the
   same night, so the community never starts cold and never fills with
   tourists.

4. **Conversation grows around moments.** "Wasn't that song insane?" — anchored
   to the exact moment it happened, with everyone's angles of it clustered
   right there. Didn't film anything? You can still comment, or pin a text
   memory to a moment ("this is where I lost my voice"). Filming is rewarded;
   presence is never punished.

5. **Relationships outlive the event.** You meet someone in the comments who
   was standing ten meters away. You follow them. You see the next shows
   they're attending. You went in with a ticket and came out with a friend who
   loves the same music you do.

**Nostalgia is the hook; friendship is the goal.** People come back to relive
the night — they stay because of who they met there.

## Who it's for

- **Fans** get to relive the night, find their moment, and meet the people who
  shared it. Free.
- **Organizers / artists** (the paying side) get the community engine: they
  create the event page, upload footage they already have, and receive a
  consent-clean archive of the whole night from every angle, ranked highlights,
  and a direct channel to their most engaged fans.

## What lives in this directory

This is the **proof-of-concept demo** of the fan side — a clickable story of
"the morning after," built to make the vision tangible. It is a demo of the
idea, not an MVP: wherever a hard problem can be faked convincingly, it's
faked (validation and timeline placement are pretend; clip positions are
hardcoded).

The demo night is **Hozier — Outside Lands 2025**, told through 7 moments and
~40 fan contributions.

| Page | What it shows |
|---|---|
| `public/landing.html` | The pitch: a UX-case-study landing page explaining the problem and the idea |
| `public/index.html` | The global feed — the way into event communities |
| `public/concert.html` | The event timeline: vertical travel through Moments, horizontal exploration of every fan angle around each one |
| `public/submit.html` | The fan upload flow: QR entry → consent → (fake) validation → your clip on the timeline |
| `public/profile.html` | A fan profile — where a connection survives past the event |

## Running it

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000/concert.html` — the main timeline experience
- `http://localhost:3000/submit.html` — the full fan upload flow

See `ASSETS.md` for how media files map to contributions, and `../VISION.md` /
`../IDEAS.md` for the product thinking behind all of it.

---

*"La música nos une — we just keep the receipts."*
