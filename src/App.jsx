import { useState, useEffect, useRef } from "react";
import firstImage from "./assets/first-image.png";
import secondImage from "./assets/second-image.png";

const YOUTUBE_VIDEO_ID = "GwyXQO0tSW4";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&disablekb=1&modestbranding=1&rel=0`;
const svgDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const IMG_GOLD_MOUNTAIN = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
  <rect width="1200" height="760" fill="#efe4cb"/>
  <rect y="500" width="1200" height="260" fill="#d9c49b"/>
  <rect y="380" width="1200" height="120" fill="#b8d4db"/>
  <path d="M0 410 L190 280 L360 390 L560 230 L760 360 L980 210 L1200 360 L1200 0 L0 0 Z" fill="#caa46a"/>
  <rect x="250" y="285" width="620" height="170" rx="18" fill="#8b1a1a"/>
  <rect x="210" y="440" width="700" height="38" rx="12" fill="#5b3418"/>
  <rect x="530" y="150" width="24" height="190" fill="#5b3418"/>
  <path d="M554 160 L760 250 L554 285 Z" fill="#d98d5f"/>
  <g fill="#402015">
    <circle cx="360" cy="468" r="18"/><circle cx="420" cy="462" r="17"/><circle cx="485" cy="470" r="19"/><circle cx="660" cy="468" r="18"/><circle cx="720" cy="462" r="17"/><circle cx="785" cy="470" r="19"/>
  </g>
  <text x="600" y="660" text-anchor="middle" font-family="Georgia, serif" font-size="48" fill="#6e1d1d">The Golden Mountain</text>
  <text x="600" y="710" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#5b3418">Arriving San Francisco, 1865</text>
</svg>`);

const IMG_CHINATOWN_STREET = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
  <rect width="1200" height="760" fill="#f2ead8"/>
  <rect y="490" width="1200" height="270" fill="#d7c4a1"/>
  <rect x="80" y="180" width="260" height="320" fill="#8b1a1a"/>
  <rect x="390" y="140" width="210" height="360" fill="#9c6a3d"/>
  <rect x="660" y="170" width="200" height="330" fill="#7a4b2e"/>
  <rect x="900" y="210" width="220" height="290" fill="#8b1a1a"/>
  <g fill="#f6e9bf">
    <rect x="120" y="230" width="65" height="90"/><rect x="220" y="230" width="65" height="90"/>
    <rect x="430" y="220" width="48" height="70"/><rect x="510" y="220" width="48" height="70"/>
    <rect x="710" y="235" width="46" height="74"/><rect x="780" y="235" width="46" height="74"/>
    <rect x="955" y="260" width="60" height="82"/><rect x="1035" y="260" width="60" height="82"/>
  </g>
  <g fill="#402015">
    <circle cx="270" cy="560" r="18"/><circle cx="350" cy="545" r="18"/><circle cx="460" cy="565" r="18"/><circle cx="580" cy="550" r="18"/><circle cx="760" cy="565" r="18"/><circle cx="910" cy="550" r="18"/>
  </g>
  <text x="600" y="675" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#6e1d1d">Sacramento Street, San Francisco</text>
  <text x="600" y="720" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#5b3418">Urban life, commerce, and surveillance</text>
</svg>`);

const IMG_CUSTOM_HOUSE = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
  <rect width="1200" height="760" fill="#efe7d4"/>
  <rect y="510" width="1200" height="250" fill="#d6c09b"/>
  <rect x="190" y="165" width="820" height="360" fill="#d9c7a6" stroke="#7a4b2e" stroke-width="8"/>
  <rect x="250" y="225" width="700" height="245" fill="#f6eddc" stroke="#7a4b2e" stroke-width="4"/>
  <g stroke="#7a4b2e" stroke-width="8">
    <line x1="330" y1="225" x2="330" y2="470"/><line x1="470" y1="225" x2="470" y2="470"/><line x1="610" y1="225" x2="610" y2="470"/><line x1="750" y1="225" x2="750" y2="470"/><line x1="890" y1="225" x2="890" y2="470"/>
  </g>
  <g fill="#402015">
    <circle cx="320" cy="560" r="20"/><circle cx="400" cy="548" r="20"/><circle cx="470" cy="564" r="20"/><circle cx="560" cy="548" r="20"/><circle cx="660" cy="564" r="20"/><circle cx="760" cy="548" r="20"/><circle cx="860" cy="564" r="20"/>
  </g>
  <text x="600" y="670" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#6e1d1d">San Francisco Custom House</text>
  <text x="600" y="715" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#5b3418">Inspection, waiting, and bureaucratic control</text>
</svg>`);

const IMG_CHINATOWN_MAP = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
  <rect width="1200" height="760" fill="#f5ecd9"/>
  <rect x="120" y="90" width="960" height="580" fill="#efe4c7" stroke="#8b1a1a" stroke-width="6"/>
  <g stroke="#8b1a1a" stroke-width="4">
    <line x1="240" y1="90" x2="240" y2="670"/><line x1="360" y1="90" x2="360" y2="670"/><line x1="480" y1="90" x2="480" y2="670"/><line x1="600" y1="90" x2="600" y2="670"/><line x1="720" y1="90" x2="720" y2="670"/><line x1="840" y1="90" x2="840" y2="670"/><line x1="960" y1="90" x2="960" y2="670"/>
    <line x1="120" y1="190" x2="1080" y2="190"/><line x1="120" y1="290" x2="1080" y2="290"/><line x1="120" y1="390" x2="1080" y2="390"/><line x1="120" y1="490" x2="1080" y2="490"/><line x1="120" y1="590" x2="1080" y2="590"/>
  </g>
  <g fill="#b8892a">
    <rect x="250" y="210" width="95" height="60"/><rect x="505" y="310" width="90" height="60"/><rect x="760" y="410" width="92" height="62"/><rect x="645" y="515" width="88" height="58"/>
  </g>
  <text x="600" y="145" text-anchor="middle" font-family="Georgia, serif" font-size="42" fill="#6e1d1d">Official Map of Chinatown</text>
  <text x="600" y="705" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#5b3418">Mapping a neighborhood as a space of control</text>
</svg>`);

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600&family=Atkinson+Hyperlegible:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ── Theme tokens (light / dark) ────────────────────────────────────────────────
const LIGHT = {
  "--bg": "#f7f1e6",
  "--bg2": "#f0e8d4",
  "--bg3": "#e8ddc4",
  "--panel": "#8b1a1a",
  "--panel2": "#7a1515",
  "--red": "#8b1a1a",
  "--red-mid": "#a52222",
  "--red-dim": "rgba(139,26,26,0.12)",
  "--gold": "#b8892a",
  "--gold-foil": "#c9a050",
  "--gold-dim": "rgba(201,160,80,0.22)",
  "--ink": "#2a1a0e",
  "--ink-mid": "rgba(42,26,14,0.65)",
  "--ink-light": "rgba(42,26,14,0.45)",
  "--ink-faint": "rgba(42,26,14,0.2)",
  "--rule": "rgba(184,137,42,0.3)",
  "--rule-red": "rgba(139,26,26,0.25)",
  "--icon-bg": "#8b1a1a",
  "--icon-fg": "#f7f1e6",
  "--icon-bg-panel": "rgba(247,241,230,0.15)",
  "--icon-fg-panel": "#f7f1e6",
  "--on-panel": "rgba(247,241,230,0.78)",
  "--on-panel-l": "rgba(247,241,230,0.5)",
  "--on-panel-xl": "rgba(247,241,230,0.9)",
  "--card-bg": "#f7f1e6",
  "--card-border": "rgba(184,137,42,0.3)",
  "--toggle-bg": "#2a1a0e",
  "--toggle-fg": "#f7f1e6",
};

const DARK = {
  "--bg": "#120c08",
  "--bg2": "#1a1008",
  "--bg3": "#221508",
  "--panel": "#6b1212",
  "--panel2": "#5a0f0f",
  "--red": "#c73535",
  "--red-mid": "#e04040",
  "--red-dim": "rgba(199,53,53,0.18)",
  "--gold": "#d4a84b",
  "--gold-foil": "#e0b96a",
  "--gold-dim": "rgba(224,185,106,0.2)",
  "--ink": "#f2ece0",
  "--ink-mid": "rgba(242,236,224,0.72)",
  "--ink-light": "rgba(242,236,224,0.5)",
  "--ink-faint": "rgba(242,236,224,0.22)",
  "--rule": "rgba(224,185,106,0.22)",
  "--rule-red": "rgba(199,53,53,0.3)",
  "--icon-bg": "#c73535",
  "--icon-fg": "#f2ece0",
  "--icon-bg-panel": "rgba(242,236,224,0.12)",
  "--icon-fg-panel": "#f2ece0",
  "--on-panel": "rgba(242,236,224,0.78)",
  "--on-panel-l": "rgba(242,236,224,0.48)",
  "--on-panel-xl": "rgba(242,236,224,0.92)",
  "--card-bg": "#1e1208",
  "--card-border": "rgba(224,185,106,0.22)",
  "--toggle-bg": "#f2ece0",
  "--toggle-fg": "#120c08",
};

const HIGH_CONTRAST = {
  "--bg": "#000000",
  "--bg2": "#0b0b0b",
  "--bg3": "#111111",
  "--panel": "#111111",
  "--panel2": "#000000",
  "--red": "#ff5c5c",
  "--red-mid": "#ff8080",
  "--red-dim": "rgba(255,92,92,0.28)",
  "--gold": "#ffd84d",
  "--gold-foil": "#fff17a",
  "--gold-dim": "rgba(255,241,122,0.26)",
  "--ink": "#ffffff",
  "--ink-mid": "rgba(255,255,255,0.92)",
  "--ink-light": "rgba(255,255,255,0.82)",
  "--ink-faint": "rgba(255,255,255,0.6)",
  "--rule": "rgba(255,241,122,0.5)",
  "--rule-red": "rgba(255,92,92,0.45)",
  "--icon-bg": "#fff17a",
  "--icon-fg": "#000000",
  "--icon-bg-panel": "rgba(255,241,122,0.16)",
  "--icon-fg-panel": "#fff17a",
  "--on-panel": "rgba(255,255,255,0.96)",
  "--on-panel-l": "rgba(255,255,255,0.8)",
  "--on-panel-xl": "#ffffff",
  "--card-bg": "#000000",
  "--card-border": "rgba(255,241,122,0.45)",
  "--toggle-bg": "#000000",
  "--toggle-fg": "#ffffff",
};

// ── GlobalStyles injects CSS vars + keyframes ─────────────────────────────────
const GlobalStyles = ({ theme }) => {
  useEffect(() => {
    const el = document.createElement("style");
    const tokens = theme === "dark" ? DARK : theme === "contrast" ? HIGH_CONTRAST : LIGHT;
    const vars = Object.entries(tokens)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    el.textContent = `
      :root{${vars}}
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:var(--bg);color:var(--ink);font-family:'Atkinson Hyperlegible','DM Sans',sans-serif}
      ::selection{background:var(--red-dim);color:var(--ink)}
      @keyframes breathe{0%,100%{opacity:.8;transform:scaleY(1)}50%{opacity:.2;transform:scaleY(.5)}}
      @keyframes sealPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes lanternFloat{0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}}
      @keyframes lanternGlow{0%,100%{box-shadow:0 0 20px rgba(255,241,122,0.18),0 0 55px rgba(255,92,92,0.12)}50%{box-shadow:0 0 30px rgba(255,241,122,0.32),0 0 75px rgba(255,92,92,0.18)}}
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, [theme]);
  return null;
};

// ── useInView ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, style: s = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1s ease ${delay}s,transform 1s ease ${delay}s`,
        ...s,
      }}
    >
      {children}
    </div>
  );
}

const IconBadge = ({ children, onPanel = false }) => (
  <div
    style={{
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: onPanel ? "var(--icon-bg-panel)" : "var(--icon-bg)",
      border: onPanel ? "1.5px solid rgba(247,241,230,0.25)" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginBottom: "1rem",
    }}
  >
    {children}
  </div>
);

const IcoBalance = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="11"
        y="3"
        width="2"
        height="16"
        rx="1"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <rect
        x="3"
        y="6"
        width="18"
        height="1.5"
        rx=".75"
        fill="var(--icon-fg-panel)"
        opacity="0.85"
      />
      <rect
        x="1"
        y="13"
        width="8"
        height="4"
        rx="2"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <rect
        x="15"
        y="13"
        width="8"
        height="4"
        rx="2"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <path
        d="M3 19h18"
        stroke="var(--icon-fg-panel)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  </IconBadge>
);

const IcoShip = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 17 Q6 13 12 13 Q18 13 22 17 L20 21 H4 Z"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <rect
        x="11"
        y="5"
        width="2"
        height="10"
        rx="1"
        fill="var(--icon-fg-panel)"
        opacity="0.85"
      />
      <path d="M13 5 L20 11 L13 13 Z" fill="var(--icon-fg-panel)" opacity="0.65" />
    </svg>
  </IconBadge>
);

