import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "dashed" | "primary";

interface ButtonNewJobProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export function ButtonNewJob({
  icon,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonNewJobProps) {
  const base =
    "flex items-center justify-center gap-2 transition-all cursor-pointer rounded-lg font-medium";

  const variants = {
    dashed:
      "mt-3 w-full py-2 bg-transparent border border-dashed border-slate-300 text-xs text-slate-500 hover:bg-white hover:text-blue-600 hover:border-blue-300",
    primary:
      "px-4 py-2 bg-blue-600 text-white text-sm hover:bg-blue-700 shadow-sm",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}