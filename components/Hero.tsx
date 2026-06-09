"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 pt-16">
      {/* Decorative blobs */}
      <div className="absolute top-24 right-10 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-24 left-10 w-80 h-80 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 w-full">
        <motion.p
          className="text-sm font-semibold uppercase tracking-widest mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent"
          {...fadeUp(0.05)}
        >
          Welcome
        </motion.p>

        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
          {...fadeUp(0.15)}
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            {content.name}
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-10"
          {...fadeUp(0.25)}
        >
          {content.tagline}
        </motion.p>

        <motion.div className="flex flex-wrap gap-4" {...fadeUp(0.35)}>
          <a
            href="/experience"
            className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-7 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-200"
          >
            View My Experience
          </a>
          <a
            href="/contact"
            className="inline-block border border-violet-200 text-violet-700 px-7 py-3 rounded-xl text-sm font-medium hover:bg-violet-50 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
