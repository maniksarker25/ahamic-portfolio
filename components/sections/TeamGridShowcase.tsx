'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMAGES } from '../../constants/images';
import { STATS as SITE_STATS } from '../../constants/site';

/*
  TeamGridShowcase — staggered "arch" mosaic shown under the hero CTAs.

  Desktop (lg+): every tile is absolutely positioned inside a fixed-aspect
  canvas (DESIGN_W x DESIGN_H). Positions are expressed as percentages of that
  canvas and radii / font sizes in container-query units (cqw), so the whole
  mosaic scales proportionally with the viewport. All columns share the same
  bottom edge; their tops are staggered, and each tile has one large rounded
  corner.

  Mobile / tablet (<lg): a simpler two-column version with the same styling.

  To change photos, edit PHOTOS below (add files to /public and register them in constants/images.ts).
  The four stat cards show the same numbers as the Stats section (constants/site.ts → STATS).
*/

const DESIGN_W = 1861;
const DESIGN_H = 592;

/* ── Photos ─────────────────────────────────────────────────────────────── */
const SRC = {
  dev: IMAGES.TEAM_DEV.src,
  designer: IMAGES.TEAM_DESIGNER.src,
  pair: IMAGES.TEAM_PAIR.src,
  team: IMAGES.TEAM_COLLABORATION.src,
};

interface Photo {
  src: string;
  alt: string;
  /** focal point, used for both object-position and zoom origin */
  pos?: string;
  /** optional zoom (1 = none) to show a different crop of a reused photo */
  zoom?: number;
}

const PHOTOS: Record<string, Photo> = {
  leftTall:    { src: SRC.dev,      alt: 'Developer working at his desk', pos: '70% 50%' },
  leftWide:    { src: SRC.team,     alt: 'Team planning session',         pos: 'center 60%' },
  portraitA:   { src: SRC.designer, alt: 'Product designer',              pos: '50% 38%', zoom: 1.6 },
  centerTall:  { src: SRC.pair,     alt: 'Engineers reviewing code',      pos: '55% 60%' },
  smallWide:   { src: SRC.team,     alt: 'Engineers discussing',          pos: '78% 45%', zoom: 1.5 },
  portraitB:   { src: SRC.pair,     alt: 'Software engineer',             pos: '92% 45%', zoom: 2 },
  rightWide:   { src: SRC.team,     alt: 'Team collaborating on laptops', pos: '30% 60%', zoom: 1.5 },
  rightTall:   { src: SRC.designer, alt: 'Team member at work',           pos: '50% 50%' },
  rightSquare: { src: SRC.dev,      alt: 'Developer coding',              pos: '68% 48%', zoom: 1.7 },
};

/* ── Stats ──────────────────────────────────────────────────────────────── */
type Stat = { label: string; value: string; bg: string };

/** Card for one entry of constants/site.ts → STATS (matched by label). */
function stat(label: string, bg: string): Stat {
  const s = SITE_STATS.find((x) => x.label === label);
  return { label, value: s ? `${s.value}${s.suffix}` : '—', bg };
}

const STATS = {
  team:         stat('Team members', '#cfe9fb'),
  projects:     stat('Projects completed', '#fdd8ef'),
  experience:   stat('Years experience', '#d7fbe8'),
  satisfaction: stat('Client satisfaction', '#dcd5fd'),
};

type Corner = 'tl' | 'tr';

/* ── Desktop layout (design-space pixels) ───────────────────────────────── */
type Tile =
  | { kind: 'photo'; photo: Photo; x: number; y: number; w: number; h: number; corner: Corner; r: number; col: number }
  | { kind: 'stat'; stat: Stat; x: number; y: number; w: number; h: number; corner: Corner; r: number; col: number };

const TILES: Tile[] = [
  // col 1–2
  { kind: 'photo', photo: PHOTOS.leftTall,  x: 0,    y: 0,   w: 229, h: 356, corner: 'tl', r: 80,  col: 0 },
  { kind: 'stat',  stat: STATS.team,         x: 245,  y: 148, w: 201, h: 208, corner: 'tr', r: 110, col: 1 },
  { kind: 'photo', photo: PHOTOS.leftWide,  x: 0,    y: 373, w: 458, h: 219, corner: 'tr', r: 80,  col: 0 },
  // col 3
  { kind: 'photo', photo: PHOTOS.portraitA, x: 478,  y: 182, w: 214, h: 177, corner: 'tr', r: 90,  col: 2 },
  { kind: 'stat',  stat: STATS.projects,    x: 478,  y: 376, w: 214, h: 216, corner: 'tr', r: 120, col: 2 },
  // col 4 (centre)
  { kind: 'photo', photo: PHOTOS.centerTall,x: 712,  y: 151, w: 235, h: 441, corner: 'tr', r: 110, col: 3 },
  // col 5
  { kind: 'stat',  stat: STATS.experience,  x: 967,  y: 241, w: 214, h: 208, corner: 'tl', r: 110, col: 4 },
  { kind: 'photo', photo: PHOTOS.smallWide, x: 967,  y: 466, w: 214, h: 126, corner: 'tr', r: 60,  col: 4 },
  // col 6
  { kind: 'photo', photo: PHOTOS.portraitB, x: 1201, y: 135, w: 223, h: 187, corner: 'tl', r: 90,  col: 5 },
  { kind: 'stat',  stat: STATS.satisfaction, x: 1440, y: 113, w: 190, h: 209, corner: 'tr', r: 100, col: 5 },
  { kind: 'photo', photo: PHOTOS.rightWide, x: 1201, y: 339, w: 429, h: 253, corner: 'tr', r: 80,  col: 5 },
  // col 7
  { kind: 'photo', photo: PHOTOS.rightTall,  x: 1650, y: 16,  w: 211, h: 349, corner: 'tl', r: 100, col: 6 },
  { kind: 'photo', photo: PHOTOS.rightSquare,x: 1650, y: 382, w: 211, h: 210, corner: 'tr', r: 70,  col: 6 },
];

