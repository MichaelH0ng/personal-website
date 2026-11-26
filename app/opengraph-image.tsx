import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { content } from "@/config/content";

// Link-preview card shown when the site is shared (LinkedIn, iMessage, Slack, email).
// Generated once at build time. Applies to every page that doesn't define its own.

export const alt = `${content.name}, ${content.hero.eyebrow}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/MichaelHong_OCOBHeadshot.jpeg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 72px",
          background: "linear-gradient(135deg, #000000 0%, #052e16 60%, #14532d 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 320,
            height: 320,
            borderRadius: 9999,
            padding: 8,
            background: "linear-gradient(135deg, #86efac, #16a34a)",
            flexShrink: 0,
          }}
        >
          <img
            src={photoSrc}
            width={304}
            height={304}
            alt=""
            style={{ borderRadius: 9999, objectFit: "cover", objectPosition: "center 10%" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 28, color: "#86efac", marginBottom: 16, lineHeight: 1.3 }}>
            {content.hero.eyebrow.split(" · ").map((part) => (
              <div key={part}>{part}</div>
            ))}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginBottom: 24 }}>{content.name}</div>
          <div style={{ fontSize: 32, color: "#d1d5db", lineHeight: 1.4, maxWidth: 640 }}>
            Business meets tech. Building toward a career in music technology.
          </div>
        </div>
      </div>
    ),
    size
  );
}
