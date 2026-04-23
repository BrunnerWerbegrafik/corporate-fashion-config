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
    image: "/images/kategorien-neu/tshirts.webp",
    href: "/textilart/tshirts",
  },
  {
    id: "polos",
    index: "02",
    name: "Polos",
    description: "Edler Auftritt für Service und Vertrieb.",
    image: "/images/kategorien-neu/polos.webp",
    href: "/textilart/polos",
  },
  {
    id: "hemden",
    index: "03",
    name: "Hemden",
    description: "Klassisch, repräsentativ, gepflegt.",
    image: "/images/kategorien-neu/hemden.webp",
    href: "/textilart/hemden",
  },
  {
    id: "sweatshirts",
    index: "04",
    name: "Sweatshirts",
    description: "Bequem und lässig – inkl. Hoodies.",
    image: "/images/kategorien-neu/sweatshirts.webp",
    href: "/textilart/sweatshirts",
  },
  {
    id: "outerwear",
    index: "05",
    name: "Outerwear",
    description: "Jacken und Westen für jedes Wetter.",
    image: "/images/kategorien-neu/outerwear.webp",
    href: "/textilart/outerwear",
  },
  {
    id: "accessoires",
    index: "06",
    name: "Accessoires",
    description: "Caps, Mützen, Handtücher und mehr.",
    image: "/images/kategorien-neu/accessoires.webp",
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
      {/* HERO – Headline freifließend, Bild absolut rechts dahinter */}
      <section className="relative bg-white border-b border-hairline overflow-hidden">
        <div className="relative" style={{ minHeight: "clamp(360px, 30vw, 540px)" }}>
          {/* Hero-Bild rechts: grauer Backdrop ~56% Breite + PNG mit Modell.
              Endet 12.73% vor der Sektionsunterkante (Figma: 70px weißer Raum
              zwischen Backdrop-Unterkante und unterer Hairline). */}
          <div
            className="absolute top-0 right-0 z-0"
            style={{ width: "56.25%", bottom: "12.73%" }}
          >
            <div className="relative w-full h-full">
              {/* Grauer Backdrop: beginnt 14.58% von oben innerhalb der Bild-Area
                  (Figma: y=140 in einer 480px-hohen Bild-Area). */}
              <div
                className="absolute inset-x-0 bg-[#f4f4f4]"
                style={{ top: "14.58%", bottom: "0" }}
              />
              {/* Modell-PNG: rechtsbündig, ragt nach oben über den Backdrop hinaus,
                  Unterkante bündig mit Backdrop-Unterkante. */}
              <img
                src="/images/titelbild-home.webp"
                alt="Corporate Fashion – Beispielmotiv"
                className="absolute right-0 top-0 h-full object-contain object-bottom"
                style={{ width: "66.67%" }}
                loading="eager"
              />
            </div>
          </div>

          {/* Headline-Block vorne, links – Indent 180px ab lg (= 60px mehr als Logo bei 120px,
              entspricht Figma: Logo left:120, Headline left:180). Dadurch endet "Fashion."
              knapp vor dem grauen Backdrop, statt hineinzuragen. */}
          <div className="relative z-10 pl-6 md:pl-12 lg:pl-[180px] pt-16 pb-16 lg:pt-[150px] lg:pb-[100px] xl:pt-[170px] xl:pb-[120px]">
            <h1
              className="bg-clip-text text-transparent bg-cover bg-center bg-no-repeat font-medium leading-[1.0] tracking-tight m-0 whitespace-nowrap text-[44px] sm:text-[60px] md:text-[80px] lg:text-[88px] xl:text-[100px]"
              style={{
                fontWeight: 500,
                backgroundImage: 'url("/images/font-hintergrund/HG-abstrakt-blau.webp")',
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Corporate Fashion.
            </h1>
            <div className="mt-3 flex items-center gap-6">
              <p
                className="text-black m-0 whitespace-nowrap text-[24px] sm:text-[32px] md:text-[42px] lg:text-[46px] xl:text-[50px]"
                style={{ fontWeight: 300, lineHeight: 1 }}
              >
                Made easy.
              </p>
              <ArrowRight size={40} className="text-black" />
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORIE-GRID 3×2 mit "Kategorien"-Label oben */}
      <section className="bg-white">
        <div className="px-6 md:px-12 lg:px-[120px] pt-12 lg:pt-[40px] pb-16 lg:pb-[120px]">
          {/* Section-Label "Kategorien": 40px-Linie + 20px Gap + Text in Avenir Light 20px,
              entspricht Figma: Linie bei x=120 width:40, Text bei x=180 y=660. */}
          <div className="flex items-center gap-5 mb-12 lg:mb-[80px]">
            <span className="block w-[40px] h-px bg-black" aria-hidden="true" />
            <span className="text-[20px] text-black leading-none" style={{ fontWeight: 300 }}>
              Kategorien
            </span>
          </div>
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

      {/* Caption: Nummer + Linie, dann Titel + Pfeil in einer Zeile, dann Beschreibung.
          Indent 30px links + 50px rechts laut Figma (Bild left:120, "01"/Titel left:150,
          Pfeil-Box endet 50px vor Bild-Rechtskante). */}
      <div className="mt-7 pl-[30px] pr-[50px]">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[15px] text-black" style={{ fontWeight: 300 }}>
            {category.index}
          </span>
          <span className="block w-[30px] h-px bg-black" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-between gap-6">
          <h3
            className="bg-clip-text text-transparent bg-cover bg-center bg-no-repeat m-0 leading-none text-[28px] sm:text-[32px] lg:text-[36px] xl:text-[40px]"
            style={{
              fontWeight: 500,
              backgroundImage: 'url("/images/font-hintergrund/HG-abstrakt-blau.webp")',
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {category.name}
          </h3>
          <ArrowRight
            size={30}
            className="text-black flex-shrink-0 transition-[color,transform] duration-300 ease-out group-hover:text-cyan group-hover:translate-x-5"
          />
        </div>
        <p className="mt-5 text-black text-[15px] leading-[1.4]" style={{ fontWeight: 300 }}>
          {category.description}
        </p>
      </div>
    </Link>
  );
}
