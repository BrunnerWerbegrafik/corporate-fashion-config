import { Link } from "react-router-dom";
import { CartBadge } from "./CartBadge";

interface TopNavProps {
  theme: "light" | "dark";
}

export function TopNav({ theme }: TopNavProps) {
  const isDark = theme === "dark";
  const wrapper = isDark
    ? "bg-dk-1 border-b border-dk-line"
    : "bg-white border-b border-hairline";
  const logoSrc = isDark ? "/images/logo-cf-negativ.svg" : "/images/logo-cf-positiv.svg";

  return (
    <header className={`relative z-30 ${wrapper}`}>
      <div className="h-[70px] px-6 md:px-12 lg:px-[120px] flex items-center justify-between">
        <Link to="/" aria-label="Brunner Corporate Fashion" className="block">
          <img
            src={logoSrc}
            alt="Brunner Corporate Fashion"
            className="h-5 w-auto block"
          />
        </Link>
        <CartBadge theme={theme} />
      </div>
    </header>
  );
}
