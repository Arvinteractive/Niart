import { useEffect, useRef, useState } from 'react';
import {
  addaFrameWorkshop,
  bg,
  bridalBlouseMaroonZardozi,
  bridalLehengaEmerald,
  sareeRedBanarasi,
  zardoziMacroNavy,
} from '../assets/images';
import { navItems } from '../data/nav';
import './HeaderMenu.css';

const VISUALS = {
  '#collection': {
    image: bridalLehengaEmerald,
    alt: 'Emerald bridal lehenga on a dress form, gold zardozi across the skirt',
    swatch: 'var(--linen-sage)',
  },
  '#signature': {
    image: sareeRedBanarasi,
    alt: 'Red Kanchipuram silk saree draped over a carved stand, wide gold zari border',
    swatch: 'var(--linen-rose)',
  },
  '#craft': {
    image: zardoziMacroNavy,
    alt: 'Macro photograph of gold zardozi and pearl clusters on navy silk',
    swatch: 'var(--linen)',
  },
  '#floor': {
    image: bridalBlouseMaroonZardozi,
    alt: 'Maroon bridal blouse on a hanger, gold zardozi and a pearl drop fringe',
    swatch: 'var(--linen-rose)',
  },
  '#services': {
    image: addaFrameWorkshop,
    alt: 'A blouse panel stretched on the adda frame, half worked in gold aari embroidery',
    swatch: 'var(--linen)',
  },
};

const FOCUSABLE = 'a[href], button:not([disabled])';

export function HeaderMenu({ open, onClose, reduced, triggerRef }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    restoreFocusRef.current = document.activeElement;
    // The header burger is the close control, so it is what gets focus — it
    // lives outside this dialog but is the first stop in the trap below.
    triggerRef?.current?.focus();

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

      const nodes = [
        triggerRef?.current,
        ...(dialogRef.current?.querySelectorAll(FOCUSABLE) ?? []),
      ].filter(Boolean);
      if (nodes.length === 0) return;
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
  }, [open, onClose, triggerRef]);

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
