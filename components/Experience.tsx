"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import ShinyText from "@/components/ShinyText";

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

type Accent = { border: string; hover: string };

const accents: Record<string, Accent> = {
  Education:                  { border: "border-l-green-500", hover: "hover:bg-green-700/20" },
  "Work Experience":          { border: "border-l-green-500", hover: "hover:bg-green-700/20" },
  "Leadership & Involvement": { border: "border-l-green-500", hover: "hover:bg-green-700/20" },
};

function LogoImg({ src, name, size = 40 }: { src: string; name: string; size?: number }) {
  const [errored, setErrored] = useState(false);
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");

  if (errored) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center text-green-300 font-semibold text-sm flex-shrink-0"
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full border border-white/10 bg-black/30 flex items-center justify-center flex-shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-110"
    >
      <Image
        src={src}
        alt={name}
        width={size - 8}
        height={size - 8}
        className="object-contain"
        onError={() => setErrored(true)}
        unoptimized
      />
    </div>
  );
}

function ExperienceRow({
  id,
  logo,
  title,
  subtitle,
  location,
  dates,
  bullets,
  stats,
  hoverClass,
  isOpen,
  onToggle,
}: {
  id: string;
  logo: string;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  hoverClass: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div id={id} variants={rowVariants} className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group w-full flex items-center gap-4 py-4 px-4 rounded-xl text-left cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${hoverClass}`}
      >
        <LogoImg src={logo} name={subtitle} size={48} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm">{title}</p>
          <p className="text-white/70 text-sm line-clamp-2">{subtitle}</p>
          <p className="text-white/40 text-xs mt-0.5">{dates} · {location}</p>
        </div>
        <motion.svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            rotate: isOpen ? 180 : 0,
            y: hovered ? [0, 4, 0] : 0,
            color: hovered || isOpen ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
          }}
          transition={{
            rotate: { duration: 0.25, ease: "easeInOut" },
            y: hovered ? { duration: 0.55, repeat: Infinity, ease: "easeInOut" } : { duration: 0.1 },
            color: { duration: 0.2 },
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-2 pl-[72px]">
              {/* Stats callouts */}
              {stats.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 min-w-[72px] bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.06 }}
                    >
                      <p className="text-xl font-bold text-green-400 leading-none">{stat.value}</p>
                      <p className="text-[10px] text-white/50 mt-1 leading-tight">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              {/* Bullets */}
              {bullets.length > 0 ? (
                <ul className="space-y-2.5">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-[0.45rem]" />
                      <span className="text-gray-300 text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic">No details added yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  const accent = accents[title] ?? accents["Work Experience"];
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
        <ShinyText text={title} color="#ffffff" shineColor="#4ade80" speed={4} />
      </h2>
      <motion.div
        className={`bg-black/50 backdrop-blur-sm rounded-xl border border-green-500/30 border-l-4 ${accent.border}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => {
    const next = key === openKey ? null : key;
    setOpenKey(next);
    if (next) {
      setTimeout(() => {
        document.getElementById(`exp-${next}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
    }
  };

  return (
    <section id="experience" className="relative py-24">
      <div className="relative max-w-3xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-3xl font-bold">
              <ShinyText text="Experience" color="#ffffff" shineColor="#4ade80" speed={4} />
            </h1>
            <motion.div
              className="h-0.5 w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-3"
              whileInView={{ scaleX: 1 }}
              initial={{ scaleX: 0 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            />
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/michaelhong170/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-green-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://docs.google.com/document/d/1pGFBBZNmpG4-7Qoz4rCtNQt1yOZLUFYaVhz5HGZP1JQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-green-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Resume
            </a>
          </div>
        </motion.div>

        {/* Education */}
        <SectionCard title="Education">
          {content.education.map((edu, i) => (
            <ExperienceRow
              key={i}
              id={`exp-edu-${i}`}
              logo={edu.logo}
              title={edu.school}
              subtitle={edu.degree}
              location={edu.location}
              dates={edu.dates}
              bullets={edu.bullets}
              stats={edu.stats}
              hoverClass={accents["Education"].hover}
              isOpen={openKey === `edu-${i}`}
              onToggle={() => toggle(`edu-${i}`)}
            />
          ))}
        </SectionCard>

        {/* Work Experience */}
        <SectionCard title="Work Experience">
          {content.experience.map((job, i) => (
            <ExperienceRow
              key={i}
              id={`exp-work-${i}`}
              logo={job.logo}
              title={job.title}
              subtitle={job.company}
              location={job.location}
              dates={job.dates}
              bullets={job.bullets}
              stats={job.stats}
              hoverClass={accents["Work Experience"].hover}
              isOpen={openKey === `work-${i}`}
              onToggle={() => toggle(`work-${i}`)}
            />
          ))}
        </SectionCard>

        {/* Leadership */}
        <SectionCard title="Leadership & Involvement">
          {content.leadership.map((role, i) => (
            <ExperienceRow
              key={i}
              id={`exp-lead-${i}`}
              logo={role.logo}
              title={role.title}
              subtitle={role.org}
              location={role.location ?? ""}
              dates={role.dates}
              bullets={role.bullets}
              stats={role.stats}
              hoverClass={accents["Leadership & Involvement"].hover}
              isOpen={openKey === `lead-${i}`}
              onToggle={() => toggle(`lead-${i}`)}
            />
          ))}
        </SectionCard>

        {/* Skills */}
        <SectionCard title="Skills">
          <div className="py-4 px-4">
            <div className="flex flex-wrap gap-2">
              {content.skills.map((s, i) => (
                <span key={i} className="text-sm bg-white/5 border border-white/10 text-white px-3 py-1 rounded-lg">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

      </div>
    </section>
  );
}
