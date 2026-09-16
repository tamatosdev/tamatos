import Image from "next/image";
import Asterisk from "@/assets/asteric.png";
import Clutch5Star from "@/assets/clutch-5star.png";
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
  const cmsHeading = data?.headingMain?.trim();
  const heading =
    !cmsHeading || cmsHeading === "Not just"
      ? "We Don't Like To Brag But..."
      : cmsHeading;

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
      <Image src={MapImage} alt="" fill className="hidden lg:block object-cover object-top opacity-80 pointer-events-none" />
      <Image src={MapMobile} alt="" fill className="block lg:hidden object-contain object-top opacity-60 pointer-events-none" />

      <div className="container relative z-10">
        <div className="mb-8 lg:mb-16 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2
            className="text-white font-medium leading-[1.1] max-w-[18ch] sm:max-w-none"
            style={{ fontSize: "clamp(28.44px, 3.3vw, 50.06px)", letterSpacing: "-0.05em" }}
          >
            {heading}
            <Image
              src={Asterisk}
              alt=""
              width={52}
              height={52}
              className="inline-block ml-2 lg:ml-3 w-7 sm:w-9 lg:w-[52px] h-auto"
              style={{ verticalAlign: "middle" }}
            />
          </h2>

          <Image
            src={Clutch5Star}
            alt="Clutch 5/5"
            width={160}
            height={72}
            className="h-10 w-auto object-contain sm:h-12 lg:h-14 shrink-0 self-start sm:mt-1"
          />
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
                  <p className="text-white font-semibold leading-tight text-center" style={{ fontSize: "clamp(18px, 1.5vw, 21.33px)", letterSpacing: "-0.04em" }}>
                    {award.year}
                  </p>
                  <p className="text-white font-normal mt-1 text-center" style={{ fontSize: "clamp(18px, 1vw, 18px)", letterSpacing: "-0.03em" }}>
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
