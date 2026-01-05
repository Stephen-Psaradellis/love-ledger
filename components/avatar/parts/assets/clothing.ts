/**
 * Clothing SVG Assets (Full Body View)
 *
 * Tops and bottoms for full-body avatars.
 * Uses color tokens: {{top}}, {{topShadow}}, {{topAccent}}, {{bottom}}, {{bottomShadow}}
 */

export const tops = {
  tshirt: `<svg viewBox="0 0 200 400">
    <path d="M48 200 Q48 215 55 225 L55 330 L145 330 L145 225 Q152 215 152 200 L130 200 Q120 215 100 215 Q80 215 70 200 Z" fill="{{top}}" />
    <!-- Sleeves -->
    <path d="M48 200 Q32 215 28 250 L45 255 L55 225" fill="{{top}}" />
    <path d="M152 200 Q168 215 172 250 L155 255 L145 225" fill="{{top}}" />
    <!-- Neckline -->
    <path d="M70 200 Q80 215 100 215 Q120 215 130 200" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.3" />
    <!-- Fold shadows -->
    <path d="M75 240 L78 320" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.15" />
    <path d="M125 240 L122 320" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.15" />
  </svg>`,

  tshirtVneck: `<svg viewBox="0 0 200 400">
    <path d="M48 200 Q48 215 55 225 L55 330 L145 330 L145 225 Q152 215 152 200 L125 200 L100 230 L75 200 Z" fill="{{top}}" />
    <path d="M48 200 Q32 215 28 250 L45 255 L55 225" fill="{{top}}" />
    <path d="M152 200 Q168 215 172 250 L155 255 L145 225" fill="{{top}}" />
    <!-- V-neck line -->
    <path d="M75 200 L100 230 L125 200" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.4" />
  </svg>`,

  polo: `<svg viewBox="0 0 200 400">
    <path d="M48 200 Q48 215 55 225 L55 330 L145 330 L145 225 Q152 215 152 200 L125 200 Q115 210 100 210 Q85 210 75 200 Z" fill="{{top}}" />
    <path d="M48 200 Q32 215 28 250 L45 255 L55 225" fill="{{top}}" />
    <path d="M152 200 Q168 215 172 250 L155 255 L145 225" fill="{{top}}" />
    <!-- Collar -->
    <path d="M70 195 L75 200 Q85 210 100 210 Q115 210 125 200 L130 195 L125 185 Q110 195 100 195 Q90 195 75 185 Z" fill="{{topAccent}}" />
    <!-- Button placket -->
    <rect x="97" y="210" width="6" height="40" fill="{{topShadow}}" opacity="0.15" />
    <circle cx="100" cy="218" r="2" fill="{{topAccent}}" />
    <circle cx="100" cy="232" r="2" fill="{{topAccent}}" />
  </svg>`,

  buttonUp: `<svg viewBox="0 0 200 400">
    <path d="M48 200 Q48 215 55 225 L55 330 L145 330 L145 225 Q152 215 152 200 L125 200 Q115 205 100 205 Q85 205 75 200 Z" fill="{{top}}" />
    <path d="M48 200 Q32 215 28 280 L45 285 L55 230" fill="{{top}}" />
    <path d="M152 200 Q168 215 172 280 L155 285 L145 230" fill="{{top}}" />
    <!-- Collar -->
    <path d="M68 195 L75 200 Q87 208 100 208 Q113 208 125 200 L132 195 L128 182 Q112 195 100 195 Q88 195 72 182 Z" fill="{{topAccent}}" />
    <!-- Button line -->
    <line x1="100" y1="208" x2="100" y2="330" stroke="{{topShadow}}" stroke-width="2" opacity="0.2" />
    <circle cx="100" cy="225" r="2.5" fill="{{topAccent}}" />
    <circle cx="100" cy="255" r="2.5" fill="{{topAccent}}" />
    <circle cx="100" cy="285" r="2.5" fill="{{topAccent}}" />
    <circle cx="100" cy="315" r="2.5" fill="{{topAccent}}" />
  </svg>`,

  sweater: `<svg viewBox="0 0 200 400">
    <path d="M48 200 Q48 215 55 225 L55 335 L145 335 L145 225 Q152 215 152 200 L125 200 Q115 212 100 212 Q85 212 75 200 Z" fill="{{top}}" />
    <path d="M48 200 Q28 220 24 290 L24 335 L55 335 L55 230" fill="{{top}}" />
    <path d="M152 200 Q172 220 176 290 L176 335 L145 335 L145 230" fill="{{top}}" />
    <!-- Crew neck -->
    <ellipse cx="100" cy="205" rx="25" ry="8" fill="{{topShadow}}" opacity="0.2" />
    <!-- Ribbing at bottom -->
    <rect x="55" y="325" width="90" height="10" fill="{{topShadow}}" opacity="0.15" />
    <!-- Knit texture hints -->
    <path d="M70 250 L70 320" stroke="{{topShadow}}" stroke-width="1" opacity="0.1" stroke-dasharray="4 4" />
    <path d="M100 220 L100 320" stroke="{{topShadow}}" stroke-width="1" opacity="0.1" stroke-dasharray="4 4" />
    <path d="M130 250 L130 320" stroke="{{topShadow}}" stroke-width="1" opacity="0.1" stroke-dasharray="4 4" />
  </svg>`,

  hoodie: `<svg viewBox="0 0 200 400">
    <path d="M45 200 Q45 220 52 235 L52 335 L148 335 L148 235 Q155 220 155 200 L130 200 Q118 215 100 215 Q82 215 70 200 Z" fill="{{top}}" />
    <path d="M45 200 Q22 225 18 295 L18 340 L52 340 L52 240" fill="{{top}}" />
    <path d="M155 200 Q178 225 182 295 L182 340 L148 340 L148 240" fill="{{top}}" />
    <!-- Hood -->
    <path d="M60 195 Q60 165 100 160 Q140 165 140 195 L130 200 Q115 190 100 190 Q85 190 70 200 Z" fill="{{top}}" />
    <path d="M70 185 Q85 175 100 175 Q115 175 130 185" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.2" />
    <!-- Kangaroo pocket -->
    <path d="M65 280 L65 320 L135 320 L135 280 Q100 290 65 280" fill="{{topShadow}}" opacity="0.15" />
    <!-- Drawstrings -->
    <line x1="88" y1="200" x2="88" y2="250" stroke="{{topAccent}}" stroke-width="2" />
    <line x1="112" y1="200" x2="112" y2="250" stroke="{{topAccent}}" stroke-width="2" />
  </svg>`,

  jacket: `<svg viewBox="0 0 200 400">
    <path d="M45 200 Q45 220 52 235 L52 335 L148 335 L148 235 Q155 220 155 200 L125 200 L110 220 L100 215 L90 220 L75 200 Z" fill="{{top}}" />
    <path d="M45 200 Q22 225 18 295 L18 340 L52 340 L52 240" fill="{{top}}" />
    <path d="M155 200 Q178 225 182 295 L182 340 L148 340 L148 240" fill="{{top}}" />
    <!-- Lapels -->
    <path d="M75 200 L90 220 L85 260 L75 200" fill="{{topAccent}}" />
    <path d="M125 200 L110 220 L115 260 L125 200" fill="{{topAccent}}" />
    <!-- Center closure -->
    <line x1="100" y1="215" x2="100" y2="335" stroke="{{topShadow}}" stroke-width="2" opacity="0.3" />
    <!-- Pockets -->
    <rect x="58" y="280" width="25" height="4" fill="{{topShadow}}" opacity="0.2" />
    <rect x="117" y="280" width="25" height="4" fill="{{topShadow}}" opacity="0.2" />
  </svg>`,

  blazer: `<svg viewBox="0 0 200 400">
    <path d="M42 200 Q42 225 50 240 L50 340 L150 340 L150 240 Q158 225 158 200 L125 200 L105 230 L100 225 L95 230 L75 200 Z" fill="{{top}}" />
    <path d="M42 200 Q20 230 16 300 L16 345 L50 345 L50 245" fill="{{top}}" />
    <path d="M158 200 Q180 230 184 300 L184 345 L150 345 L150 245" fill="{{top}}" />
    <!-- Notched lapels -->
    <path d="M75 200 L95 230 L88 275 L70 220 Z" fill="{{topAccent}}" />
    <path d="M125 200 L105 230 L112 275 L130 220 Z" fill="{{topAccent}}" />
    <!-- Notch detail -->
    <path d="M75 200 L68 190" stroke="{{topAccent}}" stroke-width="3" />
    <path d="M125 200 L132 190" stroke="{{topAccent}}" stroke-width="3" />
    <!-- Buttons -->
    <circle cx="100" cy="280" r="4" fill="{{topAccent}}" />
    <circle cx="100" cy="310" r="4" fill="{{topAccent}}" />
    <!-- Pocket square hint -->
    <path d="M60 240 L65 235 L70 242" stroke="{{topAccent}}" stroke-width="2" fill="none" />
  </svg>`,

  tank: `<svg viewBox="0 0 200 400">
    <path d="M60 200 L60 330 L140 330 L140 200 Q125 210 100 210 Q75 210 60 200" fill="{{top}}" />
    <!-- Armholes -->
    <path d="M60 200 Q55 220 55 240" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.3" />
    <path d="M140 200 Q145 220 145 240" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.3" />
    <!-- Neckline -->
    <path d="M60 200 Q75 210 100 210 Q125 210 140 200" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.3" />
  </svg>`,

  dress: `<svg viewBox="0 0 200 400">
    <path d="M48 200 Q48 215 55 225 L35 400 L165 400 L145 225 Q152 215 152 200 L125 200 Q115 212 100 212 Q85 212 75 200 Z" fill="{{top}}" />
    <!-- Cap sleeves -->
    <path d="M48 200 Q38 210 35 225 L55 225" fill="{{top}}" />
    <path d="M152 200 Q162 210 165 225 L145 225" fill="{{top}}" />
    <!-- Waist definition -->
    <path d="M55 280 Q100 290 145 280" stroke="{{topShadow}}" stroke-width="2" fill="none" opacity="0.2" />
    <!-- Skirt flow lines -->
    <path d="M70 290 L55 390" stroke="{{topShadow}}" stroke-width="1" fill="none" opacity="0.15" />
    <path d="M130 290 L145 390" stroke="{{topShadow}}" stroke-width="1" fill="none" opacity="0.15" />
  </svg>`,

  turtleneck: `<svg viewBox="0 0 200 400">
    <path d="M48 210 Q48 225 55 235 L55 335 L145 335 L145 235 Q152 225 152 210" fill="{{top}}" />
    <path d="M48 210 Q28 230 24 300 L24 340 L55 340 L55 240" fill="{{top}}" />
    <path d="M152 210 Q172 230 176 300 L176 340 L145 340 L145 240" fill="{{top}}" />
    <!-- Turtleneck collar -->
    <path d="M70 175 L70 210 Q85 218 100 218 Q115 218 130 210 L130 175 Q115 182 100 182 Q85 182 70 175" fill="{{top}}" />
    <ellipse cx="100" cy="178" rx="30" ry="6" fill="{{topShadow}}" opacity="0.15" />
    <!-- Fold lines on neck -->
    <path d="M75 185 Q100 190 125 185" stroke="{{topShadow}}" stroke-width="1" fill="none" opacity="0.2" />
    <path d="M78 195 Q100 200 122 195" stroke="{{topShadow}}" stroke-width="1" fill="none" opacity="0.2" />
  </svg>`,
};

