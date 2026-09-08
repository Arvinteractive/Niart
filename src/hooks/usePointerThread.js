import { useEffect } from 'react';

const SWAY_X = 10;
const SWAY_Y = 16;

/**
 * Lets the hero's embroidery thread sway with the cursor as it crosses the
 * section — a small parallax that makes the SVG read as suspended rather than
 * printed on the background.
 */
export function usePointerThread(heroRef, threadRef, disabled = false) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || disabled) return undefined;

    const onMove = (e) => {
      const thread = threadRef.current;
      if (!thread) return;
      const r = hero.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * SWAY_X;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * SWAY_Y;
      thread.style.transform = `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0)`;
    };

    hero.addEventListener('pointermove', onMove, { passive: true });
    return () => hero.removeEventListener('pointermove', onMove);
  }, [heroRef, threadRef, disabled]);
}
