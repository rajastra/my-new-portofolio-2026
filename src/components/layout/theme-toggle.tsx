"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeToggleProps = { toLight: string; toDark: string };

export function ThemeToggle({ toLight, toDark }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center rounded-md text-slate hover:text-ink"
    >
      {/* Both icons render; CSS shows the right one so there's no hydration mismatch. */}
      <Sun aria-hidden className="hidden size-5 dark:block" />
      <Moon aria-hidden className="size-5 dark:hidden" />
      <span className="sr-only dark:hidden">{toDark}</span>
      <span className="sr-only hidden dark:inline">{toLight}</span>
    </button>
  );
}
