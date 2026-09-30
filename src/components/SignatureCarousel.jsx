import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { bg } from '../assets/images';
import { enquiryHref } from '../data/contact';
import { signaturePieces } from '../data/pieces';
import { useMagnetic } from '../hooks/useMagnetic';
import './SignatureCarousel.css';

const COUNT = signaturePieces.length;
const WHEEL_LOCK_MS = 700;
const WHEEL_THRESHOLD = 24;
const DRAG_THRESHOLD = 60;
const DRAG_FOLLOW = 0.22;

const pad = (n) => String(n).padStart(2, '0');

function SlideCta({ reduced, piece }) {
  const ref = useMagnetic(reduced);
  const href = enquiryHref({
    subject: `Enquiry — ${piece.title}`,
    body: `Hi NIART, I'd like to know more about the ${piece.title}.`,
  });
  return (
    <a ref={ref} className="cl carousel__cta" data-mag data-arrow href={href}>
      Enquire{' '}
      <span className="ar" aria-hidden="true">
        &rarr;
      </span>
    </a>
  );
}

export function SignatureCarousel({ carRef, showPrices = false, reduced = false }) {
  const [{ index, dir }, setSlide] = useState({ index: 0, dir: 1 });
  const [dragging, setDragging] = useState(false);

  const slideRefs = useRef([]);
  const indexRef = useRef(0);
  const prevIndexRef = useRef(0);

  const go = useCallback((next, direction) => {
    if (next === indexRef.current) return;
    indexRef.current = next;
    setSlide({ index: next, dir: direction });
  }, []);

  const step = useCallback(
    (delta) => go((indexRef.current + delta + COUNT) % COUNT, delta),
    [go],
  );

  /* The incoming slide is wiped in from the side it travelled from. This has to
     be imperative: the element needs its start position painted with transitions
     off, a forced reflow, and only then the transition to rest. */
  useLayoutEffect(() => {
    const prev = prevIndexRef.current;
    prevIndexRef.current = index;
    if (prev === index) return;

    const d = dir >= 0 ? 1 : -1;

    const incoming = slideRefs.current[index];
    if (incoming) {
      const img = incoming.querySelector('.simg');
      const copy = incoming.querySelector('.scopy');

      incoming.style.zIndex = '2';
      incoming.style.pointerEvents = 'auto';

      if (img) {
        img.style.transition = 'none';
        img.style.clipPath = d > 0 ? 'inset(0 0 0 101%)' : 'inset(0 101% 0 0)';
        img.style.transform = 'scale(1.05)';
        img.style.filter = 'blur(6px)';
      }
      if (copy) {
        copy.style.transition = 'none';
        copy.style.transform = `translate3d(${d > 0 ? 40 : -40}px,0,0)`;
      }

      // Flush the start state before turning transitions back on.
      void incoming.offsetWidth;

      incoming.style.opacity = '1';
      incoming.classList.add('live');

      if (img) {
        img.style.transition =
          'clip-path .85s var(--ease),transform .95s var(--ease),filter .7s ease-out';
        img.style.clipPath = 'inset(0 0 0 0)';
        img.style.transform = '';
        img.style.filter = '';
      }
      if (copy) {
        copy.style.transition = 'transform .8s var(--ease)';
        copy.style.transform = '';
      }
    }

    const outgoing = slideRefs.current[prev];
    if (outgoing) {
      const img = outgoing.querySelector('.simg');
      const copy = outgoing.querySelector('.scopy');

      outgoing.classList.remove('live');
      outgoing.style.zIndex = '1';
      outgoing.style.pointerEvents = 'none';
      outgoing.style.opacity = '0';

      if (img) {
        img.style.transition = 'transform .8s var(--ease),filter .6s ease-out';
        img.style.transform = 'scale(1.07)';
        img.style.filter = 'blur(7px)';
      }
      if (copy) {
        copy.style.transition = 'transform .7s var(--ease)';
        copy.style.transform = `translate3d(${d > 0 ? -40 : 40}px,0,0)`;
      }
    }
  }, [index, dir]);

  // Keyboard, horizontal wheel, and pointer drag.
  useEffect(() => {
    const car = carRef.current;
    if (!car) return undefined;

    let wheelLock = 0;
    let dragStart = null;

    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      }
    };

    const onWheel = (e) => {
      // Only respond to a deliberate sideways gesture, never to page scrolling.
      if (Math.abs(e.deltaX) < WHEEL_THRESHOLD) return;
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      const now = Date.now();
      if (now - wheelLock < WHEEL_LOCK_MS) return;
      wheelLock = now;
      step(e.deltaX > 0 ? 1 : -1);
    };

    const currentImage = () =>
      slideRefs.current[indexRef.current]?.querySelector('.simg');

    const onDown = (e) => {
      if (e.target.closest('a,button')) return;
      dragStart = e.clientX;
      setDragging(true);
    };

    const onMove = (e) => {
      if (dragStart === null) return;
      const img = currentImage();
      if (img) {
        const dx = (e.clientX - dragStart) * DRAG_FOLLOW;
        img.style.transform = `translate3d(${dx.toFixed(1)}px,0,0)`;
      }
    };

    const onUp = (e) => {
      if (dragStart === null) return;
      const dx = e.clientX - dragStart;
      const img = currentImage();
      dragStart = null;
      setDragging(false);

      if (Math.abs(dx) > DRAG_THRESHOLD) {
        step(dx < 0 ? 1 : -1);
      } else if (img) {
        img.style.transition = 'transform .5s var(--ease)';
        img.style.transform = '';
      }
    };

    car.addEventListener('keydown', onKey);
    car.addEventListener('wheel', onWheel, { passive: true });
    car.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      car.removeEventListener('keydown', onKey);
      car.removeEventListener('wheel', onWheel);
      car.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [carRef, step]);

  return (
    <section
      id="signature"
      ref={carRef}
      className={`carousel${dragging ? ' carousel--dragging' : ''}`}
      style={{ background: signaturePieces[index].background }}
      aria-labelledby="signature-title"
      aria-roledescription="carousel"
      role="region"
      tabIndex={0}
    >
      <h2 id="signature-title" className="visually-hidden">
        Signature pieces
      </h2>

      <div className="carousel__deck">
        {signaturePieces.map((piece, i) => (
          <article
            key={piece.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className={`carousel__slide${i === 0 ? ' carousel__slide--initial live' : ''}`}
            data-slide
            aria-hidden={i !== index}
            inert={i !== index}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${COUNT}`}
          >
            <div className="carousel__grid">
              <div className="scopy carousel__copy">
                <p className="cl carousel__index" aria-hidden="true">
                  {piece.index}
                </p>
                <h3 className="cl carousel__title">{piece.title}</h3>

                <dl className="cl carousel__spec">
                  <dt>Design study</dt>
                  <dd>{piece.collection}</dd>
                  <dt>Material inspiration</dt>
                  <dd>{piece.material}</dd>
                  {showPrices && piece.price && (
                    <>
                      <dt>From</dt>
                      <dd>{piece.price}</dd>
                    </>
                  )}
                </dl>

                <SlideCta reduced={reduced} piece={piece} />
                <p className="cl carousel__illustration">AI-generated design illustration. Ask us about materials and availability.</p>
              </div>

              <figure
                className="simg carousel__figure"
                style={{ '--swatch': piece.swatch }}
                data-bg={bg(piece.image)}
              >
                <span
                  className="carousel__image"
                  role="img"
                  aria-label={piece.imageAlt}
                />
              </figure>
            </div>
          </article>
        ))}
      </div>

      <div className="carousel__rail">
        <div className="carousel__rail-group">
          <span className="carousel__brand" aria-hidden="true">
            NIART SIGNATURE
          </span>
          <span className="carousel__track" aria-hidden="true">
            <span
              className="carousel__progress"
              style={{ transform: `scaleX(${((index + 1) / COUNT).toFixed(3)})` }}
            />
          </span>
          <span className="carousel__counter" role="status">
            {pad(index + 1)} / {pad(COUNT)}
          </span>
        </div>

        <div className="carousel__rail-group">
        <div className="carousel__nav">
          <button
            className="carousel__arrow"
            type="button"
            onClick={() => step(-1)}
            aria-label={`Previous piece — ${signaturePieces[(index - 1 + COUNT) % COUNT].title}`}
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            className="carousel__arrow"
            type="button"
            onClick={() => step(1)}
            aria-label={`Next piece — ${signaturePieces[(index + 1) % COUNT].title}`}
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="carousel__dots">
          {signaturePieces.map((piece, i) => (
            <button
              key={piece.id}
              className="carousel__dot"
              type="button"
              aria-current={i === index}
              aria-label={`Show piece ${i + 1}, ${piece.title}`}
              onClick={() => go(i, i > indexRef.current ? 1 : -1)}
            >
              {piece.index}
            </button>
          ))}
          <span className="carousel__hint" aria-hidden="true">
            Drag, arrows or keys
          </span>
        </div>
        </div>
      </div>
    </section>
  );
}
