import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import intFurnitureLogo from "@/assets/int-furniture-logo.png";
import int1 from "@/assets/int-1.png";
import int2 from "@/assets/int-2.png";
import burqoraLogo from "@/assets/burqora-logo.png";
import burqora1 from "@/assets/burqora-1.png";
import burqora2 from "@/assets/burqora-2.png";
import greenArrow from "@/assets/green-arrow.svg";

type FeaturedProject = {
  logo: StaticImageData;
  logoAlt: string;
  logoClassName?: string;
  image1: StaticImageData;
  image1Alt: string;
  image2: StaticImageData;
  image2Alt: string;
  description: string;
  href: string;
};

const projects: FeaturedProject[] = [
  {
    logo: intFurnitureLogo,
    logoAlt: "International Furniture Limited",
    logoClassName: "h-[56px] w-[56px] object-contain lg:h-[64px] lg:w-[64px]",
    image1: int1,
    image1Alt: "IFL social and campaign creatives",
    image2: int2,
    image2Alt: "IFL digital posts and mobile mockup",
    description:
      "IFL is a global furniture brand offering ergonomic solutions. We created product-focused digital posts and event collaterals, strengthening their overall brand presence",
    href: "/work",
  },
  {
    logo: burqoraLogo,
    logoAlt: "BurqOra",
    logoClassName: "h-auto w-[min(100%,160px)] object-contain lg:w-[min(100%,180px)]",
    image1: burqora1,
    image1Alt: "BurqOra business card mockups",
    image2: burqora2,
    image2Alt: "BurqOra brand brochure mockup",
    description:
      "BurqOra is a workforce management and performance SaaS platform. We designed their logo and business cards, creating a strong first impression and brand identity",
    href: "/work",
  },
];

const cardStyle = {
  background: "rgba(243, 243, 255, 0)",
  // Even edge on all 4 sides — no offset, no soft spread
  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.14)",
};

function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <div
      className="rounded-[28px] p-5 lg:rounded-[40px] lg:p-10"
      style={cardStyle}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
        <div className="flex items-start pt-2 lg:order-1 lg:pt-4 lg:pl-2">
          <Image
            src={project.logo}
            alt={project.logoAlt}
            className={project.logoClassName}
          />
        </div>

        <div className="overflow-hidden rounded-[20px] lg:order-2 lg:rounded-[24px]">
          <Image
            src={project.image1}
            alt={project.image1Alt}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="overflow-hidden rounded-[20px] lg:order-3 lg:rounded-[24px]">
          <Image
            src={project.image2}
            alt={project.image2Alt}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-end gap-8 pb-2 lg:order-4 lg:gap-10 lg:pb-4 lg:pr-2">
          <p
            className="max-w-[520px] font-normal leading-[1.4] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(18px, 1.55vw, 21.33px)" }}
          >
            {project.description}
            <span className="text-[var(--service-accent,#03E4AC)]">.</span>
          </p>

          <Link
            href={project.href}
            className="group inline-flex w-fit items-center gap-2.5 text-[18px] font-medium tracking-[-0.02em] text-white transition-colors duration-200 hover:text-[var(--service-accent,#03E4AC)] lg:text-[17.78px]"
          >
            Read full Case Study
            <Image
              src={greenArrow}
              alt=""
              width={20}
              height={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DesignFeaturedProjectsSection() {
  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <h2
          className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
        >
          <span className="font-normal text-white/50">Featured</span> Projects
          <span className="text-[var(--service-accent,#03E4AC)]">.</span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:gap-10">
          {projects.map((project) => (
            <FeaturedProjectCard key={project.logoAlt} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
