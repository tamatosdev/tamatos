import Image from "next/image";
import Asterisk from "@/assets/asteric.png";
import MapImage from "@/assets/map-image.png";
import MapMobile from "@/assets/map-mobile.png";
import ClutchBg from "@/assets/clutch-bg.png";
import ClutchDeveloper from "@/assets/clutch-developer.png";
import ClutchPpc from "@/assets/clutch-ppc.png";
import ClutchMarketing from "@/assets/clutch-marketing.png";
import ClutchSeo from "@/assets/clutch-seo.png";
import type { AwardsData } from "@/lib/home";

const defaultAwards = [
  { image: ClutchDeveloper, text: "Top Web Developers", year: "Clutch 2026" },
  { image: ClutchPpc, text: "Top PPC Company", year: "Clutch 2026" },
  { image: ClutchMarketing, text: "Top Digital Marketing Company", year: "Clutch 2026" },
  { image: ClutchSeo, text: "Top SEO Company", year: "Clutch 2026" },
];

export default function AwardsSection({ data }: { data?: AwardsData }) {
  const headingMain = data?.headingMain ?? "Not just";
  const headingEmphasis = data?.headingEmphasis ?? "Trusted.";
  const headingEnd = data?.headingEnd ?? "Officially recognized.";
  const subheading = data?.subheading ?? "Four Global Awards. One agency that earned them all.";

  const awards =
    data?.items?.length
      ? data.items.map((item) => ({
          image: item.image?.url,
          text: item.title ?? "",
          year: item.yearLabel ?? "Clutch 2026",
        }))
      : defaultAwards.map((a) => ({ ...a, image: undefined as string | undefined }));

  const defaultAwardImages = [ClutchDeveloper, ClutchPpc, ClutchMarketing, ClutchSeo];

  return (
    <section className="relative py-14 lg:py-24 overflow-hidden">
      <Image src={MapImage} alt="" fill className="hidden lg:block object-cover object-top opacity-50 pointer-events-none" />
      <Image src={MapMobile} alt="" fill className="block lg:hidden object-contain object-top opacity-60 pointer-events-none" />

      <div className="container relative z-10">
        <div className="mb-8 lg:mb-16">
          <h2 className="text-white font-medium leading-[1.1]" style={{ fontSize: "clamp(32px, 3.3vw, 60px)", letterSpacing: "-0.05em" }}>
            <span>{headingMain} </span>
            <em className="italic text-white/60">{headingEmphasis}</em>
            <Image src={Asterisk} alt="*" width={52} height={52} className="inline-block ml-3" style={{ verticalAlign: "middle" }} />
            <br />
            {headingEnd}
          </h2>
          <p className="text-white/50 font-normal mt-5 leading-normal" style={{ fontSize: "18px", letterSpacing: "-0.03em" }}>
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.map((award, index) => (
            <div key={`${award.text}-${index}`} className="relative rounded-[20px] overflow-hidden p-3.25 lg:p-8 flex flex-col items-start gap-5">
              <Image src={ClutchBg} alt="" fill className="object-cover object-center" />
              <div className="relative w-full items-center z-10 flex flex-col gap-3 lg:gap-4">
                {award.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={award.image} alt={award.text} className="object-contain w-17 lg:w-25 h-auto" />
                ) : (
                  <Image src={defaultAwardImages[index] ?? ClutchDeveloper} alt={award.text} width={100} height={120} className="object-contain w-17 lg:w-25 h-auto" />
                )}
                <div>
                  <p className="text-white font-semibold leading-tight text-center" style={{ fontSize: "clamp(14px, 1.5vw, 24px)", letterSpacing: "-0.04em" }}>
                    {award.year}
                  </p>
                  <p className="text-white font-normal mt-1 text-center" style={{ fontSize: "clamp(10px, 1vw, 16px)", letterSpacing: "-0.03em" }}>
                    {award.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
