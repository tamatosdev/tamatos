import type { PortableTextBlock } from "@portabletext/types";

export type BlogHeading = {
  id: string;
  text: string;
  style: "h2" | "h3";
};

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getBlockText(block: PortableTextBlock): string {
  if (!("children" in block) || !Array.isArray(block.children)) return "";
  return block.children
    .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
    .join("")
    .trim();
}

export function extractBlogHeadings(body?: PortableTextBlock[]): BlogHeading[] {
  if (!body?.length) return [];

  const headings: BlogHeading[] = [];
  const used = new Map<string, number>();

  for (const block of body) {
    if (block._type !== "block") continue;
    const style = "style" in block ? String(block.style) : "";
    if (style !== "h2" && style !== "h3") continue;

    const text = getBlockText(block);
    if (!text) continue;

    let id = slugifyHeading(text) || "section";
    const count = used.get(id) ?? 0;
    used.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;

    headings.push({ id, text, style });
  }

  return headings;
}
