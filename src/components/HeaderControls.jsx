import niartMark from '../assets/niart-mark.png';

export function HeaderBrand({ revealed = false }) {
  return (
    <a
      className={`hdr__brand${revealed ? ' in' : ''}`}
      data-r={revealed ? undefined : true}
      href="/"
      aria-label="NIART Designer Studio, Coimbatore — home"
    >
      <img className="hdr__mark" src={niartMark} alt="" width="256" height="256" />
      <span className="hdr__brand-text">
        <span className="hdr__word">NIART</span>
        <span className="hdr__est">Coimbatore</span>
      </span>
    </a>
  );
}

export function MenuToggle({ buttonRef, active, expanded, onClick }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`hdr__burger${active ? ' hdr__burger--active' : ''}`}
      aria-label={expanded ? 'Close menu' : 'Open menu'}
      aria-expanded={expanded}
      aria-controls="site-menu"
      onClick={onClick}
    >
      <span className="hdr__burger-line" />
      <span className="hdr__burger-line" />
      <span className="hdr__burger-line" />
    </button>
  );
}
