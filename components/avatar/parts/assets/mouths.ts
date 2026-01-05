/**
 * Mouth Expression SVG Assets
 *
 * Realistic mouth expressions with detailed lip anatomy.
 * Uses color tokens: {{lip}}, {{lipDark}}, {{lipHighlight}}, {{skinShadow}}, {{tongue}}, {{teeth}}
 *
 * Anatomy:
 * - Upper lip with cupid's bow
 * - Lower lip (typically fuller)
 * - Lip line between lips
 * - Philtrum shadow above upper lip
 * - Lower lip highlight
 * - Corner shadows
 */

export const mouths = {
  neutral: `<svg viewBox="0 0 200 200">
    <!-- Neutral relaxed mouth - lips gently together -->

    <!-- Philtrum shadow (indent above upper lip) -->
    <path d="M97 138 L100 142 L103 138" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Upper lip with cupid's bow -->
    <path d="M74 146
             Q82 143 92 145
             L100 143
             L108 145
             Q118 143 126 146
             Q118 149 100 148
             Q82 149 74 146"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip (fuller) -->
    <path d="M76 149
             Q88 150 100 150
             Q112 150 124 149
             Q112 157 100 158
             Q88 157 76 149"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M76 149 Q100 158 124 149" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lip line (between lips) -->
    <path d="M76 148 Q88 150 100 149 Q112 150 124 148" stroke="{{lipDark}}" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Lower lip highlight -->
    <path d="M88 152 Q100 154 112 152" stroke="{{lipHighlight}}" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/>

    <!-- Lip corner shadows -->
    <ellipse cx="74" cy="147" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.2"/>
    <ellipse cx="126" cy="147" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.2"/>
  </svg>`,

  smile: `<svg viewBox="0 0 200 200">
    <!-- Smile with teeth hint, lip stretch, cheek push -->
    <path d="M97 136 L100 140 L103 136" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>
    <path d="M82 147 Q100 146 118 147 L116 149 Q100 148 84 149 Z" fill="#FAFAFA" opacity="0.85"/>
    <path d="M70 145 Q80 141 92 143 L100 140 L108 143 Q120 141 130 145 Q118 149 100 147 Q82 149 70 145" fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>
    <path d="M72 148 Q86 150 100 150 Q114 150 128 148 Q114 158 100 160 Q86 158 72 148" fill="{{lip}}"/>
    <path d="M72 148 Q100 162 128 148" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>
    <path d="M72 147 Q86 150 100 148 Q114 150 128 147" stroke="{{lipDark}}" stroke-width="1.2" fill="none" opacity="0.6"/>
    <path d="M85 152 Q100 155 115 152" stroke="{{lipHighlight}}" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>
    <path d="M68 146 Q65 143 66 140" stroke="{{skinShadow}}" stroke-width="1" fill="none" opacity="0.15"/>
    <path d="M132 146 Q135 143 134 140" stroke="{{skinShadow}}" stroke-width="1" fill="none" opacity="0.15"/>
    <ellipse cx="69" cy="146" rx="2" ry="1.5" fill="{{skinShadow}}" opacity="0.2"/>
    <ellipse cx="131" cy="146" rx="2" ry="1.5" fill="{{skinShadow}}" opacity="0.2"/>
  </svg>`,

  smileOpen: `<svg viewBox="0 0 200 200">
    <!-- Open smile showing teeth - joyful expression -->

    <!-- Philtrum shadow -->
    <path d="M97 134 L100 138 L103 134" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Inner mouth (dark area behind teeth) -->
    <path d="M72 147 Q100 175 128 147 Q100 155 72 147" fill="#2A1A1A"/>

    <!-- Upper teeth -->
    <path d="M78 148
             Q88 146 100 146
             Q112 146 122 148
             L120 155
             Q100 153 80 155 Z"
          fill="#FAFAFA"/>

    <!-- Tooth lines (subtle) -->
    <path d="M88 148 L88 154" stroke="#E8E8E8" stroke-width="0.5" opacity="0.5"/>
    <path d="M95 147 L95 153" stroke="#E8E8E8" stroke-width="0.5" opacity="0.5"/>
    <path d="M100 146 L100 153" stroke="#E8E8E8" stroke-width="0.5" opacity="0.5"/>
    <path d="M105 147 L105 153" stroke="#E8E8E8" stroke-width="0.5" opacity="0.5"/>
    <path d="M112 148 L112 154" stroke="#E8E8E8" stroke-width="0.5" opacity="0.5"/>

    <!-- Upper lip with cupid's bow -->
    <path d="M68 144
             Q78 140 92 142
             L100 139
             L108 142
             Q122 140 132 144
             Q120 148 100 146
             Q80 148 68 144"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip -->
    <path d="M72 158
             Q86 162 100 163
             Q114 162 128 158
             Q114 170 100 172
             Q86 170 72 158"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M72 158 Q100 172 128 158" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lower lip highlight -->
    <path d="M85 163 Q100 166 115 163" stroke="{{lipHighlight}}" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>

    <!-- Smile creases -->
    <path d="M66 144 Q62 140 64 135" stroke="{{skinShadow}}" stroke-width="1.2" fill="none" opacity="0.2"/>
    <path d="M134 144 Q138 140 136 135" stroke="{{skinShadow}}" stroke-width="1.2" fill="none" opacity="0.2"/>
  </svg>`,

  smirk: `<svg viewBox="0 0 200 200">
    <!-- Asymmetric smirk - one corner raised, confident expression -->

    <!-- Philtrum shadow (slightly off-center) -->
    <path d="M96 138 L99 142 L102 138" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Upper lip with asymmetric cupid's bow -->
    <path d="M75 148
             Q84 146 93 147
             L100 145
             L107 146
             Q118 143 130 142
             Q120 147 100 147
             Q84 148 75 148"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip - asymmetric, higher on right -->
    <path d="M77 150
             Q90 151 100 150
             Q112 148 128 145
             Q118 155 100 157
             Q86 157 77 150"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M77 150 Q100 158 128 145" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lip line - asymmetric curve -->
    <path d="M77 149 Q90 151 100 149 Q115 147 128 144" stroke="{{lipDark}}" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Lower lip highlight -->
    <path d="M85 151 Q100 153 112 150" stroke="{{lipHighlight}}" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/>

    <!-- Smirk crease on raised side -->
    <path d="M132 142 Q136 139 135 135" stroke="{{skinShadow}}" stroke-width="1" fill="none" opacity="0.18"/>

    <!-- Lip corner shadows -->
    <ellipse cx="75" cy="149" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.2"/>
    <ellipse cx="130" cy="143" rx="2" ry="1.5" fill="{{skinShadow}}" opacity="0.15"/>
  </svg>`,

  serious: `<svg viewBox="0 0 200 200">
    <!-- Serious/neutral expression - flat, composed -->

    <!-- Philtrum shadow -->
    <path d="M97 139 L100 143 L103 139" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Upper lip with subtle cupid's bow - more horizontal -->
    <path d="M74 148
             Q84 146 94 147
             L100 146
             L106 147
             Q116 146 126 148
             Q116 150 100 149
             Q84 150 74 148"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip - less curved, more serious -->
    <path d="M76 150
             Q88 151 100 151
             Q112 151 124 150
             Q112 156 100 157
             Q88 156 76 150"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M76 150 Q100 157 124 150" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lip line - nearly straight -->
    <path d="M76 149 Q88 150 100 150 Q112 150 124 149" stroke="{{lipDark}}" stroke-width="1.3" fill="none" opacity="0.65"/>

    <!-- Lower lip highlight -->
    <path d="M88 152 Q100 153 112 152" stroke="{{lipHighlight}}" stroke-width="2.5" fill="none" opacity="0.3" stroke-linecap="round"/>

    <!-- Lip corner shadows - subtle tension -->
    <ellipse cx="74" cy="149" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.22"/>
    <ellipse cx="126" cy="149" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.22"/>
  </svg>`,

  slight: `<svg viewBox="0 0 200 200">
    <!-- Slight smile - gentle, subtle warmth -->

    <!-- Philtrum shadow -->
    <path d="M97 137 L100 141 L103 137" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Upper lip with cupid's bow -->
    <path d="M74 146
             Q83 143 93 145
             L100 143
             L107 145
             Q117 143 126 146
             Q117 149 100 148
             Q83 149 74 146"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip - gentle curve -->
    <path d="M75 149
             Q88 150 100 150
             Q112 150 125 149
             Q112 158 100 159
             Q88 158 75 149"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M75 149 Q100 159 125 149" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lip line - slight upward curve -->
    <path d="M75 148 Q88 150 100 149 Q112 150 125 148" stroke="{{lipDark}}" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Lower lip highlight -->
    <path d="M87 152 Q100 154 113 152" stroke="{{lipHighlight}}" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/>

    <!-- Lip corner shadows -->
    <ellipse cx="73" cy="147" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.18"/>
    <ellipse cx="127" cy="147" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.18"/>
  </svg>`,

  pursed: `<svg viewBox="0 0 200 200">
    <!-- Pursed lips - pushed together, contemplative or kissing -->

    <!-- Philtrum shadow - compressed -->
    <path d="M98 140 L100 143 L102 140" stroke="{{skinShadow}}" stroke-width="1.2" fill="none" opacity="0.2"/>

    <!-- Upper lip - compressed and rounded -->
    <path d="M84 147
             Q90 144 96 146
             L100 144
             L104 146
             Q110 144 116 147
             Q110 150 100 149
             Q90 150 84 147"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip - pouty, rounded -->
    <path d="M85 150
             Q92 151 100 151
             Q108 151 115 150
             Q108 158 100 159
             Q92 158 85 150"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M85 150 Q100 160 115 150" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lip line - compressed -->
    <path d="M85 149 Q92 150 100 150 Q108 150 115 149" stroke="{{lipDark}}" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Lower lip highlight - rounder for pursed -->
    <path d="M92 152 Q100 155 108 152" stroke="{{lipHighlight}}" stroke-width="3" fill="none" opacity="0.4" stroke-linecap="round"/>

    <!-- Pucker lines around mouth -->
    <path d="M82 148 Q80 150 82 152" stroke="{{skinShadow}}" stroke-width="0.8" fill="none" opacity="0.15"/>
    <path d="M118 148 Q120 150 118 152" stroke="{{skinShadow}}" stroke-width="0.8" fill="none" opacity="0.15"/>

    <!-- Lip corner shadows -->
    <ellipse cx="83" cy="149" rx="2" ry="2" fill="{{skinShadow}}" opacity="0.2"/>
    <ellipse cx="117" cy="149" rx="2" ry="2" fill="{{skinShadow}}" opacity="0.2"/>
  </svg>`,

  openMouth: `<svg viewBox="0 0 200 200">
    <!-- Open mouth - surprised or speaking -->

    <!-- Philtrum shadow -->
    <path d="M97 135 L100 139 L103 135" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Inner mouth darkness -->
    <ellipse cx="100" cy="155" rx="20" ry="15" fill="#1A0A0A"/>

    <!-- Tongue (visible inside) -->
    <ellipse cx="100" cy="162" rx="14" ry="7" fill="{{tongue}}"/>
    <path d="M90 160 Q100 158 110 160" stroke="#C44040" stroke-width="1" fill="none" opacity="0.3"/>

    <!-- Upper teeth hint -->
    <path d="M84 148 Q92 146 100 146 Q108 146 116 148 L114 151 Q100 150 86 151 Z" fill="#FAFAFA"/>

    <!-- Upper lip with cupid's bow - stretched open -->
    <path d="M72 146
             Q82 142 93 144
             L100 141
             L107 144
             Q118 142 128 146
             Q118 149 100 148
             Q82 149 72 146"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip - pulled down -->
    <path d="M74 162
             Q87 166 100 167
             Q113 166 126 162
             Q113 174 100 176
             Q87 174 74 162"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M74 162 Q100 178 126 162" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lower lip highlight -->
    <path d="M86 167 Q100 170 114 167" stroke="{{lipHighlight}}" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>

    <!-- Lip corner shadows -->
    <ellipse cx="71" cy="154" rx="3" ry="4" fill="{{skinShadow}}" opacity="0.2"/>
    <ellipse cx="129" cy="154" rx="3" ry="4" fill="{{skinShadow}}" opacity="0.2"/>
  </svg>`,

  frown: `<svg viewBox="0 0 200 200">
    <!-- Frown - downturned corners, sad or disappointed -->

    <!-- Philtrum shadow -->
    <path d="M97 138 L100 142 L103 138" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Upper lip with cupid's bow - tension pulls down -->
    <path d="M72 150
             Q82 147 93 148
             L100 146
             L107 148
             Q118 147 128 150
             Q118 152 100 151
             Q82 152 72 150"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip - downturned -->
    <path d="M74 153
             Q87 152 100 152
             Q113 152 126 153
             Q113 160 100 161
             Q87 160 74 153"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M74 153 Q100 162 126 153" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lip line - downturned at corners -->
    <path d="M72 151 Q85 153 100 152 Q115 153 128 151" stroke="{{lipDark}}" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Lower lip highlight -->
    <path d="M88 155 Q100 157 112 155" stroke="{{lipHighlight}}" stroke-width="2.5" fill="none" opacity="0.3" stroke-linecap="round"/>

    <!-- Frown creases at corners - pulling down -->
    <path d="M70 151 Q67 154 68 158" stroke="{{skinShadow}}" stroke-width="1" fill="none" opacity="0.18"/>
    <path d="M130 151 Q133 154 132 158" stroke="{{skinShadow}}" stroke-width="1" fill="none" opacity="0.18"/>

    <!-- Lip corner shadows - deeper for frown -->
    <ellipse cx="71" cy="151" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.25"/>
    <ellipse cx="129" cy="151" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.25"/>
  </svg>`,

  thinking: `<svg viewBox="0 0 200 200">
    <!-- Thinking/contemplative - offset to one side -->

    <!-- Philtrum shadow - slightly shifted -->
    <path d="M99 138 L102 142 L105 138" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.2"/>

    <!-- Upper lip - shifted right, asymmetric -->
    <path d="M78 148
             Q88 146 97 147
             L103 145
             L109 146
             Q120 144 130 146
             Q120 149 103 148
             Q88 149 78 148"
          fill="{{lip}}" stroke="{{lipDark}}" stroke-width="0.5"/>

    <!-- Lower lip - offset to the right -->
    <path d="M80 150
             Q93 151 105 150
             Q117 149 128 148
             Q117 157 103 158
             Q90 158 80 150"
          fill="{{lip}}"/>

    <!-- Lower lip outline -->
    <path d="M80 150 Q103 159 128 148" stroke="{{lipDark}}" stroke-width="0.5" fill="none" opacity="0.4"/>

    <!-- Lip line - asymmetric, contemplative -->
    <path d="M80 149 Q93 151 103 149 Q117 148 128 147" stroke="{{lipDark}}" stroke-width="1.2" fill="none" opacity="0.6"/>

    <!-- Lower lip highlight - offset -->
    <path d="M90 152 Q103 154 116 151" stroke="{{lipHighlight}}" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/>

    <!-- Thinking tension at corner -->
    <path d="M130 146 Q134 144 133 140" stroke="{{skinShadow}}" stroke-width="0.8" fill="none" opacity="0.15"/>

    <!-- Small dimple/pucker on one side (thinking expression) -->
    <ellipse cx="132" cy="147" rx="2" ry="1.5" fill="{{skinShadow}}" opacity="0.18"/>

    <!-- Lip corner shadows -->
    <ellipse cx="77" cy="149" rx="2.5" ry="2" fill="{{skinShadow}}" opacity="0.2"/>
  </svg>`,
};

export default mouths;
