import { bg } from '../assets/images';
import { wallPieces } from '../data/pieces';
import { useMagnetic } from '../hooks/useMagnetic';
import './CollectionWall.css';

export function CollectionWall({
  wallRef,
  wallThreadRef,
  finalRef,
  finalHeadRef,
  finalCtaRef,
  reduced,
}) {
  const ctaRef = useMagnetic(reduced);

  return (
    <section id="collection" ref={wallRef} className="wall" aria-labelledby="wall-title">
      <div className="shell wall__head">
        <h2 id="wall-title" className="wall__title" data-r>
          Every piece in the collection, as it hangs in the studio
        </h2>
      </div>

      <div className="stage shell wall__stage" data-stage>
        <span
          className="stage__bigword wall__bigword"
          data-parx="-180"
          aria-hidden="true"
          style={{ '--x': '0', '--y': '34%' }}
        >
          COLLECTION · NIART · COLLECTION
        </span>

        {wallPieces.map((piece) => (
          <figure
            key={piece.id}
            className={`stage__item${piece.wide ? ' stage__item--wide' : ''}`}
            data-item
            data-par={piece.motion.par}
            data-ox={piece.motion.ox}
            data-oy={piece.motion.oy}
            data-bg={bg(piece.image)}
            style={{
              '--x': piece.position.left,
              '--y': piece.position.top,
              '--w': piece.position.width,
              '--z': piece.position.zIndex,
              '--ratio': piece.ratio,
              '--swatch': piece.swatch,
            }}
          >
            <span className="stage__frame" data-zoom>
              <span
                className="zi stage__image"
                role="img"
                aria-label={piece.imageAlt}
              />
            </span>
            <figcaption className="meta wall__caption">{piece.caption}</figcaption>
          </figure>
        ))}

        <svg
          ref={wallThreadRef}
          className="wall__thread"
          data-thread
          aria-hidden="true"
          viewBox="0 0 1000 1400"
          preserveAspectRatio="none"
        >
          <path
            data-draw
            pathLength="1"
            d="M180 240 C 420 300 520 180 760 420 C 900 560 520 700 380 900 C 280 1040 640 1100 820 1240"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            opacity=".5"
          />
        </svg>
      </div>

      <div ref={finalRef} className="wall__final">
        <span className="wall__stitch" data-r aria-hidden="true" />

        <p ref={finalHeadRef} className="wall__final-title" data-lines>
          <span className="ln">
            <span>Wear the</span>
          </span>
          <span className="ln">
            <span className="wall__final-accent">detail.</span>
          </span>
        </p>

        <div ref={finalCtaRef} className="wall__final-actions" data-r>
          <a ref={ctaRef} className="wall__cta" data-mag data-arrow href="#floor">
            Explore the collection{' '}
            <span className="ar" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
