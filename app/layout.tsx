import type { Metadata } from "next";
import { Geist, Geist_Mono, Pinyon_Script, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  weight: "400",
});

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

export const metadata: Metadata = {
  title: "Michael Hong",
  description: "Business Administration student at Cal Poly with a concentration in Information Systems and a Minor in Music, passionate about music technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pinyonScript.variable} ${poppins.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:outline-none"
        >
          Skip to main content
        </a>
        <ShaderBackground />
        {children}
      </body>
    </html>
  );
}
