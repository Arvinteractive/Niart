# NIART — image inventory

The photography now in the site. Masters (PNG, as generated) and the WebP files
the bundle actually imports both live in `src/assets/niart/`; `images.js`
imports only the WebP.

Every image is a CSS `background` drawn `center / cover`, so **the subject must
sit centred with margin on all four sides** — several files are cropped to more
than one ratio. `ratio` in `data/pieces.js` is set per tile to match the source
frame (portrait shots in 3/4 and 4/5, landscape in 16/11).

## Where each file is used

| File | Frame | Used in | Slots |
|------|-------|---------|-------|
| `bridal-lehenga-emerald` | 4:5 | Hero, Wall · Anaikatti, Menu `#collection` | 3 |
| `zardozi-macro-navy` | 16:9 | Craft (full-bleed, 2.5× zoom), Wall · Detail, Menu `#craft` | 3 |
| `saree-red-banarasi` | 4:5 | Signature 01, Wall · Nilaa, Menu `#signature` | 3 |
| `bridal-blouse-maroon-zardozi` | 4:5 | Floor 01 (Aadhi), Menu `#floor` | 2 |
| `kids-lehenga-teal-banarasi` | 4:5 | Signature 05, Wall · Poongodi | 2 |
| `kids-wildflower-dress` | 4:5 | Floor 02 (Poongodi) | 1 |
| `adda-frame-workshop` | 16:9 | Floor 03 (Nilaa) | 1 |
| `bridal-blouse-emerald-temple` | 4:5 | Floor 04 (Ilai) | 1 |
| `gown-champagne-floral` | 4:5 | Signature 02 | 1 |
| `sherwani-ivory-gold` | 4:5 | Signature 03 | 1 |
| `jacket-black-gold-palazzo` | 4:5 | Signature 04 | 1 |
| `blouse-rail-trio` | 16:9 | Wall · Ilai | 1 |
| `saree-magenta-atelier-table` | 16:9 | Wall · Vaanam | 1 |
| `studio-lineup` | 16:9 | `public/og-image.jpg` only — deliberately **not** imported | 0 |

**21 on-page slots, 13 imported files**, plus the social card.

Section counts: Hero 1 · On the floor 4 · The detail file 1 · Signature
carousel 5 · Collection wall 6 · Header menu 4.

## Known gap — the craft macro

`zardozi-macro-navy` is 1672×941. The craft section draws it full-bleed at
`scale(2.5)` from origin 52% / 44% and pulls back to 1× on scroll, so on a
1440px viewport it is drawn at roughly 3600px wide at the start of the scrub.
**It will look soft until the scrub pulls back.** To fix it, regenerate that one
at 4400×3025 or larger:

> Extreme macro photograph of hand embroidery, filling the whole frame.
> Individual gold metal-thread zardozi knots, couched bullion coils, flat silk
> satin stitch and scattered pearl clusters on deep navy silk — every stitch and
> every twist of thread sharply resolved, the weave visible between motifs.
> Raking side light picks up the metallic sheen of the gold. Tack-sharp across
> the centre, only the extreme corners falling off.

**Composition constraint:** five callout labels are pinned over this image at
**12%/26%, 66%/20%, 20%/62%, 73%/57% and 47%/12%**. Keep those five spots as
quiet fabric or plain thread field, not dense pearl clusters, or the labels
won't read.

## Style block — if you generate more

> Editorial fashion-craft photography for a South Indian hand-embroidery
> atelier. Natural diffused window light, single source, soft falloff, no harsh
> shadow. Warm neutral palette — ink brown-black (#1A1613), antique gold
> (#B08D57), raw linen and paper (#F5F0E8), dusty rose (#C9A9A0), muted sage
> (#4A5A4C). Lime-plaster walls, aged teak, brass. Shot on 85mm, f/2.8, shallow
> depth of field, fine film grain, muted contrast. Garment only — no people, no
> faces, no hands. Subject centred with generous empty margin on all four sides.

Negative: no text, no lettering, no logos, no watermark, no border or frame, no
collage, no people, no faces, no hands, no HDR, no oversaturation, no subject
cropped at the edge.

Generate portraits at 4:5 and landscapes at 16:9 to match what is there.

## Adding a file

```bash
ffmpeg -i src/assets/niart/<master>.png -c:v libwebp -quality 82 -compression_level 6 -preset photo src/assets/niart/<name>.webp
```

Then register it in `src/assets/images.js` and reference it from
`src/data/pieces.js` (or `components/HeaderMenu.jsx` for a menu preview). Keep
each WebP under ~450 KB.

## Housekeeping

- The original seven photos (`bridal-lehenga-zardozi`, `denim-jacket-gold-resham`,
  `embroidery-detail-macro`, `ivory-atelier-jacket`, `kids-wildflower-dress`,
  `navy-polo-crest`, `sage-botanical-sweatshirt`, as `.jpg` + `.webp`) are still
  in `src/assets/` but nothing imports them. Safe to delete.
- The PNG masters in `src/assets/niart/` total ~34 MB. They never reach the
  bundle, but they do reach the repo — worth moving outside `src/` or adding to
  `.gitignore` if that matters.
