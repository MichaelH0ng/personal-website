"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { interestSlug } from "@/lib/slugs";

interface Interest {
  name: string;
  photos: string[];
  description: string;
}

const iconPaths: Record<string, string | string[]> = {
  Calisthenics: "M3 10v4M6 8v8M18 8v8M21 10v4M6 12h12",
  Guitar: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
  Piano: "M4 5h16v14H4zM9 5v14M15 5v14M9 12h0M6.5 5v7M11.5 5v7M17.5 5v7",
  Running: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  "Singing/Songwriting": "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  Soccer: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const fallbackPath = "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z";

function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const path = iconPaths[name] ?? fallbackPath;
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {Array.isArray(path)
        ? path.map((p, i) => <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p} />)
        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} />}
    </svg>
  );
}

function Description({ text, className }: { text: string; className: string }) {
  if (!text) return <p className="text-subtle text-sm italic">No details added yet.</p>;
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((para, i) => (
        <p key={i} className={className}>{para}</p>
      ))}
    </div>
  );
}

function DetailLink({ name }: { name: string }) {
  return (
    <Link
      href={`/about/${interestSlug(name)}`}
      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-green-300 hover:text-green-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      View details
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function InterestsPanel({ interests }: { interests: Interest[] }) {
  const [selected, setSelected] = useState(interests[0]);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* Desktop: two-panel */}
      <div className="hidden lg:grid lg:grid-cols-[220px_1fr] gap-6 items-start">

        {/* Left nav list — slides in from left with staggered items */}
        <motion.div
          className="flex flex-col gap-1 rounded-2xl border border-green-500/30 bg-black/95 backdrop-blur-md p-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {interests.map((interest) => {
            const active = interest.name === selected.name;
            return (
              <motion.div
                key={interest.name}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
              >
                <button
                  onClick={() => setSelected(interest)}
                  aria-pressed={active}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${
                    active
                      ? "bg-green-500/15 text-green-300"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={active ? "text-green-300" : "text-subtle"}>
                    <Icon name={interest.name} className="w-5 h-5" />
                  </span>
                  <span className="font-medium text-sm">{interest.name}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />}
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right detail panel — slides in from right */}
        <motion.div
          className="rounded-2xl border border-green-500/30 bg-black/95 backdrop-blur-md overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className="h-1 bg-green-600" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="p-8"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                  <Icon name={selected.name} className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-300 mb-0.5">Interest</p>
                  <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                </div>
              </div>

              <Description text={selected.description} className="text-muted leading-relaxed" />
              <DetailLink name={selected.name} />

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile: accordion */}
      <div className="lg:hidden flex flex-col gap-3">
        {interests.map((interest, i) => {
          const open = expanded === interest.name;
          return (
            <motion.div
              key={interest.name}
              className="rounded-2xl border border-green-500/30 bg-black/95 backdrop-blur-md overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
            >
              <div className="h-1 bg-green-600" aria-hidden="true" />
              <button
                onClick={() => setExpanded(open ? null : interest.name)}
                aria-expanded={open}
                aria-controls={`interest-${interestSlug(interest.name)}`}
                className="w-full flex items-center gap-3 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-inset"
              >
                <span className={open ? "text-green-300" : "text-subtle"}>
                  <Icon name={interest.name} className="w-5 h-5" />
                </span>
                <span className="font-semibold text-white text-sm">{interest.name}</span>
                <motion.span
                  className="ml-auto text-muted"
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`interest-${interestSlug(interest.name)}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6">
                      <Description text={interest.description} className="text-muted leading-relaxed text-sm" />
                      <DetailLink name={interest.name} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
