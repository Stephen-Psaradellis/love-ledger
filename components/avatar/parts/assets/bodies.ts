/**
 * Body Shape SVG Assets (Full Body View)
 *
 * Different body types for full-body avatars.
 * Uses color tokens: {{skin}}, {{skinShadow}}
 */

export const bodies = {
  slim: `<svg viewBox="0 0 200 400">
    <!-- Neck -->
    <rect x="88" y="175" width="24" height="25" fill="{{skin}}" />
    <!-- Shoulders and torso -->
    <path d="M55 200 Q55 210 60 220 L60 300 Q60 320 75 330 L125 330 Q140 320 140 300 L140 220 Q145 210 145 200" fill="{{skin}}" />
    <!-- Arms -->
    <path d="M55 200 Q40 210 35 260 L35 320 Q35 330 40 335 L50 335 Q55 330 55 320 L55 230" fill="{{skin}}" />
    <path d="M145 200 Q160 210 165 260 L165 320 Q165 330 160 335 L150 335 Q145 330 145 320 L145 230" fill="{{skin}}" />
    <!-- Hips/legs start -->
    <path d="M75 330 L70 400" stroke="{{skin}}" stroke-width="22" fill="none" />
    <path d="M125 330 L130 400" stroke="{{skin}}" stroke-width="22" fill="none" />
    <!-- Body shadows -->
    <path d="M80 220 L80 320" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.15" />
    <path d="M120 220 L120 320" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.15" />
  </svg>`,

  average: `<svg viewBox="0 0 200 400">
    <rect x="85" y="175" width="30" height="25" fill="{{skin}}" />
    <path d="M48 200 Q48 215 55 225 L55 305 Q55 325 75 335 L125 335 Q145 325 145 305 L145 225 Q152 215 152 200" fill="{{skin}}" />
    <!-- Arms -->
    <path d="M48 200 Q32 215 28 270 L28 325 Q28 338 35 342 L48 342 Q55 338 55 325 L55 235" fill="{{skin}}" />
    <path d="M152 200 Q168 215 172 270 L172 325 Q172 338 165 342 L152 342 Q145 338 145 325 L145 235" fill="{{skin}}" />
    <!-- Legs -->
    <path d="M75 335 L68 400" stroke="{{skin}}" stroke-width="28" fill="none" />
    <path d="M125 335 L132 400" stroke="{{skin}}" stroke-width="28" fill="none" />
    <!-- Shadows -->
    <ellipse cx="100" cy="270" rx="35" ry="5" fill="{{skinShadow}}" opacity="0.1" />
  </svg>`,

  athletic: `<svg viewBox="0 0 200 400">
    <rect x="82" y="172" width="36" height="28" fill="{{skin}}" />
    <!-- Broader shoulders, tapered waist -->
    <path d="M40 200 Q38 220 50 235 L55 290 Q55 300 65 310 L65 335 L135 335 L135 310 Q145 300 145 290 L150 235 Q162 220 160 200" fill="{{skin}}" />
    <!-- Muscular arms -->
    <path d="M40 200 Q22 220 20 275 L20 330 Q20 345 30 348 L45 348 Q55 345 55 330 L55 245" fill="{{skin}}" />
    <path d="M160 200 Q178 220 180 275 L180 330 Q180 345 170 348 L155 348 Q145 345 145 330 L145 245" fill="{{skin}}" />
    <!-- Defined legs -->
    <path d="M65 335 L58 400" stroke="{{skin}}" stroke-width="32" fill="none" />
    <path d="M135 335 L142 400" stroke="{{skin}}" stroke-width="32" fill="none" />
    <!-- Muscle definition hints -->
    <path d="M75 235 Q100 250 125 235" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.15" />
    <path d="M70 270 L70 300" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.12" />
    <path d="M130 270 L130 300" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.12" />
  </svg>`,

  plus: `<svg viewBox="0 0 200 400">
    <rect x="80" y="172" width="40" height="28" fill="{{skin}}" />
    <!-- Fuller figure -->
    <path d="M42 200 Q38 230 45 260 Q42 300 50 330 L50 340 L150 340 L150 330 Q158 300 155 260 Q162 230 158 200" fill="{{skin}}" />
    <!-- Arms -->
    <path d="M42 200 Q25 225 22 280 L22 335 Q22 350 32 354 L48 354 Q58 350 55 335 L52 250" fill="{{skin}}" />
    <path d="M158 200 Q175 225 178 280 L178 335 Q178 350 168 354 L152 354 Q142 350 145 335 L148 250" fill="{{skin}}" />
    <!-- Legs -->
    <path d="M60 340 L55 400" stroke="{{skin}}" stroke-width="35" fill="none" />
    <path d="M140 340 L145 400" stroke="{{skin}}" stroke-width="35" fill="none" />
    <!-- Soft curves -->
    <ellipse cx="100" cy="280" rx="45" ry="8" fill="{{skinShadow}}" opacity="0.08" />
  </svg>`,

  muscular: `<svg viewBox="0 0 200 400">
    <rect x="78" y="168" width="44" height="32" fill="{{skin}}" />
    <!-- Very broad shoulders, V-taper -->
    <path d="M32 200 Q28 225 42 250 L50 295 Q50 310 60 320 L60 340 L140 340 L140 320 Q150 310 150 295 L158 250 Q172 225 168 200" fill="{{skin}}" />
    <!-- Large muscular arms -->
    <path d="M32 200 Q12 230 10 285 L10 340 Q10 358 24 362 L42 362 Q55 358 52 340 L50 255" fill="{{skin}}" />
    <path d="M168 200 Q188 230 190 285 L190 340 Q190 358 176 362 L158 362 Q145 358 148 340 L150 255" fill="{{skin}}" />
    <!-- Strong legs -->
    <path d="M60 340 L52 400" stroke="{{skin}}" stroke-width="38" fill="none" />
    <path d="M140 340 L148 400" stroke="{{skin}}" stroke-width="38" fill="none" />
    <!-- Muscle definition -->
    <path d="M70 230 Q100 250 130 230" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.18" />
    <path d="M65 265 L65 305" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.15" />
    <path d="M135 265 L135 305" stroke="{{skinShadow}}" stroke-width="3" fill="none" opacity="0.15" />
    <path d="M85 260 Q100 275 115 260" stroke="{{skinShadow}}" stroke-width="2" fill="none" opacity="0.12" />
  </svg>`,
};

export default bodies;
