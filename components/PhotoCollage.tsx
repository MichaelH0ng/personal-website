"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PhotoCollage({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (photos.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border-2 border-dashed border-gray-200 py-16 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm text-gray-400">Photos coming soon</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 columns-2 md:columns-3 gap-3 space-y-3">
        {photos.map((src, i) => (
          <motion.div
            key={i}
            className="break-inside-avoid cursor-zoom-in"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setLightbox(src)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Gallery photo ${i + 1}`}
              className="w-full rounded-xl object-cover shadow-sm hover:shadow-md transition-shadow duration-200"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                className="relative max-w-4xl max-h-[85vh] pointer-events-auto"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightbox}
                  alt="Gallery photo"
                  className="max-h-[85vh] w-auto rounded-2xl shadow-2xl object-contain"
                />
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
