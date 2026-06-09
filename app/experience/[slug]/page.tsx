import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { content } from "@/config/content";

function toSlug(title: string, org: string) {
  return `${title}-${org}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Entry = {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  logo: string;
  bullets: string[];
  photos: string[];
  section: "Education" | "Work Experience" | "Leadership & Involvement";
};

function getAllEntries(): Entry[] {
  return [
    ...content.education.map((e) => ({
      slug: toSlug(e.school, e.degree),
      title: e.school,
      subtitle: e.degree,
      location: e.location,
      dates: e.dates,
      logo: e.logo,
      bullets: e.bullets,
      photos: [],
      section: "Education" as const,
    })),
    ...content.experience.map((e) => ({
      slug: toSlug(e.title, e.company),
      title: e.title,
      subtitle: e.company,
      location: e.location,
      dates: e.dates,
      logo: e.logo,
      bullets: e.bullets,
      photos: e.photos ?? [],
      section: "Work Experience" as const,
    })),
    ...content.leadership.map((l) => ({
      slug: toSlug(l.title, l.org),
      title: l.title,
      subtitle: l.org,
      location: l.location,
      dates: l.dates,
      logo: l.logo,
      bullets: l.bullets,
      photos: [],
      section: "Leadership & Involvement" as const,
    })),
  ];
}

export function generateStaticParams() {
  return getAllEntries().map((e) => ({ slug: e.slug }));
}

export default async function ExperienceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const entries = getAllEntries();
  const entry = entries.find((e) => e.slug === slug);

  if (!entry) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 flex-1">
        <section className="py-20 bg-gradient-to-br from-green-50/40 via-white to-green-50/40 min-h-full">
          <div className="max-w-4xl mx-auto px-6">

            {/* Back */}
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-12 transition-colors group"
            >
              <svg
                className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Experience
            </Link>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Top banner */}
              <div className="h-2 bg-gradient-to-r from-green-600 to-green-400" />

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-10 items-start">

                  {/* Logo */}
                  <div className="flex-shrink-0 w-36 h-36 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                    <Image
                      src={entry.logo}
                      alt={entry.subtitle}
                      width={112}
                      height={112}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">
                      {entry.section}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                      {entry.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-1">{entry.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-8">
                      {entry.dates} · {entry.location}
                    </p>

                    {entry.bullets.length > 0 && (
                      <ul className="space-y-4">
                        {entry.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.bullets.length === 0 && (
                      <p className="text-gray-400 text-sm italic">No additional details.</p>
                    )}

                    <PhotoCarousel photos={entry.photos} />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
