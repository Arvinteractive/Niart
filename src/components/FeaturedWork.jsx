import { useEffect, useRef, useState } from 'react';
import { enquiryHref } from '../data/contact';
import { rotationViews as studioViews } from '../data/featuredRotation';
import './FeaturedWork.css';

const pad = (value) => String(value).padStart(2, '0');
const clamp = (value) => Math.min(100, Math.max(0, value));

function InspectIcon({ minus = false }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6M7 10h6" />{!minus && <path d="M10 7v6" />}</svg>;
}

export function FeaturedWork() {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const stageRef = useRef(null);
  const pointerRef = useRef(null);
  const dialogRef = useRef(null);
  const expandRef = useRef(null);
  const inspectRef = useRef(null);
  const view = studioViews[index];

  useEffect(() => {
    if (zoomed) inspectRef.current?.focus({ preventScroll: true });
  }, [zoomed]);

  // Warm the other views only as this section approaches the viewport.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      studioViews.forEach(({ src }) => { const photo = new Image(); photo.src = src; });
      observer.disconnect();
    }, { rootMargin: '200px' });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enlarged) return undefined;
    const dialog = dialogRef.current;
    const trigger = expandRef.current;
    const page = document.documentElement;
    const body = document.body;
    const previous = { page: page.style.overflow, body: body.style.overflow };
    page.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      page.style.overflow = previous.page;
      body.style.overflow = previous.body;
      trigger?.focus({ preventScroll: true });
    };
  }, [enlarged]);

  function resetInspection() {
    setZoomed(false);
    stageRef.current?.style.setProperty('--inspect-origin', '50% 50%');
  }

  function selectView(next) {
    setIndex(next);
    resetInspection();
  }

  function step(delta) {
    setIndex((current) => Math.min(studioViews.length - 1, Math.max(0, current + delta)));
    resetInspection();
  }

  function handleKey(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.type === 'range') return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      selectView(event.key === 'Home' ? 0 : studioViews.length - 1);
    } else if (event.key === 'Escape' && zoomed && !enlarged) {
      event.preventDefault();
      resetInspection();
    }
  }

  function panInspection(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / bounds.width * 100);
    const y = clamp((event.clientY - bounds.top) / bounds.height * 100);
    event.currentTarget.style.setProperty('--inspect-origin', `${x}% ${y}%`);
  }

  const enquiry = enquiryHref({ subject: 'Enquiry — Turquoise in bloom', body: 'Hi NIART, I would love to discuss a blouse inspired by Turquoise in bloom.' });

  return (
    <section id="featured-work" className="featured" aria-labelledby="featured-title">
      <div className="shell">
        <header className="featured__heading">
          <h2 id="featured-title">Featured <em>work.</em></h2>
        </header>
        <div className="featured__layout">
        <div className="featured__gallery" onKeyDown={handleKey}>
          <figure>
            <div className="featured__canvas">
              <div
                ref={stageRef}
                tabIndex={0}
                role="group"
                aria-label="Rotate the blouse through 180 degrees. Drag horizontally or use the left and right arrow keys."
                className={`featured__stage${zoomed ? ' featured__stage--inspect' : ''}${dragging ? ' featured__stage--dragging' : ''}`}
                onPointerDown={(event) => {
                  if (!event.isPrimary || event.button !== 0 || event.target.closest('button')) return;
                  pointerRef.current = { x: event.clientX, y: event.clientY, index, span: event.currentTarget.clientWidth * .8 };
                  event.currentTarget.setPointerCapture(event.pointerId);
                  if (zoomed) panInspection(event);
                  else setDragging(true);
                }}
                onPointerMove={(event) => {
                  if (!pointerRef.current && event.target.closest('button')) return;
                  if (zoomed && (event.pointerType === 'mouse' || pointerRef.current)) { panInspection(event); return; }
                  const start = pointerRef.current;
                  if (!start || Math.abs(event.clientY - start.y) > Math.abs(event.clientX - start.x)) return;
                  const next = start.index + Math.round((event.clientX - start.x) / start.span * (studioViews.length - 1));
                  setIndex(Math.min(studioViews.length - 1, Math.max(0, next)));
                }}
                onPointerUp={() => { pointerRef.current = null; setDragging(false); }}
                onPointerCancel={() => { pointerRef.current = null; setDragging(false); }}
                onLostPointerCapture={() => { pointerRef.current = null; setDragging(false); }}
              >
                {studioViews.map((frame, frameIndex) => <img key={frame.id} className={`featured__image${frameIndex === index ? ' featured__image--active' : ''}`} src={frame.src} alt={frameIndex === index ? frame.alt : ''} aria-hidden={frameIndex !== index} width="1448" height="1086" loading="lazy" decoding="async" draggable="false" />)}
                <div className="featured__stage-tools">
                  <button ref={inspectRef} type="button" aria-pressed={zoomed} onClick={() => { if (zoomed) resetInspection(); else { stageRef.current.style.setProperty('--inspect-origin', '50% 50%'); setZoomed(true); } }}>
                    <InspectIcon minus={zoomed} /><span>{zoomed ? 'Full view' : 'Inspect the craft'}</span>
                  </button>
                  <button ref={expandRef} type="button" onClick={() => setEnlarged(true)} aria-label="Open full-screen gallery" aria-haspopup="dialog">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg>
                  </button>
                </div>
                <span className="featured__gesture" aria-hidden="true">{zoomed ? 'Move across the fabric to explore' : '←  Drag to rotate · 180°  →'}</span>
              </div>
            </div>
            <figcaption className="featured__caption">
              <span role="status" className="featured__counter">{pad(index + 1)} <span>/ {pad(studioViews.length)}</span><span className="featured__caption-title">{view.label}</span></span>
              <div className="featured__arrows"><button type="button" disabled={index === 0} onClick={() => step(-1)} aria-label="Previous view">←</button><button type="button" disabled={index === studioViews.length - 1} onClick={() => step(1)} aria-label="Next view">→</button></div>
            </figcaption>
          </figure>

          <div className="featured__explorer">
            <div className="featured__views" role="group" aria-label="Choose a view" style={{ '--rotation-frames': studioViews.length }}>
              {studioViews.map((item, itemIndex) => <button key={item.id} type="button" className="featured__view" aria-pressed={itemIndex === index} aria-label={`Show ${item.label.toLowerCase()}`} onClick={() => selectView(itemIndex)}>
                <img src={item.src.replace('.webp', '-thumb.webp')} alt="" width="180" height="135" loading="lazy" decoding="async" />
                <span>{item.label}</span>
              </button>)}
            </div>
          </div>
        </div>

        <div className="featured__story">
          <h3>Turquoise<br /><em>in bloom.</em></h3>
          <a href={enquiry} className="featured__enquire">Enquire about a custom piece <span aria-hidden="true">→</span></a>
        </div>
        </div>
      </div>

      <dialog ref={dialogRef} className="featured__dialog" aria-labelledby="featured-viewer-title" onCancel={(event) => { event.preventDefault(); setEnlarged(false); }} onKeyDown={handleKey} onClick={(event) => { if (event.target === event.currentTarget) setEnlarged(false); }}>
        {enlarged && <div className="featured__viewer">
          <div className="featured__viewer-bar"><p id="featured-viewer-title">Turquoise in bloom <span>/ {view.label}</span></p><button type="button" onClick={() => setEnlarged(false)} aria-label="Close full-screen gallery" autoFocus>Close <span aria-hidden="true">×</span></button></div>
          <img src={view.src} alt={view.alt} width="1448" height="1086" />
          <div className="featured__viewer-bar"><p role="status">{pad(index + 1)} / {pad(studioViews.length)} · {view.label}</p><div className="featured__arrows"><button type="button" disabled={index === 0} onClick={() => step(-1)} aria-label="Previous enlarged view">←</button><button type="button" disabled={index === studioViews.length - 1} onClick={() => step(1)} aria-label="Next enlarged view">→</button></div></div>
        </div>}
      </dialog>
    </section>
  );
}
