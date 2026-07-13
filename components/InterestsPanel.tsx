"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Interest {
  name: string;
  photos: string[];
  description: string;
}

const iconPaths: Record<string, string | string[]> = {
  Calisthenics: "M13 10V3L4 14h7v7l9-11h-7z",
  Guitar: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
  Piano: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
  Running: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  "Singing/Songwriting": "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  Soccer: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const fallbackPath = "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z";

function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const path = iconPaths[name] ?? fallbackPath;
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {Array.isArray(path)
        ? path.map((p, i) => <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p} />)
        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} />}
    </svg>
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
          className="flex flex-col gap-1 rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm p-3"
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full transition-all duration-200 ${
                    active
                      ? "bg-green-500/15 text-green-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  <span className={active ? "text-green-400" : "text-gray-500"}>
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
          className="rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className="h-1.5 bg-gradient-to-r from-green-600 to-green-400" />
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
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-0.5">Interest</p>
                  <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                </div>
              </div>

              {selected.description ? (
                <p className="text-gray-300 leading-relaxed">{selected.description}</p>
              ) : (
                <p className="text-gray-500 text-sm italic">No details added yet.</p>
              )}

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
              className="rounded-2xl border border-green-500/30 bg-black/50 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
            >
              <div className="h-1 bg-gradient-to-r from-green-600 to-green-400" />
              <button
                onClick={() => setExpanded(open ? null : interest.name)}
                aria-expanded={open}
                className="w-full flex items-center gap-3 px-5 py-4"
              >
                <span className={open ? "text-green-400" : "text-gray-500"}>
                  <Icon name={interest.name} className="w-5 h-5" />
                </span>
                <span className="font-semibold text-white text-sm">{interest.name}</span>
                <motion.span
                  className="ml-auto text-gray-500"
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
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6">
                      {interest.description ? (
                        <p className="text-gray-300 leading-relaxed text-sm">{interest.description}</p>
                      ) : (
                        <p className="text-gray-500 text-sm italic">No details added yet.</p>
                      )}
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
