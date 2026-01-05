/**
 * Eyebrow Style SVG Assets
 *
 * Different eyebrow shapes and styles.
 * Uses color token: {{eyebrow}}
 */

export const eyebrows = {
  natural: `<svg viewBox="0 0 200 200">
    <path d="M35 72 Q50 67 72 70" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M128 70 Q150 67 165 72" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
  </svg>`,

  thick: `<svg viewBox="0 0 200 200">
    <path d="M32 70 Q52 62 75 68 L73 75 Q50 70 34 76 Z" fill="{{eyebrow}}" />
    <path d="M125 68 Q148 62 168 70 L166 76 Q150 70 127 75 Z" fill="{{eyebrow}}" />
  </svg>`,

  thin: `<svg viewBox="0 0 200 200">
    <path d="M38 72 Q55 68 72 71" stroke="{{eyebrow}}" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M128 71 Q145 68 162 72" stroke="{{eyebrow}}" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  arched: `<svg viewBox="0 0 200 200">
    <path d="M35 75 Q50 62 75 72" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M125 72 Q150 62 165 75" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
  </svg>`,

  straight: `<svg viewBox="0 0 200 200">
    <path d="M35 70 L75 70" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M125 70 L165 70" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
  </svg>`,

  rounded: `<svg viewBox="0 0 200 200">
    <path d="M35 73 Q55 66 75 73" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M125 73 Q145 66 165 73" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
  </svg>`,

  angledUp: `<svg viewBox="0 0 200 200">
    <path d="M35 78 Q50 68 75 65" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M125 65 Q150 68 165 78" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
  </svg>`,

  angledDown: `<svg viewBox="0 0 200 200">
    <path d="M35 65 Q50 68 75 78" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M125 78 Q150 68 165 65" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
  </svg>`,

  unibrow: `<svg viewBox="0 0 200 200">
    <path d="M32 72 Q55 65 100 68 Q145 65 168 72" stroke="{{eyebrow}}" stroke-width="4" fill="none" stroke-linecap="round" />
  </svg>`,
};

export default eyebrows;
