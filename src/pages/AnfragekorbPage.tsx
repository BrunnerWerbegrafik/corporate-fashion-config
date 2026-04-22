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
      <section className="max-w-content mx-auto px-6 pt-12 md:pt-16 pb-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Dein <em className="text-brunner-cyan">Anfragekorb</em>
        </h1>
        <p className="text-white/70 mt-3 max-w-2xl">
          Prüfe deine konfigurierten Artikel. Lade optional dein Logo hoch und sende die Anfrage ab – wir melden uns mit einem individuellen Angebot.
        </p>
      </section>

      <section className="max-w-content mx-auto px-6 pb-20">
        {entries.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-sm">
            <p className="text-white/70 mb-6">Dein Anfragekorb ist leer.</p>
            <Link to="/">
              <Button variant="primary" size="md">
                <ArrowLeftIcon size={16} /> Zur Produktauswahl
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
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
