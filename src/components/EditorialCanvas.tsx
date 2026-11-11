interface TonePalette {
  sky1: string;
  sky2: string;
  blobA: string;
  blobB: string;
  line: string;
  veil: string;
}

// 12 curated editorial compositions — warm ivory, champagne, blush, espresso.
const TONES: TonePalette[] = [
  { sky1: "#f3ebdd", sky2: "#e3d3bd", blobA: "#dcc9b2", blobB: "#eedfd2", line: "#a98f5f", veil: "rgba(59,47,40,0.10)" },
  { sky1: "#efe7dc", sky2: "#d9c7ae", blobA: "#cbb394", blobB: "#e8d9ca", line: "#8a6f47", veil: "rgba(59,47,40,0.12)" },
  { sky1: "#f5efe7", sky2: "#e6d8c6", blobA: "#d3bca2", blobB: "#ebd9cf", line: "#a98f5f", veil: "rgba(59,47,40,0.09)" },
  { sky1: "#f0e6db", sky2: "#dcc9b4", blobA: "#c4a68a", blobB: "#e6d3c6", line: "#7d623f", veil: "rgba(59,47,40,0.14)" },
  { sky1: "#efe0d6", sky2: "#d9beb0", blobA: "#c1998a", blobB: "#e8d2c8", line: "#9a6f5c", veil: "rgba(42,33,29,0.12)" },
  { sky1: "#f0e4d9", sky2: "#dcc6b2", blobA: "#cfa98d", blobB: "#ead6c8", line: "#8f6d4a", veil: "rgba(42,33,29,0.10)" },
  { sky1: "#eee4da", sky2: "#d6bfa9", blobA: "#c2a081", blobB: "#e5d0c2", line: "#9c7c55", veil: "rgba(42,33,29,0.13)" },
  { sky1: "#efe3d7", sky2: "#d7b9ab", blobA: "#c9a290", blobB: "#e8d8cb", line: "#93684f", veil: "rgba(42,33,29,0.12)" },
  { sky1: "#f4eee5", sky2: "#e2d1bd", blobA: "#d0b494", blobB: "#ecdccd", line: "#a2875c", veil: "rgba(59,47,40,0.10)" },
  { sky1: "#ede3d6", sky2: "#d3bb9f", blobA: "#bb9a79", blobB: "#e2d0bf", line: "#866a44", veil: "rgba(42,33,29,0.14)" },
  { sky1: "#f2eadf", sky2: "#ddcbaf", blobA: "#cdb08e", blobB: "#ead9c9", line: "#9c8360", veil: "rgba(59,47,40,0.10)" },
  { sky1: "#efe7dd", sky2: "#d8c2b2", blobA: "#c6a490", blobB: "#e7d5c9", line: "#906a52", veil: "rgba(42,33,29,0.12)" },
];

export function EditorialCanvas({
  tone,
  label,
  className,
}: {
  tone: number;
  label?: string;
  className?: string;
}) {
  const t = TONES[Math.abs(tone) % TONES.length];
  const initials = (label ?? "B")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <svg
      className={className ?? "canvas-art"}
      viewBox="0 0 600 750"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id={`sky-${tone}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.sky1} />
          <stop offset="100%" stopColor={t.sky2} />
        </linearGradient>
        <radialGradient id={`blobA-${tone}`} cx="0.25" cy="0.25" r="0.9">
          <stop offset="0%" stopColor={t.blobA} stopOpacity="0.9" />
          <stop offset="100%" stopColor={t.sky1} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`blobB-${tone}`} cx="0.8" cy="0.8" r="1">
          <stop offset="0%" stopColor={t.blobB} stopOpacity="0.9" />
          <stop offset="100%" stopColor={t.sky2} stopOpacity="0" />
        </radialGradient>
        <filter id={`grain-${tone}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.05 0.06 0.02 0" />
          </feComponentTransfer>
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
        <clipPath id={`drape-${tone}`}>
          <path d="M0,0 H600 V470 C470,560 360,470 300,520 C240,570 150,470 0,540 Z" />
        </clipPath>
      </defs>

      {/* base sky */}
      <rect width="600" height="750" fill={`url(#sky-${tone})`} />

      {/* soft color field */}
      <rect width="600" height="750" fill={`url(#blobA-${tone})`} />
      <rect width="600" height="750" fill={`url(#blobB-${tone})`} />

      {/* draped fabric form */}
      <path
        d="M0,210 C120,160 210,250 300,210 C390,170 480,250 600,180 V750 H0 Z"
        fill={t.blobA}
        opacity="0.28"
      />
      <path
        d="M0,320 C150,270 260,360 380,310 C470,275 540,330 600,300 V750 H0 Z"
        fill={t.blobB}
        opacity="0.4"
      />

      {/* vertical gold rule */}
      <rect x="300" y="84" width="1" height="90" fill={t.line} opacity="0.75" />

      {/* monogram */}
      <text
        x="300"
        y="300"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="150"
        fill={t.line}
        fillOpacity="0.42"
        letterSpacing="2"
      >
        {initials || "B"}
      </text>
      <text
        x="300"
        y="344"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="13"
        letterSpacing="7"
        fill="#3b2f28"
        fillOpacity="0.5"
      >
        BOUTIQUE
      </text>

      {/* fabric sheen curve */}
      <path
        d="M0,540 C150,470 300,560 430,500 C500,470 560,510 600,490"
        fill="none"
        stroke={t.veil}
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M0,585 C160,520 320,610 460,545 C520,515 570,548 600,535"
        fill="none"
        stroke={t.veil}
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* grain overlay */}
      <rect width="600" height="750" filter={`url(#grain-${tone})`} opacity="0.9" />
    </svg>
  );
}
