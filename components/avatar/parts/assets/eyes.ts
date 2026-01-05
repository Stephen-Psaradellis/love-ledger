/**
 * Eye Shape SVG Assets - Optimized for size (<2KB each)
 * Features: iris gradient, limbal ring, pupil reflections, waterline, lid crease
 * Tokens: {{eye}}, {{eyeWhite}}, {{eyePupil}}, {{skin}}
 */

export const eyes = {
  almond: `<svg viewBox="0 0 200 200"><defs><radialGradient id="iAL" cx="40%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient><radialGradient id="iAR" cx="60%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient></defs><g transform="translate(55,90)"><ellipse rx="18" ry="11" fill="{{eyeWhite}}"/><path d="M-16-4Q0-10 16-4L16 0Q0-6-16 0Z" fill="{{eyePupil}}" opacity=".08"/><circle cx="2" r="8" fill="url(#iAL)"/><circle cx="2" r="8" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".4"/><circle cx="2" r="4" fill="{{eyePupil}}"/><ellipse cx="5" cy="-2" rx="2" ry="1.5" fill="#FFF" opacity=".9"/><circle cx="-1" cy="2" r="1" fill="#FFF" opacity=".3"/><path d="M-17-6Q0-14 17-6" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity=".15"/><path d="M-15 5Q0 9 15 5" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity=".4"/><path d="M-14 7Q0 10 14 7" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity=".05"/></g><g transform="translate(145,90)"><ellipse rx="18" ry="11" fill="{{eyeWhite}}"/><path d="M-16-4Q0-10 16-4L16 0Q0-6-16 0Z" fill="{{eyePupil}}" opacity=".08"/><circle cx="-2" r="8" fill="url(#iAR)"/><circle cx="-2" r="8" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".4"/><circle cx="-2" r="4" fill="{{eyePupil}}"/><ellipse cx="-5" cy="-2" rx="2" ry="1.5" fill="#FFF" opacity=".9"/><circle cx="1" cy="2" r="1" fill="#FFF" opacity=".3"/><path d="M-17-6Q0-14 17-6" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity=".15"/><path d="M-15 5Q0 9 15 5" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity=".4"/><path d="M-14 7Q0 10 14 7" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity=".05"/></g></svg>`,

  round: `<svg viewBox="0 0 200 200"><defs><radialGradient id="iRL" cx="40%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient><radialGradient id="iRR" cx="60%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient></defs><g transform="translate(55,90)"><circle r="14" fill="{{eyeWhite}}"/><path d="M-12-6Q0-14 12-6L12-2Q0-10-12-2Z" fill="{{eyePupil}}" opacity=".08"/><circle cx="1" r="9" fill="url(#iRL)"/><circle cx="1" r="9" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".4"/><circle cx="1" r="5" fill="{{eyePupil}}"/><ellipse cx="4" cy="-3" rx="2.5" ry="2" fill="#FFF" opacity=".9"/><circle cx="-2" cy="3" r="1.2" fill="#FFF" opacity=".3"/><path d="M-13-8Q0-16 13-8" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity=".15"/><path d="M-11 8Q0 13 11 8" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity=".4"/><path d="M-10 10Q0 14 10 10" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity=".05"/></g><g transform="translate(145,90)"><circle r="14" fill="{{eyeWhite}}"/><path d="M-12-6Q0-14 12-6L12-2Q0-10-12-2Z" fill="{{eyePupil}}" opacity=".08"/><circle cx="-1" r="9" fill="url(#iRR)"/><circle cx="-1" r="9" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".4"/><circle cx="-1" r="5" fill="{{eyePupil}}"/><ellipse cx="-4" cy="-3" rx="2.5" ry="2" fill="#FFF" opacity=".9"/><circle cx="2" cy="3" r="1.2" fill="#FFF" opacity=".3"/><path d="M-13-8Q0-16 13-8" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity=".15"/><path d="M-11 8Q0 13 11 8" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity=".4"/><path d="M-10 10Q0 14 10 10" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity=".05"/></g></svg>`,

  monolid: `<svg viewBox="0 0 200 200"><defs><radialGradient id="iML" cx="40%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient><radialGradient id="iMR" cx="60%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient></defs><g transform="translate(55,90)"><ellipse rx="20" ry="8" fill="{{eyeWhite}}"/><path d="M-18-3Q0-7 18-3L18 0Q0-4-18 0Z" fill="{{eyePupil}}" opacity=".06"/><ellipse cx="2" rx="7" ry="6" fill="url(#iML)"/><ellipse cx="2" rx="7" ry="6" fill="none" stroke="{{eyePupil}}" stroke-width=".7" opacity=".35"/><ellipse cx="2" rx="4" ry="3.5" fill="{{eyePupil}}"/><ellipse cx="5" cy="-2" rx="1.8" ry="1.2" fill="#FFF" opacity=".9"/><circle cx="-1" cy="1.5" r=".8" fill="#FFF" opacity=".3"/><path d="M-18-2Q0-6 18-2" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".12"/><path d="M-17 4Q0 7 17 4" fill="none" stroke="#E8B4B4" opacity=".35"/><path d="M-16 5Q0 8 16 5" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity=".04"/></g><g transform="translate(145,90)"><ellipse rx="20" ry="8" fill="{{eyeWhite}}"/><path d="M-18-3Q0-7 18-3L18 0Q0-4-18 0Z" fill="{{eyePupil}}" opacity=".06"/><ellipse cx="-2" rx="7" ry="6" fill="url(#iMR)"/><ellipse cx="-2" rx="7" ry="6" fill="none" stroke="{{eyePupil}}" stroke-width=".7" opacity=".35"/><ellipse cx="-2" rx="4" ry="3.5" fill="{{eyePupil}}"/><ellipse cx="-5" cy="-2" rx="1.8" ry="1.2" fill="#FFF" opacity=".9"/><circle cx="1" cy="1.5" r=".8" fill="#FFF" opacity=".3"/><path d="M-18-2Q0-6 18-2" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".12"/><path d="M-17 4Q0 7 17 4" fill="none" stroke="#E8B4B4" opacity=".35"/><path d="M-16 5Q0 8 16 5" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity=".04"/></g></svg>`,

  hooded: `<svg viewBox="0 0 200 200"><defs><radialGradient id="iHL" cx="40%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient><radialGradient id="iHR" cx="60%" cy="40%" r="50%"><stop offset="0%" stop-color="{{eye}}" stop-opacity=".7"/><stop offset="60%" stop-color="{{eye}}"/><stop offset="100%" stop-color="{{eyePupil}}" stop-opacity=".4"/></radialGradient></defs><g transform="translate(55,90)"><ellipse cy="2" rx="17" ry="9" fill="{{eyeWhite}}"/><path d="M-15-2Q0-8 15-2L15 2Q0-4-15 2Z" fill="{{eyePupil}}" opacity=".1"/><circle cx="1" cy="2" r="7" fill="url(#iHL)"/><circle cx="1" cy="2" r="7" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".4"/><circle cx="1" cy="2" r="4" fill="{{eyePupil}}"/><ellipse cx="4" rx="2" ry="1" fill="#FFF" opacity=".8"/><circle cx="-1" cy="4" r="1" fill="#FFF" opacity=".2"/><path d="M-18-2Q0-10 18-2L18 3Q0-3-18 3Z" fill="{{skin}}" opacity=".7"/><path d="M-16-4Q0-12 16-4" fill="none" stroke="{{eyePupil}}" opacity=".1"/><path d="M-14 8Q0 11 14 8" fill="none" stroke="#E8B4B4" opacity=".4"/></g><g transform="translate(145,90)"><ellipse cy="2" rx="17" ry="9" fill="{{eyeWhite}}"/><path d="M-15-2Q0-8 15-2L15 2Q0-4-15 2Z" fill="{{eyePupil}}" opacity=".1"/><circle cx="-1" cy="2" r="7" fill="url(#iHR)"/><circle cx="-1" cy="2" r="7" fill="none" stroke="{{eyePupil}}" stroke-width=".8" opacity=".4"/><circle cx="-1" cy="2" r="4" fill="{{eyePupil}}"/><ellipse cx="-4" rx="2" ry="1" fill="#FFF" opacity=".8"/><circle cx="1" cy="4" r="1" fill="#FFF" opacity=".2"/><path d="M-18-2Q0-10 18-2L18 3Q0-3-18 3Z" fill="{{skin}}" opacity=".7"/><path d="M-16-4Q0-12 16-4" fill="none" stroke="{{eyePupil}}" opacity=".1"/><path d="M-14 8Q0 11 14 8" fill="none" stroke="#E8B4B4" opacity=".4"/></g></svg>`,

  downturned: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="irisGradDownL" cx="40%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
      <radialGradient id="irisGradDownR" cx="60%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
    </defs>
    <!-- Left eye - outer corner droops down -->
    <g transform="translate(55, 88)">
      <!-- Sclera base (asymmetric shape) -->
      <path d="M-18 2 Q0 -10 18 5 Q0 12 -18 2 Z" fill="{{eyeWhite}}"/>
      <!-- Sclera inner shadow -->
      <path d="M-16 -1 Q0 -8 16 2 L16 4 Q0 -4 -16 1 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <!-- Iris with gradient -->
      <circle cx="0" cy="0" r="7" fill="url(#irisGradDownL)"/>
      <!-- Limbal ring -->
      <circle cx="0" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <!-- Pupil -->
      <circle cx="0" cy="0" r="4" fill="{{eyePupil}}"/>
      <!-- Primary reflection -->
      <ellipse cx="3" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <!-- Secondary reflection -->
      <circle cx="-2" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <!-- Upper lid crease (follows downward angle) -->
      <path d="M-17 -4 Q-5 -12 17 0" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <!-- Waterline -->
      <path d="M-15 6 Q0 10 15 8" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <!-- Lower lid shadow -->
      <path d="M-14 7 Q0 11 14 9" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
    <!-- Right eye (mirrored droop) -->
    <g transform="translate(145, 88)">
      <path d="M-18 5 Q0 -10 18 2 Q0 12 -18 5 Z" fill="{{eyeWhite}}"/>
      <path d="M-16 2 Q0 -8 16 -1 L16 1 Q0 -4 -16 4 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <circle cx="0" cy="0" r="7" fill="url(#irisGradDownR)"/>
      <circle cx="0" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <circle cx="0" cy="0" r="4" fill="{{eyePupil}}"/>
      <ellipse cx="-3" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="2" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <path d="M-17 0 Q5 -12 17 -4" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <path d="M-15 8 Q0 10 15 6" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <path d="M-14 9 Q0 11 14 7" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
  </svg>`,

  upturned: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="irisGradUpL" cx="40%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
      <radialGradient id="irisGradUpR" cx="60%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
    </defs>
    <!-- Left eye - outer corner tilts up (cat eye) -->
    <g transform="translate(55, 92)">
      <!-- Sclera base (asymmetric shape) -->
      <path d="M-18 3 Q0 -8 20 -3 Q0 10 -18 3 Z" fill="{{eyeWhite}}"/>
      <!-- Sclera inner shadow -->
      <path d="M-16 0 Q0 -7 18 -4 L18 -2 Q0 -5 -16 2 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <!-- Iris with gradient -->
      <circle cx="2" cy="0" r="7" fill="url(#irisGradUpL)"/>
      <!-- Limbal ring -->
      <circle cx="2" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <!-- Pupil -->
      <circle cx="2" cy="0" r="4" fill="{{eyePupil}}"/>
      <!-- Primary reflection -->
      <ellipse cx="5" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <!-- Secondary reflection -->
      <circle cx="-1" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <!-- Upper lid crease (follows upward angle) -->
      <path d="M-17 0 Q-5 -10 18 -6" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <!-- Waterline -->
      <path d="M-15 6 Q0 9 17 4" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <!-- Lower lid shadow -->
      <path d="M-14 7 Q0 10 16 5" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
    <!-- Right eye (mirrored upturn) -->
    <g transform="translate(145, 92)">
      <path d="M-20 -3 Q0 -8 18 3 Q0 10 -20 -3 Z" fill="{{eyeWhite}}"/>
      <path d="M-18 -4 Q0 -7 16 0 L16 2 Q0 -5 -18 -2 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <circle cx="-2" cy="0" r="7" fill="url(#irisGradUpR)"/>
      <circle cx="-2" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <circle cx="-2" cy="0" r="4" fill="{{eyePupil}}"/>
      <ellipse cx="-5" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="1" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <path d="M-18 -6 Q5 -10 17 0" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <path d="M-17 4 Q0 9 15 6" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <path d="M-16 5 Q0 10 14 7" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
  </svg>`,

  wide: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="irisGradWideL" cx="40%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
      <radialGradient id="irisGradWideR" cx="60%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
    </defs>
    <!-- Left eye - positioned wider apart (at x=45) -->
    <g transform="translate(45, 90)">
      <!-- Sclera base -->
      <ellipse cx="0" cy="0" rx="16" ry="10" fill="{{eyeWhite}}"/>
      <!-- Sclera inner shadow -->
      <path d="M-14 -4 Q0 -9 14 -4 L14 0 Q0 -5 -14 0 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <!-- Iris with gradient -->
      <circle cx="1" cy="0" r="7" fill="url(#irisGradWideL)"/>
      <!-- Limbal ring -->
      <circle cx="1" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <!-- Pupil -->
      <circle cx="1" cy="0" r="4" fill="{{eyePupil}}"/>
      <!-- Primary reflection -->
      <ellipse cx="4" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <!-- Secondary reflection -->
      <circle cx="-2" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <!-- Upper lid crease -->
      <path d="M-15 -5 Q0 -12 15 -5" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <!-- Waterline -->
      <path d="M-13 5 Q0 8 13 5" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <!-- Lower lid shadow -->
      <path d="M-12 6 Q0 9 12 6" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
    <!-- Right eye (at x=155) -->
    <g transform="translate(155, 90)">
      <ellipse cx="0" cy="0" rx="16" ry="10" fill="{{eyeWhite}}"/>
      <path d="M-14 -4 Q0 -9 14 -4 L14 0 Q0 -5 -14 0 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <circle cx="-1" cy="0" r="7" fill="url(#irisGradWideR)"/>
      <circle cx="-1" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <circle cx="-1" cy="0" r="4" fill="{{eyePupil}}"/>
      <ellipse cx="-4" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="2" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <path d="M-15 -5 Q0 -12 15 -5" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <path d="M-13 5 Q0 8 13 5" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <path d="M-12 6 Q0 9 12 6" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
  </svg>`,

  close: `<svg viewBox="0 0 200 200">
    <defs>
      <radialGradient id="irisGradCloseL" cx="40%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
      <radialGradient id="irisGradCloseR" cx="60%" cy="40%" r="50%">
        <stop offset="0%" style="stop-color:{{eye}};stop-opacity:0.7"/>
        <stop offset="60%" style="stop-color:{{eye}};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:{{eyePupil}};stop-opacity:0.4"/>
      </radialGradient>
    </defs>
    <!-- Left eye - positioned closer together (at x=70) -->
    <g transform="translate(70, 90)">
      <!-- Sclera base -->
      <ellipse cx="0" cy="0" rx="16" ry="10" fill="{{eyeWhite}}"/>
      <!-- Sclera inner shadow -->
      <path d="M-14 -4 Q0 -9 14 -4 L14 0 Q0 -5 -14 0 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <!-- Iris with gradient -->
      <circle cx="2" cy="0" r="7" fill="url(#irisGradCloseL)"/>
      <!-- Limbal ring -->
      <circle cx="2" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <!-- Pupil -->
      <circle cx="2" cy="0" r="4" fill="{{eyePupil}}"/>
      <!-- Primary reflection -->
      <ellipse cx="5" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <!-- Secondary reflection -->
      <circle cx="-1" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <!-- Upper lid crease -->
      <path d="M-15 -5 Q0 -12 15 -5" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <!-- Waterline -->
      <path d="M-13 5 Q0 8 13 5" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <!-- Lower lid shadow -->
      <path d="M-12 6 Q0 9 12 6" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
    <!-- Right eye (at x=130) -->
    <g transform="translate(130, 90)">
      <ellipse cx="0" cy="0" rx="16" ry="10" fill="{{eyeWhite}}"/>
      <path d="M-14 -4 Q0 -9 14 -4 L14 0 Q0 -5 -14 0 Z" fill="{{eyePupil}}" opacity="0.08"/>
      <circle cx="-2" cy="0" r="7" fill="url(#irisGradCloseR)"/>
      <circle cx="-2" cy="0" r="7" fill="none" stroke="{{eyePupil}}" stroke-width="0.8" opacity="0.4"/>
      <circle cx="-2" cy="0" r="4" fill="{{eyePupil}}"/>
      <ellipse cx="-5" cy="-2" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="1" cy="2" r="1" fill="#FFFFFF" opacity="0.3"/>
      <path d="M-15 -5 Q0 -12 15 -5" fill="none" stroke="{{eyePupil}}" stroke-width="1.5" opacity="0.15"/>
      <path d="M-13 5 Q0 8 13 5" fill="none" stroke="#E8B4B4" stroke-width="1.2" opacity="0.4"/>
      <path d="M-12 6 Q0 9 12 6" fill="none" stroke="{{eyePupil}}" stroke-width="2" opacity="0.05"/>
    </g>
  </svg>`,
};

export default eyes;
