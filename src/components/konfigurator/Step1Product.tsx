import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../types/models";
import { ColorSwatch } from "../ui/ColorSwatch";
import { MinusIcon, PlusIcon } from "../ui/Icon";

interface Step1Props {
  product: Product;
  selectedColorId: string;
  quantity: number;
  onSelectColor: (id: string) => void;
  onQuantity: (n: number) => void;
}

const QUICK_QTY = [10, 25, 50, 100, 250];

const SPEC_ICONS = {
  fit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 8h16M4 12h16M4 16h16" />
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
  material: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3s5 5 5 9a5 5 0 0 1-10 0c0-4 5-9 5-9z" />
    </svg>
  ),
  wash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M9 12h6" />
    </svg>
  ),
};

const ECO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <path d="M20 4S9 4 6 10s0 10 0 10 7-1 11-7 3-9 3-9z" />
    <path d="M7 18c2-4 6-7 11-10" />
  </svg>
);

const VIEW_LABELS = ["Vorderseite", "Rückseite", "Detail"];

export function Step1Product({
  product,
  selectedColorId,
  quantity,
  onSelectColor,
  onQuantity,
}: Step1Props) {
  const variant = product.colorVariants.find((c) => c.id === selectedColorId) ?? product.colorVariants[0];
  const images = useMemo(() => variant?.images ?? [product.defaultImage], [variant, product]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showAllColors, setShowAllColors] = useState(false);
  const visibleColors = showAllColors ? product.colorVariants : product.colorVariants.slice(0, 8);
  const isEco = product.certifications.some((c) => /gots|bio|fair/i.test(c)) ||
    /bio/i.test(product.material);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [variant?.id]);

  const activeImage = images[activeImageIdx] ?? images[0];
  const activeViewLabel = VIEW_LABELS[activeImageIdx] ?? "Ansicht";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] min-h-0">
      {/* LEFT */}
      <div className="px-10 lg:pl-14 lg:pr-10 py-10 flex flex-col gap-6">
        <div className="relative aspect-square bg-white rounded-m overflow-hidden max-h-[420px]">
          <span className="absolute top-4 left-4 z-10 bg-dk-1/85 text-white text-[11px] px-2.5 py-1.5 rounded-s tracking-capsm uppercase">
            {activeViewLabel}
          </span>
          {isEco && (
            <span className="absolute top-4 right-4 z-10 bg-white text-ink text-[11px] px-2.5 py-1.5 rounded-s tracking-[0.06em] font-medium inline-flex items-center gap-1.5">
              {ECO_ICON}
              {product.material.toLowerCase().includes("bio") ? "Bio-Baumwolle" : "Nachhaltig"}
            </span>
          )}
          <img
            src={activeImage}
            alt={`${product.name} – ${activeViewLabel}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {images.slice(0, 3).map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActiveImageIdx(i)}
              className={`aspect-[4/3] bg-white rounded-s overflow-hidden border-2 transition-all ${
                activeImageIdx === i ? "border-cyan" : "border-transparent hover:border-white/14"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover block" />
            </button>
          ))}
        </div>

        <div>
          <h4 className="caps-label text-white mb-2.5">Beschreibung</h4>
          <p className="text-[15px] leading-[1.6] text-dk-muted m-0 mb-3.5">{product.longDescription}</p>
          <div className="pt-3.5 border-t border-dk-line flex flex-wrap gap-x-[18px] gap-y-2 text-[13px] text-dk-muted2">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5">{SPEC_ICONS.fit}</span>
              {product.fit}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5">{SPEC_ICONS.weight}</span>
              {product.weight}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5">{SPEC_ICONS.material}</span>
              {product.material}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5">{SPEC_ICONS.wash}</span>
              bis {product.washTemperature}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="border-t lg:border-t-0 lg:border-l border-dk-line bg-white/[0.012] px-10 lg:pl-10 lg:pr-14 py-10 flex flex-col gap-9">
        <section>
          <div className="flex items-baseline justify-between mb-3.5">
            <h3 className="text-base font-semibold text-white tracking-wide m-0">Farbe wählen</h3>
            <span className="text-[13px] text-dk-muted">
              Ausgewählt:<strong className="text-white font-medium ml-1.5">{variant?.name ?? "—"}</strong>
            </span>
          </div>
          <div className="grid grid-cols-6 gap-3.5 items-center">
            {visibleColors.map((c) => (
              <ColorSwatch
                key={c.id}
                color={c}
                selected={selectedColorId === c.id}
                onClick={() => onSelectColor(c.id)}
              />
            ))}
            {product.colorVariants.length > 8 && !showAllColors && (
              <button
                type="button"
                onClick={() => setShowAllColors(true)}
                className="col-span-2 h-9 px-3.5 rounded-full bg-transparent border border-cyan/50 text-cyan text-[13px] font-medium cursor-pointer transition-colors hover:bg-cyan-soft"
              >
                +{product.colorVariants.length - 8} mehr
              </button>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-3.5">
            <h3 className="text-base font-semibold text-white tracking-wide m-0">Menge</h3>
            <span className="text-[13px] text-dk-muted">
              Gesamt: <strong className="text-white font-medium ml-1.5">{quantity}</strong> Stück
            </span>
          </div>
          <p className="-mt-1.5 mb-4 text-[13px] text-dk-muted">
            Gesamtmenge — Größen klären wir gemeinsam.
          </p>
          <div className="flex items-center gap-5">
            <div className="inline-flex items-stretch border border-dk-line2 rounded-m overflow-hidden bg-white/[0.02]">
              <button
                type="button"
                aria-label="Weniger"
                onClick={() => onQuantity(Math.max(product.minQuantity, quantity - 1))}
                className="w-12 h-12 bg-transparent border-none text-white cursor-pointer text-lg transition-colors hover:bg-white/[0.06] grid place-items-center"
              >
                <MinusIcon size={16} />
              </button>
              <div className="min-w-[64px] grid place-items-center border-l border-r border-dk-line text-xl font-medium tabular-nums text-white px-2">
                {quantity}
              </div>
              <button
                type="button"
                aria-label="Mehr"
                onClick={() => onQuantity(quantity + 1)}
                className="w-12 h-12 bg-transparent border-none text-white cursor-pointer text-lg transition-colors hover:bg-white/[0.06] grid place-items-center"
              >
                <PlusIcon size={16} />
              </button>
            </div>
            <span className="text-base text-dk-muted">Stück</span>
          </div>
          <div className="flex gap-2 mt-3.5 flex-wrap">
            {QUICK_QTY.map((n) => {
              const active = n === quantity;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onQuantity(Math.max(product.minQuantity, n))}
                  className={`px-3 py-1.5 border rounded-full text-xs cursor-pointer transition-all bg-transparent ${
                    active
                      ? "border-cyan text-cyan bg-cyan-soft"
                      : "border-dk-line text-dk-muted hover:border-dk-line2 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <div className="italic text-xs text-dk-muted2 mt-2">
            Mindestabnahme: {product.minQuantity} Stück
          </div>
        </section>
      </div>
    </div>
  );
}
