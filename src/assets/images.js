/**
 * The studio photography.
 *
 * Imported rather than referenced by path so Vite fingerprints and copies them;
 * every consumer hands the URL to CSS as `--image`, which layers over the linen
 * swatch in `tokens.css` so a slow or failed load still reads as fabric.
 */
import bridalLehengaZardozi from './bridal-lehenga-zardozi.webp';
import denimJacketGoldResham from './denim-jacket-gold-resham.webp';
import embroideryDetailMacro from './embroidery-detail-macro.webp';
import ivoryAtelierJacket from './ivory-atelier-jacket.webp';
import kidsWildflowerDress from './kids-wildflower-dress.webp';
import navyPoloCrest from './navy-polo-crest.webp';
import sageBotanicalSweatshirt from './sage-botanical-sweatshirt.webp';

export {
  bridalLehengaZardozi,
  denimJacketGoldResham,
  embroideryDetailMacro,
  ivoryAtelierJacket,
  kidsWildflowerDress,
  navyPoloCrest,
  sageBotanicalSweatshirt,
};

/** `url(...)` wrapper — what the `--image` custom property expects. */
export const bg = (src) => `url(${src})`;
