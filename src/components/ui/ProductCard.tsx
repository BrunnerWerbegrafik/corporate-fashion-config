import type { Product } from "../../types/models";

interface ProductCardProps {
  product: Product;
  onOpen: () => void;
  index: number;
}

export function ProductCard({ product, onOpen, index }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left bg-white rounded-m overflow-hidden border border-hairline hover:border-[#D8DCE2] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-30px_rgba(10,22,40,0.35)] flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-well">
        <span className="absolute top-4 left-4 text-[11px] font-medium tracking-[0.14em] text-ink-2 bg-white/90 px-2.5 py-1.5 rounded-s backdrop-blur-sm">
          {String(index).padStart(2, "0")}
        </span>
        <img
          src={product.defaultImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-medium tracking-tight text-ink">{product.name}</h3>
        <p className="text-muted text-sm leading-snug mt-1 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="text-xs text-muted-2 space-y-1 mb-4">
          <div>
            <span className="font-medium text-ink-2">Material:</span> {product.material}
          </div>
          <div>
            <span className="font-medium text-ink-2">Gewicht:</span> {product.weight} ·{" "}
            <span className="font-medium text-ink-2">Min.:</span> {product.minQuantity} Stück
          </div>
          <div>
            <span className="font-medium text-ink-2">Farben:</span> {product.colorVariants.length}
          </div>
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-cyan transition-colors">
          Details ansehen
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </button>
  );
}
