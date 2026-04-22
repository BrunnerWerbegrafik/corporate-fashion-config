import type { FinishingMainType } from "../../types/models";
import { finishingService } from "../../services/finishingService";

interface Step2Props {
  selected: FinishingMainType | null;
  onSelect: (m: FinishingMainType) => void;
}

const mainOptions: { id: FinishingMainType; title: string; subtitle: string; image: string; capsLabel: string }[] = [
  {
    id: "druck",
    title: "Druck",
    subtitle: "Brillante Farben, große Flächen, schnelle Umsetzung.",
    image: "/images/veredelungen/veredelung-druck-hauptbild.jpg",
    capsLabel: "Mögliche Druckverfahren",
  },
  {
    id: "stick",
    title: "Stick",
    subtitle: "Hochwertig, langlebig, edel – der Klassiker für Polos und Caps.",
    image: "/images/veredelungen/veredelung-stick-hauptbild.jpg",
    capsLabel: "Mögliche Stick-Arten",
  },
];

export function Step2Finishing({ selected, onSelect }: Step2Props) {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Druck oder Stick?</h2>
        <p className="text-white/70">
          Wähle die Hauptart der Veredelung. Das konkrete Verfahren stimmen wir
          mit dir individuell ab – passend zu Logo, Stückzahl und Textil.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {mainOptions.map((opt) => {
          const isSelected = selected === opt.id;
          const isDimmed = selected !== null && !isSelected;
          const subs = finishingService.getByParent(opt.id);

          return (
            <div
              key={opt.id}
              className={`transition-opacity duration-300 ${isDimmed ? "opacity-50" : "opacity-100"}`}
            >
              <button
                type="button"
                onClick={() => onSelect(opt.id)}
                className={`w-full text-left rounded-sm overflow-hidden border-2 transition-colors ${
                  isSelected ? "border-brunner-cyan" : "border-white/15 hover:border-white/40"
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={opt.image} alt={opt.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 bg-white/5">
                  <h3 className="text-2xl font-bold">{opt.title}</h3>
                  <p className="text-white/70 mt-1">{opt.subtitle}</p>
                </div>
              </button>

              <div className="mt-6">
                <p className="caps-label text-white/50 mb-3">{opt.capsLabel}</p>
                <ul className="space-y-3">
                  {subs.map((s) => (
                    <li
                      key={s.id}
                      className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-sm"
                    >
                      <img
                        src={s.exampleImage}
                        alt=""
                        className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-white/60 text-sm">{s.description}</p>
                        <p className="text-brunner-cyanSoft text-xs mt-1 italic">{s.useHint}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
