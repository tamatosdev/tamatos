import Link from "next/link";

const services = [
  {
    category: "Branding",
    bg: "#3D3CF5",
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
    bg: "#9DF560",
    dark: true,
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
    bg: "#E8601C",
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
    <section className="container py-24">
      {/* Main heading */}
      <h2
        className="text-white font-medium text-center leading-[1.15] mb-14"
        style={{ fontSize: "64px", letterSpacing: "-0.04em" }}
      >
        Design & Development<br />Services We Offer
      </h2>

      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-5">
        {services.map((service) => (
          <div
            key={service.category}
            className="rounded-[24px] p-8 flex flex-col"
            style={{ background: service.bg }}
          >
            {/* Card heading */}
            <h3
              className="font-medium mb-6"
              style={{
                fontSize: "48px",
                letterSpacing: "-0.04em",
                color: service.dark ? "#0A0A0C" : "#ffffff",
              }}
            >
              {service.category}
            </h3>

            {/* Service list */}
            <ul className="flex flex-col">
              {service.items.map((item, i) => (
                <li key={item}>
                  {i > 0 && (
                    <div
                      className="w-full h-px mb-0"
                      style={{ background: service.dark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)" }}
                    />
                  )}
                  <Link
                    href="/services"
                    className="flex items-center justify-between py-5 transition-opacity duration-200 hover:opacity-70"
                    style={{ color: service.dark ? "#0A0A0C" : "#ffffff" }}
                  >
                    <span
                      className="font-medium"
                      style={{ fontSize: "24px", letterSpacing: "-0.03em" }}
                    >
                      {item}
                    </span>
                    <span className="text-[20px] leading-none">
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.1759 0.157581C11.5041 -0.0775052 11.9994 -0.0460291 12.2818 0.228402L19.8112 7.57316C20.0629 7.81907 20.0629 8.18105 19.8112 8.42694L12.2818 15.7707C11.9994 16.0461 11.5041 16.0776 11.1759 15.8425C10.8465 15.6064 10.8088 15.1923 11.0912 14.9179L17.5098 8.65615L0.78354 8.65615C0.350599 8.65615 0 8.36204 0 8.00007C0 7.63809 0.350599 7.34398 0.78354 7.34398L17.5098 7.34398L11.0912 1.08225C10.8088 0.807829 10.8465 0.393652 11.1759 0.157581Z" fill={service.dark ? "#0A0A0C" : "#ffffff"}/>
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
