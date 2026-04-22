import { Link } from "react-router-dom";

interface FooterProps {
  theme: "light" | "dark";
}

export function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";
  const wrapper = isDark
    ? "bg-dk-0 text-dk-muted border-t border-dk-line"
    : "bg-white text-muted border-t border-hairline";
  const linkHover = isDark ? "hover:text-cyan" : "hover:text-cyan";
  const strongClass = isDark ? "text-white font-medium" : "text-ink font-medium";

  return (
    <footer className={`w-full mt-auto ${wrapper}`}>
      <div className="px-6 md:px-12 lg:px-[72px] py-9 flex flex-col md:flex-row gap-6 md:gap-12 md:items-end justify-between text-[13px] leading-relaxed">
        <div>
          <strong className={`block mb-0.5 ${strongClass}`}>Brunner Werbegrafik OHG</strong>
          Lagerhausstraße 8 · 83109 Großkarolinenfeld
        </div>
        <nav className="flex flex-wrap items-center">
          <Link to="/impressum" className={`transition-colors ${linkHover}`}>
            Impressum
          </Link>
          <Dot />
          <Link to="/datenschutz" className={`transition-colors ${linkHover}`}>
            Datenschutz
          </Link>
          <Dot />
          <Link to="/agb" className={`transition-colors ${linkHover}`}>
            AGB
          </Link>
          <Dot />
          <a
            href="https://www.brunner-werbegrafik.de/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${linkHover}`}
          >
            Hauptseite
          </a>
        </nav>
      </div>
    </footer>
  );
}

function Dot() {
  return (
    <span className="inline-block w-[3px] h-[3px] rounded-full bg-current mx-2.5 align-middle opacity-55" />
  );
}
