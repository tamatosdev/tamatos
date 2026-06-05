import Image from "next/image";
import img1 from "@/assets/about marquee/1.png";
import img2 from "@/assets/about marquee/2.png";
import img3 from "@/assets/about marquee/3.png";
import img4 from "@/assets/about marquee/4.png";
import img5 from "@/assets/about marquee/5.png";
import img6 from "@/assets/about marquee/6.png";
import img7 from "@/assets/about marquee/7.png";
import img8 from "@/assets/about marquee/8.png";
import img9 from "@/assets/about marquee/9.png";
import img10 from "@/assets/about marquee/10.png";
import img11 from "@/assets/about marquee/11.png";
import img12 from "@/assets/about marquee/12.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

export default function AboutMarquee() {
  return (
    <section className="py-12 lg:py-20 overflow-hidden">
      <div className="flex items-center w-max animate-marquee gap-4">
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl overflow-hidden"
            style={{ width: "clamp(220px, 22vw, 340px)" }}
          >
            <Image
              src={img}
              alt=""
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
