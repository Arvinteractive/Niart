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
import { HeaderBrand, MenuToggle } from './HeaderControls';
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

export function HeaderMenu({ open, onClose, onToggle, reduced, triggerRef }) {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [present, setPresent] = useState(false);
  const visible = open && entered;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);
  const visual = VISUALS[navItems[active].href];

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef?.current;
    let firstFrame = 0;
    let secondFrame = 0;
    let closeTimer = 0;
    let layoutObserver;

    const alignControls = () => {
      dialog.style.setProperty('--menu-viewport-width', `${window.innerWidth}px`);
      const brand = trigger.closest('.hdr__bar').querySelector('.hdr__brand');
      const buttonBox = trigger.getBoundingClientRect();
      const brandBox = brand.getBoundingClientRect();
      dialog.style.setProperty('--menu-toggle-x', `${buttonBox.left}px`);
      dialog.style.setProperty('--menu-toggle-y', `${buttonBox.top}px`);
      dialog.style.setProperty('--menu-brand-x', `${brandBox.left}px`);
      dialog.style.setProperty('--menu-brand-y', `${brandBox.top}px`);
      dialog.style.setProperty('--menu-bar-height', `${trigger.closest('.hdr__bar').getBoundingClientRect().height}px`);
      dialog.style.setProperty('--menu-source-color', getComputedStyle(trigger).color);
    };

    if (open) {
      alignControls();
      if (!dialog.open) {
        const page = document.documentElement;
        const body = document.body;
        const previous = { pageOverflow: page.style.overflow, gutter: page.style.scrollbarGutter, bodyOverflow: body.style.overflow };
        restoreRef.current = () => {
          page.style.overflow = previous.pageOverflow;
          page.style.scrollbarGutter = previous.gutter;
          body.style.overflow = previous.bodyOverflow;
        };
        page.style.scrollbarGutter = 'stable';
        page.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        dialog.showModal();
        setPresent(true);
        closeRef.current?.focus({ preventScroll: true });
      }
      // Paint the matching hamburger first, then rotate it and reveal the menu.
      // Keeping the dialog open during the reverse transition avoids a closing snap.
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => setEntered(true));
      });
    } else {
      if (dialog.open) {
        closeTimer = window.setTimeout(() => {
          dialog.close();
          setEntered(false);
          setPresent(false);
          restoreRef.current?.();
          restoreRef.current = null;
          trigger?.focus({ preventScroll: true });
        }, reduced ? 0 : 420);
      }
    }
    if (dialog.open) {
      window.addEventListener('resize', alignControls);
      layoutObserver = new ResizeObserver(alignControls);
      layoutObserver.observe(trigger.closest('.hdr__bar'));
    }
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.clearTimeout(closeTimer);
      window.removeEventListener('resize', alignControls);
      layoutObserver?.disconnect();
    };
  }, [open, reduced, triggerRef]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      dialog.close();
      restoreRef.current?.();
      restoreRef.current = null;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      id="site-menu"
      className={`hmenu${visible ? ' hmenu--open' : ''}`}
      aria-label="Site menu"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = dialogRef.current.querySelectorAll('button, a[href]:not([tabindex="-1"])');
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
      <div className="hmenu__surface" aria-hidden="true"><span className="hmenu__texture" /></div>
      <div className="hmenu__top">
        <HeaderBrand revealed />
        <MenuToggle buttonRef={closeRef} active={visible} expanded={open} onClick={onToggle} />
      </div>

      <div className="hmenu__body">
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
            {present && (
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
      </div>
    </dialog>
  );
}
