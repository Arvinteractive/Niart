export const clamp01 = (n) => Math.max(0, Math.min(1, n));

/** How far through the viewport an element of `height` sitting at `top` is. */
export function elementProgress(scrollY, viewportHeight, top, height) {
  return clamp01((scrollY + viewportHeight - top) / (viewportHeight + height));
}

/**
 * How strongly the collection wall has "scattered" — 0 until the section is
 * 72% past, then ramping to 1 over the remaining 28%.
 */
export function scatterFactor(wallProgress) {
  return Math.max(0, (wallProgress - 0.72) / 0.28);
}

/**
 * Builds the transform for one scroll-linked piece.
 *
 * `dataset` carries the per-piece motion attributes straight off the element:
 *   par / parx — vertical or horizontal drift, in px at the extremes
 *   scale      — scale up from .92 as the piece enters
 *   ox / oy    — extra offset applied only as the wall scatters
 *
 * Pure so the motion can be reasoned about (and tested) without a browser.
 */
export function pieceTransform(dataset, progress, scatter = 0) {
  const { par, parx, scale, ox, oy } = dataset;
  const centered = (progress - 0.5) * 2;
  let t = '';

  if (parx) {
    t += `translate3d(${(-centered * parseFloat(parx)).toFixed(1)}px,0,0) `;
  } else if (par) {
    t += `translate3d(0,${(centered * parseFloat(par)).toFixed(1)}px,0) `;
  }

  if (scale) {
    t += `scale(${(0.92 + 0.08 * Math.min(1, progress * 1.6)).toFixed(3)}) `;
  }

  if (scatter > 0 && (ox || oy)) {
    const dx = parseFloat(ox || 0) * scatter;
    const dy = parseFloat(oy || 0) * scatter;
    t += `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) `;
  }

  return t;
}

/** Macro shot scale for the craft section, 2.5x at the top down to 1x at the end. */
export function craftScale(progress) {
  return 2.5 - 1.5 * progress;
}
