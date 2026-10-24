"use client";

import { useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import { VIEWS, type View } from "@/content/types";
import { cn } from "@/lib/utils";

type ViewSwitcherProps = {
  label: string;
  hint: string;
  names: Record<View, string>;
};

const VIEW_EVENT = "viewchange";

function subscribe(onChange: () => void) {
  window.addEventListener(VIEW_EVENT, onChange);
  return () => window.removeEventListener(VIEW_EVENT, onChange);
}

function readView(): View {
  return document.documentElement.dataset.view === "engineer" ? "engineer" : "recruiter";
}

let switchTimer: ReturnType<typeof setTimeout> | undefined;

export function applyView(view: View) {
  const root = document.documentElement;
  root.classList.add("view-switching");
  clearTimeout(switchTimer);
  switchTimer = setTimeout(() => root.classList.remove("view-switching"), 400);
  root.dataset.view = view;
  try {
    localStorage.setItem("view", view);
  } catch {}
  const url = new URL(window.location.href);
  url.searchParams.set("view", view);
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(VIEW_EVENT));
}

export function ViewSwitcher({ label, hint, names }: ViewSwitcherProps) {
  // <html data-view> is the source of truth (the inline script may set it before hydration).
  const view = useSyncExternalStore(subscribe, readView, () => "recruiter" as View);
  const refs = useRef<Record<View, HTMLButtonElement | null>>({ recruiter: null, engineer: null });

  function choose(next: View, focus = false) {
    applyView(next);
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
