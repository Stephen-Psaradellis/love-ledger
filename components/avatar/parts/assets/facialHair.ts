/**
 * Facial Hair SVG Assets
 *
 * Beards, mustaches, and other facial hair.
 * Uses color token: {{facialHair}}
 */

export const facialHair = {
  none: `<svg viewBox="0 0 200 200"></svg>`,

  stubble: `<svg viewBox="0 0 200 200">
    <g fill="{{facialHair}}" opacity="0.25">
      <!-- Chin area -->
      <circle cx="85" cy="160" r="1" />
      <circle cx="95" cy="162" r="1" />
      <circle cx="105" cy="162" r="1" />
      <circle cx="115" cy="160" r="1" />
      <circle cx="90" cy="168" r="1" />
      <circle cx="100" cy="170" r="1" />
      <circle cx="110" cy="168" r="1" />
      <!-- Cheeks -->
      <circle cx="60" cy="140" r="1" />
      <circle cx="65" cy="145" r="1" />
      <circle cx="70" cy="150" r="1" />
      <circle cx="130" cy="150" r="1" />
      <circle cx="135" cy="145" r="1" />
      <circle cx="140" cy="140" r="1" />
      <!-- Upper lip -->
      <circle cx="88" cy="138" r="0.8" />
      <circle cx="95" cy="136" r="0.8" />
      <circle cx="105" cy="136" r="0.8" />
      <circle cx="112" cy="138" r="0.8" />
    </g>
  </svg>`,

  goatee: `<svg viewBox="0 0 200 200">
    <!-- Chin beard -->
    <path d="M85 155 Q100 175 115 155 Q115 175 100 180 Q85 175 85 155" fill="{{facialHair}}" />
    <!-- Mustache -->
    <path d="M80 140 Q90 135 100 138 Q110 135 120 140 Q115 145 100 143 Q85 145 80 140" fill="{{facialHair}}" />
  </svg>`,

  vandyke: `<svg viewBox="0 0 200 200">
    <!-- Pointed chin beard -->
    <path d="M88 155 Q100 158 112 155 Q110 172 100 182 Q90 172 88 155" fill="{{facialHair}}" />
    <!-- Thin mustache -->
    <path d="M82 138 Q91 133 100 136 Q109 133 118 138" stroke="{{facialHair}}" stroke-width="3" fill="none" />
    <!-- Disconnect from cheeks -->
  </svg>`,

  shortBeard: `<svg viewBox="0 0 200 200">
    <path d="M55 135 Q55 165 100 175 Q145 165 145 135 Q140 155 100 160 Q60 155 55 135" fill="{{facialHair}}" />
    <!-- Mustache -->
    <path d="M75 138 Q88 132 100 136 Q112 132 125 138 Q120 145 100 142 Q80 145 75 138" fill="{{facialHair}}" />
    <!-- Cheek connection -->
    <path d="M55 135 Q50 120 55 110" stroke="{{facialHair}}" stroke-width="8" fill="none" opacity="0.7" />
    <path d="M145 135 Q150 120 145 110" stroke="{{facialHair}}" stroke-width="8" fill="none" opacity="0.7" />
  </svg>`,

  mediumBeard: `<svg viewBox="0 0 200 200">
    <path d="M50 130 Q50 175 100 190 Q150 175 150 130 Q145 160 100 170 Q55 160 50 130" fill="{{facialHair}}" />
    <!-- Mustache -->
    <path d="M72 136 Q86 128 100 134 Q114 128 128 136 Q122 145 100 140 Q78 145 72 136" fill="{{facialHair}}" />
    <!-- Sideburns -->
    <path d="M50 130 Q45 110 50 90" stroke="{{facialHair}}" stroke-width="10" fill="none" />
    <path d="M150 130 Q155 110 150 90" stroke="{{facialHair}}" stroke-width="10" fill="none" />
  </svg>`,

  longBeard: `<svg viewBox="0 0 200 200">
    <path d="M45 125 Q42 190 100 220 Q158 190 155 125 Q150 180 100 200 Q50 180 45 125" fill="{{facialHair}}" />
    <!-- Mustache -->
    <path d="M70 136 Q85 126 100 132 Q115 126 130 136 Q122 148 100 142 Q78 148 70 136" fill="{{facialHair}}" />
    <!-- Sideburns -->
    <path d="M45 125 Q40 100 48 80" stroke="{{facialHair}}" stroke-width="12" fill="none" />
    <path d="M155 125 Q160 100 152 80" stroke="{{facialHair}}" stroke-width="12" fill="none" />
  </svg>`,

  fullBeard: `<svg viewBox="0 0 200 200">
    <path d="M40 120 Q35 180 100 200 Q165 180 160 120" fill="{{facialHair}}" />
    <!-- Mustache integrated -->
    <path d="M68 134 Q84 122 100 130 Q116 122 132 134" fill="{{facialHair}}" />
    <!-- Full sideburns -->
    <path d="M40 120 Q32 90 42 70" stroke="{{facialHair}}" stroke-width="15" fill="none" />
    <path d="M160 120 Q168 90 158 70" stroke="{{facialHair}}" stroke-width="15" fill="none" />
    <!-- Texture -->
    <path d="M70 160 Q100 175 130 160" stroke="{{facialHair}}" stroke-width="2" fill="none" opacity="0.3" />
    <path d="M80 180 Q100 190 120 180" stroke="{{facialHair}}" stroke-width="2" fill="none" opacity="0.3" />
  </svg>`,

  mustache: `<svg viewBox="0 0 200 200">
    <path d="M70 138 Q85 128 100 135 Q115 128 130 138 Q125 148 100 143 Q75 148 70 138" fill="{{facialHair}}" />
    <!-- Subtle texture -->
    <path d="M80 140 Q90 135 100 138" stroke="{{facialHair}}" stroke-width="1" fill="none" opacity="0.4" />
  </svg>`,

  handlebar: `<svg viewBox="0 0 200 200">
    <!-- Center -->
    <path d="M80 138 Q90 132 100 136 Q110 132 120 138 Q115 145 100 142 Q85 145 80 138" fill="{{facialHair}}" />
    <!-- Curled ends -->
    <path d="M70 140 Q55 135 50 145 Q52 155 60 152" stroke="{{facialHair}}" stroke-width="5" fill="none" />
    <path d="M130 140 Q145 135 150 145 Q148 155 140 152" stroke="{{facialHair}}" stroke-width="5" fill="none" />
  </svg>`,

  soulPatch: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="158" rx="8" ry="10" fill="{{facialHair}}" />
  </svg>`,

  chinStrap: `<svg viewBox="0 0 200 200">
    <path d="M45 115 Q45 165 100 175 Q155 165 155 115" stroke="{{facialHair}}" stroke-width="8" fill="none" />
    <!-- Sideburns -->
    <path d="M45 115 L45 85" stroke="{{facialHair}}" stroke-width="8" />
    <path d="M155 115 L155 85" stroke="{{facialHair}}" stroke-width="8" />
  </svg>`,
};

export default facialHair;
