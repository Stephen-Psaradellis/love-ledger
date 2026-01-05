/**
 * Nose Shape SVG Assets
 *
 * Realistic nose shapes with proper anatomical detail.
 * Each nose includes: bridge shadow, bridge highlight, tip shape,
 * nostrils, shadow under tip, and alar (nostril wing) definition.
 *
 * Uses color tokens: {{skin}}, {{skinShadow}}, {{skinHighlight}}
 */

export const noses = {
  // Straight nose - Straight bridge, medium width, balanced proportions
  // Features: bridge shadow/highlight, center ridge, tip with nostrils, alar wings
  straight: `<svg viewBox="0 0 200 200"><path d="M96 78 Q94 98 95 116" stroke="{{skinShadow}}" stroke-width="2.5" fill="none" opacity=".24"/><path d="M104 80 Q106 98 105 114" stroke="{{skinHighlight}}" stroke-width="2.2" fill="none" opacity=".18"/><path d="M100 82 L100 112" stroke="{{skinHighlight}}" stroke-width="1.5" fill="none" opacity=".08"/><ellipse cx="100" cy="120" rx="11" ry="7" fill="{{skin}}"/><ellipse cx="101" cy="118" rx="8" ry="5" fill="{{skinHighlight}}" opacity=".14"/><ellipse cx="91" cy="124" rx="5" ry="3.5" fill="{{skinShadow}}" opacity=".32"/><ellipse cx="109" cy="124" rx="5" ry="3.5" fill="{{skinShadow}}" opacity=".32"/><ellipse cx="100" cy="128" rx="14" ry="4" fill="{{skinShadow}}" opacity=".14"/><path d="M85 120 Q82 125 86 128" stroke="{{skinShadow}}" stroke-width="1.8" fill="none" opacity=".2"/><path d="M115 120 Q118 125 114 128" stroke="{{skinShadow}}" stroke-width="1.8" fill="none" opacity=".2"/></svg>`,

  // Curved nose - Gentle concave curve to bridge, soft nostril definition
  // Features: concave bridge shadow/highlight, mid-bridge accent, soft tip, alar wings
  curved: `<svg viewBox="0 0 200 200"><path d="M96 78 Q99 92 98 106 Q97 114 96 118" stroke="{{skinShadow}}" stroke-width="2.5" fill="none" opacity=".24"/><path d="M104 80 Q101 94 102 108 Q103 114 104 116" stroke="{{skinHighlight}}" stroke-width="2" fill="none" opacity=".16"/><path d="M99 88 Q100 96 100 104" stroke="{{skinHighlight}}" stroke-width="1.2" fill="none" opacity=".08"/><ellipse cx="100" cy="120" rx="11" ry="7" fill="{{skin}}"/><ellipse cx="101" cy="118" rx="8" ry="5" fill="{{skinHighlight}}" opacity=".12"/><ellipse cx="91" cy="124" rx="5.5" ry="4" fill="{{skinShadow}}" opacity=".3"/><ellipse cx="109" cy="124" rx="5.5" ry="4" fill="{{skinShadow}}" opacity=".3"/><ellipse cx="100" cy="128" rx="14" ry="4" fill="{{skinShadow}}" opacity=".12"/><path d="M85 120 Q82 125 86 128" stroke="{{skinShadow}}" stroke-width="1.8" fill="none" opacity=".2"/><path d="M115 120 Q118 125 114 128" stroke="{{skinShadow}}" stroke-width="1.8" fill="none" opacity=".2"/></svg>`,

  // Roman nose - Prominent bridge with slight convex curve, strong profile
  roman: `<svg viewBox="0 0 200 200">
    <!-- Bridge shadow (left side) - pronounced convex curve -->
    <path d="M95 75 Q92 88 94 100 Q95 110 96 118" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.28"/>
    <!-- Bridge highlight (right side) - matches convex curve -->
    <path d="M105 77 Q108 90 106 102 Q105 112 104 116" stroke="{{skinHighlight}}" stroke-width="2" fill="none" opacity="0.15"/>
    <!-- Bridge bump highlight -->
    <ellipse cx="103" cy="92" rx="4" ry="6" fill="{{skinHighlight}}" opacity="0.1"/>
    <!-- Nose tip shape - slightly larger, more prominent -->
    <ellipse cx="100" cy="122" rx="12" ry="8" fill="{{skin}}"/>
    <ellipse cx="102" cy="120" rx="9" ry="5" fill="{{skinHighlight}}" opacity="0.12"/>
    <!-- Left nostril -->
    <ellipse cx="90" cy="126" rx="5.5" ry="4" fill="{{skinShadow}}" opacity="0.3"/>
    <!-- Right nostril -->
    <ellipse cx="110" cy="126" rx="5.5" ry="4" fill="{{skinShadow}}" opacity="0.3"/>
    <!-- Shadow under tip -->
    <ellipse cx="100" cy="131" rx="15" ry="4.5" fill="{{skinShadow}}" opacity="0.14"/>
    <!-- Left alar -->
    <path d="M83 122 Q80 128 85 131" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.2"/>
    <!-- Right alar -->
    <path d="M117 122 Q120 128 115 131" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.2"/>
  </svg>`,

  // Button nose - Small, round tip, turned up slightly, subtle bridge
  button: `<svg viewBox="0 0 200 200">
    <!-- Bridge shadow (left side) - short and subtle -->
    <path d="M97 88 Q95 100 96 112" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.18"/>
    <!-- Bridge highlight (right side) -->
    <path d="M103 90 Q105 100 104 110" stroke="{{skinHighlight}}" stroke-width="1.5" fill="none" opacity="0.12"/>
    <!-- Nose tip shape - round, cute button shape -->
    <circle cx="100" cy="116" r="10" fill="{{skin}}"/>
    <ellipse cx="102" cy="114" rx="6" ry="5" fill="{{skinHighlight}}" opacity="0.15"/>
    <!-- Left nostril - small and round -->
    <ellipse cx="93" cy="119" rx="4" ry="3" fill="{{skinShadow}}" opacity="0.25"/>
    <!-- Right nostril -->
    <ellipse cx="107" cy="119" rx="4" ry="3" fill="{{skinShadow}}" opacity="0.25"/>
    <!-- Shadow under tip -->
    <ellipse cx="100" cy="124" rx="11" ry="3.5" fill="{{skinShadow}}" opacity="0.1"/>
    <!-- Left alar - subtle curves -->
    <path d="M87 115 Q85 119 88 122" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.15"/>
    <!-- Right alar -->
    <path d="M113 115 Q115 119 112 122" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.15"/>
  </svg>`,

  // Snub nose - Short, slightly upturned, round tip
  snub: `<svg viewBox="0 0 200 200">
    <!-- Bridge shadow (left side) - short, curves up at end -->
    <path d="M96 85 Q94 98 95 108 Q96 114 98 112" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.2"/>
    <!-- Bridge highlight (right side) - upturned curve -->
    <path d="M104 87 Q106 98 105 108 Q104 113 102 111" stroke="{{skinHighlight}}" stroke-width="1.5" fill="none" opacity="0.12"/>
    <!-- Nose tip shape - round and upturned -->
    <ellipse cx="100" cy="114" rx="10" ry="6" fill="{{skin}}"/>
    <ellipse cx="101" cy="112" rx="7" ry="4" fill="{{skinHighlight}}" opacity="0.14"/>
    <!-- Tip upturn accent -->
    <path d="M95 110 Q100 106 105 110" stroke="{{skinHighlight}}" stroke-width="1.5" fill="none" opacity="0.1"/>
    <!-- Left nostril - slightly visible from upturn -->
    <ellipse cx="93" cy="117" rx="4.5" ry="3.5" fill="{{skinShadow}}" opacity="0.28"/>
    <!-- Right nostril -->
    <ellipse cx="107" cy="117" rx="4.5" ry="3.5" fill="{{skinShadow}}" opacity="0.28"/>
    <!-- Shadow under tip -->
    <ellipse cx="100" cy="122" rx="12" ry="3.5" fill="{{skinShadow}}" opacity="0.1"/>
    <!-- Left alar -->
    <path d="M86 113 Q84 118 87 120" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.16"/>
    <!-- Right alar -->
    <path d="M114 113 Q116 118 113 120" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.16"/>
  </svg>`,

  // Wide nose - Broader bridge, wider nostrils, flatter profile
  // Features: wide bridge shadow/highlight, flat center, large nostrils, prominent alar
  wide: `<svg viewBox="0 0 200 200"><path d="M93 82 Q90 98 92 116" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity=".22"/><path d="M107 84 Q110 98 108 114" stroke="{{skinHighlight}}" stroke-width="2.5" fill="none" opacity=".14"/><ellipse cx="100" cy="98" rx="6" ry="3" fill="{{skinHighlight}}" opacity=".06"/><ellipse cx="100" cy="120" rx="16" ry="8" fill="{{skin}}"/><ellipse cx="102" cy="118" rx="12" ry="5" fill="{{skinHighlight}}" opacity=".1"/><ellipse cx="85" cy="124" rx="7.5" ry="5.5" fill="{{skinShadow}}" opacity=".34"/><ellipse cx="115" cy="124" rx="7.5" ry="5.5" fill="{{skinShadow}}" opacity=".34"/><ellipse cx="100" cy="130" rx="18" ry="5" fill="{{skinShadow}}" opacity=".14"/><path d="M77 118 Q73 126 79 130" stroke="{{skinShadow}}" stroke-width="2.2" fill="none" opacity=".22"/><path d="M123 118 Q127 126 121 130" stroke="{{skinShadow}}" stroke-width="2.2" fill="none" opacity=".22"/></svg>`,

  // Pointed nose - Sharp tip, narrow bridge with prominent highlight
  // Features: narrow bridge, sharp ridge highlight, small pointed tip, delicate alar
  pointed: `<svg viewBox="0 0 200 200"><path d="M97 78 Q95 98 96 116" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity=".24"/><path d="M103 80 Q105 98 104 114" stroke="{{skinHighlight}}" stroke-width="2.2" fill="none" opacity=".2"/><path d="M100 80 L100 114" stroke="{{skinHighlight}}" stroke-width="1.8" fill="none" opacity=".12"/><ellipse cx="100" cy="118" rx="8" ry="5" fill="{{skin}}"/><ellipse cx="101" cy="116" rx="5" ry="3" fill="{{skinHighlight}}" opacity=".16"/><path d="M97 116 Q100 121 103 116" stroke="{{skinShadow}}" stroke-width="1" fill="none" opacity=".1"/><ellipse cx="93" cy="122" rx="4" ry="3" fill="{{skinShadow}}" opacity=".3"/><ellipse cx="107" cy="122" rx="4" ry="3" fill="{{skinShadow}}" opacity=".3"/><ellipse cx="100" cy="125" rx="10" ry="3" fill="{{skinShadow}}" opacity=".12"/><path d="M88 118 Q86 122 88 124" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity=".18"/><path d="M112 118 Q114 122 112 124" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity=".18"/></svg>`,

  // Narrow nose - Thin bridge, narrow nostrils, refined appearance
  narrow: `<svg viewBox="0 0 200 200">
    <!-- Bridge shadow (left side) - thin and delicate -->
    <path d="M97 78 Q96 98 97 116" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.22"/>
    <!-- Bridge highlight (right side) -->
    <path d="M103 80 Q104 98 103 114" stroke="{{skinHighlight}}" stroke-width="1.5" fill="none" opacity="0.14"/>
    <!-- Nose tip shape - narrow and refined -->
    <ellipse cx="100" cy="119" rx="8" ry="5" fill="{{skin}}"/>
    <ellipse cx="101" cy="117" rx="5" ry="3" fill="{{skinHighlight}}" opacity="0.12"/>
    <!-- Left nostril - small and narrow -->
    <ellipse cx="94" cy="122" rx="3.5" ry="2.5" fill="{{skinShadow}}" opacity="0.25"/>
    <!-- Right nostril -->
    <ellipse cx="106" cy="122" rx="3.5" ry="2.5" fill="{{skinShadow}}" opacity="0.25"/>
    <!-- Shadow under tip -->
    <ellipse cx="100" cy="126" rx="10" ry="3" fill="{{skinShadow}}" opacity="0.1"/>
    <!-- Left alar - subtle, refined curves -->
    <path d="M89 118 Q87 122 89 125" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.16"/>
    <!-- Right alar -->
    <path d="M111 118 Q113 122 111 125" stroke="{{skinShadow}}" stroke-width="1.5" fill="none" opacity="0.16"/>
  </svg>`,

  // Hooked nose - Convex bridge with downward pointing tip
  hooked: `<svg viewBox="0 0 200 200">
    <!-- Bridge shadow (left side) - strong convex curve -->
    <path d="M94 75 Q90 92 93 108 Q95 120 97 124" stroke="{{skinShadow}}" stroke-width="2.8" fill="none" opacity="0.28"/>
    <!-- Bridge highlight (right side) -->
    <path d="M106 77 Q110 94 107 110 Q105 120 103 122" stroke="{{skinHighlight}}" stroke-width="2" fill="none" opacity="0.14"/>
    <!-- Bridge bump highlight -->
    <ellipse cx="104" cy="94" rx="5" ry="7" fill="{{skinHighlight}}" opacity="0.1"/>
    <!-- Nose tip shape - points downward -->
    <ellipse cx="100" cy="124" rx="10" ry="7" fill="{{skin}}"/>
    <path d="M95 122 Q100 130 105 122" fill="{{skin}}"/>
    <ellipse cx="102" cy="122" rx="6" ry="4" fill="{{skinHighlight}}" opacity="0.1"/>
    <!-- Left nostril -->
    <ellipse cx="91" cy="126" rx="5" ry="3.5" fill="{{skinShadow}}" opacity="0.28"/>
    <!-- Right nostril -->
    <ellipse cx="109" cy="126" rx="5" ry="3.5" fill="{{skinShadow}}" opacity="0.28"/>
    <!-- Shadow under tip - elongated due to downward point -->
    <ellipse cx="100" cy="132" rx="13" ry="4" fill="{{skinShadow}}" opacity="0.14"/>
    <!-- Left alar -->
    <path d="M84 122 Q81 128 85 131" stroke="{{skinShadow}}" stroke-width="1.8" fill="none" opacity="0.18"/>
    <!-- Right alar -->
    <path d="M116 122 Q119 128 115 131" stroke="{{skinShadow}}" stroke-width="1.8" fill="none" opacity="0.18"/>
  </svg>`,

  // Flat nose - Low bridge, wide nostrils, minimal projection
  flat: `<svg viewBox="0 0 200 200">
    <!-- Bridge shadow (left side) - very subtle, low projection -->
    <path d="M94 92 Q92 104 94 116" stroke="{{skinShadow}}" stroke-width="2.5" fill="none" opacity="0.15"/>
    <!-- Bridge highlight (right side) - minimal -->
    <path d="M106 94 Q108 104 106 114" stroke="{{skinHighlight}}" stroke-width="2" fill="none" opacity="0.1"/>
    <!-- Nose tip shape - wide and flat -->
    <ellipse cx="100" cy="118" rx="14" ry="6" fill="{{skin}}"/>
    <ellipse cx="102" cy="116" rx="10" ry="4" fill="{{skinHighlight}}" opacity="0.08"/>
    <!-- Left nostril - wide and visible -->
    <ellipse cx="87" cy="122" rx="6" ry="4.5" fill="{{skinShadow}}" opacity="0.28"/>
    <!-- Right nostril -->
    <ellipse cx="113" cy="122" rx="6" ry="4.5" fill="{{skinShadow}}" opacity="0.28"/>
    <!-- Shadow under tip - wide and shallow -->
    <ellipse cx="100" cy="127" rx="17" ry="4" fill="{{skinShadow}}" opacity="0.1"/>
    <!-- Left alar - wide, flatter curves -->
    <path d="M79 116 Q76 122 80 126" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.18"/>
    <!-- Right alar -->
    <path d="M121 116 Q124 122 120 126" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.18"/>
  </svg>`,
};

export default noses;
