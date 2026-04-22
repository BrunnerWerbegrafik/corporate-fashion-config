import { Link } from "react-router-dom";

interface TileCardProps {
  to: string;
  index: number;
  image: string;
  title: string;
  subline: string;
  ctaLabel?: string;
}

export function TileCard({ to, index, image, title, subline, ctaLabel }: TileCardProps) {
  const indexLabel = String(index).padStart(2, "0");
  const cta = ctaLabel ?? `${title} entdecken`;

  return (
    <Link
      to={to}
      className="group flex flex-col bg-white border border-hairline rounded-m overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-30px_rgba(10,22,40,0.35)] hover:border-[#D8DCE2]"
    >
      <div className="relative aspect-[4/3] bg-well overflow-hidden">
        <span className="absolute top-4 left-4 text-[11px] font-medium tracking-[0.14em] text-ink-2 bg-white/90 px-2.5 py-1.5 rounded-s backdrop-blur-sm">
          {indexLabel}
        </span>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="px-[22px] pt-[22px] pb-6 flex flex-col gap-2.5">
        <h3 className="text-[24px] font-medium tracking-[-0.01em] text-ink m-0 leading-tight">
          {title}
        </h3>
        <p className="text-sm leading-[1.5] text-muted m-0 min-h-[42px]">{subline}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-cyan transition-colors">
          {cta}
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
    </Link>
  );
}
