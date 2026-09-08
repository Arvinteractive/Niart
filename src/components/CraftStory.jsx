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
              A zardozi knot is 1.2mm across. There are roughly forty thousand of them
              on a Niart bridal hem, and every one is pulled to the same tension by
              hand.
            </p>
            <p>
              Machines can copy the pattern. They cannot copy the tension, and that is
              what you see from across a room.
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
