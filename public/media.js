// RANDOM ACCESS ONE — media layer for the POC.
// Tries real assets first (media/<id>.jpg thumbs, media/<id>.mp4 clips) and
// falls back to generated placeholder cards, so the demo works before the
// generated images/videos arrive and upgrades itself as files drop in.

import * as THREE from 'three';
import { MEDIA_BASE, userOf } from './data.js';
import { GENERATED } from './generated.js';

// Generated asset for a contribution (data.js `media` field), if any.
export const genFor = contrib => contrib.media ? GENERATED[contrib.media] : null;

// Geometry sizes per contribution type: [width, height] in world units.
// When a generated asset exists, the card takes its true aspect ratio.
export function sizeOf(contrib) {
  const gen = genFor(contrib);
  if (gen) {
    const ar = gen.w / gen.h;
    if (contrib.type === 'master') return [2.9, 2.9 / ar];
    if (ar < 1) return [1.95 * ar, 1.95];         // portrait: fix height
    return [1.9, 1.9 / ar];                        // landscape: fix width
  }
  switch (contrib.type) {
    case 'master': return [2.9, 1.75];   // 16:9 official wide
    case 'video':  return [1.15, 1.95];  // portrait phone clip
    case 'photo':  return [1.5, 1.5];    // square-ish still
    case 'text':   return [1.55, 1.15];  // text card
    default:       return [1.5, 1.2];
  }
}

const texLoader = new THREE.TextureLoader();

// Placeholder card: dark gradient tinted by the author's color, a type glyph,
// the caption, and the handle — reads as content, not as a missing file.
function placeholderCanvas(contrib, wUnits, hUnits) {
  const u = userOf(contrib);
  const W = Math.round(wUnits * 240), H = Math.round(hUnits * 240);
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#12141f');
  g.addColorStop(1, '#0a0b12');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // tinted glow blob
  const glow = ctx.createRadialGradient(W * 0.7, H * 0.25, 10, W * 0.7, H * 0.25, W * 0.7);
  glow.addColorStop(0, u.color + '55');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

  // faint "stage" horizon for video/master, grain dots for photos
  ctx.strokeStyle = '#ffffff14';
  if (contrib.type === 'master' || contrib.type === 'video') {
    ctx.beginPath(); ctx.moveTo(0, H * 0.72); ctx.lineTo(W, H * 0.72); ctx.stroke();
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(W * (0.15 + i * 0.17), H * 0.72);
      ctx.lineTo(W * (0.3 + i * 0.12), H * 0.1);
      ctx.strokeStyle = u.color + '22'; ctx.stroke();
    }
  }

  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';

  if (contrib.type === 'text') {
    // text-only moment: the caption IS the content
    ctx.fillStyle = '#e8ecf3';
    ctx.font = `500 ${Math.round(H * 0.085)}px ui-monospace, Menlo, monospace`;
    wrapText(ctx, `“${contrib.caption}”`, W * 0.09, H * 0.26, W * 0.82, H * 0.115);
  } else {
    // play glyph / camera glyph
    ctx.fillStyle = '#ffffffcc';
    ctx.font = `${Math.round(H * 0.2)}px ui-monospace, Menlo, monospace`;
    ctx.fillText(contrib.type === 'photo' ? '▣' : '▶', W * 0.08, H * 0.28);
    ctx.fillStyle = '#c7cede';
    ctx.font = `${Math.round(H * 0.062)}px ui-monospace, Menlo, monospace`;
    wrapText(ctx, contrib.caption, W * 0.08, H * 0.5, W * 0.84, H * 0.085);
  }

  drawAuthor(ctx, W, H, contrib);
  if (hasVideo(contrib)) drawPlayBadge(ctx, W, H);
  if (contrib.yours) {
    ctx.fillStyle = '#8a9bff';
    ctx.font = `700 ${Math.round(H * 0.045)}px ui-monospace, Menlo, monospace`;
    ctx.textAlign = 'right';
    ctx.fillText('YOURS', W * 0.93, H * 0.13);
  }
  return cv;
}

