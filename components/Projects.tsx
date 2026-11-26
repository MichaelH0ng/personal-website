"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";
import ShinyText from "@/components/ShinyText";
import AudioPlayer from "@/components/AudioPlayer";

function EmbedPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-40 rounded-xl border border-dashed border-green-500/30 text-gray-500">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
      <span className="text-xs italic">Add an audio file, or a Spotify / SoundCloud / YouTube embed, here</span>
    </div>
  );
}

type Project = {
  title: string;
  type: string;
  description: string;
  audioSrc: string;
  embedUrl: string;
  link: string;
};

function ProjectCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(74,222,128,0.16)" }}
    >
      <div className="rounded-2xl border border-green-500/30 bg-black/95 backdrop-blur-md overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-green-600 to-green-400" />
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-400/70 mb-1">{project.type}</p>
          <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>

          {project.audioSrc ? (
            <AudioPlayer src={project.audioSrc} title={project.title} />
          ) : project.embedUrl ? (
            <iframe
              src={project.embedUrl}
              className="w-full h-40 rounded-xl border border-white/10"
              loading="lazy"
              allow="autoplay; encrypted-media"
            />
          ) : (
            <EmbedPlaceholder />
          )}

          {project.description ? (
            <p className="text-gray-300 leading-relaxed text-sm mt-4">{project.description}</p>
          ) : (
            <p className="text-gray-500 text-sm italic mt-4">No details added yet.</p>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-green-400 text-sm font-medium hover:text-green-300 transition-colors"
            >
              Listen
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative pt-4 pb-24 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 pt-20">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold"><ShinyText text="Projects" color="#ffffff" shineColor="#4ade80" speed={4} /></h2>
          <motion.div
            className="h-0.5 w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          />
          <p className="text-gray-400 mt-4 max-w-2xl">
            A look at the music I&apos;ve written, produced, and mixed.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          {content.projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
