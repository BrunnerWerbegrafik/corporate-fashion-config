import { Link } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";

interface CategoryTile {
  id: string;
  index: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

const categories: CategoryTile[] = [
  {
    id: "tshirts",
    index: "01",
    name: "T-Shirts",
    description: "Der Klassiker für Team und Auftritt.",
    image: "/images/kategorien-neu/tshirts.png",
    href: "/textilart/tshirts",
  },
  {
    id: "polos",
    index: "02",
    name: "Polos",
    description: "Edler Auftritt für Service und Vertrieb.",
    image: "/images/kategorien-neu/polos.png",
    href: "/textilart/polos",
  },
  {
    id: "hemden",
    index: "03",
    name: "Hemden",
    description: "Klassisch, repräsentativ, gepflegt.",
    image: "/images/kategorien-neu/hemden.png",
    href: "/textilart/hemden",
  },
  {
    id: "sweatshirts",
    index: "04",
    name: "Sweatshirts",
    description: "Bequem und lässig – inkl. Hoodies.",
    image: "/images/kategorien-neu/sweatshirts.png",
    href: "/textilart/sweatshirts",
  },
  {
    id: "outerwear",
    index: "05",
    name: "Outerwear",
    description: "Jacken und Westen für jedes Wetter.",
    image: "/images/kategorien-neu/outerwear.png",
    href: "/textilart/outerwear",
  },
  {
    id: "accessoires",
    index: "06",
    name: "Accessoires",
    description: "Caps, Mützen, Handtücher und mehr.",
    image: "/images/kategorien-neu/accessoires.png",
    href: "/textilart/accessoires",
  },
];

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

export function StartseitePage() {
  return (
    <PageWrapper theme="light">
      {/* HERO – linke Headline-Spalte mit 180px Indent, rechte Bild-Spalte bleedet zur Browser-Kante */}
      <section className="relative bg-white border-b border-hairline overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[660fr_1080fr] items-stretch min-h-[420px] lg:min-h-[480px]">
          {/* Headline links */}
          <div className="px-6 md:px-12 lg:pl-[180px] lg:pr-12 py-16 lg:py-0 flex flex-col justify-center">
            <h1
              className="text-cyan font-medium leading-[1.0] tracking-tight m-0 text-[44px] sm:text-[60px] md:text-[80px] lg:text-[88px] xl:text-[100px]"
              style={{
                fontFamily: '"Avenir LT", sans-serif',
                fontWeight: 500,
              }}
            >
              Corporate Fashion.
            </h1>
            <div className="mt-3 flex items-center gap-6">
              <p
                className="text-black m-0 text-[24px] sm:text-[32px] md:text-[42px] lg:text-[46px] xl:text-[50px]"
                style={{
                  fontFamily: '"Avenir LT", sans-serif',
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                Made easy.
              </p>
              <ArrowRight size={40} className="text-black" />
            </div>
          </div>

          {/* Hero-Bild rechts mit grauem Backdrop – läuft bis zur Browser-Kante */}
          <div className="relative">
            <div className="relative w-full" style={{ aspectRatio: "1080 / 480" }}>
              {/* Grauer Backdrop: volle Spalten-Breite, beginnt bei 14.6% von oben */}
              <div
                className="absolute inset-x-0 bg-[#f4f4f4]"
                style={{ top: "14.6%", bottom: "0" }}
              />
              {/* Bild: 720/1080 = 66.67% breit, rechtsbündig, volle Höhe */}
              <img
                src="/images/titelbild-home.png"
                alt="Corporate Fashion – Beispielmotiv"
                className="absolute right-0 top-0 h-full object-contain object-bottom"
                style={{ width: "66.67%" }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORIE-GRID 3×2 */}
      <section className="bg-white">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-16 lg:py-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[80px]">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

function CategoryCard({ category }: { category: CategoryTile }) {
  return (
    <Link
      to={category.href}
      className="group block focus:outline-none"
      aria-label={`${category.name} – ${category.description}`}
    >
      {/* Bildbereich mit grauem Backdrop – wächst nach oben + dunkler beim Hover */}
      <div className="relative aspect-[520/390] w-full">
        <div
          className="absolute inset-x-0 bottom-0 top-[20.5%] bg-[#f4f4f4] transition-[top,background-color] duration-300 ease-out group-hover:top-[15.4%] group-hover:bg-[#d7d7d7]"
        />
        <img
          src={category.image}
          alt={category.name}
          className="relative w-full h-full object-contain object-bottom transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* Caption */}
      <div className="mt-7 flex items-start justify-between gap-6 pl-[30px] pr-[30px]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[15px] text-black"
              style={{ fontFamily: '"Avenir LT", sans-serif', fontWeight: 300 }}
            >
              {category.index}
            </span>
            <span className="block w-[30px] h-px bg-black" aria-hidden="true" />
          </div>
          <h3
            className="text-cyan m-0 leading-none"
            style={{
              fontFamily: '"Avenir LT", sans-serif',
              fontWeight: 500,
              fontSize: "clamp(28px, 2.6vw, 40px)",
            }}
          >
            {category.name}
          </h3>
          <p
            className="mt-5 text-black"
            style={{
              fontFamily: '"Avenir LT", sans-serif',
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.4,
            }}
          >
            {category.description}
          </p>
        </div>
        <ArrowRight
          size={30}
          className="text-black mt-[14px] flex-shrink-0 transition-[color,transform] duration-300 ease-out group-hover:text-cyan group-hover:translate-x-2"
        />
      </div>
    </Link>
  );
}
