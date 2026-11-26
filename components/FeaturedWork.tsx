"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import HomeSectionHeader from "@/components/HomeSectionHeader";

type Tile = {
  title: string;
  org: string;
  logo: string;
  blurb: string;
};

// Join each featured item to its full entry in content.ts so logos stay in sync.
const tiles: Tile[] = content.featured.flatMap((f) => {
  const entries = [
    ...content.experience.map((e) => ({ ...e, org: e.company })),
    ...content.leadership,
  ];
  const match = entries.find((e) => e.title === f.title && e.org === f.org);
  if (!match) return [];
  return [
    {
      title: match.title,
      org: match.org,
      logo: match.logo,
      blurb: f.blurb,
    },
  ];
});

/** Highlight roles on the home page (display only, not clickable): 2x2 beside the hero on wide screens (natural height, Let's connect fills the rest of the column), 4 across on laptops, 2 on tablets, 1 on phones. */
export default function FeaturedWork() {
  if (tiles.length === 0) return null;

  return (
    <section>
      <HomeSectionHeader title="Featured Work" link={{ href: "/experience", label: "View My Experience" }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-4">
        {tiles.map((tile, i) => (
          <motion.div
            key={`${tile.title}-${tile.org}`}
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
          >
            <article className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-green-500/30 bg-black/95 backdrop-blur-md p-4 xl:p-5">
              {/* Soft green glow in the corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-green-500/10 blur-3xl"
              />

              <div className="flex items-center gap-3">
                <Image
                  src={tile.logo}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 xl:h-10 xl:w-10 flex-shrink-0 rounded-full bg-white object-contain ring-2 ring-green-500/40"
                />
                <div className="min-w-0">
                  <p className="text-sm xl:text-base text-white font-semibold leading-tight">
                    {tile.title}
                  </p>
                  <p className="text-xs text-muted leading-snug">{tile.org}</p>
                </div>
              </div>

              <p className="mt-3 text-xs xl:text-sm text-muted leading-relaxed">{tile.blurb}</p>

            </article>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
