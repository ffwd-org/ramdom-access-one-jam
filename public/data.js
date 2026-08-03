// RANDOM ACCESS ONE — shared mock dataset for the POC pages.
// All pages import from here so the demo feels like one app.
// Media convention (see ASSETS.md):
//   media/<contribution-id>.jpg  — thumbnail, every media contribution
//   media/<contribution-id>.mp4  — optional clip, played in theater mode
// Missing files fall back to generated placeholder cards automatically.

export const MEDIA_BASE = 'media/';

export const USERS = {
  moonkid:      { handle: 'moonkid',      ini: 'MK', color: '#ff5c8a', bio: 'chasing drops since 2019 · 12 nights archived' },
  dv_taped_it:  { handle: 'dv_taped_it',  ini: 'DV', color: '#5cc8ff', bio: 'i tape everything. rail or nothing.' },
  lzrgrl:       { handle: 'lzrgrl',       ini: 'LZ', color: '#ffc95c', bio: 'lights > lyrics' },
  analog_9:     { handle: 'analog_9',     ini: 'A9', color: '#7dff9b', bio: 'shot on a 2014 camcorder, on purpose' },
  rxidnight:    { handle: 'rxidnight',    ini: 'RX', color: '#b98cff', bio: 'soundboard gremlin' },
  jjupiter:     { handle: 'jjupiter',     ini: 'JJ', color: '#ff9c5c', bio: 'section C forever' },
  nocturne_cc:  { handle: 'nocturne_cc',  ini: 'NC', color: '#5cffe0', bio: 'came for one song, stayed for the night' },
  polaroidburn: { handle: 'polaroidburn', ini: 'PB', color: '#ff5c5c', bio: 'stills only. motion is cheating.' },
  official:     { handle: 'outsidelands', ini: 'OL', color: '#e8ecf3', bio: 'official — Outside Lands × Hozier' },
  you:          { handle: 'you',          ini: 'YO', color: '#8a9bff', bio: 'this is you' },
};

export const CONCERTS = [
  { id: 'hozier-osl-2025', name: 'Hozier — Outside Lands 2025',
    date: '2025-08-08', sub: '2025-08-08 · Golden Gate Park · 7 moments · 214 contributions' },
  { id: 'neon-divide-msg', name: 'Neon Divide Tour — Madison Square Garden',
    date: '2026-06-02', sub: '2026-06-02 · 12 moments · 1.2k contributions' },
  { id: 'kexp-static-bloom', name: 'KEXP Session — Static Bloom (acoustic)',
    date: '2026-05-11', sub: '2026-05-11 · 4 moments · 89 contributions' },
  { id: 'primavera-main', name: 'Primavera Sound — Main Stage',
    date: '2026-06-28', sub: '2026-06-28 · 9 moments · 640 contributions' },
];

// Moments of the main demo concert (hozier-osl-2025). Timestamps match the
// cut points of the real master clips in media/ (see ASSETS.md).
export const MOMENTS = [
  { id: 'm1', title: 'Opening — day 3, lights down', t: '0:00:00' },
  { id: 'm2', title: '"Would That I"',               t: '0:15:00' },
  { id: 'm3', title: '"Like Real People Do"',        t: '0:22:10' },
  { id: 'm4', title: 'Hozier talks to the crowd',    t: '0:26:26' },
  { id: 'm5', title: '"Nina Cried Power"',           t: '1:00:00' },
  { id: 'm6', title: '"Work Song" — crowd singalong', t: '1:15:00' },
  { id: 'm7', title: 'Encore — "Take Me to Church"', t: '1:32:00' },
];

// type: 'master' (official wide, 16:9) · 'video' (fan clip, portrait)
//       'photo' (fan still) · 'text' (text-only moment, no media file)
// score drives proximity ranking: higher score sits closer to the master.
// `media` names an id from generated.js (built by build-media-map.py); the
// card takes that asset's thumbnail, aspect ratio, and (if present) video.
let seq = 0;
const C = (momentId, userId, type, caption, score, media) => ({
  id: `${momentId}-c${++seq}`,
  momentId, userId, type, caption, score, media,
});

