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
const STEP_LABELS: { label: string }[] = [
  { label: "Produkt" },
  { label: "Veredelung" },
  { label: "Position" },
  { label: "Zusammenfassung" },
];

export function ProductDetailPanel({ product, onClose }: PanelProps) {
  const { addEntry } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [colorId, setColorId] = useState(product.colorVariants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(Math.max(10, product.minQuantity));
  const [finishing, setFinishing] = useState<FinishingMainType | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [positionNote, setPositionNote] = useState("");
  const [finalNote, setFinalNote] = useState("");

  const variant = product.colorVariants.find((c) => c.id === colorId);

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
    setSelectedPositions((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  const positionLabels = selectedPositions
    .map((id) => positionService.getById(id)?.name)
    .filter(Boolean);

  const canProceed =
    (step === 1 && quantity >= product.minQuantity && colorId) ||
    (step === 2 && finishing !== null) ||
    (step === 3 && selectedPositions.length > 0) ||
    step === 4;

  const stepHints: Record<Step, string> = {
    1: "Veredelung und Position folgen im nächsten Schritt.",
    2: "Wähle Druck oder Stick – das konkrete Verfahren stimmen wir mit dir ab.",
    3: "Mehrere Positionen sind möglich, auch tab-übergreifend.",
    4: "Letzter Check, dann ab in den Anfragekorb.",
  };

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
    <div className="fixed inset-0 z-50">
      {/* Vollflächiger Blur-Backdrop – schon vor dem Slide sichtbar, damit das
          Panel keine harte Kante beim Reinfahren erzeugt */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[5px] animate-fade-in pointer-events-none"
      />
      {/* Klickfläche links vom Panel schließt das Overlay */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Panel schließen"
        className="absolute left-0 top-0 bottom-0 cursor-default"
        style={{ width: "12.5%", minWidth: 80 }}
      />
      <aside
        className="absolute right-0 top-0 bottom-0 bg-[#001b26] text-white flex flex-col animate-slide-in-right overflow-hidden"
        style={{ width: "87.5%" }}
        role="dialog"
        aria-label={`${product.name} konfigurieren`}
      >
        {/* Top-Bar: Stepper + X ganz rechts */}
        <div className="relative z-10 border-b border-white/10">
          <div className="pt-[30px] pb-[32px] pl-[90px] pr-[220px]">
            <ProgressBar
              totalSteps={4}
              currentStep={step}
              labels={STEP_LABELS}
              onJump={(s) => setStep(s as Step)}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="absolute right-[80px] top-[35px] w-10 h-10 grid place-items-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto dark-scroll relative z-10">
          {step === 1 && (
            <Step1Product
              product={product}
              selectedColorId={colorId}
              quantity={quantity}
              canProceed={Boolean(canProceed)}
              onSelectColor={setColorId}
              onQuantity={setQuantity}
              onNext={next}
            />
          )}
          {step === 2 && (
            <div className="px-10 lg:px-14 py-10">
              <Step2Finishing selected={finishing} onSelect={setFinishing} />
            </div>
          )}
          {step === 3 && (
            <div className="px-10 lg:px-14 py-10">
              <Step3Position
                selectedPositionIds={selectedPositions}
                positionNote={positionNote}
                onTogglePosition={togglePosition}
                onChangeNote={setPositionNote}
              />
            </div>
          )}
          {step === 4 && (
            <div className="px-10 lg:px-14 py-10">
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
            </div>
          )}
        </div>

        {/* Sticky Footer – nur Schritt 2–4 (Schritt 1 hat seinen CTA inline rechts) */}
        {step > 1 && (
          <div className="relative z-10 border-t border-white/10 bg-[#00121a] px-10 lg:px-14 py-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="caps-label text-dk-muted2">Deine Auswahl</span>
              <div className="text-[19px] text-white font-medium tracking-[-0.005em] truncate">
                {product.name}
                <span className="text-dk-muted2 mx-2 font-normal">·</span>
                <span className="text-cyan">{variant?.name ?? "—"}</span>
                <span className="text-dk-muted2 mx-2 font-normal">·</span>
                {quantity} Stück
                {finishing && (
                  <>
                    <span className="text-dk-muted2 mx-2 font-normal">·</span>
                    {finishing === "druck" ? "Druck" : "Stick"}
                  </>
                )}
                {positionLabels.length > 0 && (
                  <>
                    <span className="text-dk-muted2 mx-2 font-normal">·</span>
                    {positionLabels.slice(0, 2).join(" + ")}
                    {positionLabels.length > 2 ? " …" : ""}
                  </>
                )}
              </div>
              <span className="italic text-xs text-dk-muted2 mt-0.5">{stepHints[step]}</span>
            </div>
            <div className="flex items-center gap-7 self-end md:self-auto">
              <button
                type="button"
                onClick={prev}
                className="text-sm text-dk-muted hover:text-white inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeftIcon size={14} /> Zurück
              </button>
              <div className="flex flex-col items-end gap-1.5">
                {step < 4 ? (
                  <Button variant="primary" size="md" onClick={next} disabled={!canProceed}>
                    Weiter <ArrowRightIcon size={16} />
                  </Button>
                ) : (
                  <Button variant="primary" size="md" onClick={handleAddToCart} disabled={!canProceed}>
                    In Anfragekorb <CheckIcon size={16} />
                  </Button>
                )}
                <span className="text-[11px] text-dk-muted2 tracking-[0.1em] uppercase">
                  Schritt {step} von 4
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
