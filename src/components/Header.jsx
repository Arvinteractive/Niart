import { useCallback, useRef, useState } from 'react';
import { navItems } from '../data/nav';
import { useHeaderScroll } from '../hooks/useHeaderScroll';
import { HeaderMenu } from './HeaderMenu';
import { HeaderBrand, MenuToggle } from './HeaderControls';
import './Header.css';

export function Header({ reduced }) {
  const scrolled = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((value) => !value), []);

  const setUnderlineOrigin = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const fromLeft = e.clientX - r.left < r.width / 2;
    e.currentTarget.style.setProperty('--origin', fromLeft ? '0%' : '100%');
  };

  return (
    <header
      className={`hdr${scrolled ? ' hdr--scrolled' : ''}`}
    >
      <span className="hdr__texture" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <svg
        className="hdr__thread"
        data-thread
        aria-hidden="true"
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
      >
        <path
          data-draw
          pathLength="1"
          d="M0 12 C 240 3 480 21 720 11 C 960 2 1200 19 1440 9"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity=".8"
        />
      </svg>

      <div className="shell hdr__bar">
        <HeaderBrand revealed />

        <nav className="hdr__nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="hdr__navlink"
              data-r
              href={item.href}
              onPointerEnter={setUnderlineOrigin}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hdr__actions">
          <MenuToggle buttonRef={burgerRef} active={false} expanded={menuOpen} onClick={toggleMenu} />
        </div>
      </div>

      <HeaderMenu
        open={menuOpen}
        onClose={closeMenu}
        onToggle={toggleMenu}
        reduced={reduced}
        triggerRef={burgerRef}
      />
    </header>
  );
}
