/**
 * Content for the NIART sections.
 *
 * Positions live here rather than in CSS because the scattered layouts are
 * per-piece compositions, not a repeating grid — each card is placed by hand
 * and drifts at its own parallax rate.
 *
 * `swatch` stays alongside `image`: it is the woven-linen gradient the photo
 * sits on, so an image that has not decoded yet reads as fabric, not as a hole.
 */
import {
  bridalLehengaZardozi,
  denimJacketGoldResham,
  embroideryDetailMacro,
  ivoryAtelierJacket,
  kidsWildflowerDress,
  navyPoloCrest,
  sageBotanicalSweatshirt,
} from '../assets/images';

/** The hero plate and the macro shot the craft section scrubs through. */
export const heroImage = {
  src: bridalLehengaZardozi,
  alt: 'Bridal lehenga spread open on a studio floor, gold zardozi worked across the skirt',
};

export const craftImage = {
  src: embroideryDetailMacro,
  alt: 'Macro photograph of gold and green threadwork on linen, individual stitches and seed pearls visible',
};

/** Pieces currently on the studio floor — the scattered hover stage. */
export const floorPieces = [
  {
    id: 'aadhi',
    title: 'Aadhi Atelier Jacket',
    meta: 'Hand-laid cord & bullion · 380 hrs · raw linen',
    index: '01',
    featured: true,
    linkLabel: 'Aadhi atelier jacket, in progress',
    image: ivoryAtelierJacket,
    imageAlt: 'Ivory linen jacket on a stand, abstract cord and bullion embroidery across the front and sleeves',
    swatch: 'var(--linen)',
    ratio: '3 / 4',
    wide: true,
    position: { left: '6%', top: '7%', width: '39%', zIndex: 3 },
    motion: { par: '-34', scale: '1' },
  },
  {
    id: 'poongodi',
    title: 'Poongodi Kids Dress',
    meta: 'Satin stitch & French knots · 74 hrs',
    linkLabel: 'Poongodi kids dress, in progress',
    image: kidsWildflowerDress,
    imageAlt: 'Cream linen child’s dress on a wooden bench, wildflowers and butterflies embroidered across the yoke and hem',
    swatch: 'var(--linen-rose)',
    ratio: '4 / 5',
    position: { left: '62%', top: '2%', width: '27%', zIndex: 2 },
    motion: { par: '52' },
  },
  {
    id: 'nilaa',
    title: 'Nilaa Denim Jacket',
    meta: 'Gold resham on selvedge · 96 hrs',
    linkLabel: 'Nilaa denim jacket, in progress',
    image: denimJacketGoldResham,
    imageAlt: 'Indigo denim jacket laid flat, a gold resham panel embroidered across the back',
    swatch: 'var(--linen-sage)',
    ratio: '16 / 11',
    wide: true,
    position: { left: '41%', top: '47%', width: '31%', zIndex: 4 },
    motion: { par: '-16' },
  },
  {
    id: 'ilai',
    title: 'Ilai Sweatshirt',
    meta: 'Botanical threadwork · 52 hrs',
    linkLabel: 'Ilai botanical sweatshirt, in progress',
    image: sageBotanicalSweatshirt,
    imageAlt: 'Sage cotton sweatshirt with ferns and wildflowers embroidered in a crescent below the collar',
    swatch: 'var(--linen)',
    ratio: '3 / 4',
    position: { left: '72%', top: '30%', width: '24%', zIndex: 2 },
    motion: { par: '76' },
  },
];

/** Callouts pinned over the macro shot, revealed as the craft section scrubs. */
export const craftLabels = [
  { id: 'thread', text: 'Thread', at: '.16', left: '12%', top: '26%', tick: 56 },
  { id: 'stitch', text: 'Stitch', at: '.26', left: '66%', top: '20%', tick: 44 },
  { id: 'pattern', text: 'Pattern', at: '.36', left: '20%', top: '62%', tick: 64 },
  { id: 'fabric', text: 'Fabric', at: '.46', left: '73%', top: '57%', tick: 40 },
  { id: 'technique', text: 'Technique', at: '.56', left: '47%', top: '12%', tick: 48 },
];

