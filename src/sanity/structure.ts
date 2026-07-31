import type { StructureResolver } from "sanity/structure";
import { FileText, User, Tag, FolderOpen, Plus, Home, Briefcase } from "lucide-react";

const hiddenTypes = [
  "post",
  "category",
  "tag",
  "author",
  "homePage",
  "portfolio",
  "portfolioServiceTag",
  "portfolioIndustryTag",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .icon(Home)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home Page")
        ),

      S.divider(),

      S.listItem()
        .title("Portfolio")
        .icon(Briefcase)
        .child(
          S.list()
            .title("Portfolio")
            .items([
              S.listItem()
                .title("All Portfolio")
                .icon(Briefcase)
                .child(
                  S.documentTypeList("portfolio")
                    .title("All Portfolio")
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "_createdAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Add Portfolio")
                .icon(Plus)
                .child(S.document().schemaType("portfolio")),
              S.divider(),
              S.listItem()
                .title("Services")
                .icon(FolderOpen)
                .child(
                  S.documentTypeList("portfolioServiceTag").title("Portfolio Services")
                ),
              S.listItem()
                .title("Industries")
                .icon(Tag)
                .child(
                  S.documentTypeList("portfolioIndustryTag").title("Portfolio Industries")
                ),
            ])
        ),

      S.divider(),

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

      ...S.documentTypeListItems().filter(
        (item) => !hiddenTypes.includes(item.getId() ?? "")
      ),
    ]);
