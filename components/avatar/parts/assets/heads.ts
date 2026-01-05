/**
 * Head/Face Shape SVG Assets
 *
 * Anatomically detailed face shapes with multi-layer shading.
 * Light source: top-left (45 degrees)
 *
 * Enhanced color tokens:
 * - {{skin}} - base skin color
 * - {{skinShadow1}} - subtle shadow (surface variation)
 * - {{skinShadow2}} - medium shadow (form definition)
 * - {{skinShadow3}} - deep shadow (recessed areas)
 * - {{skinHighlight1}} - subtle highlight (surface sheen)
 * - {{skinHighlight2}} - bright highlight (direct light)
 * - {{skinBlush}} - cheek blush color
 * - {{skinAO}} - ambient occlusion (contact shadows)
 */

export const heads = {
  oval: `<svg viewBox="0 0 200 200">
<defs>
<radialGradient id="ob" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="{{skinHighlight1}}"/><stop offset="50%" stop-color="{{skin}}"/><stop offset="85%" stop-color="{{skinShadow1}}"/><stop offset="100%" stop-color="{{skinShadow2}}"/></radialGradient>
<radialGradient id="of" cx="50%" cy="0%" r="60%"><stop offset="0%" stop-color="{{skinHighlight2}}" stop-opacity=".5"/><stop offset="100%" stop-color="{{skinHighlight1}}" stop-opacity="0"/></radialGradient>
<radialGradient id="obl" cx="70%" cy="50%" r="50%"><stop offset="0%" stop-color="{{skinBlush}}" stop-opacity=".35"/><stop offset="100%" stop-color="{{skinBlush}}" stop-opacity="0"/></radialGradient>
<linearGradient id="oj" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="{{skinShadow1}}" stop-opacity="0"/><stop offset="50%" stop-color="{{skinShadow2}}" stop-opacity=".2"/><stop offset="100%" stop-color="{{skinShadow3}}" stop-opacity=".35"/></linearGradient>
</defs>
<path d="M100 25C145 25 165 55 165 95C165 145 145 180 100 180C55 180 35 145 35 95C35 55 55 25 100 25Z" fill="url(#ob)"/>
<ellipse cx="100" cy="50" rx="50" ry="35" fill="url(#of)"/>
<ellipse cx="45" cy="75" rx="14" ry="28" fill="{{skinShadow2}}" opacity=".2"/>
<ellipse cx="155" cy="75" rx="14" ry="28" fill="{{skinShadow1}}" opacity=".12"/>
<path d="M42 95Q62 82 88 98" stroke="{{skinShadow2}}" stroke-width="4" fill="none" opacity=".15"/>
<path d="M158 95Q138 82 112 98" stroke="{{skinShadow1}}" stroke-width="4" fill="none" opacity=".1"/>
<ellipse cx="55" cy="90" rx="10" ry="6" fill="{{skinHighlight1}}" opacity=".18"/>
<ellipse cx="145" cy="90" rx="10" ry="6" fill="{{skinHighlight1}}" opacity=".12"/>
<ellipse cx="60" cy="110" rx="24" ry="18" fill="url(#obl)"/>
<ellipse cx="140" cy="110" rx="24" ry="18" fill="url(#obl)"/>
<path d="M50 130Q100 175 150 130L150 160Q100 195 50 160Z" fill="url(#oj)"/>
<ellipse cx="100" cy="175" rx="30" ry="8" fill="{{skinAO}}" opacity=".2"/>
<ellipse cx="100" cy="162" rx="16" ry="9" fill="{{skinHighlight2}}" opacity=".25"/>
<line x1="100" y1="85" x2="100" y2="130" stroke="{{skinShadow1}}" stroke-width="2" opacity=".12"/>
</svg>`,

  round: `<svg viewBox="0 0 200 200">
<defs>
<radialGradient id="rb" cx="35%" cy="30%" r="65%"><stop offset="0%" stop-color="{{skinHighlight1}}"/><stop offset="45%" stop-color="{{skin}}"/><stop offset="80%" stop-color="{{skinShadow1}}"/><stop offset="100%" stop-color="{{skinShadow2}}"/></radialGradient>
<radialGradient id="rf" cx="50%" cy="10%" r="50%"><stop offset="0%" stop-color="{{skinHighlight2}}" stop-opacity=".4"/><stop offset="100%" stop-color="{{skinHighlight1}}" stop-opacity="0"/></radialGradient>
<radialGradient id="rbl" cx="70%" cy="50%" r="50%"><stop offset="0%" stop-color="{{skinBlush}}" stop-opacity=".4"/><stop offset="100%" stop-color="{{skinBlush}}" stop-opacity="0"/></radialGradient>
<linearGradient id="rj" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="{{skinShadow1}}" stop-opacity="0"/><stop offset="60%" stop-color="{{skinShadow2}}" stop-opacity=".15"/><stop offset="100%" stop-color="{{skinShadow3}}" stop-opacity=".25"/></linearGradient>
</defs>
<circle cx="100" cy="100" r="75" fill="url(#rb)"/>
<ellipse cx="100" cy="55" rx="48" ry="32" fill="url(#rf)"/>
<ellipse cx="35" cy="85" rx="12" ry="24" fill="{{skinShadow2}}" opacity=".18"/>
<ellipse cx="165" cy="85" rx="12" ry="24" fill="{{skinShadow1}}" opacity=".1"/>
<path d="M38 100Q58 92 82 106" stroke="{{skinShadow1}}" stroke-width="3" fill="none" opacity=".1"/>
<path d="M162 100Q142 92 118 106" stroke="{{skinShadow1}}" stroke-width="3" fill="none" opacity=".06"/>
<ellipse cx="52" cy="95" rx="12" ry="7" fill="{{skinHighlight1}}" opacity=".15"/>
<ellipse cx="148" cy="95" rx="12" ry="7" fill="{{skinHighlight1}}" opacity=".1"/>
<ellipse cx="55" cy="115" rx="30" ry="24" fill="url(#rbl)"/>
<ellipse cx="145" cy="115" rx="30" ry="24" fill="url(#rbl)"/>
<path d="M40 130Q100 180 160 130Q160 175 100 175Q40 175 40 130Z" fill="url(#rj)"/>
<ellipse cx="100" cy="172" rx="28" ry="7" fill="{{skinAO}}" opacity=".18"/>
<ellipse cx="100" cy="158" rx="20" ry="12" fill="{{skinHighlight2}}" opacity=".22"/>
<line x1="100" y1="85" x2="100" y2="125" stroke="{{skinShadow1}}" stroke-width="2" opacity=".1"/>
</svg>`,

  square: `<svg viewBox="0 0 200 200">
<defs>
<radialGradient id="sb" cx="30%" cy="25%" r="75%"><stop offset="0%" stop-color="{{skinHighlight1}}"/><stop offset="40%" stop-color="{{skin}}"/><stop offset="75%" stop-color="{{skinShadow1}}"/><stop offset="100%" stop-color="{{skinShadow2}}"/></radialGradient>
<radialGradient id="sf" cx="50%" cy="0%" r="55%"><stop offset="0%" stop-color="{{skinHighlight2}}" stop-opacity=".45"/><stop offset="100%" stop-color="{{skinHighlight1}}" stop-opacity="0"/></radialGradient>
<radialGradient id="sbl" cx="80%" cy="50%" r="50%"><stop offset="0%" stop-color="{{skinBlush}}" stop-opacity=".3"/><stop offset="100%" stop-color="{{skinBlush}}" stop-opacity="0"/></radialGradient>
<linearGradient id="sj" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="{{skinShadow1}}" stop-opacity="0"/><stop offset="40%" stop-color="{{skinShadow2}}" stop-opacity=".2"/><stop offset="100%" stop-color="{{skinShadow3}}" stop-opacity=".4"/></linearGradient>
<linearGradient id="sjc" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="{{skinShadow2}}" stop-opacity=".15"/><stop offset="100%" stop-color="{{skinShadow3}}" stop-opacity=".3"/></linearGradient>
</defs>
<path d="M40 35C40 25 50 20 100 20C150 20 160 25 160 35L165 130C165 155 145 175 100 175C55 175 35 155 35 130L40 35Z" fill="url(#sb)"/>
<rect x="50" y="25" width="100" height="40" rx="8" fill="url(#sf)"/>
<ellipse cx="40" cy="70" rx="12" ry="32" fill="{{skinShadow2}}" opacity=".25"/>
<ellipse cx="160" cy="70" rx="12" ry="32" fill="{{skinShadow1}}" opacity=".15"/>
<path d="M38 88Q55 75 82 92" stroke="{{skinShadow2}}" stroke-width="5" fill="none" opacity=".18"/>
<path d="M162 88Q145 75 118 92" stroke="{{skinShadow2}}" stroke-width="5" fill="none" opacity=".12"/>
<ellipse cx="52" cy="85" rx="14" ry="7" fill="{{skinHighlight1}}" opacity=".22"/>
<ellipse cx="148" cy="85" rx="14" ry="7" fill="{{skinHighlight1}}" opacity=".15"/>
<ellipse cx="60" cy="108" rx="22" ry="16" fill="url(#sbl)"/>
<ellipse cx="140" cy="108" rx="22" ry="16" fill="url(#sbl)"/>
<path d="M35 130L35 150Q100 185 165 150L165 130Q100 160 35 130Z" fill="url(#sj)"/>
<ellipse cx="42" cy="142" rx="10" ry="14" fill="url(#sjc)"/>
<ellipse cx="158" cy="142" rx="10" ry="14" fill="{{skinShadow2}}" opacity=".2"/>
<path d="M35 145L45 135" stroke="{{skinHighlight1}}" stroke-width="2" opacity=".12"/>
<path d="M165 145L155 135" stroke="{{skinHighlight1}}" stroke-width="2" opacity=".08"/>
<ellipse cx="100" cy="172" rx="32" ry="8" fill="{{skinAO}}" opacity=".22"/>
<ellipse cx="100" cy="160" rx="22" ry="9" fill="{{skinHighlight2}}" opacity=".26"/>
<line x1="100" y1="80" x2="100" y2="128" stroke="{{skinShadow1}}" stroke-width="2" opacity=".14"/>
</svg>`,

  heart: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="heartBase" cx="35%" cy="25%" r="70%">
        <stop offset="0%" style="stop-color:{{skinHighlight}}" />
        <stop offset="55%" style="stop-color:{{skin}}" />
        <stop offset="100%" style="stop-color:{{skinShadow}}" />
      </radialGradient>
      <radialGradient id="heartForehead" cx="50%" cy="5%" r="60%">
        <stop offset="0%" style="stop-color:{{skinHighlight}};stop-opacity:0.45" />
        <stop offset="100%" style="stop-color:{{skinHighlight}};stop-opacity:0" />
      </radialGradient>
      <radialGradient id="heartBlushL" cx="70%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:{{skin}};stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:{{skin}};stop-opacity:0" />
      </radialGradient>
      <radialGradient id="heartBlushR" cx="30%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:{{skin}};stop-opacity:0.25" />
        <stop offset="100%" style="stop-color:{{skin}};stop-opacity:0" />
      </radialGradient>
      <linearGradient id="heartJaw" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{skinShadow}};stop-opacity:0" />
        <stop offset="60%" style="stop-color:{{skinShadow}};stop-opacity:0.15" />
        <stop offset="100%" style="stop-color:{{skinShadow}};stop-opacity:0.22" />
      </linearGradient>
    </defs>
    <!-- Main face shape - wide forehead, narrow chin -->
    <path d="M100 20 C150 20 170 45 170 75 C170 110 150 140 100 180 C50 140 30 110 30 75 C30 45 50 20 100 20 Z" fill="url(#heartBase)" />
    <!-- Wide forehead highlight -->
    <ellipse cx="100" cy="45" rx="60" ry="30" fill="url(#heartForehead)" />
    <!-- Temple shadows -->
    <ellipse cx="38" cy="70" rx="12" ry="25" fill="{{skinShadow}}" opacity="0.18" />
    <ellipse cx="162" cy="70" rx="12" ry="25" fill="{{skinShadow}}" opacity="0.10" />
    <!-- Prominent cheekbone structure -->
    <path d="M38 90 Q60 75 85 95" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.14" />
    <path d="M162 90 Q140 75 115 95" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.09" />
    <!-- Cheek blush zones - higher on heart face -->
    <ellipse cx="55" cy="100" rx="22" ry="16" fill="url(#heartBlushL)" />
    <ellipse cx="145" cy="100" rx="22" ry="16" fill="url(#heartBlushR)" />
    <!-- Tapered jaw shadow -->
    <path d="M50 120 Q100 165 150 120 L130 155 Q100 185 70 155 Z" fill="url(#heartJaw)" />
    <!-- Pointed chin highlight -->
    <ellipse cx="100" cy="168" rx="12" ry="8" fill="{{skinHighlight}}" opacity="0.25" />
    <!-- Nose shadow base -->
    <line x1="100" y1="80" x2="100" y2="125" stroke="{{skinShadow}}" stroke-width="2" opacity="0.1" />
  </svg>`,

  oblong: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="oblongBase" cx="35%" cy="28%" r="70%">
        <stop offset="0%" style="stop-color:{{skinHighlight}}" />
        <stop offset="55%" style="stop-color:{{skin}}" />
        <stop offset="100%" style="stop-color:{{skinShadow}}" />
      </radialGradient>
      <radialGradient id="oblongForehead" cx="50%" cy="0%" r="50%">
        <stop offset="0%" style="stop-color:{{skinHighlight}};stop-opacity:0.4" />
        <stop offset="100%" style="stop-color:{{skinHighlight}};stop-opacity:0" />
      </radialGradient>
      <radialGradient id="oblongBlushL" cx="70%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:{{skin}};stop-opacity:0.28" />
        <stop offset="100%" style="stop-color:{{skin}};stop-opacity:0" />
      </radialGradient>
      <radialGradient id="oblongBlushR" cx="30%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:{{skin}};stop-opacity:0.22" />
        <stop offset="100%" style="stop-color:{{skin}};stop-opacity:0" />
      </radialGradient>
      <linearGradient id="oblongJaw" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{skinShadow}};stop-opacity:0" />
        <stop offset="65%" style="stop-color:{{skinShadow}};stop-opacity:0.15" />
        <stop offset="100%" style="stop-color:{{skinShadow}};stop-opacity:0.22" />
      </linearGradient>
    </defs>
    <!-- Main face shape - elongated oval -->
    <path d="M100 15 C140 15 155 45 155 80 C155 130 145 170 100 185 C55 170 45 130 45 80 C45 45 60 15 100 15 Z" fill="url(#oblongBase)" />
    <!-- High forehead highlight -->
    <ellipse cx="100" cy="40" rx="45" ry="30" fill="url(#oblongForehead)" />
    <!-- Temple shadows - elongated -->
    <ellipse cx="50" cy="65" rx="10" ry="28" fill="{{skinShadow}}" opacity="0.17" />
    <ellipse cx="150" cy="65" rx="10" ry="28" fill="{{skinShadow}}" opacity="0.10" />
    <!-- Cheekbone structure -->
    <path d="M50 95 Q68 88 85 100" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.12" />
    <path d="M150 95 Q132 88 115 100" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.08" />
    <!-- Narrow cheek blush zones -->
    <ellipse cx="60" cy="110" rx="18" ry="18" fill="url(#oblongBlushL)" />
    <ellipse cx="140" cy="110" rx="18" ry="18" fill="url(#oblongBlushR)" />
    <!-- Long jaw shadow -->
    <path d="M55 130 Q100 175 145 130 L140 165 Q100 195 60 165 Z" fill="url(#oblongJaw)" />
    <!-- Chin highlight -->
    <ellipse cx="100" cy="172" rx="14" ry="8" fill="{{skinHighlight}}" opacity="0.2" />
    <!-- Nose shadow base - longer for oblong face -->
    <line x1="100" y1="75" x2="100" y2="130" stroke="{{skinShadow}}" stroke-width="2" opacity="0.1" />
  </svg>`,

  diamond: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="diamondBase" cx="35%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:{{skinHighlight}}" />
        <stop offset="55%" style="stop-color:{{skin}}" />
        <stop offset="100%" style="stop-color:{{skinShadow}}" />
      </radialGradient>
      <radialGradient id="diamondForehead" cx="50%" cy="10%" r="45%">
        <stop offset="0%" style="stop-color:{{skinHighlight}};stop-opacity:0.38" />
        <stop offset="100%" style="stop-color:{{skinHighlight}};stop-opacity:0" />
      </radialGradient>
      <radialGradient id="diamondBlushL" cx="60%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:{{skin}};stop-opacity:0.32" />
        <stop offset="100%" style="stop-color:{{skin}};stop-opacity:0" />
      </radialGradient>
      <radialGradient id="diamondBlushR" cx="40%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:{{skin}};stop-opacity:0.26" />
        <stop offset="100%" style="stop-color:{{skin}};stop-opacity:0" />
      </radialGradient>
      <linearGradient id="diamondJaw" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:{{skinShadow}};stop-opacity:0" />
        <stop offset="55%" style="stop-color:{{skinShadow}};stop-opacity:0.15" />
        <stop offset="100%" style="stop-color:{{skinShadow}};stop-opacity:0.25" />
      </linearGradient>
    </defs>
    <!-- Main face shape - narrow forehead/chin, wide cheekbones -->
    <path d="M100 20 C125 20 140 40 145 60 C160 80 170 95 170 100 C170 105 160 120 145 140 C130 160 115 175 100 180 C85 175 70 160 55 140 C40 120 30 105 30 100 C30 95 40 80 55 60 C60 40 75 20 100 20 Z" fill="url(#diamondBase)" />
    <!-- Narrow forehead highlight -->
    <ellipse cx="100" cy="45" rx="35" ry="25" fill="url(#diamondForehead)" />
    <!-- Temple shadows -->
    <ellipse cx="55" cy="60" rx="10" ry="18" fill="{{skinShadow}}" opacity="0.16" />
    <ellipse cx="145" cy="60" rx="10" ry="18" fill="{{skinShadow}}" opacity="0.09" />
    <!-- Prominent cheekbone structure - key feature of diamond face -->
    <path d="M35 100 Q55 85 80 98" stroke="{{skinShadow}}" stroke-width="4" fill="none" opacity="0.16" />
    <path d="M165 100 Q145 85 120 98" stroke="{{skinShadow}}" stroke-width="4" fill="none" opacity="0.10" />
    <!-- Cheekbone highlights -->
    <ellipse cx="50" cy="95" rx="12" ry="8" fill="{{skinHighlight}}" opacity="0.2" />
    <ellipse cx="150" cy="95" rx="12" ry="8" fill="{{skinHighlight}}" opacity="0.15" />
    <!-- Cheek blush zones - on prominent cheekbones -->
    <ellipse cx="55" cy="105" rx="25" ry="18" fill="url(#diamondBlushL)" />
    <ellipse cx="145" cy="105" rx="25" ry="18" fill="url(#diamondBlushR)" />
    <!-- Tapered jaw shadow -->
    <path d="M55 130 Q100 170 145 130 L125 160 Q100 185 75 160 Z" fill="url(#diamondJaw)" />
    <!-- Narrow chin highlight -->
    <ellipse cx="100" cy="168" rx="12" ry="7" fill="{{skinHighlight}}" opacity="0.22" />
    <!-- Nose shadow base -->
    <line x1="100" y1="80" x2="100" y2="128" stroke="{{skinShadow}}" stroke-width="2" opacity="0.1" />
  </svg>`,
};

export default heads;
