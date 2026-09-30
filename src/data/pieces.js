/**
 * Content for the NIART sections.
 *
 * Positions live here rather than in CSS because the scattered layouts are
 * per-piece compositions, not a repeating grid — each card is placed by hand
 * and drifts at its own parallax rate.
 *
 * `swatch` stays alongside `image`: it is the woven-linen gradient the photo
 * sits on, so an image that has not decoded yet reads as fabric, not as a hole.
 *
 * `ratio` is the box the photo is cropped into (`center / cover`), so it tracks
 * the source frame: the portrait shots sit in 3/4 and 4/5, the landscape ones
 * in 16/11. `wide` only does anything below 900px, where the stage collapses to
 * a two-column grid and a wide piece spans both.
 *
 * The four floor pieces are placed so none of them touch: each column of the
 * stage carries one piece, and where two share a column (Poongodi above Nilaa)
 * the vertical gap is wider than the two pieces' parallax ranges added
 * together, so they cannot drift into each other at any scroll position.
 */
import {
  addaFrameWorkshop,
  blouseRailTrio,
  bridalBlouseEmeraldTemple,
  bridalBlouseMaroonZardozi,
  bridalLehengaEmerald,
  gownChampagneFloral,
  jacketBlackGoldPalazzo,
  kidsLehengaTealBanarasi,
  kidsWildflowerDress,
  sareeMagentaAtelierTable,
  sareeRedBanarasi,
  sherwaniIvoryGold,
  zardoziMacroNavy,
} from '../assets/images';

/** The hero plate and the macro shot the craft section scrubs through. */
export const heroImage = {
  src: bridalLehengaEmerald,
  alt: 'AI-generated illustration: Emerald green bridal lehenga on a studio dress form, gold zardozi worked across the skirt and a net dupatta falling from the shoulder',
};

export const craftImage = {
  src: zardoziMacroNavy,
  alt: 'AI-generated illustration: Close view of gold zardozi flowers couched onto deep navy silk, pearl clusters and maroon thread visible stitch by stitch',
};

/** Illustrative embroidery studies — the scattered hover stage. */
export const floorPieces = [
  {
    id: 'aadhi',
    title: 'Aadhi Bridal Blouse',
    meta: 'Zardozi & pearl drop fringe · silk',
    index: '01',
    featured: true,
    linkLabel: 'Aadhi bridal blouse, design illustration',
    image: bridalBlouseMaroonZardozi,
    imageAlt: 'AI-generated illustration: Maroon silk bridal blouse on a wooden hanger, dense gold floral zardozi and a pearl drop fringe along the hem',
    swatch: 'var(--linen-rose)',
    ratio: '3 / 4',
    wide: true,
    position: { left: '3%', top: '6%', width: '29%', zIndex: 3 },
    motion: { par: '-34', scale: '1' },
  },
  {
    id: 'poongodi',
    title: 'Poongodi Kids Dress',
    meta: 'Satin stitch & French knots',
    linkLabel: 'Poongodi kids dress, design illustration',
    image: kidsWildflowerDress,
    imageAlt: 'AI-generated illustration: Cream linen child’s dress on a hanger, wildflowers and butterflies embroidered across the yoke and hem',
    swatch: 'var(--linen-rose)',
    ratio: '4 / 5',
    position: { left: '38%', top: '0%', width: '21%', zIndex: 2 },
    motion: { par: '52' },
  },
  {
    id: 'nilaa',
    title: 'Nilaa Bridal Panel',
    meta: 'Gold resham on the adda frame',
    linkLabel: 'Nilaa bridal panel, design illustration',
    image: addaFrameWorkshop,
    imageAlt: 'AI-generated illustration: A maroon silk blouse panel stretched on a wooden adda frame, half embroidered in gold, thread spools and tools around it',
    swatch: 'var(--linen)',
    ratio: '16 / 11',
    wide: true,
    position: { left: '35%', top: '59%', width: '33%', zIndex: 4 },
    motion: { par: '-16' },
  },
  {
    id: 'ilai',
    title: 'Ilai Temple Blouse',
    meta: 'Temple-border zari & stonework',
    linkLabel: 'Ilai temple blouse, design illustration',
    image: bridalBlouseEmeraldTemple,
    imageAlt: 'AI-generated illustration: Emerald green silk blouse on a carved hanger, gold temple-border zari with lotus motifs across the front and sleeves',
    swatch: 'var(--linen-sage)',
    ratio: '3 / 4',
    position: { left: '70%', top: '10%', width: '25%', zIndex: 2 },
    motion: { par: '76' },
  },
];

/**
 * Callouts pinned over the macro shot, revealed as the craft section scrubs.
 *
 * The copy block sits roughly x 5-75%, y 29-73% of the stage, so these are
 * placed outside that box — above it, below it, or out on the right — rather
 * than scattered freely, which put `Thread` on the eyebrow and `Pattern`
 * through the body text.
 */
export const craftLabels = [
  { id: 'thread', text: 'Thread', at: '.16', left: '84%', top: '38%', tick: 56 },
  { id: 'stitch', text: 'Stitch', at: '.26', left: '66%', top: '20%', tick: 44 },
  { id: 'pattern', text: 'Pattern', at: '.36', left: '24%', top: '82%', tick: 64 },
  { id: 'fabric', text: 'Fabric', at: '.46', left: '73%', top: '57%', tick: 40 },
  { id: 'technique', text: 'Technique', at: '.56', left: '47%', top: '12%', tick: 48 },
];

