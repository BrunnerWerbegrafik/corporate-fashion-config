import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { CartIcon } from "../ui/Icon";

interface CartBadgeProps {
  theme: "light" | "dark";
}

export function CartBadge({ theme }: CartBadgeProps) {
  const { totalItems, badgePulseKey } = useCart();
  const colorClass = theme === "light" ? "text-brunner-dark hover:text-brunner-cyan" : "text-white hover:text-brunner-cyanSoft";

  return (
    <Link
      to="/anfragekorb"
      aria-label={`Anfragekorb (${totalItems} ${totalItems === 1 ? "Artikel" : "Artikel"})`}
      className={`relative inline-flex items-center justify-center p-2 transition-colors ${colorClass}`}
    >
      <CartIcon size={24} />
      {totalItems > 0 && (
        <span
          key={badgePulseKey}
          className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-brunner-cyan text-white text-[11px] font-bold inline-flex items-center justify-center animate-badge-pulse"
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
