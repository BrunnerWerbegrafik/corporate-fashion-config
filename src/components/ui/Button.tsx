import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline-light" | "outline-dark" | "ghost-light" | "ghost-dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brunner-cyan text-white hover:bg-brunner-cyanDark active:bg-brunner-cyanDark border border-brunner-cyan",
  "outline-light":
    "border border-brunner-dark text-brunner-dark bg-transparent hover:bg-brunner-dark hover:text-white",
  "outline-dark":
    "border border-white/30 text-white bg-transparent hover:bg-white/10",
  "ghost-light":
    "text-brunner-dark bg-transparent hover:bg-brunner-light",
  "ghost-dark":
    "text-white bg-transparent hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-base",
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
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
