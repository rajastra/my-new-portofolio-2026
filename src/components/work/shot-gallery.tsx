import Image from "next/image";
import type { Shot } from "@/content/types";
import { cn } from "@/lib/utils";

/** A screenshot in a simple device frame. Opens the full-size image in a new tab. */
export function ShotFrame({ shot, sizes, priority }: { shot: Shot; sizes: string; priority?: boolean }) {
  const mobile = shot.device === "mobile";
  return (
    <a
      href={shot.src}
      target="_blank"
      rel="noopener"
      className={cn(
        "block overflow-hidden bg-paper-raised transition-[border-color]",
        mobile
          ? "rounded-[1.6rem] border-[6px] border-ink/85 hover:border-jade"
          : "rounded-lg border border-rule hover:border-jade",
      )}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </a>
  );
}

/**
 * Case study gallery: the first shot spans the full width, the rest share a row
 * (phone frames stay narrow, desktop frames share the remaining space).
 */
export function ShotGallery({ shots }: { shots: Shot[] }) {
  const [lead, ...rest] = shots;
  if (!lead) return null;

  return (
    <div className="space-y-10">
      <figure>
        <ShotFrame shot={lead} sizes="(min-width: 1152px) 1088px, 100vw" priority />
        <figcaption className="mt-3 max-w-[60ch] text-sm text-slate">{lead.caption}</figcaption>
      </figure>

      {rest.length > 0 ? (
        <div className="flex flex-wrap items-start gap-8">
          {rest.map((shot) => (
            <figure
              key={shot.src}
              className={shot.device === "mobile" ? "w-[220px] shrink-0" : "min-w-[280px] flex-1"}
            >
              <ShotFrame
                shot={shot}
                sizes={shot.device === "mobile" ? "220px" : "(min-width: 768px) 420px, 100vw"}
              />
              <figcaption className="mt-3 max-w-[40ch] text-sm text-slate">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
