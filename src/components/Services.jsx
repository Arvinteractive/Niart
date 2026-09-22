import { CONTACT, mailtoHref } from '../data/contact';
import { services } from '../data/services';
import { useMagnetic } from '../hooks/useMagnetic';
import './Services.css';

/**
 * The service list — what the studio actually takes on, and where.
 *
 * Plain type on paper, no stage and no parallax: the sections around it are
 * photographic, and a search result needs one place on the page where the
 * work is simply named. It is also the only section whose copy a crawler can
 * read as a service list rather than as captions.
 *
 * `term` is rendered under each title rather than hidden: it is the same
 * service in the words a customer would search, and it earns its place on
 * screen for anyone scanning the list for the one thing they came for.
 */
export function Services({ reduced }) {
  const ctaRef = useMagnetic(reduced);

  return (
    <section id="services" className="svc" aria-labelledby="services-title">
      <div className="shell">
        <div className="svc__head">
          <p className="eyebrow svc__eyebrow" data-r>
            <span className="svc__rule" />
            Services · Coimbatore
          </p>

          <h2 id="services-title" className="svc__title" data-r>
            What the Coimbatore studio takes on
          </h2>

          <p className="svc__lede" data-r>
            NIART Designer Studio works to order. Bridal wear, aari and zardozi hand
            embroidery, ethnic and traditional outfits, kids’ wear and saree
            pre-pleating — cut, embroidered and finished under one roof in Coimbatore,
            Tamil Nadu.
          </p>
        </div>

        <ul className="svc__list">
          {services.map((service) => (
            <li key={service.id} className="svc__item" data-r>
              <span className="meta svc__index">{service.index}</span>
              <h3 className="svc__item-title">{service.title}</h3>
              <p className="meta svc__term">{service.term}</p>
              <p className="svc__copy">{service.copy}</p>
            </li>
          ))}
        </ul>

        <div className="svc__foot" data-r>
          <p className="svc__foot-note">
            Commissions open for the current season. Write with the date, the occasion
            and a photograph of anything you have already bought.
          </p>
          <a
            ref={ctaRef}
            className="svc__cta"
            data-mag
            data-arrow
            href={mailtoHref('Commission enquiry — NIART Designer Studio')}
          >
            {CONTACT.email}{' '}
            <span className="ar" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
