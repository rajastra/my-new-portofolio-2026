import type { ElementType, ReactNode } from "react";
import type { View } from "@/content/types";

type OnlyProps = {
  view: View;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Renders content for one audience. Both variants are in the HTML; CSS in
 * globals.css hides the inactive one based on <html data-view>.
 */
export function Only({ view, as: Tag = "div", className, children }: OnlyProps) {
  return (
    <Tag data-only={view} className={className}>
      {children}
    </Tag>
  );
}
