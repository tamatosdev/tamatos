import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
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

export const structure: StructureResolver = (S, context) =>
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
              orderableDocumentListDeskItem({
                type: "portfolio",
                title: "All Portfolio",
                icon: Briefcase,
                S,
                context,
              }),
              S.listItem()
                .title("Add Portfolio")
                .icon(Plus)
                .id("add-portfolio")
                .child(() =>
                  S.document()
                    .schemaType("portfolio")
                    .documentId(crypto.randomUUID())
                    .title("New Portfolio")
                ),
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
                .id("add-post")
                .child(() =>
                  S.document()
                    .schemaType("post")
                    .documentId(crypto.randomUUID())
                    .title("New Post")
                ),
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
