"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { content } from "@/config/content";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";

export default function Contact() {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="contact"
      className="relative flex-1 flex items-center min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      {/* Spotlight cursor */}
      <motion.div
        className="absolute pointer-events-none z-0 rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, rgba(74,222,128,0.06) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full z-10">

        {/* Heading area */}
        <div className="mb-8">
          <div className="mb-6" role="heading" aria-level={1}>
            <motion.p
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <ShinyText text="Let's" color="#ffffff" shineColor="#4ade80" speed={4} direction="left" />
            </motion.p>
            <motion.p
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <ShinyText text="Connect" color="#4ade80" shineColor="#ffffff" speed={4} direction="right" />
            </motion.p>
          </div>
          <motion.div
            className="h-0.5 w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </div>

        {/* Cards grid — text card and contact cards share the same top edge */}
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Left — text card */}
          <motion.div
            className="rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm px-6 py-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <BlurText
              text="I'm always open to new opportunities, collaborations, and conversations. Feel free to reach out!"
              delay={40}
              direction="bottom"
              stepDuration={0.3}
              className="text-gray-300 text-base leading-relaxed mb-4"
            />
            <ul className="space-y-2">
              {[
                "Collaborations & projects",
                "Networking & coffee chats",
                "Food recommendations!",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — contact cards */}
          <div className="flex flex-col gap-4">
            <motion.a
              href={`https://mail.google.com/mail/?view=cm&to=${content.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 group rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm px-6 py-5 transition-all"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(74,222,128,0.2)" }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-400/60 mb-0.5 font-medium uppercase tracking-wider">Email</p>
                <p className="text-white group-hover:text-green-400 transition-colors font-semibold truncate">{content.email}</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>

            <motion.a
              href={content.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 group rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm px-6 py-5 transition-all"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(74,222,128,0.2)" }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-green-400/60 mb-0.5 font-medium uppercase tracking-wider">LinkedIn</p>
                <p className="text-white group-hover:text-green-400 transition-colors font-semibold">michaelhong170</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>

            <motion.a
              href={content.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 group rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm px-6 py-5 transition-all"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(74,222,128,0.2)" }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-green-400/60 mb-0.5 font-medium uppercase tracking-wider">Instagram</p>
                <p className="text-white group-hover:text-green-400 transition-colors font-semibold">michaelhong170</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>

        </div>
      </div>
    </section>

  );
}
