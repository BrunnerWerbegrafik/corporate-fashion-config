import { Link, NavLink, useLocation } from "react-router-dom";
import { CartBadge } from "./CartBadge";

interface TopNavProps {
  theme: "light" | "dark";
}

const navItems = [
  { label: "Sortiment", to: "/" },
  { label: "Veredelungen", to: "/#veredelungen" },
  { label: "Ablauf", to: "/#ablauf" },
  { label: "Kontakt", to: "/anfrage" },
];

export function TopNav({ theme }: TopNavProps) {
  const isDark = theme === "dark";
  const location = useLocation();
  const wrapper = isDark
    ? "bg-dk-1 text-white border-b border-dk-line"
    : "bg-white text-ink border-b border-hairline";

  return (
    <header className={`relative z-30 ${wrapper}`}>
      <div className="h-[72px] px-6 md:px-12 lg:px-[72px] flex items-center justify-between">
        <Link to="/" aria-label="Brunner Werbegrafik" className="block">
          <img
            src="/images/logo-brunner.svg"
            alt="Brunner | Werbegrafik"
            className={`h-[22px] w-auto block ${isDark ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <div className="flex items-center gap-7">
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive =
                (item.to === "/" && location.pathname === "/") ||
                (item.to !== "/" && location.pathname.startsWith(item.to.replace(/#.*/, "")));
              const baseClass = "text-sm tracking-wide transition-colors";
              const colorClass = isDark
                ? isActive
                  ? "text-white font-medium"
                  : "text-white/70 hover:text-cyan"
                : isActive
                ? "text-ink font-medium"
                : "text-ink-2 hover:text-cyan";
              if (item.to.includes("#")) {
                return (
                  <NavLink key={item.label} to={item.to} className={`${baseClass} ${colorClass}`}>
                    {item.label}
                  </NavLink>
                );
              }
              return (
                <NavLink key={item.label} to={item.to} className={`${baseClass} ${colorClass}`}>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <CartBadge theme={theme} />
        </div>
      </div>
    </header>
  );
}
