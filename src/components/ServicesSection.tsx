import Link from "next/link";

const services = [
  {
    category: "Branding",
    bg: "#FFFFFF1A",
    hoverBg: "#9DF560",
    items: [
      "Pitch Deck Design",
      "Brand Identity",
      "Logo Design",
      "Graphic Design",
      "Rebranding",
    ],
  },
  {
    category: "Design",
    bg: "#FFFFFF1A",
    hoverBg: "#FC7031",
    items: [
      "UX/UI Design",
      "Web Design",
      "Mobile App Design",
      "Website Redesign",
      "UX/UI Audit",
    ],
  },
  {
    category: "Development",
    bg: "#FFFFFF1A",
    hoverBg: "#03E4AC",
    items: [
      "Web Development",
      "MVP Development",
      "WebFlow Development",
      "Landing Page",
      "Mobile Development",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="container py-12 md:py-24">
      <h2
        className="text-white font-medium text-center leading-[1.15] mb-10 md:mb-14"
        style={{ fontSize: "clamp(28px, 4.5vw, 64px)", letterSpacing: "-0.04em" }}
      >
        Design &amp; Development<br />
        <span className="text-white/70 italic">Services </span>We Offer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <div
            key={service.category}
            className="rounded-3xl p-6 md:p-8 flex flex-col shadow-[inset_5.33px_4px_10px_0_#FFFFFF1A] mix-blend-plus-lighter"
            style={{ background: service.bg, "--hover-color": service.hoverBg } as React.CSSProperties}
          >
            <h3
              className="text-white font-medium mb-5 md:mb-6"
              style={{ fontSize: "clamp(24px, 3.5vw, 48px)", letterSpacing: "-0.04em" }}
            >
              {service.category}
            </h3>

            <ul className="flex flex-col">
              {service.items.map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="group/item flex items-center justify-between py-4 md:py-5 px-3 rounded-xl text-white transition-all duration-300 ease-out hover:px-5 hover:bg-(--hover-color) hover:text-[#0A0A0C]"
                  >
                    <span
                      className="font-medium"
                      style={{ fontSize: "clamp(15px, 1.6vw, 22px)", letterSpacing: "-0.03em" }}
                    >
                      {item}
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
