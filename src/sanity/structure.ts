import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  FileText,
  User,
  Tag,
  FolderOpen,
  Plus,
  Home,
  Briefcase,
  Menu,
  Mail,
  Search,
  Info,
  Layers,
  PenTool,
  Code2,
} from "lucide-react";

const hiddenTypes = [
  "post",
  "category",
  "tag",
  "author",
  "homePage",
  "contactPage",
  "aboutPage",
  "workPage",
  "blogPage",
  "digitalPage",
  "designPage",
  "developmentPage",
  "siteNavigation",
  "portfolio",
  "portfolioServiceTag",
  "portfolioIndustryTag",
];

function seoSingleton(
  S: Parameters<StructureResolver>[0],
  opts: {
    title: string;
    schemaType: string;
    documentId: string;
    icon: typeof Home;
  }
) {
  return S.listItem()
    .title(opts.title)
    .icon(opts.icon)
    .child(
      S.document()
        .schemaType(opts.schemaType)
        .documentId(opts.documentId)
        .title(opts.title)
    );
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      seoSingleton(S, {
        title: "Home Page",
        schemaType: "homePage",
        documentId: "homePage",
        icon: Home,
      }),
      seoSingleton(S, {
        title: "About Page",
        schemaType: "aboutPage",
        documentId: "aboutPage",
        icon: Info,
      }),
      seoSingleton(S, {
        title: "Work Page",
        schemaType: "workPage",
        documentId: "workPage",
        icon: Briefcase,
      }),
      seoSingleton(S, {
        title: "Blog Page",
        schemaType: "blogPage",
        documentId: "blogPage",
        icon: FileText,
      }),
      seoSingleton(S, {
        title: "Contact Page",
        schemaType: "contactPage",
        documentId: "contactPage",
        icon: Mail,
      }),

      S.listItem()
        .title("Service Pages (SEO)")
        .icon(Layers)
        .child(
          S.list()
            .title("Service Pages")
            .items([
              seoSingleton(S, {
                title: "Digital",
                schemaType: "digitalPage",
                documentId: "digitalPage",
                icon: Search,
              }),
              seoSingleton(S, {
                title: "Design",
                schemaType: "designPage",
                documentId: "designPage",
                icon: PenTool,
              }),
              seoSingleton(S, {
                title: "Development",
                schemaType: "developmentPage",
                documentId: "developmentPage",
                icon: Code2,
              }),
            ])
        ),

      S.listItem()
        .title("Site Navigation")
        .icon(Menu)
        .child(
          S.document()
            .schemaType("siteNavigation")
            .documentId("siteNavigation")
            .title("Site Navigation")
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
