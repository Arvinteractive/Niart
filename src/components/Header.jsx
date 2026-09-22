import { useEffect, useRef, useState } from 'react';
import niartMark from '../assets/niart-mark.png';
import { navItems } from '../data/nav';
import { useHeaderScroll } from '../hooks/useHeaderScroll';
import { useMagnetic } from '../hooks/useMagnetic';
import { HeaderMenu } from './HeaderMenu';
import './Header.css';

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="M13.2 13.2 18 18" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path
        d="M4.5 7.2h11l-.9 10.3a1 1 0 0 1-1 .9H6.4a1 1 0 0 1-1-.9z"
        strokeLinejoin="round"
      />
      <path d="M7.4 7.2V5.6a2.6 2.6 0 0 1 5.2 0v1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Header({ reduced }) {
  const scrolled = useHeaderScroll();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const burgerRef = useRef(null);
  const bagRef = useMagnetic(reduced);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

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
            {/* The city joins the masthead line, and the founding year stays:
                "Coimbatore · Est. 2008" is both the local signal every page
                needs and the trust signal the line already carried. */}
            <span className="hdr__est">Coimbatore · Est. 2008</span>
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
          <div className={`hdr__search${searchOpen ? ' hdr__search--open' : ''}`}>
            <form
              className="hdr__search-form"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setSearchOpen(false);
              }}
            >
              <input
                ref={searchInputRef}
                className="hdr__search-input"
                type="search"
                name="q"
                placeholder="Search the collection"
                aria-label="Search the collection"
                tabIndex={searchOpen ? 0 : -1}
              />
            </form>
            <button
              type="button"
              className="hdr__icon-btn hdr__icon-btn--search"
              aria-label={searchOpen ? 'Close search' : 'Search'}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <SearchIcon />
            </button>
          </div>

          <a
            ref={bagRef}
            className="hdr__icon-btn hdr__icon-btn--bag"
            data-mag
            href="#signature"
            aria-label="Your collection, 0 saved pieces"
          >
            <BagIcon />
            <span className="hdr__bag-count">0</span>
          </a>

          <button
            ref={burgerRef}
            type="button"
            className={`hdr__burger${menuOpen ? ' hdr__burger--active' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
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
        onClose={() => setMenuOpen(false)}
        reduced={reduced}
        triggerRef={burgerRef}
      />
    </header>
  );
}
