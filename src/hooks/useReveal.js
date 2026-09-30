import { useEffect } from 'react';

const SELECTOR = '[data-r],[data-lines],[data-mask],[data-thread],[data-bg]';

/** Reveals an element and, if it is carrying a deferred photo, turns it on. */
function activate(el) {
  el.classList.add('in');
  if (el.dataset.bg) {
    el.style.setProperty('--image', el.dataset.bg);
    delete el.dataset.bg;
  }
}

/**
 * Adds `.in` to every reveal target inside `rootRef` as it scrolls into view,
 * and — for anything carrying `data-bg` — swaps in its photo at the same
 * moment.
 *
 * `data-bg` exists because the photos are CSS backgrounds (so a slow or
 * failed load still reads as woven fabric, per `assets/images.js`), and a
 * `background-image` has no native `loading="lazy"` equivalent: once a
 * `background: var(--image)` rule is in the DOM the browser fetches it
 * immediately, regardless of scroll position. Routing the URL through
 * `data-bg` instead and only promoting it to `--image` here gets the same
 * deferred-until-nearly-visible behaviour `loading="lazy"` gives `<img>`,
 * reusing the one observer the page already runs for the reveal animation
 * rather than standing up a second one.
 *
 * One observer for the whole page rather than one per element: the targets
 * are scattered across every section and none of them need to react
 * individually. The failsafe covers browsers that never fire the callback
 * (and the case where the page is already scrolled past everything on load).
 */
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const targets = Array.from(root.querySelectorAll(SELECTOR));

    if (!('IntersectionObserver' in window)) {
      targets.forEach(activate);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          activate(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '240px 0px', threshold: 0.01 },
    );

    targets.forEach((el) => io.observe(el));

    const failsafe = setTimeout(() => {
      if (!root.querySelector('[data-r].in')) {
        targets.forEach(activate);
      }
    }, 1100);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, [rootRef]);
}
