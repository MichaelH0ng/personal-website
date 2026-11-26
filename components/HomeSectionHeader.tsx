"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  title: string;
  /** Optional link shown on the right, e.g. "All experience". */
  link?: { href: string; label: string };
};

/** Shared title bar for home page sections: a dark glass strip with the title on the left and an optional link on the right. */
export default function HomeSectionHeader({ title, link }: Props) {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-4 rounded-2xl border border-green-500/30 bg-black/95 backdrop-blur-md px-5 py-3.5 sm:px-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-green-400 to-green-600" aria-hidden="true" />
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-green-500 hover:bg-green-400 active:scale-[0.97] px-5 py-3 text-sm font-semibold text-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {link.label}
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </motion.div>
  );
}
