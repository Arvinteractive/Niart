# NIART

React implementation of the **NIART Components** design (`NIART Components.dc.html`)
— a scroll-driven page for a hand-embroidery studio.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Sections

| # | Section | File | Behaviour |
|---|---------|------|-----------|
| — | Header | `components/Header.jsx` + `HeaderMenu.jsx` | Fixed nav, transparent-over-hero → solid on scroll; native modal menu with internal focus, background isolation and scrolling |
| 1 | Hero | `components/Hero.jsx` | Line-by-line type reveal, image wipe, gold thread that sways with the cursor |
| 2 | On the floor | `components/FloorPieces.jsx` | Scattered pieces, parallax drift, hover dims the siblings |
| 3 | The detail file | `components/CraftStory.jsx` | Sticky 340vh track; the macro shot pulls back 2.5x → 1x as callouts scrub in |
| 4 | Signature | `components/SignatureCarousel.jsx` | Wipe carousel — dots, arrow keys, horizontal wheel, pointer drag |
| 5 | Collection | `components/CollectionWall.jsx` | Wall of pieces that scatters outward over the last 28% of the section |
| — | Footer | `components/Footer.jsx` | Nav/social/contact, copy-to-clipboard email, links to the legal pages |

The site also ships three standalone pages, built as separate Vite entries
(see `vite.config.js`) rather than client-side routes, since there's no
router: [`privacy.html`](privacy.html), [`terms.html`](terms.html), and
[`404.html`](404.html) (served automatically for unmatched paths on static
hosts that support that convention, e.g. Vercel).

## Structure

```
src/
  components/     one file + one stylesheet per section
  hooks/          reveal, scroll motion, magnetic buttons, cursor thread, header scroll
  lib/parallax.js pure transform math (no DOM)
  data/pieces.js  all copy, placement and motion values
  data/nav.js     primary nav items (header + full-screen menu share this)
  data/contact.js the one place the studio's email/WhatsApp are configured
  assets/         the generated design illustrations + images.js barrel
  styles/         tokens, motion primitives, shared stage layout, legal/404 page styles
design/           the original .dc.html source, kept for reference
```

`NiartComponents` takes the three props the design exposed:

```jsx
<NiartComponents showPrices={false} parallax accent="#B08D57" />
```

## Notes on the port

- **Smooth scrolling, without taking the scroll.** Two independent pieces, no
  library: `scroll-behavior: smooth` on `html` (behind
  `prefers-reduced-motion: no-preference`) glides the in-page CTAs to their
  section, and `useScrollMotion` eases its own scroll value — each frame it
  closes 12% of the gap to `window.scrollY` — so the parallax and the craft
  scrub trail the page instead of tracking it 1:1. Nothing overrides the wheel,
  touch momentum, scrollbar or keyboard paging, which is what a scroll-hijacking
  library would do, and what the sticky craft section could not survive.
- **Scroll motion stays out of React.** One rAF pass writes transforms directly;
  geometry is cached and only re-measured on resize. Re-rendering at frame rate
  would buy nothing — none of it changes what is rendered.
- **The carousel splits the difference.** The index is React state (dots, counter,
  progress bar, `aria-current`, background all derive from it), while the wipe
  itself runs in a layout effect, because it needs its start frame painted with
  transitions off and a forced reflow before it can animate.
- **Placement travels as CSS custom properties** (`--x`/`--y`/`--w`), so the
  responsive collapse is a plain media query instead of the original's stack of
  `!important` overrides.
- **`overflow-x: clip`, not `hidden`.** On `body`, `overflow-x: hidden` forces
  `overflow-y` to `auto`, which makes the body its own scroll container and
  breaks window scrolling. `clip` crops the deliberate overhangs without that.
- **Hover-dimming is gated behind `@media (hover: hover)`** so captions are
  readable on touch instead of waiting for a hover that never arrives.
- **Photography travels as a CSS custom property.** `assets/images.js` re-exports
  the 13 illustrative images as Vite-fingerprinted, WebP-encoded URLs; each piece in
  `data/pieces.js` names one, and the component hands it down as `--image`. The
  design's woven-linen gradient stays underneath it as the second background
  layer, so a photo that has not decoded yet reads as fabric rather than a hole.
- **Below-the-fold photos are lazy without `<img loading="lazy">`.** A
  `background-image` has no native lazy-loading hook, so those elements carry
  the URL in `data-bg` instead of `--image`; `useReveal`'s existing
  `IntersectionObserver` promotes `data-bg` → `--image` the moment an element
  nears the viewport (same pass that adds the `.in` reveal class), so the
  fetch is deferred until it's about to matter. Only the Hero image — the LCP
  candidate — stays eager.

## Publishing

Production is hosted on Vercel at https://www.niart.in/. The GitHub repository is
Arvinteractive/Niart. Run the lint and production build before publishing; the build
checks generated assets, contact fallback, metadata, notices and CSP script hashes.

Preview the production output with npm run preview to exercise the production
security headers. Vercel serves the branded 404 page for missing paths. Legal pages
are separate static entries. No SPA rewrite should turn missing pages into a 200.

Enquiries currently use the confirmed Instagram profile. Add email or WhatsApp to
src/data/contact.js only after verification, then update the static legal pages
and structured data to match. Prices are hidden pending confirmation. The images
are generated illustrations; see design/asset-register.md for remaining owner checks.

The CSP allows inline styles for the existing visual effects, but scripts must be
local or explicitly hashed. If the static JSON-LD changes, recompute its SHA-256
hash in vercel.json. Keep index.html line endings as LF so deployment hashes match.

Node.js 24 is the build runtime. No secrets or hosting account configuration
should be committed.