export const CONTRIBUTIONS = [
  // m1 — Opening (fully real: master + fan angles all cut from the real show)
  C('m1', 'official',     'master', 'Official — day 3, the night begins', 999),
  C('m1', 'lzrgrl',       'video',  'the exact second the lights died. listen to the crowd', 91),
  C('m1', 'nocturne_cc',  'photo',  'the venue holding its breath', 74),
  C('m1', 'jjupiter',     'video',  'walked in late and THIS is what greeted me', 58),
  C('m1', 'polaroidburn', 'photo',  'last photo before it all started', 47),
  C('m1', 'you_could_be_here', 'text', '', 0), // placeholder slot, filtered out
  // m2 — Would That I
  C('m2', 'official',     'master', 'Official — "Would That I", full song, stage wide', 999),
  C('m2', 'dv_taped_it',  'video',  'would that i from the rail. the mix up there was PERFECT', 88, 'fan-021-front-rail'),
  C('m2', 'moonkid',      'video',  'second verse hit and everyone around me knew every word', 82, 'fan-006-crowd-dancing'),
  C('m2', 'analog_9',     'video',  'camcorder cut of would that i, warm and blurry like memory', 71, 'fan-003-daytime-main-stage'),
  C('m2', 'nocturne_cc',  'text',   'this is the song that got me the ticket. it paid off.', 55),
  C('m2', 'lzrgrl',       'photo',  'blue wash on the whole bowl', 43, 'fan-048-purple-stage'),
  // m3 — Guitar solo
  C('m3', 'official',     'master', 'Official — the solo, camera 2 close-up', 999),
  C('m3', 'moonkid',      'video',  'my angle of the solo — you can SEE his hands. front rail', 95, 'fan-010-performer-silhouette'),
  C('m3', 'rxidnight',    'video',  'solo from the soundboard. cleanest audio you will find', 87, 'fan-008-golden-stage'),
  C('m3', 'jjupiter',     'photo',  'the pose. you know the one.', 66, 'fan-040-performer-silhouette'),
  C('m3', 'analog_9',     'text',   'i put my camera down for this one. some things you just watch.', 52),
  C('m3', 'polaroidburn', 'photo',  'caught the exact peak of the bend', 49, 'fan-038-golden-stage'),
  // m4 — Artist talks
  C('m4', 'official',     'master', 'Official — "San Francisco, this next one is for nights like this"', 999),
  C('m4', 'nocturne_cc',  'video',  'he talked to US. directly. proof attached', 84, 'fan-020-quiet-acoustic'),
  C('m4', 'jjupiter',     'video',  'the whole speech from the hillside, crowd audio and all', 77, 'fan-012-friends-laughing'),
  C('m4', 'moonkid',      'text',   'this is where i lost my voice, for the record', 61),
  C('m4', 'lzrgrl',       'photo',  'single spotlight, 9000 people silent', 56, 'fan-027-final-song'),
  // m5 — The drop
  C('m5', 'official',     'master', 'Official — "Nina Cried Power", all cameras', 999),
  C('m5', 'dv_taped_it',  'video',  'NINA CRIED POWER FROM THE PIT. i am so sorry for the screaming (mine)', 97, 'fan-019-laser-hands'),
  C('m5', 'lzrgrl',       'video',  'the light rig went nuclear at 0:14, watch till the end', 93, 'fan-018-purple-stage'),
  C('m5', 'rxidnight',    'video',  'nina cried power from the soundboard — chills, every take', 89, 'fan-007-phones-in-air'),
  C('m5', 'moonkid',      'photo',  'the crowd mid-jump, frozen', 78, 'fan-036-crowd-dancing'),
  C('m5', 'jjupiter',     'video',  'the hill during nina cried power. we are not okay', 72, 'fan-024-jacket-crowd'),
  C('m5', 'polaroidburn', 'photo',  'lasers cutting the fog, no edit', 64, 'fan-047-fog-rolls-in'),
  C('m5', 'analog_9',     'text',   'my phone died 10 seconds before this. thank you all for filming it.', 51),
  // m6 — Singalong
  C('m6', 'official',     'master', 'Official — crowd singalong, drone pass', 999),
  C('m6', 'moonkid',      'video',  'he stopped singing and 9000 people did not miss a word', 90, 'fan-022-rear-crowd'),
  C('m6', 'nocturne_cc',  'video',  'singalong from the very back. it reached us whole', 76, 'fan-011-between-stages'),
  C('m6', 'jjupiter',     'photo',  'phone lights like a galaxy', 69, 'fan-037-phones-in-air'),
  C('m6', 'dv_taped_it',  'text',   'the guy next to me cried. i pretended not to. i also cried.', 57),
  // m7 — Encore
  C('m7', 'official',     'master', 'Official — encore, "Take Me to Church", finale cut', 999),
  C('m7', 'jjupiter',     'video',  'confetti moment from the hillside, unreal', 86, 'fan-009-confetti-burst'),
  C('m7', 'polaroidburn', 'photo',  'confetti frozen mid-air, best still i have ever taken', 81, 'fan-039-confetti-burst'),
  C('m7', 'analog_9',     'video',  'the encore from the very last row, still magic', 70, 'fan-004-hillside-blankets'),
  C('m7', 'lzrgrl',       'photo',  'house lights up, nobody leaving', 62, 'fan-030-emptying-park'),
  C('m7', 'nocturne_cc',  'text',   'signed the guestbook on the way out. see you at the next one.', 50),
].filter(c => c.userId !== 'you_could_be_here');

// Contributions of one moment, proximity-ordered: master first, then by score.
export function contributionsFor(momentId) {
  return CONTRIBUTIONS
    .filter(c => c.momentId === momentId)
    .sort((a, b) => b.score - a.score);
}

