import { CONTACT } from '../data/contact';
import './VisitUs.css';

const studioAddress = CONTACT.addressLines.join(', ');

export function VisitUs() {
  return (
    <section className="visit" id="visit" aria-labelledby="visit-heading">
      <div className="shell">
        <h2 className="visit__title" id="visit-heading">Visit us</h2>
        <iframe
          className="visit__map"
          title={`NIART Designer Studio — ${studioAddress}`}
          src="https://www.google.com/maps?cid=5631883160271291286&ll=11.0382781,76.9795371&z=20&output=embed"
          width="1200"
          height="480"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <address className="visit__address">{studioAddress}</address>
      </div>
    </section>
  );
}
