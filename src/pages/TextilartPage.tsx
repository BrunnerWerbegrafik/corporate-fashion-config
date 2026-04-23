import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { ProductDetailPanel } from "../components/konfigurator/ProductDetailPanel";
import { textileTypeService } from "../services/textileTypeService";
import { productService } from "../services/productService";
import type { Product } from "../types/models";

// Pro Kategorie das passende Hero-Bild (Modell mit zugehörigem Textil) – wir nutzen
// die kategorien-neu/*.webp-Dateien, die für die Startseite hochgeladen wurden.
const heroImageMap: Record<string, string> = {
  tshirts: "/images/kategorien-neu/tshirts.webp",
  polos: "/images/kategorien-neu/polos.webp",
  hemden: "/images/kategorien-neu/hemden.webp",
  sweatshirts: "/images/kategorien-neu/sweatshirts.webp",
  outerwear: "/images/kategorien-neu/outerwear.webp",
  accessoires: "/images/kategorien-neu/accessoires.webp",
};

function ArrowRight({ className = "", size = 30 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 15h20" />
      <path d="M18 8l7 7-7 7" />
    </svg>
  );
}

export function TextilartPage() {
  const { textileTypeId } = useParams();
  const type = textileTypeId ? textileTypeService.getById(textileTypeId) : undefined;
  const products = useMemo(
    () => (textileTypeId ? productService.getByTextileType(textileTypeId) : []),
    [textileTypeId]
  );
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [textileTypeId]);

  if (!type || !textileTypeId) {
    return (
      <PageWrapper theme="light">
        <div className="px-6 md:px-12 lg:px-[120px] py-24 text-center">
          <h1 className="text-3xl font-medium mb-4">Kategorie nicht gefunden</h1>
          <Link to="/" className="text-cyan hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const heroImage = heroImageMap[textileTypeId] ?? "/images/titelbild-home.webp";

  return (
    <PageWrapper theme="light">
      {/* HERO: Breadcrumb oben + Headline/Subline links + Hero-Bild rechts (bleed) */}
      <section className="relative bg-white border-b border-hairline overflow-hidden">
        <div className="relative" style={{ minHeight: "clamp(380px, 24vw, 470px)" }}>
          {/* Hero-Bild rechts: Backdrop ~56% Breite, endet 14.9% vor der Sektionsunterkante
              (Figma: 70px weißer Raum unter dem Bild bei Sektionshöhe 470px). */}
          <div
            className="absolute top-0 right-0 z-0"
            style={{ width: "56.25%", bottom: "14.9%" }}
          >
            <div className="relative w-full h-full">
              {/* Grauer Backdrop: beginnt 17.5% von oben innerhalb der Bild-Area
                  (Figma: y=140 in 400px-hoher Bild-Area, 70/400). */}
              <div
                className="absolute inset-x-0 bg-[#f4f4f4]"
                style={{ top: "17.5%", bottom: "0" }}
              />
              {/* Modell-PNG: rechtsbündig, ragt nach oben über den Backdrop hinaus */}
              <img
                src={heroImage}
                alt={type.name}
                className="absolute right-0 top-0 h-full object-contain object-bottom"
                style={{ width: "66.67%" }}
                loading="eager"
              />
            </div>
          </div>

          {/* Breadcrumb: oben links absolut positioniert, Kategorien-Link grau, Kategorie-Name fett */}
          <nav
            aria-label="Breadcrumb"
            className="absolute z-20 left-6 md:left-12 lg:left-[120px] top-[40px] flex items-center gap-3 text-[15px] text-black leading-none"
          >
            <Link
              to="/"
              className="opacity-50 hover:opacity-100 transition-opacity"
              style={{ fontWeight: 300 }}
            >
              Kategorien
            </Link>
            <span className="opacity-50" style={{ fontWeight: 300 }}>
              /
            </span>
            <span style={{ fontWeight: 500 }}>{type.name}</span>
          </nav>

          {/* Headline + Subline: 180px Indent (60px mehr als Logo bei 120px) */}
          <div className="relative z-10 pl-6 md:pl-12 lg:pl-[180px] pt-[140px] pb-[80px] lg:pt-[155px] lg:pb-[110px]">
            <h1
              className="bg-clip-text text-transparent bg-cover bg-center bg-no-repeat font-medium leading-[1.0] tracking-tight m-0 whitespace-nowrap text-[44px] sm:text-[60px] md:text-[80px] lg:text-[88px] xl:text-[100px]"
              style={{
                fontWeight: 500,
                backgroundImage: 'url("/images/font-hintergrund/HG-abstrakt-blau.webp")',
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {type.name}
            </h1>
            <p
              className="mt-5 text-[20px] text-black leading-none"
              style={{ fontWeight: 300 }}
            >
              {type.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* PRODUKTE-Label + Grid */}
      <section className="bg-white">
        <div className="px-6 md:px-12 lg:px-[120px] pt-12 lg:pt-[40px] pb-16 lg:pb-[120px]">
          {/* Section-Label "Produkte" – 40px-Linie + 20px Gap + Avenir Light 20px */}
          <div className="flex items-center gap-5 mb-12 lg:mb-[80px]">
            <span className="block w-[40px] h-px bg-black" aria-hidden="true" />
            <span
              className="text-[20px] text-black leading-none"
              style={{ fontWeight: 300 }}
            >
              Produkte
            </span>
          </div>

          {products.length === 0 ? (
            <div className="bg-[#f4f4f4] p-10 text-center">
              <p className="text-black/60 mb-2">In dieser Kategorie sind aktuell keine Produkte hinterlegt.</p>
              <Link to="/" className="text-cyan hover:underline">
                Zur Übersicht
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[80px]">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={() => setOpenProduct(p)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {openProduct && (
        <ProductDetailPanel product={openProduct} onClose={() => setOpenProduct(null)} />
      )}
    </PageWrapper>
  );
}

interface ProductCardProps {
  product: Product;
  onOpen: () => void;
}

function ProductCard({ product, onOpen }: ProductCardProps) {
  const variant = product.colorVariants[0];
  const image = variant?.images[0] ?? product.defaultImage;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block text-left focus:outline-none w-full"
      aria-label={`${product.name} – ${product.shortDescription}`}
    >
      {/* Bildbereich (Quadrat 1:1) mit grauem Backdrop. Hover: Backdrop wächst
          nach oben (top 15.4% → 11.5%) und wird dunkler (#f4f4f4 → #d7d7d7),
          Bild skaliert 1.04, Pfeil wandert 20px nach rechts und wird cyan. */}
      <div className="relative aspect-square w-full overflow-hidden">
        <div
          className="absolute inset-x-0 bottom-0 top-[15.4%] bg-[#f4f4f4] transition-[top,background-color] duration-300 ease-out group-hover:top-[11.5%] group-hover:bg-[#d7d7d7]"
        />
        <img
          src={image}
          alt={product.name}
          className="relative w-full h-full object-cover object-bottom transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* Caption: Indent 30px links + 50px rechts (Figma: Card-Image left:120,
          Texte left:150, Pfeil-Box rechte Kante 50px vor Card-Rechtsrand). */}
      <div className="mt-[40px] pl-[30px] pr-[50px]">
        <div className="flex items-center justify-between gap-6">
          <h3
            className="bg-clip-text text-transparent bg-cover bg-center bg-no-repeat m-0 leading-none text-[24px] sm:text-[26px] lg:text-[30px]"
            style={{
              fontWeight: 500,
              backgroundImage: 'url("/images/font-hintergrund/HG-abstrakt-blau.webp")',
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {product.name}
          </h3>
          <ArrowRight
            size={30}
            className="text-black flex-shrink-0 transition-[color,transform] duration-300 ease-out group-hover:text-cyan group-hover:translate-x-5"
          />
        </div>

        <p
          className="mt-[28px] text-[15px] text-black leading-[1.4] max-w-[380px]"
          style={{ fontWeight: 300 }}
        >
          {product.shortDescription}
        </p>

        {/* Specs-Tabelle: Material / Gewicht – 80px Label-Spalte, dann Wert */}
        <dl
          className="mt-[40px] grid text-[15px] text-black leading-[1.4]"
          style={{ gridTemplateColumns: "80px 1fr", rowGap: "0px" }}
        >
          <dt style={{ fontWeight: 500 }}>Material</dt>
          <dd className="m-0" style={{ fontWeight: 300 }}>
            {product.material}
          </dd>
          <dt style={{ fontWeight: 500 }}>Gewicht</dt>
          <dd className="m-0" style={{ fontWeight: 300 }}>
            {product.weight}
          </dd>
        </dl>
      </div>
    </button>
  );
}
