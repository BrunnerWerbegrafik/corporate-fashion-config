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
        <div className="max-w-content mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Kategorie nicht gefunden</h1>
          <Link to="/" className="text-brunner-cyan hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper theme="light">
      <div className="max-w-content mx-auto px-6 pt-8 pb-4">
        <nav aria-label="Breadcrumb" className="text-sm text-brunner-dark/60">
          <Link to="/" className="hover:text-brunner-cyan">
            Textilarten
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brunner-dark">{type.name}</span>
        </nav>
      </div>

      <section className="max-w-content mx-auto px-6 pt-6 pb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-brunner-dark tracking-tight">
          {type.name}
        </h1>
        <p className="text-lg md:text-xl text-brunner-dark/70 mt-4 max-w-2xl">
          {type.shortDescription}
        </p>
      </section>

      <section className="max-w-content mx-auto px-6 pb-20">
        {products.length === 0 ? (
          <div className="bg-brunner-light p-10 rounded-sm text-center">
            <p className="text-brunner-dark/70 mb-6">
              In dieser Kategorie sind aktuell keine Produkte hinterlegt.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brunner-cyan hover:text-brunner-cyanDark font-semibold"
            >
              <ArrowLeftIcon size={16} /> Zurück zur Übersicht
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={() => setOpenProduct(p)} />
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
