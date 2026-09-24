import Link from "next/link";
import type { ServicesData } from "@/lib/home";
import { isLivePath } from "@/lib/routes";

const defaultServices = [
  {
    category: "Development",
    description:
      "Websites that turn visitors into customers. Products built around people, not just features.",
    bg: "#FFFFFF1A",
    hoverBg: "#FC7031",
    href: "/services/development",
    items: [
      "Websites",
      "Mobile Applications",
      "E-Commerce Solutions",
      "SaaS Platforms",
      "ODOO Implementation",
      "AI Workflows & Agents",
    ],
  },
  {
    category: "Digital",
    description: "Work that gets your business seen by the right people.",
    bg: "#FFFFFF1A",
    hoverBg: "#03E4AC",
    href: "/services/digital",
    items: [
      "Social Media Marketing",
      "Search Engine Optimization",
      "Influencer Marketing",
      "Email & WhatsApp Automation",
      "Content Creation And Strategy",
      "Analytics & Growth Optimization",
    ],
  },
  {
    category: "Design",
    description: "Identities that give businesses something to be remembered by.",
    bg: "#FFFFFF1A",
    hoverBg: "#9DF560",
    href: "/services/design",
    items: [
      "Website UX/UI Design",
      "Mobile App Design",
      "Brand Strategy",
      "Brand Identity",
      "Print & Marketing Collateral",
      "Pitch Deck Design",
    ],
  },
];

export default function ServicesSection({ data }: { data?: ServicesData }) {
  const titleLine1 = data?.titleLine1 ?? "What";
  const titleEmphasis = data?.titleEmphasis ?? "We";
  const titleLine2 = (data?.titleLine2 ?? "Do").replace(/\.$/, "");

  // Screenshot-accurate service cards (order + copy)
  const services = defaultServices.map((s) => ({
    ...s,
    items: s.items.map((label) => ({ label, href: s.href })),
  }));

  return (
    <section className="container py-12 md:py-24 relative z-1" data-aos-skip>
      <h2
        className="text-white font-medium text-center leading-[1.15] mb-10 sm:whitespace-nowrap md:mb-14"
        style={{ fontSize: "clamp(35px, 4.44vw, 50.06px)", letterSpacing: "-0.04em" }}
        data-aos="fade-up"
        data-aos-duration="900"
      >
        {titleLine1}{" "}
        <span className="text-white/50">{titleEmphasis}</span> {titleLine2}
        <span className="text-[#9DF560]">.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div
            key={service.category}
            className="rounded-3xl p-6 md:p-8 flex flex-col shadow-[inset_5.33px_4px_10px_0_#FFFFFF1A] mix-blend-plus-lighter"
            style={
              {
                background: service.bg,
                "--hover-color": service.hoverBg,
              } as React.CSSProperties
            }
            data-aos="fade-up"
            data-aos-duration="1100"
            data-aos-delay={120 + index * 200}
            data-aos-easing="ease-out-cubic"
          >
            {isLivePath(service.href) ? (
              <Link
                href={service.href}
                className="text-white font-medium transition-opacity hover:opacity-80"
                style={{ fontSize: "clamp(28px, 2.6vw, 37.55px)", letterSpacing: "-0.04em" }}
              >
                {service.category}
              </Link>
            ) : (
              <h3
                className="text-white font-medium"
                style={{ fontSize: "clamp(28px, 2.6vw, 37.55px)", letterSpacing: "-0.04em" }}
              >
                {service.category}
              </h3>
            )}

            {service.description ? (
              <p className="mt-3 mb-5 text-[16px] md:text-[18px] leading-[1.5] tracking-[-0.02em] text-white/60 md:mb-6">
                {service.description}
              </p>
            ) : (
              <div className="mb-5 md:mb-6" />
            )}

            <ul className="flex flex-col">
              {service.items.map((item, itemIndex) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`
                      group/item flex items-center justify-between px-3 rounded-xl transition-all duration-300 ease-out
                       lg:text-white
                      ${itemIndex === 0 ? "bg-[var(--hover-color)] text-[#0A0A0C]" : "bg-transparent"}
                      lg:bg-transparent lg:hover:bg-[var(--hover-color)] lg:hover:text-[#0A0A0C] lg:hover:px-5
                    `}
                    style={{ paddingBlock: "1.15rem" }}
                  >
                    <span
                      className="font-medium"
                      style={{ fontSize: "clamp(16px, 1.3vw, 18.77px)", letterSpacing: "-0.03em" }}
                    >
                      {item.label}
                    </span>
                    <span className="leading-none transition-transform duration-300 group-hover/item:translate-x-1 shrink-0">
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.1759 0.157581C11.5041 -0.0775052 11.9994 -0.0460291 12.2818 0.228402L19.8112 7.57316C20.0629 7.81907 20.0629 8.18105 19.8112 8.42694L12.2818 15.7707C11.9994 16.0461 11.5041 16.0776 11.1759 15.8425C10.8465 15.6064 10.8088 15.1923 11.0912 14.9179L17.5098 8.65615L0.78354 8.65615C0.350599 8.65615 0 8.36204 0 8.00007C0 7.63809 0.350599 7.34398 0.78354 7.34398L17.5098 7.34398L11.0912 1.08225C10.8088 0.807829 10.8465 0.393652 11.1759 0.157581Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
