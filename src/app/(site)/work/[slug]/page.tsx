export const revalidate = 0;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import footerShade1 from "@/assets/footer-shade1.png";
import footerShade2 from "@/assets/footer-shade2.png";
import PortableTextContent from "@/components/PortableTextContent";
import CtaSection2 from "@/components/CtaSection2";
import { getHomePage } from "@/lib/home";
import { getPortfolioBySlug, getPortfolioCardTags, getPortfolioSlugs } from "@/lib/portfolio";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);

  if (!item) {
    return { title: `Project Not Found | ${SITE_NAME}` };
  }

  const description = item.excerpt || DEFAULT_DESCRIPTION;
  const image = item.featuredImage?.url;
  const url = `${SITE_URL}/work/${slug}`;

  return {
    title: `${item.title} | ${SITE_NAME} Works`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description,
      url,
      type: "article",
      ...(image ? { images: [{ url: image, alt: item.featuredImage?.alt || item.title }] } : {}),
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item, home] = await Promise.all([getPortfolioBySlug(slug), getHomePage()]);

  if (!item) notFound();

  const tags = getPortfolioCardTags(item);

  return (
    <main style={{ overflowX: "clip" }}>
      <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-14 overflow-hidden">
        <Image
          src={footerShade1}
          alt=""
          className="absolute pointer-events-none select-none left-0 top-0 z-0"
        />

        <div className="container relative z-10">
          <div
            className="inline-flex w-fit items-center gap-2 px-5 py-2 rounded-full text-white/70 font-medium mb-8"
            style={{
              fontSize: "18px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid #ffffff26",
              boxShadow: "inset 5.33px 4px 12px 0px rgba(255,255,255,0.15)",
            }}
          >
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/work" className="hover:text-white transition-colors duration-200">
              Works
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white">{item.title}</span>
          </div>

          <h1
            className="text-white font-medium leading-[1.1] max-w-4xl"
            style={{ fontSize: "clamp(36px, 4.5vw, 72px)", letterSpacing: "-0.04em" }}
          >
            {item.title}
          </h1>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-[10px] mt-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-white/80 mix-blend-plus-lighter"
                  style={{
                    padding: "8px 14px",
                    borderRadius: "40px",
                    fontSize: "12px",
                    letterSpacing: "-0.05em",
                    background: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "inset 5.33px 4px 10px 0px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {item.featuredImage?.url && (
        <section className="container pb-10 lg:pb-14">
          <div className="overflow-hidden rounded-[24px] lg:rounded-[28px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.featuredImage.url}
              alt={item.featuredImage.alt || item.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      )}

      {item.body && item.body.length > 0 && (
        <section className="container pb-12 lg:pb-16">
          <div
            className="prose prose-invert max-w-3xl prose-p:text-white/70 prose-headings:text-white prose-headings:font-medium prose-a:text-[#9DF560]"
            style={{ fontSize: "clamp(16px, 1.1vw, 18px)", lineHeight: 1.7 }}
          >
            <PortableTextContent value={item.body} />
          </div>
        </section>
      )}

      {item.gallery && item.gallery.length > 0 && (
        <section className="relative pb-14 lg:pb-20 overflow-hidden">
          <Image
            src={footerShade2}
            alt=""
            className="absolute pointer-events-none select-none left-0 top-1/2 -translate-y-1/2 opacity-70"
          />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {item.gallery.map((image, index) =>
                image.url ? (
                  <div
                    key={`${image.url}-${index}`}
                    className="overflow-hidden rounded-[20px] lg:rounded-[24px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.alt || `${item.title} image ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      <div className="pt-4 lg:pt-8">
        <CtaSection2 data={home?.finalCta} />
      </div>
    </main>
  );
}
