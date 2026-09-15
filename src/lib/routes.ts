/** Routes that currently have real pages in the app. */
export const LIVE_PATHS = new Set([
  "/",
  "/about",
  "/blog",
  "/contact",
  "/work",
  "/services/development",
  "/services/digital",
  "/services/design",
]);

export function normalizePath(href?: string | null): string | null {
  if (!href?.trim()) return null;
  const path = href.trim().split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

/** True when this href points at a page that exists (or a known dynamic segment). */
export function isLivePath(href?: string | null): boolean {
  const path = normalizePath(href);
  if (!path) return false;
  if (LIVE_PATHS.has(path)) return true;
  if (path.startsWith("/blog/") && path !== "/blog/") return true;
  if (path.startsWith("/work/") && path !== "/work/") return true;
  return false;
}

/** Map a service category label to its live page. */
export function serviceCategoryPath(category?: string | null): string {
  const key = (category ?? "").trim().toLowerCase();
  if (key.includes("develop")) return "/services/development";
  if (key.includes("digital")) return "/services/digital";
  return "/services/design";
}

/** Preferred display order: Development → Digital → Design */
export function serviceCategoryOrder(category?: string | null): number {
  const key = (category ?? "").trim().toLowerCase();
  if (key.includes("develop")) return 0;
  if (key.includes("digital")) return 1;
  if (key.includes("design")) return 2;
  return 99;
}

export function sortByServiceCategoryOrder<T>(
  items: T[],
  getLabel: (item: T) => string | null | undefined
): T[] {
  return [...items].sort(
    (a, b) => serviceCategoryOrder(getLabel(a)) - serviceCategoryOrder(getLabel(b))
  );
}
