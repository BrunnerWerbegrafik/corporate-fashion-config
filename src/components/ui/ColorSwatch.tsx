import type { ColorVariant } from "../../types/models";

interface ColorSwatchProps {
  color: ColorVariant;
  selected: boolean;
  onClick: () => void;
  size?: number;
}

export function ColorSwatch({ color, selected, onClick, size = 36 }: ColorSwatchProps) {
  const ringClass = selected
    ? "ring-2 ring-brunner-cyan ring-offset-2 ring-offset-brunner-dark"
    : "ring-1 ring-white/30 hover:ring-white/60";

  return (
    <button
      type="button"
      aria-label={color.name}
      title={color.name}
      onClick={onClick}
      style={{ width: size, height: size, backgroundColor: color.colorHex }}
      className={`rounded-full transition-all ${ringClass}`}
    />
  );
}
