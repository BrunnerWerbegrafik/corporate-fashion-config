import { ArrowRightIcon } from "./Icon";
import type { Product } from "../../types/models";

interface ProductCardProps {
  product: Product;
  onOpen: () => void;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left bg-white rounded-sm overflow-hidden border border-brunner-light hover:border-brunner-cyan transition-colors shadow-sm hover:shadow-md flex flex-col"
    >
      <div className="aspect-[4/5] overflow-hidden bg-brunner-light">
        <img
          src={product.defaultImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-brunner-dark">{product.name}</h3>
        <p className="text-brunner-dark/70 text-sm mt-1 mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="text-xs text-brunner-dark/60 space-y-1 mb-4">
          <div>
            <span className="font-semibold text-brunner-dark/80">Material:</span> {product.material}
          </div>
          <div>
            <span className="font-semibold text-brunner-dark/80">Gewicht:</span> {product.weight}
          </div>
          <div>
            <span className="font-semibold text-brunner-dark/80">Farben:</span> {product.colorVariants.length} ·{" "}
            <span className="font-semibold text-brunner-dark/80">Min.:</span> {product.minQuantity} Stück
          </div>
        </div>
        <span className="mt-auto inline-flex items-center gap-2 text-brunner-cyan font-semibold">
          Details ansehen <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}
