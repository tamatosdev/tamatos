import Image from "next/image";
import Link from "next/link";
import contactBg from "@/assets/contact-page-box-bg.png";
import arrowShade2 from "@/assets/arrow-shade2.png";
import ContactForm from "@/components/ContactForm";
import GlobalFootprint from "@/components/GlobalFootprint";
import nabeel from "@/assets/CEO.png";
import ReviewTab from "@/components/ReviewTab";
import JsonLd from "@/components/JsonLd";
import { getContactPage } from "@/lib/contact";
import { buildJsonLd, buildPageMetadata } from "@/lib/seo";

export const revalidate = 0;

const defaultPhones = [
  { label: "+92 335 6787927", href: "+923356787927" },
  { label: "+971 50 1514568", href: "+971501514568" },
];

export async function generateMetadata() {
  const page = await getContactPage();
  return buildPageMetadata(
    page?.seo ?? {
      metaTitle: "Contact Us — Tamatos",
      metaDescription: "Get in touch with Tamatos for design, development, and digital marketing.",
    }
  );
}

export default async function ContactPage() {
  const page = await getContactPage();
  const jsonLd = buildJsonLd(page?.seo);

  const breadcrumbLabel = page?.breadcrumbLabel ?? "Contact Us";
  const profileName = page?.profileName ?? "Nabeel Danish Rafiq";
  const profileRole = page?.profileRole ?? "Co-Founder & CEO";
  const profileImageUrl = page?.profileImage?.url;
  const profileImageAlt = page?.profileImage?.alt || profileName;
  const cardBgUrl = page?.cardBackground?.url;
  const headingBefore = page?.headingBefore ?? "Ready to";
  const headingItalic = page?.headingItalic ?? "sauce up";
  const headingAfter = page?.headingAfter ?? "your Digital Presence?";
  const phoneLabel = page?.phoneLabel ?? "Call us for expert solutions.";
  const phones = (
    page?.phones?.filter((p) => p.label && p.href)?.length
      ? page.phones.filter((p) => p.label && p.href)
      : defaultPhones
  ).map((phone) => {
    const href = phone.href!.replace(/\s/g, "");
    if (href === "+16194320949" || phone.label?.includes("619")) {
      return { label: "+971 50 1514568", href: "+971501514568" };
    }
    return phone;
  });
  const cmsEmailLabel = page?.emailLabel?.trim();
  const emailLabel =
    !cmsEmailLabel || cmsEmailLabel === "Our friendly team here to help."
      ? "Or email us your query."
      : cmsEmailLabel;
  const email = page?.email ?? "hello@tamatos.com";
  const cmsCtaLabel = page?.infoCtaLabel?.trim();
  const infoCtaLabel =
    !cmsCtaLabel || cmsCtaLabel === "Start a Project"
      ? "Book your meeting"
      : cmsCtaLabel;
  const cmsCtaHref = page?.infoCtaHref?.trim();
  const infoCtaHref =
    !cmsCtaHref || cmsCtaHref === "#contact-form"
      ? "https://calendly.com/nabeeldanishrafiq/tamatos"
      : cmsCtaHref;

  return (
    <main style={{ overflowX: "clip" }}>
      <JsonLd data={jsonLd} />
      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-40 lg:pb-28">
        <div
          className="absolute bottom-0 right-0 pointer-events-none select-none"
          style={{ zIndex: -1, transform: "translateY(30%)" }}
        >
          <Image src={arrowShade2} alt="" priority />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="mb-8 lg:mb-10">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white/70 font-medium"
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
              <span className="text-white">{breadcrumbLabel}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-10 items-stretch">
            <div className="relative rounded-[30px] overflow-hidden py-10 px-6 sm:py-12 sm:px-8 lg:py-16 lg:px-10 flex flex-col h-full">
              {cardBgUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cardBgUrl}
                  alt={page?.cardBackground?.alt || ""}
                  className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
                />
              ) : (
                <Image
                  src={contactBg}
                  alt=""
                  fill
                  className="object-cover object-center pointer-events-none"
                />
              )}
              <div className="relative z-10 flex flex-col h-full gap-8 lg:gap-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-[#9DF560]">
                    {profileImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profileImageUrl}
                        alt={profileImageAlt}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <Image
                        src={nabeel}
                        alt={profileImageAlt}
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-[21.33px] leading-tight">
                      {profileName}
                    </p>
                    <p
                      className="text-white/50 text-[18px] font-normal tracking-widest uppercase mt-0.5"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {profileRole}
                    </p>
                  </div>
                </div>

                <h2
                  className="text-white font-medium leading-[1.2]"
                  style={{ fontSize: "clamp(24.89px, 2.5vw, 44.44px)", letterSpacing: "-0.04em" }}
                >
                  {headingBefore}{" "}
                  <em className="italic text-white/50">{headingItalic}</em>
                  <br />
                  {headingAfter}
                </h2>

                <div className="flex flex-1 flex-col justify-center gap-8 lg:gap-10">
                  <div>
                    <p className="text-white/50 text-[18px] font-medium mb-2">{phoneLabel}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {phones.map((phone, index) => (
                        <span key={`${phone.href}-${index}`} className="contents">
                          {index > 0 && <span className="text-white/30">|</span>}
                          <a
                            href={`tel:${phone.href!.replace(/\s/g, "")}`}
                            className="text-white font-medium text-[17.78px] sm:text-[21.33px] hover:text-[#9DF560] transition-colors duration-200"
                          >
                            {phone.label}
                          </a>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-white/50 text-[18px] font-medium mb-2">{emailLabel}</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-white font-medium text-[17.78px] sm:text-[21.33px] hover:text-[#9DF560] transition-colors duration-200"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <a
                    href={infoCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-full bg-[#9DF560] text-[#0A0A0C] font-semibold hover:bg-[#8ae84d] transition-colors duration-200"
                    style={{ fontSize: "18px", padding: "14px 28px" }}
                  >
                    {infoCtaLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[30px] py-10 px-6 sm:py-12 sm:px-8 lg:py-16 lg:px-10">
              <ContactForm
                content={{
                  formHeadingBefore: page?.formHeadingBefore,
                  formHeadingItalic: page?.formHeadingItalic,
                  formHeadingAfter: page?.formHeadingAfter,
                  queryTabLabel: page?.queryTabLabel,
                  projectTabLabel: page?.projectTabLabel,
                  querySubmitLabel: page?.querySubmitLabel,
                  projectSubmitLabel: page?.projectSubmitLabel,
                  consentText: page?.consentText,
                  budgetLabel: page?.budgetLabel,
                  budgetOptions: page?.budgetOptions,
                  serviceInterestLabel: page?.serviceInterestLabel,
                  projectDetailsLabel: page?.projectDetailsLabel,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <GlobalFootprint data={page?.globalFootprint} />

      <div className="other-page-section">
        <ReviewTab />
      </div>
    </main>
  );
}
