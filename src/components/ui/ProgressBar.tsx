import { CheckIcon } from "./Icon";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  labels?: { label: string; subLabel?: string }[];
  onJump?: (step: number) => void;
}

const activeBubble: React.CSSProperties = {
  background:
    "radial-gradient(circle at 35% 28%, #4CB8E6 0%, #009FE3 42%, #005A80 100%)",
  border: "1px solid rgba(0, 159, 227, 0.5)",
  boxShadow: [
    "0 6px 20px rgba(0, 70, 130, 0.45)",
    "0 0 0 6px rgba(0, 159, 227, 0.08)",
    "inset 0 2px 3px rgba(255, 255, 255, 0.28)",
    "inset 0 -3px 5px rgba(0, 0, 0, 0.18)",
  ].join(", "),
};

const inactiveBubble: React.CSSProperties = {
  background:
    "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 45%, rgba(0, 0, 0, 0.18) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: [
    "0 4px 14px rgba(0, 0, 0, 0.45)",
    "inset 0 1px 1px rgba(255, 255, 255, 0.10)",
    "inset 0 -2px 3px rgba(0, 0, 0, 0.22)",
  ].join(", "),
};

const doneBubble: React.CSSProperties = {
  background:
    "radial-gradient(circle at 35% 28%, rgba(0, 159, 227, 0.22) 0%, rgba(0, 159, 227, 0.10) 45%, rgba(0, 0, 0, 0.15) 100%)",
  border: "1px solid rgba(0, 159, 227, 0.5)",
  boxShadow: [
    "0 4px 14px rgba(0, 50, 90, 0.45)",
    "inset 0 1px 1px rgba(255, 255, 255, 0.12)",
    "inset 0 -2px 3px rgba(0, 0, 0, 0.22)",
  ].join(", "),
};

export function ProgressBar({ totalSteps, currentStep, labels = [], onJump }: ProgressBarProps) {
  return (
    <div
      className="grid relative"
      style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
    >
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const done = step < currentStep;
        const active = step === currentStep;
        const canJump = Boolean(onJump) && step < currentStep;
        const meta = labels[i];

        return (
          <button
            key={step}
            type="button"
            disabled={!canJump}
            onClick={() => canJump && onJump?.(step)}
            className={`flex flex-col items-center gap-[13px] relative z-[1] ${
              canJump ? "cursor-pointer" : "cursor-default"
            }`}
            aria-label={`Schritt ${step}${meta ? `: ${meta.label}` : ""}`}
          >
            <div
              className={`w-[50px] h-[50px] rounded-full grid place-items-center text-[15px] font-medium tabular-nums transition-all duration-200 ${
                active ? "text-white" : done ? "text-cyan" : "text-white/85"
              }`}
              style={active ? activeBubble : done ? doneBubble : inactiveBubble}
            >
              {done ? <CheckIcon size={16} /> : step}
            </div>
            {meta && (
              <div
                className="text-[15px] text-center text-white leading-tight"
                style={{ fontWeight: 300 }}
              >
                {meta.label}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
