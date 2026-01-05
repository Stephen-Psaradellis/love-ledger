/**
 * Accessory SVG Assets
 *
 * Glasses, headwear, and other accessories.
 * Uses color tokens: {{glassesFrame}}, {{glassesLens}}, {{headwear}}, {{headwearShadow}}, {{headwearHighlight}}
 */

export const glasses = {
  none: `<svg viewBox="0 0 200 200"></svg>`,

  reading: `<svg viewBox="0 0 200 200">
    <!-- Left lens -->
    <g>
      <!-- Frame shadow -->
      <rect x="35" y="81" width="45" height="28" rx="4" fill="none" stroke="#000000" stroke-width="1" opacity="0.15"/>
      <rect x="35" y="80" width="45" height="28" rx="4" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="3"/>
      <!-- Inner highlight -->
      <rect x="37" y="82" width="41" height="24" rx="3" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.2"/>
      <!-- Lens reflection -->
      <path d="M42 86 L62 88" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.25"/>
      <path d="M44 90 L50 91" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" opacity="0.15"/>
    </g>
    <!-- Right lens -->
    <g>
      <rect x="120" y="81" width="45" height="28" rx="4" fill="none" stroke="#000000" stroke-width="1" opacity="0.15"/>
      <rect x="120" y="80" width="45" height="28" rx="4" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="3"/>
      <rect x="122" y="82" width="41" height="24" rx="3" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.2"/>
      <path d="M127 86 L147 88" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.25"/>
      <path d="M129 90 L135 91" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" opacity="0.15"/>
    </g>
    <!-- Nose bridge with pads -->
    <path d="M80 92 Q100 86 120 92" stroke="{{glassesFrame}}" stroke-width="3" fill="none"/>
    <ellipse cx="82" cy="96" rx="3" ry="4" fill="{{glassesFrame}}" opacity="0.6"/>
    <ellipse cx="118" cy="96" rx="3" ry="4" fill="{{glassesFrame}}" opacity="0.6"/>
    <!-- Temple arms -->
    <path d="M35 88 L22 86 L18 87" stroke="{{glassesFrame}}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M165 88 L178 86 L182 87" stroke="{{glassesFrame}}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Hinge detail -->
    <circle cx="35" cy="88" r="2" fill="{{glassesFrame}}" stroke="#000000" stroke-width="0.3" opacity="0.4"/>
    <circle cx="165" cy="88" r="2" fill="{{glassesFrame}}" stroke="#000000" stroke-width="0.3" opacity="0.4"/>
  </svg>`,

  round: `<svg viewBox="0 0 200 200">
    <!-- Left lens -->
    <g>
      <circle cx="58" cy="93" r="22" fill="none" stroke="#000000" stroke-width="1" opacity="0.12"/>
      <circle cx="58" cy="92" r="22" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="3"/>
      <circle cx="58" cy="92" r="19" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.2"/>
      <!-- Reflection arc -->
      <path d="M45 82 Q52 78 62 82" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.3"/>
      <path d="M48 86 Q52 84 56 86" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.2"/>
    </g>
    <!-- Right lens -->
    <g>
      <circle cx="142" cy="93" r="22" fill="none" stroke="#000000" stroke-width="1" opacity="0.12"/>
      <circle cx="142" cy="92" r="22" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="3"/>
      <circle cx="142" cy="92" r="19" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.2"/>
      <path d="M129 82 Q136 78 146 82" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.3"/>
      <path d="M132 86 Q136 84 140 86" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.2"/>
    </g>
    <!-- Nose bridge -->
    <path d="M80 90 Q100 82 120 90" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none"/>
    <ellipse cx="82" cy="95" rx="2.5" ry="4" fill="{{glassesFrame}}" opacity="0.5"/>
    <ellipse cx="118" cy="95" rx="2.5" ry="4" fill="{{glassesFrame}}" opacity="0.5"/>
    <!-- Temple arms -->
    <path d="M36 88 L22 84 L16 86" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M164 88 L178 84 L184 86" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="37" cy="88" r="1.5" fill="#888888" opacity="0.5"/>
    <circle cx="163" cy="88" r="1.5" fill="#888888" opacity="0.5"/>
  </svg>`,

  square: `<svg viewBox="0 0 200 200">
    <!-- Left lens -->
    <g>
      <rect x="32" y="79" width="50" height="32" rx="2" fill="none" stroke="#000000" stroke-width="1" opacity="0.15"/>
      <rect x="32" y="78" width="50" height="32" rx="2" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="3"/>
      <rect x="34" y="80" width="46" height="28" rx="1" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.15"/>
      <path d="M38 84 L65 86" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
      <path d="M40 88 L52 89" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.15"/>
    </g>
    <!-- Right lens -->
    <g>
      <rect x="118" y="79" width="50" height="32" rx="2" fill="none" stroke="#000000" stroke-width="1" opacity="0.15"/>
      <rect x="118" y="78" width="50" height="32" rx="2" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="3"/>
      <rect x="120" y="80" width="46" height="28" rx="1" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.15"/>
      <path d="M124 84 L151 86" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
      <path d="M126 88 L138 89" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.15"/>
    </g>
    <!-- Bridge -->
    <path d="M82 92 L118 92" stroke="{{glassesFrame}}" stroke-width="3"/>
    <path d="M84 94 L116 94" stroke="#000000" stroke-width="1" opacity="0.1"/>
    <rect x="84" y="94" width="4" height="6" rx="1" fill="{{glassesFrame}}" opacity="0.5"/>
    <rect x="112" y="94" width="4" height="6" rx="1" fill="{{glassesFrame}}" opacity="0.5"/>
    <!-- Temple arms -->
    <path d="M32 88 L20 85 L14 87" stroke="{{glassesFrame}}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M168 88 L180 85 L186 87" stroke="{{glassesFrame}}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="30" y="86" width="4" height="4" rx="0.5" fill="{{glassesFrame}}" stroke="#000000" stroke-width="0.3" opacity="0.5"/>
    <rect x="166" y="86" width="4" height="4" rx="0.5" fill="{{glassesFrame}}" stroke="#000000" stroke-width="0.3" opacity="0.5"/>
  </svg>`,

  aviator: `<svg viewBox="0 0 200 200">
    <!-- Left lens -->
    <g>
      <path d="M32 83 Q32 76 42 76 L75 76 Q85 76 85 86 L85 101 Q85 113 72 113 L45 113 Q32 113 32 101 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.12"/>
      <path d="M32 82 Q32 75 42 75 L75 75 Q85 75 85 85 L85 100 Q85 112 72 112 L45 112 Q32 112 32 100 Z" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="2.5"/>
      <path d="M35 84 Q35 78 44 78 L73 78 Q82 78 82 87 L82 98 Q82 109 70 109 L47 109 Q35 109 35 98 Z" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.15"/>
      <path d="M40 82 Q55 78 70 82" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.25"/>
      <path d="M42 86 L55 87" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.15"/>
    </g>
    <!-- Right lens -->
    <g>
      <path d="M115 83 Q115 76 125 76 L158 76 Q168 76 168 86 L168 101 Q168 113 155 113 L128 113 Q115 113 115 101 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.12"/>
      <path d="M115 82 Q115 75 125 75 L158 75 Q168 75 168 85 L168 100 Q168 112 155 112 L128 112 Q115 112 115 100 Z" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="2.5"/>
      <path d="M118 84 Q118 78 127 78 L156 78 Q165 78 165 87 L165 98 Q165 109 153 109 L130 109 Q118 109 118 98 Z" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.15"/>
      <path d="M123 82 Q138 78 153 82" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.25"/>
      <path d="M125 86 L138 87" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.15"/>
    </g>
    <!-- Double bridge -->
    <path d="M85 88 Q100 80 115 88" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none"/>
    <path d="M85 95 Q100 88 115 95" stroke="{{glassesFrame}}" stroke-width="2" fill="none"/>
    <line x1="100" y1="84" x2="100" y2="92" stroke="{{glassesFrame}}" stroke-width="1.5"/>
    <ellipse cx="87" cy="98" rx="2" ry="5" fill="{{glassesFrame}}" opacity="0.4"/>
    <ellipse cx="113" cy="98" rx="2" ry="5" fill="{{glassesFrame}}" opacity="0.4"/>
    <!-- Temple arms -->
    <path d="M32 82 L22 80 L14 82 L10 85" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M168 82 L178 80 L186 82 L190 85" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="82" r="2" fill="#AAAAAA" opacity="0.5"/>
    <circle cx="168" cy="82" r="2" fill="#AAAAAA" opacity="0.5"/>
  </svg>`,

  cat: `<svg viewBox="0 0 200 200">
    <!-- Left lens -->
    <g>
      <path d="M30 91 L30 106 Q30 116 45 116 L72 116 Q85 116 85 103 L85 86 Q85 76 72 79 L45 83 Q30 85 30 91 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.12"/>
      <path d="M30 90 L30 105 Q30 115 45 115 L72 115 Q85 115 85 102 L85 85 Q85 75 72 78 L45 82 Q30 84 30 90 Z" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="2.5"/>
      <path d="M33 91 L33 103 Q33 112 46 112 L70 112 Q82 112 82 100 L82 87 Q82 79 70 81 L46 84 Q33 86 33 91 Z" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.15"/>
      <path d="M38 86 L60 88" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <path d="M40 90 L50 91" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.2"/>
    </g>
    <!-- Right lens -->
    <g>
      <path d="M170 91 L170 106 Q170 116 155 116 L128 116 Q115 116 115 103 L115 86 Q115 76 128 79 L155 83 Q170 85 170 91 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.12"/>
      <path d="M170 90 L170 105 Q170 115 155 115 L128 115 Q115 115 115 102 L115 85 Q115 75 128 78 L155 82 Q170 84 170 90 Z" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="2.5"/>
      <path d="M167 91 L167 103 Q167 112 154 112 L130 112 Q118 112 118 100 L118 87 Q118 79 130 81 L154 84 Q167 86 167 91 Z" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.15"/>
      <path d="M140 86 L162 88" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <path d="M150 90 L160 91" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.2"/>
    </g>
    <!-- Pointed corners -->
    <path d="M30 84 L22 75 L20 73" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M170 84 L178 75 L180 73" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="20" cy="73" r="2" fill="{{glassesFrame}}"/>
    <circle cx="180" cy="73" r="2" fill="{{glassesFrame}}"/>
    <!-- Bridge -->
    <path d="M85 92 Q100 86 115 92" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none"/>
    <ellipse cx="87" cy="97" rx="2.5" ry="4" fill="{{glassesFrame}}" opacity="0.5"/>
    <ellipse cx="113" cy="97" rx="2.5" ry="4" fill="{{glassesFrame}}" opacity="0.5"/>
    <!-- Temple arms -->
    <path d="M30 98 L18 96 L12 98" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M170 98 L182 96 L188 98" stroke="{{glassesFrame}}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  sunglasses: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="sunglassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2A2A2A"/>
        <stop offset="40%" stop-color="#1A1A1A"/>
        <stop offset="100%" stop-color="#0A0A0A"/>
      </linearGradient>
    </defs>
    <!-- Left lens -->
    <g>
      <path d="M28 83 Q28 73 45 73 L78 73 Q90 73 90 86 L90 103 Q90 116 75 116 L42 116 Q28 116 28 101 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.2"/>
      <path d="M28 82 Q28 72 45 72 L78 72 Q90 72 90 85 L90 102 Q90 115 75 115 L42 115 Q28 115 28 100 Z" fill="url(#sunglassGradient)" stroke="{{glassesFrame}}" stroke-width="2.5"/>
      <path d="M31 84 Q31 75 47 75 L76 75 Q87 75 87 87 L87 100 Q87 112 73 112 L44 112 Q31 112 31 98 Z" fill="none" stroke="#333333" stroke-width="0.5" opacity="0.5"/>
      <path d="M38 80 Q55 76 72 80" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.2"/>
      <path d="M40 85 L55 86" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.12"/>
    </g>
    <!-- Right lens -->
    <g>
      <path d="M110 83 Q110 73 122 73 L155 73 Q172 73 172 86 L172 103 Q172 116 158 116 L125 116 Q110 116 110 101 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.2"/>
      <path d="M110 82 Q110 72 122 72 L155 72 Q172 72 172 85 L172 102 Q172 115 158 115 L125 115 Q110 115 110 100 Z" fill="url(#sunglassGradient)" stroke="{{glassesFrame}}" stroke-width="2.5"/>
      <path d="M113 84 Q113 75 124 75 L153 75 Q169 75 169 87 L169 100 Q169 112 156 112 L127 112 Q113 112 113 98 Z" fill="none" stroke="#333333" stroke-width="0.5" opacity="0.5"/>
      <path d="M120 80 Q137 76 154 80" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.2"/>
      <path d="M122 85 L137 86" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.12"/>
    </g>
    <!-- Bridge -->
    <path d="M90 90 Q100 83 110 90" stroke="{{glassesFrame}}" stroke-width="3" fill="none"/>
    <path d="M92 92 Q100 86 108 92" stroke="#000000" stroke-width="1" fill="none" opacity="0.15"/>
    <ellipse cx="92" cy="96" rx="2" ry="4" fill="{{glassesFrame}}" opacity="0.4"/>
    <ellipse cx="108" cy="96" rx="2" ry="4" fill="{{glassesFrame}}" opacity="0.4"/>
    <!-- Temple arms -->
    <path d="M28 82 L18 78 L10 80" stroke="{{glassesFrame}}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M172 82 L182 78 L190 80" stroke="{{glassesFrame}}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M28 82 L22 80" stroke="#000000" stroke-width="1" opacity="0.15"/>
    <path d="M172 82 L178 80" stroke="#000000" stroke-width="1" opacity="0.15"/>
  </svg>`,

  aviatorSun: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="aviatorSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#3D3D3D"/>
        <stop offset="30%" stop-color="#2D2D2D"/>
        <stop offset="100%" stop-color="#1A1A1A"/>
      </linearGradient>
    </defs>
    <!-- Left lens -->
    <g>
      <path d="M28 81 Q28 71 42 71 L78 71 Q92 71 92 83 L92 103 Q92 119 75 119 L42 119 Q28 119 28 103 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.15"/>
      <path d="M28 80 Q28 70 42 70 L78 70 Q92 70 92 82 L92 102 Q92 118 75 118 L42 118 Q28 118 28 102 Z" fill="url(#aviatorSunGrad)" stroke="#C0A060" stroke-width="2.5"/>
      <path d="M31 82 Q31 73 44 73 L76 73 Q89 73 89 84 L89 100 Q89 115 73 115 L44 115 Q31 115 31 100 Z" fill="none" stroke="#D4B370" stroke-width="0.5" opacity="0.3"/>
      <path d="M36 78 Q55 72 72 78" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.18"/>
      <path d="M38 83 L52 84" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.1"/>
    </g>
    <!-- Right lens -->
    <g>
      <path d="M108 81 Q108 71 122 71 L158 71 Q172 71 172 83 L172 103 Q172 119 155 119 L122 119 Q108 119 108 103 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.15"/>
      <path d="M108 80 Q108 70 122 70 L158 70 Q172 70 172 82 L172 102 Q172 118 155 118 L122 118 Q108 118 108 102 Z" fill="url(#aviatorSunGrad)" stroke="#C0A060" stroke-width="2.5"/>
      <path d="M111 82 Q111 73 124 73 L156 73 Q169 73 169 84 L169 100 Q169 115 153 115 L124 115 Q111 115 111 100 Z" fill="none" stroke="#D4B370" stroke-width="0.5" opacity="0.3"/>
      <path d="M118 78 Q137 72 154 78" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.18"/>
      <path d="M120 83 L134 84" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.1"/>
    </g>
    <!-- Gold double bridge -->
    <path d="M92 88 Q100 80 108 88" stroke="#C0A060" stroke-width="2.5" fill="none"/>
    <path d="M92 95 Q100 88 108 95" stroke="#C0A060" stroke-width="2" fill="none"/>
    <line x1="100" y1="84" x2="100" y2="92" stroke="#C0A060" stroke-width="1.5"/>
    <ellipse cx="94" cy="100" rx="2" ry="4" fill="#C0A060" opacity="0.5"/>
    <ellipse cx="106" cy="100" rx="2" ry="4" fill="#C0A060" opacity="0.5"/>
    <!-- Temple arms -->
    <path d="M28 80 L18 76 L10 78" stroke="#C0A060" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M172 80 L182 76 L190 78" stroke="#C0A060" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M28 80 L22 78" stroke="#D4B370" stroke-width="1" opacity="0.4"/>
    <path d="M172 80 L178 78" stroke="#D4B370" stroke-width="1" opacity="0.4"/>
  </svg>`,

  sport: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="sportLensGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.15"/>
        <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.05"/>
        <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.15"/>
      </linearGradient>
    </defs>
    <!-- Wraparound lens -->
    <path d="M20 89 Q20 79 40 79 L160 79 Q180 79 180 89 L180 99 Q180 109 160 109 L40 109 Q20 109 20 99 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.15"/>
    <path d="M20 88 Q20 78 40 78 L160 78 Q180 78 180 88 L180 98 Q180 108 160 108 L40 108 Q20 108 20 98 Z" fill="{{glassesLens}}" stroke="{{glassesFrame}}" stroke-width="2.5"/>
    <path d="M24 86 Q24 80 42 80 L158 80 Q176 80 176 86 L176 96 Q176 104 158 104 L42 104 Q24 104 24 96 Z" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.12"/>
    <!-- Nose bridge cutout -->
    <path d="M90 90 Q100 102 110 90" fill="{{skin}}" stroke="{{glassesFrame}}" stroke-width="1"/>
    <!-- Gradient overlay -->
    <path d="M20 88 Q20 78 40 78 L160 78 Q180 78 180 88 L180 98 Q180 108 160 108 L40 108 Q20 108 20 98 Z" fill="url(#sportLensGrad)"/>
    <!-- Lens shine -->
    <path d="M30 82 Q60 78 90 82" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.2"/>
    <path d="M110 82 Q140 78 170 82" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.2"/>
    <!-- Ventilation holes -->
    <circle cx="45" cy="88" r="1.5" fill="{{glassesFrame}}" opacity="0.3"/>
    <circle cx="55" cy="88" r="1.5" fill="{{glassesFrame}}" opacity="0.3"/>
    <circle cx="145" cy="88" r="1.5" fill="{{glassesFrame}}" opacity="0.3"/>
    <circle cx="155" cy="88" r="1.5" fill="{{glassesFrame}}" opacity="0.3"/>
    <!-- Temple arms -->
    <path d="M20 88 L12 85 L6 87" stroke="{{glassesFrame}}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M180 88 L188 85 L194 87" stroke="{{glassesFrame}}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <line x1="8" y1="85" x2="8" y2="88" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
    <line x1="10" y1="85" x2="10" y2="88" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
    <line x1="190" y1="85" x2="190" y2="88" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
    <line x1="192" y1="85" x2="192" y2="88" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
  </svg>`,
};

