/**
 * Hair Style SVG Assets
 *
 * Front and back layers for hair.
 * Uses color tokens: {{hair}}, {{hairShadow}}, {{hairHighlight}}
 */

// Hair back layers (rendered behind head)
export const hairBack = {
  // Long styles
  longStraight_back: `<svg viewBox="0 0 200 200">
    <path d="M25 60 Q25 200 100 200 Q175 200 175 60" fill="{{hair}}" />
    <path d="M35 70 Q35 190 100 190" fill="{{hairShadow}}" opacity="0.2" />
  </svg>`,

  longWavy_back: `<svg viewBox="0 0 200 200">
    <path d="M25 60 Q30 100 25 140 Q20 180 40 200 L100 200 L160 200 Q180 180 175 140 Q170 100 175 60" fill="{{hair}}" />
    <path d="M35 70 Q40 110 35 150 Q30 190 100 190" fill="{{hairShadow}}" opacity="0.15" />
  </svg>`,

  longCurly_back: `<svg viewBox="0 0 200 200">
    <path d="M20 55 Q15 100 25 130 Q20 160 30 190 Q60 210 100 210 Q140 210 170 190 Q180 160 175 130 Q185 100 180 55" fill="{{hair}}" />
    <circle cx="30" cy="120" r="15" fill="{{hairHighlight}}" opacity="0.15" />
    <circle cx="170" cy="120" r="15" fill="{{hairHighlight}}" opacity="0.15" />
  </svg>`,

  ponytail_back: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="35" rx="50" ry="20" fill="{{hair}}" />
    <path d="M90 40 Q85 80 95 130 Q90 180 100 220" stroke="{{hair}}" stroke-width="25" fill="none" />
    <path d="M95 50 Q90 90 98 140" stroke="{{hairShadow}}" stroke-width="8" fill="none" opacity="0.2" />
  </svg>`,

  bun_back: `<svg viewBox="0 0 200 200">
    <circle cx="100" cy="25" r="25" fill="{{hair}}" />
    <circle cx="100" cy="25" r="20" fill="{{hairHighlight}}" opacity="0.15" />
  </svg>`,

  braids_back: `<svg viewBox="0 0 200 200">
    <path d="M40 50 Q35 100 40 150 Q35 180 45 220" stroke="{{hair}}" stroke-width="20" fill="none" />
    <path d="M160 50 Q165 100 160 150 Q165 180 155 220" stroke="{{hair}}" stroke-width="20" fill="none" />
  </svg>`,

  afro_back: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="80" rx="85" ry="75" fill="{{hair}}" />
  </svg>`,

  locs_back: `<svg viewBox="0 0 200 200">
    <g fill="{{hair}}">
      <path d="M30 50 Q25 120 35 180" stroke="{{hair}}" stroke-width="8" fill="none" />
      <path d="M50 45 Q48 130 55 190" stroke="{{hair}}" stroke-width="8" fill="none" />
      <path d="M150 45 Q152 130 145 190" stroke="{{hair}}" stroke-width="8" fill="none" />
      <path d="M170 50 Q175 120 165 180" stroke="{{hair}}" stroke-width="8" fill="none" />
    </g>
  </svg>`,

  // === ENHANCED BASIC STYLES (Task 7) ===

  // Short hair back layer - minimal back presence
  short_back: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="shortBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow2}}"/>
        <stop offset="60%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow1}}"/>
      </linearGradient>
    </defs>
    <path d="M35 55 Q35 70 40 80 L160 80 Q165 70 165 55" fill="url(#shortBackGrad)" opacity="0.4"/>
  </svg>`,

  // Medium hair back layer - frames face sides
  medium_back: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="medBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow2}}"/>
      </linearGradient>
    </defs>
    <path d="M28 55 Q25 100 30 130 L40 130 Q35 100 38 60" fill="url(#medBackGrad)"/>
    <path d="M172 55 Q175 100 170 130 L160 130 Q165 100 162 60" fill="url(#medBackGrad)"/>
  </svg>`,

  // Long hair back layer - full coverage
  long_back: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="longBackGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="40%" style="stop-color:{{hairShadow1}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow2}}"/>
      </linearGradient>
    </defs>
    <path d="M22 55 Q18 120 25 175 Q60 200 100 200 Q140 200 175 175 Q182 120 178 55" fill="url(#longBackGrad)"/>
    <g stroke="{{hairShadow2}}" stroke-width="1" fill="none" opacity="0.2">
      <path d="M30 80 Q28 130 32 170"/>
      <path d="M40 75 Q38 125 42 165"/>
      <path d="M160 75 Q162 125 158 165"/>
      <path d="M170 80 Q172 130 168 170"/>
    </g>
  </svg>`,

  // Curly hair back layer - voluminous with curl shapes
  curly_back: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="curlyBackGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow2}}"/>
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="100" rx="80" ry="85" fill="url(#curlyBackGrad)"/>
    <g fill="{{hairShadow1}}" opacity="0.3">
      <circle cx="35" cy="100" r="12"/>
      <circle cx="45" cy="140" r="10"/>
      <circle cx="155" cy="140" r="10"/>
      <circle cx="165" cy="100" r="12"/>
    </g>
  </svg>`,

  // Wavy hair back layer - flowing waves
  wavy_back: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="wavyBackGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow2}}"/>
      </linearGradient>
    </defs>
    <path d="M20 55 Q15 100 22 140 Q18 175 35 195 Q70 210 100 210 Q130 210 165 195 Q182 175 178 140 Q185 100 180 55" fill="url(#wavyBackGrad)"/>
    <g stroke="{{hairShadow1}}" stroke-width="1.5" fill="none" opacity="0.2">
      <path d="M28 80 Q24 110 30 140 Q26 170 35 190"/>
      <path d="M172 80 Q176 110 170 140 Q174 170 165 190"/>
    </g>
  </svg>`,
};

// Hair front layers (rendered in front of face)
export const hairFront = {
  // Bald/shaved - no front hair
  bald_front: `<svg viewBox="0 0 200 200"></svg>`,
  shaved_front: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="40" rx="60" ry="25" fill="{{hair}}" opacity="0.3" />
  </svg>`,
  buzzCut_front: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="38" rx="62" ry="28" fill="{{hair}}" opacity="0.5" />
  </svg>`,

  // Short styles
  crew_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="crewGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="40%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </linearGradient>
    </defs>
    <path d="M40 55 Q50 25 100 22 Q150 25 160 55" fill="url(#crewGrad)" />
    <path d="M45 52 Q55 32 100 28 Q145 32 155 52" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="0.8" fill="none" opacity="0.2">
      <path d="M60 45 Q62 35 65 42"/><path d="M75 40 Q78 30 80 38"/>
      <path d="M90 38 Q93 28 95 36"/><path d="M105 38 Q107 28 110 36"/>
      <path d="M120 40 Q122 30 125 38"/><path d="M140 45 Q138 35 135 42"/>
    </g>
    <path d="M55 42 Q75 28 100 26" fill="{{hairHighlight}}" opacity="0.2" />
    <path d="M42 54 Q70 48 100 47 Q130 48 158 54" stroke="{{hairShadow}}" stroke-width="1.5" fill="none" opacity="0.25"/>
  </svg>`,

  fade_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="fadeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:{{hair}};stop-opacity:0.1"/>
        <stop offset="50%" style="stop-color:{{hair}};stop-opacity:0.5"/>
        <stop offset="100%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <linearGradient id="fadeTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="50%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </linearGradient>
    </defs>
    <path d="M45 60 Q55 30 100 25 Q145 30 155 60" fill="url(#fadeTopGrad)" />
    <path d="M45 60 Q42 55 45 48" fill="url(#fadeGrad)" />
    <path d="M155 60 Q158 55 155 48" fill="url(#fadeGrad)" />
    <g fill="{{hair}}" opacity="0.3">
      <circle cx="48" cy="58" r="1"/><circle cx="52" cy="55" r="1"/>
      <circle cx="148" cy="55" r="1"/><circle cx="152" cy="58" r="1"/>
    </g>
    <g stroke="{{hairShadow}}" stroke-width="0.7" fill="none" opacity="0.2">
      <path d="M70 45 Q72 35 75 42"/><path d="M90 40 Q93 30 95 38"/>
      <path d="M110 40 Q107 30 105 38"/><path d="M130 45 Q128 35 125 42"/>
    </g>
    <path d="M60 48 Q80 32 100 30" fill="{{hairHighlight}}" opacity="0.18"/>
    <path d="M48 58 Q75 52 100 50 Q125 52 152 58" stroke="{{hairShadow}}" stroke-width="1" fill="none" opacity="0.3"/>
  </svg>`,

  undercut_front: `<svg viewBox="0 0 200 200">
    <path d="M50 55 Q60 20 100 15 Q140 20 150 55 L140 60 Q120 35 100 32 Q80 35 60 60 Z" fill="{{hair}}" />
  </svg>`,

  spiky_front: `<svg viewBox="0 0 200 200">
    <path d="M45 55 L55 20 L70 45 L85 15 L100 40 L115 15 L130 45 L145 20 L155 55" fill="{{hair}}" />
    <path d="M55 50 L65 25" stroke="{{hairHighlight}}" stroke-width="3" opacity="0.3" />
  </svg>`,

  // Medium styles
  sidePart_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="sidePartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="30%" style="stop-color:{{hairShadow}}"/>
        <stop offset="35%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hair}}"/>
      </linearGradient>
    </defs>
    <path d="M35 55 Q40 25 70 22 L100 30 Q145 25 160 55 L150 60 Q135 35 100 38 L65 32 Q50 35 45 60 Z" fill="url(#sidePartGrad)" />
    <path d="M68 24 L72 55" stroke="{{hairShadow}}" stroke-width="2" fill="none" opacity="0.35"/>
    <path d="M40 50 Q50 30 68 26" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="0.7" fill="none" opacity="0.2">
      <path d="M50 42 Q52 32 55 40"/><path d="M58 38 Q60 28 62 36"/>
      <path d="M85 38 Q88 30 90 36"/><path d="M110 36 Q112 28 115 34"/>
    </g>
    <path d="M48 42 Q58 28 68 26" fill="{{hairHighlight}}" opacity="0.22" />
    <path d="M42 54 Q55 48 68 50 Q85 45 100 46 Q130 45 158 54" stroke="{{hairShadow}}" stroke-width="1" fill="none" opacity="0.2"/>
  </svg>`,

  slickBack_front: `<svg viewBox="0 0 200 200">
    <path d="M38 58 Q45 30 100 25 Q155 30 162 58 L155 50 Q140 35 100 32 Q60 35 45 50 Z" fill="{{hair}}" />
    <path d="M60 40 Q80 32 100 30" stroke="{{hairHighlight}}" stroke-width="2" fill="none" opacity="0.3" />
  </svg>`,

  quiff_front: `<svg viewBox="0 0 200 200">
    <path d="M40 58 Q50 35 80 15 Q110 25 100 30 Q150 30 160 58" fill="{{hair}}" />
    <path d="M55 45 Q70 20 85 22" fill="{{hairHighlight}}" opacity="0.25" />
  </svg>`,

  pompadour_front: `<svg viewBox="0 0 200 200">
    <path d="M38 60 Q45 40 70 10 Q100 5 130 10 Q155 40 162 60" fill="{{hair}}" />
    <path d="M55 50 Q75 15 100 12" fill="{{hairHighlight}}" opacity="0.2" />
  </svg>`,

  messyMedium_front: `<svg viewBox="0 0 200 200">
    <path d="M35 58 Q40 35 55 25 L75 35 L85 20 L100 32 L115 22 L130 35 L150 28 Q160 40 165 58" fill="{{hair}}" />
  </svg>`,

  curtains_front: `<svg viewBox="0 0 200 200">
    <path d="M35 60 Q40 30 65 20 L90 45 L100 30 L110 45 L135 20 Q160 30 165 60" fill="{{hair}}" />
    <path d="M92 40 L100 32 L108 40" stroke="{{skinShadow}}" stroke-width="1" fill="none" opacity="0.2" />
  </svg>`,

  // Long styles (front portions)
  longStraight_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="longStraightTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="50%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <linearGradient id="longStraightSideGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </linearGradient>
    </defs>
    <path d="M30 55 Q35 25 100 20 Q165 25 170 55 L160 60 L155 45 Q140 30 100 28 Q60 30 45 45 L40 60 Z" fill="url(#longStraightTopGrad)" />
    <path d="M30 60 Q28 100 32 140" stroke="url(#longStraightSideGrad)" stroke-width="22" fill="none" />
    <path d="M170 60 Q172 100 168 140" stroke="url(#longStraightSideGrad)" stroke-width="22" fill="none" />
    <path d="M35 52 Q45 30 100 25 Q155 30 165 52" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="0.8" fill="none" opacity="0.18">
      <path d="M55 45 Q60 32 70 30"/><path d="M80 42 Q85 30 95 28"/>
      <path d="M120 42 Q115 30 105 28"/><path d="M145 45 Q140 32 130 30"/>
    </g>
    <g stroke="{{hairShadow}}" stroke-width="1" fill="none" opacity="0.15">
      <path d="M25 70 Q24 100 27 130"/><path d="M35 68 Q34 100 36 125"/>
      <path d="M175 70 Q176 100 173 130"/><path d="M165 68 Q166 100 164 125"/>
    </g>
    <path d="M50 42 Q70 28 100 25" fill="{{hairHighlight}}" opacity="0.18"/>
    <path d="M32 75 Q30 100 33 120" stroke="{{hairHighlight}}" stroke-width="3" fill="none" opacity="0.12"/>
    <path d="M38 54 Q70 48 100 46 Q130 48 162 54" stroke="{{hairShadow}}" stroke-width="1.5" fill="none" opacity="0.22"/>
  </svg>`,

  longWavy_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="longWavyTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="60%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <linearGradient id="longWavySideGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </linearGradient>
    </defs>
    <path d="M28 55 Q35 25 100 18 Q165 25 172 55 L162 60 L155 42 Q140 28 100 26 Q60 28 45 42 L38 60 Z" fill="url(#longWavyTopGrad)" />
    <path d="M25 60 Q22 90 28 120 Q24 150 30 180" stroke="url(#longWavySideGrad)" stroke-width="22" fill="none" />
    <path d="M175 60 Q178 90 172 120 Q176 150 170 180" stroke="url(#longWavySideGrad)" stroke-width="22" fill="none" />
    <path d="M33 50 Q43 28 100 23 Q157 28 167 50" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="0.8" fill="none" opacity="0.18">
      <path d="M55 42 Q58 30 68 28"/><path d="M82 38 Q85 28 95 26"/>
      <path d="M118 38 Q115 28 105 26"/><path d="M145 42 Q142 30 132 28"/>
    </g>
    <g stroke="{{hairShadow}}" stroke-width="1.2" fill="none" opacity="0.15">
      <path d="M22 75 Q19 105 25 135 Q21 160 28 175"/>
      <path d="M32 72 Q29 100 34 128 Q30 155 36 172"/>
      <path d="M178 75 Q181 105 175 135 Q179 160 172 175"/>
      <path d="M168 72 Q171 100 166 128 Q170 155 164 172"/>
    </g>
    <path d="M48 40 Q68 26 100 23" fill="{{hairHighlight}}" opacity="0.18"/>
    <path d="M27 80 Q24 105 29 125" stroke="{{hairHighlight}}" stroke-width="3" fill="none" opacity="0.12"/>
    <path d="M36 54 Q68 46 100 44 Q132 46 164 54" stroke="{{hairShadow}}" stroke-width="1.5" fill="none" opacity="0.22"/>
  </svg>`,

  longCurly_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="longCurlyTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="70%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <radialGradient id="curlGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.25"/>
        <stop offset="100%" style="stop-color:{{hair}};stop-opacity:0"/>
      </radialGradient>
    </defs>
    <path d="M25 50 Q35 20 100 15 Q165 20 175 50 L165 55 L158 38 Q140 22 100 20 Q60 22 42 38 L35 55 Z" fill="url(#longCurlyTopGrad)" />
    <circle cx="28" cy="80" r="18" fill="{{hair}}" /><circle cx="28" cy="80" r="18" fill="url(#curlGrad)" />
    <circle cx="25" cy="115" r="16" fill="{{hair}}" /><circle cx="25" cy="115" r="16" fill="url(#curlGrad)" />
    <circle cx="28" cy="150" r="18" fill="{{hair}}" /><circle cx="28" cy="150" r="18" fill="url(#curlGrad)" />
    <circle cx="172" cy="80" r="18" fill="{{hair}}" /><circle cx="172" cy="80" r="18" fill="url(#curlGrad)" />
    <circle cx="175" cy="115" r="16" fill="{{hair}}" /><circle cx="175" cy="115" r="16" fill="url(#curlGrad)" />
    <circle cx="172" cy="150" r="18" fill="{{hair}}" /><circle cx="172" cy="150" r="18" fill="url(#curlGrad)" />
    <path d="M30 45 Q40 22 100 18 Q160 22 170 45" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="1" fill="none" opacity="0.2">
      <path d="M22 75 Q18 80 22 85"/><path d="M20 110 Q16 115 20 120"/>
      <path d="M22 145 Q18 150 22 155"/><path d="M178 75 Q182 80 178 85"/>
      <path d="M180 110 Q184 115 180 120"/><path d="M178 145 Q182 150 178 155"/>
    </g>
    <path d="M45 38 Q70 22 100 18" fill="{{hairHighlight}}" opacity="0.2"/>
    <path d="M32 48 Q65 42 100 40 Q135 42 168 48" stroke="{{hairShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>
  </svg>`,

  // Bangs variations
  straightBangs_front: `<svg viewBox="0 0 200 200">
    <path d="M35 55 Q40 25 100 20 Q160 25 165 55 L165 75 L35 75 Z" fill="{{hair}}" />
    <path d="M40 70 L160 70" stroke="{{hairShadow}}" stroke-width="2" opacity="0.3" />
  </svg>`,

  sideBangs_front: `<svg viewBox="0 0 200 200">
    <path d="M30 55 Q35 25 100 20 Q165 25 170 55" fill="{{hair}}" />
    <path d="M30 55 Q35 70 50 85 L80 60 L100 50 Q60 35 40 60 Z" fill="{{hair}}" />
  </svg>`,

  // Covered styles
  hijab_front: `<svg viewBox="0 0 200 200">
    <path d="M25 70 Q25 30 100 25 Q175 30 175 70 Q180 150 100 180 Q20 150 25 70" fill="{{hair}}" />
    <ellipse cx="100" cy="110" rx="65" ry="70" fill="{{skin}}" />
  </svg>`,

  turban_front: `<svg viewBox="0 0 200 200">
    <path d="M30 70 Q30 25 100 20 Q170 25 170 70 Q170 85 100 90 Q30 85 30 70" fill="{{hair}}" />
    <path d="M50 50 Q100 60 150 50" stroke="{{hairShadow}}" stroke-width="3" fill="none" opacity="0.3" />
    <ellipse cx="100" cy="45" rx="15" ry="10" fill="{{hairHighlight}}" opacity="0.2" />
  </svg>`,

  // Curly/textured
  afro_front: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="afroGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </radialGradient>
      <radialGradient id="afroHighlightGrad" cx="30%" cy="20%" r="50%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.3"/>
        <stop offset="100%" style="stop-color:{{hairHighlight}};stop-opacity:0"/>
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="65" rx="80" ry="60" fill="url(#afroGrad)" />
    <ellipse cx="100" cy="65" rx="80" ry="60" fill="url(#afroHighlightGrad)" />
    <ellipse cx="100" cy="90" rx="50" ry="30" fill="{{skin}}" />
    <g fill="{{hairShadow}}" opacity="0.2">
      <circle cx="35" cy="60" r="6"/><circle cx="50" cy="45" r="5"/><circle cx="70" cy="32" r="5"/>
      <circle cx="90" cy="25" r="4"/><circle cx="110" cy="25" r="4"/><circle cx="130" cy="32" r="5"/>
      <circle cx="150" cy="45" r="5"/><circle cx="165" cy="60" r="6"/>
    </g>
    <g fill="{{hairHighlight}}" opacity="0.15">
      <circle cx="45" cy="50" r="8"/><circle cx="65" cy="38" r="6"/>
      <circle cx="85" cy="30" r="5"/><circle cx="155" cy="50" r="8"/>
    </g>
    <path d="M30 70 Q35 55 55 42" stroke="{{hairHighlight}}" stroke-width="2" fill="none" opacity="0.15"/>
  </svg>`,

  afroSmall_front: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="55" rx="65" ry="45" fill="{{hair}}" />
    <ellipse cx="100" cy="80" rx="45" ry="25" fill="{{skin}}" />
  </svg>`,

  coils_front: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="50" rx="70" ry="40" fill="{{hair}}" />
    <ellipse cx="100" cy="75" rx="50" ry="22" fill="{{skin}}" />
    <!-- Coil texture -->
    <g fill="{{hairShadow}}" opacity="0.2">
      <circle cx="50" cy="45" r="5" />
      <circle cx="70" cy="35" r="5" />
      <circle cx="90" cy="30" r="5" />
      <circle cx="110" cy="30" r="5" />
      <circle cx="130" cy="35" r="5" />
      <circle cx="150" cy="45" r="5" />
    </g>
  </svg>`,

  ponytail_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="ponytailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="50%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </linearGradient>
    </defs>
    <path d="M40 55 Q50 28 100 25 Q150 28 160 55 L152 58 L148 42 Q135 30 100 28 Q65 30 52 42 L48 58 Z" fill="url(#ponytailGrad)" />
    <path d="M45 50 Q55 30 100 27 Q145 30 155 50" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="0.8" fill="none" opacity="0.2">
      <path d="M60 42 Q65 32 75 30"/><path d="M85 38 Q90 28 100 27"/>
      <path d="M115 38 Q110 28 100 27"/><path d="M140 42 Q135 32 125 30"/>
    </g>
    <path d="M50 42 Q75 28 100 26" fill="{{hairHighlight}}" opacity="0.2"/>
    <path d="M45 54 Q72 46 100 45 Q128 46 155 54" stroke="{{hairShadow}}" stroke-width="1.5" fill="none" opacity="0.22"/>
  </svg>`,

  bun_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="50%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </linearGradient>
    </defs>
    <path d="M40 55 Q50 28 100 25 Q150 28 160 55 L152 58 L148 42 Q135 30 100 28 Q65 30 52 42 L48 58 Z" fill="url(#bunGrad)" />
    <path d="M45 50 Q55 30 100 27 Q145 30 155 50" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="0.8" fill="none" opacity="0.2">
      <path d="M60 42 Q65 32 75 30"/><path d="M85 38 Q90 28 100 27"/>
      <path d="M115 38 Q110 28 100 27"/><path d="M140 42 Q135 32 125 30"/>
    </g>
    <path d="M50 42 Q75 28 100 26" fill="{{hairHighlight}}" opacity="0.2"/>
    <path d="M45 54 Q72 46 100 45 Q128 46 155 54" stroke="{{hairShadow}}" stroke-width="1.5" fill="none" opacity="0.22"/>
  </svg>`,

  braids_front: `<svg viewBox="0 0 200 200">
    <path d="M40 55 Q50 28 100 25 Q150 28 160 55" fill="{{hair}}" />
  </svg>`,

  locs_front: `<svg viewBox="0 0 200 200">
    <path d="M35 55 Q45 25 100 20 Q155 25 165 55" fill="{{hair}}" />
    <g stroke="{{hair}}" stroke-width="6" fill="none">
      <path d="M40 55 Q38 80 42 100" />
      <path d="M55 50 Q54 75 56 95" />
      <path d="M145 50 Q146 75 144 95" />
      <path d="M160 55 Q162 80 158 100" />
    </g>
  </svg>`,

  // Bob styles
  bobShort_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bobTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="50%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <linearGradient id="bobSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:{{hairShadow}}"/>
        <stop offset="20%" style="stop-color:{{hair}}"/>
        <stop offset="80%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow}}"/>
      </linearGradient>
    </defs>
    <path d="M30 55 Q35 25 100 20 Q165 25 170 55 Q175 100 170 130 L30 130 Q25 100 30 55" fill="url(#bobTopGrad)" />
    <path d="M30 55 Q35 25 100 20 Q165 25 170 55 Q175 100 170 130 L30 130 Q25 100 30 55" fill="url(#bobSideGrad)" opacity="0.5"/>
    <ellipse cx="100" cy="95" rx="55" ry="50" fill="{{skin}}" />
    <path d="M35 50 Q45 28 100 23 Q155 28 165 50" fill="{{hairShadow}}" opacity="0.15"/>
    <g stroke="{{hairShadow}}" stroke-width="0.8" fill="none" opacity="0.18">
      <path d="M55 42 Q60 30 75 28"/><path d="M85 38 Q90 28 100 26"/>
      <path d="M115 38 Q110 28 100 26"/><path d="M145 42 Q140 30 125 28"/>
    </g>
    <g stroke="{{hairShadow}}" stroke-width="1" fill="none" opacity="0.15">
      <path d="M32 70 Q30 95 34 120"/><path d="M38 68 Q36 90 40 115"/>
      <path d="M168 70 Q170 95 166 120"/><path d="M162 68 Q164 90 160 115"/>
    </g>
    <path d="M50 40 Q72 26 100 23" fill="{{hairHighlight}}" opacity="0.2"/>
    <path d="M35 75 Q33 95 36 115" stroke="{{hairHighlight}}" stroke-width="3" fill="none" opacity="0.12"/>
    <path d="M38 54 Q68 46 100 44 Q132 46 162 54" stroke="{{hairShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>
  </svg>`,

  bobLong_front: `<svg viewBox="0 0 200 200">
    <path d="M28 55 Q35 25 100 20 Q165 25 172 55 Q178 120 172 160 L28 160 Q22 120 28 55" fill="{{hair}}" />
    <ellipse cx="100" cy="100" rx="58" ry="55" fill="{{skin}}" />
  </svg>`,

  pixie_front: `<svg viewBox="0 0 200 200">
    <path d="M40 58 Q50 25 100 20 Q155 28 165 58 L155 65 Q140 40 100 35 Q60 40 50 60 Z" fill="{{hair}}" />
    <path d="M40 58 Q35 75 45 90" stroke="{{hair}}" stroke-width="15" fill="none" />
  </svg>`,

  // === ENHANCED BASIC STYLES (Task 7) ===

  /**
   * SHORT - Generic short hairstyle with strand texture and volume shading
   * Features: strand texture hints, volume shading darker at roots, highlight on top
   */
  short_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="shortTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow2}}"/>
        <stop offset="35%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow1}}"/>
      </linearGradient>
      <linearGradient id="shortHighlightGrad" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.4"/>
        <stop offset="100%" style="stop-color:{{hairHighlight}};stop-opacity:0"/>
      </linearGradient>
    </defs>
    <!-- Main hair mass with volume gradient -->
    <path d="M38 58 Q48 26 100 22 Q152 26 162 58 L155 62 Q148 38 100 34 Q52 38 45 62 Z" fill="url(#shortTopGrad)"/>
    <!-- Root shadow layer for depth -->
    <path d="M42 54 Q52 30 100 26 Q148 30 158 54" fill="{{hairShadow2}}" opacity="0.2"/>
    <!-- Strand texture hints - subtle lines suggesting hair direction -->
    <g stroke="{{hairShadow1}}" stroke-width="0.6" fill="none" opacity="0.25">
      <path d="M55 48 Q58 36 62 32"/>
      <path d="M65 44 Q68 34 72 30"/>
      <path d="M78 42 Q82 32 86 28"/>
      <path d="M92 40 Q96 30 100 27"/>
      <path d="M108 40 Q104 30 100 27"/>
      <path d="M122 42 Q118 32 114 28"/>
      <path d="M135 44 Q132 34 128 30"/>
      <path d="M145 48 Q142 36 138 32"/>
    </g>
    <!-- Volume shading - darker toward sides -->
    <path d="M40 56 Q45 42 50 36" fill="{{hairShadow2}}" opacity="0.15"/>
    <path d="M160 56 Q155 42 150 36" fill="{{hairShadow2}}" opacity="0.15"/>
    <!-- Top surface highlight -->
    <path d="M55 42 Q78 28 100 26 Q105 28 110 30" fill="url(#shortHighlightGrad)"/>
    <!-- Hairline definition -->
    <path d="M42 56 Q70 50 100 48 Q130 50 158 56" stroke="{{hairShadow1}}" stroke-width="1.2" fill="none" opacity="0.3"/>
  </svg>`,

  /**
   * MEDIUM - Generic medium length hairstyle with layered strands and flow direction
   * Features: layered strands, flow direction indicators, volume at crown
   */
  medium_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="medTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow2}}"/>
        <stop offset="40%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <linearGradient id="medSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:{{hairShadow1}}"/>
        <stop offset="15%" style="stop-color:{{hair}}"/>
        <stop offset="85%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow1}}"/>
      </linearGradient>
      <linearGradient id="medHighlightGrad" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.35"/>
        <stop offset="100%" style="stop-color:{{hairHighlight}};stop-opacity:0"/>
      </linearGradient>
    </defs>
    <!-- Main hair mass - crown and top -->
    <path d="M32 58 Q40 24 100 18 Q160 24 168 58 L160 62 L155 45 Q145 28 100 24 Q55 28 45 45 L40 62 Z" fill="url(#medTopGrad)"/>
    <!-- Side layers that frame face -->
    <path d="M32 62 Q28 95 34 125 L48 125 Q42 95 45 65" fill="url(#medSideGrad)"/>
    <path d="M168 62 Q172 95 166 125 L152 125 Q158 95 155 65" fill="url(#medSideGrad)"/>
    <!-- Root shadow for depth -->
    <path d="M38 52 Q48 26 100 22 Q152 26 162 52" fill="{{hairShadow2}}" opacity="0.18"/>
    <!-- Layered strand texture - flow direction from crown -->
    <g stroke="{{hairShadow1}}" stroke-width="0.7" fill="none" opacity="0.22">
      <!-- Top strands -->
      <path d="M55 45 Q60 32 68 28"/>
      <path d="M72 42 Q78 30 85 26"/>
      <path d="M90 38 Q95 28 100 24"/>
      <path d="M110 38 Q105 28 100 24"/>
      <path d="M128 42 Q122 30 115 26"/>
      <path d="M145 45 Q140 32 132 28"/>
      <!-- Side strands showing flow -->
      <path d="M35 75 Q32 95 36 115"/>
      <path d="M42 72 Q40 92 43 112"/>
      <path d="M165 75 Q168 95 164 115"/>
      <path d="M158 72 Q160 92 157 112"/>
    </g>
    <!-- Volume shading at sides -->
    <path d="M34 65 Q30 85 35 105" fill="{{hairShadow2}}" opacity="0.12"/>
    <path d="M166 65 Q170 85 165 105" fill="{{hairShadow2}}" opacity="0.12"/>
    <!-- Crown highlight -->
    <path d="M50 40 Q75 24 100 22 Q108 24 115 28" fill="url(#medHighlightGrad)"/>
    <!-- Side highlights -->
    <path d="M38 75 Q35 90 38 105" stroke="{{hairHighlight}}" stroke-width="2.5" fill="none" opacity="0.12"/>
    <!-- Hairline definition -->
    <path d="M38 56 Q68 48 100 46 Q132 48 162 56" stroke="{{hairShadow1}}" stroke-width="1.5" fill="none" opacity="0.25"/>
  </svg>`,

  /**
   * LONG - Generic long hairstyle with strand groups and shine highlights
   * Features: strand groups, multiple shine highlights, layered depth
   */
  long_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="longTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow2}}"/>
        <stop offset="45%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <linearGradient id="longSideGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="60%" style="stop-color:{{hairShadow1}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow2}}"/>
      </linearGradient>
      <linearGradient id="longShineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.5"/>
        <stop offset="50%" style="stop-color:{{hairHighlight}};stop-opacity:0.2"/>
        <stop offset="100%" style="stop-color:{{hairHighlight}};stop-opacity:0"/>
      </linearGradient>
    </defs>
    <!-- Main crown mass -->
    <path d="M28 55 Q35 22 100 16 Q165 22 172 55 L165 60 L158 40 Q145 25 100 22 Q55 25 42 40 L35 60 Z" fill="url(#longTopGrad)"/>
    <!-- Long side panels -->
    <path d="M25 60 Q20 110 28 160 Q30 180 40 190 L52 188 Q42 175 40 155 Q35 110 38 62" fill="url(#longSideGrad)"/>
    <path d="M175 60 Q180 110 172 160 Q170 180 160 190 L148 188 Q158 175 160 155 Q165 110 162 62" fill="url(#longSideGrad)"/>
    <!-- Root shadow layer -->
    <path d="M32 50 Q42 24 100 20 Q158 24 168 50" fill="{{hairShadow2}}" opacity="0.2"/>
    <!-- Strand groups - creating visible hair sections -->
    <g stroke="{{hairShadow1}}" stroke-width="0.8" fill="none" opacity="0.2">
      <!-- Crown strands -->
      <path d="M52 42 Q58 30 68 26"/>
      <path d="M75 38 Q82 28 92 24"/>
      <path d="M100 36 Q100 28 100 22"/>
      <path d="M125 38 Q118 28 108 24"/>
      <path d="M148 42 Q142 30 132 26"/>
      <!-- Long side strands showing length -->
      <path d="M28 75 Q24 115 30 155 Q28 175 36 185"/>
      <path d="M36 72 Q32 110 38 150 Q36 170 44 182"/>
      <path d="M44 70 Q40 108 45 145 Q43 165 50 178"/>
      <path d="M172 75 Q176 115 170 155 Q172 175 164 185"/>
      <path d="M164 72 Q168 110 162 150 Q164 170 156 182"/>
      <path d="M156 70 Q160 108 155 145 Q157 165 150 178"/>
    </g>
    <!-- Strand group shadows for depth -->
    <path d="M30 80 Q26 120 32 160" fill="{{hairShadow2}}" opacity="0.1"/>
    <path d="M170 80 Q174 120 168 160" fill="{{hairShadow2}}" opacity="0.1"/>
    <!-- Primary shine highlight on crown -->
    <path d="M48 38 Q72 22 100 20 Q110 22 118 26" fill="url(#longShineGrad)"/>
    <!-- Secondary shine on sides -->
    <path d="M30 85 Q27 115 32 145" stroke="{{hairHighlight}}" stroke-width="3" fill="none" opacity="0.15"/>
    <path d="M170 85 Q173 115 168 145" stroke="{{hairHighlight}}" stroke-width="3" fill="none" opacity="0.15"/>
    <!-- Hairline definition -->
    <path d="M35 54 Q65 46 100 44 Q135 46 165 54" stroke="{{hairShadow1}}" stroke-width="1.5" fill="none" opacity="0.25"/>
  </svg>`,

  /**
   * CURLY - Generic curly hairstyle with curl definition and volume depth
   * Features: defined curls, volume depth gradients, textured appearance
   */
  curly_front: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="curlyMainGrad" cx="50%" cy="25%" r="75%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="70%" style="stop-color:{{hairShadow1}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow2}}"/>
      </radialGradient>
      <radialGradient id="curlHighlightGrad" cx="40%" cy="30%" r="60%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.35"/>
        <stop offset="100%" style="stop-color:{{hairHighlight}};stop-opacity:0"/>
      </radialGradient>
      <radialGradient id="singleCurlGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.25"/>
        <stop offset="100%" style="stop-color:{{hair}};stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- Main voluminous mass -->
    <path d="M22 55 Q28 18 100 12 Q172 18 178 55 Q185 95 175 125 L25 125 Q15 95 22 55" fill="url(#curlyMainGrad)"/>
    <!-- Face cutout -->
    <ellipse cx="100" cy="100" rx="52" ry="45" fill="{{skin}}"/>
    <!-- Curl definitions - irregular circular shapes for texture -->
    <g fill="{{hair}}">
      <!-- Top curls -->
      <circle cx="45" cy="40" r="14"/>
      <circle cx="70" cy="30" r="12"/>
      <circle cx="95" cy="25" r="10"/>
      <circle cx="120" cy="28" r="11"/>
      <circle cx="145" cy="35" r="13"/>
      <circle cx="165" cy="48" r="12"/>
      <!-- Side curls -->
      <circle cx="30" cy="65" r="13"/>
      <circle cx="28" cy="90" r="11"/>
      <circle cx="32" cy="115" r="12"/>
      <circle cx="170" cy="65" r="13"/>
      <circle cx="172" cy="90" r="11"/>
      <circle cx="168" cy="115" r="12"/>
    </g>
    <!-- Curl depth shadows -->
    <g fill="{{hairShadow2}}" opacity="0.25">
      <circle cx="47" cy="42" r="8"/>
      <circle cx="72" cy="32" r="6"/>
      <circle cx="122" cy="30" r="6"/>
      <circle cx="147" cy="37" r="7"/>
      <circle cx="32" cy="67" r="7"/>
      <circle cx="30" cy="92" r="6"/>
      <circle cx="168" cy="67" r="7"/>
      <circle cx="170" cy="92" r="6"/>
    </g>
    <!-- Curl highlight reflections -->
    <g fill="url(#singleCurlGrad)">
      <circle cx="43" cy="38" r="10"/>
      <circle cx="68" cy="28" r="8"/>
      <circle cx="143" cy="33" r="9"/>
      <circle cx="28" cy="63" r="9"/>
      <circle cx="172" cy="63" r="9"/>
    </g>
    <!-- Volume depth at sides -->
    <path d="M24 60 Q20 85 26 110" fill="{{hairShadow2}}" opacity="0.15"/>
    <path d="M176 60 Q180 85 174 110" fill="{{hairShadow2}}" opacity="0.15"/>
    <!-- Overall top highlight -->
    <ellipse cx="85" cy="35" rx="35" ry="18" fill="url(#curlHighlightGrad)"/>
  </svg>`,

  /**
   * WAVY - Generic wavy hairstyle with wave patterns and strand separation
   * Features: flowing wave patterns, strand separation, natural movement
   */
  wavy_front: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="wavyTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairShadow2}}"/>
        <stop offset="50%" style="stop-color:{{hair}}"/>
        <stop offset="100%" style="stop-color:{{hair}}"/>
      </linearGradient>
      <linearGradient id="wavySideGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{hair}}"/>
        <stop offset="50%" style="stop-color:{{hairShadow1}}"/>
        <stop offset="100%" style="stop-color:{{hairShadow2}}"/>
      </linearGradient>
      <linearGradient id="wavyShineGrad" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" style="stop-color:{{hairHighlight}};stop-opacity:0.4"/>
        <stop offset="100%" style="stop-color:{{hairHighlight}};stop-opacity:0"/>
      </linearGradient>
    </defs>
    <!-- Main crown -->
    <path d="M26 55 Q32 20 100 14 Q168 20 174 55 L168 60 L160 38 Q145 24 100 20 Q55 24 40 38 L32 60 Z" fill="url(#wavyTopGrad)"/>
    <!-- Wavy side panels with S-curve shapes -->
    <path d="M22 60 Q18 90 26 120 Q20 150 30 175 Q35 190 48 195 L58 192 Q48 182 44 168 Q36 145 42 118 Q34 88 38 62" fill="url(#wavySideGrad)"/>
    <path d="M178 60 Q182 90 174 120 Q180 150 170 175 Q165 190 152 195 L142 192 Q152 182 156 168 Q164 145 158 118 Q166 88 162 62" fill="url(#wavySideGrad)"/>
    <!-- Root shadow -->
    <path d="M30 50 Q40 22 100 18 Q160 22 170 50" fill="{{hairShadow2}}" opacity="0.2"/>
    <!-- Wave pattern strands - S-curves showing wave direction -->
    <g stroke="{{hairShadow1}}" stroke-width="0.9" fill="none" opacity="0.22">
      <!-- Crown wave strands -->
      <path d="M50 45 Q56 32 64 28"/>
      <path d="M72 40 Q80 28 90 24"/>
      <path d="M100 36 Q100 28 100 20"/>
      <path d="M128 40 Q120 28 110 24"/>
      <path d="M150 45 Q144 32 136 28"/>
      <!-- Wave pattern on sides - S-curves -->
      <path d="M25 75 Q22 95 28 115 Q24 140 32 165 Q30 180 38 188"/>
      <path d="M34 72 Q30 92 36 112 Q32 135 40 158 Q38 175 46 185"/>
      <path d="M42 70 Q38 88 44 108 Q40 130 48 152 Q46 168 54 180"/>
      <path d="M175 75 Q178 95 172 115 Q176 140 168 165 Q170 180 162 188"/>
      <path d="M166 72 Q170 92 164 112 Q168 135 160 158 Q162 175 154 185"/>
      <path d="M158 70 Q162 88 156 108 Q160 130 152 152 Q154 168 146 180"/>
    </g>
    <!-- Wave shadow depth -->
    <path d="M24 85 Q20 110 26 135 Q22 160 30 180" fill="{{hairShadow2}}" opacity="0.12"/>
    <path d="M176 85 Q180 110 174 135 Q178 160 170 180" fill="{{hairShadow2}}" opacity="0.12"/>
    <!-- Strand separation highlights -->
    <g stroke="{{hairHighlight}}" stroke-width="2" fill="none" opacity="0.12">
      <path d="M30 80 Q26 105 32 130 Q28 155 36 175"/>
      <path d="M170 80 Q174 105 168 130 Q172 155 164 175"/>
    </g>
    <!-- Crown shine highlight -->
    <path d="M48 38 Q70 22 100 18 Q112 22 120 28" fill="url(#wavyShineGrad)"/>
    <!-- Wave crest highlights -->
    <path d="M26 95 Q24 102 28 108" stroke="{{hairHighlight}}" stroke-width="2.5" fill="none" opacity="0.15"/>
    <path d="M28 145 Q26 152 30 158" stroke="{{hairHighlight}}" stroke-width="2.5" fill="none" opacity="0.15"/>
    <path d="M174 95 Q176 102 172 108" stroke="{{hairHighlight}}" stroke-width="2.5" fill="none" opacity="0.15"/>
    <path d="M172 145 Q174 152 170 158" stroke="{{hairHighlight}}" stroke-width="2.5" fill="none" opacity="0.15"/>
    <!-- Hairline definition -->
    <path d="M34 54 Q65 46 100 44 Q135 46 166 54" stroke="{{hairShadow1}}" stroke-width="1.5" fill="none" opacity="0.25"/>
  </svg>`,
};

export default { hairBack, hairFront };
