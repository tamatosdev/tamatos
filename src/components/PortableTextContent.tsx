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
      ctaBlock: ({ value }) => {
        if (!value?.label || !value?.url) return null;
        const external = /^https?:\/\//.test(value.url);
        const newTab = Boolean(value.openInNewTab);
        const button = (
          <a
            href={value.url}
            className="blog-cta-button"
            {...(newTab ? { target: "_blank", rel: external ? "noopener noreferrer" : undefined } : {})}
          >
            {value.label}
            <svg width="18" height="14" viewBox="0 0 20 16" fill="none" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1759 0.157581C11.5041 -0.0775052 11.9994 -0.0460291 12.2818 0.228402L19.8112 7.57316C20.0629 7.81907 20.0629 8.18105 19.8112 8.42694L12.2818 15.7707C11.9994 16.0461 11.5041 16.0776 11.1759 15.8425C10.8465 15.6064 10.8088 15.1923 11.0912 14.9179L17.5098 8.65615L0.78354 8.65615C0.350599 8.65615 0 8.36204 0 8.00007C0 7.63809 0.350599 7.34398 0.78354 7.34398L17.5098 7.34398L11.0912 1.08225C10.8088 0.807829 10.8465 0.393652 11.1759 0.157581Z"
                fill="currentColor"
              />
            </svg>
          </a>
        );

        // Just the button when there's no heading or text.
        if (!value.title && !value.text) return <div className="blog-cta-plain">{button}</div>;

        return (
          <div className="blog-cta">
            {value.title && <p className="blog-cta-title">{value.title}</p>}
            {value.text && <p className="blog-cta-text">{value.text}</p>}
            {button}
          </div>
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
