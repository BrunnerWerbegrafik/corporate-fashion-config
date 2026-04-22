import { useState } from "react";
import { Link } from "react-router-dom";
import type { CartEntry } from "../../types/models";
import { productService } from "../../services/productService";
import { positionService } from "../../services/positionService";
import { useCart } from "../../contexts/CartContext";
import { QuantityInput } from "../ui/QuantityInput";
import { ChevronDownIcon, ChevronUpIcon, TrashIcon, EditIcon } from "../ui/Icon";

interface CartItemProps {
  entry: CartEntry;
}

export function CartItem({ entry }: CartItemProps) {
  const { updateEntry, removeEntry } = useCart();
  const [expanded, setExpanded] = useState(false);
  const product = productService.getById(entry.productId);
  if (!product) return null;
  const variant = product.colorVariants.find((c) => c.id === entry.colorVariantId);
  const positions = entry.positions
    .map((id) => positionService.getById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
      <div className="p-4 md:p-5 flex flex-col md:flex-row gap-4 items-start">
        <img
          src={variant?.images[0] ?? product.defaultImage}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-sm flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          <p className="text-sm text-white/60 mt-1">
            {variant?.name ?? "—"} ·{" "}
            {entry.finishingType === "druck" ? "Druck" : "Stick"} ·{" "}
            {positions.length} {positions.length === 1 ? "Position" : "Positionen"}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <QuantityInput
              value={entry.quantity}
              min={product.minQuantity}
              onChange={(n) => updateEntry(entry.id, { quantity: n })}
              theme="dark"
              size="sm"
            />
            <Link
              to={`/textilart/${product.textileTypeId}`}
              className="inline-flex items-center gap-1 text-brunner-cyan hover:text-brunner-cyanSoft text-sm"
            >
              <EditIcon size={14} /> Bearbeiten
            </Link>
            <button
              type="button"
              onClick={() => removeEntry(entry.id)}
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm"
            >
              <TrashIcon size={14} /> Entfernen
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Details einklappen" : "Details ausklappen"}
          className="p-2 rounded-sm text-white/60 hover:text-white hover:bg-white/10"
        >
          {expanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-white/10 px-4 md:px-5 py-4 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="caps-label text-white/40 mb-1">Farbe</p>
            <div className="flex items-center gap-2">
              {variant && (
                <span
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: variant.colorHex }}
                />
              )}
              <span>{variant?.name ?? "—"}</span>
            </div>
          </div>
          <div>
            <p className="caps-label text-white/40 mb-1">Veredelung</p>
            <p className="capitalize">{entry.finishingType}</p>
          </div>
          <div className="md:col-span-2">
            <p className="caps-label text-white/40 mb-1">Positionen</p>
            <div className="flex flex-wrap gap-2">
              {positions.map((p) => (
                <span
                  key={p.id}
                  className="px-2.5 py-1 bg-brunner-cyan/15 border border-brunner-cyan/30 rounded-full text-xs"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
          {entry.positionNote && (
            <div className="md:col-span-2">
              <p className="caps-label text-white/40 mb-1">Position-Notiz</p>
              <p className="italic text-white/70">„{entry.positionNote}"</p>
            </div>
          )}
          {entry.finalNote && (
            <div className="md:col-span-2">
              <p className="caps-label text-white/40 mb-1">Abschluss-Notiz</p>
              <p className="italic text-white/70">„{entry.finalNote}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
