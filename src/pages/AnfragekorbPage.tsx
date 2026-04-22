import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { CartItem } from "../components/cart/CartItem";
import { CartSidebar } from "../components/cart/CartSidebar";
import { useCart } from "../contexts/CartContext";
import { useLogoFile } from "../contexts/LogoFileContext";
import { Button } from "../components/ui/Button";
import { ArrowLeftIcon } from "../components/ui/Icon";

export function AnfragekorbPage() {
  const { entries } = useCart();
  const { logoFile, setLogoFile } = useLogoFile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <PageWrapper theme="dark">
      <header className="px-6 md:px-12 lg:px-[72px] pt-12 md:pt-16 pb-8 relative">
        <div className="cyan-glow" aria-hidden="true" />
        <div className="caps-eyebrow text-dk-muted mb-5 inline-flex items-center gap-2.5 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          Anfragekorb
        </div>
        <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-medium leading-[1.0] tracking-tightest text-white m-0 relative z-10">
          Dein <em className="text-cyan">Korb</em>
        </h1>
        <p className="text-base md:text-lg text-dk-muted mt-4 max-w-2xl relative z-10">
          Prüfe deine konfigurierten Artikel. Lade optional dein Logo hoch und sende die Anfrage ab – wir melden uns mit einem individuellen Angebot.
        </p>
      </header>

      <section className="px-6 md:px-12 lg:px-[72px] pb-24 relative z-10">
        {entries.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.03] border border-dk-line rounded-m">
            <p className="text-dk-muted mb-6">Dein Anfragekorb ist leer.</p>
            <Link to="/">
              <Button variant="primary" size="md">
                <ArrowLeftIcon size={16} /> Zur Produktauswahl
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="space-y-4">
              {entries.map((e) => (
                <CartItem key={e.id} entry={e} />
              ))}
              <div className="pt-2">
                <Link to="/">
                  <Button variant="outline-dark" size="md">
                    <ArrowLeftIcon size={16} /> Weitere Artikel hinzufügen
                  </Button>
                </Link>
              </div>
            </div>
            <CartSidebar logoFile={logoFile} onLogoChange={setLogoFile} />
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
