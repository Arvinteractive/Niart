import { bg } from '../assets/images';
import { craftImage, craftLabels } from '../data/pieces';
import './CraftStory.css';

export function CraftStory({
  craftRef,
  craftImgRef,
  craftEyebrowRef,
  craftHeadRef,
  craftCopyRef,
}) {
  return (
    <section id="craft" ref={craftRef} className="craft" aria-labelledby="craft-title">
      <div className="craft__stage">
        <span
          ref={craftImgRef}
          className="craft__image"
          role="img"
          aria-label={craftImage.alt}
          data-bg={bg(craftImage.src)}
        />
        <span className="craft__scrim" aria-hidden="true" />

        <div className="craft__labels" aria-hidden="true">
          {craftLabels.map((label) => (
            <span
              key={label.id}
              className="craft__label"
              data-lab
              data-at={label.at}
              style={{
                '--x': label.left,
                '--y': label.top,
                '--tick': `${label.tick}px`,
              }}
            >
              <span className="tick craft__tick" />
              <span>{label.text}</span>
            </span>
          ))}
        </div>

        <div className="shell craft__content">
          <p ref={craftEyebrowRef} className="eyebrow craft__eyebrow" data-lab>
            The detail file
          </p>

          <h2 id="craft-title" ref={craftHeadRef} className="craft__title" data-lines>
            <span className="ln">
              <span>Detail is</span>
            </span>
            <span className="ln">
              <span style={{ transitionDelay: '.1s', fontStyle: 'italic' }}>
                the design.
              </span>
            </span>
          </h2>

          <div ref={craftCopyRef} className="craft__copy" data-lab>
            <p>
              The character of embroidery comes from the thread, the stitch and
              the fabric together. Aari, zardozi and kamdani bring different textures
              to a design; the studio can help you choose the detail for your piece.
            </p>
            <p>
              Detail shown here is an AI-generated illustration of embroidery,
              rather than a photograph of a completed studio commission.
            </p>
          </div>
        </div>
      </div>

      <div className="shell craft__list">
        {craftLabels.map((label) => (
          <span key={label.id}>{label.text}</span>
        ))}
      </div>
    </section>
  );
}
