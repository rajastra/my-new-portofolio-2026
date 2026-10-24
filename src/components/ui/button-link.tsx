import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverse";

const styles: Record<Variant, string> = {
  primary: "bg-jade text-on-jade hover:bg-ink hover:text-paper",
  secondary: "bg-tone text-ink hover:bg-ink hover:text-paper",
  inverse: "bg-on-jade text-jade hover:bg-ink hover:text-paper",
};

/** One button shape on the whole page: square corners, flat fill, no outline. */
export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "press inline-flex min-h-11 items-center justify-center px-5 text-base font-semibold",
    styles[variant],
    className,
  );
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
