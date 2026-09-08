import { bg } from '../assets/images';
import { floorPieces } from '../data/pieces';
import './FloorPieces.css';

/** Turns a piece's placement + parallax data into style vars and data attributes. */
function pieceProps({ position, motion, ratio, swatch, image }) {
  return {
    style: {
      '--x': position.left,
      '--y': position.top,
      '--w': position.width,
      '--z': position.zIndex,
      '--ratio': ratio,
      '--swatch': swatch,
    },
    'data-par': motion.par,
    'data-scale': motion.scale,
    'data-bg': bg(image),
  };
}

export function FloorPieces() {
  return (
    <section id="floor" className="floor" aria-labelledby="floor-title">
      <div className="shell">
        <div className="floor__head" data-r>
          <h2 id="floor-title" className="floor__title">
            The pieces on the floor this month
          </h2>
          <p className="floor__note">
            Four in progress, photographed where they hang. Hover a piece to read its
            file.
          </p>
        </div>

        <div className="stage floor__stage" data-stage>
          <span
            className="stage__bigword floor__bigword"
            data-parx="150"
            aria-hidden="true"
            style={{ '--x': '-4%', '--y': '5%' }}
          >
            ZARDOZI
          </span>

          {floorPieces.map((piece) => (
            <article
              key={piece.id}
              className={`stage__item${piece.wide ? ' stage__item--wide' : ''}`}
              data-item
              {...pieceProps(piece)}
            >
              <a
                className="stage__frame"
                data-zoom
                href="#signature"
                aria-label={piece.linkLabel}
              >
                <span
                  className="zi stage__image"
                  role="img"
                  aria-label={piece.imageAlt}
                />
                <span className="glow stage__glow" aria-hidden="true">
                  <span className="band stage__band" />
                </span>
              </a>

              {piece.featured ? (
                <div className="floor__caption">
                  <div>
                    <h3 className="floor__piece-title floor__piece-title--featured">
                      {piece.title}
                    </h3>
                    <p className="meta floor__meta floor__meta--featured">
                      {piece.meta}
                    </p>
                  </div>
                  <span className="floor__index">{piece.index}</span>
                </div>
              ) : (
                <>
                  <h3 className="floor__piece-title">{piece.title}</h3>
                  <p className="meta floor__meta">{piece.meta}</p>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
