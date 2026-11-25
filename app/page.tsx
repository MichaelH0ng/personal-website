"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { content, showProjects } from "@/config/content";
import ShinyText from "@/components/ShinyText";
import GlassCard from "@/components/GlassCard";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type MarqueeLogo = { src: string; org: string; role: string };

// Built from content.ts so role titles always match the Experience page.
const marqueeLogos: MarqueeLogo[] = (() => {
  const seen = new Set<string>();
  const all = [
    ...content.experience.map((e) => ({ src: e.logo, org: e.company, role: e.title })),
    ...content.leadership.map((l) => ({ src: l.logo, org: l.org, role: l.title })),
  ];
  return all.filter((l) => {
    if (seen.has(l.src)) return false;
    seen.add(l.src);
    return true;
  });
})();

function MarqueeCard({ logo, hidden }: { logo: MarqueeLogo; hidden?: boolean }) {
  return (
    <div className="flex items-center gap-6 px-6" aria-hidden={hidden || undefined}>
      <div className="group relative flex flex-col items-center">
        {/* Tooltip shows on hover and keyboard focus */}
        <div className="absolute bottom-full mb-3 flex flex-col items-center pointer-events-none z-50 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          <div className="bg-white text-gray-900 rounded-xl px-3 py-2 shadow-xl border border-gray-100 whitespace-nowrap">
            <p className="text-xs font-semibold leading-tight">{logo.org}</p>
            <p className="text-xs text-green-700 font-medium leading-tight">{logo.role}</p>
          </div>
          <div className="w-2.5 h-2.5 bg-white border-r border-b border-gray-100 rotate-45 -mt-[5px]" />
        </div>

        <div
          tabIndex={hidden ? -1 : 0}
          className="bg-white rounded-xl px-4 py-2 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
          style={{ minWidth: 80, height: 44 }}
        >
          <Image
            src={logo.src}
            alt={hidden ? "" : `${logo.org}, ${logo.role}`}
            width={64}
            height={32}
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
      <span className="text-green-300 text-xs" aria-hidden="true">✦</span>
    </div>
  );
}

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

const exploreCards = [
  {
    href: "/about",
    label: "About Me",
    description: "Who I am, my interests & story",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/experience",
    label: "Experience",
    description: "My work, education & skills",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  ...(showProjects
    ? [
        {
          href: "/projects",
          label: "Projects",
          description: "Music I've written & produced",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          ),
        },
      ]
    : []),
  {
    href: "/contact",
    label: "Contact",
    description: "Let's start a conversation",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0px", shouldReduceMotion ? "0px" : "-60px"]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 py-12 lg:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* Headshot */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              style={{ y: photoY }}
              className="flex justify-center"
            >
              <div className="relative flex items-center justify-center">
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

                <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden z-10">
                  <Image
                    src="/MichaelHong_OCOBHeadshot.jpeg"
                    alt="Michael Hong"
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 224px"
                    className="object-cover object-[center_10%]"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Hero text */}
            <GlassCard className="flex flex-col justify-center px-8 py-8 bg-green-950/55 border-green-400/20">
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.25em] mb-4"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              >
                <ShinyText text="Welcome" color="#4ade80" shineColor="#ffffff" speed={4} />
              </motion.p>

              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              >
                Hi, I&apos;m{" "}
                <span
                  className="bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent italic pr-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <TypewriterName text={content.name} reduceMotion={shouldReduceMotion} />
                </span>
              </motion.h1>

              <motion.p
                className="text-base text-green-100 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              >
                {content.tagline}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              >
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 active:scale-[0.97] text-black font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  View My Experience
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-green-400/50 text-green-300 hover:bg-green-500/10 active:scale-[0.97] text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Marquee banner. Pauses on hover or focus. */}
      <section
        aria-label="Organizations I have worked with"
        className="marquee relative border-y border-green-400/30 bg-gradient-to-r from-green-900 via-green-800 to-green-900 pt-4 pb-5"
      >
        <div style={{ overflowX: "clip", overflowY: "visible" }}>
          <div className={cn("marquee-track flex w-max items-center", shouldReduceMotion && "marquee-static")}>
            {marqueeLogos.map((logo) => (
              <MarqueeCard key={logo.src} logo={logo} />
            ))}
            {marqueeLogos.map((logo) => (
              <MarqueeCard key={`${logo.src}-copy`} logo={logo} hidden />
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="relative pt-20 pb-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <SectionHeading title="Explore" align="center" className="mb-10" />

          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-stretch",
              exploreCards.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            )}
          >
            {exploreCards.map((card, i) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="h-full"
              >
                <Link
                  href={card.href}
                  className="group flex items-center gap-4 h-full rounded-2xl border border-green-500/30 bg-black/55 backdrop-blur-sm px-5 py-5 transition-colors hover:border-green-400/60 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center text-white flex-shrink-0">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-white group-hover:text-green-300 transition-colors font-semibold text-sm">{card.label}</p>
                    <p className="text-xs text-muted mt-0.5 leading-snug line-clamp-2">{card.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-white group-hover:text-green-300 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
