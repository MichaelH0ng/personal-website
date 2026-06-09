import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/config/content";

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const interestIcons: Record<string, string> = {
  "Calisthenics":        "🏋️",
  "Guitar":              "🎸",
  "Piano":               "🎹",
  "Running":             "🏃",
  "Singing/Songwriting": "🎤",
  "Soccer":              "⚽",
};

export function generateStaticParams() {
  return content.interests.map((i) => ({ slug: toSlug(i.name) }));
}

export default async function InterestPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const interest = content.interests.find((i) => toSlug(i.name) === slug);
  if (!interest) notFound();

  const hasPhotos = interest.photos.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 flex-1">
        <section className="py-20 bg-gradient-to-br from-green-50/40 via-white to-green-50/40 min-h-full">
          <div className="max-w-4xl mx-auto px-6">

            {/* Back */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-12 transition-colors group"
            >
              <svg
                className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to About
            </Link>

            {/* Header card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="h-2 bg-gradient-to-r from-green-600 to-green-400" />
              <div className="p-8 flex items-center gap-6">
                <span className="text-6xl">{interestIcons[interest.name] ?? "✨"}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1">Interest</p>
                  <h1 className="text-3xl font-bold text-gray-900">{interest.name}</h1>
                </div>
              </div>
            </div>

            {/* Description */}
            {interest.description && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6 mb-8">
                <p className="text-gray-600 leading-relaxed">{interest.description}</p>
              </div>
            )}

            {/* Photos */}
            {hasPhotos ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {interest.photos.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                    <Image src={src} alt={`${interest.name} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 flex flex-col items-center justify-center text-center gap-4">
                <span className="text-7xl">{interestIcons[interest.name] ?? "✨"}</span>
                <p className="text-gray-400 text-sm">Photos coming soon</p>
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
