import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary: "bg-jade text-paper hover:bg-ink",
  secondary: "border border-ink/25 text-ink hover:border-ink",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center gap-2 rounded-md px-5 text-base font-medium transition-colors",
    styles[variant],
    className,
  );
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
