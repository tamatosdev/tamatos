"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import silverArrow from "@/assets/silver-arrow.png";
import directionUnderline from "@/assets/direction-underline.svg";

export default function DigitalGoalsCtaSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.35 });

  return (
    <section className="relative overflow-x-clip pb-10 lg:pb-14">
      <div className="container relative">
        <div className="mx-auto max-w-[1100px]">
          {/* Same structure as DesignStrategyCta — arrow bottom-left, text beside it */}
          <div
            ref={cardRef}
            className="flex overflow-hidden rounded-[20px] bg-gradient-to-r from-[#E9EDF5] to-white lg:rounded-[24px]"
          >
            <div className="flex shrink-0 items-end self-stretch pl-6 lg:pl-10">
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
                style={{ fontSize: "16px" }}
              >
                This enables us to create marketing strategies that are purposeful, measurable, and
                built around real business outcomes. Because great marketing isn&apos;t about chasing
                trends, it&apos;s about{" "}
                <span className="relative inline font-semibold text-[#0A0A0C]">
                  building sustainable growth.
                  <Image
                    src={directionUnderline}
                    alt=""
                    width={280}
                    height={12}
                    aria-hidden
                    className="pointer-events-none absolute -bottom-0.5 left-0 h-[10px] w-[105%] max-w-none object-cover object-left"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(86%) sepia(47%) saturate(519%) hue-rotate(41deg) brightness(103%) contrast(94%)",
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
