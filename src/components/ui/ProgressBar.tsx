import { CheckIcon } from "./Icon";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  labels?: { label: string; subLabel?: string }[];
  onJump?: (step: number) => void;
}

export function ProgressBar({ totalSteps, currentStep, labels = [], onJump }: ProgressBarProps) {
  const filledPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative">
      <div className="grid relative" style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}>
        {/* Connector line */}
        <div
          className="absolute h-px bg-white/14 pointer-events-none"
          style={{ left: "6%", right: "6%", top: "22px" }}
        />
        <div
          className="absolute h-px bg-cyan transition-all duration-500 pointer-events-none"
          style={{ left: "6%", top: "22px", width: `calc(${filledPercent}% * 0.88)` }}
        />

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
              className={`flex flex-col items-center gap-3 relative z-[1] ${canJump ? "cursor-pointer" : "cursor-default"}`}
              aria-label={`Schritt ${step}${meta ? `: ${meta.label}` : ""}`}
            >
              <div
                className={`w-11 h-11 rounded-full grid place-items-center text-[15px] font-medium tabular-nums transition-all duration-200 ${
                  active
                    ? "bg-cyan border border-cyan text-white shadow-[0_0_0_6px_rgba(0,159,227,0.14)]"
                    : done
                    ? "bg-dk-3 border border-cyan text-cyan"
                    : "bg-dk-1 border border-white/14 text-dk-muted2"
                }`}
              >
                {done ? <CheckIcon size={16} /> : step}
              </div>
              {meta && (
                <>
                  <div
                    className={`text-[13px] font-medium tracking-wide text-center transition-colors ${
                      active ? "text-cyan" : done ? "text-white/80" : "text-dk-muted2"
                    }`}
                  >
                    {meta.label}
                  </div>
                  {meta.subLabel && (
                    <div
                      className={`text-[11px] tracking-capsm uppercase -mt-1.5 ${
                        active ? "text-cyan/85" : "text-dk-muted2/75"
                      }`}
                    >
                      {meta.subLabel}
                    </div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
