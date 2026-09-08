import { useEffect, useState } from 'react';

const THRESHOLD = 72;

/**
 * Tracks whether the page has scrolled past the point where the header
 * should switch from the spacious, transparent hero state to the compact,
 * solid one. A rAF guard keeps the scroll listener itself cheap; the actual
 * visual interpolation happens in CSS transitions on the resulting class.
 */
export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > THRESHOLD);

  useEffect(() => {
    let ticking = false;

    const check = () => {
      ticking = false;
      setScrolled(window.scrollY > THRESHOLD);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}
