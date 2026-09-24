"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import BodyBgOnView from "@/components/BodyBgOnView";
import orangeStar from "@/assets/orange-star.png";
import nabeel from "@/assets/Team images/nabeel-danish.png";
import akbar from "@/assets/Team images/akbar.png";
import ali from "@/assets/Team images/ali asad.png";
import sadat from "@/assets/Team images/sadat.png";
import shehroz from "@/assets/Team images/shehroz.png";
import shahzaib from "@/assets/Team images/shahzaib.png";
import muneer from "@/assets/Team images/muneer.png";
import huzaifa from "@/assets/Team images/huzaifa.png";
import hammad from "@/assets/Team images/hammad.png";
import rayyan from "@/assets/Team images/rayyan.png";
import maheen from "@/assets/Team images/maheen.png";

const team = [
  { name: "Nabeel D.",    role: "Co-founder & CEO",         image: nabeel   },
  { name: "Akbar G.",     role: "Group Account Manager",    image: akbar    },
  { name: "Ali Asad",     role: "Head of Development",      image: ali      },
  { name: "Sadat",        role: "Sr. UX/UI Designer",       image: sadat    },
  { name: "Shehroz",      role: "Sr. Web Developer",        image: shehroz  },
  { name: "Shahzaib",     role: "Sr. Web Developer",        image: shahzaib },
  { name: "Muneer",       role: "Sr. Graphic Designer",     image: muneer   },
  { name: "Maheen",       role: "Account Manager",          image: maheen   },
  { name: "Huzaifa",      role: "Web Developer",            image: huzaifa  },
  { name: "Hammad Razi",  role: "Sr. SEO Specialist",       image: hammad   },
  { name: "Rayyan",       role: "Content Writer",           image: rayyan   },
];

/* Each column gets a unique y range for parallax */
const colYRanges: [number, number][] = [
  [60, -60],
  [-60, 60],
  [40, -40],
  [-40, 40],
];

function TeamCard({
  member,
  colIndex,
  sectionRef,
}: {
  member: (typeof team)[0];
  colIndex: number;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], colYRanges[colIndex % 4]);

  return (
    <motion.div
      style={{ y }}
      className="relative rounded-2xl overflow-hidden"
    >
      <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
        />
      </div>

      <div
        className="absolute bottom-3 left-3 right-3 flex flex-col items-start gap-2"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "#00000005",
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid #ffffff2b",
        }}
      >
        <span
          className="text-white font-semibold leading-none"
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
            The People{" "}
            <Image
              src={orangeStar}
              alt=""
              className="inline-block h-[0.75em] w-auto mx-1"
              style={{ verticalAlign: "middle" }}
            />{" "}
            <em className="italic text-[#0A0A0C]/50">Behind</em> Tamatos
            <span className="text-[#FF6A00]">.</span>
          </h2>
          <p
            className="mt-4 text-[#0A0A0C]/55 font-normal leading-relaxed mx-auto max-w-2xl"
            style={{ fontSize: "clamp(16px, 1.15vw, 18px)", letterSpacing: "-0.02em" }}
          >
            A team of designers, developers, strategists and marketers who like making things
            <br className="hidden sm:block" />
            better.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 items-start"
        >
          {team.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              colIndex={index % 4}
              sectionRef={sectionRef}
            />
          ))}
        </div>
      </div>
    </BodyBgOnView>
  );
}
