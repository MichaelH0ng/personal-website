"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { content } from "@/config/content";
import BlurText from "@/components/BlurText";
import GlassCard from "@/components/GlassCard";
import SectionHeading from "@/components/SectionHeading";

const icons = {
  email: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
};

function handleFromUrl(url: string) {
  return url.replace(/\/+$/, "").split("/").pop() ?? url;
}

const contactLinks = [
  { label: "Email", value: content.email, href: `mailto:${content.email}`, icon: icons.email, external: false },
  { label: "LinkedIn", value: handleFromUrl(content.linkedin), href: content.linkedin, icon: icons.linkedin, external: true },
  { label: "Instagram", value: handleFromUrl(content.instagram), href: content.instagram, icon: icons.instagram, external: true },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section id="contact" className="relative overflow-hidden" onMouseMove={handleMouseMove}>

      {/* Spotlight cursor (hidden for reduced motion) */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
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
      )}

      <div className="relative max-w-5xl mx-auto px-6 py-20 w-full z-10">

        <SectionHeading title="Let's Connect" as="h1" className="mb-10" />

        <div className="grid md:grid-cols-2 gap-8 items-start">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="px-6 py-5">
              <BlurText
                text="I'm always open to new opportunities, collaborations, and conversations. Feel free to reach out!"
                delay={40}
                direction="bottom"
                stepDuration={0.3}
                className="text-muted text-base leading-relaxed mb-4"
              />
              <ul className="space-y-2">
                {["Collaborations & projects", "Networking & coffee chats", "Food recommendations!"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>

          <div className="flex flex-col gap-4">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-5 group rounded-2xl border border-green-500/30 bg-black/55 backdrop-blur-sm px-6 py-5 transition-colors hover:border-green-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              >
                <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center text-white flex-shrink-0">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-green-300 mb-0.5 font-medium uppercase tracking-wider">{link.label}</p>
                  <p className="text-white group-hover:text-green-300 transition-colors font-semibold text-sm sm:text-base [overflow-wrap:anywhere]">
                    {link.value}
                  </p>
                </div>
                {link.external && <span className="sr-only">(opens in a new tab)</span>}
                <svg className="w-5 h-5 text-muted group-hover:text-green-300 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