export const headwear = {
  none: `<svg viewBox="0 0 200 200"></svg>`,

  cap: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.15"/>
        <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Cap dome -->
    <path d="M30 65 Q30 25 100 20 Q170 25 170 65 L170 72 Q140 78 100 78 Q60 78 30 72 Z" fill="{{headwear}}"/>
    <path d="M30 65 Q30 25 100 20 Q170 25 170 65 L170 72 Q140 78 100 78 Q60 78 30 72 Z" fill="url(#capGradient)"/>
    <!-- Panel seams -->
    <path d="M100 20 L100 75" stroke="#000000" stroke-width="0.8" opacity="0.12"/>
    <path d="M65 25 Q65 50 60 75" stroke="#000000" stroke-width="0.5" opacity="0.08"/>
    <path d="M135 25 Q135 50 140 75" stroke="#000000" stroke-width="0.5" opacity="0.08"/>
    <!-- Brim -->
    <path d="M25 68 Q25 65 35 62 L90 55 Q100 58 95 68 Q85 78 70 80 Q40 80 25 68" fill="{{headwear}}"/>
    <!-- Brim underside shadow -->
    <path d="M27 70 Q30 68 38 66 L88 58 Q95 62 93 70" fill="#000000" opacity="0.25"/>
    <!-- Brim stitch -->
    <path d="M28 68 Q45 64 65 60 M75 58 L85 57" stroke="#000000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.15"/>
    <!-- Button on top -->
    <circle cx="100" cy="22" r="5" fill="{{headwear}}"/>
    <circle cx="100" cy="22" r="4" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
    <circle cx="100" cy="22" r="2" fill="#000000" opacity="0.15"/>
    <!-- Crown highlight -->
    <path d="M70 35 Q100 30 130 35" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.1"/>
  </svg>`,

  beanie: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="beanieGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1"/>
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <!-- Beanie shape -->
    <path d="M32 75 Q32 20 100 15 Q168 20 168 75 Q168 82 100 85 Q32 82 32 75" fill="{{headwear}}"/>
    <path d="M32 75 Q32 20 100 15 Q168 20 168 75 Q168 82 100 85 Q32 82 32 75" fill="url(#beanieGradient)"/>
    <!-- Ribbed cuff -->
    <path d="M32 75 Q32 82 100 85 Q168 82 168 75 Q168 68 100 72 Q32 68 32 75" fill="{{headwear}}"/>
    <path d="M32 75 Q32 82 100 85 Q168 82 168 75" stroke="#000000" stroke-width="0.8" opacity="0.15"/>
    <!-- Cuff ribbing -->
    <g stroke="#000000" stroke-width="0.6" opacity="0.12">
      <path d="M38 72 L38 82"/><path d="M50 70 L50 83"/><path d="M62 69 L62 84"/>
      <path d="M74 68 L74 84"/><path d="M86 68 L86 85"/><path d="M100 68 L100 85"/>
      <path d="M114 68 L114 85"/><path d="M126 68 L126 84"/><path d="M138 69 L138 84"/>
      <path d="M150 70 L150 83"/><path d="M162 72 L162 82"/>
    </g>
    <!-- Knit texture -->
    <g stroke="#000000" stroke-width="0.4" opacity="0.06">
      <path d="M50 25 Q52 45 50 68"/><path d="M70 20 Q72 40 70 68"/>
      <path d="M90 18 Q92 40 90 68"/><path d="M110 18 Q108 40 110 68"/>
      <path d="M130 20 Q128 40 130 68"/><path d="M150 25 Q148 45 150 68"/>
    </g>
    <!-- Fold shadow -->
    <path d="M40 68 Q100 74 160 68" stroke="#000000" stroke-width="1.5" fill="none" opacity="0.08"/>
    <ellipse cx="100" cy="35" rx="30" ry="10" fill="#FFFFFF" opacity="0.05"/>
  </svg>`,

  fedora: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="fedoraCrownGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.1"/>
        <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.05"/>
        <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Crown -->
    <path d="M45 55 Q45 25 100 22 Q155 25 155 55 L155 68 Q140 72 100 72 Q60 72 45 68 Z" fill="{{headwear}}"/>
    <path d="M45 55 Q45 25 100 22 Q155 25 155 55 L155 68 Q140 72 100 72 Q60 72 45 68 Z" fill="url(#fedoraCrownGrad)"/>
    <!-- Pinched crown -->
    <path d="M55 35 Q100 50 145 35" stroke="#000000" stroke-width="2.5" fill="none" opacity="0.2"/>
    <path d="M58 38 Q100 52 142 38" stroke="#000000" stroke-width="1" fill="none" opacity="0.1"/>
    <path d="M100 25 L100 45" stroke="#000000" stroke-width="1" opacity="0.15"/>
    <!-- Brim -->
    <ellipse cx="100" cy="70" rx="75" ry="15" fill="{{headwear}}"/>
    <ellipse cx="100" cy="73" rx="72" ry="12" fill="#000000" opacity="0.12"/>
    <!-- Band -->
    <path d="M45 62 Q100 68 155 62" stroke="#000000" stroke-width="5" fill="none" opacity="0.35"/>
    <path d="M48 62 Q100 67 152 62" stroke="#000000" stroke-width="1" fill="none" opacity="0.15"/>
    <ellipse cx="45" cy="62" rx="4" ry="3" fill="#000000" opacity="0.25"/>
    <ellipse cx="100" cy="70" rx="75" ry="15" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.15"/>
  </svg>`,

  bucket: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bucketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1"/>
        <stop offset="60%" stop-color="#FFFFFF" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Crown -->
    <path d="M40 60 Q40 28 100 25 Q160 28 160 60 L160 75 Q130 80 100 80 Q70 80 40 75 Z" fill="{{headwear}}"/>
    <path d="M40 60 Q40 28 100 25 Q160 28 160 60 L160 75 Q130 80 100 80 Q70 80 40 75 Z" fill="url(#bucketGrad)"/>
    <!-- Crown seams -->
    <path d="M70 30 Q72 50 70 78" stroke="#000000" stroke-width="0.5" opacity="0.1"/>
    <path d="M100 25 L100 78" stroke="#000000" stroke-width="0.5" opacity="0.1"/>
    <path d="M130 30 Q128 50 130 78" stroke="#000000" stroke-width="0.5" opacity="0.1"/>
    <!-- Floppy brim -->
    <path d="M20 78 Q20 70 40 70 L160 70 Q180 70 180 78 Q180 90 100 95 Q20 90 20 78" fill="{{headwear}}"/>
    <path d="M22 80 Q60 88 100 82 Q140 88 178 80" stroke="#000000" stroke-width="1" fill="none" opacity="0.1"/>
    <path d="M25 82 Q100 94 175 82" fill="#000000" opacity="0.15"/>
    <!-- Brim stitch -->
    <path d="M22 80 Q100 93 178 80" stroke="#000000" stroke-width="0.6" stroke-dasharray="3,2" fill="none" opacity="0.12"/>
    <circle cx="100" cy="28" r="3" fill="{{headwear}}" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
  </svg>`,

  snapback: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="snapbackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.12"/>
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Structured cap -->
    <path d="M30 62 Q30 22 100 18 Q170 22 170 62 L170 72 Q140 78 100 78 Q60 78 30 72 Z" fill="{{headwear}}"/>
    <path d="M30 62 Q30 22 100 18 Q170 22 170 62 L170 72 Q140 78 100 78 Q60 78 30 72 Z" fill="url(#snapbackGrad)"/>
    <!-- Panel seams -->
    <path d="M100 18 L100 75" stroke="#000000" stroke-width="1" opacity="0.15"/>
    <path d="M55 25 Q58 48 55 72" stroke="#000000" stroke-width="0.6" opacity="0.1"/>
    <path d="M145 25 Q142 48 145 72" stroke="#000000" stroke-width="0.6" opacity="0.1"/>
    <!-- Flat brim -->
    <path d="M20 70 L25 60 L95 52 Q100 55 95 70 L20 70" fill="{{headwear}}"/>
    <path d="M22 68 L27 62 L93 54 Q97 57 93 68 L22 68" fill="#000000" opacity="0.25"/>
    <!-- Brim stitch -->
    <path d="M24 66 L90 56" stroke="#000000" stroke-width="0.6" stroke-dasharray="3,2" opacity="0.15"/>
    <path d="M20 70 L95 70" stroke="#000000" stroke-width="1" opacity="0.2"/>
    <!-- Button -->
    <circle cx="100" cy="20" r="6" fill="{{headwear}}"/>
    <circle cx="100" cy="20" r="5" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
    <circle cx="100" cy="20" r="2.5" fill="#000000" opacity="0.12"/>
    <!-- Eyelets -->
    <circle cx="65" cy="35" r="2" fill="#000000" opacity="0.15"/>
    <circle cx="135" cy="35" r="2" fill="#000000" opacity="0.15"/>
  </svg>`,

  visor: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="visorBandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Visor band -->
    <path d="M30 68 Q30 60 100 58 Q170 60 170 68 L170 75 Q140 78 100 78 Q60 78 30 75 Z" fill="{{headwear}}"/>
    <path d="M30 68 Q30 60 100 58 Q170 60 170 68 L170 75 Q140 78 100 78 Q60 78 30 75 Z" fill="url(#visorBandGrad)"/>
    <!-- Band texture -->
    <g stroke="#000000" stroke-width="0.4" opacity="0.1">
      <path d="M40 62 L40 74"/><path d="M60 60 L60 76"/><path d="M80 59 L80 77"/>
      <path d="M120 59 L120 77"/><path d="M140 60 L140 76"/><path d="M160 62 L160 74"/>
    </g>
    <!-- Velcro hint -->
    <path d="M165 68 Q172 68 172 72 Q172 76 165 76" stroke="#000000" stroke-width="0.5" fill="none" opacity="0.15"/>
    <!-- Brim -->
    <path d="M20 72 L30 62 L95 55 Q100 58 95 72 L20 72" fill="{{headwear}}"/>
    <path d="M22 70 L32 64 L93 58 Q96 60 93 70 L22 70" fill="#000000" opacity="0.2"/>
    <path d="M24 68 L90 58" stroke="#000000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.15"/>
    <path d="M20 72 L95 72" stroke="#000000" stroke-width="0.8" opacity="0.15"/>
  </svg>`,

  bandana: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bandanaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>
      <pattern id="bandanaPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1" fill="#000000" opacity="0.06"/>
      </pattern>
    </defs>
    <!-- Wrapped around head -->
    <path d="M28 72 Q28 55 100 52 Q172 55 172 72 L172 82 Q140 88 100 88 Q60 88 28 82 Z" fill="{{headwear}}"/>
    <path d="M28 72 Q28 55 100 52 Q172 55 172 72 L172 82 Q140 88 100 88 Q60 88 28 82 Z" fill="url(#bandanaGrad)"/>
    <path d="M28 72 Q28 55 100 52 Q172 55 172 72 L172 82 Q140 88 100 88 Q60 88 28 82 Z" fill="url(#bandanaPattern)"/>
    <!-- Fabric folds -->
    <path d="M35 65 Q55 62 75 65" stroke="#000000" stroke-width="0.8" fill="none" opacity="0.1"/>
    <path d="M125 65 Q145 62 165 65" stroke="#000000" stroke-width="0.8" fill="none" opacity="0.1"/>
    <path d="M50 75 Q100 82 150 75" stroke="#000000" stroke-width="0.6" fill="none" opacity="0.08"/>
    <!-- Knot at back -->
    <ellipse cx="175" cy="75" rx="10" ry="6" fill="{{headwear}}"/>
    <ellipse cx="175" cy="75" rx="8" ry="5" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.15"/>
    <ellipse cx="175" cy="75" rx="3" ry="2" fill="#000000" opacity="0.1"/>
    <!-- Tail ends -->
    <path d="M182 72 Q190 68 195 75 Q192 82 185 78" stroke="{{headwear}}" stroke-width="4" fill="none"/>
    <path d="M182 78 Q190 82 193 88" stroke="{{headwear}}" stroke-width="3" fill="none"/>
    <path d="M183 73 Q189 70 193 75" stroke="#000000" stroke-width="0.5" fill="none" opacity="0.15"/>
    <path d="M30 70 Q100 75 170 70" stroke="#000000" stroke-width="0.8" fill="none" opacity="0.12"/>
  </svg>`,

  headband: `<svg viewBox="0 0 200 200">
    <defs>
      <linearGradient id="headbandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.15"/>
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Athletic headband -->
    <path d="M28 60 Q28 52 100 50 Q172 52 172 60 L172 72 Q140 76 100 76 Q60 76 28 72 Z" fill="{{headwear}}"/>
    <path d="M28 60 Q28 52 100 50 Q172 52 172 60 L172 72 Q140 76 100 76 Q60 76 28 72 Z" fill="url(#headbandGrad)"/>
    <!-- Terry cloth texture -->
    <g stroke="#000000" stroke-width="0.5" opacity="0.08">
      <path d="M40 54 L40 72"/><path d="M55 53 L55 74"/><path d="M70 52 L70 75"/>
      <path d="M85 51 L85 75"/><path d="M100 50 L100 76"/><path d="M115 51 L115 75"/>
      <path d="M130 52 L130 75"/><path d="M145 53 L145 74"/><path d="M160 54 L160 72"/>
    </g>
    <!-- Horizontal lines -->
    <path d="M32 58 Q100 54 168 58" stroke="#000000" stroke-width="0.4" fill="none" opacity="0.06"/>
    <path d="M30 66 Q100 70 170 66" stroke="#000000" stroke-width="0.4" fill="none" opacity="0.06"/>
    <!-- Brand area hint -->
    <rect x="85" y="58" width="30" height="12" rx="2" fill="#000000" opacity="0.03"/>
    <path d="M30 55 Q100 51 170 55" stroke="#FFFFFF" stroke-width="0.5" fill="none" opacity="0.1"/>
  </svg>`,

  beret: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="beretGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.1"/>
      </radialGradient>
    </defs>
    <!-- Soft beret shape -->
    <ellipse cx="100" cy="50" rx="60" ry="35" fill="{{headwear}}"/>
    <ellipse cx="140" cy="40" rx="28" ry="22" fill="{{headwear}}"/>
    <ellipse cx="100" cy="50" rx="60" ry="35" fill="url(#beretGrad)"/>
    <ellipse cx="140" cy="40" rx="28" ry="22" fill="url(#beretGrad)"/>
    <!-- Band -->
    <path d="M40 68 Q100 78 160 68" stroke="{{headwear}}" stroke-width="10" fill="none"/>
    <path d="M40 65 Q100 74 160 65" stroke="#000000" stroke-width="0.8" fill="none" opacity="0.15"/>
    <path d="M40 72 Q100 82 160 72" stroke="#000000" stroke-width="0.8" fill="none" opacity="0.15"/>
    <!-- Wool texture -->
    <g stroke="#000000" stroke-width="0.4" fill="none" opacity="0.06">
      <path d="M55 40 Q70 35 85 45"/><path d="M90 35 Q105 30 120 40"/>
      <path d="M125 38 Q140 32 155 42"/><path d="M70 55 Q85 50 100 55"/>
      <path d="M105 52 Q120 48 135 55"/>
    </g>
    <!-- Stem on top -->
    <circle cx="100" cy="22" r="5" fill="{{headwear}}"/>
    <circle cx="100" cy="22" r="4" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
    <circle cx="100" cy="22" r="2" fill="#000000" opacity="0.1"/>
    <path d="M120 45 Q140 35 160 50" stroke="#000000" stroke-width="1" fill="none" opacity="0.08"/>
  </svg>`,
};

export const ears = {
  default: `<svg viewBox="0 0 200 200">
    <!-- Left ear -->
    <ellipse cx="24" cy="98" rx="9" ry="16" fill="{{skin}}" />
    <ellipse cx="24" cy="98" rx="5" ry="10" fill="{{skinShadow}}" opacity="0.15" />
    <!-- Right ear -->
    <ellipse cx="176" cy="98" rx="9" ry="16" fill="{{skin}}" />
    <ellipse cx="176" cy="98" rx="5" ry="10" fill="{{skinShadow}}" opacity="0.15" />
  </svg>`,
};

export const neck = {
  default: `<svg viewBox="0 0 200 200">
    <rect x="82" y="175" width="36" height="30" fill="{{skin}}" />
    <!-- Neck shadow -->
    <path d="M85 180 Q100 185 115 180" fill="{{skinShadow}}" opacity="0.15" />
  </svg>`,
};

export default { glasses, headwear, ears, neck };