const pctX = (v: number) => `${(v / DESIGN_W) * 100}%`;
const pctY = (v: number) => `${(v / DESIGN_H) * 100}%`;
const cqw = (px: number) => `${(px / DESIGN_W) * 100}cqw`;

function radius(corner: Corner, big: string, small = '4px') {
  return corner === 'tl'
    ? `${big} ${small} ${small} ${small}`
    : `${small} ${big} ${small} ${small}`;
}

/* ── Building blocks ────────────────────────────────────────────────────── */
/** `sizes` tells the browser which resized version to download for this tile. */
function PhotoFill({ photo, sizes }: { photo: Photo; sizes: string }) {
  const zoom = photo.zoom ?? 1;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      draggable={false}
      className="object-cover transition-transform duration-700 ease-out [transform:scale(var(--z))] group-hover:[transform:scale(calc(var(--z)*1.05))]"
      style={{
        objectPosition: photo.pos ?? 'center',
        transformOrigin: photo.pos ?? 'center',
        ['--z' as string]: zoom,
      }}
    />
  );
}

function StatFill({
  stat,
  labelSize,
  valueSize,
}: {
  stat: Stat;
  labelSize: string;
  valueSize: string;
}) {
  return (
    <div
      className="flex h-full w-full flex-col justify-start"
      style={{ background: stat.bg, padding: '40% 16% 0' }}
    >
      <span className="font-sans font-medium text-slate-700" style={{ fontSize: labelSize, lineHeight: 1.3 }}>
        {stat.label}
      </span>
      <span
        className="font-display font-medium text-slate-900"
        style={{ fontSize: valueSize, lineHeight: 1.1, letterSpacing: '-0.01em', marginTop: '0.15em' }}
      >
        {stat.value}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export function TeamGridShowcase() {
  return (
    <>
      {/* ━━━━━━━━━━━━━━━━  DESKTOP  (lg and above)  ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="hidden w-full px-4 lg:block">
        <div
          className="relative w-full"
          style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}`, containerType: 'inline-size' }}
        >
          {TILES.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: 0.15 + t.col * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group absolute overflow-hidden"
              style={{
                left: pctX(t.x),
                top: pctY(t.y),
                width: pctX(t.w),
                height: pctY(t.h),
                borderRadius: radius(t.corner, cqw(t.r)),
              }}
            >
              {t.kind === 'photo' ? (
                <PhotoFill photo={t.photo} sizes={`${Math.ceil((t.w / DESIGN_W) * 100)}vw`} />
              ) : (
                <StatFill
                  stat={t.stat}
                  labelSize={`clamp(12px, ${cqw(18)}, 22px)`}
                  valueSize={`clamp(28px, ${cqw(52)}, 64px)`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━  TABLET / MOBILE  (<lg)  ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid w-full grid-cols-2 gap-3 px-4 pb-12 sm:grid-cols-3 lg:hidden"
      >
        {[
          { type: 'photo', photo: PHOTOS.leftTall,   corner: 'tl' as Corner, h: 'h-56' },
          { type: 'stat',  stat: STATS.team,         corner: 'tr' as Corner, h: 'h-56' },
          { type: 'photo', photo: PHOTOS.centerTall, corner: 'tr' as Corner, h: 'h-56' },
          { type: 'stat',  stat: STATS.projects,     corner: 'tr' as Corner, h: 'h-48' },
          { type: 'photo', photo: PHOTOS.rightTall,  corner: 'tl' as Corner, h: 'h-48' },
          { type: 'stat',  stat: STATS.experience,   corner: 'tl' as Corner, h: 'h-48' },
          { type: 'photo', photo: PHOTOS.portraitA,  corner: 'tr' as Corner, h: 'h-44' },
          { type: 'stat',  stat: STATS.satisfaction, corner: 'tr' as Corner, h: 'h-44' },
          { type: 'photo', photo: PHOTOS.leftWide,   corner: 'tl' as Corner, h: 'h-44' },
        ].map((t, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden ${t.h} ${i === 8 ? 'col-span-2 sm:col-span-1' : ''}`}
            style={{ borderRadius: radius(t.corner, '4rem') }}
          >
            {t.type === 'photo' && t.photo ? (
              <PhotoFill photo={t.photo} sizes={i === 8 ? '(min-width: 640px) 33vw, 100vw' : '(min-width: 640px) 33vw, 50vw'} />
            ) : t.stat ? (
              <StatFill stat={t.stat} labelSize="14px" valueSize="2.25rem" />
            ) : null}
          </div>
        ))}
      </motion.div>
    </>
  );
}
