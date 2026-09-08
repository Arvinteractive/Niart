import { useEffect, useRef, useState } from 'react';
import {
  bg,
  bridalLehengaZardozi,
  denimJacketGoldResham,
  embroideryDetailMacro,
  ivoryAtelierJacket,
} from '../assets/images';
import { navItems } from '../data/nav';
import './HeaderMenu.css';

const VISUALS = {
  '#collection': {
    image: bridalLehengaZardozi,
    alt: 'Bridal lehenga spread open, gold zardozi worked across the skirt',
    swatch: 'var(--linen)',
  },
  '#signature': {
    image: denimJacketGoldResham,
    alt: 'Denim jacket with a gold resham panel embroidered across the back',
    swatch: 'var(--linen-rose)',
  },
  '#craft': {
    image: embroideryDetailMacro,
    alt: 'Macro photograph of gold and green threadwork on linen',
    swatch: 'var(--linen)',
  },
  '#floor': {
    image: ivoryAtelierJacket,
    alt: 'Ivory linen jacket on a stand, cord and bullion embroidery across the front',
    swatch: 'var(--linen-sage)',
  },
};

const FOCUSABLE = 'a[href], button:not([disabled])';

export function HeaderMenu({ open, onClose, reduced }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    restoreFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Escape closes; Tab is trapped inside the dialog while it's open, since
    // everything behind it is still in the DOM (and inert-but-focusable
    // without this).
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      // Give focus back to whatever opened the menu (the burger button, in
      // practice) rather than dropping it back to the top of the document.
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      ref={dialogRef}
      className={`hmenu${open ? ' hmenu--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
    >
      <span className="hmenu__texture" aria-hidden="true" />

      <button ref={closeRef} type="button" className="hmenu__close" onClick={onClose} aria-label="Close menu">
        <span className="hmenu__close-line" />
        <span className="hmenu__close-line" />
      </button>

      <div className="shell hmenu__inner">
        <nav className="hmenu__list" aria-label="Full site menu">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              className="hmenu__item"
              href={item.href}
              tabIndex={open ? 0 : -1}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={onClose}
              style={{ transitionDelay: reduced ? '0ms' : `${i * 70 + 80}ms` }}
            >
              <span className="hmenu__index">{item.index}</span>
              <span className="hmenu__label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="hmenu__stage" aria-hidden="true">
          {navItems.map((item, i) => {
            const visual = VISUALS[item.href];
            return (
              <span
                key={item.href}
                className={`hmenu__image${i === active ? ' hmenu__image--active' : ''}`}
                role="img"
                aria-label={visual.alt}
                style={{ '--image': bg(visual.image), '--swatch': visual.swatch }}
              />
            );
          })}
          <span className="hmenu__tick" />
        </div>
      </div>

      <div className="hmenu__foot">
        <p>Hand-embroidered in Coimbatore</p>
        <p>Zardozi · Aari · Kamdani</p>
      </div>
    </div>
  );
}