const IcoChain = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="1"
        y="7"
        width="9"
        height="6"
        rx="3"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <rect x="3" y="9" width="5" height="2" rx="1" fill="var(--icon-bg)" opacity="0.6" />
      <rect
        x="14"
        y="7"
        width="9"
        height="6"
        rx="3"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <rect x="16" y="9" width="5" height="2" rx="1" fill="var(--icon-bg)" opacity="0.6" />
      <rect x="9" y="10" width="6" height="2" rx="1" fill="var(--icon-fg-panel)" opacity="0.75" />
      <rect x="7" y="15" width="10" height="4" rx="2" fill="var(--icon-fg-panel)" opacity="0.5" />
    </svg>
  </IconBadge>
);

const IcoScroll = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="var(--icon-fg-panel)"
        opacity="0.85"
      />
      <rect x="6" y="7" width="12" height="2" rx="1" fill="var(--icon-bg)" opacity="0.7" />
      <rect x="6" y="11" width="12" height="1.5" rx=".75" fill="var(--icon-bg)" opacity="0.5" />
      <rect x="6" y="14.5" width="8" height="1.5" rx=".75" fill="var(--icon-bg)" opacity="0.45" />
      <circle cx="4.5" cy="12" r="2.5" fill="var(--icon-fg-panel)" opacity="0.9" />
    </svg>
  </IconBadge>
);

const IcoGavel = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="7"
        width="13"
        height="6"
        rx="2"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
        transform="rotate(-45 8.5 10)"
      />
      <rect
        x="13"
        y="13"
        width="9"
        height="3"
        rx="1.5"
        fill="var(--icon-fg-panel)"
        opacity="0.85"
        transform="rotate(-45 17.5 14.5)"
      />
      <rect
        x="3"
        y="19"
        width="10"
        height="2.5"
        rx="1.25"
        fill="var(--icon-fg-panel)"
        opacity="0.6"
      />
    </svg>
  </IconBadge>
);

const IcoHands = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 14 C3 11 4 7 6 5 L8 4 L9 7 L8 8 C7 9 7 11 8 13 Z"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <path
        d="M20 14 C21 11 20 7 18 5 L16 4 L15 7 L16 8 C17 9 17 11 16 13 Z"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <path
        d="M8 13 Q12 17 16 13 L16 11 Q12 15 8 11 Z"
        fill="var(--icon-fg-panel)"
        opacity="0.8"
      />
      <ellipse cx="12" cy="12" rx="4" ry="3" fill="var(--icon-fg-panel)" opacity="0.6" />
    </svg>
  </IconBadge>
);

const IcoNewspaper = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="14"
        height="18"
        rx="2"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
      <rect x="5" y="6" width="8" height="5" rx="1" fill="var(--icon-bg)" opacity="0.6" />
      <rect x="5" y="13" width="10" height="1.5" rx=".75" fill="var(--icon-bg)" opacity="0.45" />
      <rect x="5" y="16" width="7" height="1.5" rx=".75" fill="var(--icon-bg)" opacity="0.4" />
      <rect
        x="17"
        y="7"
        width="5"
        height="12"
        rx="2"
        fill="var(--icon-fg-panel)"
        opacity="0.65"
      />
    </svg>
  </IconBadge>
);

const IcoTemple = ({ onPanel = false }) => (
  <IconBadge onPanel={onPanel}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 21,8 3,8" fill="var(--icon-fg-panel)" opacity="0.9" />
      <rect x="5" y="8" width="14" height="2" fill="var(--icon-fg-panel)" opacity="0.7" />
      <rect x="7" y="10" width="2" height="11" rx="1" fill="var(--icon-fg-panel)" opacity="0.85" />
      <rect x="11" y="10" width="2" height="11" rx="1" fill="var(--icon-fg-panel)" opacity="0.85" />
      <rect x="15" y="10" width="2" height="11" rx="1" fill="var(--icon-fg-panel)" opacity="0.85" />
      <rect
        x="3"
        y="20"
        width="18"
        height="2.5"
        rx="1"
        fill="var(--icon-fg-panel)"
        opacity="0.9"
      />
    </svg>
  </IconBadge>
);

// ── Decorative image data placeholders ───────────────────────────────────────
const IMG_SHIP = IMG_GOLD_MOUNTAIN;
const IMG_NEWSPAPER = secondImage;

const VISUAL_ARCHIVE = [
  {
    src: secondImage,
    title: "Studio Family Portrait",
    year: "Late 19th c.",
    type: "Portrait",
    credit: "Uploaded exhibit image; studio family portrait used here as contextual visual evidence.",
    note: "This formal portrait shifts the exhibit away from traffic and vice reporting, reminding viewers that Chinese migrants also built households, kinship networks, and intergenerational communities.",
  },
  {
    src: IMG_CUSTOM_HOUSE,
    title: "Chinese Immigrants at the San Francisco Custom House",
    year: "1877",
    type: "Wood engraving",
    credit: "Library of Congress print via public image service.",
    note: "This engraving visualizes inspection, surveillance, and arrival — the bureaucratic side of migration that shaped who could enter and under what terms.",
  },
  {
    src: IMG_CHINATOWN_STREET,
    title: "San Francisco, Calif. — China Town, Sacramento St.",
    year: "1866",
    type: "Albumen photograph",
    credit: "Lawrence & Houseworth, Library of Congress Prints & Photographs Division.",
    note: "The street scene situates trafficking inside a larger urban world of businesses, residences, pedestrians, and everyday life rather than isolating it as an underground anomaly.",
  },
  {
    src: IMG_CHINATOWN_MAP,
    title: 'Official Map of "Chinatown" in San Francisco',
    year: "1885",
    type: "Urban map",
    credit: "Library of Congress Geography and Map Division.",
    note: "This map turns Chinatown into a surveyed and labeled landscape, revealing how racial governance worked through mapping, classification, and block-by-block scrutiny.",
  },
  {
    src: IMG_SHIP,
    title: "The Golden Mountain, Arriving San Francisco",
    year: "1865",
    type: "Historical painting",
    credit: "Mian Situ. Courtesy of Mian Situ.",
    note: "This visual reconstruction emphasizes migration as a family and community experience, not only a masculine labor rush, helping viewers see who was imagined into the journey and who was left vulnerable within it.",
  },
  {
    src: firstImage,
    title: "Community Portrait",
    year: "Late 19th c.",
    type: "Portrait",
    credit: "Uploaded exhibit image used as contextual visual evidence.",
    note: "This portrait-like image adds a human counterweight to maps, court cases, and surveillance records, keeping personhood in view alongside systems of control.",
  },
];

const CITATION_LIBRARY = {
  hirata: {
    short: "Hirata, 1979",
    full: 'Lucie Cheng Hirata, "Free, Indentured, Enslaved: Chinese Prostitutes in Nineteenth-Century America," Signs 5, no. 1 (1979): 3–29.',
  },
  tong: {
    short: "Tong, 1994",
    full: "Benson Tong, Unsubmissive Women: Chinese Prostitutes in Nineteenth-Century San Francisco, 1850–1920 (Norman: University of Oklahoma Press, 1994).",
  },
  yung: {
    short: "Yung, 1995",
    full: "Judy Yung, Unbound Feet: A Social History of Chinese Women in San Francisco (Berkeley: University of California Press, 1995).",
  },
  shah: {
    short: "Shah, 2001",
    full: "Nayan Shah, Contagious Divides: Epidemics and Race in San Francisco's Chinatown (Berkeley: University of California Press, 2001).",
  },
  census1850: {
    short: "U.S. Census, 1850",
    full: "United States Census Office, The Seventh Census of the United States: 1850 (Washington, DC: Robert Armstrong, 1853).",
  },
  census1860: {
    short: "U.S. Census, 1860",
    full: "United States Census Office, The Eighth Census of the United States: 1860 (Washington, DC: Government Printing Office, 1864).",
  },
  hall: {
    short: "People v. Hall, 1854",
    full: "People v. Hall, 4 Cal. 399 (California Supreme Court, 1854).",
  },
  mission: {
    short: "Mission Home Records",
    full: "Presbyterian Mission Home, occasional papers and late nineteenth-century rescue case records, San Francisco.",
  },
  customhouse: {
    short: "LOC Custom House, 1877",
    full: "P. Frenzeny, Chinese Immigrants at the San Francisco Custom House, 1877, Library of Congress.",
    href: "https://lccn.loc.gov/2005696248",
  },
  sacramento: {
    short: "LOC Sacramento St., 1866",
    full: "Lawrence & Houseworth, San Francisco, Calif. — China Town, Sacramento St., published 1866, Library of Congress.",
    href: "https://www.loc.gov/pictures/item/2002719264/",
  },
  chinatownmap: {
    short: "LOC Chinatown Map, 1885",
    full: 'Farwell et al., Official map of "Chinatown" in San Francisco, 1885, Library of Congress.',
    href: "https://www.loc.gov/item/2012593519/",
  },
  lee: {
    short: "Lee, 2003",
    full: "Erika Lee, At America's Gates: Chinese Immigration during the Exclusion Era, 1882-1943 (Chapel Hill: University of North Carolina Press, 2003).",
  },
  gyory: {
    short: "Gyory, 1998",
    full: "Andrew Gyory, Closing the Gate: Race, Politics, and the Chinese Exclusion Act (Chapel Hill: University of North Carolina Press, 1998).",
  },
  takaki: {
    short: "Takaki, 1998",
    full: "Ronald Takaki, Strangers from a Different Shore: A History of Asian Americans (Boston: Little, Brown, 1998).",
  },
};

const SCHOLARLY_NOTES = [
  {
    title: "Political Economy",
    label: "Why exploitation expanded",
    body:
      "A stronger historical reading treats prostitution not as a marginal vice market but as part of the labor regime that accompanied Gold Rush capitalism. The crucial fact is not simply that Chinese women were few in number; it is that they entered an economy organized around extractive male labor, unstable migration, and speculative profit. Under those conditions, sexual labor became one of the most lucrative urban and camp-side services in California. Hirata's classic argument remains foundational here: Chinese women were pulled into a labor system structured by demand, debt, and racial hierarchy rather than by individual moral failure. Tong and Yung refine this picture by showing how urban brokers, lodging-house keepers, merchants, and tongs transformed migration itself into a profit stream. The result was a political economy in which coercion operated not outside capitalism, but through it.",
    citations: ["hirata", "tong", "yung", "census1860"],
  },
  {
    title: "Law and Racial Formation",
    label: "Why violence was durable",
    body:
      "The law did not merely fail Chinese women; it actively sorted them into an inferior legal category. The most important example is People v. Hall, which denied Chinese testimony against white defendants and therefore removed one of the most basic mechanisms through which violence might have been challenged. But legal exclusion worked at multiple scales. Municipal authorities framed prostitution as a sanitary or civic nuisance, not as a system of coercion. Police attention often focused on containment, visibility, and racial ordering rather than protection. Shah's work on public health in Chinatown is useful here because it shows how official knowledge about Chinese bodies was already filtered through suspicion, pathology, and segregation. Within that setting, sexual exploitation became easier to tolerate because the women involved were imagined as both racially alien and administratively manageable.",
    citations: ["hall", "shah", "tong"],
  },
];

const EARLY_VISUALS = [
  {
    src: secondImage,
    title: "Family Portrait",
    year: "Late 19th c.",
    note: "A counterpoint to vice reporting: Chinese migrants also built kin networks, domestic worlds, and intergenerational communities.",
  },
  {
    src: IMG_CHINATOWN_STREET,
    title: "Sacramento Street, San Francisco",
    year: "1866",
    note: "An urban setting that situates exploitation within everyday commercial and residential life.",
  },
  {
    src: IMG_CUSTOM_HOUSE,
    title: "Custom House Inspection",
    year: "1877",
    note: "Arrival, surveillance, and bureaucratic sorting formed part of the coercive system from the port onward.",
  },
  {
    src: IMG_CHINATOWN_MAP,
    title: "Mapped Chinatown",
    year: "1885",
    note: "A city map shows how Chinatown was documented, labeled, and controlled as a distinct racialized space.",
  },
];

const FAQ_BANK = [
  {
    q: "What is the main argument of this exhibit?",
    keywords: ["main argument", "thesis", "big idea", "argument"],
    a: "The exhibit argues that the Gold Rush was not only a story of opportunity. For many Chinese women, it was also a system of coercion shaped by racial exclusion, gender imbalance, and labor demand.",
  },
  {
    q: "What are the most important primary sources here?",
    keywords: ["primary", "sources", "documents", "evidence"],
    a: "The exhibit leans most heavily on census data from 1850 and 1860, People v. Hall, Presbyterian Mission Home records, Library of Congress images, and San Francisco maps and street views that document surveillance, migration, and urban control.",
  },
  {
    q: "How does the exhibit show analysis, not just description?",
    keywords: ["analysis", "interpretation", "why", "meaning"],
    a: "Each section connects evidence to a larger historical argument. The image analyses, citation pills, scholarly interpretation tabs, and key takeaways all explain how law, race, labor, and gender worked together rather than simply listing facts.",
  },
  {
    q: "Why are there so few named women in the exhibit?",
    keywords: ["names", "named", "anonymous", "archive"],
    a: "That absence is part of the history. Chinese women were often recorded only when they could be counted, inspected, sold, rescued, or disciplined, so the fractured archive itself reveals how power operated.",
  },
  {
    q: "How should I explain resistance in this exhibit?",
    keywords: ["resistance", "survival", "agency", "escape"],
    a: "The exhibit treats resistance as both dramatic and everyday: escape, testimony, legal petitions, mission-home refuge, and community help all show that coercion was powerful but never total.",
  },
  {
    q: "What secondary sources support the exhibit most strongly?",
    keywords: ["secondary", "scholarly", "books", "articles"],
    a: "The core secondary works are Lucie Cheng Hirata, Benson Tong, Judy Yung, Nayan Shah, Erika Lee, Andrew Gyory, and Ronald Takaki. Together they support the exhibit’s interpretation of labor, law, exclusion, and racial formation.",
  },
];

