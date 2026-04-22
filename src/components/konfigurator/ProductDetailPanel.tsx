import { useEffect, useState } from "react";
import type { FinishingMainType, Product } from "../../types/models";
import { useCart } from "../../contexts/CartContext";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CloseIcon } from "../ui/Icon";
import { Step1Product } from "./Step1Product";
import { Step2Finishing } from "./Step2Finishing";
import { Step3Position } from "./Step3Position";
import { Step4Summary } from "./Step4Summary";
import { positionService } from "../../services/positionService";

interface PanelProps {
  product: Product;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;
const stepLabels = ["Produkt", "Veredelung", "Position", "Zusammenfassung"];

export function ProductDetailPanel({ product, onClose }: PanelProps) {
  const { addEntry } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [colorId, setColorId] = useState(product.colorVariants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [finishing, setFinishing] = useState<FinishingMainType | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [positionNote, setPositionNote] = useState("");
  const [finalNote, setFinalNote] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function togglePosition(id: string) {
    setSelectedPositions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  const variant = product.colorVariants.find((c) => c.id === colorId);
  const summaryLine = [
    product.name,
    variant?.name,
    `${quantity} Stück`,
    finishing ? (finishing === "druck" ? "Druck" : "Stick") : null,
    selectedPositions.length > 0
      ? selectedPositions
          .map((id) => positionService.getById(id)?.name)
          .filter(Boolean)
          .slice(0, 2)
          .join(" + ") + (selectedPositions.length > 2 ? " …" : "")
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const canProceed =
    (step === 1 && quantity >= product.minQuantity && colorId) ||
    (step === 2 && finishing !== null) ||
    (step === 3 && selectedPositions.length > 0) ||
    step === 4;

  function next() {
    if (step < 4) setStep((s) => (s + 1) as Step);
  }
  function prev() {
    if (step > 1) setStep((s) => (s - 1) as Step);
  }

  function handleAddToCart() {
    if (!finishing || selectedPositions.length === 0) return;
    addEntry({
      productId: product.id,
      colorVariantId: colorId,
      quantity,
      finishingType: finishing,
      positions: selectedPositions,
      positionNote: positionNote || undefined,
      finalNote: finalNote || undefined,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/60 animate-fade-in"
        onClick={onClose}
        aria-label="Panel schließen"
        role="button"
      />
      <aside
        className="w-full md:w-[88%] lg:max-w-[1100px] h-full bg-brunner-dark text-white flex flex-col animate-slide-in-right shadow-2xl"
        role="dialog"
        aria-label={`${product.name} konfigurieren`}
      >
        <div className="flex-shrink-0 border-b border-white/10 px-6 md:px-10 py-5 flex items-center gap-6">
          <div className="flex-1">
            <ProgressBar
              totalSteps={4}
              currentStep={step}
              labels={stepLabels}
              onJump={(s) => setStep(s as Step)}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="p-2 rounded-sm hover:bg-white/10 text-white/80"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto dark-scroll px-6 md:px-10 py-8">
          {step === 1 && (
            <Step1Product
              product={product}
              selectedColorId={colorId}
              quantity={quantity}
              onSelectColor={setColorId}
              onQuantity={setQuantity}
            />
          )}
          {step === 2 && (
            <Step2Finishing selected={finishing} onSelect={setFinishing} />
          )}
          {step === 3 && (
            <Step3Position
              selectedPositionIds={selectedPositions}
              positionNote={positionNote}
              onTogglePosition={togglePosition}
              onChangeNote={setPositionNote}
            />
          )}
          {step === 4 && (
            <Step4Summary
              product={product}
              selectedColorId={colorId}
              quantity={quantity}
              finishing={finishing}
              selectedPositionIds={selectedPositions}
              positionNote={positionNote}
              finalNote={finalNote}
              onChangeFinalNote={setFinalNote}
              onJumpToStep={(s) => setStep(s)}
            />
          )}
        </div>

        <div className="flex-shrink-0 border-t border-white/10 bg-brunner-dark/95 backdrop-blur px-6 md:px-10 py-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1 min-w-0">
            <p className="caps-label text-white/40 mb-1">Deine Auswahl</p>
            <p className="text-white/90 text-sm truncate">{summaryLine}</p>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <Button variant="outline-dark" size="md" onClick={prev} disabled={step === 1}>
              <ArrowLeftIcon size={16} /> Zurück
            </Button>
            <div className="flex flex-col items-end">
              {step < 4 ? (
                <Button variant="primary" size="md" onClick={next} disabled={!canProceed}>
                  Weiter <ArrowRightIcon size={16} />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAddToCart}
                  disabled={!finishing || selectedPositions.length === 0}
                >
                  <CheckIcon size={16} /> In Anfragekorb legen
                </Button>
              )}
              <span className="text-[11px] text-white/40 mt-1">Schritt {step} von 4</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
