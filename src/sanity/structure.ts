import type { StructureResolver } from "sanity/structure";
import { FileText, User, Tag, FolderOpen, Plus } from "lucide-react";

const hiddenTypes = ["post", "category", "tag", "author"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Posts — WordPress-style nested menu
      S.listItem()
        .title("Posts")
        .icon(FileText)
        .child(
          S.list()
            .title("Posts")
            .items([
              S.listItem()
                .title("All Posts")
                .icon(FileText)
                .child(
                  S.documentTypeList("post")
                    .title("All Posts")
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Add Post")
                .icon(Plus)
                .child(S.document().schemaType("post")),
              S.divider(),
              S.listItem()
                .title("Categories")
                .icon(FolderOpen)
                .child(S.documentTypeList("category").title("Categories")),
              S.listItem()
                .title("Tags")
                .icon(Tag)
                .child(S.documentTypeList("tag").title("Tags")),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Authors")
        .icon(User)
        .child(S.documentTypeList("author").title("Authors")),

      // Hide types already placed above; show any future types automatically
      ...S.documentTypeListItems().filter(
        (item) => !hiddenTypes.includes(item.getId() ?? "")
      ),
    ]);
