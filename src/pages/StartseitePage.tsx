import { PageWrapper } from "../components/layout/PageWrapper";
import { TileCard } from "../components/ui/TileCard";
import { textileTypeService } from "../services/textileTypeService";

export function StartseitePage() {
  const types = textileTypeService.getAll();

  return (
    <PageWrapper theme="light">
      <section className="max-w-content mx-auto px-6 pt-16 md:pt-24 pb-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-brunner-dark tracking-tight">
          Corporate Fashion. <em className="text-brunner-cyan">Made easy.</em>
        </h1>
      </section>

      <section className="max-w-content mx-auto px-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {types.map((t) => (
            <TileCard
              key={t.id}
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
