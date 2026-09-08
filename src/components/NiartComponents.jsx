import { useEffect, useRef } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { FloorPieces } from './FloorPieces';
import { CraftStory } from './CraftStory';
import { SignatureCarousel } from './SignatureCarousel';
import { CollectionWall } from './CollectionWall';
import { Footer } from './Footer';
import { useReveal } from '../hooks/useReveal';
import { useScrollMotion } from '../hooks/useScrollMotion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * The NIART component set.
 *
 * Props mirror the three controls the design exposed:
 *   showPrices — show the "From" row on signature pieces
 *   parallax   — scroll-linked drift (ignored when the user prefers reduced motion)
 *   accent     — overrides the --gold token
 */
export function NiartComponents({
  showPrices = true,
  parallax = true,
  accent = '#B08D57',
}) {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const threadRef = useRef(null);
  const craftRef = useRef(null);
  const craftImgRef = useRef(null);
  const craftEyebrowRef = useRef(null);
  const craftHeadRef = useRef(null);
  const craftCopyRef = useRef(null);
  const carRef = useRef(null);
  const wallRef = useRef(null);
  const wallThreadRef = useRef(null);
  const finalRef = useRef(null);
  const finalHeadRef = useRef(null);
  const finalCtaRef = useRef(null);

  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!accent) return;
    document.documentElement.style.setProperty('--gold', accent);
  }, [accent]);

  useReveal(rootRef);

  useScrollMotion({
    rootRef,
    craftRef,
    craftImgRef,
    craftEyebrowRef,
    craftHeadRef,
    craftCopyRef,
    wallRef,
    parallax,
    reduced,
  });

  return (
    <div ref={rootRef} style={{ background: 'var(--ivory)' }}>
      <Header reduced={reduced} />

      <main>
        <Hero heroRef={heroRef} threadRef={threadRef} reduced={reduced} />

        <FloorPieces />

        <CraftStory
          craftRef={craftRef}
          craftImgRef={craftImgRef}
          craftEyebrowRef={craftEyebrowRef}
          craftHeadRef={craftHeadRef}
          craftCopyRef={craftCopyRef}
        />

        <SignatureCarousel
          carRef={carRef}
          showPrices={showPrices}
          reduced={reduced}
        />

        <CollectionWall
          wallRef={wallRef}
          wallThreadRef={wallThreadRef}
          finalRef={finalRef}
          finalHeadRef={finalHeadRef}
          finalCtaRef={finalCtaRef}
          reduced={reduced}
        />
      </main>

      <Footer reduced={reduced} />
    </div>
  );
}
