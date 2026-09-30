/**
 * AI-generated design illustrations.
 *
 * Imported rather than referenced by path so Vite fingerprints and copies them;
 * every consumer hands the URL to CSS as `--image`, which layers over the linen
 * swatch in `tokens.css` so a slow or failed load still reads as fabric.
 *
 * The WebP files in `niart/` are encoded from the PNG masters that sit beside
 * them in that folder; the masters are not imported and never reach the bundle.
 */
import addaFrameWorkshop from './niart/adda-frame-workshop.webp';
import blouseRailTrio from './niart/blouse-rail-trio.webp';
import bridalBlouseEmeraldTemple from './niart/bridal-blouse-emerald-temple.webp';
import bridalBlouseMaroonZardozi from './niart/bridal-blouse-maroon-zardozi.webp';
import bridalLehengaEmerald from './niart/bridal-lehenga-emerald.webp';
import gownChampagneFloral from './niart/gown-champagne-floral.webp';
import jacketBlackGoldPalazzo from './niart/jacket-black-gold-palazzo.webp';
import kidsLehengaTealBanarasi from './niart/kids-lehenga-teal-banarasi.webp';
import kidsWildflowerDress from './niart/kids-wildflower-dress.webp';
import sareeMagentaAtelierTable from './niart/saree-magenta-atelier-table.webp';
import sareeRedBanarasi from './niart/saree-red-banarasi.webp';
import sherwaniIvoryGold from './niart/sherwani-ivory-gold.webp';
import zardoziMacroNavy from './niart/zardozi-macro-navy.webp';

// `studio-lineup.webp` is deliberately not imported: it is only used as the
// social card, which ships pre-sized from `public/og-image.jpg`. Importing it
// here would put a quarter-megabyte into the bundle that no page ever draws.

export {
  addaFrameWorkshop,
  blouseRailTrio,
  bridalBlouseEmeraldTemple,
  bridalBlouseMaroonZardozi,
  bridalLehengaEmerald,
  gownChampagneFloral,
  jacketBlackGoldPalazzo,
  kidsLehengaTealBanarasi,
  kidsWildflowerDress,
  sareeMagentaAtelierTable,
  sareeRedBanarasi,
  sherwaniIvoryGold,
  zardoziMacroNavy,
};

/** `url(...)` wrapper — what the `--image` custom property expects. */
export const bg = (src) => `url(${src})`;
