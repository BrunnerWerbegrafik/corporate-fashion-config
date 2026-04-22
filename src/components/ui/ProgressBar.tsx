import { CheckIcon } from "./Icon";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  labels?: string[];
  onJump?: (step: number) => void;
}

export function ProgressBar({ totalSteps, currentStep, labels = [], onJump }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const step = i + 1;
          const done = step < currentStep;
          const active = step === currentStep;
          const canJump = onJump && step < currentStep;
          const circleBase =
            "w-8 h-8 rounded-full inline-flex items-center justify-center text-sm font-bold transition-colors";
          const circleClass = done || active
            ? "bg-brunner-cyan text-white"
            : "bg-white/10 text-white/50 border border-white/20";

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                aria-label={`Schritt ${step}${labels[i] ? `: ${labels[i]}` : ""}`}
                disabled={!canJump}
                onClick={() => canJump && onJump?.(step)}
                className={`${circleBase} ${circleClass} ${canJump ? "cursor-pointer hover:scale-105" : "cursor-default"}`}
              >
                {done ? <CheckIcon size={16} /> : step}
              </button>
              {labels[i] && (
                <span
                  className={`ml-2 hidden sm:inline-block text-xs caps-label ${active ? "text-brunner-cyan" : done ? "text-white/70" : "text-white/40"}`}
                >
                  {labels[i]}
                </span>
              )}
              {step < totalSteps && (
                <div className="flex-1 h-px mx-3 bg-white/15 relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-brunner-cyan transition-all"
                    style={{ width: done ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
