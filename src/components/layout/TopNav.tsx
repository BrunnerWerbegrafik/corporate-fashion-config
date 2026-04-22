import { Link } from "react-router-dom";
import { CartBadge } from "./CartBadge";

interface TopNavProps {
  theme: "light" | "dark";
}

export function TopNav({ theme }: TopNavProps) {
  const isDark = theme === "dark";
  const wrapperClass = isDark
    ? "bg-brunner-dark text-white border-b border-white/10"
    : "bg-white text-brunner-dark border-b border-brunner-light";

  return (
    <header className={`w-full ${wrapperClass}`}>
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Zur Startseite"
          className="flex items-center gap-3"
        >
          <img
            src="/images/logo-brunner.svg"
            alt="Brunner Werbegrafik"
            className={`h-9 w-auto ${isDark ? "brightness-0 invert" : ""}`}
          />
          <span className="hidden sm:inline-block text-xs caps-label opacity-70">
            Corporate Fashion
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <a
            href="https://www.brunner-werbegrafik.de/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline-block text-sm transition-colors ${isDark ? "text-white/70 hover:text-brunner-cyanSoft" : "text-brunner-dark/70 hover:text-brunner-cyan"}`}
          >
            brunner-werbegrafik.de ↗
          </a>
          <CartBadge theme={theme} />
        </nav>
      </div>
    </header>
  );
}
