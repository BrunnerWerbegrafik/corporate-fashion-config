import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { ProductCard } from "../components/ui/ProductCard";
import { ProductDetailPanel } from "../components/konfigurator/ProductDetailPanel";
import { textileTypeService } from "../services/textileTypeService";
import { productService } from "../services/productService";
import type { Product } from "../types/models";
import { Button } from "../components/ui/Button";
import { ArrowLeftIcon } from "../components/ui/Icon";

export function TextilartPage() {
  const { textileTypeId } = useParams();
  const type = textileTypeId ? textileTypeService.getById(textileTypeId) : undefined;
  const products = useMemo(
    () => (textileTypeId ? productService.getByTextileType(textileTypeId) : []),
    [textileTypeId]
  );
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  if (!type) {
    return (
      <PageWrapper theme="light">
        <div className="px-6 md:px-12 lg:px-[72px] py-24 text-center">
          <h1 className="text-3xl font-medium mb-4">Kategorie nicht gefunden</h1>
          <Link to="/" className="text-cyan hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper theme="light">
      <header className="px-6 md:px-12 lg:px-[72px] pt-12 md:pt-16 pb-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted mb-6">
          <Link to="/" className="hover:text-cyan">
            Sortiment
          </Link>
          <span className="mx-2 text-muted-2">›</span>
          <span className="text-ink">{type.name}</span>
        </nav>
        <div className="caps-eyebrow text-muted mb-5 inline-flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          Schritt 2 · Produkt wählen
        </div>
        <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-medium leading-[1.0] tracking-tightest text-ink m-0">
          {type.name}
        </h1>
        <p className="text-base md:text-lg text-muted mt-4 max-w-2xl">
          {type.shortDescription}
        </p>
      </header>

      <section className="px-6 md:px-12 lg:px-[72px] pb-24">
        {products.length === 0 ? (
          <div className="bg-well p-10 rounded-m text-center">
            <p className="text-muted mb-6">In dieser Kategorie sind aktuell keine Produkte hinterlegt.</p>
            <Link to="/" className="inline-flex items-center gap-2 text-cyan font-medium">
              <ArrowLeftIcon size={16} /> Zurück zur Übersicht
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, idx) => (
              <ProductCard key={p.id} product={p} onOpen={() => setOpenProduct(p)} index={idx + 1} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link to="/">
            <Button variant="ghost-light" size="md">
              <ArrowLeftIcon size={16} /> Andere Kategorie wählen
            </Button>
          </Link>
        </div>
      </section>

      {openProduct && (
        <ProductDetailPanel product={openProduct} onClose={() => setOpenProduct(null)} />
      )}
    </PageWrapper>
  );
}
