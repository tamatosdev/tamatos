import Image from "next/image";
import ClutchDeveloper from "@/assets/clutch-developer.png";
import ClutchPpc from "@/assets/clutch-ppc.png";
import ClutchMarketing from "@/assets/clutch-marketing.png";
import ClutchSeo from "@/assets/clutch-seo.png";
import type { AwardsData } from "@/lib/home";

const defaultAwards = [
  { image: ClutchDeveloper, title: "Top Web Developers" },
  { image: ClutchPpc, title: "Top PPC Company" },
  { image: ClutchMarketing, title: "Top Digital Marketing Company" },
  { image: ClutchSeo, title: "Top SEO Company" },
];

export default function WorkAwardsSection({ data }: { data?: AwardsData }) {
  const awards =
    data?.items?.length
      ? data.items.map((item, index) => ({
          image: item.image?.url,
          title: item.title ?? defaultAwards[index]?.title ?? "",
          year: item.yearLabel ?? "Clutch 2026",
        }))
      : defaultAwards.map((award) => ({
          image: undefined as string | undefined,
          title: award.title,
          year: "Clutch 2026",
        }));

  const defaultImages = [ClutchDeveloper, ClutchPpc, ClutchMarketing, ClutchSeo];

  return (
    <section className="container py-12 lg:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {awards.map((award, index) => (
          <div
            key={`${award.title}-${index}`}
            className="rounded-[20px] p-4 lg:p-8 min-h-[180px] lg:min-h-[280px] flex flex-col items-center justify-center mix-blend-plus-lighter backdrop-blur-xl border border-white/10"
            style={{
              background: "#FFFFFF0D",
              boxShadow: "inset 5.33px 4px 10px 0px #FFFFFF1A",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-3 lg:gap-4 w-full">
              {award.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={award.image}
                  alt={award.title}
                  className="object-contain w-[72px] lg:w-[100px] h-auto"
                />
              ) : (
                <Image
                  src={defaultImages[index] ?? ClutchDeveloper}
                  alt={award.title}
                  width={100}
                  height={120}
                  className="object-contain w-[72px] lg:w-[100px] h-auto"
                />
              )}

              <div className="text-center">
                <p
                  className="text-white font-semibold leading-tight"
                  style={{ fontSize: "clamp(14px, 1.5vw, 24px)", letterSpacing: "-0.04em" }}
                >
                  {award.year}
                </p>
                <p
                  className="text-white/80 font-normal mt-1"
                  style={{ fontSize: "clamp(11px, 1vw, 16px)", letterSpacing: "-0.03em" }}
                >
                  {award.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