const POPULATION_TIMELINE = [
  {
    year: 1852,
    subtitle: "Early Gold Rush boomtown demand",
    locations: [
      {
        name: "San Francisco",
        coords: [37.7749, -122.4194],
        value: 320,
        note: "Port city brothels and lodging houses concentrated the largest early market.",
      },
      {
        name: "Sacramento",
        coords: [38.5816, -121.4944],
        value: 90,
        note: "River transport and commercial traffic linked Sacramento to interior mining camps.",
      },
      {
        name: "Marysville / Northern camps",
        coords: [39.1457, -121.5914],
        value: 55,
        note: "Smaller but significant concentrations followed all-male mining settlements.",
      },
      {
        name: "Sierra foothill camps",
        coords: [38.8966, -120.9029],
        value: 140,
        note: "Dispersed camps created high demand but weaker formal oversight.",
      },
    ],
  },
  {
    year: 1860,
    subtitle: "Peak imbalance and expanded urban concentration",
    locations: [
      {
        name: "San Francisco",
        coords: [37.7749, -122.4194],
        value: 1350,
        note: "Most documented Chinese women in California were in San Francisco by this point, many in coercive labor systems.",
      },
      {
        name: "Sacramento",
        coords: [38.5816, -121.4944],
        value: 170,
        note: "Interior commerce sustained a secondary urban market.",
      },
      {
        name: "Marysville",
        coords: [39.1457, -121.5914],
        value: 85,
        note: "Marysville functioned as a regional gateway for nearby camps.",
      },
      {
        name: "Stockton",
        coords: [37.9577, -121.2908],
        value: 70,
        note: "Stockton linked delta shipping routes to mining districts.",
      },
      {
        name: "Sierra foothill camps",
        coords: [38.8966, -120.9029],
        value: 380,
        note: "Mining settlements remained important destinations even as San Francisco dominated.",
      },
    ],
  },
  {
    year: 1870,
    subtitle: "Urban control and policing deepen",
    locations: [
      {
        name: "San Francisco Chinatown",
        coords: [37.7941, -122.4078],
        value: 1500,
        note: "Concentration intensified inside Chinatown blocks under surveillance, police scrutiny, and tong influence.",
      },
      {
        name: "Sacramento",
        coords: [38.5816, -121.4944],
        value: 130,
        note: "Smaller than San Francisco but still tied to regional vice economies.",
      },
      {
        name: "Stockton",
        coords: [37.9577, -121.2908],
        value: 95,
        note: "Commercial transport corridors helped sustain a smaller but persistent presence.",
      },
      {
        name: "Marysville",
        coords: [39.1457, -121.5914],
        value: 45,
        note: "Northern camp traffic declined but did not disappear.",
      },
    ],
  },
  {
    year: 1880,
    subtitle: "Restriction era with continued concentration",
    locations: [
      {
        name: "San Francisco Chinatown",
        coords: [37.7941, -122.4078],
        value: 1100,
        note: "Numbers contracted but remained concentrated in San Francisco under tighter exclusionary pressure.",
      },
      {
        name: "Sacramento",
        coords: [38.5816, -121.4944],
        value: 80,
        note: "Smaller surviving nodes persisted outside the Bay.",
      },
      {
        name: "Stockton",
        coords: [37.9577, -121.2908],
        value: 60,
        note: "Residual communities remained embedded in port and labor routes.",
      },
      {
        name: "Oakland / East Bay",
        coords: [37.8044, -122.2711],
        value: 40,
        note: "Bay Area spillover illustrates how the geography of control extended beyond one city center.",
      },
    ],
  },
];

let leafletAssetPromise;

