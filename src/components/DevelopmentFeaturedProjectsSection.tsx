import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import fatimaGroupLogo from "@/assets/fatima-group-logo.png";
import fatimaGroup1 from "@/assets/fatima-group-1.png";
import fatimaGroup2 from "@/assets/fatima-group-2.png";
import muchoLogo from "@/assets/mucho-logo.png";
import mucho11 from "@/assets/mucho-11.png";
import mucho22 from "@/assets/mucho-22.png";
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
    logo: fatimaGroupLogo,
    logoAlt: "Fatima Group",
    logoClassName: "h-[56px] w-[70px] object-contain lg:h-[64px] lg:w-[80px]",
    image1: fatimaGroup1,
    image1Alt: "Fatima Group website desktop view",
    image2: fatimaGroup2,
    image2Alt: "Fatima Group website mobile view",
    description:
      "The Fatima Group Website is a corporate digital platform designed to represent one of Pakistan's leading industrial conglomerates with clarity, credibility, and modern visual appeal",
    href: "/work",
  },
  {
    logo: muchoLogo,
    logoAlt: "Mucho Burrito",
    logoClassName: "h-auto w-[min(100%,140px)] object-contain lg:w-[min(100%,160px)]",
    image1: mucho11,
    image1Alt: "Mucho Burrito website desktop view",
    image2: mucho22,
    image2Alt: "Mucho Burrito website mobile view",
    description:
      "The Fatima Group Website is a corporate digital platform designed to represent one of Pakistan's leading industrial conglomerates with clarity, credibility, and modern visual appeal",
    href: "/work",
  },
];

const cardStyle = {
  background: "rgba(243, 243, 255, 0)",
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
            style={{ fontSize: "clamp(16px, 1.55vw, 21.33px)" }}
          >
            {project.description}
            <span className="text-[var(--service-accent,#FC7031)]">.</span>
          </p>

          <Link
            href={project.href}
            className="group inline-flex w-fit items-center gap-2.5 text-[16px] font-medium tracking-[-0.02em] text-white transition-colors duration-200 hover:text-[var(--service-accent,#FC7031)] lg:text-[17.78px]"
          >
            Read full Case Study
            <Image
              src={greenArrow}
              alt=""
              width={20}
              height={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(52%) sepia(78%) saturate(1800%) hue-rotate(346deg) brightness(101%) contrast(98%)",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DevelopmentFeaturedProjectsSection() {
  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <h2
          className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
        >
          <em className="font-normal italic text-white/45">Featured</em> Projects
          <span className="text-[var(--service-accent,#FC7031)]">.</span>
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
