import { CheckIcon } from "./Icon";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  labels?: { label: string; subLabel?: string }[];
  onJump?: (step: number) => void;
}

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
                active
                  ? "bg-gradient-to-br from-[rgba(0,159,227,0.9)] to-[rgba(0,90,128,0.9)] border border-cyan/40 text-white"
                  : done
                  ? "bg-transparent border border-cyan text-cyan"
                  : "bg-white/[0.03] border border-white/15 text-white/80"
              }`}
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
