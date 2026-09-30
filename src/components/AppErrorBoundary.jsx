import { Component } from 'react';
import { CONTACT, enquiryHref } from '../data/contact';

export class AppErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    if (this.state.failed) {
      return (
        <main className="site-fallback">
          <h1>NIART Designer Studio</h1>
          <p>Bridal wear, aari and zardozi embroidery in {CONTACT.locality}.</p>
          <p>The collection could not load. You can still contact the studio.</p>
          <p><a href={enquiryHref()}>Contact NIART</a> · <a href="/">Reload the website</a></p>
          <p><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></p>
        </main>
      );
    }
    return this.props.children;
  }
}
