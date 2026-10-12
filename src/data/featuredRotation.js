const image = (name) => `/images/featured/turquoise-bloom/${name}.webp`;

// Ordered, approximate yaw positions in a single back-to-front half turn.
// Image synthesis provenance: design/turquoise-turn-prompts.json.
export const rotationViews = [
  { id: 'back', angle: 0, label: 'Back' },
  { id: 'turn-030', angle: 30, label: 'Rear angle' },
  { id: 'turn-060', angle: 60, label: 'Rear profile' },
  { id: 'left-fitted-v2', angle: 90, label: 'Side' },
  { id: 'turn-120', angle: 120, label: 'Front profile' },
  { id: 'turn-150-v2', angle: 150, label: 'Front angle' },
  { id: 'front', angle: 180, label: 'Front' },
].map((view) => ({ ...view, src: image(view.id), alt: `Turquoise embroidered blouse — ${view.label.toLowerCase()} view.` }));
