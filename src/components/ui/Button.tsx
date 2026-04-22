import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "primary-light" | "outline-light" | "outline-dark" | "ghost-light" | "ghost-dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  // Primärer CTA in der dunklen Welt = Schwarz (statt Cyan), wie im Design
  primary:
    "bg-black text-white hover:bg-ink active:bg-ink border border-black",
  // Primärer CTA in der hellen Welt = Cyan
  "primary-light":
    "bg-cyan text-white hover:bg-[#0086C0] active:bg-[#0086C0] border border-cyan",
  "outline-light":
    "border border-ink/30 text-ink bg-transparent hover:bg-ink hover:text-white",
  "outline-dark":
    "border border-white/14 text-white bg-transparent hover:bg-white/8",
  "ghost-light": "text-ink-2 bg-transparent hover:text-cyan",
  "ghost-dark": "text-dk-muted bg-transparent hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm rounded-s",
  md: "px-5 py-3 text-[15px] rounded-m",
  lg: "px-7 py-4 text-[15px] rounded-m",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-3 font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
