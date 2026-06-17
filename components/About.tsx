"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { content } from "@/config/content";
import { InterestsPanel } from "@/components/InterestsPanel";
import Masonry from "@/components/Masonry";
import ShinyText from "@/components/ShinyText";

const galleryItems = [
  { id: 1,  img: "/About Me Page/gallery photos/260527-APP-1078_w.jpg", height: 660, url: "/About Me Page/gallery photos/260527-APP-1078_w.jpg" },
  { id: 2,  img: "/About Me Page/gallery photos/DSC00197.jpeg",          height: 440, url: "/About Me Page/gallery photos/DSC00197.jpeg" },
  { id: 3,  img: "/About Me Page/gallery photos/DSCF3744 (1).jpeg",      height: 380, url: "/About Me Page/gallery photos/DSCF3744 (1).jpeg" },
  { id: 4,  img: "/About Me Page/gallery photos/IMG_0797.jpeg",          height: 440, url: "/About Me Page/gallery photos/IMG_0797.jpeg" },
  { id: 5,  img: "/About Me Page/gallery photos/IMG_1739.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_1739.jpeg" },
  { id: 6,  img: "/About Me Page/gallery photos/IMG_1940.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_1940.jpeg" },
  { id: 7,  img: "/About Me Page/gallery photos/IMG_2346.jpeg",          height: 680, url: "/About Me Page/gallery photos/IMG_2346.jpeg" },
  { id: 8,  img: "/About Me Page/gallery photos/IMG_2576.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_2576.jpeg" },
  { id: 9,  img: "/About Me Page/gallery photos/IMG_2750.jpeg",          height: 440, url: "/About Me Page/gallery photos/IMG_2750.jpeg" },
  { id: 10, img: "/About Me Page/gallery photos/IMG_2774.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_2774.jpeg" },
  { id: 11, img: "/About Me Page/gallery photos/IMG_3121.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_3121.jpeg" },
  { id: 12, img: "/About Me Page/gallery photos/IMG_3157.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_3157.jpeg" },
  { id: 13, img: "/About Me Page/gallery photos/IMG_3437.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_3437.jpeg" },
  { id: 14, img: "/About Me Page/gallery photos/IMG_3602.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_3602.jpeg" },
  { id: 15, img: "/About Me Page/gallery photos/IMG_5838.jpeg",          height: 440, url: "/About Me Page/gallery photos/IMG_5838.jpeg" },
  { id: 16, img: "/About Me Page/gallery photos/IMG_6331.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_6331.jpeg" },
  { id: 17, img: "/About Me Page/gallery photos/IMG_8239.jpeg",          height: 400, url: "/About Me Page/gallery photos/IMG_8239.jpeg" },
  { id: 18, img: "/About Me Page/gallery photos/IMG_9313.jpeg",          height: 380, url: "/About Me Page/gallery photos/IMG_9313.jpeg" },
  { id: 19, img: "/About Me Page/gallery photos/8364F554-66C9-4D2A-B6E0-0F1E362E8422.jpeg", height: 480, url: "/About Me Page/gallery photos/8364F554-66C9-4D2A-B6E0-0F1E362E8422.jpeg" },
  { id: 20, img: "/About Me Page/gallery photos/IMG_0567.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_0567.jpeg" },
  { id: 21, img: "/About Me Page/gallery photos/IMG_5417.jpeg",          height: 440, url: "/About Me Page/gallery photos/IMG_5417.jpeg" },
  { id: 22, img: "/About Me Page/gallery photos/IMG_6181_Original.jpeg", height: 600, url: "/About Me Page/gallery photos/IMG_6181_Original.jpeg" },
  { id: 23, img: "/About Me Page/gallery photos/IMG_6253_Original.jpeg", height: 440, url: "/About Me Page/gallery photos/IMG_6253_Original.jpeg" },
  { id: 24, img: "/About Me Page/gallery photos/IMG_7064.jpeg",          height: 600, url: "/About Me Page/gallery photos/IMG_7064.jpeg" },
  { id: 25, img: "/About Me Page/gallery photos/IMG_9202.jpeg",          height: 480, url: "/About Me Page/gallery photos/IMG_9202.jpeg" },
  { id: 26, img: "/About Me Page/gallery photos/_MG_6934.jpeg",          height: 600, url: "/About Me Page/gallery photos/_MG_6934.jpeg" },
];


