import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

interface CartBadgeProps {
  theme: "light" | "dark";
}

export function CartBadge({ theme }: CartBadgeProps) {
  const { totalItems, badgePulseKey } = useCart();
  const isDark = theme === "dark";
  const labelColor = isDark ? "text-white" : "text-black";

  return (
    <Link
      to="/anfragekorb"
      aria-label={`Anfragekorb (${totalItems} ${totalItems === 1 ? "Artikel" : "Artikel"})`}
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-70 ${labelColor}`}
    >
      <span
        className="font-light text-[15px] leading-none whitespace-nowrap"
        style={{ fontFamily: '"Avenir", sans-serif', fontWeight: 300 }}
      >
        Anfragekorb
      </span>
      <span
        key={badgePulseKey}
        className={`w-[22px] h-[22px] rounded-full grid place-items-center bg-cyan text-white text-[13px] font-bold leading-none tabular-nums ${
          totalItems > 0 ? "animate-badge-pulse" : ""
        }`}
        style={{ fontFamily: '"Avenir", sans-serif', fontWeight: 900 }}
      >
        {totalItems}
      </span>
    </Link>
  );
}
