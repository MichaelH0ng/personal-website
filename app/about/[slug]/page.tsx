import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { content } from "@/config/content";
import { interestSlug } from "@/lib/slugs";
import GlassCard from "@/components/GlassCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return content.interests.map((i) => ({ slug: interestSlug(i.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const interest = content.interests.find((i) => interestSlug(i.name) === slug);
  if (!interest) return {};
  return {
    title: `${interest.name} | ${content.name}`,
    description: interest.description.split("\n\n")[0].slice(0, 160),
  };
}

export default async function InterestPage({ params }: Props) {
  const { slug } = await params;
  const interest = content.interests.find((i) => interestSlug(i.name) === slug);
  if (!interest) notFound();

  const hasPhotos = interest.photos.length > 0;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">

        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm text-muted hover:text-white mb-10 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <svg className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to About
        </Link>

        <GlassCard className="overflow-hidden mb-8">
          <div className="h-1 bg-green-600" aria-hidden="true" />
          <div className="p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-300 mb-1">Interest</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{interest.name}</h1>
          </div>
        </GlassCard>

        {interest.description && (
          <GlassCard className="px-8 py-6 mb-8 space-y-4">
            {interest.description.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed">{paragraph}</p>
            ))}
          </GlassCard>
        )}

        {hasPhotos && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {interest.photos.map((src, i) => (
              <div key={src} className="relative aspect-square rounded-2xl overflow-hidden border border-green-500/30">
                <Image
                  src={src}
                  alt={`${interest.name} photo ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