// Arrange proximity-ordered contributions into a carousel strip:
// master at the center, strongest contributions closest, alternating sides.
export function stripFor(momentId) {
  const [master, ...fans] = contributionsFor(momentId);
  const left = [], right = [];
  fans.forEach((c, i) => (i % 2 ? left.unshift(c) : right.push(c)));
  return { items: [...left, master, ...right], masterIndex: left.length };
}

// Hand-written threads for the highlights; generic fallback for the rest.
export const COMMENTS = {
  'm5-c25': [ // dv_taped_it, drop from the pit
    ['moonkid',      'this angle is insane, how close were you??', '41m ago'],
    ['dv_taped_it',  'second row. my ears are still ringing and i regret nothing', '38m ago'],
    ['lzrgrl',       'the screaming makes it better tbh. that WAS the drop', '31m ago'],
    ['nocturne_cc',  'been looking for a pit angle of this all morning, thank you', '12m ago'],
  ],
  'm3-c14': [ // moonkid, solo from the rail
    ['rxidnight',    'you can see the hammer-ons?? this is the best angle on the timeline', '55m ago'],
    ['jjupiter',     'i was two rows behind you lol', '49m ago'],
    ['moonkid',      'rail opens at 6 for a reason friends', '44m ago'],
  ],
  'm6-c33': [ // moonkid, singalong
    ['dv_taped_it',  'you can hear the whole crowd holding their breath before it lands', '1h ago'],
    ['polaroidburn', 'crying again. this moment lives rent free', '52m ago'],
  ],
};

export const COMMENT_POOL = [
  ['lzrgrl',       'THE LIGHTS AT 0:14 !!!'],
  ['analog_9',     'better than the official cut honestly'],
  ['jjupiter',     'the bass literally moved my ribcage here'],
  ['nocturne_cc',  'been looking for this exact part all week, thank you'],
  ['rxidnight',    'audio holds up surprisingly well for a phone'],
  ['polaroidburn', 'ok this earned its spot near the center'],
  ['moonkid',      'adding this to my recap immediately'],
  ['dv_taped_it',  'wish i had filmed from your side'],
];

export function commentsFor(contrib) {
  if (COMMENTS[contrib.id]) {
    return COMMENTS[contrib.id].map(([u, txt, when]) => ({ user: USERS[u], txt, when }));
  }
  // deterministic pseudo-random pick so threads survive reloads
  let h = 0;
  for (const ch of contrib.id) h = (h * 31 + ch.charCodeAt(0)) & 0xffff;
  const n = 2 + (h % 3);
  return Array.from({ length: n }, (_, i) => {
    const [u, txt] = COMMENT_POOL[(h + i * 5) % COMMENT_POOL.length];
    return { user: USERS[u], txt, when: `${5 + ((h >> 2) + i * 17) % 55}m ago` };
  });
}

export const GUESTBOOK = [
  { userId: 'nocturne_cc',  txt: 'came alone, left with three numbers and no voice. perfect night.', when: '2h ago' },
  { userId: 'jjupiter',     txt: 'hillside crew, you were the best crowd i have ever been part of.', when: '3h ago' },
  { userId: 'analog_9',     txt: 'work song will be in my head until the next tour. signing off.', when: '5h ago' },
  { userId: 'polaroidburn', txt: '36 photos. one night. worth every missed moment through the lens.', when: '6h ago' },
];

// Feed posts: real contributions surfaced outside their concert.
export const FEED = [
  { contribId: 'm5-c25', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — "Nina Cried Power"',        when: '38m ago' },
  { contribId: 'm3-c14', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — "Like Real People Do"',     when: '49m ago' },
  { contribId: 'm7-c38', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — Encore',          when: '1h ago' },
  { contribId: 'm6-c33', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — "Work Song"', when: '1h ago' },
  { contribId: 'm4-c20', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — Hozier talks',    when: '2h ago' },
  { contribId: 'm5-c26', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — "Nina Cried Power"',        when: '2h ago' },
  { contribId: 'm2-c8',  concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — "Would That I"',    when: '3h ago' },
  { contribId: 'm1-c2',  concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — Opening',         when: '3h ago' },
  { contribId: 'm7-c39', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — Encore',          when: '4h ago' },
  { contribId: 'm5-c28', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — "Nina Cried Power"',        when: '4h ago' },
  { contribId: 'm2-c9',  concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — "Would That I"',    when: '5h ago' },
  { contribId: 'm6-c34', concertId: 'aurora-red-rocks', link: 'Hozier @ Outside Lands — Singalong',       when: '5h ago' },
];

export const contribById = id => CONTRIBUTIONS.find(c => c.id === id);
export const userOf = c => USERS[c.userId];

// The visitor's own submitted moment (from submit.html), if any this session.
export function yourMoment() {
  try {
    const raw = sessionStorage.getItem('ra1-your-moment');
    if (!raw) return null;
    const { caption, when } = JSON.parse(raw);
    return { id: 'you-c1', momentId: 'm5', userId: 'you', type: 'video',
             caption, score: 60, when, yours: true };
  } catch { return null; }
}
