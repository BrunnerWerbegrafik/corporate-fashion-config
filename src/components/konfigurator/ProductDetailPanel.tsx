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
import { textileTypeService } from "../../services/textileTypeService";

interface PanelProps {
  product: Product;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;
const STEP_LABELS: { label: string; subLabel: string }[] = [
  { label: "Produkt", subLabel: "Auswahl" },
  { label: "Veredelung", subLabel: "Stick · Druck" },
  { label: "Position", subLabel: "Platzierung" },
  { label: "Zusammenfassung", subLabel: "Anfrage" },
];

export function ProductDetailPanel({ product, onClose }: PanelProps) {
  const { addEntry } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [colorId, setColorId] = useState(product.colorVariants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(Math.max(25, product.minQuantity));
  const [finishing, setFinishing] = useState<FinishingMainType | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [positionNote, setPositionNote] = useState("");
  const [finalNote, setFinalNote] = useState("");

  const textileType = textileTypeService.getById(product.textileTypeId);
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
    <div className="fixed inset-0 z-50 flex">
      <button
        type="button"
        onClick={onClose}
        aria-label="Panel schließen"
        className="flex-1 bg-[rgba(7,14,26,0.55)] backdrop-blur-[2px] animate-fade-in cursor-default"
      />
      <aside
        className="w-full md:w-[88%] lg:max-w-[1200px] h-full bg-dk-1 text-white flex flex-col animate-slide-in-right shadow-[-40px_0_80px_-30px_rgba(0,0,0,0.6)] relative overflow-hidden"
        role="dialog"
        aria-label={`${product.name} konfigurieren`}
      >
        <div className="cyan-glow" aria-hidden="true" />

        {/* Top bar */}
        <div className="relative z-10 flex justify-between items-start px-10 lg:px-14 pt-7">
          <div className="flex items-center gap-2.5 text-[13px] text-dk-muted2 mt-1.5">
            {textileType?.name ?? "Sortiment"}
            <span className="w-[3px] h-[3px] bg-dk-muted2 rounded-full inline-block" />
            <strong className="text-white font-medium">{product.name}</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="w-9 h-9 rounded-full bg-white/[0.08] border border-dk-line grid place-items-center cursor-pointer transition-colors hover:bg-white/[0.16]"
          >
            <CloseIcon size={14} />
          </button>
        </div>

        {/* Header */}
        <div className="relative z-10 px-10 lg:px-14 pt-6 pb-7 flex items-end justify-between gap-12">
          <div>
            <h2 className="text-3xl md:text-[44px] font-medium tracking-tight leading-[1.05] m-0 mb-2.5">
              {step === 1 && (
                <>
                  {product.name}
                </>
              )}
              {step === 2 && (
                <>
                  Druck oder <em className="text-cyan">Stick</em>?
                </>
              )}
              {step === 3 && (
                <>
                  Wo soll dein <em className="text-cyan">Logo</em> hin?
                </>
              )}
              {step === 4 && (
                <>
                  Alles auf einen <em className="text-cyan">Blick</em>
                </>
              )}
            </h2>
            <p className="text-base text-dk-muted m-0 max-w-[560px] leading-[1.55]">
              {step === 1 && product.shortDescription}
              {step === 2 &&
                "Wähle die Hauptart der Veredelung. Das konkrete Verfahren stimmen wir mit dir individuell ab."}
              {step === 3 && "Mehrfachauswahl ist möglich – auch über Bereiche hinweg."}
              {step === 4 && "Prüfe deine Auswahl – und leg sie in den Anfragekorb."}
            </p>
          </div>
          <div className="hidden md:inline-flex items-center gap-2.5 px-3.5 py-2 border border-dk-line2 rounded-full text-xs text-dk-muted tracking-[0.06em] uppercase">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse-dot" />
            Mini-Konfigurator
          </div>
        </div>

        {/* Progress */}
        <div className="relative z-10 px-10 lg:px-14 pt-4 pb-9 border-b border-dk-line">
          <ProgressBar
            totalSteps={4}
            currentStep={step}
            labels={STEP_LABELS}
            onJump={(s) => setStep(s as Step)}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto dark-scroll relative z-10">
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

        {/* Sticky footer */}
        <div className="relative z-10 border-t border-dk-line bg-dk-0 px-10 lg:px-14 py-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
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
            {step > 1 ? (
              <button
                type="button"
                onClick={prev}
                className="text-sm text-dk-muted hover:text-white inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeftIcon size={14} /> Zurück
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-dk-muted hover:text-white transition-colors"
              >
                Abbrechen
              </button>
            )}
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
      </aside>
    </div>
  );
}
