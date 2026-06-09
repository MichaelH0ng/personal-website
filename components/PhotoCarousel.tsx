"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PhotoCarousel({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (photos.length === 0) return null;

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % photos.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
        Photos
      </p>
      <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={photos[index]}
            alt={`Photo ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:text-green-600 transition-all"
          aria-label="Previous photo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:text-green-600 transition-all"
          aria-label="Next photo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 z-10 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {index + 1} / {photos.length}
        </div>
      </div>

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-green-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
