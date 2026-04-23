import { Link } from "react-router-dom";

interface FooterProps {
  theme: "light" | "dark";
}

export function Footer({ theme: _theme }: FooterProps) {
  // Footer ist laut Figma-Design immer dunkel (#031a22), unabhängig von der Seiten-Welt.
  return (
    <footer className="w-full mt-auto bg-[#031a22] text-white">
      <div className="h-[110px] px-6 md:px-12 lg:px-[120px] flex items-center justify-between">
        <Link to="/" aria-label="Brunner Corporate Fashion" className="block">
          <img
            src="/images/logo-cf-negativ.svg"
            alt="Brunner Corporate Fashion"
            className="h-5 w-auto block"
          />
        </Link>
        <nav
          className="flex items-center gap-12 text-[15px] font-light"
          style={{ fontFamily: '"Avenir LT", sans-serif', fontWeight: 300 }}
        >
          <Link to="/impressum" className="hover:opacity-70 transition-opacity">
            Impressum
          </Link>
          <Link to="/datenschutz" className="hover:opacity-70 transition-opacity">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