function loadLeafletAssets() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.L) return Promise.resolve(window.L);
  if (leafletAssetPromise) return leafletAssetPromise;

  leafletAssetPromise = new Promise((resolve, reject) => {
    const existingCss = document.querySelector('link[data-leaflet="true"]');
    if (!existingCss) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.crossOrigin = "";
      link.dataset.leaflet = "true";
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector('script[data-leaflet="true"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.L));
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.crossOrigin = "";
    script.dataset.leaflet = "true";
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return leafletAssetPromise;
}

function ExhibitImage({ src, alt, caption, credit, analysis, onPanel, imageStyle = {} }) {
  const [ref, inView] = useInView(0.05);
  const [open, setOpen] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 1.1s ease, transform 1.1s ease",
        margin: "3rem 0",
      }}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid var(--rule)",
          padding: "0.6rem",
          background: onPanel ? "rgba(0,0,0,0.2)" : "var(--bg3)",
        }}
      >
        {["tl", "tr", "bl", "br"].map((c) => (
          <div
            key={c}
            style={{
              position: "absolute",
              width: "12px",
              height: "12px",
              top: c[0] === "t" ? "-1px" : "auto",
              bottom: c[0] === "b" ? "-1px" : "auto",
              left: c[1] === "l" ? "-1px" : "auto",
              right: c[1] === "r" ? "-1px" : "auto",
              borderTop: c[0] === "t" ? "2px solid var(--gold-foil)" : "none",
              borderBottom: c[0] === "b" ? "2px solid var(--gold-foil)" : "none",
              borderLeft: c[1] === "l" ? "2px solid var(--gold-foil)" : "none",
              borderRight: c[1] === "r" ? "2px solid var(--gold-foil)" : "none",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "0.6rem",
            left: "0.6rem",
            right: "0.6rem",
            height: "2px",
            background: "linear-gradient(90deg,var(--red),var(--gold-foil))",
            opacity: 0.5,
          }}
        />
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            display: "block",
            objectFit: "cover",
            maxHeight: "480px",
            objectPosition: "center top",
            ...imageStyle,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid var(--rule)",
          paddingBottom: "0.75rem",
          marginTop: "0.6rem",
          marginBottom: "0.75rem",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "0.92rem",
              fontStyle: "italic",
              color: onPanel ? "var(--on-panel-xl)" : "var(--ink)",
              lineHeight: 1.5,
            }}
          >
            {caption}
          </p>
          {credit && (
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: onPanel ? "var(--on-panel-l)" : "var(--ink-light)",
                marginTop: "0.2rem",
              }}
            >
              {credit}
            </p>
          )}
        </div>
        {analysis && (
          <button
            onClick={() => setOpen((x) => !x)}
            style={{
              flexShrink: 0,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.57rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: onPanel ? "var(--gold-foil)" : "var(--red)",
              background: "none",
              border: "1px solid var(--rule)",
              padding: "0.3rem 0.7rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {open ? "Close ↑" : "Document Analysis ↓"}
          </button>
        )}
      </div>

      {analysis && open && (
        <div
          style={{
            background: onPanel ? "rgba(0,0,0,0.25)" : "var(--bg2)",
            border: "1px solid var(--rule)",
            padding: "1.75rem 2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "16px", height: "1px", background: "var(--gold-foil)" }} />
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.57rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold-foil)",
              }}
            >
              Primary Source Analysis
            </p>
            <div style={{ width: "16px", height: "1px", background: "var(--gold-foil)" }} />
          </div>
          {analysis.map((item, i) => (
            <div key={i} style={{ marginBottom: i < analysis.length - 1 ? "1.25rem" : 0 }}>
              <h5
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: onPanel ? "var(--gold-foil)" : "var(--red-mid)",
                  marginBottom: "0.35rem",
                }}
              >
                {item.q}
              </h5>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "0.97rem",
                  fontWeight: 300,
                  lineHeight: 1.78,
                  color: onPanel ? "var(--on-panel)" : "var(--ink-mid)",
                }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PopulationMap() {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const [yearIndex, setYearIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeFrame = POPULATION_TIMELINE[yearIndex];

  useEffect(() => {
    let cancelled = false;

    loadLeafletAssets()
      .then((L) => {
        if (!L || cancelled || mapRef.current || !mapEl.current) return;

        const map = L.map(mapEl.current, {
          zoomControl: true,
          scrollWheelZoom: false,
        }).setView([38.35, -121.65], 6);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        layerRef.current = L.layerGroup().addTo(map);
        mapRef.current = map;
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const id = window.setInterval(() => {
      setYearIndex((current) => (current + 1) % POPULATION_TIMELINE.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    if (!mapRef.current || !layerRef.current || !window.L) return;
    const L = window.L;
    layerRef.current.clearLayers();

    activeFrame.locations.forEach((location) => {
      const circle = L.circleMarker(location.coords, {
        radius: Math.max(10, Math.sqrt(location.value) * 0.72),
        color: "#8b1a1a",
        weight: 2,
        fillColor: "#c9a050",
        fillOpacity: 0.55,
      }).addTo(layerRef.current);

      circle.bindPopup(
        `<div style="font-family: Georgia, serif; line-height:1.55;">
          <strong>${location.name}</strong><br/>
          Estimated concentration: ${location.value}<br/>
          <span style="font-family: Arial, sans-serif; font-size:12px; color:#555;">${location.note}</span>
        </div>`
      );
    });
  }, [activeFrame]);

  return (
    <Reveal delay={0.1}>
      <div style={{ border: "1px solid var(--card-border)", background: "var(--bg2)", padding: "1rem", marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", marginBottom: "0.9rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--red-mid)", marginBottom: "0.45rem" }}>
              Interactive Map
            </p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontStyle: "italic", color: "var(--ink)", fontWeight: 400, marginBottom: "0.3rem" }}>
              Estimated Geography of Coercive Chinese Sexual Labor
            </h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", lineHeight: 1.7, color: "var(--ink-light)", maxWidth: "680px" }}>
              Move through time to see how the exhibit’s interpretive estimates shift from dispersed Gold Rush camp demand toward tighter urban concentration, especially in San Francisco. Circle size represents estimated concentration, not exact census totals.
            </p>
          </div>
          <button
            onClick={() => setIsPlaying((v) => !v)}
            style={{
              background: isPlaying ? "var(--red)" : "transparent",
              color: isPlaying ? "var(--bg)" : "var(--red)",
              border: "1px solid var(--red)",
              padding: "0.55rem 0.85rem",
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {isPlaying ? "Pause Timeline" : "Play Timeline"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 240px", gap: "1rem", alignItems: "stretch" }}>
          <div>
            <div ref={mapEl} style={{ height: "460px", width: "100%", border: "1px solid var(--rule)" }} />
          </div>
          <div style={{ border: "1px solid var(--rule)", padding: "1rem", background: "var(--bg)" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--red-mid)", marginBottom: "0.55rem" }}>
              Time Slice
            </p>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", color: "var(--red)", fontStyle: "italic", lineHeight: 1, marginBottom: "0.45rem" }}>
              {activeFrame.year}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.04rem", color: "var(--ink)", lineHeight: 1.5, marginBottom: "1rem" }}>
              {activeFrame.subtitle}
            </p>
            <input
              type="range"
              min="0"
              max={POPULATION_TIMELINE.length - 1}
              step="1"
              value={yearIndex}
              onChange={(e) => setYearIndex(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#8b1a1a", marginBottom: "0.9rem" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", color: "var(--ink-light)", marginBottom: "1rem" }}>
              {POPULATION_TIMELINE.map((frame) => (
                <span key={frame.year}>{frame.year}</span>
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--rule)", paddingTop: "0.9rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-foil)", marginBottom: "0.5rem" }}>
                Reading the Map
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.77rem", lineHeight: 1.72, color: "var(--ink-light)", marginBottom: "0.6rem" }}>
                These are exhibit estimates derived from the gender imbalance shown in census data, urban concentration patterns, and historical synthesis in Lucie Cheng Hirata, Judy Yung, and Benson Tong.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.77rem", lineHeight: 1.72, color: "var(--ink-light)" }}>
                The visualization is meant to show geographic concentration over time, not exact individual counts. Click circles for location-specific context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CitationPills({ ids, onPanel = false }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.95rem" }}>
      {ids.map((id) => {
        const source = CITATION_LIBRARY[id];
        const content = (
          <>
            <span>{source.short}</span>
            <span style={{ marginLeft: "0.45rem", opacity: 0.7 }}>↗</span>
          </>
        );

        const baseStyle = {
          display: "inline-flex",
          alignItems: "center",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "0.4rem 0.55rem",
          border: `1px solid ${onPanel ? "rgba(201,160,80,0.32)" : "var(--card-border)"}`,
          color: onPanel ? "var(--gold-foil)" : "var(--red-mid)",
          background: onPanel ? "rgba(247,241,230,0.05)" : "var(--bg)",
          textDecoration: "none",
        };

        return source.href ? (
          <a key={id} href={source.href} target="_blank" rel="noreferrer" title={source.full} style={baseStyle}>
            {content}
          </a>
        ) : (
          <span key={id} title={source.full} style={baseStyle}>
            {source.short}
          </span>
        );
      })}
    </div>
  );
}

function ScholarlyPanel({ onPanel = false }) {
  const [active, setActive] = useState(0);
  const note = SCHOLARLY_NOTES[active];

  return (
    <Reveal delay={0.12}>
      <div
        style={{
          border: `1px solid ${onPanel ? "rgba(201,160,80,0.28)" : "var(--card-border)"}`,
          background: onPanel ? "rgba(247,241,230,0.05)" : "var(--bg2)",
          padding: "1.15rem",
          marginTop: "2.5rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.24em", textTransform: "uppercase", color: onPanel ? "var(--gold-foil)" : "var(--red-mid)", marginBottom: "0.42rem" }}>
              Scholarly Interpretation
            </p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.24rem", fontStyle: "italic", color: onPanel ? "var(--on-panel-xl)" : "var(--ink)", fontWeight: 400 }}>
              Read the Exhibit as Historical Argument
            </h3>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", lineHeight: 1.7, color: onPanel ? "var(--on-panel-l)" : "var(--ink-light)", maxWidth: "320px" }}>
            These tabs synthesize the exhibit’s evidence in a more explicit analytical register, foregrounding structure, law, and archival method.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1rem" }}>
          {SCHOLARLY_NOTES.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setActive(index)}
              style={{
                background: active === index ? (onPanel ? "rgba(201,160,80,0.15)" : "var(--bg)") : "transparent",
                border: `1px solid ${active === index ? "var(--gold-foil)" : onPanel ? "rgba(201,160,80,0.28)" : "var(--card-border)"}`,
                color: active === index ? (onPanel ? "var(--gold-foil)" : "var(--red)") : onPanel ? "var(--on-panel-l)" : "var(--ink-light)",
                padding: "0.55rem 0.8rem",
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${onPanel ? "rgba(201,160,80,0.28)" : "var(--rule)"}`, paddingTop: "1rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: onPanel ? "var(--gold-foil)" : "var(--red-mid)", marginBottom: "0.45rem" }}>
            {note.label}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.08rem", lineHeight: 1.88, color: onPanel ? "var(--on-panel)" : "var(--ink-mid)" }}>
            {note.body}
          </p>
          <CitationPills ids={note.citations} onPanel={onPanel} />
        </div>
      </div>
    </Reveal>
  );
}

function TakeawayPanel() {
  const takeaways = [
    {
      title: "Big Idea",
      body: "The Gold Rush was not only a story of opportunity. It also relied on racial hierarchy, gender imbalance, and coercive labor systems.",
    },
    {
      title: "What Visitors Should Notice",
      body: "Chinese women were made especially vulnerable because migration routes, debt contracts, and legal exclusion worked together.",
    },
    {
      title: "Why It Matters",
      body: "Primary sources show both exploitation and resistance, helping us see the human cost hidden inside familiar stories of western expansion.",
    },
  ];

  return (
    <Reveal delay={0.14} style={{ position: "relative", zIndex: 1 }}>
      <div style={{ border: "1px solid var(--rule)", padding: "1.25rem", marginTop: "2rem", background: "var(--bg2)" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--red-mid)", marginBottom: "0.75rem" }}>
          Key Takeaways
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0.9rem" }}>
          {takeaways.map((item) => (
            <div key={item.title} style={{ border: "1px solid var(--card-border)", padding: "0.95rem", background: "var(--bg)" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.45rem" }}>
                {item.title}
              </p>
              <p style={{ fontFamily: "'Atkinson Hyperlegible','DM Sans',sans-serif", fontSize: "0.86rem", lineHeight: 1.68, color: "var(--ink-light)" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function InlineVisualCard({ item, delay = 0, onOpen }) {
  return (
    <Reveal delay={delay}>
      <button
        onClick={() =>
          onOpen({
            src: item.src,
            title: item.title,
            year: item.year,
            type: "Context Image",
            credit: item.note,
            note: item.note,
          })
        }
        style={{
          width: "100%",
          textAlign: "left",
          background: "var(--bg2)",
          border: "1px solid var(--card-border)",
          padding: "0.75rem",
          cursor: "pointer",
        }}
      >
        <img src={item.src} alt={item.title} style={{ width: "100%", height: "190px", objectFit: "cover", display: "block", marginBottom: "0.75rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.35rem", alignItems: "center" }}>
          <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.98rem", fontStyle: "italic", color: "var(--ink)", fontWeight: 400 }}>{item.title}</h4>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--red-mid)" }}>{item.year}</span>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", lineHeight: 1.68, color: "var(--ink-light)" }}>{item.note}</p>
      </button>
    </Reveal>
  );
}

const FloralCorner = ({ size = 130, flip = false, mirror = false }) => {
  const t = [flip ? "scale(1,-1)" : "", mirror ? "scale(-1,1)" : ""].filter(Boolean).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 110 110" fill="none" style={{ display: "block", transform: t || undefined }}>
      <path d="M8 102 Q30 75 55 50 Q75 30 98 8" stroke="var(--gold-foil)" strokeWidth="1" fill="none" opacity="0.75" />
      <path d="M55 50 Q40 38 28 28" stroke="var(--gold-foil)" strokeWidth="0.7" fill="none" opacity="0.6" />
      <path d="M75 30 Q82 20 90 15" stroke="var(--gold-foil)" strokeWidth="0.7" fill="none" opacity="0.55" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const r = (a * Math.PI) / 180;
        const cx = 22 + 10 * Math.cos(r);
        const cy = 88 + 10 * Math.sin(r);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5"
            ry="9"
            fill="var(--gold-foil)"
            fillOpacity={i % 2 === 0 ? 0.7 : 0.45}
            transform={`rotate(${a},${cx},${cy})`}
          />
        );
      })}
      <circle cx="22" cy="88" r="4.5" fill="var(--gold-foil)" opacity="0.9" />
      {[0, 72, 144, 216, 288].map((a, i) => {
        const r = (a * Math.PI) / 180;
        const cx = 58 + 7 * Math.cos(r);
        const cy = 48 + 7 * Math.sin(r);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="3.5"
            ry="7"
            fill="var(--gold-foil)"
            fillOpacity={0.6}
            transform={`rotate(${a},${cx},${cy})`}
          />
        );
      })}
      <circle cx="58" cy="48" r="3.5" fill="var(--gold-foil)" opacity="0.85" />
    </svg>
  );
};

const WaxSeal = ({ size = 52, gold = false }) => {
  const fill = gold ? "var(--gold-foil)" : "var(--red)";
  const inner = gold ? "rgba(255,230,130,0.4)" : "rgba(255,255,255,0.2)";
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="28" cy="28" r="26" fill={fill} opacity="0.9" />
      <circle cx="28" cy="28" r="22" stroke={inner} strokeWidth="0.6" fill="none" />
      <circle cx="28" cy="28" r="17" stroke={inner} strokeWidth="0.4" fill="none" />
      <circle cx="28" cy="28" r="5" fill={inner} />
    </svg>
  );
};

const EnvelopeFlap = ({ toPanel = false }) => {
  const fill = toPanel ? "var(--panel)" : "var(--bg)";
  return (
    <div style={{ width: "100%", lineHeight: 0, overflow: "hidden" }}>
      <svg width="100%" height="40" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d="M0 0 L1200 0 L1200 5 Q600 40 0 5 Z" fill={fill} />
        <line x1="0" y1="5" x2="1200" y2="5" stroke="var(--gold-foil)" strokeWidth="0.6" opacity="0.4" />
      </svg>
    </div>
  );
};

const CornerBrackets = ({ size = 14, color = "var(--gold-foil)", thickness = 2 }) => (
  <>
    {[
      ["tl", "top", "left"],
      ["tr", "top", "right"],
      ["bl", "bottom", "left"],
      ["br", "bottom", "right"],
    ].map(([key, v, h]) => (
      <div
        key={key}
        style={{
          position: "absolute",
          width: size,
          height: size,
          [v]: "-1px",
          [h]: "-1px",
          borderTop: v === "top" ? `${thickness}px solid ${color}` : "none",
          borderBottom: v === "bottom" ? `${thickness}px solid ${color}` : "none",
          borderLeft: h === "left" ? `${thickness}px solid ${color}` : "none",
          borderRight: h === "right" ? `${thickness}px solid ${color}` : "none",
        }}
      />
    ))}
  </>
);

const FloralWatermark = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {[
      { top: "-20px", right: "-20px" },
      { bottom: "-20px", left: "-20px", transform: "rotate(180deg)" },
      { top: "38%", right: "-15px", transform: "rotate(90deg)", opacity: "0.55" },
    ].map((s, i) => (
      <div key={i} style={{ position: "absolute", opacity: 0.07, ...s }}>
        <FloralCorner size={190} />
      </div>
    ))}
  </div>
);

const RedPanel = ({ children }) => (
  <div style={{ background: "var(--panel)", position: "relative", overflow: "hidden" }}>{children}</div>
);

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct(
        el.scrollHeight - el.clientHeight > 0
          ? (((el.scrollTop || document.body.scrollTop) / (el.scrollHeight - el.clientHeight)) * 100)
          : 0
      );
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 300, background: "var(--bg3)" }}>
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg,var(--red),var(--gold-foil))",
          transition: "width .1s linear",
        }}
      />
    </div>
  );
}

const NAVL = ["Hero", "Intro", "Migration", "Trafficking", "Race", "Resistance", "Law", "Sources", "Conclusion"];
function SideNav() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const secs = document.querySelectorAll("[data-section]");
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(+e.target.dataset.section);
        }),
      { threshold: 0.3 }
    );
    secs.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        right: "1.2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {NAVL.map((lbl, i) => (
        <button
          key={i}
          title={lbl}
          onClick={() => document.querySelector(`[data-section="${i}"]`)?.scrollIntoView({ behavior: "smooth" })}
          style={{
            width: active === i ? 9 : 5,
            height: active === i ? 9 : 5,
            borderRadius: "50%",
            border: active === i ? "1.5px solid var(--gold-foil)" : "none",
            background: active === i ? "var(--red)" : "var(--gold-dim)",
            cursor: "pointer",
            transition: "all .3s ease",
            padding: 0,
          }}
        />
      ))}
    </nav>
  );
}

function AccessibilityDock({
  theme,
  onThemeCycle,
  isSpeaking,
  onSpeakToggle,
  musicEnabled,
  onMusicToggle,
}) {
  const label = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Contrast";
  return (
    <div
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "2.5rem",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {[
        { key: "theme", text: `Theme: ${label}`, onClick: onThemeCycle, title: "Switch theme" },
        { key: "tts", text: isSpeaking ? "Stop Narration" : "Read Aloud", onClick: onSpeakToggle, title: "Toggle text to speech" },
        { key: "music", text: musicEnabled ? "Mute Music" : "Play Music", onClick: onMusicToggle, title: "Toggle ambient music" },
      ].map((item) => (
        <button
          key={item.key}
          onClick={item.onClick}
          title={item.title}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.45rem 0.9rem",
            minWidth: "162px",
            background: "var(--toggle-bg)",
            border: "1px solid var(--gold-foil)",
            borderRadius: "999px",
            cursor: "pointer",
            boxShadow: "0 8px 26px rgba(0,0,0,0.12)",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--toggle-fg)",
              whiteSpace: "nowrap",
            }}
          >
            {item.text}
          </span>
        </button>
      ))}
    </div>
  );
}

function LanternOverlay({ visible, onDismiss, musicEnabled }) {
  useEffect(() => {
    if (!visible) return undefined;
    const id = window.setTimeout(onDismiss, 4200);
    return () => window.clearTimeout(id);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <div
      onClick={onDismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 450,
        background: "rgba(10,6,4,0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "780px" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gold-foil)", marginBottom: "1rem" }}>
          Opening Exhibit
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(0.8rem,2vw,2.25rem)", marginBottom: "2rem", flexWrap: "wrap" }}>
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{
                width: "92px",
                height: "132px",
                borderRadius: "20px 20px 28px 28px",
                background: "#8b1a1a",
                border: "2px solid rgba(255,241,122,0.72)",
                position: "relative",
                animation: `lanternFloat ${3.6 + index * 0.35}s ease-in-out infinite`,
                boxShadow: "0 0 20px rgba(255,241,122,0.18),0 0 55px rgba(255,92,92,0.12)",
              }}
            >
              <div style={{ position: "absolute", top: "-18px", left: "50%", transform: "translateX(-50%)", width: "2px", height: "18px", background: "rgba(255,241,122,0.8)" }} />
              <div style={{ position: "absolute", top: "8px", bottom: "8px", left: "50%", width: "1px", background: "rgba(255,241,122,0.36)", transform: "translateX(-50%)" }} />
              <div style={{ position: "absolute", left: "18px", right: "18px", top: "18px", height: "1px", background: "rgba(255,241,122,0.32)" }} />
              <div style={{ position: "absolute", left: "18px", right: "18px", bottom: "18px", height: "1px", background: "rgba(255,241,122,0.32)" }} />
              <div style={{ position: "absolute", inset: "22px", borderRadius: "18px", background: "rgba(255,241,122,0.18)", animation: "lanternGlow 2.8s ease-in-out infinite" }} />
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontStyle: "italic", fontWeight: 400, color: "#fff7d1", marginBottom: "0.85rem" }}>
          Entering the Exhibit
        </h2>
        <p style={{ fontFamily: "'Atkinson Hyperlegible','DM Sans',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.9)", marginBottom: "1rem" }}>
          A lantern prelude appears once on first load, then fades. A YouTube soundtrack is {musicEnabled ? "enabled" : "available"} and accessibility controls remain at the upper right.
        </p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-foil)" }}>
          Click anywhere to continue
        </p>
      </div>
    </div>
  );
}

function TraditionalDoorIntro({ visible, visitorName, onNameChange, onEnter, opening }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 520,
        background: "rgba(15,6,4,0.98)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: "3.5vh 3vw", border: "1px solid rgba(255,241,122,0.28)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "5vh 4vw", border: "1px solid rgba(255,241,122,0.12)", pointerEvents: "none" }} />
      {[
        { left: 0, origin: "left center", transform: opening ? "perspective(1400px) rotateY(-102deg)" : "perspective(1400px) rotateY(0deg)" },
        { right: 0, origin: "right center", transform: opening ? "perspective(1400px) rotateY(102deg)" : "perspective(1400px) rotateY(0deg)" },
      ].map((panel, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "50%",
            [index === 0 ? "left" : "right"]: 0,
            transformOrigin: panel.origin,
            transform: panel.transform,
            transition: "transform 1.5s ease",
            background: "rgba(111,18,18,0.99)",
            borderLeft: index === 1 ? "2px solid rgba(255,241,122,0.2)" : "none",
            borderRight: index === 0 ? "2px solid rgba(255,241,122,0.2)" : "none",
            boxShadow: index === 0 ? "inset -18px 0 30px rgba(0,0,0,0.28)" : "inset 18px 0 30px rgba(0,0,0,0.28)",
          }}
        >
          <div style={{ position: "absolute", inset: "6% 10%", border: "1px solid rgba(255,241,122,0.38)" }} />
          <div style={{ position: "absolute", inset: "10% 15%", border: "1px solid rgba(255,241,122,0.18)" }} />
          {[20, 38, 56, 74].map((top) => (
            <div key={top} style={{ position: "absolute", left: "16%", right: "16%", top: `${top}%`, height: "1px", background: "rgba(255,241,122,0.16)" }} />
          ))}
          <div style={{ position: "absolute", top: "50%", [index === 0 ? "right" : "left"]: "8%", transform: "translateY(-50%)", width: "22px", height: "22px", borderRadius: "50%", border: "2px solid rgba(255,241,122,0.7)", boxShadow: "0 0 18px rgba(255,241,122,0.15)" }} />
        </div>
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(560px, 92vw)",
          padding: "2.2rem 2rem",
          background: "rgba(247,241,230,0.92)",
          border: "1px solid rgba(201,160,80,0.65)",
          textAlign: "center",
          opacity: opening ? 0 : 1,
          transform: opening ? "translateY(14px)" : "translateY(0)",
          transition: "opacity 0.45s ease, transform 0.45s ease",
        }}
      >
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#8b1a1a", marginBottom: "0.8rem" }}>
          Before You Enter
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontStyle: "italic", fontWeight: 400, color: "#2a1a0e", marginBottom: "0.8rem" }}>
          A Traditional Door Opens
        </h2>
        <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: "1.02rem", lineHeight: 1.8, color: "rgba(42,26,14,0.8)", marginBottom: "1.2rem" }}>
          Share your name, and the exhibit will welcome you personally before the doors part.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEnter();
          }}
        >
          <input
            value={visitorName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "0.95rem 1rem",
              border: "1px solid rgba(139,26,26,0.35)",
              background: "rgba(255,255,255,0.7)",
              fontFamily: "'Atkinson Hyperlegible','DM Sans',sans-serif",
              fontSize: "0.96rem",
              color: "#2a1a0e",
              marginBottom: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.9rem 1rem",
              background: "#8b1a1a",
              color: "#fff7d1",
              border: "1px solid rgba(255,241,122,0.55)",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.66rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Enter The Exhibit
          </button>
        </form>
      </div>
    </div>
  );
}

function FaqChatBot({ visitorName }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Welcome${visitorName ? `, ${visitorName}` : ""}. Ask me about the exhibit’s thesis, sources, analysis, or key sections.`,
    },
  ]);

  useEffect(() => {
    setMessages((current) => {
      if (!current.length || current[0].sender !== "bot") return current;
      const updated = [...current];
      updated[0] = {
        ...updated[0],
        text: `Welcome${visitorName ? `, ${visitorName}` : ""}. Ask me about the exhibit’s thesis, sources, analysis, or key sections.`,
      };
      return updated;
    });
  }, [visitorName]);

  const answerFaq = (question) => {
    const normalized = question.toLowerCase();
    return FAQ_BANK.find((item) => item.keywords.some((keyword) => normalized.includes(keyword))) || null;
  };

  const submitQuestion = (questionText) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;
    const match = answerFaq(trimmed);
    setMessages((current) => [
      ...current,
      { sender: "user", text: trimmed },
      {
        sender: "bot",
        text: match
          ? match.a
          : "I can help with the exhibit’s thesis, major sections, primary sources, secondary sources, analysis, and resistance. Try asking about one of those topics.",
      },
    ]);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", right: "1.25rem", bottom: "1.25rem", zIndex: 360, width: open ? "min(420px, calc(100vw - 2rem))" : "auto" }}>
      <div style={{ position: "absolute", right: open ? "100%" : "5.6rem", bottom: "0.2rem", marginRight: "0.8rem", display: "flex", alignItems: "flex-start", gap: "0.6rem", pointerEvents: "none" }}>
        <div style={{ marginTop: "0.35rem", maxWidth: "168px", padding: "0.55rem 0.78rem", background: "var(--bg)", border: "1px solid var(--gold-foil)", color: "var(--ink)", fontFamily: "'Atkinson Hyperlegible','DM Sans',sans-serif", fontSize: "0.78rem", lineHeight: 1.4, boxShadow: "0 10px 24px rgba(0,0,0,0.15)" }}>
          Ask me anything!
        </div>
        <div style={{ width: "112px", height: "132px", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <svg viewBox="0 0 160 190" width="112" height="132" aria-hidden="true">
            <ellipse cx="80" cy="181" rx="38" ry="6" fill="rgba(42,26,14,0.18)" />
            <path d="M53 24 C20 33 8 62 12 92 C15 117 32 138 57 146 L103 146 C129 137 145 117 148 91 C152 60 138 31 106 23 C92 19 67 19 53 24 Z" fill="#f45a61"/>
            <path d="M46 27 C34 10 47 1 61 9 C73 16 76 34 67 43 Z" fill="#ffe0a1" stroke="#9b5b2b" strokeWidth="2"/>
            <path d="M113 27 C125 10 112 1 98 9 C86 16 83 34 92 43 Z" fill="#ffe0a1" stroke="#9b5b2b" strokeWidth="2"/>
            <path d="M33 57 C20 46 14 60 19 72 C23 82 33 86 43 80 Z" fill="#ffe0a1" stroke="#9b5b2b" strokeWidth="2"/>
            <path d="M127 57 C140 46 146 60 141 72 C137 82 127 86 117 80 Z" fill="#ffe0a1" stroke="#9b5b2b" strokeWidth="2"/>
            <ellipse cx="80" cy="84" rx="45" ry="35" fill="#ffe6ad"/>
            <ellipse cx="55" cy="74" rx="7" ry="4" fill="#fff1c8"/>
            <ellipse cx="105" cy="74" rx="7" ry="4" fill="#fff1c8"/>
            <circle cx="53" cy="87" r="12" fill="#3a170f"/><circle cx="107" cy="87" r="12" fill="#3a170f"/>
            <circle cx="50" cy="83" r="4" fill="#fff"/><circle cx="104" cy="83" r="4" fill="#fff"/>
            <path d="M62 103 C73 94 87 94 98 103 C98 126 89 141 80 141 C71 141 62 126 62 103 Z" fill="#3a170f"/>
            <path d="M74 118 C78 124 82 124 86 118 C90 127 88 135 80 138 C72 135 70 127 74 118 Z" fill="#e63b2e"/>
            <path d="M68 104 L74 111 L67 116 Z" fill="#fff8ea"/>
            <path d="M92 104 L86 111 L93 116 Z" fill="#fff8ea"/>
            <path d="M64 84 C69 80 74 80 78 84" stroke="#9b5b2b" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M82 84 C86 80 91 80 96 84" stroke="#9b5b2b" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M53 145 C44 154 42 168 46 179" stroke="#9b2f36" strokeWidth="8" strokeLinecap="round"/>
            <path d="M107 145 C116 154 118 168 114 179" stroke="#9b2f36" strokeWidth="8" strokeLinecap="round"/>
            <path d="M66 144 L60 182" stroke="#f45a61" strokeWidth="14" strokeLinecap="round"/>
            <path d="M94 144 L100 182" stroke="#f45a61" strokeWidth="14" strokeLinecap="round"/>
            <ellipse cx="80" cy="150" rx="24" ry="28" fill="#ffe6ad"/>
            <path d="M122 147 C139 154 145 170 135 183" stroke="#9b2f36" strokeWidth="8" strokeLinecap="round"/>
            <path d="M131 180 L141 172 L144 183 L136 188 Z" fill="#ffe0a1" stroke="#9b5b2b" strokeWidth="2"/>
            <path d="M67 145 C72 140 88 140 93 145" stroke="#edca86" strokeWidth="3" strokeLinecap="round"/>
            <path d="M65 156 C71 151 89 151 95 156" stroke="#edca86" strokeWidth="3" strokeLinecap="round"/>
            <path d="M64 167 C71 162 89 162 96 167" stroke="#edca86" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      {open && (
        <div style={{ marginBottom: "0.75rem", background: "var(--bg)", border: "1px solid var(--gold-foil)", boxShadow: "0 18px 36px rgba(0,0,0,0.22)" }}>
          <div style={{ padding: "0.9rem 1rem", borderBottom: "1px solid var(--rule)", background: "var(--panel)" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-foil)", marginBottom: "0.3rem" }}>
              Exhibit Guide
            </p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontStyle: "italic", color: "var(--on-panel-xl)" }}>
              FAQ Chatbot
            </p>
          </div>
          <div style={{ padding: "0.9rem 1rem", maxHeight: "340px", overflow: "auto", display: "grid", gap: "0.7rem" }}>
            {messages.map((message, index) => (
              <div key={index} style={{ justifySelf: message.sender === "user" ? "end" : "start", maxWidth: "92%" }}>
                <div
                  style={{
                    padding: "0.72rem 0.82rem",
                    background: message.sender === "user" ? "var(--red)" : "var(--bg2)",
                    color: message.sender === "user" ? "#fff7d1" : "var(--ink-light)",
                    border: `1px solid ${message.sender === "user" ? "rgba(255,241,122,0.28)" : "var(--card-border)"}`,
                    fontFamily: "'Atkinson Hyperlegible','DM Sans',sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.62,
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "0 1rem 0.85rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {FAQ_BANK.slice(0, 4).map((item) => (
              <button
                key={item.q}
                onClick={() => submitQuestion(item.q)}
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--card-border)",
                  color: "var(--red-mid)",
                  padding: "0.45rem 0.55rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.08em",
                }}
              >
                {item.q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitQuestion(input);
            }}
            style={{ padding: "0 1rem 1rem", display: "grid", gap: "0.55rem" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about the exhibit"
              style={{
                width: "100%",
                padding: "0.78rem 0.82rem",
                border: "1px solid var(--card-border)",
                background: "var(--bg2)",
                fontFamily: "'Atkinson Hyperlegible','DM Sans',sans-serif",
                fontSize: "0.82rem",
                color: "var(--ink)",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.72rem 0.85rem",
                background: "var(--red)",
                color: "#fff7d1",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Send Question
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((current) => !current)}
        style={{
          width: open ? "100%" : "auto",
          padding: "0.8rem 1rem",
          background: "var(--toggle-bg)",
          border: "1px solid var(--gold-foil)",
          borderRadius: "999px",
          color: "var(--toggle-fg)",
          cursor: "pointer",
          boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        {open ? "Close FAQ Guide" : "Open FAQ Guide"}
      </button>
    </div>
  );
}

const Label = ({ children, onPanel = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
    <div style={{ width: "20px", height: "1px", background: onPanel ? "rgba(201,160,80,0.5)" : "var(--rule-red)" }} />
    <p
      style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "0.58rem",
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: onPanel ? "var(--gold-foil)" : "var(--red-mid)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </p>
    <div style={{ width: "20px", height: "1px", background: onPanel ? "rgba(201,160,80,0.5)" : "var(--rule-red)" }} />
  </div>
);

const STitle = ({ children, center = false, onPanel = false }) => (
  <h2
    style={{
      fontFamily: "'Playfair Display',serif",
      fontSize: "clamp(2rem,3.8vw,3rem)",
      fontWeight: 400,
      fontStyle: "italic",
      color: onPanel ? "var(--on-panel-xl)" : "var(--ink)",
      lineHeight: 1.15,
      marginBottom: "1.5rem",
      textAlign: center ? "center" : "left",
      letterSpacing: "-0.01em",
    }}
  >
    {children}
  </h2>
);

const Body = ({ children, center = false, onPanel = false, sx = {} }) => (
  <p
    style={{
      fontFamily: "'Source Serif 4',serif",
      fontSize: "clamp(1.02rem,1.3vw,1.14rem)",
      fontWeight: 400,
      lineHeight: 1.85,
      color: onPanel ? "var(--on-panel)" : "var(--ink-mid)",
      marginBottom: "1.25rem",
      textAlign: center ? "center" : "left",
      ...sx,
    }}
  >
    {children}
  </p>
);

const GoldRule = ({ wide = false, onPanel = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", margin: `${wide ? "3.5rem" : "2rem"} auto`, maxWidth: wide ? 360 : 240 }}>
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg,transparent,${onPanel ? "rgba(201,160,80,0.5)" : "var(--gold-foil)"})` }} />
    <WaxSeal size={14} gold />
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg,${onPanel ? "rgba(201,160,80,0.5)" : "var(--gold-foil)"},transparent)` }} />
  </div>
);

function PullQuote({ text, attribution, onPanel = false }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: "opacity 1.1s ease,transform 1.1s ease",
        margin: "2.5rem 0",
        padding: "2rem 2.5rem",
        border: `1px solid ${onPanel ? "rgba(201,160,80,0.3)" : "var(--rule)"}`,
        position: "relative",
      }}
    >
      <CornerBrackets size={14} color="var(--gold-foil)" thickness={2} />
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(1.1rem,1.8vw,1.38rem)",
          fontStyle: "italic",
          color: onPanel ? "var(--on-panel-xl)" : "var(--ink)",
          lineHeight: 1.7,
          marginBottom: attribution ? "0.75rem" : 0,
          textAlign: "center",
        }}
      >
        "{text}"
      </p>
      {attribution && (
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.67rem",
            color: onPanel ? "var(--on-panel-l)" : "var(--ink-light)",
            letterSpacing: "0.12em",
            textAlign: "center",
          }}
        >
          — {attribution}
        </p>
      )}
    </div>
  );
}

function StatCard({ value, label, onPanel = false }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity .9s ease,transform .9s ease",
        background: onPanel ? "rgba(247,241,230,0.08)" : "var(--card-bg)",
        border: `1px solid ${onPanel ? "rgba(201,160,80,0.3)" : "var(--rule)"}`,
        padding: "2rem 1.5rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(2rem,4vw,3rem)",
          fontStyle: "italic",
          color: onPanel ? "var(--on-panel-xl)" : "var(--red)",
          fontWeight: 600,
          lineHeight: 1,
          marginBottom: "0.45rem",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.67rem",
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: onPanel ? "var(--on-panel-l)" : "var(--ink-light)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function InfoCard({ icon, title, body, delay = 0, onPanel = false }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: onPanel ? (h ? "rgba(247,241,230,0.12)" : "rgba(247,241,230,0.06)") : h ? "var(--bg)" : "var(--bg2)",
          border: `1px solid ${h ? (onPanel ? "rgba(201,160,80,0.6)" : "var(--gold-foil)") : onPanel ? "rgba(201,160,80,0.2)" : "var(--card-border)"}`,
          padding: "1.75rem",
          transition: "all .3s ease",
          transform: h ? "translateY(-4px)" : "none",
          position: "relative",
        }}
      >
        {icon}
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: onPanel ? "var(--on-panel-xl)" : "var(--ink)",
            marginBottom: "0.55rem",
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", lineHeight: 1.75, color: onPanel ? "var(--on-panel)" : "var(--ink-light)" }}>
          {body}
        </p>
      </div>
    </Reveal>
  );
}

function SourceCard({ title, year, desc, delay = 0 }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: h ? "var(--bg)" : "var(--bg2)",
          border: `1px solid ${h ? "var(--red)" : "var(--card-border)"}`,
          padding: "1.75rem",
          transition: "all .3s ease",
          transform: h ? "translateY(-3px)" : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: h ? "var(--red)" : "var(--gold-foil)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", marginTop: "0.2rem" }}>
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.56rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bg)",
              background: "var(--red)",
              padding: "0.18rem 0.5rem",
            }}
          >
            Primary Source
          </span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.88rem", fontStyle: "italic", color: "var(--ink-light)" }}>{year}</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.93rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.55rem", fontWeight: 400 }}>
          {title}
        </h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", lineHeight: 1.72, color: "var(--ink-light)" }}>{desc}</p>
      </div>
    </Reveal>
  );
}

function ArchiveCard({ item, delay = 0, onOpen }) {
  return (
    <Reveal delay={delay}>
      <button
        onClick={() => onOpen(item)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "var(--bg2)",
          border: "1px solid var(--card-border)",
          padding: "0.75rem",
          cursor: "pointer",
          transition: "transform .3s ease, border-color .3s ease, box-shadow .3s ease",
          boxShadow: "0 14px 32px rgba(42,26,14,0.08)",
        }}
      >
        <div style={{ overflow: "hidden", background: "var(--bg3)", marginBottom: "0.9rem" }}>
          <img
            src={item.src}
            alt={item.title}
            style={{ width: "100%", height: "280px", objectFit: "cover", objectPosition: "center center", display: "block" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "0.55rem" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.56rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--red-mid)" }}>{item.type}</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--ink-light)", fontSize: "0.9rem" }}>{item.year}</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontStyle: "italic", color: "var(--ink)", marginBottom: "0.45rem", fontWeight: 400 }}>{item.title}</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", lineHeight: 1.7, color: "var(--ink-light)", marginBottom: "0.75rem" }}>{item.note}</p>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-foil)" }}>Open Full View</span>
      </button>
    </Reveal>
  );
}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(18,12,8,0.82)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1080px, 100%)",
          maxHeight: "90vh",
          overflow: "auto",
          background: "var(--bg)",
          border: "1px solid var(--gold-foil)",
          padding: "1rem",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.56rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--red-mid)", marginBottom: "0.35rem" }}>{item.type} | {item.year}</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontStyle: "italic", color: "var(--ink)", fontWeight: 400 }}>{item.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "1px solid var(--rule)", padding: "0.45rem 0.75rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-light)" }}
          >
            Close
          </button>
        </div>
        <img src={item.src} alt={item.title} style={{ width: "100%", maxHeight: "68vh", objectFit: "contain", display: "block", background: "var(--bg3)" }} />
        <div style={{ borderTop: "1px solid var(--rule)", marginTop: "0.85rem", paddingTop: "0.85rem" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", lineHeight: 1.7, color: "var(--ink)" }}>{item.note}</p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", lineHeight: 1.7, color: "var(--ink-light)", marginTop: "0.55rem" }}>{item.credit}</p>
        </div>
      </div>
    </div>
  );
}

