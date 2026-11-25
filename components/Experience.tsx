"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { content } from "@/config/content";
import { cn } from "@/lib/utils";
import { groupByOrg, isCurrent, rangeDuration, spanDuration } from "@/lib/experience";
import GlassCard from "@/components/GlassCard";
import OrgLogo from "@/components/OrgLogo";
import SectionHeading from "@/components/SectionHeading";

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

type Stat = { value: string; label: string };

type Role = {
  title: string;
  org: string;
  location: string;
  dates: string;
  logo: string;
  stats: Stat[];
  bullets: string[];
};

const toggleButton =
  "group w-full flex items-center gap-4 rounded-xl text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-inset";

function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
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
  );
}

/** "Feb. 2026 – Aug. 2026 · 7 mos". The duration depends on today's date for "Present" roles. */
function DateLine({ dates, showDuration = true, className }: { dates: string; showDuration?: boolean; className?: string }) {
  const duration = showDuration ? rangeDuration(dates) : "";
  return (
    <p className={cn("text-subtle text-xs mt-0.5", className)} suppressHydrationWarning>
      {dates}
      {duration && ` · ${duration}`}
    </p>
  );
}

/** Expandable stats + bullets shown under a row when it's opened. */
function DetailsPanel({ id, isOpen, stats, bullets, className }: { id: string; isOpen: boolean; stats: Stat[]; bullets: string[]; className?: string }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className={className}>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One role at one org: logo, title, org, dates. Click to expand details. */
function ExperienceRow({
  id,
  logo,
  title,
  subtitle,
  location,
  dates,
  bullets,
  stats,
  showDuration = true,
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
  stats: Stat[];
  showDuration?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `${id}-panel`;
  const hasDetails = bullets.length > 0 || stats.length > 0;

  const inner = (
    <>
      <OrgLogo src={logo} name={subtitle} size={48} className="transition-transform duration-200 group-hover:scale-105" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-base">{title}</h3>
        <p className="text-muted text-sm line-clamp-2">{subtitle}</p>
        <DateLine dates={dates} showDuration={showDuration} />
        <p className="text-subtle text-xs">{location}</p>
      </div>
    </>
  );

  return (
    <motion.div id={id} variants={rowVariants} className="border-b border-white/10 last:border-0">
      {hasDetails ? (
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={cn(toggleButton, "py-4 px-4 cursor-pointer hover:bg-green-700/20")}
        >
          {inner}
          <Chevron isOpen={isOpen} />
        </button>
      ) : (
        <div className="flex items-center gap-4 py-4 px-4">{inner}</div>
      )}
      <DetailsPanel id={panelId} isOpen={isOpen} stats={stats} bullets={bullets} className="px-4 pb-5 pt-2 sm:pl-[80px]" />
    </motion.div>
  );
}

function RoleTitle({ title, dates }: { title: string; dates: string }) {
  return (
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-white text-[0.95rem] leading-6">{title}</h4>
      <DateLine dates={dates} />
    </div>
  );
}

// Vertical position of a role's timeline dot, lined up with its title text.
const DOT_Y = 24;

/** Several roles at the same org, LinkedIn-style: org header, then a connected timeline of roles. */
function ExperienceGroup({
  sectionKey,
  org,
  roles,
  openKey,
  onToggle,
}: {
  sectionKey: string;
  org: string;
  roles: Role[];
  openKey: string | null;
  onToggle: (key: string) => void;
}) {
  const span = spanDuration(roles.map((r) => r.dates));

  return (
    <motion.div variants={rowVariants} className="border-b border-white/10 last:border-0 px-4 pt-4 pb-2">
      <div className="flex items-center gap-4">
        <OrgLogo src={roles[0].logo} name={org} size={48} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-base">{org}</h3>
          <p className="text-muted text-sm" suppressHydrationWarning>
            {roles.length} roles{span && ` · ${span}`}
          </p>
          <p className="text-subtle text-xs">{roles[0].location}</p>
        </div>
      </div>

      <ol className="mt-1">
        {roles.map((role, i) => {
          const key = `${sectionKey}-${i}`;
          const isOpen = openKey === key;
          const panelId = `exp-${key}-panel`;
          const first = i === 0;
          const last = i === roles.length - 1;
          const current = isCurrent(role.dates);

          return (
            <li key={key} id={`exp-${key}`} className="relative flex">
              {/* Timeline rail: a line through every role, with a dot at each title */}
              <div className="relative w-12 flex-shrink-0" aria-hidden="true">
                <span
                  className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-green-500/30"
                  style={first ? { top: DOT_Y, bottom: 0 } : last ? { top: 0, height: DOT_Y } : { top: 0, bottom: 0 }}
                />
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full",
                    current
                      ? "bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"
                      : "bg-green-950 border-2 border-green-500/70",
                  )}
                  style={{ top: DOT_Y }}
                />
                {current && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-400/60 animate-ping"
                    style={{ top: DOT_Y }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0 ml-1">
                {role.bullets.length > 0 || role.stats.length > 0 ? (
                  <button
                    onClick={() => onToggle(key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={cn(toggleButton, "py-3 px-3 cursor-pointer hover:bg-green-700/20")}
                  >
                    <RoleTitle title={role.title} dates={role.dates} />
                    <Chevron isOpen={isOpen} />
                  </button>
                ) : (
                  <div className="py-3 px-3">
                    <RoleTitle title={role.title} dates={role.dates} />
                  </div>
                )}
                <DetailsPanel id={panelId} isOpen={isOpen} stats={role.stats} bullets={role.bullets} className="px-3 pb-4 pt-1" />
              </div>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

/** Renders a section's roles grouped by org: single roles as a row, repeat orgs as a timeline. */
function RoleList({ sectionKey, roles, openKey, onToggle }: { sectionKey: string; roles: Role[]; openKey: string | null; onToggle: (key: string) => void }) {
  return (
    <>
      {groupByOrg(roles, (r) => r.org).map((group, gi) => {
        const key = `${sectionKey}-${gi}`;
        if (group.items.length > 1) {
          return <ExperienceGroup key={key} sectionKey={key} org={group.org} roles={group.items} openKey={openKey} onToggle={onToggle} />;
        }
        const role = group.items[0];
        return (
          <ExperienceRow
            key={key}
            id={`exp-${key}`}
            logo={role.logo}
            title={role.title}
            subtitle={role.org}
            location={role.location}
            dates={role.dates}
            bullets={role.bullets}
            stats={role.stats}
            isOpen={openKey === key}
            onToggle={() => onToggle(key)}
          />
        );
      })}
    </>
  );
}

const workRoles: Role[] = content.experience.map((e) => ({ ...e, org: e.company }));
const leadershipRoles: Role[] = content.leadership;

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
              showDuration={false}
              isOpen={openKey === `edu-${i}`}
              onToggle={() => toggle(`edu-${i}`)}
            />
          ))}
        </SectionCard>

        <SectionCard title="Work Experience">
          <RoleList sectionKey="work" roles={workRoles} openKey={openKey} onToggle={toggle} />
        </SectionCard>

        <SectionCard title="Leadership & Involvement">
          <RoleList sectionKey="lead" roles={leadershipRoles} openKey={openKey} onToggle={toggle} />
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
