/**
 * Primary navigation. Every item points at a real section already in the
 * page — there is no separate "about" route yet, so About borrows the
 * floor (the closest thing this single-page studio has to a behind-the-
 * scenes view).
 *
 * The order is the page's own order, top to bottom: floor, craft, services,
 * signature, collection. The numbering counts down the document with it, so
 * 01 is the first thing below the hero rather than the last.
 *
 * Services is labelled for search as much as for the visitor: "Services" is
 * what someone looking for aari work or saree pre-pleating scans a menu for,
 * and it is the anchor every internal link about commissions points at.
 */
export const navItems = [
  { label: 'About', href: '#floor', index: '01' },
  { label: 'Craft', href: '#craft', index: '02' },
  { label: 'Services', href: '#services', index: '03' },
  { label: 'Embroidery', href: '#signature', index: '04' },
  { label: 'Collections', href: '#collection', index: '05' },
];
