import { useState, useEffect, useRef } from "react";
import firstImage from "./assets/first-image.png";
import secondImage from "./assets/second-image.png";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
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

// ── GlobalStyles injects CSS vars + keyframes ─────────────────────────────────
const GlobalStyles = ({ dark }) => {
  useEffect(() => {
    const el = document.createElement("style");
    const tokens = dark ? DARK : LIGHT;
    const vars = Object.entries(tokens)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    el.textContent = `
      :root{${vars}}
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:var(--bg)}
      ::selection{background:var(--red-dim);color:var(--ink)}
      @keyframes breathe{0%,100%{opacity:.8;transform:scaleY(1)}50%{opacity:.2;transform:scaleY(.5)}}
      @keyframes sealPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, [dark]);
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
const IMG_SHIP = firstImage;
const IMG_NEWSPAPER = secondImage;
const IMG_CUSTOM_HOUSE = "https://cdn.loc.gov/service/pnp/cph/3b00000/3b01000/3b01300/3b01313r.jpg";
const IMG_CHINATOWN_STREET = "https://cdn.loc.gov/service/pnp/cph/3a20000/3a21000/3a21500/3a21524r.jpg";

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

function ModeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "2.5rem",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 0.85rem 0.4rem 0.5rem",
        background: "var(--toggle-bg)",
        border: "1px solid var(--gold-foil)",
        borderRadius: "999px",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--toggle-fg)",
          whiteSpace: "nowrap",
        }}
      >
        {dark ? "Light mode" : "Dark mode"}
      </span>
    </button>
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
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: "clamp(1.05rem,1.45vw,1.18rem)",
      fontWeight: 300,
      lineHeight: 1.9,
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
  const [dark, setDark] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [activeVisual, setActiveVisual] = useState(null);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const W = { maxWidth: "920px", margin: "0 auto", padding: "6rem 2.5rem" };
  const WR = { maxWidth: "920px", margin: "0 auto", padding: "5.5rem 2.5rem", position: "relative", zIndex: 1 };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s ease" }}>
      <FontLoader />
      <GlobalStyles dark={dark} />
      <ProgressBar />
      <SideNav />
      <ModeToggle dark={dark} onToggle={() => setDark((d) => !d)} />

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
            Chinese women in the California Gold Rush were among the most vulnerable people in the American West. While tens of thousands of men migrated in search of economic opportunity, very few Chinese women arrived freely. Many were trafficked, sold, or coerced into prostitution through systems that treated them as commodities rather than individuals.
          </Body>
          <Body>
            Their experiences reveal how race, gender, and labor intersected in the formation of early American capitalism. By examining their lives, this exhibit argues that the Gold Rush was not only a story of opportunity and ingenuity — it was also one of exploitation sustained by legal ambiguity, racial hierarchy, and social acceptance.
          </Body>
          <Body>
            The women whose stories appear here were rarely given names in the historical record. They were catalogued in census tallies, listed in court dockets, described in missionary reports. This exhibit attempts to restore the complexity they were denied.
          </Body>
        </Reveal>
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
              The California Gold Rush of 1849 set off one of the largest voluntary migration waves in American history — but it was profoundly gendered. Chinese immigration to California was overwhelmingly male, driven by labor demand in mining and railroad construction. Women represented a fraction of a fraction of arrivals, and among Chinese women, the vast majority did not come freely.
            </Body>
            <Body onPanel>
              This asymmetry was not incidental. It was structural. Economic pressures in southern China's Pearl River Delta — combined with restrictive American policies — funneled a narrow stream of women into a vast masculine economy with powerful demand for sexual labor.
            </Body>
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
        </section>
      </RedPanel>
      <EnvelopeFlap toPanel={false} />

      <section data-section="3" style={{ ...W, position: "relative" }}>
        <FloralWatermark />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <Label>Section II</Label>
          <STitle>Systems of Trafficking and Sale</STitle>
          <Body>
            The exploitation of Chinese women in Gold Rush California was not chaotic or opportunistic — it was organized. A structured system of brokers, contracts, debt bondage, and enforcement networks operated across the Pacific, moving women from villages in Guangdong to brothels in San Francisco, Sacramento, and mining camps throughout the Sierra Nevada foothills.
          </Body>
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
      </section>

      <EnvelopeFlap toPanel />
      <RedPanel>
        <section data-section="4" style={{ ...WR }}>
          <Reveal>
            <Label onPanel>Section III</Label>
            <STitle onPanel>Racialized Sexual Exploitation</STitle>
            <Body onPanel>
              The exploitation of Chinese women did not occur in a racial vacuum. It was enabled, normalized, and sustained by a particular set of racial attitudes that rendered these women legally invisible and socially disposable in the eyes of dominant American society.
            </Body>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))", gap: "1.25rem", margin: "2.5rem 0" }}>
            <InfoCard icon={<IcoNewspaper onPanel />} title="Stereotypes in Print" body="Newspapers of the period depicted Chinese women through dehumanizing racial stereotypes." delay={0} onPanel />
            <InfoCard icon={<IcoGavel onPanel />} title="Legal Exclusion" body="People v. Hall (1854) ruled that Chinese people could not testify against white defendants." delay={0.1} onPanel />
            <InfoCard icon={<IcoTemple onPanel />} title="Legislative Indifference" body="City and state officials framed Chinese prostitution around public health and racial purity, not the welfare of the women themselves." delay={0.2} onPanel />
          </div>
          <Callout onPanel title="Structural Violence" body="Violence against Chinese women was not merely tolerated — it was structurally protected." />
        </section>
      </RedPanel>
      <EnvelopeFlap toPanel={false} />

      <section data-section="5" style={{ ...W, position: "relative" }}>
        <FloralWatermark />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <Label>Section IV</Label>
          <STitle>Resistance and Survival</STitle>
          <Body>
            To portray Chinese women during the Gold Rush exclusively as victims is to replicate the erasure the historical record has already imposed on them. Despite the overwhelming constraints of debt bondage, physical violence, and legal exclusion, many women resisted.
          </Body>
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
            The history documented in this exhibit rests on a collection of primary sources spanning census records, court decisions, missionary reports, and contemporary journalism.
          </Body>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))", gap: "1.5rem", marginTop: "2.5rem", position: "relative", zIndex: 1 }}>
          <SourceCard title="The Seventh Census of the United States" year="1850" desc="Federal census data from 1850 documents the earliest statistical portrait of Chinese immigrants in California." delay={0} />
          <SourceCard title="People v. Hall" year="1854" desc="This California Supreme Court ruling barred Chinese, Black, and Indigenous people from testifying against white defendants." delay={0.21} />
          <SourceCard title="Presbyterian Mission Home Records" year="Late 19th c." desc="Occasional papers and case records document the conditions women described upon arrival." delay={0.28} />
          <SourceCard title="Chinese Immigrants at the San Francisco Custom House" year="1877" desc="A wood engraving of Chinese immigrants at a San Francisco inspection site, showing arrival as bureaucratic sorting and surveillance." delay={0.35} />
          <SourceCard title='Official Map of "Chinatown" in San Francisco' year="1885" desc='This map documents businesses, occupancies, gambling houses, and racialized labeling of Chinatown block by block.' delay={0.42} />
          <SourceCard title="San Francisco, Calif. — China Town, Sacramento St." year="1866" desc="An albumen street view that places migration and commerce inside a lived urban environment rather than a purely sensational one." delay={0.49} />
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
          </div>
        </div>
      </footer>
      <Lightbox item={activeVisual} onClose={() => setActiveVisual(null)} />
    </div>
  );
}
