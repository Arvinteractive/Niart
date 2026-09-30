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

export function HeaderMenu({ open, onClose, reduced, triggerRef }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const visual = VISUALS[navItems[active].href];

  useEffect(() => {
    if (!open) return undefined;

    const dialog = dialogRef.current;
    const trigger = triggerRef?.current;
    dialog.showModal();
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <dialog
      ref={dialogRef}
      id="site-menu"
      className={`hmenu${open ? ' hmenu--open' : ''}`}
      aria-label="Site menu"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = dialogRef.current.querySelectorAll('button, a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
    >
      <span className="hmenu__texture" aria-hidden="true" />
      <div className="shell hmenu__top">
        <span className="hmenu__brand">NIART</span>
        <button ref={closeRef} type="button" className="hmenu__close" onClick={onClose} aria-label="Close menu">Close <span aria-hidden="true">×</span></button>
      </div>

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
          {open && (
              <span
                key={navItems[active].href}
                className="hmenu__image hmenu__image--active"
                style={{ '--image': bg(visual.image), '--swatch': visual.swatch }}
              />
          )}
          <span className="hmenu__tick" />
        </div>
      </div>

      <div className="hmenu__foot">
        <p>Hand-embroidered in Coimbatore</p>
        <p>Zardozi · Aari · Kamdani</p>
      </div>
    </dialog>
  );
}
