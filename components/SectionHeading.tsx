"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  /** Use "h1" for the main title of a page, "h2" for sections. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

/** Plain, readable page or section title with a short green underline. */
export default function SectionHeading({ title, as: Tag = "h2", align = "left", className }: Props) {
  return (
    <motion.div
      className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Tag className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</Tag>
      <span className="mt-3 block h-0.5 w-16 rounded-full bg-gradient-to-r from-green-600 to-green-400" aria-hidden="true" />
    </motion.div>
  );
}
