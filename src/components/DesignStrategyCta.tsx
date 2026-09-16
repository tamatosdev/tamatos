"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import silverArrow from "@/assets/silver-arrow.png";
import directionUnderline from "@/assets/direction-underline.svg";

export default function DesignStrategyCta() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.35 });

  return (
    <div className="mx-auto mt-10 max-w-[1100px] lg:mt-12">
      <div
        ref={cardRef}
        className="flex overflow-hidden rounded-[20px] bg-[#E9EDF5]"
      >
        <div className="flex shrink-0 items-end self-stretch pl-4 sm:pl-6 lg:pl-10">
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
              className="block h-auto w-[72px] object-contain sm:w-[96px] lg:w-[120px]"
            />
          </motion.div>
        </div>

        <p className="flex-1 px-4 py-6 text-[18px] font-medium leading-[1.35] tracking-[-0.03em] text-[#0A0A0C]/85 sm:px-6 sm:py-8 sm:text-[20px] lg:px-10 lg:py-10 lg:text-[23.11px]">
          Only once we understand the business do we begin designing the brand. Because great
          branding isn&apos;t decoration,{" "}
          <span className="relative inline font-semibold text-[#0A0A0C]">
            it&apos;s direction.
            <Image
              src={directionUnderline}
              alt=""
              width={180}
              height={12}
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 left-0 h-[10px] w-[105%] max-w-none object-cover object-left"
            />
          </span>
        </p>
      </div>
    </div>
  );
}
