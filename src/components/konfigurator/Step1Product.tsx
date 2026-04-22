import { useMemo, useState } from "react";
import type { Product } from "../../types/models";
import { ColorSwatch } from "../ui/ColorSwatch";
import { QuantityInput } from "../ui/QuantityInput";

interface Step1Props {
  product: Product;
  selectedColorId: string;
  quantity: number;
  onSelectColor: (id: string) => void;
  onQuantity: (n: number) => void;
}

export function Step1Product({
  product,
  selectedColorId,
  quantity,
  onSelectColor,
  onQuantity,
}: Step1Props) {
  const variant = product.colorVariants.find((c) => c.id === selectedColorId) ?? product.colorVariants[0];
  const images = useMemo(() => variant?.images ?? [product.defaultImage], [variant, product]);
  const [activeImage, setActiveImage] = useState(images[0]);
  const [showAllColors, setShowAllColors] = useState(false);

  const visibleColors = showAllColors ? product.colorVariants : product.colorVariants.slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <div className="aspect-square bg-white/5 rounded-sm overflow-hidden border border-white/10">
          <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {images.map((img) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`aspect-square overflow-hidden rounded-sm border transition-colors ${
                activeImage === img ? "border-brunner-cyan" : "border-white/15 hover:border-white/40"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h2>
        <p className="text-white/70 mb-6 leading-relaxed">{product.longDescription}</p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm border-y border-white/10 py-5 mb-8">
          <div>
            <dt className="text-white/50 text-xs caps-label">Material</dt>
            <dd className="text-white">{product.material}</dd>
          </div>
          <div>
            <dt className="text-white/50 text-xs caps-label">Gewicht</dt>
            <dd className="text-white">{product.weight}</dd>
          </div>
          <div>
            <dt className="text-white/50 text-xs caps-label">Schnitt</dt>
            <dd className="text-white">{product.fit}</dd>
          </div>
          <div>
            <dt className="text-white/50 text-xs caps-label">Wäsche</dt>
            <dd className="text-white">{product.washTemperature}</dd>
          </div>
          {product.certifications.length > 0 && (
            <div className="col-span-2">
              <dt className="text-white/50 text-xs caps-label">Zertifikate</dt>
              <dd className="text-white">{product.certifications.join(" · ")}</dd>
            </div>
          )}
        </dl>

        <div className="mb-8">
          <h3 className="caps-label text-white/60 mb-3">Farbe wählen</h3>
          <div className="flex items-center gap-3 flex-wrap">
            {visibleColors.map((c) => (
              <ColorSwatch
                key={c.id}
                color={c}
                selected={selectedColorId === c.id}
                onClick={() => onSelectColor(c.id)}
              />
            ))}
            {product.colorVariants.length > 4 && !showAllColors && (
              <button
                type="button"
                onClick={() => setShowAllColors(true)}
                className="px-3 h-9 rounded-full border border-white/20 text-white/80 text-sm hover:bg-white/10"
              >
                +{product.colorVariants.length - 4} mehr
              </button>
            )}
          </div>
          <p className="text-white/60 text-sm mt-2">
            {variant?.name ?? ""}
          </p>
        </div>

        <div>
          <h3 className="caps-label text-white/60 mb-3">Menge</h3>
          <div className="flex items-end gap-4">
            <QuantityInput
              value={quantity}
              min={product.minQuantity}
              onChange={onQuantity}
              theme="dark"
            />
            <p className="text-white/60 text-sm pb-2.5">
              Mindestmenge: {product.minQuantity} Stück
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
