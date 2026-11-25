import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import GlassCard from "@/components/GlassCard";
import { content } from "@/config/content";
import { entrySlug } from "@/lib/slugs";
import { orgInitials } from "@/lib/experience";

type Props = { params: Promise<{ slug: string }> };

type Entry = {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  logo: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  photos: string[];
  section: "Education" | "Work Experience" | "Leadership & Involvement";
};

function getAllEntries(): Entry[] {
  return [
    ...content.education.map((e) => ({
      slug: entrySlug(e.school, e.degree),
      title: e.school,
      subtitle: e.degree,
      location: e.location,
      dates: e.dates,
      logo: e.logo,
      bullets: e.bullets,
      stats: e.stats,
      photos: [] as string[],
      section: "Education" as const,
    })),
    ...content.experience.map((e) => ({
      slug: entrySlug(e.title, e.company),
      title: e.title,
      subtitle: e.company,
      location: e.location,
      dates: e.dates,
      logo: e.logo,
      bullets: e.bullets,
      stats: e.stats,
      photos: (e.photos ?? []) as string[],
      section: "Work Experience" as const,
    })),
    ...content.leadership.map((l) => ({
      slug: entrySlug(l.title, l.org),
      title: l.title,
      subtitle: l.org,
      location: l.location,
      dates: l.dates,
      logo: l.logo,
      bullets: l.bullets,
      stats: l.stats,
      photos: [] as string[],
      section: "Leadership & Involvement" as const,
    })),
  ];
}

export function generateStaticParams() {
  return getAllEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getAllEntries().find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.title}, ${entry.subtitle} | ${content.name}`,
    description: entry.bullets[0]?.slice(0, 160),
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getAllEntries().find((e) => e.slug === slug);
  if (!entry) notFound();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">

        <Link
          href="/experience"
          className="group inline-flex items-center gap-2 text-sm text-muted hover:text-white mb-10 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <svg className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Experience
        </Link>

        <GlassCard className="overflow-hidden">
          <div className="h-1 bg-green-600" aria-hidden="true" />

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-start">

              <div className="flex-shrink-0 w-32 h-32 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                {entry.logo ? (
                  <Image src={entry.logo} alt="" width={112} height={112} className="object-contain" />
                ) : (
                  <span className="text-4xl font-semibold text-green-700" aria-hidden="true">{orgInitials(entry.subtitle)}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-green-300 mb-2">{entry.section}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{entry.title}</h1>
                <p className="text-xl text-muted mb-1">{entry.subtitle}</p>
                <p className="text-subtle text-sm mb-8">{entry.dates} · {entry.location}</p>

                {entry.stats.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {entry.stats.map((stat) => (
                      <div key={stat.label} className="flex-1 min-w-[90px] bg-green-500/10 border border-green-500/25 rounded-xl p-3 text-center">
                        <p className="text-xl font-bold text-green-300 leading-none">{stat.value}</p>
                        <p className="text-xs text-muted mt-1 leading-tight">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {entry.bullets.length > 0 && (
                  <ul className="space-y-4">
                    {entry.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {entry.photos.length > 0 && <PhotoCarousel photos={entry.photos} />}
              </div>

            </div>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}
