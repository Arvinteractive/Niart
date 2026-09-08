import { useEffect, useRef } from 'react';

const PULL_X = 14;
const PULL_Y = 10;

/**
 * Returns a ref for a control that drifts toward the cursor while hovered.
 * The easing back to rest lives in CSS (`[data-mag]`), so this only writes
 * the target transform and clears it on the way out.
 */
export function useMagnetic(disabled = false) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return undefined;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * PULL_X;
      const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * PULL_Y;
      el.style.transform = `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0)`;
    };

    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    el.addEventListener('blur', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('blur', onLeave);
      el.style.transform = '';
    };
  }, [disabled]);

  return ref;
}