/** The signature carousel. */
export const signaturePieces = [
  {
    id: 'anaikatti',
    index: '01',
    title: 'Anaikatti Bridal Lehenga',
    collection: 'Niart Signature',
    material: 'Raw Kanchipuram silk · gold zardozi',
    price: '₹1,45,000',
    background: '#151210',
    image: bridalLehengaZardozi,
    swatch: 'var(--linen)',
    imageAlt: 'Deep red bridal lehenga spread open, gold zardozi worked across the skirt and dupatta',
  },
  {
    id: 'ivory-atelier',
    index: '02',
    title: 'Ivory Atelier Jacket',
    collection: 'Nilaa',
    material: 'Raw linen · hand-laid cord & bullion',
    price: '₹64,000',
    background: '#1B1614',
    image: ivoryAtelierJacket,
    swatch: 'var(--linen-sage)',
    imageAlt: 'Sculpted ivory linen jacket with abstract cord and bullion embroidery in indigo, gold and rust',
  },
  {
    id: 'resham-denim',
    index: '03',
    title: 'Gold Resham Denim Jacket',
    collection: 'Suriya',
    material: 'Selvedge denim · gold resham floss',
    price: '₹28,000',
    background: '#141712',
    image: denimJacketGoldResham,
    swatch: 'var(--linen-rose)',
    imageAlt: 'Indigo denim jacket with a symmetrical gold resham panel embroidered across the back',
  },
  {
    id: 'ilai-sweatshirt',
    index: '04',
    title: 'Ilai Botanical Sweatshirt',
    collection: 'Suriya',
    material: 'Brushed cotton · silk floss',
    price: '₹9,500',
    background: '#1C1615',
    image: sageBotanicalSweatshirt,
    swatch: 'var(--linen-sage)',
    imageAlt: 'Sage sweatshirt with ferns, lavender and daisies embroidered in a crescent across the chest',
  },
  {
    id: 'poongodi-dress',
    index: '05',
    title: 'Poongodi Wildflower Dress',
    collection: 'Niart Little',
    material: 'Washed linen · satin stitch & French knots',
    price: '₹7,200',
    background: '#171513',
    image: kidsWildflowerDress,
    swatch: 'var(--linen-rose)',
    imageAlt: 'Cream child’s dress embroidered with poppies, delphiniums and butterflies',
  },
];

/** The closing wall — pieces drift apart as the section scrolls out. */
export const wallPieces = [
  {
    id: 'wall-anaikatti',
    caption: 'Anaikatti · Bridal',
    image: bridalLehengaZardozi,
    imageAlt: 'Red and gold bridal lehenga spread open on a studio floor',
    swatch: 'var(--linen)',
    ratio: '3 / 4',
    wide: true,
    position: { left: '2%', top: '1%', width: '33%', zIndex: 3 },
    motion: { par: '-60', ox: '-70' },
  },
  {
    id: 'wall-poongodi',
    caption: 'Poongodi · Little',
    image: kidsWildflowerDress,
    imageAlt: 'Embroidered child’s dress laid out on a pale wooden bench',
    swatch: 'var(--linen-rose)',
    ratio: '4 / 5',
    position: { left: '56%', top: '6%', width: '26%', zIndex: 2 },
    motion: { par: '46', ox: '80' },
  },
  {
    id: 'wall-ilai',
    caption: 'Ilai · Everyday',
    image: sageBotanicalSweatshirt,
    imageAlt: 'Sage embroidered sweatshirt folded on linen by a window',
    swatch: 'var(--linen-sage)',
    ratio: '3 / 4',
    position: { left: '70%', top: '28%', width: '23%', zIndex: 4 },
    motion: { par: '-30', ox: '90', oy: '-40' },
  },
  {
    id: 'wall-detail',
    caption: 'Detail · Thread study',
    image: embroideryDetailMacro,
    imageAlt: 'Close crop of gold and green threadwork with seed pearls on linen',
    swatch: 'var(--linen)',
    ratio: '16 / 11',
    wide: true,
    position: { left: '14%', top: '40%', width: '30%', zIndex: 2 },
    motion: { par: '66', ox: '-90' },
  },
  {
    id: 'wall-vaanam',
    caption: 'Vaanam · Uniform',
    image: navyPoloCrest,
    imageAlt: 'Navy piqué polo with a tonal leaf crest embroidered at the chest',
    swatch: 'var(--linen-rose)',
    ratio: '4 / 5',
    position: { left: '50%', top: '57%', width: '22%', zIndex: 3 },
    motion: { par: '-52', ox: '60', oy: '30' },
  },
  {
    id: 'wall-nilaa',
    caption: 'Nilaa · Denim',
    image: denimJacketGoldResham,
    imageAlt: 'Indigo denim jacket with gold resham embroidery, laid flat on stone',
    swatch: 'var(--linen-sage)',
    ratio: '3 / 4',
    wide: true,
    position: { left: '4%', top: '61%', width: '28%', zIndex: 2 },
    motion: { par: '34', ox: '-60', oy: '20' },
  },
];
