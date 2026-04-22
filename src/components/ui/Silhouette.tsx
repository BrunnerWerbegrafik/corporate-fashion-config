import type { PositionTab } from "../../types/models";

interface SilhouetteProps {
  view: PositionTab;
  highlight?: { x: number; y: number; size: "small" | "large" } | null;
  className?: string;
}

// Schematische Inline-SVG-Silhouetten – einfache Vektor-Umrisse für T-Shirt-Front, -Back, -Sleeve.
export function Silhouette({ view, highlight, className = "" }: SilhouetteProps) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      {view === "vorne" && (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          {/* T-Shirt Front */}
          <path d="M30 18 L20 28 L8 36 L20 56 L28 50 L28 130 L92 130 L92 50 L100 56 L112 36 L100 28 L90 18 L74 22 Q60 32 46 22 Z" />
          {/* Halsausschnitt */}
          <path d="M46 22 Q60 30 74 22" />
        </g>
      )}
      {view === "hinten" && (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          {/* T-Shirt Back */}
          <path d="M30 18 L20 28 L8 36 L20 56 L28 50 L28 130 L92 130 L92 50 L100 56 L112 36 L100 28 L90 18 L72 18 Q60 24 48 18 Z" />
          {/* Nackenbogen */}
          <path d="M48 18 Q60 24 72 18" />
        </g>
      )}
      {view === "aermel" && (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          {/* Vereinfachter Ärmel */}
          <path d="M30 30 L20 60 L40 130 L80 130 L100 60 L90 30 Z" />
          <path d="M30 30 L60 38 L90 30" />
        </g>
      )}
      {highlight && (
        <circle
          cx={highlight.x}
          cy={highlight.y}
          r={highlight.size === "large" ? 14 : 6}
          fill="#009FE3"
          stroke="white"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
