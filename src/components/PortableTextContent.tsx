import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";
import { slugifyHeading } from "@/lib/blogHeadings";

function createComponents(): PortableTextComponents {
  const used = new Map<string, number>();

  const headingIdFromValue = (value?: PortableTextBlock) => {
    const children = Array.isArray(value?.children) ? value.children : [];
    const text = children
      .map((child) =>
        child && typeof child === "object" && "text" in child && typeof child.text === "string"
          ? child.text
          : ""
      )
      .join("")
      .trim();
    let id = slugifyHeading(text) || "section";
    const count = used.get(id) ?? 0;
    used.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    return id;
  };

  return {
    block: {
      h1: ({ children, value }) => <h1 id={headingIdFromValue(value)}>{children}</h1>,
      h2: ({ children, value }) => <h2 id={headingIdFromValue(value)}>{children}</h2>,
      h3: ({ children, value }) => <h3 id={headingIdFromValue(value)}>{children}</h3>,
      h4: ({ children, value }) => <h4 id={headingIdFromValue(value)}>{children}</h4>,
      normal: ({ children }) => <p>{children}</p>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      underline: ({ children }) => <u>{children}</u>,
      link: ({ value, children }) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={urlFor(value).width(1200).url()} alt={value.alt || ""} />
        );
      },
      table: ({ value }) => {
        const rows = Array.isArray(value?.rows) ? value.rows : [];
        if (!rows.length) return null;

        return (
          <div className="blog-table-wrap">
            <table className="blog-table">
              <tbody>
                {rows.map((row: { _key?: string; cells?: string[] }, rowIndex: number) => {
                  const cells = Array.isArray(row?.cells) ? row.cells : [];
                  const isHeader = rowIndex === 0;
                  return (
                    <tr key={row._key || `row-${rowIndex}`}>
                      {cells.map((cell, cellIndex) => {
                        const Tag = isHeader ? "th" : "td";
                        return (
                          <Tag key={`${row._key || rowIndex}-${cellIndex}`}>
                            {cell}
                          </Tag>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      },
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
  };
}

export default function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={createComponents()} />;
}
