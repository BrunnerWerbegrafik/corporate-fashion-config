import { PageWrapper } from "../components/layout/PageWrapper";
import { TileCard } from "../components/ui/TileCard";
import { textileTypeService } from "../services/textileTypeService";

export function StartseitePage() {
  const types = textileTypeService.getAll();
  const totalProducts = 240;

  return (
    <PageWrapper theme="light">
      <header className="px-6 md:px-12 lg:px-[72px] pt-20 md:pt-28 pb-16">
        <div className="caps-eyebrow text-muted mb-7 inline-flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          Corporate Fashion Konfigurator · 2026
        </div>
        <h1 className="text-[56px] md:text-[76px] lg:text-[92px] font-medium leading-[0.98] tracking-tightest text-ink m-0 text-balance">
          Corporate Fashion. <em className="text-cyan">Made easy.</em>
        </h1>
        <div className="mt-10 pt-6 border-t border-hairline flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 text-sm text-muted">
          <div className="flex flex-wrap gap-x-8 gap-y-1">
            <span>sechs Kategorien</span>
            <span className="hidden md:inline opacity-50">·</span>
            <span>über {totalProducts} Textilien</span>
            <span className="hidden md:inline opacity-50">·</span>
            <span>bedruckt oder bestickt in Großkarolinenfeld</span>
          </div>
          <div>
            <strong className="text-ink font-medium">Schritt 1</strong>
            <span className="opacity-50 mx-2">·</span>
            Kategorie wählen
          </div>
        </div>
      </header>

      <section className="px-6 md:px-12 lg:px-[72px] pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((t, idx) => (
            <TileCard
              key={t.id}
              index={idx + 1}
              to={`/textilart/${t.id}`}
              image={t.coverImage}
              title={t.name}
              subline={t.shortDescription}
            />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
