"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/config/content";
import ShinyText from "@/components/ShinyText";

function MarqueeCard({ logo }: { logo: { src: string; alt: string; role: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex items-center gap-6 px-6">
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Tooltip above the card */}
        <div
          className="absolute bottom-full mb-3 flex flex-col items-center transition-all duration-300 pointer-events-none z-50"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
        >
          <div className="bg-white text-gray-900 rounded-xl px-3 py-2 shadow-xl border border-gray-100 whitespace-nowrap">
            <p className="text-xs font-semibold leading-tight">{logo.alt}</p>
            <p className="text-[10px] text-green-600 font-medium leading-tight">{logo.role}</p>
          </div>
          <div className="w-2.5 h-2.5 bg-white border-r border-b border-gray-100 rotate-45 -mt-[5px]" />
        </div>

        {/* Logo card */}
        <div className="bg-white rounded-xl px-4 py-2 shadow-sm flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-105" style={{ minWidth: 80, height: 44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain" />
        </div>
      </div>
      <span className="text-green-400 text-xs">✦</span>
    </div>
  );
}

function TypewriterName({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, 150);
    return () => clearInterval(id);
  }, [text]);

  return <>{displayed}<span className="animate-pulse">|</span></>;
}

const marqueeLogos = [
  { src: "/logos/amazon.jpeg",    alt: "Amazon",                                        role: "Area Manager Intern" },
  { src: "/logos/protiviti.jpeg", alt: "Protiviti",                                     role: "Technology Consulting Intern" },
  { src: "/logos/calpoly.jpeg",   alt: "Cal Poly Admissions",                           role: "Recruitment Ambassador" },
  { src: "/logos/acorns.jpeg",    alt: "Acorns",                                        role: "Campus Ambassador" },
  { src: "/logos/doordash.jpeg",  alt: "DoorDash",                                      role: "Campus Events Launcher" },
  { src: "/logos/ocob.jpeg",      alt: "Orfalea College of Business - Student Ambassadors", role: "President" },
  { src: "/logos/akpsi.jpeg",     alt: "Alpha Kappa Psi",                               role: "Executive Vice President" },
  { src: "/logos/skyhawks.jpeg",  alt: "Skyhawks",                                      role: "Program Director" },
  { src: "/logos/tifa.jpeg",      alt: "Tifa Chocolate & Gelato",                       role: "Lead Social Media Marketing Intern" },
  { src: "/logos/leland.png",     alt: "Leland",                                        role: "Campus Growth Director" },
];

const exploreCards = [
  {
    href: "/about",
    label: "About Me",
    description: "Who I am, my interests & story",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/experience",
    label: "Experience",
    description: "My work, education & skills",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "Contact Me",
    description: "Let's start a conversation",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoY      = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const textY       = useTransform(scrollYProgress, [0, 1], ["0px",  "60px"]);
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const heroRotate  = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Split tagline at first sentence
  const taglineDotIdx = content.tagline.indexOf(". ") + 1;
  const taglineFirst = content.tagline.slice(0, taglineDotIdx);
  const taglineRest  = content.tagline.slice(taglineDotIdx).trim();

  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">

        {/* Hero */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">

          <div className="relative max-w-6xl mx-auto px-6 py-12 lg:py-24 w-full">
            <motion.div
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              style={{ scale: heroScale, rotate: heroRotate, opacity: heroOpacity }}
            >

              {/* Left — Headshot */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                style={{ y: photoY }}
                className="flex justify-center"
              >
                <div className="relative flex items-center justify-center">
                  {/* Pulsing glow */}
                  <div className="absolute -inset-8 -z-10 rounded-full bg-green-400 opacity-25 blur-3xl" />

                  {/* Spinning ring */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "calc(100% + 12px)",
                      height: "calc(100% + 12px)",
                      background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.9) 20%, white 35%, transparent 50%, rgba(255,255,255,0.6) 70%, white 85%, transparent 100%)",
                      animation: "spin-ccw 3.5s linear infinite",
                    }}
                  />

                  {/* Photo */}
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden z-10">
                    <Image
                      src="/MichaelHong_OCOBHeadshot.jpeg"
                      alt="Michael Hong"
                      fill
                      className="object-cover object-[center_10%]"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right — Hero text */}
              <motion.div style={{ y: textY }} className="flex flex-col justify-center rounded-2xl px-8 py-7 bg-green-950/55 border border-green-400/20 backdrop-blur-sm">
                {/* Top bar */}
                <motion.div
                  className="h-[4px] rounded-full mb-5"
                  style={{ background: "linear-gradient(to right, transparent 0%, #4ade80 30%, #4ade80 70%, transparent 100%)", originX: 0.5 }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
                />

                <motion.p
                  className="text-xl font-semibold uppercase tracking-widest mb-5"
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
                  <span className="bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-pinyon-script)" }}>
                    <TypewriterName text={content.name} />
                  </span>
                </motion.h1>

                {/* Split tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                  className="mb-6"
                >
                  <p className="text-base text-green-100 leading-relaxed">{taglineFirst}</p>
                  {taglineRest && (
                    <p className="text-sm text-white leading-relaxed mt-2">{taglineRest}</p>
                  )}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                >
                  <Link
                    href="/experience"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 active:scale-[0.97] text-black font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    View My Experience
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-green-500/40 text-green-400 hover:bg-green-500/10 active:scale-[0.97] text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    Get in Touch
                  </Link>
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                  className="h-[4px] rounded-full"
                  style={{ background: "linear-gradient(to right, transparent 0%, #4ade80 30%, #4ade80 70%, transparent 100%)", originX: 0.5 }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-green-400/50">Scroll</p>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-5 h-5 text-green-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Divider: hero → banner */}
        <motion.div
          className="h-[4px] bg-gradient-to-r from-transparent via-green-400 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ originX: 0.5 }}
        />

        {/* Marquee banner */}
        <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-green-900 pt-4 pb-5">
          <div style={{ overflowX: "clip", overflowY: "visible" }}>
            <motion.div
              className="flex w-max items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              {[...marqueeLogos, ...marqueeLogos].map((logo, i) => (
                <MarqueeCard key={i} logo={logo} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider: banner → explore */}
        <motion.div
          className="h-[4px] bg-gradient-to-r from-transparent via-green-400 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ originX: 0.5 }}
        />

        {/* Explore */}
        <section className="relative pt-20 pb-12 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center relative z-10 isolate">
            <motion.div
              className="flex flex-col items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-3xl font-bold"><ShinyText text="Explore" color="#ffffff" shineColor="#4ade80" speed={4} /></h2>
              <motion.div
                className="h-0.5 w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-3"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ originX: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              {exploreCards.map((card, i) => (
                <motion.div
                  key={card.href}
                  className="rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(74,222,128,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link href={card.href} className="flex items-center gap-4 group px-5 py-5 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-white group-hover:text-green-400 transition-colors font-semibold text-sm">{card.label}</p>
                    </div>
                    <svg className="w-4 h-4 text-white group-hover:text-green-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider: explore → footer */}
        <motion.div
          className="h-[4px] bg-gradient-to-r from-transparent via-green-400 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ originX: 0.5 }}
        />
      </main>
      <Footer />
    </>
  );
}
