import type { FinishingMainType } from "../../types/models";
import { finishingService } from "../../services/finishingService";

interface Step2Props {
  selected: FinishingMainType | null;
  onSelect: (m: FinishingMainType) => void;
}

const mainOptions: {
  id: FinishingMainType;
  title: string;
  subtitle: string;
  image: string;
  capsLabel: string;
}[] = [
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
                className={`w-full text-left rounded-m overflow-hidden border-2 transition-colors ${
                  isSelected ? "border-cyan" : "border-dk-line2 hover:border-white/30"
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  <img src={opt.image} alt={opt.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 bg-white/[0.03]">
                  <h3 className="text-2xl font-medium tracking-tight">{opt.title}</h3>
                  <p className="text-dk-muted mt-1 text-[15px] leading-snug">{opt.subtitle}</p>
                </div>
              </button>

              <div className="mt-6">
                <p className="caps-label text-dk-muted2 mb-3">{opt.capsLabel}</p>
                <ul className="space-y-3">
                  {subs.map((s) => (
                    <li
                      key={s.id}
                      className="flex gap-4 p-3 bg-white/[0.03] border border-dk-line rounded-m"
                    >
                      <img
                        src={s.exampleImage}
                        alt=""
                        className="w-16 h-16 object-cover rounded-s flex-shrink-0"
                      />
                      <div>
                        <p className="font-medium text-white">{s.name}</p>
                        <p className="text-dk-muted text-sm leading-snug">{s.description}</p>
                        <p className="text-cyan text-xs mt-1 italic">
                          <em>{s.useHint}</em>
                        </p>
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