function TLItem({ year, event, detail, delay = 0, onPanel = false }) {
  return (
    <Reveal delay={delay}>
      <div style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: "2rem", alignItems: "flex-start", marginBottom: "2.5rem" }}>
        <div style={{ textAlign: "right", paddingTop: "0.1rem" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", fontStyle: "italic", color: "var(--gold-foil)", fontWeight: 400 }}>{year}</span>
        </div>
        <div style={{ borderLeft: `1px solid ${onPanel ? "rgba(201,160,80,0.3)" : "var(--rule-red)"}`, paddingLeft: "2rem", position: "relative" }}>
          <div style={{ position: "absolute", left: "-5px", top: "6px", width: "9px", height: "9px", borderRadius: "50%", background: "var(--gold-foil)" }} />
          <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontStyle: "italic", color: onPanel ? "var(--on-panel-xl)" : "var(--ink)", marginBottom: "0.4rem", fontWeight: 400 }}>
            {event}
          </h4>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", lineHeight: 1.72, color: onPanel ? "var(--on-panel-l)" : "var(--ink-light)" }}>{detail}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Callout({ title, body, onPanel = false }) {
  return (
    <Reveal delay={0.1}>
      <div
        style={{
          background: onPanel ? "rgba(0,0,0,0.2)" : "var(--bg3)",
          borderLeft: `3px solid ${onPanel ? "rgba(247,241,230,0.5)" : "var(--red)"}`,
          padding: "1.75rem 2rem",
          margin: "2rem 0",
        }}
      >
        <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontStyle: "italic", color: onPanel ? "var(--on-panel-xl)" : "var(--red)", marginBottom: "0.65rem", fontWeight: 400 }}>
          {title}
        </h4>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.81rem", lineHeight: 1.75, color: onPanel ? "var(--on-panel)" : "var(--ink-mid)" }}>{body}</p>
      </div>
    </Reveal>
  );
}

