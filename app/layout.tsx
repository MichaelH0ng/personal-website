import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const siteTitle = "Michael Hong | Business & Information Systems, Cal Poly";
const siteDescription =
  "Business Administration student at Cal Poly (Information Systems, Music minor, Class of 2027). Former technology consulting intern at Protiviti, building toward a career in music technology.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  // The link-preview image comes from app/opengraph-image.tsx.
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:outline-none"
        >
          Skip to main content
        </a>
        <ShaderBackground />
        <Navbar />
        <main id="main-content" className="flex-1 pt-16 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
