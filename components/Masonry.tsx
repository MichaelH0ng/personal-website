"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Masonry.module.css";

type MasonryItem = {
  id: number;
  img: string;
  height: number;
  url?: string;
};

type GridItem = MasonryItem & { x: number; y: number; w: number; h: number };

function useMedia(queries: string[], values: number[], defaultValue: number) {
  const get = () =>
    typeof window === "undefined"
      ? defaultValue
      : values[queries.findIndex((q) => window.matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => window.matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        window.matchMedia(q).removeEventListener("change", handler)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
}

function useMeasure() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, width] as const;
}


type Props = {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
};

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 1.04,
  blurToFocus = true,
}: Props) {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, width] = useMeasure();

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array<number>(columns).fill(0);
    const columnWidth = width / columns;
    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const h = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += h;
      return { ...child, x, y, w: columnWidth, h };
    });
  }, [columns, items, width]);

  const containerHeight = useMemo(
    () => (grid.length ? Math.max(...grid.map((item) => item.y + item.h)) : 0),
    [grid]
  );

  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxImg) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxImg(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxImg]);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!grid.length) return;

    grid.forEach((item, index) => {
      const sel = `[data-masonry-key="${item.id}"]`;
      const pos = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        let fromX = item.x;
        let fromY = item.y;
        const dir =
          animateFrom === "random"
            ? (["top", "bottom", "left", "right"] as const)[
                Math.floor(Math.random() * 4)
              ]
            : animateFrom;

        if (dir === "top") fromY = -200;
        else if (dir === "bottom") fromY = window.innerHeight + 200;
        else if (dir === "left") fromX = -200;
        else if (dir === "right") fromX = window.innerWidth + 200;
        else if (dir === "center") {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            fromX = rect.width / 2 - item.w / 2;
            fromY = rect.height / 2 - item.h / 2;
          }
        }

        gsap.fromTo(
          sel,
          {
            opacity: 0,
            x: fromX,
            y: fromY,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...pos,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(sel, { ...pos, duration, ease, overwrite: "auto" });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  const handleMouseEnter = (_: React.MouseEvent, item: GridItem) => {
    if (scaleOnHover) {
      gsap.to(`[data-masonry-key="${item.id}"]`, {
        scale: hoverScale,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (_: React.MouseEvent, item: GridItem) => {
    if (scaleOnHover) {
      gsap.to(`[data-masonry-key="${item.id}"]`, {
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={styles.list}
        style={{ height: containerHeight }}
      >
        {grid.map((item) => (
          <div
            key={item.id}
            data-masonry-key={item.id}
            className={styles.item}
            onClick={() => setLightboxImg(item.img)}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
          >
            <div
              className={styles.img}
              style={{ backgroundImage: `url('${item.img}')` }}
            />
            <div className={styles.overlay}>
              <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxImg(null)}
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              src={lightboxImg}
              alt=""
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
