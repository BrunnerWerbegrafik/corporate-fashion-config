import { Link } from "react-router-dom";

interface FooterProps {
  theme: "light" | "dark";
}

export function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";
  const wrapper = isDark
    ? "bg-brunner-dark text-white/70 border-t border-white/10"
    : "bg-white text-brunner-dark/70 border-t border-brunner-light";
  const linkHover = isDark ? "hover:text-brunner-cyanSoft" : "hover:text-brunner-cyan";

  return (
    <footer className={`w-full mt-auto ${wrapper}`}>
      <div className="max-w-content mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 md:items-center justify-between text-sm">
        <div className="leading-relaxed">
          Brunner Werbegrafik OHG · Beispielstraße 12 · 12345 Musterstadt ·
          <a href="mailto:info@brunner-werbegrafik.de" className={`ml-1 underline-offset-4 hover:underline ${linkHover}`}>
            info@brunner-werbegrafik.de
          </a>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link to="/impressum" className={`transition-colors ${linkHover}`}>
            Impressum
          </Link>
          <Link to="/datenschutz" className={`transition-colors ${linkHover}`}>
            Datenschutz
          </Link>
          <Link to="/agb" className={`transition-colors ${linkHover}`}>
            AGB
          </Link>
          <a
            href="https://www.brunner-werbegrafik.de/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${linkHover}`}
          >
            Hauptseite ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
