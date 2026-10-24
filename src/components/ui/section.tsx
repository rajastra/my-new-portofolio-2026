import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Page section: heading in the left column on wide screens, content in the main 8 columns. */
export function Section({ id, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-rule py-16 md:py-24", className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight md:sticky md:top-24">
            {title}
          </h2>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          {intro ? <p className="mb-10 max-w-[65ch] text-slate">{intro}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
