import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

interface CartBadgeProps {
  theme: "light" | "dark";
}

export function CartBadge({ theme }: CartBadgeProps) {
  const { totalItems, badgePulseKey } = useCart();
  const isDark = theme === "dark";
  const ringClass = isDark
    ? "hover:bg-white/10 text-white"
    : "hover:bg-well text-ink";

  return (
    <Link
      to="/anfragekorb"
      aria-label={`Anfragekorb (${totalItems} ${totalItems === 1 ? "Artikel" : "Artikel"})`}
      className={`relative w-10 h-10 rounded-full grid place-items-center transition-colors ${ringClass}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        stroke="currentColor"
      >
        <path d="M3 5h2l2.4 12.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6" />
        <circle cx="9.5" cy="21" r="1.3" />
        <circle cx="17.5" cy="21" r="1.3" />
      </svg>
      {totalItems > 0 && (
        <span
          key={badgePulseKey}
          className={`absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-cyan text-white text-[10px] font-semibold grid place-items-center tabular-nums animate-badge-pulse ${
            isDark ? "ring-2 ring-dk-1" : "ring-2 ring-white"
          }`}
          style={{ boxShadow: isDark ? "0 0 0 2px #0B1523" : "0 0 0 2px #fff" }}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
