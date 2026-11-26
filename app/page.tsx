"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { content } from "@/config/content";
import GlassCard from "@/components/GlassCard";
import FeaturedWork from "@/components/FeaturedWork";

/** Types the name in as a flourish. The full name is always in the DOM for screen readers and no-JS. */
function TypewriterName({ text, reduceMotion }: { text: string; reduceMotion: boolean }) {
  const [displayed, setDisplayed] = useState(text);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    const startId = setTimeout(() => {
      setDisplayed("");
      setDone(false);
    }, 0);
    const id = setInterval(() => {
      if (i < text.length) {
        i++;
        setDisplayed(text.slice(0, i));
      } else {
        clearInterval(id);
        setDone(true);
      }
    }, 120);
    return () => {
      clearTimeout(startId);
      clearInterval(id);
    };
  }, [text, reduceMotion]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {reduceMotion ? text : displayed}
        {!done && !reduceMotion && <span className="animate-pulse text-green-400">|</span>}
      </span>
    </>
  );
}


const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

const primaryBtn =
  "inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 active:scale-[0.97] text-black font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function Home() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    // One container and one spacing rhythm for every section keeps the page feeling like a single piece.
    <div className="max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 pt-8 lg:pt-12 pb-24 space-y-20 lg:space-y-24">
      {/* Hero + Featured Work: side by side on wide screens, stacked below that */}
      <div className="grid xl:grid-cols-2 gap-8 xl:gap-6 items-stretch">
        <section>
          <GlassCard className="h-full flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 lg:py-16 xl:px-10 xl:py-8">
            <div className="grid lg:grid-cols-[auto_1fr] xl:grid-cols-1 gap-10 lg:gap-16 xl:gap-6 items-center">
              {/* Headshot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative justify-self-center flex items-center justify-center"
              >
                <div className="absolute -inset-8 -z-10 rounded-full bg-green-400 opacity-20 blur-3xl" aria-hidden="true" />

                {/* Spinning ring */}
                <div
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{
                    width: "calc(100% + 12px)",
                    height: "calc(100% + 12px)",
                    background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.9) 20%, white 35%, transparent 50%, rgba(255,255,255,0.6) 70%, white 85%, transparent 100%)",
                    animation: shouldReduceMotion ? "none" : "spin-ccw 3.5s linear infinite",
                  }}
                />

                <div className="relative w-48 h-48 sm:w-72 sm:h-72 lg:w-[22rem] lg:h-[22rem] xl:w-52 xl:h-52 2xl:w-64 2xl:h-64 rounded-full overflow-hidden z-10">
                  <Image
                    src="/MichaelHong_OCOBHeadshot.jpeg"
                    alt="Michael Hong"
                    fill
                    sizes="(min-width: 1536px) 256px, (min-width: 1280px) 208px, (min-width: 1024px) 352px, (min-width: 640px) 288px, 192px"
                    className="object-cover object-[center_10%]"
                    priority
                  />
                </div>
              </motion.div>

              {/* Hero text */}
              <div className="text-center lg:text-left xl:text-center">
                <motion.p
                  className="text-sm sm:text-base font-medium text-green-300 mb-3 text-balance"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
                >
                  {content.hero.eyebrow}
                </motion.p>

                <motion.h1
                  className="whitespace-nowrap text-[1.625rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-5xl 2xl:text-[3.5rem] font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                >
                  Hi, I&apos;m{" "}
                  <span
                    className="bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent italic pr-2 box-decoration-clone"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    <TypewriterName text={content.name} reduceMotion={shouldReduceMotion} />
                  </span>
                </motion.h1>

                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                >
                  <p className="text-base text-muted leading-relaxed max-w-[60ch] mx-auto lg:mx-0 xl:mx-auto">{content.about.homeBio}</p>
                </motion.div>

              </div>
            </div>
          </GlassCard>
        </section>

        {/* Right column: Featured Work, then Let's connect filling the rest of the height */}
        <div className="flex flex-col gap-8 xl:gap-6">
          <FeaturedWork />

          {/* Contact call to action */}
          <motion.section {...reveal} className="xl:flex-1">
            <GlassCard className="relative overflow-hidden h-full p-8 sm:p-10 xl:p-8 flex flex-col justify-center gap-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-green-500/15 blur-3xl"
              />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Let&apos;s connect.</h2>
                <p className="mt-2 text-muted max-w-lg">
                  Always happy to chat about music tech, consulting, or new opportunities.
                </p>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <a href={`mailto:${content.email}`} className={primaryBtn}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
                <a href={content.linkedin} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </GlassCard>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
