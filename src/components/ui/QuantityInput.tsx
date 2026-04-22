import { MinusIcon, PlusIcon } from "./Icon";

interface QuantityInputProps {
  value: number;
  min?: number;
  step?: number;
  onChange: (next: number) => void;
  theme?: "light" | "dark";
  size?: "sm" | "md";
}

export function QuantityInput({
  value,
  min = 1,
  step = 1,
  onChange,
  theme = "dark",
  size = "md",
}: QuantityInputProps) {
  const isDark = theme === "dark";
  const wrapper = isDark
    ? "bg-white/5 border border-white/15 text-white"
    : "bg-white border border-brunner-dark/20 text-brunner-dark";
  const btn = isDark
    ? "hover:bg-white/10 text-white"
    : "hover:bg-brunner-light text-brunner-dark";
  const dim = size === "sm" ? "h-9 w-28 text-sm" : "h-11 w-32 text-base";

  function update(delta: number) {
    const next = Math.max(min, value + delta);
    onChange(next);
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    const n = parseInt(e.target.value || `${min}`, 10);
    if (!Number.isNaN(n)) onChange(Math.max(min, n));
  }

  return (
    <div className={`inline-flex items-center justify-between rounded-sm overflow-hidden ${wrapper} ${dim}`}>
      <button
        type="button"
        aria-label="Menge reduzieren"
        onClick={() => update(-step)}
        className={`h-full px-3 ${btn}`}
      >
        <MinusIcon size={16} />
      </button>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={onInput}
        className="w-10 bg-transparent text-center font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label="Menge erhöhen"
        onClick={() => update(step)}
        className={`h-full px-3 ${btn}`}
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
}
