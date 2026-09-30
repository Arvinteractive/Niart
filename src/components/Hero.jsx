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
            Zardozi &amp; Aari · Coimbatore
          </p>

          <h1 id="hero-title" className="hero__title" data-lines>
            {/* The wordmark and the trade, read aloud before the display line
                and indexed with it. A screen reader landing on "Stitched into
                existence." alone has no idea whose studio this is or what it
                makes; neither does a crawler. Same sentence the <title> and
                the noscript block carry, so nothing here is hidden that the
                page does not also say in plain sight. */}
            <span className="visually-hidden">
              NIART Designer Studio — hand embroidery in Coimbatore.{' '}
            </span>
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
            Bridal wear and custom outfits from Coimbatore. Explore aari and
            zardozi embroidery, with fabric, detail and fit planned around your occasion.
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
            <img
              className="zi hero__image"
              src={heroImage.src}
              alt={heroImage.alt}
              width="1122"
              height="1402"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </span>
          <figcaption className="hero__caption">
            Bridal design study · AI-generated illustration
          </figcaption>
        </figure>
      </div>

      <p className="hero__scroll" data-r aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}
