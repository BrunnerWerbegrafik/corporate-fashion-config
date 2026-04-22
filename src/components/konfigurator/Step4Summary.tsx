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
      <div className="space-y-4">
        <SummaryRow
          label="Produkt"
          imageNode={
            <img
              src={variant?.images[0] ?? product.defaultImage}
              alt=""
              className="w-20 h-20 object-cover rounded-s flex-shrink-0"
            />
          }
          title={product.name}
          subtitle={`Farbe: ${variant?.name ?? "—"} · ${quantity} Stück · Min. ${product.minQuantity}`}
          onEdit={() => onJumpToStep(1)}
        />
        <SummaryRow
          label="Veredelung"
          imageNode={
            <div className="w-20 h-20 bg-cyan-soft rounded-s grid place-items-center text-cyan font-medium text-2xl flex-shrink-0">
              {finishing === "druck" ? "D" : finishing === "stick" ? "S" : "?"}
            </div>
          }
          title={finishing === "druck" ? "Druck" : finishing === "stick" ? "Stick" : "—"}
          subtitle="Konkretes Verfahren wird mit dir abgestimmt."
          onEdit={() => onJumpToStep(2)}
        />
        <SummaryRow
          label="Positionen"
          imageNode={
            <div className="w-20 h-20 bg-white/[0.03] border border-dk-line rounded-s grid place-items-center text-dk-muted font-medium text-2xl flex-shrink-0">
              {positionLabels.length}
            </div>
          }
          title={positionLabels.length === 0 ? "Keine ausgewählt" : positionLabels.map((p) => p.name).join(", ")}
          subtitle={positionNote ? `Notiz: „${positionNote}"` : undefined}
          onEdit={() => onJumpToStep(3)}
        />
      </div>

      <div className="mt-8">
        <label htmlFor="final-note" className="caps-label text-dk-muted2 block mb-2">
          Abschluss-Notiz (optional)
        </label>
        <textarea
          id="final-note"
          rows={3}
          placeholder={'z.B. „Wunschtermin Mitte Mai" oder „Erstmal nur Angebot, Bestellung folgt"'}
          value={finalNote}
          onChange={(e) => onChangeFinalNote(e.target.value)}
          className="w-full bg-white/[0.03] border border-dk-line2 rounded-m px-4 py-3 text-white placeholder-dk-muted2/70 focus:border-cyan focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  imageNode: React.ReactNode;
  title: string;
  subtitle?: string;
  onEdit: () => void;
}

function SummaryRow({ label, imageNode, title, subtitle, onEdit }: SummaryRowProps) {
  return (
    <div className="bg-white/[0.03] border border-dk-line rounded-m p-5 flex gap-4 items-start">
      {imageNode}
      <div className="flex-1 min-w-0">
        <p className="caps-label text-dk-muted2 mb-1">{label}</p>
        <p className="font-medium text-lg text-white">{title}</p>
        {subtitle && <p className="text-dk-muted text-sm mt-1">{subtitle}</p>}
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1 text-cyan hover:text-white text-sm transition-colors"
      >
        <EditIcon size={14} /> Bearbeiten
      </button>
    </div>
  );
}
