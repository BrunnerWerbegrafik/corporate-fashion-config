import { useMemo } from "react";
import type { Product } from "../../types/models";
import { ColorSwatch } from "../ui/ColorSwatch";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "../ui/Icon";
import { qualityLevelService } from "../../services/qualityLevelService";

interface Step1Props {
  product: Product;
  selectedColorId: string;
  quantity: number;
  canProceed: boolean;
  onSelectColor: (id: string) => void;
  onQuantity: (n: number) => void;
  onNext: () => void;
}

// Glas-Pill (Mengenregler + Pills) – dunkle semi-transparente Fläche mit
// Top-Highlight, feinem Rand und weichem Außen-Schatten
const glassPill: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.09)",
  boxShadow: [
    "inset 0 1px 0 rgba(255, 255, 255, 0.10)",
    "inset 0 -1px 0 rgba(0, 0, 0, 0.20)",
    "0 4px 14px rgba(0, 0, 0, 0.25)",
  ].join(", "),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

// Primär-CTA – kräftiger Blau-Gradient mit 3D-Tiefe
const glassCta: React.CSSProperties = {
  background:
    "linear-gradient(180deg, #1AABEA 0%, #009FE3 45%, #00628F 100%)",
  border: "1px solid rgba(0, 159, 227, 0.45)",
  boxShadow: [
    "0 8px 24px rgba(0, 80, 130, 0.35)",
    "inset 0 1px 1px rgba(255, 255, 255, 0.30)",
    "inset 0 -2px 5px rgba(0, 0, 0, 0.18)",
  ].join(", "),
};

// Specs-Pills – sehr subtiles Glas
const glassSpecPill: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.045)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
};

export function Step1Product({
  product,
  selectedColorId,
  quantity,
  canProceed,
  onSelectColor,
  onQuantity,
  onNext,
}: Step1Props) {
  const variant = product.colorVariants.find((c) => c.id === selectedColorId) ?? product.colorVariants[0];
  const images = useMemo(() => variant?.images ?? [product.defaultImage], [variant, product]);
  const qualityLevel = qualityLevelService.getById(product.qualityLevelId);

  const sizes = product.availableSizes;
  const sizeRange = sizes.length > 1
    ? `${sizes[0]} - ${sizes[sizes.length - 1]}`
    : sizes[0] ?? "";

  const pills = [
    "Unisex",
    product.weight,
    sizeRange,
    product.fit,
    product.material,
    `bis ${product.washTemperature}`,
  ].filter(Boolean) as string[];

  const mainImage = images[0];
  const smallImages = [images[1], images[2]].filter(Boolean) as string[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[840fr_520fr] gap-10 lg:gap-x-[80px] lg:gap-y-10 pt-[80px] pb-[80px] max-w-[1440px]">
      {/* LINKS: Bilder */}
      <div className="flex flex-col gap-10">
        <div className="relative aspect-[840/600] bg-white/[0.05] overflow-hidden flex items-end justify-center">
          <img
            src={mainImage}
            alt={`${product.name} – Vorderseite`}
            className="max-h-full w-auto object-contain"
          />
        </div>

        {smallImages.length > 0 && (
          <div className="grid gap-10" style={{ gridTemplateColumns: "460fr 340fr" }}>
            {smallImages.map((img, i) => (
              <div
                key={img + i}
                className="relative aspect-square bg-white/[0.05] overflow-hidden flex items-end justify-center"
              >
                <img
                  src={img}
                  alt={`${product.name} – ${i === 0 ? "Rückseite" : "Detail"}`}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECHTS: Produkt-Info */}
      <div className="flex flex-col pt-10 max-w-[640px]">
        {/* Eyebrow mit Cyan-Linie */}
        {qualityLevel && (
          <div className="flex items-center gap-3 text-[15px] text-white mb-3" style={{ fontWeight: 300 }}>
            <span>{qualityLevel.name} Collection</span>
            <span className="h-px w-[30px] bg-cyan" aria-hidden="true" />
          </div>
        )}

        {/* Titel mit HG-abstrakt-blau als Text-Fill (bg-clip-text) */}
        <h2
          className="text-[40px] leading-[1.05] m-0 mb-6 bg-clip-text bg-cover bg-center"
          style={{
            fontWeight: 500,
            backgroundImage: 'url("/images/font-hintergrund/HG-abstrakt-blau.webp")',
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {product.name}
        </h2>

        {/* Beschreibung */}
        <p className="text-[15px] leading-[1.5] text-white m-0 mb-9" style={{ fontWeight: 300 }}>
          {product.longDescription}
        </p>

        {/* Specs als Glas-Pills */}
        <div className="flex flex-wrap gap-[10px] mb-10">
          {pills.map((p) => (
            <span
              key={p}
              className="inline-flex items-center px-[14px] h-[28px] rounded-full text-[13px] text-white whitespace-nowrap"
              style={{ ...glassSpecPill, fontWeight: 300 }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Farbwahl */}
        <div className="flex flex-col gap-5 mb-[60px]">
          <div className="text-[15px] text-white">
            <span style={{ fontWeight: 500 }}>Farbe:</span>{" "}
            <span style={{ fontWeight: 300 }}>{variant?.name ?? "—"}</span>
          </div>
          <div className="flex flex-wrap gap-[10px] items-center">
            {product.colorVariants.map((c) => (
              <ColorSwatch
                key={c.id}
                color={c}
                selected={selectedColorId === c.id}
                onClick={() => onSelectColor(c.id)}
              />
            ))}
          </div>
        </div>

        {/* Menge + CTA als Glas-Elemente */}
        <div className="flex flex-wrap items-center gap-5">
          <div
            className="inline-flex items-center justify-between h-[47px] w-[140px] px-5 rounded-full"
            style={glassPill}
          >
            <button
              type="button"
              aria-label="Weniger"
              onClick={() => onQuantity(Math.max(product.minQuantity, quantity - 1))}
              className="text-white/85 hover:text-cyan transition-colors cursor-pointer"
            >
              <MinusIcon size={18} />
            </button>
            <span className="text-[17px] tabular-nums text-white" style={{ fontWeight: 300 }}>
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Mehr"
              onClick={() => onQuantity(quantity + 1)}
              className="text-white/85 hover:text-cyan transition-colors cursor-pointer"
            >
              <PlusIcon size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="inline-flex items-center justify-between h-[47px] w-[360px] px-10 rounded-full text-white text-[17px] transition-[filter,transform] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ ...glassCta, fontWeight: 500 }}
          >
            Veredelung auswählen
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
