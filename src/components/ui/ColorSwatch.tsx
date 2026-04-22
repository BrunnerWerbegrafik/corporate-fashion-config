import type { ColorVariant } from "../../types/models";

interface ColorSwatchProps {
  color: ColorVariant;
  selected: boolean;
  onClick: () => void;
}

export function ColorSwatch({ color, selected, onClick }: ColorSwatchProps) {
  const isWhite = color.colorHex.toLowerCase() === "#ffffff" || color.colorHex.toLowerCase() === "#fff";
  return (
    <button
      type="button"
      aria-label={color.name}
      title={color.name}
      onClick={onClick}
      className="w-9 h-9 rounded-full relative cursor-pointer transition-transform hover:scale-105 justify-self-center"
      style={{
        backgroundColor: color.colorHex,
        boxShadow: isWhite ? "inset 0 0 0 1px rgba(0,0,0,0.1)" : undefined,
      }}
    >
      <span
        className="absolute -inset-[5px] rounded-full border-[1.5px] transition-colors"
        style={{ borderColor: selected ? "#009FE3" : "transparent" }}
      />
    </button>
  );
}