// author chip: avatar dot + handle, bottom-left — drawn on placeholders and
// composited onto real assets so authorship reads on the card itself
function drawAuthor(ctx, W, H, contrib) {
  const u = userOf(contrib);
  const s = Math.min(W, H);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#0a0c1488';
  ctx.fillRect(0, H - s * 0.13, W, s * 0.13);
  ctx.fillStyle = u.color;
  ctx.beginPath(); ctx.arc(s * 0.075, H - s * 0.065, s * 0.042, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0a0c14';
  ctx.font = `700 ${Math.round(s * 0.036)}px ui-monospace, Menlo, monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(u.ini, s * 0.075, H - s * 0.053);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#e8ecf3';
  ctx.font = `${Math.round(s * 0.046)}px ui-monospace, Menlo, monospace`;
  ctx.fillText('@' + u.handle + (contrib.type === 'master' ? ' · OFFICIAL' : ''), s * 0.14, H - s * 0.048);
}

// does this contribution have a playable clip?
export function hasVideo(contrib) {
  const gen = genFor(contrib);
  if (gen) return !!gen.vid;
  return contrib.type === 'video' || contrib.type === 'master';
}

// corner play badge — tells videos apart from stills at a glance
function drawPlayBadge(ctx, W, H) {
  const s = Math.min(W, H), r = s * 0.055;
  const cx = W - r - s * 0.045, cy = r + s * 0.045;
  ctx.fillStyle = '#0a0c14aa';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#ffffff66'; ctx.lineWidth = Math.max(1.5, s * 0.004); ctx.stroke();
  ctx.fillStyle = '#ffffffee';
  ctx.beginPath();
  ctx.moveTo(cx - r * 0.32, cy - r * 0.48);
  ctx.lineTo(cx - r * 0.32, cy + r * 0.48);
  ctx.lineTo(cx + r * 0.55, cy);
  ctx.closePath(); ctx.fill();
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = String(text).split(' ');
  let line = '', yy = y;
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy); line = w; yy += lineH;
      if (yy > y + lineH * 4) { ctx.fillText(line + '…', x, yy); return; }
    } else line = test;
  }
  ctx.fillText(line, x, yy);
}

function canvasTexture(cv) {
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Front-face texture; tries the real thumb, falls back to the placeholder.
// Returns a texture immediately (placeholder) and swaps in the real image
// when/if it loads — callers don't need to wait.
export function thumbTexture(contrib) {
  const [w, h] = sizeOf(contrib);
  const tex = canvasTexture(placeholderCanvas(contrib, w, h));
  if (contrib.type !== 'text' && !contrib.yours) {
    // generated asset first (video thumbnail or image), else the drop-in
    // convention media/<id>.jpg; missing file keeps the placeholder silently
    const gen = genFor(contrib);
    const url = gen ? (gen.thumb ?? gen.img) : `${MEDIA_BASE}${contrib.id}.jpg`;
    texLoader.load(url, real => {
      // composite the author chip + color frame onto the real asset too
      const img = real.image;
      const cv = document.createElement('canvas');
      cv.width = img.width; cv.height = img.height;
      const ctx = cv.getContext('2d');
      ctx.drawImage(img, 0, 0);
      drawAuthor(ctx, cv.width, cv.height, contrib);
      if (hasVideo(contrib)) drawPlayBadge(ctx, cv.width, cv.height);
      tex.dispose();
      if (tex.onUpgrade) tex.onUpgrade(canvasTexture(cv));
    }, undefined, () => {});
  }
  return tex;
}

// Build the standard content mesh: a thin box, textured on the front face.
// opts.width forces a column width (masonry walls), keeping the aspect ratio.
export function contentMesh(contrib, opts = {}) {
  let [w, h] = sizeOf(contrib);
  if (opts.width) { h *= opts.width / w; w = opts.width; }
  const depth = contrib.type === 'master' ? 0.25 : 0.16;
  // sides in the author's color — the colorful-cube DNA survives the textures
  const side = new THREE.MeshStandardMaterial({
    color: contrib.yours ? '#8a9bff' : userOf(contrib).color,
    roughness: 0.55, metalness: 0.1, transparent: true });
  const front = new THREE.MeshBasicMaterial({ map: thumbTexture(contrib), transparent: true });
  front.map.onUpgrade = real => { front.map = real; front.needsUpdate = true; };
  // box material order: +x, -x, +y, -y, +z (front), -z
  const mats = [side, side, side, side, front, side.clone()];
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, depth), mats);

  // the author's color as a thin 3D frame floating on the front face — a nod
  // to the colorful-cubes look. Geometry, not pixels, so it survives video
  // playback and texture swaps.
  const t = Math.min(w, h) * 0.009;
  const shape = new THREE.Shape()
    .moveTo(-w / 2, -h / 2).lineTo(w / 2, -h / 2)
    .lineTo(w / 2, h / 2).lineTo(-w / 2, h / 2).closePath();
  const hole = new THREE.Path()
    .moveTo(-w / 2 + t, -h / 2 + t).lineTo(w / 2 - t, -h / 2 + t)
    .lineTo(w / 2 - t, h / 2 - t).lineTo(-w / 2 + t, h / 2 - t).closePath();
  shape.holes.push(hole);
  const frameMat = new THREE.MeshBasicMaterial({
    color: contrib.yours ? '#8a9bff' : userOf(contrib).color, transparent: true });
  const frame = new THREE.Mesh(new THREE.ShapeGeometry(shape), frameMat);
  frame.position.z = depth / 2 + 0.002;
  frame.raycast = () => {};   // never steal the parent card's hits
  mesh.add(frame);

  mesh.userData.contrib = contrib;
  mesh.userData.front = front;
  mesh.userData.allMats = [...mats, frameMat];
  return mesh;
}

// fade a card and everything on it (front, sides, color frame) together
export function setCardOpacity(mesh, v) {
  (mesh.userData.allMats ?? mesh.material).forEach(m => m.opacity = v);
}

// Video playback for theater mode. Lazily creates <video> for media/<id>.mp4;
// resolves null when the clip doesn't exist (placeholder stays up).
const videoCache = new Map();
export function videoFor(contrib) {
  if (contrib.type !== 'video' && contrib.type !== 'master') return Promise.resolve(null);
  if (videoCache.has(contrib.id)) return videoCache.get(contrib.id);
  const gen = genFor(contrib);
  if (gen && !gen.vid) return Promise.resolve(null);   // image-only asset
  const p = new Promise(resolve => {
    const v = document.createElement('video');
    v.src = gen ? gen.vid : `${MEDIA_BASE}${contrib.id}.mp4`;
    v.loop = true; v.muted = true; v.playsInline = true; v.crossOrigin = 'anonymous';
    v.addEventListener('canplay', () => {
      const tex = new THREE.VideoTexture(v);
      tex.colorSpace = THREE.SRGBColorSpace;
      resolve({ video: v, texture: tex });
    }, { once: true });
    v.addEventListener('error', () => resolve(null), { once: true });
  });
  videoCache.set(contrib.id, p);
  return p;
}

// Swap a mesh's front face to its playing video (if one exists).
// muted:true is the inline preview (centered card, autoplay-safe);
// muted:false is theater mode. Re-calling with a new muted value on an
// already-playing mesh just toggles the sound without restarting.
export async function playInto(mesh, { muted = false } = {}) {
  const contrib = mesh.userData.contrib;
  const token = mesh.userData.playToken = (mesh.userData.playToken ?? 0) + 1;
  const media = await videoFor(contrib);
  if (!media) return false;
  if (mesh.userData.playToken !== token) return false;   // stopped/replaced meanwhile
  if (mesh.userData.playing !== media.video) {
    media.video.currentTime = 0;
    mesh.userData.savedMap = mesh.userData.front.map;
    mesh.userData.front.map = media.texture;
    mesh.userData.front.needsUpdate = true;
    mesh.userData.playing = media.video;
  }
  media.video.muted = muted;
  media.video.play().catch(() => { media.video.muted = true; media.video.play().catch(() => {}); });
  return true;
}

export function stopPlayback(mesh) {
  if (!mesh?.userData) return;
  mesh.userData.playToken = (mesh.userData.playToken ?? 0) + 1;  // abort pending playInto
  if (!mesh.userData.playing) return;
  mesh.userData.playing.pause();
  mesh.userData.playing.muted = true;
  mesh.userData.front.map = mesh.userData.savedMap;
  mesh.userData.front.needsUpdate = true;
  mesh.userData.playing = null;
}
