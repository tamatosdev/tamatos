"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import silverArrow from "@/assets/silver-arrow.png";
import directionUnderline from "@/assets/direction-underline.svg";

export default function DevelopmentGoalsCtaSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.35 });

  return (
    <section className="relative overflow-x-clip pb-10 lg:pb-14">
      <div className="container relative">
        <div className="mx-auto max-w-[1100px]">
          <div
            ref={cardRef}
            className="relative flex overflow-hidden rounded-[20px] bg-gradient-to-r from-[#E9EDF5] to-white pb-[60px] lg:rounded-[24px] lg:pb-0"
          >
            <div className="absolute bottom-0 left-6 z-10 lg:static lg:flex lg:shrink-0 lg:items-end lg:self-stretch lg:pl-10 lg:left-auto">
              <motion.div
                initial={{ y: 90 }}
                animate={isInView ? { y: 0 } : { y: 90 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={silverArrow}
                  alt=""
                  width={130}
                  height={130}
                  className="block h-auto w-[96px] object-contain lg:w-[120px]"
                />
              </motion.div>
            </div>

            <div className="flex flex-1 items-center px-6 py-8 lg:px-10 lg:py-10">
              <p
                className="font-medium leading-[1.45] tracking-[-0.02em] text-[#0A0A0C]/85"
                style={{ fontSize: "18px" }}
              >
                This enables us to build digital products that are intuitive, scalable, and aligned
                with measurable business outcomes. Because great development isn&apos;t about writing
                code - It&apos;s about{" "}
                <span className="relative inline font-semibold text-[#0A0A0C]">
                  solving business problems.
                  <Image
                    src={directionUnderline}
                    alt=""
                    width={280}
                    height={12}
                    aria-hidden
                    className="pointer-events-none absolute -bottom-0.5 left-0 h-[5px] w-[105%] max-w-none object-cover object-left"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(52%) sepia(78%) saturate(1800%) hue-rotate(346deg) brightness(101%) contrast(98%)",
                    }}
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