function PStep({ num, label, text }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "1.5rem", alignItems: "flex-start" }}>
      <div style={{ textAlign: "center", paddingTop: "0.1rem" }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontStyle: "italic", color: "var(--red)", opacity: 0.4, fontWeight: 400, lineHeight: 1 }}>
          {num}
        </span>
      </div>
      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: "0.75rem" }}>
        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--red-mid)", marginBottom: "0.4rem" }}>
          {label}
        </h4>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.81rem", lineHeight: 1.74, color: "var(--ink-light)" }}>{text}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [heroReady, setHeroReady] = useState(false);
  const [activeVisual, setActiveVisual] = useState(null);
  const [showLanternOverlay, setShowLanternOverlay] = useState(false);
  const [showDoorIntro, setShowDoorIntro] = useState(true);
  const [doorOpening, setDoorOpening] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [musicKey, setMusicKey] = useState(0);
  const speechRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      const seenLantern = window.localStorage.getItem("hist335-lantern-seen");
      if (!seenLantern) {
        setShowLanternOverlay(true);
        window.localStorage.setItem("hist335-lantern-seen", "true");
      }
    } catch {
      setShowLanternOverlay(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (musicEnabled) {
      setMusicKey((current) => current + 1);
      const retry = window.setTimeout(() => {
        setMusicKey((current) => current + 1);
      }, 700);
      return () => window.clearTimeout(retry);
    }
  }, [musicEnabled]);

  const cycleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : current === "dark" ? "contrast" : "light"));
  };

  const dismissLanternOverlay = () => {
    setShowLanternOverlay(false);
  };

  const enterExhibit = () => {
    if (doorOpening) return;
    if (!visitorName.trim()) {
      setVisitorName("Honored Guest");
    }
    setDoorOpening(true);
    window.setTimeout(() => {
      setShowDoorIntro(false);
    }, 1450);
  };

  const toggleMusic = async () => {
    setMusicEnabled((current) => !current);
  };

  const toggleSpeech = () => {
    if (!window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      speechRef.current = null;
      return;
    }

    const selection = document.querySelector("main")?.innerText || document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(selection.slice(0, 12000));
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => {
      setIsSpeaking(false);
      speechRef.current = null;
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      speechRef.current = null;
    };
    speechRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const W = { maxWidth: "920px", margin: "0 auto", padding: "6rem 2.5rem" };
  const WR = { maxWidth: "920px", margin: "0 auto", padding: "5.5rem 2.5rem", position: "relative", zIndex: 1 };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s ease" }}>
      {musicEnabled && (
        <iframe
          key={musicKey}
          title="Ambient soundtrack"
          src={`${YOUTUBE_EMBED_URL}&playsinline=1`}
          allow="autoplay; encrypted-media"
          loading="eager"
          style={{ position: "fixed", left: "-9999px", top: "-9999px", width: 1, height: 1, border: 0, opacity: 0.01, pointerEvents: "none" }}
        />
      )}
      <FontLoader />
      <GlobalStyles theme={theme} />
      <TraditionalDoorIntro
        visible={showDoorIntro}
        visitorName={visitorName}
        onNameChange={setVisitorName}
        onEnter={enterExhibit}
        opening={doorOpening}
      />
      <ProgressBar />
      <SideNav />
      <AccessibilityDock
        theme={theme}
        onThemeCycle={cycleTheme}
        isSpeaking={isSpeaking}
        onSpeakToggle={toggleSpeech}
        musicEnabled={musicEnabled}
        onMusicToggle={toggleMusic}
      />
      <LanternOverlay visible={showLanternOverlay} onDismiss={dismissLanternOverlay} musicEnabled={musicEnabled} />

      <main>
      <section
        data-section="0"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "var(--bg)",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 40%,var(--bg) 0%,var(--bg2) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.9 }}>
          <FloralCorner size={210} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0.9 }}>
          <FloralCorner size={210} mirror />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.65 }}>
          <FloralCorner size={160} flip />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, opacity: 0.65 }}>
          <FloralCorner size={160} flip mirror />
        </div>

        <div style={{ position: "absolute", inset: "18px", border: "1px solid var(--gold-foil)", opacity: 0.4, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: "25px", border: "0.5px solid var(--gold-foil)", opacity: 0.2, pointerEvents: "none" }} />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "2rem 3rem",
            maxWidth: "680px",
            opacity: heroReady ? 1 : 0,
            transform: heroReady ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1.5s ease .2s,transform 1.5s ease .2s",
          }}
        >
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--red-mid)", marginBottom: "0.9rem" }}>
            Vivienne Hnin | HIST 335 |{" "}
            <a
              href="https://viviennehnin.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "0.2em" }}
            >
              viviennehnin.com
            </a>
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontStyle: "italic", color: "var(--gold-foil)", marginBottom: "0.95rem" }}>
            Welcome{visitorName ? `, ${visitorName}` : ""}.
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-light)", marginBottom: "0.55rem" }}>
            A Digital Historical Exhibit
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.92rem", fontStyle: "italic", color: "var(--ink-light)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            requests the honour of your historical attention at
          </p>
          <div style={{ width: "44px", height: "1px", background: "var(--red)", margin: "0 auto 1.4rem" }} />

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,8vw,6.5rem)", fontWeight: 400, fontStyle: "italic", color: "var(--ink)", lineHeight: 0.96, marginBottom: ".15em", letterSpacing: "-.02em" }}>
            Trafficked Lives
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontStyle: "italic", color: "var(--gold-foil)", marginBottom: ".4em", letterSpacing: ".05em" }}>
            &amp; the Women Unnamed
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
            <div style={{ height: "1px", width: "28px", background: "var(--rule)" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: ".24em", textTransform: "uppercase", color: "var(--ink-light)" }}>California</span>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "var(--red)", lineHeight: 1 }}>1850</span>
            <span style={{ color: "var(--ink-light)" }}>—</span>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontStyle: "italic", color: "var(--red)", lineHeight: 1 }}>1882</span>
            <div style={{ height: "1px", width: "28px", background: "var(--rule)" }} />
          </div>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.63rem", letterSpacing: ".17em", textTransform: "uppercase", color: "var(--ink-light)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            At the Intersection of Race, Gender &amp; Labor Demand
            <br />
            The American West
          </p>

          <div style={{ display: "flex", justifyContent: "center", margin: "0.5rem 0 2rem" }}>
            <div style={{ animation: "sealPulse 3s ease-in-out infinite" }}>
              <WaxSeal size={46} />
            </div>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "0.92rem", fontStyle: "italic", color: "var(--ink-light)", marginBottom: "0.75rem" }}>
            Kindly scroll to attend
          </p>
          <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom,var(--red),transparent)", margin: "0 auto", animation: "breathe 2.2s ease-in-out infinite" }} />
        </div>
      </section>

      <EnvelopeFlap toPanel={false} />

      <section data-section="1" style={{ ...W, position: "relative" }}>
        <FloralWatermark />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <Label>Introduction</Label>
          <STitle>A Hidden History Within the Gold Rush</STitle>
        </Reveal>
        <Reveal delay={0.1} style={{ position: "relative", zIndex: 1 }}>
          <Body>
            Chinese women in Gold Rush California occupied one of the most precarious positions in the nineteenth-century Pacific world. They entered an expanding frontier economy shaped by labor scarcity, racial exclusion, and gendered demand. Their exploitation was not a side effect of the Gold Rush. It was built into the political economy of western development, where mining camps, port cities, and local authorities all benefited from systems of debt, coercion, and sale.
          </Body>
          <Body>
            Studying these women revises the familiar mythology of the Gold Rush. Instead of a story defined only by opportunity and self-making, the record reveals an economy built on unequal freedom. Chinese migrant men were recruited as workers and then taxed, segregated, and criminalized. Chinese women were even more tightly constrained, appearing in the archive mainly as anomalies, spectacles, threats, or plaintiffs struggling to be heard.
          </Body>
          <Body>
            The archive is correspondingly fractured. Many women appear only as tallies, aliases, rescue cases, or objects of litigation. That thin record is part of the history itself. It reflects a system that recorded Chinese women mainly when they could be counted, inspected, sold, or disciplined, and this exhibit reads those silences as evidence rather than empty space.
          </Body>
          <CitationPills ids={["hirata", "tong", "yung", "shah", "census1850", "census1860"]} />
        </Reveal>
        <Reveal delay={0.12} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.2rem", marginTop: "2rem" }}>
            {EARLY_VISUALS.map((item, i) => (
              <InlineVisualCard key={item.title} item={item} delay={0.04 * i} onOpen={setActiveVisual} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginTop: "2rem", padding: "1.35rem 1.5rem", border: "1px solid var(--rule)", background: "var(--bg2)" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--red-mid)", marginBottom: "0.45rem" }}>
              Personalized Welcome
            </p>
            <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: "1rem", lineHeight: 1.78, color: "var(--ink-mid)" }}>
              {visitorName ? `${visitorName}, this exhibit invites you to move slowly through evidence, images, and interpretation.` : "This exhibit invites you to move slowly through evidence, images, and interpretation."} Open the archive cards, use the FAQ guide in the corner, and read the source notes as part of the story itself.
            </p>
          </div>
        </Reveal>
        <ScholarlyPanel />
        <TakeawayPanel />
        <GoldRule wide />
        <Reveal delay={0.15} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ border: "1px solid var(--rule)", padding: "2.5rem 2rem", position: "relative", textAlign: "center" }}>
            <CornerBrackets size={14} color="var(--gold-foil)" thickness={2} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.05rem,1.65vw,1.28rem)", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.85 }}>
              "Chinese women forced into sexual labor during the California Gold Rush were not simply victims of individual exploitation, but part of a larger system shaped by racial violence, gender imbalance, and economic demand in the American West."
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
              <div style={{ width: "16px", height: "1px", background: "var(--rule-red)" }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.57rem", color: "var(--red)", letterSpacing: ".28em", textTransform: "uppercase" }}>Thesis</p>
              <div style={{ width: "16px", height: "1px", background: "var(--rule-red)" }} />
            </div>
          </div>
        </Reveal>
      </section>

      <EnvelopeFlap toPanel />
      <RedPanel>
        <section data-section="2" style={{ ...WR }}>
          <Reveal>
            <Label onPanel>Section I</Label>
            <STitle onPanel>Migration and Gender Imbalance</STitle>
            <Body onPanel>
              The California Gold Rush produced a dramatic migration surge, but its Chinese dimension was profoundly gendered from the outset. Census data and shipping records show that Chinese immigration was overwhelmingly male, driven by demand for mining, transport, and service labor. In that environment, women became scarce, highly profitable, and especially vulnerable to coercive migration.
            </Body>
            <Body onPanel>
              This asymmetry was structural, not accidental. Economic hardship in Guangdong and brokerage networks across the Pacific moved women under very different terms than men. Rather than freely joining migration, many were funneled into routes where passage, debt, employment, and bodily control reinforced one another.
            </Body>
            <CitationPills ids={["census1850", "census1860", "hirata", "tong"]} onPanel />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1.5rem", margin: "3rem 0" }}>
            <StatCard value="~95%" label="of Chinese immigrants were male (1860 Census)" onPanel />
            <StatCard value="~2,000" label="Chinese women in California by 1860" onPanel />
            <StatCard value="~85%" label="estimated in coerced sexual labor" onPanel />
          </div>
          <PullQuote onPanel text="The demand for women was not separate from the Gold Rush economy — it was embedded within it." attribution="Lucie Cheng Hirata, Signs, 1979" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))", gap: "1.25rem", marginTop: "1.5rem" }}>
            <InfoCard icon={<IcoBalance onPanel />} title="Economic Pressures in China" body="Flooding, famine, and the Taiping Rebellion devastated communities in Guangdong province, creating conditions under which families sometimes sold daughters to brokers — often under false promises of employment or marriage." delay={0} onPanel />
            <InfoCard icon={<IcoShip onPanel />} title="Controlled Migration Channels" body="Immigration brokers and trafficking networks arranged passage for women. Few arrived as independent migrants. The journey itself was frequently the beginning of debt bondage." delay={0.1} onPanel />
            <InfoCard icon={<IcoChain onPanel />} title="A Market-Driven System" body="The ratio of men to women in mining camps meant sexual labor was among the most profitable enterprises in Gold Rush California. This economic logic sustained the trafficking system for decades." delay={0.2} onPanel />
          </div>
          <ExhibitImage
            onPanel
            src={IMG_SHIP}
            alt="Chinese immigrants sight land, painting by Mian Situ"
            caption="The Golden Mountain, Arriving San Francisco, 1865"
            credit="Mian Situ. Courtesy of Mian Situ."
            imageStyle={{
              width: "100%",
              height: "700px",
              maxHeight: "none",
              margin: 0,
              objectPosition: "center 0%",
            }}
            analysis={[
              {
                q: "1. Publication & Attribution",
                a: "This oil painting by contemporary Chinese-American artist Mian Situ depicts Chinese immigrants arriving in San Francisco in 1865. It is a modern historical reconstruction, not a period document, but draws on extensive archival research and serves as a widely reproduced visual interpretation of the immigration experience.",
              },
              {
                q: "2. Whose Perspective? Purpose?",
                a: "The painting centers the experience of the immigrants themselves rather than American onlookers or officials. Situ's choice to foreground women and children amid a sea of male passengers is a deliberate artistic and historical argument about who made the journey and under what conditions.",
              },
            ]}
          />
          <PopulationMap />
          <ScholarlyPanel onPanel />
        </section>
      </RedPanel>
      <EnvelopeFlap toPanel={false} />

      <section data-section="3" style={{ ...W, position: "relative" }}>
        <FloralWatermark />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <Label>Section II</Label>
          <STitle>Systems of Trafficking and Sale</STitle>
          <Body>
            The exploitation of Chinese women in Gold Rush California was not chaotic or merely opportunistic. It rested on a structured transpacific system of brokerage, sale, transport, debt accounting, and enforcement. Women could be purchased from impoverished households, transferred by regional middlemen, shipped across the Pacific under arrangements they did not control, and then assigned to brothels or domestic-sexual labor regimes whose owners treated transportation costs as enforceable debt. Seen this way, trafficking was not the opposite of migration but one of its organized forms within the nineteenth-century Pacific economy.
          </Body>
          <Body>
            Historians differ on the exact proportion of women who entered prostitution under direct coercion, but they agree on the system’s architecture: passage, provisioning, and supposed "protection" were converted into escalating obligations that made exit nearly impossible. Violence mattered, but so did bookkeeping. Debt transformed coercion into something traffickers could represent as contract; racial exclusion and linguistic isolation then made those contracts difficult to challenge. What appears in the archive as purchase, rescue, flight, or habeas corpus therefore reflects the operation of a larger infrastructure whose logic was commercial before it was moralized.
          </Body>
          <CitationPills ids={["hirata", "tong", "mission"]} />
        </Reveal>
        <Reveal delay={0.1} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ border: "1px solid var(--rule)", padding: "2.5rem 2rem", margin: "2rem 0", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,var(--red),var(--gold-foil),var(--red))" }} />
            <CornerBrackets size={14} color="var(--red)" thickness={2} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontStyle: "italic", color: "var(--gold)", marginBottom: "2rem", textAlign: "center" }}>How the System Worked</p>
            <div style={{ display: "grid", gap: "1.75rem" }}>
              <PStep num="I" label="Acquisition" text="Women were purchased from families in China or kidnapped. Some were deceived with promises of legitimate domestic work or marriage to wealthy men in California." />
              <PStep num="II" label="Transit" text="Brokers arranged passage across the Pacific. During transit, women had no legal status and no recourse. Many did not understand where they were going or under what conditions they would live." />
              <PStep num="III" label="Debt Bondage" text="Upon arrival, women were presented with 'contracts' for the cost of their passage, clothing, and food — debts designed to be unpayable. Every expense was added; repayment was near impossible." />
              <PStep num="IV" label="Enforcement" text="Organizations including tongs served as enforcers, ensuring women could not escape. Violence and threats against family members in China were common tools of control." />
            </div>
          </div>
        </Reveal>
        <PullQuote text="She arrived believing she would work as a domestic servant. She was placed in a brothel within days of landing in San Francisco." attribution="Presbyterian Mission Home records, late 19th century" />
        <ExhibitImage
          src={IMG_NEWSPAPER}
          alt="Newspaper illustration"
          caption="The Man Filled Both of My Hands With Gold and I Then Became His Slave."
          credit="Illustration by Dixon. Period newspaper, late 19th century."
          analysis={[
            {
              q: "1. Publication & Attribution",
              a: "This ink illustration by an artist signed Dixon appeared in a late-nineteenth-century American newspaper. The decorative Chinese-style border suggests deliberate editorial framing of the subject as exotic.",
            },
            {
              q: "2. Historical Arguments It Supports",
              a: "The image documents that the practice of purchasing women was publicly known and reported. The captioned testimony supports arguments about the mechanics of debt bondage and public awareness.",
            },
          ]}
        />
        <ScholarlyPanel />
      </section>

      <EnvelopeFlap toPanel />
      <RedPanel>
        <section data-section="4" style={{ ...WR }}>
          <Reveal>
            <Label onPanel>Section III</Label>
            <STitle onPanel>Racialized Sexual Exploitation</STitle>
            <Body onPanel>
              The exploitation of Chinese women did not occur in a racial vacuum. It was enabled by a racial order that positioned Chinese migrants as permanently alien, culturally degraded, and only conditionally legible to American law. In print culture, Chinese women were rendered as curiosities, contaminants, or emblems of vice; in legal culture, they were treated as unreliable, unassimilable, and often unreachable except through white institutional intermediaries. Such representations did real work. They lowered the moral cost of abuse while redirecting public attention away from coercion and toward spectacle, sanitation, and racial fear.
            </Body>
            <Body onPanel>
              The consequence was not simply prejudice, but differential vulnerability. Once courts, journalists, and city officials treated Chinese women as a population problem rather than rights-bearing persons, trafficking could thrive inside a language of regulation. This is why the history matters beyond the bounds of prostitution alone: it shows how race transformed sexual exploitation from an illicit practice into a tolerated urban arrangement, one that authorities could condemn rhetorically while leaving its underlying conditions intact.
            </Body>
            <CitationPills ids={["hall", "shah", "tong"]} onPanel />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))", gap: "1.25rem", margin: "2.5rem 0" }}>
            <InfoCard icon={<IcoNewspaper onPanel />} title="Stereotypes in Print" body="Newspapers of the period depicted Chinese women through dehumanizing racial stereotypes." delay={0} onPanel />
            <InfoCard icon={<IcoGavel onPanel />} title="Legal Exclusion" body="People v. Hall (1854) ruled that Chinese people could not testify against white defendants." delay={0.1} onPanel />
            <InfoCard icon={<IcoTemple onPanel />} title="Legislative Indifference" body="City and state officials framed Chinese prostitution around public health and racial purity, not the welfare of the women themselves." delay={0.2} onPanel />
          </div>
          <Callout onPanel title="Structural Violence" body="Violence against Chinese women was not merely tolerated — it was structurally protected." />
          <ScholarlyPanel onPanel />
        </section>
      </RedPanel>
      <EnvelopeFlap toPanel={false} />

      <section data-section="5" style={{ ...W, position: "relative" }}>
        <FloralWatermark />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <Label>Section IV</Label>
          <STitle>Resistance and Survival</STitle>
          <Body>
            To portray Chinese women during the Gold Rush only as victims is to repeat the archive’s own flattening effects. Resistance often took quieter forms: seeking allies, escaping to mission homes, testifying through interpreters, or using habeas corpus petitions to challenge confinement. These acts should not be romanticized, but they do show that coercive systems were never total.
          </Body>
          <Body>
            Mission records are especially revealing, though they must be read critically. Produced by reformers with their own agendas, they still preserve traces of women’s choices about when to flee, whom to trust, and when to litigate. The surviving evidence suggests not passive rescue, but repeated efforts by Chinese women to force openings in systems designed to contain them.
          </Body>
          <CitationPills ids={["mission", "yung", "tong"]} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(235px,1fr))", gap: "1.25rem", margin: "2.5rem 0", position: "relative", zIndex: 1 }}>
          <InfoCard icon={<IcoTemple />} title="Legal Testimony" body="Court records show Chinese women testifying against traffickers and brothel owners in cases where legal avenues were available." delay={0} />
          <InfoCard icon={<IcoScroll />} title="Escape" body="Some women fled to missionary rescue homes, particularly the Presbyterian Mission Home on Sacramento Street in San Francisco." delay={0.08} />
          <InfoCard icon={<IcoHands />} title="Community Networks" body="Within Chinese communities, informal networks sometimes provided information, shelter, or assistance." delay={0.16} />
          <InfoCard icon={<IcoBalance />} title="Legal Action" body="Women who gained access to legal resources sometimes sought writs of habeas corpus to challenge their detention." delay={0.24} />
        </div>
        <GoldRule />
        <Reveal delay={0.08} style={{ position: "relative", zIndex: 1 }}>
          <Label>Visual Archive</Label>
          <STitle>Open the Wider Visual Record</STitle>
          <Body>
            The surviving visual record is fragmentary, but it helps situate Chinese women within broader worlds of migration, family, inspection, and urban life. Click any image to open it full size.
          </Body>
          <CitationPills ids={["customhouse", "sacramento", "chinatownmap", "census1860", "yung"]} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.35rem", position: "relative", zIndex: 1 }}>
          {VISUAL_ARCHIVE.map((item, i) => (
            <ArchiveCard key={item.title} item={item} delay={0.06 * i} onOpen={setActiveVisual} />
          ))}
        </div>
      </section>

      <EnvelopeFlap toPanel />
      <RedPanel>
        <section data-section="6" style={{ ...WR }}>
          <Reveal>
            <Label onPanel>Section V</Label>
            <STitle onPanel>Law and Control</STitle>
            <Body onPanel>
              The American legal system during the Gold Rush era was not a neutral arbiter of justice for Chinese women — it was an active participant in their exploitation.
            </Body>
          </Reveal>
          <GoldRule onPanel />
          <div>
            <TLItem onPanel year="1850" event="California Statehood" detail="California entered the Union with a constitution that excluded Chinese and other non-white residents from legal equality." delay={0} />
            <TLItem onPanel year="1854" event="People v. Hall" detail="The California Supreme Court ruled that Chinese people could not testify against white defendants." delay={0.16} />
            <TLItem onPanel year="1882" event="Chinese Exclusion Act" detail="Federal legislation barred virtually all Chinese immigration." delay={0.4} />
          </div>
        </section>
      </RedPanel>
      <EnvelopeFlap toPanel={false} />

      <section data-section="7" style={{ ...W, position: "relative" }}>
        <FloralWatermark />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <Label>Primary Sources</Label>
          <STitle>The Documentary Record</STitle>
          <Body>
            This exhibit draws on a layered documentary record: census schedules, court opinions, missionary reports, maps, engravings, and journalism. None of these sources is neutral. Census data count but do not explain, legal opinions reveal structure while flattening lived experience, and newspapers often sensationalize the women they describe.
          </Body>
          <Body>
            Read together, these sources show different parts of the same system. Court records illuminate legal exclusion, municipal reports show official priorities, and visual materials reveal how Chinese migrants were framed for viewers. Using them together makes it possible to tell a history grounded in evidence while staying alert to who produced that evidence and why.
          </Body>
          <CitationPills ids={["census1850", "census1860", "hall", "mission", "customhouse", "sacramento", "chinatownmap"]} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))", gap: "1.5rem", marginTop: "2.5rem", position: "relative", zIndex: 1 }}>
          <SourceCard title="The Seventh Census of the United States" year="1850" desc="Federal census data from 1850 documents the earliest statistical portrait of Chinese immigrants in California." delay={0} />
          <SourceCard title="People v. Hall" year="1854" desc="This California Supreme Court ruling barred Chinese, Black, and Indigenous people from testifying against white defendants." delay={0.21} />
          <SourceCard title="Presbyterian Mission Home Records" year="Late 19th c." desc="Occasional papers and case records document the conditions women described upon arrival." delay={0.28} />
          <SourceCard title="Chinese Immigrants at the San Francisco Custom House" year="1877" desc="A wood engraving of Chinese immigrants at a San Francisco inspection site, showing arrival as bureaucratic sorting and surveillance." delay={0.35} />
          <SourceCard title='Official Map of "Chinatown" in San Francisco' year="1885" desc='This map documents businesses, occupancies, gambling houses, and racialized labeling of Chinatown block by block.' delay={0.42} />
          <SourceCard title="San Francisco, Calif. — China Town, Sacramento St." year="1866" desc="An albumen street view that places migration and commerce inside a lived urban environment rather than a purely sensational one." delay={0.49} />
          <SourceCard title="The Golden Mountain, Arriving San Francisco" year="1865" desc="A widely used historical painting that helps visitors visualize migration, family presence, and the expectations attached to arrival." delay={0.56} />
          <SourceCard title="Community Portrait" year="Late 19th c." desc="A contextual portrait image that restores personhood and presence alongside the exhibit’s legal and demographic sources." delay={0.63} />
        </div>
        <ExhibitImage
          src={IMG_CUSTOM_HOUSE}
          alt="Chinese immigrants at the San Francisco Custom House, wood engraving, 1877"
          caption="Chinese Immigrants at the San Francisco Custom House"
          credit="P. Frenzeny, 1877 wood engraving. Library of Congress."
          analysis={[
            {
              q: "1. Publication & Attribution",
              a: "This 1877 wood engraving depicts Chinese immigrants at the San Francisco Custom House. It circulated as a period printed image and survives through the Library of Congress.",
            },
            {
              q: "2. What It Shows",
              a: "The image emphasizes inspection, waiting, and oversight rather than individual stories. Chinese migrants appear as a managed population moving through bureaucratic space under scrutiny.",
            },
            {
              q: "3. Why It Matters",
              a: "For this exhibit, the engraving helps connect trafficking to migration control. Women did not arrive into a social vacuum; they entered a port regime that sorted bodies, monitored movement, and shaped vulnerability from the moment of landing.",
            },
            {
              q: "4. Historical Questions",
              a: "Who was being inspected? How did officials differentiate men from women? How did documentation, debt, and racial profiling affect what happened after arrival in port cities like San Francisco?",
            },
          ]}
        />
        <ScholarlyPanel />
      </section>

      <EnvelopeFlap toPanel />
      <RedPanel>
        <section data-section="8" style={{ padding: "8rem 2.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                <div style={{ animation: "sealPulse 3.5s ease-in-out infinite" }}>
                  <WaxSeal size={52} />
                </div>
              </div>
              <Label onPanel>Conclusion</Label>
              <STitle onPanel center>A History That Demands to Be Told</STitle>
            </Reveal>
            <Reveal delay={0.1}>
              <Body onPanel center>
                The experiences of Chinese women during the California Gold Rush reveal a hidden history embedded within American expansion — one that mainstream narratives of the period have long obscured.
              </Body>
              <Body onPanel center>
                Recognizing this history challenges dominant narratives of the Gold Rush and insists on accounting for the full human cost of economic growth in early America.
              </Body>
            </Reveal>
          </div>
        </section>
      </RedPanel>

      <EnvelopeFlap toPanel={false} />
      <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--rule)", padding: "5rem 2.5rem 3rem", position: "relative", overflow: "hidden" }}>
        <FloralWatermark />
        <div style={{ maxWidth: "920px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "2.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,transparent,var(--gold-foil))" }} />
            <WaxSeal size={16} gold />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.57rem", letterSpacing: ".28em", textTransform: "uppercase", color: "var(--red)" }}>Bibliography</p>
            <WaxSeal size={16} gold />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,var(--gold-foil),transparent)" }} />
          </div>
          <div style={{ marginBottom: "1.5rem", padding: "1rem 1.5rem", border: "1px solid var(--rule)", position: "relative" }}>
            <CornerBrackets size={12} color="var(--gold-foil)" thickness={1.5} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.5rem" }}>
              Secondary Sources — Chicago Manual of Style
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", lineHeight: 1.72, color: "var(--ink-light)", paddingLeft: "1.5rem", textIndent: "-1.5rem" }}>
              Hirata, Lucie Cheng. "Free, Indentured, Enslaved: Chinese Prostitutes in Nineteenth-Century America." <em>Signs</em> 5, no. 1 (1979): 3–29.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", lineHeight: 1.72, color: "var(--ink-light)", paddingLeft: "1.5rem", textIndent: "-1.5rem" }}>
              Tong, Benson. <em>Unsubmissive Women: Chinese Prostitutes in Nineteenth-Century San Francisco, 1850-1920</em>. Norman: University of Oklahoma Press, 1994.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", lineHeight: 1.72, color: "var(--ink-light)", paddingLeft: "1.5rem", textIndent: "-1.5rem" }}>
              Yung, Judy. <em>Unbound Feet: A Social History of Chinese Women in San Francisco</em>. Berkeley: University of California Press, 1995.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", lineHeight: 1.72, color: "var(--ink-light)", paddingLeft: "1.5rem", textIndent: "-1.5rem" }}>
              Shah, Nayan. <em>Contagious Divides: Epidemics and Race in San Francisco's Chinatown</em>. Berkeley: University of California Press, 2001.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", lineHeight: 1.72, color: "var(--ink-light)", paddingLeft: "1.5rem", textIndent: "-1.5rem" }}>
              Lee, Erika. <em>At America's Gates: Chinese Immigration during the Exclusion Era, 1882-1943</em>. Chapel Hill: University of North Carolina Press, 2003.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", lineHeight: 1.72, color: "var(--ink-light)", paddingLeft: "1.5rem", textIndent: "-1.5rem" }}>
              Gyory, Andrew. <em>Closing the Gate: Race, Politics, and the Chinese Exclusion Act</em>. Chapel Hill: University of North Carolina Press, 1998.
            </p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", lineHeight: 1.72, color: "var(--ink-light)", paddingLeft: "1.5rem", textIndent: "-1.5rem" }}>
              Takaki, Ronald. <em>Strangers from a Different Shore: A History of Asian Americans</em>. Boston: Little, Brown, 1998.
            </p>
          </div>
        </div>
      </footer>
      </main>
      <FaqChatBot visitorName={visitorName.trim()} />
      <Lightbox item={activeVisual} onClose={() => setActiveVisual(null)} />
    </div>
  );
}
