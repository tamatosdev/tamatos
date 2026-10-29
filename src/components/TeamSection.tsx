"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import BodyBgOnView from "@/components/BodyBgOnView";
import orangeStar from "@/assets/orange-star.png";
import nabeel from "@/assets/Team images/nabeel-danish.png";
import akbar from "@/assets/Team images/akbar.png";
import ali from "@/assets/Team images/ali asad.png";
import sadat from "@/assets/Team images/sadat.png";
import shehroz from "@/assets/Team images/shehroz.png";
import muneer from "@/assets/Team images/muneer.png";
import mina from "@/assets/Team images/mina.png";
import maheen from "@/assets/Team images/maheen.png";
import hammad from "@/assets/Team images/hammad.png";
import shahzaib from "@/assets/Team images/shahzaib.png";
import rayyan from "@/assets/Team images/rayyan.png";
import huzaifa from "@/assets/Team images/huzaifa.png";
import ebad from "@/assets/Team images/ebad.png";
import ahmed from "@/assets/Team images/ahmed.png";

const team = [
  { name: "Nabeel D.",  role: "Co-Founder & CEO",         image: nabeel   },
  { name: "Akbar G.",   role: "Business Director",        image: akbar    },
  { name: "Ali A.",     role: "Head of Development",      image: ali      },
  { name: "Sadat S.",   role: "Sr. UX/UI Designer",       image: sadat    },
  { name: "Shehroz K.", role: "Sr. Web Developer",        image: shehroz  },
  { name: "Muneer S.",  role: "Sr. Visualizer",           image: muneer   },
  { name: "Mina H.",    role: "Content Strategist",       image: mina     },
  { name: "Hammad R.",  role: "SEO Lead",                 image: hammad   },
  { name: "Mahin K.",   role: "Account Manager",          image: maheen   },
  { name: "Shahzaib",   role: "Sr. Software Engineer",    image: shahzaib },
  { name: "Rayyan R.",  role: "SEO & Content Executive",  image: rayyan   },
  { name: "Huzaifa S.", role: "Web Developer",            image: huzaifa  },
  { name: "Ebad K.",    role: "Jr. Web Developer",        image: ebad     },
  { name: "Ahmad M.",   role: "Jr. UX/UI Designer",       image: ahmed    },
];

/* Each desktop column gets a unique y range for parallax */
const colYRanges: [number, number][] = [
  [60, -60],
  [-60, 60],
  [40, -40],
  [-40, 40],
];

/** Desktop column for each card: rows of four, with the last two centred under columns 2–3. */
const desktopColumn = (index: number) => (index < 12 ? index % 4 : index - 11);

/*
 * Columns 2 and 4 sit lower than 1 and 3. Margin percentages resolve against the
 * card width, so the step stays proportional at every size.
 */
function staggerClass(index: number) {
  const mobile = index % 2 === 1 ? "mt-[14%]" : "mt-0";
  const desktop = desktopColumn(index) % 2 === 1 ? "lg:mt-[14%]" : "lg:mt-0";
  return `${mobile} ${desktop}`;
}

function TeamCard({
  member,
  index,
  scrollYProgress,
  parallax,
}: {
  member: (typeof team)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  parallax: boolean;
}) {
  const column = desktopColumn(index);
  const y = useTransform(scrollYProgress, [0, 1], parallax ? colYRanges[column] : [0, 0]);

  return (
    <motion.div
      style={{ y }}
      className={`relative rounded-2xl overflow-hidden ${staggerClass(index)} ${index === 12 ? "lg:col-start-2" : ""}`}
    >
      <div className="relative w-full" style={{ aspectRatio: "345 / 467" }}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 260px, 50vw"
          className="object-cover object-top"
        />
      </div>

      <div
        className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between items-start gap-2"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "#00000005",
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid #ffffff2b",
        }}
      >
        <span
          className="text-white font-semibold leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(11px, 1vw, 16px)" }}
        >
          {member.name}
        </span>
        <span
          className="shrink-0 bg-white text-[#0A0A0C] font-medium rounded-full px-2.5 py-1.5 leading-none"
          style={{ fontSize: "clamp(10px, 0.8vw, 14px)" }}
        >
          {member.role}
        </span>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <BodyBgOnView
      color="#FFFFFF"
      className="py-14 lg:py-24 overflow-hidden"
      threshold={0.2}
    >
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="text-[#0A0A0C] font-medium leading-[1.15]"
            style={{ fontSize: "clamp(28.44px, 3.5vw, 50.06px)", letterSpacing: "-0.04em" }}
          >
            The people{" "}
            <Image
              src={orangeStar}
              alt=""
              className="inline-block h-[0.75em] w-auto mx-1"
              style={{ verticalAlign: "middle" }}
            />{" "}
            <em className="italic text-[#0A0A0C]/50">behind</em> Tamatos
            <span className="text-[#FF6A00]">.</span>
          </h2>
          <p
            className="mt-4 text-[#0A0A0C]/55 font-normal leading-relaxed mx-auto"
            style={{ fontSize: "clamp(16px, 1.15vw, 18px)", letterSpacing: "-0.02em" }}
          >
            A team of designers, developers, strategists and marketers who like making things
            better.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-start"
        >
          {team.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
              scrollYProgress={scrollYProgress}
              parallax={!reduceMotion}
            />
          ))}
        </div>
      </div>
    </BodyBgOnView>
  );
}
