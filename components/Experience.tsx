"use client";

import { useState, useEffect } from "react";
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

type ModalEntry = {
  logo: string;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  bullets: string[];
  section: string;
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
  logo,
  title,
  subtitle,
  location,
  dates,
  hoverClass,
  onSelect,
}: {
  logo: string;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  hoverClass: string;
  onSelect: () => void;
}) {
  return (
    <motion.div variants={rowVariants} className="border-b border-white/10 last:border-0">
      <motion.button
        onClick={onSelect}
        whileTap={{ scale: 0.98 }}
        title="Click to view details"
        className={`group w-full flex items-center gap-4 py-4 px-4 rounded-xl text-left cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${hoverClass}`}
      >
        <LogoImg src={logo} name={subtitle} size={48} />

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm group-hover:text-white transition-colors duration-200">{title}</p>
          <p className="text-white/70 text-sm line-clamp-2 group-hover:text-white/60 transition-colors duration-200">{subtitle}</p>
          <p className="text-white/40 text-xs mt-0.5 group-hover:text-white/30 transition-colors duration-200">
            {dates} · {location}
          </p>
        </div>

        <svg
          className="w-4 h-4 text-white/40 group-hover:text-white/70 flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

function ExperienceModal({ entry, onClose }: { entry: ModalEntry; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-black/90 border border-green-500/30 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-gradient-to-r from-green-600 to-green-400 rounded-t-2xl" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-5">{entry.section}</p>

          <div className="flex items-start gap-5 mb-7">
            <LogoImg src={entry.logo} name={entry.subtitle} size={64} />
            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-white leading-tight mb-1">{entry.title}</h2>
              <p className="text-gray-300 text-base">{entry.subtitle}</p>
              <p className="text-gray-500 text-sm mt-1.5">{entry.dates} · {entry.location}</p>
            </div>
          </div>

          {entry.bullets.length > 0 && (
            <ul className="space-y-3">
              {entry.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-[0.45rem]" />
                  <span className="text-gray-300 text-sm leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
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
  const [selected, setSelected] = useState<ModalEntry | null>(null);

  return (
    <section id="experience" className="relative py-24">
      <div className="relative max-w-3xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 mb-10"
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
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
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
              logo={edu.logo}
              title={edu.school}
              subtitle={edu.degree}
              location={edu.location}
              dates={edu.dates}
              hoverClass={accents["Education"].hover}
              onSelect={() => setSelected({ logo: edu.logo, title: edu.school, subtitle: edu.degree, location: edu.location, dates: edu.dates, bullets: edu.bullets, section: "Education" })}
            />
          ))}
        </SectionCard>

        {/* Work Experience */}
        <SectionCard title="Work Experience">
          {content.experience.map((job, i) => (
            <ExperienceRow
              key={i}
              logo={job.logo}
              title={job.title}
              subtitle={job.company}
              location={job.location}
              dates={job.dates}
              hoverClass={accents["Work Experience"].hover}
              onSelect={() => setSelected({ logo: job.logo, title: job.title, subtitle: job.company, location: job.location, dates: job.dates, bullets: job.bullets, section: "Work Experience" })}
            />
          ))}
        </SectionCard>

        {/* Leadership */}
        <SectionCard title="Leadership & Involvement">
          {content.leadership.map((role, i) => (
            <ExperienceRow
              key={i}
              logo={role.logo}
              title={role.title}
              subtitle={role.org}
              location={role.location ?? ""}
              dates={role.dates}
              hoverClass={accents["Leadership & Involvement"].hover}
              onSelect={() => setSelected({ logo: role.logo, title: role.title, subtitle: role.org, location: role.location ?? "", dates: role.dates, bullets: role.bullets, section: "Leadership & Involvement" })}
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

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <ExperienceModal entry={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
