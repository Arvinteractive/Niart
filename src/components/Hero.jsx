import { bg } from '../assets/images';
import { heroImage } from '../data/pieces';
import { usePointerThread } from '../hooks/usePointerThread';
import { useMagnetic } from '../hooks/useMagnetic';
import './Hero.css';

export function Hero({ heroRef, threadRef, reduced }) {
  usePointerThread(heroRef, threadRef, reduced);
  const ctaRef = useMagnetic(reduced);

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__weave" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <svg
        ref={threadRef}
        className="hero__thread"
        data-thread
        aria-hidden="true"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
      >
        <path
          data-draw
          pathLength="1"
          d="M0 88 C 240 88 320 34 540 52 C 780 72 900 112 1130 68 C 1300 34 1380 62 1440 54"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.1"
          opacity=".85"
        />
        <circle data-node cx="540" cy="52" r="2.6" fill="var(--gold)" />
        <circle data-node cx="1130" cy="68" r="2.6" fill="var(--gold)" />
      </svg>

      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow" data-r>
            <span className="hero__rule" />
            Zardozi · Piece No. 01
          </p>

          <h1 id="hero-title" className="hero__title" data-lines>
            <span className="ln">
              <span style={{ transitionDelay: '.25s' }}>Stitched</span>
            </span>
            <span className="ln">
              <span className="hero__title-accent" style={{ transitionDelay: '.36s' }}>
                into
              </span>
            </span>
            <span className="ln">
              <span style={{ transitionDelay: '.47s' }}>existence.</span>
            </span>
          </h1>

          <p className="hero__lede" data-r>
            Six hundred hours on the adda frame. Gold metal thread couched onto raw
            Kanchipuram silk, one knot at a time, by four hands that have done nothing
            else for eleven years.
          </p>

          <div className="hero__actions" data-r>
            <a ref={ctaRef} className="hero__cta" data-mag data-arrow href="#signature">
              See the piece{' '}
              <span className="ar" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a className="hero__link" data-underline href="#craft">
              How it is made
            </a>
          </div>
        </div>

        <figure className="hero__figure" data-mask data-zoom data-r>
          <span className="mi hero__mask">
            <span
              className="zi hero__image"
              role="img"
              aria-label={heroImage.alt}
              style={{ '--image': bg(heroImage.src) }}
            />
          </span>
          <figcaption className="hero__caption">
            Anaikatti bridal lehenga — 620 hrs on the adda frame
          </figcaption>
        </figure>
      </div>

      <p className="hero__scroll" data-r aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}
