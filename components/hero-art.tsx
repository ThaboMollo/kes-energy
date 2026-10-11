// Lightweight inline illustration: a house with rooftop panels, sun and a battery unit.
// Replace with a real installation photo (via next/image) when the client supplies one.
export function HeroArt({ className = "" }: { className?: string }) {
  const cells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={col * 26}
          y={row * 22}
          width="23"
          height="19"
          rx="2"
          fill={row === 0 ? "#2a3d8f" : "#1e2f78"}
          stroke="#8191cf"
          strokeWidth="0.75"
        />,
      );
    }
  }

  return (
    <svg viewBox="0 0 480 400" className={className} role="img" aria-labelledby="hero-art-title">
      <title id="hero-art-title">A home with rooftop solar panels and a battery backup unit in the sun</title>
      <defs>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe68a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffc81f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="unit" x1="0" x2="1">
          <stop offset="0%" stopColor="#1c1f2a" />
          <stop offset="100%" stopColor="#3a3f52" />
        </linearGradient>
      </defs>

      {/* Sun */}
      <circle cx="370" cy="90" r="90" fill="url(#sun-glow)" />
      <circle cx="370" cy="90" r="42" fill="#ffc81f" />
      <g stroke="#f5b400" strokeWidth="6" strokeLinecap="round">
        <path d="M370 22v-14M370 172v-14M302 90h-14M452 90h-14M322 42l-10-10M428 148l-10-10M322 138l-10 10M428 32l-10 10" />
      </g>

      {/* Ground */}
      <ellipse cx="240" cy="372" rx="230" ry="18" fill="#121d4f" opacity="0.12" />

      {/* House */}
      <path d="M70 230 L200 140 L330 230 Z" fill="#121d4f" />
      <rect x="92" y="226" width="216" height="140" fill="#ffffff" stroke="#d9def2" strokeWidth="2" />
      <rect x="182" y="286" width="40" height="80" rx="3" fill="#e2362b" />
      <rect x="112" y="258" width="46" height="38" rx="3" fill="#ffe68a" stroke="#d9def2" strokeWidth="2" />
      <rect x="244" y="258" width="46" height="38" rx="3" fill="#ffe68a" stroke="#d9def2" strokeWidth="2" />

      {/* Rooftop panels, skewed to sit on the roof slope */}
      <g transform="translate(206 147) skewY(34) scale(0.47)">{cells}</g>

      {/* Battery / inverter unit */}
      <g transform="translate(350 250)">
        <rect width="76" height="116" rx="10" fill="url(#unit)" />
        <rect x="50" y="34" width="16" height="22" rx="2" fill="#121d4f" stroke="#e2362b" strokeWidth="1.5" />
        <rect x="12" y="26" width="4" height="40" rx="2" fill="#22c55e" />
        <circle cx="38" cy="16" r="5" fill="#e2362b" />
      </g>

      {/* Power line from roof to unit */}
      <path d="M310 228 C340 228 360 220 380 250" fill="none" stroke="#ffc81f" strokeWidth="3" strokeDasharray="6 6" />
    </svg>
  );
}
