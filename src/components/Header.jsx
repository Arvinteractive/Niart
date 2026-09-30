import { useCallback, useRef, useState } from 'react';
import niartMark from '../assets/niart-mark.png';
import { navItems } from '../data/nav';
import { useHeaderScroll } from '../hooks/useHeaderScroll';
import { HeaderMenu } from './HeaderMenu';
import './Header.css';

export function Header({ reduced }) {
  const scrolled = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const setUnderlineOrigin = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const fromLeft = e.clientX - r.left < r.width / 2;
    e.currentTarget.style.setProperty('--origin', fromLeft ? '0%' : '100%');
  };

  return (
    <header
      className={`hdr${scrolled ? ' hdr--scrolled' : ''}${menuOpen ? ' hdr--menu-open' : ''}`}
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
        {/* The brand links to "/" rather than "#": a bare "#" is a dead link
            to a crawler, and the logo is the one internal link on every page
            that should point at the canonical home URL. */}
        <a
          className="hdr__brand"
          data-r
          href="/"
          aria-label="NIART Designer Studio, Coimbatore — home"
        >
          <img className="hdr__mark" src={niartMark} alt="" width="256" height="256" />
          <span className="hdr__brand-text">
            <span className="hdr__word">NIART</span>
            <span className="hdr__est">Designer Studio · Coimbatore</span>
          </span>
        </a>

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

        <div className="hdr__actions" data-r>
          <button
            ref={burgerRef}
            type="button"
            className={`hdr__burger${menuOpen ? ' hdr__burger--active' : ''}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="hdr__burger-line" />
            <span className="hdr__burger-line" />
            <span className="hdr__burger-line" />
          </button>
        </div>
      </div>

      <HeaderMenu
        open={menuOpen}
        onClose={closeMenu}
        reduced={reduced}
        triggerRef={burgerRef}
      />
    </header>
  );
}