/** The signature carousel. */
export const signaturePieces = [
  {
    id: 'anaikatti',
    index: '01',
    title: 'Anaikatti Bridal Saree',
    collection: 'Niart Signature',
    material: 'Pure Kanchipuram silk · gold zari border',
    background: '#151210',
    image: sareeRedBanarasi,
    swatch: 'var(--linen-rose)',
    imageAlt: 'AI-generated illustration: Deep red Kanchipuram silk saree draped over a carved wooden stand, a wide gold zari border running its full length',
  },
  {
    id: 'nilaa-gown',
    index: '02',
    title: 'Nilaa Champagne Gown',
    collection: 'Nilaa',
    material: 'Silk tulle · 3D floral appliqué & pearl',
    background: '#1B1614',
    image: gownChampagneFloral,
    swatch: 'var(--linen)',
    imageAlt: 'AI-generated illustration: Champagne gold ball gown on a dress form, layered tulle skirt covered in three-dimensional floral appliqué and pearl beading',
  },
  {
    id: 'aadhi-sherwani',
    index: '03',
    title: 'Aadhi Ivory Sherwani',
    collection: 'Niart Signature',
    material: 'Raw silk · gold dori & thread work',
    background: '#141712',
    image: sherwaniIvoryGold,
    swatch: 'var(--linen)',
    imageAlt: 'AI-generated illustration: Ivory raw silk sherwani on a wooden stand, gold thread work down the placket and around the hem, with a draped stole and dhoti',
  },
  {
    id: 'suriya-jacket',
    index: '04',
    title: 'Suriya Jacket Set',
    collection: 'Suriya',
    material: 'Wool crêpe · gold zardozi · crêpe palazzo',
    background: '#1C1615',
    image: jacketBlackGoldPalazzo,
    swatch: 'var(--linen-dark)',
    imageAlt: 'AI-generated illustration: Cropped black jacket with gold floral zardozi down the lapels and sleeves, worn over ivory wide-leg palazzo trousers',
  },
  {
    id: 'poongodi-lehenga',
    index: '05',
    title: 'Poongodi Little Lehenga',
    collection: 'Niart Little',
    material: 'Banarasi silk · zari border & hand knots',
    background: '#171513',
    image: kidsLehengaTealBanarasi,
    swatch: 'var(--linen-sage)',
    imageAlt: 'AI-generated illustration: Child’s teal Banarasi silk lehenga with a gold zari border, laid flat beside a blush embroidered blouse and jasmine flowers',
  },
];

/** The closing wall — pieces drift apart as the section scrolls out. */
export const wallPieces = [
  {
    id: 'wall-anaikatti',
    caption: 'Anaikatti · Bridal',
    image: bridalLehengaEmerald,
    imageAlt: 'AI-generated illustration: Emerald bridal lehenga on a dress form, dupatta spread across the studio floor',
    swatch: 'var(--linen-sage)',
    ratio: '3 / 4',
    wide: true,
    position: { left: '2%', top: '1%', width: '33%', zIndex: 3 },
    motion: { par: '-60', ox: '-70' },
  },
  {
    id: 'wall-poongodi',
    caption: 'Poongodi · Little',
    image: kidsLehengaTealBanarasi,
    imageAlt: 'AI-generated illustration: Child’s teal and gold Banarasi lehenga laid out on cream linen',
    swatch: 'var(--linen-sage)',
    ratio: '4 / 5',
    position: { left: '56%', top: '6%', width: '26%', zIndex: 2 },
    motion: { par: '46', ox: '80' },
  },
  {
    id: 'wall-ilai',
    caption: 'Ilai · Blouses',
    image: blouseRailTrio,
    imageAlt: 'AI-generated illustration: Three embroidered blouses hanging on a rail against a plaster wall — maroon, sage and gold',
    swatch: 'var(--linen-sage)',
    ratio: '16 / 11',
    wide: true,
    position: { left: '66%', top: '28%', width: '30%', zIndex: 4 },
    motion: { par: '-30', ox: '90', oy: '-40' },
  },
  {
    id: 'wall-detail',
    caption: 'Detail · Thread study',
    image: zardoziMacroNavy,
    imageAlt: 'AI-generated illustration: Close crop of gold zardozi and pearl clusters worked on navy silk',
    swatch: 'var(--linen)',
    ratio: '16 / 11',
    wide: true,
    position: { left: '14%', top: '40%', width: '30%', zIndex: 2 },
    motion: { par: '66', ox: '-90' },
  },
  {
    id: 'wall-vaanam',
    caption: 'Vaanam · Atelier',
    image: sareeMagentaAtelierTable,
    imageAlt: 'AI-generated illustration: Magenta Banarasi saree and its blouse folded open on the atelier cutting table beside shears and a tape measure',
    swatch: 'var(--linen-rose)',
    ratio: '16 / 11',
    wide: true,
    position: { left: '48%', top: '57%', width: '28%', zIndex: 3 },
    motion: { par: '-52', ox: '60', oy: '30' },
  },
  {
    id: 'wall-nilaa',
    caption: 'Nilaa · Saree',
    image: sareeRedBanarasi,
    imageAlt: 'AI-generated illustration: Red Kanchipuram silk saree draped over a carved stand, gold zari border catching the light',
    swatch: 'var(--linen-rose)',
    ratio: '3 / 4',
    position: { left: '4%', top: '61%', width: '28%', zIndex: 2 },
    motion: { par: '34', ox: '-60', oy: '20' },
  },
];
