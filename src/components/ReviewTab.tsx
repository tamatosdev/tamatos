"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import myzoiLogo from "@/assets/myzoi-logo.svg";
import rcsiLogo from "@/assets/rcsi-logo.svg";
import aladdinLogo from "@/assets/aladin-logo.svg";
import techcraftersLogo from "@/assets/tc-logo.svg";
import sukaina from "@/assets/sukaina.png";
import asmik from "@/assets/asmik.png";
import salman from "@/assets/salman-malik.png";
import yumna from "@/assets/yumna.png";



const testimonials = [
  {
    id: 1,
    logo: myzoiLogo,
    content:
     <>Tamatos have done a {" "}
     <span className="italic text-[#0A0A0CB2] / 70">fantastic job </span>{" "}
     at understanding the ethos of myZoi and then reflected this in our web design that’s purpose and consumer led!{" "} 
     <span className="italic text-[#0A0A0CB2] / 70">Thank you Team Tamatos </span></>
      ,
    author: "Asmik Akopyan",
    role: "Head of Brand & Marketing, myZoi Financial Inclusion Technologies",
    image: asmik,
     bgColor: "#9DF560",
  },
  {
    id: 2,
    logo: rcsiLogo,
    content:
    <>It is my pleasure to share my experience of working with Tamatos. {" "}
    <span className="italic text-[#0A0A0CB2] / 70">The entire team were professional,</span> {" "}
     knowledgeable, and easy to work with. They listened carefully to our needs and provided us with an {" "}
     <span className="italic text-[#0A0A0CB2] / 70">excellent website</span>{" "} that exceeded our expectations. I would highly recommend Tamatos.  </>
      ,
    author: "Salman Malik",
    role: "General Manager, Royal Canadian Steel Inc.",
    image: salman,
    bgColor: "#FC7031",
  },
  {
    id: 3,
    logo: aladdinLogo,
    content:
    <> 
    <span className="italic text-[#0A0A0CB2] / 70">Loved working with Tamatos.</span>{" "} 
    Passionate, Customer Driven and Professional, the team was great in understanding what we needed as well as challenging us where required. The result is a {" "}
    <span className="italic text-[#0A0A0CB2] / 70">website that we are proud of.</span>
     </>
      ,
    author: "Sukaina Pasha",
    role: "COO & Co-Founder, Aladdin Informatics Pvt. Ltd.",
    image: sukaina,
    bgColor: "#03E4AC",
  },
  {
    id: 4,
    logo: techcraftersLogo,
    content:
    <>  
    I’d like to recommend the{" "}
     <span className="italic text-[#0A0A0CB2] / 70">outstanding services</span>{" "} 
     of the Tamatos team. Thanks for creating a complaint tracker for our organization with such a seamless flow. The platform has greatly improved our operations and {" "}
     <span className="italic text-[#0A0A0CB2] / 70">employee satisfaction</span>.
    </>
      ,
    author: "Yumna Dadabhoy",
    role: "President and CEO, Tech Crafters Ltd. Company",
    image: yumna,
      bgColor: "#8C52FF",
  },
];

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const nextSlide = () => {
    setActiveTab((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveTab(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className=" py-[120px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5">
        
        {/* Heading */}
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-white text-[36px] leading-[1.05] font-semibold tracking-[-0.04em]">
            Verified{" "}
            <span className="text-[#9DF560]">reviews</span> From{" "}
            <span className="italic text-white/70">Real Clients</span>
            <br />
            That Hold us Accountable
            <span className="text-[#9DF560]">.</span>
          </h2>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 pt-[80px]">

          {/* Tabs */}
          <div className="flex flex-col gap-5">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`h-[110px] rounded-[24px] border transition-all duration-500 flex items-center justify-center px-10 backdrop-blur-xl
                ${
                  activeTab === index
                    ? "border-white/20 bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
               
                <Image
                  src={item.logo}
                  alt=""
                  className="max-h-[55px] object-contain"
                />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="relative rounded-[34px] overflow-hidden p-[50px] min-h-[500px]"
          style={{
               backgroundColor: testimonials[activeTab].bgColor,
           }}
          >
            
            {/* Animated Content */}
            <div
              key={activeTab}
              className="animate-[moveUp_.5s_ease] flex flex-col justify-between h-full"
            >
              <p className="text-[#0A0A0C] text-[36px] font-medium leading-[1.3] tracking-[-0.04em] max-w-[1000px]">
                {testimonials[activeTab].content}
              </p>

              {/* Border */}
              {/* <div className="w-full h-[1px] bg-black/30 mt-[60px] mb-[20px]" /> */}

              {/* Footer */}
              <div className="flex items-end justify-between gap-10 border-t border-[#0A0A0C]/30 pt-5">

                {/* Author */}
                <div className="flex items-center gap-5 ">
               
                  <Image
                    src={testimonials[activeTab].image}
                    alt=""
                    className="max-h-[71px] object-contain"
                  />

                  <div>
                    <h4 className="text-[#0A0A0C] text-[24px] italic font-medium leading-none">
                      {testimonials[activeTab].author}
                    </h4>

                    <p className="text-[#0A0A0C]/70 text-[18px]">
                      {testimonials[activeTab].role}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-[56px] h-[56px] rounded-full bg-black/10 hover:bg-black text-black flex items-center justify-center transition-all duration-300 hover:text-white"
                  >
                    <ArrowLeft size={24} />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="w-[56px] h-[56px] rounded-full bg-black/10 hover:bg-black text-black flex items-center justify-center transition-all duration-300 hover:text-white"
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes moveUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}