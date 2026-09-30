/** Confirmed studio channels only. Email, phone and street address stay empty until verified. */
export const CONTACT = {
  email: '',
  whatsapp: '',
  addressLines: [],
  /* The city IS confirmed even though the street address is not, and it is
     the single most valuable fact on the page for search: "embroidery in
     Coimbatore" is the query this studio has to win. It is printed in the
     footer and mirrored in the LocalBusiness JSON-LD in index.html — keep the
     two in step. */
  locality: 'Coimbatore',
  region: 'Tamil Nadu',
  country: 'India',
  /* Public, confirmed handle. Listed as `sameAs` in the structured data so
     the site and the Instagram account resolve to one entity rather than
     competing for the same brand searches. */
  instagram: 'https://www.instagram.com/niart_designerstudio/',
};

/** "Coimbatore, Tamil Nadu" — the one line of address that is safe to print. */
export const localityLine = [CONTACT.locality, CONTACT.region]
  .filter(Boolean)
  .join(', ');

const waDigits = (n) => n.replace(/[^0-9]/g, '');

/** A `mailto:` link, optionally pre-filled — available only when a verified inbox is configured. */
export function mailtoHref(subject, body) {
  if (!CONTACT.email) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${CONTACT.email}${query ? `?${query}` : ''}`;
}

/** A `wa.me` deep link when a real number is set, otherwise `null`. */
export function whatsappHref(message) {
  if (!CONTACT.whatsapp) return null;
  const digits = waDigits(CONTACT.whatsapp);
  if (!digits) return null;
  const params = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${params}`;
}

/** Only use confirmed channels: WhatsApp, email, then the studio's Instagram. */
export function enquiryHref({ subject, body, whatsappMessage } = {}) {
  return whatsappHref(whatsappMessage ?? body) ?? mailtoHref(subject, body) ?? CONTACT.instagram;
}
