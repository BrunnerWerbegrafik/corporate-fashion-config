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
        {/* Hauptbild: 840×600 Backdrop, PNG über volle Höhe zentriert */}
        <div className="relative aspect-[840/600] bg-white/[0.05] overflow-hidden flex items-end justify-center">
          <img
            src={mainImage}
            alt={`${product.name} – Vorderseite`}
            className="max-h-full w-auto object-contain"
          />
        </div>

        {/* Zwei Detailbilder: 460 vs 340 breit, 40px gap */}
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

        {/* Titel */}
        <h2
          className="text-[40px] leading-[1.05] m-0 text-cyan mb-6"
          style={{ fontWeight: 500 }}
        >
          {product.name}
        </h2>

        {/* Beschreibung */}
        <p className="text-[15px] leading-[1.5] text-white m-0 mb-9" style={{ fontWeight: 300 }}>
          {product.longDescription}
        </p>

        {/* Specs als Pills */}
        <div className="flex flex-wrap gap-[10px] mb-10">
          {pills.map((p) => (
            <span
              key={p}
              className="inline-flex items-center px-[14px] h-[28px] rounded-full bg-white/[0.05] text-[13px] text-white whitespace-nowrap"
              style={{ fontWeight: 300 }}
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

        {/* Menge (140×47) + CTA (360×47) mit 20px Gap */}
        <div className="flex flex-wrap items-center gap-5">
          <div className="inline-flex items-center justify-between h-[47px] w-[140px] px-5 rounded-full bg-white/[0.05]">
            <button
              type="button"
              aria-label="Weniger"
              onClick={() => onQuantity(Math.max(product.minQuantity, quantity - 1))}
              className="text-white/80 hover:text-cyan transition-colors cursor-pointer"
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
              className="text-white/80 hover:text-cyan transition-colors cursor-pointer"
            >
              <PlusIcon size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="inline-flex items-center justify-between h-[47px] w-[360px] px-10 rounded-full bg-gradient-to-r from-[rgba(0,159,227,0.8)] to-[rgba(0,90,128,0.8)] text-white text-[17px] transition-all hover:from-cyan hover:to-[#005A80] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ fontWeight: 500 }}
          >
            Veredelung auswählen
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
