import { useEffect, useRef, useState } from 'react';
import niartMark from '../assets/niart-mark.png';
import { CONTACT, enquiryHref, localityLine } from '../data/contact';
import { navItems } from '../data/nav';
import './Footer.css';

const EMAIL = CONTACT.email;

/**
 * Only profiles that actually exist get rendered. A `href="#"` social link
 * costs twice over: the visitor clicks it and lands back on the same page,
 * and a crawler reads a dead outbound link where the site's strongest
 * off-site signal should be. Instagram is where the studio's work actually
 * lives, so it is the one link here — and the same URL is declared as
 * `sameAs` in the structured data in index.html.
 *
 * Add Pinterest or a Google Business Profile back the moment there is a real
 * URL for them; both are worth having, neither is worth faking.
 */
const socialLinks = [{ label: 'Instagram', href: CONTACT.instagram }].filter(
  (social) => social.href,
);

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
      <path d="M3 10.5V3.5A1 1 0 0 1 4 2.5h7" />
    </svg>
  );
}

export function Footer({ reduced }) {
  const [copyStatus, setCopyStatus] = useState('');
  const threadRef = useRef(null);
  const copyTimer = useRef(null);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus('Copied to clipboard');
    } catch {
      setCopyStatus('Unable to copy. Please select the email address.');
    }

    const thread = threadRef.current;
    if (thread && !reduced) {
      thread.classList.remove('ftr__thread--pulse');
      // Restart the animation even if it's still running from a rapid re-click.
      void thread.getBoundingClientRect();
      thread.classList.add('ftr__thread--pulse');
    }

    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyStatus(''), 4000);
  };

  return (
    <footer className="ftr">
      <svg
        ref={threadRef}
        className="ftr__thread"
        data-thread
        data-par="14"
        aria-hidden="true"
        viewBox="0 0 1000 2200"
        preserveAspectRatio="none"
      >
        <path
          data-draw
          pathLength="1"
          d="M110 90 C 480 190 200 470 580 640 C 900 780 300 990 520 1300 C 660 1500 340 1660 500 1900 C 590 2030 480 2110 500 2170"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity=".45"
        />
        <circle data-node cx="110" cy="90" r="2.4" fill="var(--gold)" />
        <circle data-node cx="500" cy="2170" r="2.4" fill="var(--gold)" />
      </svg>

      <div className="shell ftr__statement-wrap">
        <p className="ftr__statement" data-lines>
          <span className="ln">
            <span>Crafted in</span>
          </span>
          <span className="ln">
            <span className="ftr__accent">thread.</span>
          </span>
        </p>
        <p className="ftr__support" data-r>
          Designed to be remembered.
        </p>
      </div>

      <div className="shell ftr__grid">
        <nav className="ftr__col ftr__nav" data-r aria-label="Footer">
          <span className="eyebrow ftr__col-label">Navigate</span>
          <ul className="ftr__nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="ftr__navlink" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a className="ftr__navlink" href={enquiryHref({ subject: 'Enquiry from niart.in' })}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="ftr__col ftr__social" data-r>
          <span className="eyebrow ftr__col-label">Follow</span>
          <ul className="ftr__social-list">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  className="ftr__social-link"
                  href={social.href}
                  target="_blank"
                  rel="noopener me"
                >
                  {social.label}
                  <span className="ftr__social-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ftr__col ftr__contact" data-r>
          <span className="eyebrow ftr__col-label">Enquiries</span>
          <div className="ftr__email-row">
            <a className="ftr__email" href={enquiryHref({ subject: 'Enquiry from niart.in' })}>
              {EMAIL || 'Message on Instagram'}
            </a>
            {EMAIL && <button
              type="button"
              className="ftr__copy-btn"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
            >
              <CopyIcon />
            </button>}
          </div>
          <span className={`ftr__copy-hint${copyStatus ? ' ftr__copy-hint--visible' : ''}`} role="status">
            {copyStatus}
          </span>
          <address className="ftr__address">
            NIART Designer Studio
            <br />
            {localityLine}
          </address>
        </div>
      </div>

      <div className="ftr__finale">
        <img className="ftr__mark" data-r src={niartMark} alt="" width="256" height="256" />
        <p className="ftr__wordmark" data-r>NIART</p>
        <p className="ftr__tagline" data-r>
          Aari &amp; Zardozi Embroidery · Bridal &amp; Custom Costume Design · {CONTACT.locality}
        </p>
      </div>

      <div className="ftr__legal">
        <div className="ftr__legal-links" data-r>
          <a href="/privacy.html">Privacy</a>
          <span aria-hidden="true">·</span>
          <a href="/terms.html">Terms</a>
        </div>
        <p className="ftr__copyright" data-r>
          © {new Date().getFullYear()} NIART. Every piece worked by hand.
        </p>
      </div>
    </footer>
  );
}
