"use client";

import { useMemo, type ComponentType } from "react";
import { htmlToBlocks } from "@portabletext/block-tools";
import type { OnPasteFn } from "@portabletext/editor";
import {
  PortableTextInput,
  type ArrayOfObjectsInputProps,
  type PortableTextInputProps,
} from "sanity";

function randomKey() {
  return Math.random().toString(36).slice(2, 12);
}

function createTablePasteHandler(
  schemaType: PortableTextInputProps["schemaType"]
): OnPasteFn {
  return ({ event }) => {
    const html = event.clipboardData?.getData("text/html") ?? "";
    if (!html || !/<table[\s>]/i.test(html)) {
      return undefined;
    }

    try {
      const blocks = htmlToBlocks(html, schemaType, {
        rules: [
          {
            deserialize(el, _next, block) {
              if (!(el instanceof HTMLElement) || el.tagName !== "TABLE") {
                return undefined;
              }

              const trs = Array.from(el.querySelectorAll("tr")).filter(
                (tr) => tr.closest("table") === el
              );

              const rows = trs
                .map((tr) => {
                  const cells = Array.from(
                    tr.querySelectorAll(":scope > th, :scope > td")
                  ).map((cell) =>
                    (cell.textContent || "").replace(/\s+/g, " ").trim()
                  );
                  return {
                    _type: "tableRow",
                    _key: randomKey(),
                    cells,
                  };
                })
                .filter((row) => row.cells.length > 0);

              if (!rows.length) return undefined;

              const colCount = Math.max(...rows.map((row) => row.cells.length));
              for (const row of rows) {
                while (row.cells.length < colCount) row.cells.push("");
              }

              return block({
                _type: "table",
                rows,
              });
            },
          },
        ],
      });

      if (!blocks?.length) return undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { insert: blocks as any };
    } catch (error) {
      console.error("Failed to paste HTML table into Portable Text:", error);
      return undefined;
    }
  };
}

/** Portable Text input that converts pasted HTML `<table>` into Sanity table blocks. */
function BlockContentInputComponent(props: ArrayOfObjectsInputProps) {
  const pteProps = props as unknown as PortableTextInputProps;
  const onPaste = useMemo(
    () => createTablePasteHandler(pteProps.schemaType),
    [pteProps.schemaType]
  );

  return <PortableTextInput {...pteProps} onPaste={onPaste} />;
}

export const BlockContentInput =
  BlockContentInputComponent as ComponentType<ArrayOfObjectsInputProps>;
