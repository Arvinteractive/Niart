import { useEffect } from 'react';
import {
  clamp01,
  craftScale,
  elementProgress,
  pieceTransform,
  scatterFactor,
} from '../lib/parallax';

/**
 * Where the hand-composed layouts collapse: the stages become a plain grid and
 * the craft section stops being a sticky scrub, so none of the scroll-linked
 * transforms below apply.
 *
 * Must stay in step with the `max-width: 900px` blocks in `styles/stage.css` and
 * `components/CraftStory.css`. Matched with `matchMedia` and the identical query
 * string rather than comparing `innerWidth`, so the two can never disagree about
 * the boundary itself (`max-width: 900px` includes 900; `innerWidth < 900` does
 * not) or about whether a classic scrollbar counts toward the width.
 */
const STAGE_COLLAPSE = '(max-width: 900px)';

/**
 * Drives every scroll-linked transform on the page from a single rAF pass:
 *
 *  - `[data-par]` / `[data-parx]` / `[data-scale]` — parallax drift and scale-in
 *  - `[data-ox]` / `[data-oy]`                     — the wall scattering outward at its end
 *  - the craft section                             — macro photo pulling back to full design,
 *                                                    with its labels and copy scrubbed in
 *
 * The scroll position is eased before it drives any of that (see `EASE` below),
 * which is where the page's smooth feel comes from — the browser keeps ownership
 * of scrolling itself.
 *
 * Geometry is measured once per resize and reused, so the scroll handler only
 * writes transforms and class toggles. Everything here is deliberately outside
 * React state: it runs at frame rate and never changes what is rendered.
 */
export function useScrollMotion({
  rootRef,
  craftRef,
  craftImgRef,
  craftEyebrowRef,
  craftHeadRef,
  craftCopyRef,
  wallRef,
  parallax = true,
  reduced = false,
}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const parEls = Array.from(
      root.querySelectorAll('[data-par],[data-parx],[data-scale]'),
    );
    const craftLabels = Array.from(root.querySelectorAll('[data-lab][data-at]'));

    // Cached geometry, refreshed on resize.
    let boxes = [];
    let craft = null;
    let wall = null;
    let mobile = false;

    /* Every transform below is driven by `smoothY`, which chases the real scroll
       position by a fraction of the remaining distance each frame. That lag is
       what gives the page its glide — and unlike a scroll-hijacking library it
       leaves the scroll itself alone, so native momentum, the scrollbar, keyboard
       paging and the sticky craft section all behave normally. */
    const EASE = 0.12;
    const SETTLE = 0.08; // px; close enough to call it arrived and stop the loop

    let smoothY = window.scrollY;
    let running = false;
    let frameId = 0;

    const measure = () => {
      const y = window.scrollY;
      mobile = window.matchMedia(STAGE_COLLAPSE).matches;

      boxes = parEls.map((el) => {
        const r = el.getBoundingClientRect();
        return { el, top: r.top + y, height: r.height };
      });

      const c = craftRef.current;
      if (c) {
        const r = c.getBoundingClientRect();
        craft = { top: r.top + y, height: r.height };
      }

      const w = wallRef.current;
      if (w) {
        const r = w.getBoundingClientRect();
        wall = { top: r.top + y, height: r.height };
      }
    };

    const settleCraft = () => {
      const img = craftImgRef.current;
      if (img) img.style.transform = 'scale(1.15)';
      if (craftHeadRef.current) craftHeadRef.current.classList.add('in');
      [craftEyebrowRef, craftCopyRef].forEach((ref) => {
        if (ref.current) ref.current.classList.add('on');
      });
      craftLabels.forEach((el) => el.classList.add('on'));
    };

    const update = (y) => {
      const vh = window.innerHeight;

      if (!mobile && parallax && !reduced) {
        const scatter = wall
          ? scatterFactor(clamp01((y + vh - wall.top) / wall.height))
          : 0;

        boxes.forEach(({ el, top, height }) => {
          el.style.transform = pieceTransform(
            el.dataset,
            elementProgress(y, vh, top, height),
            scatter,
          );
        });
      }

      // Craft story: the macro shot pulls back as the sticky section scrubs.
      if (craft && !mobile && craft.height - vh > 80) {
        const p = clamp01((y - craft.top) / (craft.height - vh));

        const img = craftImgRef.current;
        if (img && !reduced) {
          img.style.transform = `scale(${craftScale(p).toFixed(3)})`;
        }

        craftLabels.forEach((el) => {
          el.classList.toggle('on', p >= parseFloat(el.dataset.at));
        });

        if (craftEyebrowRef.current) {
          craftEyebrowRef.current.classList.toggle('on', p >= 0.3);
        }
        if (craftHeadRef.current) {
          craftHeadRef.current.classList.toggle('in', p >= 0.38);
        }
        if (craftCopyRef.current) {
          craftCopyRef.current.classList.toggle('on', p >= 0.58);
        }
      } else if (craftImgRef.current) {
        // Too short to scrub (mobile, or a stubby viewport): show the resolved state.
        settleCraft();
      }
    };

    const frame = () => {
      const targetY = window.scrollY;
      // Reduced motion takes the target whole: no lag, no easing.
      smoothY += (targetY - smoothY) * (reduced ? 1 : EASE);

      if (Math.abs(targetY - smoothY) < SETTLE) {
        smoothY = targetY;
        running = false;
      } else {
        frameId = requestAnimationFrame(frame);
      }

      update(smoothY);
    };

    const onScroll = () => {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(frame);
    };

    const onResize = () => {
      measure();
      // A resize can move the ground under the eased value — resync rather than
      // gliding to a position measured against the old layout.
      smoothY = window.scrollY;
      update(smoothY);
    };

    measure();
    update(smoothY);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Re-measure once webfonts have settled and reflowed the page.
    let disposed = false;
    document.fonts?.ready.then(() => {
      if (!disposed) onResize();
    });
    document.fonts?.addEventListener('loadingdone', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      disposed = true;
      document.fonts?.removeEventListener('loadingdone', onResize);
    };
  }, [
    rootRef,
    craftRef,
    craftImgRef,
    craftEyebrowRef,
    craftHeadRef,
    craftCopyRef,
    wallRef,
    parallax,
    reduced,
  ]);
}
