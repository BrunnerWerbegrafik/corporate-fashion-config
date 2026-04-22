import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./Icon";

interface TileCardProps {
  to: string;
  image: string;
  title: string;
  subline: string;
  ctaLabel?: string;
}

export function TileCard({ to, image, title, subline, ctaLabel = "Kategorie entdecken" }: TileCardProps) {
  return (
    <Link
      to={to}
      className="group block bg-white rounded-sm overflow-hidden border border-brunner-light hover:border-brunner-cyan transition-colors shadow-sm hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-brunner-light">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl md:text-3xl font-bold text-brunner-dark mb-2">{title}</h3>
        <p className="text-brunner-dark/70 mb-4">{subline}</p>
        <span className="inline-flex items-center gap-2 text-brunner-cyan font-semibold">
          {ctaLabel} <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