const quickFacts = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "Dublin, CA · San Francisco Bay Area",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    text: "Cal Poly SLO · Business Administration + Music Minor",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    text: "Passionate about music technology",
  },
];

function TiltPhoto() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div style={{ perspective: "1000px" }} className="rounded-2xl min-h-[280px]">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            background: "linear-gradient(135deg, #4ade80, #86efac, #16a34a, #4ade80, #86efac, #16a34a)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 5s ease infinite",
          }}
          className="rounded-2xl p-[2px] shadow-lg min-h-[280px] h-full cursor-pointer"
        >
          <div className="relative rounded-[14px] overflow-hidden h-full min-h-[280px]">
            <Image
              src="/about-photo.jpg"
              alt="Michael Hong"
              fill
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
  );
}

const bioVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function SectionDivider() {
  return (
    <div className="relative my-16">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative pt-4 pb-24 overflow-hidden">

      <div id="about-content" className="relative max-w-5xl mx-auto px-6 pt-20">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold"><ShinyText text="About Me" color="#ffffff" shineColor="#4ade80" speed={4} /></h2>
          <motion.div
            className="h-0.5 w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          />
        </motion.div>

        {/* Photo + Bio grid */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <TiltPhoto />

            {/* Highlights card */}
            <div className="flex-1 rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-400/70 mb-4">Highlights</p>
              <ul className="flex flex-col gap-3">
                {content.about.highlights.slice(0, 3).map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm"
          >
            <div className="flex flex-col items-start p-7 h-full">

              {/* Bio text */}
              <motion.p
                className="text-gray-300 leading-relaxed text-lg"
                variants={bioVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {content.about.bio.split(" ").map((word, i) => (
                  <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.28em]">
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              {/* Quick facts */}
              <div className="w-full mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
                {quickFacts.map((fact, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                  >
                    <span className="text-green-400 flex-shrink-0">{fact.icon}</span>
                    <span className="text-gray-300">{fact.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:from-green-700 hover:to-green-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                🍜 Send me food recs
              </Link>
            </div>
          </motion.div>
        </div>

        <SectionDivider />

        {/* Quote card */}
        <motion.div
          className="relative rounded-2xl border border-green-500/50 bg-green-950/35 backdrop-blur-sm overflow-hidden cursor-default"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ boxShadow: "0 0 48px rgba(74,222,128,0.22)" }}
        >
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600" />

          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[32rem] h-32 bg-green-500/8 rounded-full blur-3xl" />
          </div>

          {/* Decorative quote marks */}
          <span className="absolute select-none pointer-events-none font-serif text-[10rem] leading-none top-0 left-4 text-green-400/20" aria-hidden="true">&ldquo;</span>
          <span className="absolute select-none pointer-events-none font-serif text-[10rem] leading-none -bottom-16 right-4 text-green-400/20" aria-hidden="true">&rdquo;</span>

          <div className="relative px-12 py-12 text-center">
            <p className="text-2xl md:text-3xl italic text-white font-light leading-relaxed">
              Don&apos;t spend your time chasing butterflies, mend your garden and the butterflies will come.
            </p>
          </div>
        </motion.div>

        <SectionDivider />

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold"><ShinyText text="My Interests" color="#ffffff" shineColor="#4ade80" speed={4} /></h2>
            <motion.div
              className="h-0.5 w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            />
          </div>
          <div className="lg:-mx-16">
            <InterestsPanel interests={content.interests} />
          </div>
        </motion.div>

        <SectionDivider />

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-bold mb-1"><ShinyText text="Gallery" color="#ffffff" shineColor="#4ade80" speed={4} /></h3>
          <motion.div
            className="h-0.5 w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-3 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          />
          <Masonry
            items={galleryItems}
            animateFrom="random"
            stagger={0.045}
            scaleOnHover
            blurToFocus
          />
        </motion.div>

      </div>
    </section>
  );
}
