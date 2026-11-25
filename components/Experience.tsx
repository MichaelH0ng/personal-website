"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { content } from "@/config/content";
import { entrySlug } from "@/lib/slugs";
import GlassCard from "@/components/GlassCard";
import SectionHeading from "@/components/SectionHeading";

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function LogoImg({ src, size = 40 }: { src: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full border border-white/10 bg-white flex items-center justify-center flex-shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-105"
    >
      <Image src={src} alt="" width={size - 8} height={size - 8} className="object-contain" />
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
  detailHref,
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
  detailHref: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const topStat = stats[0];
  const panelId = `${id}-panel`;

  return (
    <motion.div id={id} variants={rowVariants} className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group w-full flex items-center gap-4 py-4 px-4 rounded-xl text-left cursor-pointer transition-colors duration-200 hover:bg-green-700/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-inset"
      >
        <LogoImg src={logo} size={48} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-base">{title}</h3>
          <p className="text-muted text-sm line-clamp-2">{subtitle}</p>
          <p className="text-subtle text-xs mt-0.5">{dates} · {location}</p>
        </div>
        {topStat && !isOpen && (
          <span className="hidden sm:flex flex-col items-end flex-shrink-0 text-right">
            <span className="text-green-300 font-bold leading-none">{topStat.value}</span>
            <span className="text-subtle text-xs mt-1">{topStat.label}</span>
          </span>
        )}
        <motion.svg
          className="w-4 h-4 flex-shrink-0 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-2 sm:pl-[76px]">
              {stats.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex-1 min-w-[80px] bg-green-500/10 border border-green-500/25 rounded-xl p-3 text-center"
                    >
                      <p className="text-xl font-bold text-green-300 leading-none">{stat.value}</p>
                      <p className="text-xs text-muted mt-1 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {bullets.length > 0 && (
                <ul className="space-y-2.5">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-[0.5rem]" aria-hidden="true" />
                      <span className="text-muted text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={detailHref}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-green-300 hover:text-green-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="mb-10"
      aria-label={title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
        <GlassCard className="rounded-xl border-l-4 border-l-green-500">{children}</GlassCard>
      </motion.div>
    </motion.section>
  );
}

const linkButton =
  "inline-flex items-center gap-2 border border-green-400/50 text-green-300 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-green-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function Experience() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const toggle = (key: string) => {
    const next = key === openKey ? null : key;
    setOpenKey(next);
    if (next) {
      setTimeout(() => {
        document.getElementById(`exp-${next}`)?.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
          block: "center",
        });
      }, 60);
    }
  };

  return (
    <section id="experience" className="relative py-20">
      <div className="relative max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading title="Experience" as="h1" />
          <div className="flex gap-3">
            <a href={content.linkedin} target="_blank" rel="noopener noreferrer" className={linkButton}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="/MichaelHong_Resume.pdf" target="_blank" rel="noopener noreferrer" className={linkButton}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Resume (PDF)
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

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
              detailHref={`/experience/${entrySlug(edu.school, edu.degree)}`}
              isOpen={openKey === `edu-${i}`}
              onToggle={() => toggle(`edu-${i}`)}
            />
          ))}
        </SectionCard>

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
              detailHref={`/experience/${entrySlug(job.title, job.company)}`}
              isOpen={openKey === `work-${i}`}
              onToggle={() => toggle(`work-${i}`)}
            />
          ))}
        </SectionCard>

        <SectionCard title="Leadership & Involvement">
          {content.leadership.map((role, i) => (
            <ExperienceRow
              key={i}
              id={`exp-lead-${i}`}
              logo={role.logo}
              title={role.title}
              subtitle={role.org}
              location={role.location}
              dates={role.dates}
              bullets={role.bullets}
              stats={role.stats}
              detailHref={`/experience/${entrySlug(role.title, role.org)}`}
              isOpen={openKey === `lead-${i}`}
              onToggle={() => toggle(`lead-${i}`)}
            />
          ))}
        </SectionCard>

        <SectionCard title="Skills">
          <div className="py-4 px-4">
            <ul className="flex flex-wrap gap-2">
              {content.skills.map((s) => (
                <li key={s} className="text-sm bg-white/5 border border-white/15 text-white px-3 py-1 rounded-lg">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

      </div>
    </section>
  );
}
