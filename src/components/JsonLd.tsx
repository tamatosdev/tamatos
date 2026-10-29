export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | null;
}) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      // Escape `<` so CMS strings like "</script>" can't break out of the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
