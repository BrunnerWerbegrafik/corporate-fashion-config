import type { FinishingMainType, Product } from "../../types/models";
import { positionService } from "../../services/positionService";
import { EditIcon } from "../ui/Icon";

interface Step4Props {
  product: Product;
  selectedColorId: string;
  quantity: number;
  finishing: FinishingMainType | null;
  selectedPositionIds: string[];
  positionNote: string;
  finalNote: string;
  onChangeFinalNote: (note: string) => void;
  onJumpToStep: (step: 1 | 2 | 3) => void;
}

export function Step4Summary({
  product,
  selectedColorId,
  quantity,
  finishing,
  selectedPositionIds,
  positionNote,
  finalNote,
  onChangeFinalNote,
  onJumpToStep,
}: Step4Props) {
  const variant = product.colorVariants.find((c) => c.id === selectedColorId);
  const positionLabels = selectedPositionIds
    .map((id) => positionService.getById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Alles auf einen Blick</h2>
        <p className="text-white/70">Prüfe deine Auswahl – und leg sie in den Anfragekorb.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-sm p-5 flex gap-4 items-start">
          <img
            src={variant?.images[0] ?? product.defaultImage}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
          />
          <div className="flex-1">
            <p className="caps-label text-white/40 mb-1">Produkt</p>
            <p className="font-semibold text-lg">{product.name}</p>
            <p className="text-white/70 text-sm">
              Farbe: {variant?.name ?? "—"} · {quantity} Stück · Min. {product.minQuantity}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="inline-flex items-center gap-1 text-brunner-cyan hover:text-brunner-cyanSoft text-sm"
          >
            <EditIcon size={14} /> Bearbeiten
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-sm p-5 flex gap-4 items-start">
          <div className="w-20 h-20 bg-brunner-cyan/15 rounded-sm flex items-center justify-center text-brunner-cyan font-bold text-2xl flex-shrink-0">
            {finishing === "druck" ? "D" : finishing === "stick" ? "S" : "?"}
          </div>
          <div className="flex-1">
            <p className="caps-label text-white/40 mb-1">Veredelung</p>
            <p className="font-semibold text-lg capitalize">{finishing ?? "—"}</p>
            <p className="text-white/70 text-sm">
              Konkretes Verfahren wird mit dir abgestimmt.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="inline-flex items-center gap-1 text-brunner-cyan hover:text-brunner-cyanSoft text-sm"
          >
            <EditIcon size={14} /> Bearbeiten
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-sm p-5 flex gap-4 items-start">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-white/40 font-bold text-2xl flex-shrink-0">
            {positionLabels.length}
          </div>
          <div className="flex-1 min-w-0">
            <p className="caps-label text-white/40 mb-1">Positionen</p>
            <p className="font-semibold text-lg">
              {positionLabels.length === 0
                ? "Keine ausgewählt"
                : positionLabels.map((p) => p.name).join(", ")}
            </p>
            {positionNote && (
              <p className="text-white/60 text-sm mt-1 italic">„{positionNote}"</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="inline-flex items-center gap-1 text-brunner-cyan hover:text-brunner-cyanSoft text-sm"
          >
            <EditIcon size={14} /> Bearbeiten
          </button>
        </div>
      </div>

      <div className="mt-8">
        <label htmlFor="final-note" className="caps-label text-white/50 block mb-2">
          Abschluss-Notiz (optional)
        </label>
        <textarea
          id="final-note"
          rows={3}
          placeholder="z.B. 'Wunschtermin Mitte Mai' oder 'Erstmal nur Angebot, Bestellung folgt'"
          value={finalNote}
          onChange={(e) => onChangeFinalNote(e.target.value)}
          className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:border-brunner-cyan focus:outline-none"
        />
      </div>
    </div>
  );
}
