"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { VIEWS, type View } from "@/content/types";
import { cn } from "@/lib/utils";

type ViewSwitcherProps = {
  label: string;
  hint: string;
  names: Record<View, string>;
};

function readView(): View {
  return document.documentElement.dataset.view === "engineer" ? "engineer" : "recruiter";
}

export function applyView(view: View) {
  document.documentElement.dataset.view = view;
  try {
    localStorage.setItem("view", view);
  } catch {}
  const url = new URL(window.location.href);
  url.searchParams.set("view", view);
  window.history.replaceState(window.history.state, "", url);
}

export function ViewSwitcher({ label, hint, names }: ViewSwitcherProps) {
  const [view, setView] = useState<View>("recruiter");
  const refs = useRef<Record<View, HTMLButtonElement | null>>({ recruiter: null, engineer: null });

  // The inline script may already have chosen a view before hydration.
  useEffect(() => setView(readView()), []);

  function choose(next: View, focus = false) {
    applyView(next);
    setView(next);
    if (focus) refs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      choose(view === "recruiter" ? "engineer" : "recruiter", true);
    }
  }

  return (
    <div>
      <p id="view-label" className="mb-3 text-base font-medium">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby="view-label"
        aria-describedby="view-hint"
        onKeyDown={onKeyDown}
        className="inline-grid grid-cols-2 rounded-lg border border-ink/20 bg-paper-raised p-1"
      >
        {VIEWS.map((v) => (
          <button
            key={v}
            ref={(el) => {
              refs.current[v] = el;
            }}
            type="button"
            role="radio"
            aria-checked={view === v}
            tabIndex={view === v ? 0 : -1}
            data-value={v}
            onClick={() => choose(v)}
            className={cn(
              "min-h-12 min-w-36 rounded-md px-6 text-lg font-semibold text-slate transition-colors hover:text-ink",
              // Styled from <html data-view> so the right button is filled before hydration.
              v === "recruiter"
                ? "[html:not([data-view=engineer])_&]:bg-jade [html:not([data-view=engineer])_&]:text-paper"
                : "[html[data-view=engineer]_&]:bg-jade [html[data-view=engineer]_&]:text-paper",
            )}
          >
            {names[v]}
          </button>
        ))}
      </div>
      <p id="view-hint" className="mt-3 max-w-[52ch] text-sm text-slate">
        {hint}
      </p>
    </div>
  );
}
