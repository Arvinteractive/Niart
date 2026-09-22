/**
 * The studio's service list.
 *
 * This is the page's main search surface. Every query NIART needs to win —
 * "aari embroidery Coimbatore", "bridal blouse maggam work", "saree
 * pre-pleating near me" — is a service, not a collection piece, and before
 * this section the site never said any of them in body copy. The rest of the
 * page is atmosphere; this is the part that answers a search.
 *
 * The copy is written to read like the rest of the site (specific, spare, no
 * adjectives doing work a number could do) rather than as a keyword list. A
 * paragraph stuffed with "best embroidery in Coimbatore" ranks worse than one
 * that names the stitch, the frame and the hours, because the terms people
 * actually search alongside are the craft words — and those are here anyway.
 *
 * `term` is the plain-search phrasing of the same service, kept beside the
 * display title: the titles are the studio's own names for the work, and the
 * search phrasing shouldn't have to bend them.
 */
export const services = [
  {
    id: 'bridal',
    index: '01',
    title: 'Bespoke bridal wear',
    term: 'Bridal blouse, lehenga & saree embroidery',
    copy: 'Bridal blouses, lehengas and Kanchipuram silk sarees embroidered to your measurements. Design sitting, two fittings, and six hundred hours of hand-work between them.',
  },
  {
    id: 'aari',
    index: '02',
    title: 'Aari & maggam work',
    term: 'Aari embroidery and maggam work in Coimbatore',
    copy: 'The hook-and-chain stitch pulled on the adda frame — what gives a bridal blouse its density. Worked by the same four hands that have done nothing else for eleven years.',
  },
  {
    id: 'zardozi',
    index: '03',
    title: 'Zardozi & kamdani',
    term: 'Zardozi, kamdani and stonework hand embroidery',
    copy: 'Gold metal thread couched onto silk, kamdani flatwork, pearl and stone setting. A zardozi knot is 1.2mm across and every one is pulled to the same tension by hand.',
  },
  {
    id: 'ethnic',
    index: '04',
    title: 'Ethnic & traditional wear',
    term: 'Custom ethnic and traditional outfits',
    copy: 'Sherwanis, jacket sets, half-sarees and festive outfits — cut to order, embroidered in-house and styled for the occasion they are being made for.',
  },
  {
    id: 'kids',
    index: '05',
    title: 'Kids’ wear',
    term: 'Kids’ ethnic wear and festive outfits',
    copy: 'Little lehengas, wildflower dresses, first-birthday and festival outfits. The same frame, the same stitch, scaled to a child’s pattern.',
  },
  {
    id: 'pleating',
    index: '06',
    title: 'Saree pre-pleating',
    term: 'Saree pre-pleating and draping',
    copy: 'Your saree pleated, pinned and pressed so the fall holds through a full wedding day. Leave it with the studio, collect it ready to wear.',
  },
];
