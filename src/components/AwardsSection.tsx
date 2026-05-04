import Image from "next/image";
import Asterisk from "@/assets/asteric.png";
import MapImage from "@/assets/map-image.png";
import ClutchBg from "@/assets/clutch-bg.png";
import ClutchDeveloper from "@/assets/clutch-developer.png";
import ClutchPpc from "@/assets/clutch-ppc.png";
import ClutchMarketing from "@/assets/clutch-marketing.png";
import ClutchSeo from "@/assets/clutch-seo.png";

const awards = [
  { image: ClutchDeveloper, text: "Top Web Developers" },
  { image: ClutchPpc,       text: "Top PPC Company" },
  { image: ClutchMarketing, text: "Top Digital Marketing Company" },
  { image: ClutchSeo,       text: "Top SEO Company" },
];

export default function AwardsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Map background */}
      <Image
        src={MapImage}
        alt=""
        fill
        className="object-cover object-center opacity-50 pointer-events-none"
      />

      <div className="container relative z-10">
        {/* Heading block */}
        <div className="mb-16">
          <h2
            className="text-white font-medium leading-[1.1]"
            style={{ fontSize: "64px", letterSpacing: "-0.05em" }}
          >
            <span>Not just </span>
            <em className="italic text-white/60">Trusted.</em>
            <Image
              src={Asterisk}
              alt="*"
              width={52}
              height={52}
              className="inline-block ml-3"
              style={{ verticalAlign: "middle" }}
            />
            <br />
            Officially recognized.
          </h2>

          <p
            className="text-white/50 font-normal mt-5 leading-normal"
            style={{ fontSize: "18px", letterSpacing: "-0.03em" }}
          >
            Four Global Awards. One agency that earned them all.
          </p>
        </div>

        {/* Award cards */}
        <div className="grid grid-cols-4 gap-5">
          {awards.map((award) => (
            <div key={award.text} className="relative  rounded-[20px] overflow-hidden p-8 flex flex-col items-start gap-5">
              {/* Card background */}
              <Image
                src={ClutchBg}
                alt=""
                fill
                className="object-cover object-center"
              />
              <div className="relative w-full items-center z-10 flex flex-col gap-4">
                <Image
                  src={award.image}
                  alt={award.text}
                  width={100}
                  height={120}
                  className="object-contain"
                />
                <div>
                  <p
                    className="text-white font-semibold leading-tight text-center"
                    style={{ fontSize: "34px", letterSpacing: "-0.04em" }}
                  >
                    Clutch 2026
                  </p>
                  <p
                    className="text-white/70 font-normal mt-1 text-center"
                    style={{ fontSize: "16px", letterSpacing: "-0.03em" }}
                  >
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