export const bottoms = {
  jeans: `<svg viewBox="0 0 200 400">
    <path d="M55 330 L55 340 L45 400 L95 400 L100 340 L105 400 L155 400 L145 340 L145 330 Z" fill="{{bottom}}" />
    <!-- Seams -->
    <line x1="70" y1="335" x2="70" y2="400" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.25" />
    <line x1="130" y1="335" x2="130" y2="400" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.25" />
    <!-- Pocket hints -->
    <path d="M60 340 Q65 345 70 340" stroke="{{bottomShadow}}" stroke-width="1" fill="none" opacity="0.2" />
    <path d="M130 340 Q135 345 140 340" stroke="{{bottomShadow}}" stroke-width="1" fill="none" opacity="0.2" />
  </svg>`,

  pants: `<svg viewBox="0 0 200 400">
    <path d="M55 330 L55 340 L48 400 L92 400 L100 340 L108 400 L152 400 L145 340 L145 330 Z" fill="{{bottom}}" />
    <!-- Crease -->
    <line x1="70" y1="340" x2="70" y2="395" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.2" />
    <line x1="130" y1="340" x2="130" y2="395" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.2" />
  </svg>`,

  shorts: `<svg viewBox="0 0 200 400">
    <path d="M55 330 L55 340 L50 370 L95 370 L100 345 L105 370 L150 370 L145 340 L145 330 Z" fill="{{bottom}}" />
    <!-- Leg openings -->
    <path d="M50 370 L95 370" stroke="{{bottomShadow}}" stroke-width="2" opacity="0.2" />
    <path d="M105 370 L150 370" stroke="{{bottomShadow}}" stroke-width="2" opacity="0.2" />
  </svg>`,

  skirt: `<svg viewBox="0 0 200 400">
    <path d="M55 330 L40 380 L160 380 L145 330 Z" fill="{{bottom}}" />
    <!-- Hem -->
    <path d="M40 380 L160 380" stroke="{{bottomShadow}}" stroke-width="2" opacity="0.2" />
    <!-- Flow lines -->
    <path d="M80 335 L70 375" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.15" />
    <path d="M120 335 L130 375" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.15" />
  </svg>`,

  skirtLong: `<svg viewBox="0 0 200 400">
    <path d="M55 330 L30 400 L170 400 L145 330 Z" fill="{{bottom}}" />
    <!-- Flow lines -->
    <path d="M75 340 L55 395" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.15" />
    <path d="M100 340 L100 395" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.12" />
    <path d="M125 340 L145 395" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.15" />
  </svg>`,

  leggings: `<svg viewBox="0 0 200 400">
    <path d="M60 330 L60 340 L55 400 L85 400 L100 345 L115 400 L145 400 L140 340 L140 330 Z" fill="{{bottom}}" />
    <!-- Tight fit shadows -->
    <path d="M70 350 L65 395" stroke="{{bottomShadow}}" stroke-width="3" opacity="0.15" />
    <path d="M130 350 L135 395" stroke="{{bottomShadow}}" stroke-width="3" opacity="0.15" />
  </svg>`,

  sweatpants: `<svg viewBox="0 0 200 400">
    <path d="M50 330 L50 345 L42 395 L45 400 L95 400 L100 350 L105 400 L155 400 L158 395 L150 345 L150 330 Z" fill="{{bottom}}" />
    <!-- Elastic cuffs -->
    <ellipse cx="68" cy="398" rx="23" ry="4" fill="{{bottomShadow}}" opacity="0.2" />
    <ellipse cx="132" cy="398" rx="23" ry="4" fill="{{bottomShadow}}" opacity="0.2" />
    <!-- Loose fit -->
    <path d="M65 350 Q70 370 65 390" stroke="{{bottomShadow}}" stroke-width="2" opacity="0.12" />
    <path d="M135 350 Q130 370 135 390" stroke="{{bottomShadow}}" stroke-width="2" opacity="0.12" />
  </svg>`,

  slacks: `<svg viewBox="0 0 200 400">
    <path d="M52 330 L52 342 L45 400 L90 400 L100 342 L110 400 L155 400 L148 342 L148 330 Z" fill="{{bottom}}" />
    <!-- Sharp creases -->
    <line x1="68" y1="340" x2="68" y2="398" stroke="{{bottomShadow}}" stroke-width="1.5" opacity="0.25" />
    <line x1="132" y1="340" x2="132" y2="398" stroke="{{bottomShadow}}" stroke-width="1.5" opacity="0.25" />
    <!-- Clean hem -->
    <path d="M45 398 L90 398" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.2" />
    <path d="M110 398 L155 398" stroke="{{bottomShadow}}" stroke-width="1" opacity="0.2" />
  </svg>`,
};

export default { tops, bottoms };
