import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { company } from "@/lib/site";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
});

/** Vercel sets VERCEL_URL (no protocol). Optional NEXT_PUBLIC_SITE_URL for a custom production domain. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.shortName} | Defense & Expeditionary Infrastructure`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Weatherhaven Resource Inc. builds mission-specific deployable infrastructure for U.S. and allied SOF—shelter, power, environmental, and sustainment composed from mission profile, environment, personnel, mobility, timeline, and sustainment—not cookie-cutter catalog rows. AI-assisted configuration advisory, lead tracking, events support, and gated technical materials behind Request Access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${barlowCondensed.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans text-zinc-100 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
