import { notFound } from "next/navigation";

// Any unknown path under a locale renders the site's own not-found page inside the layout,
// instead of Next's bare default 404.
export default function CatchAll() {
  notFound();
}
