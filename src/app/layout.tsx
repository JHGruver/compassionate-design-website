import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Space_Mono,
  Bangers,
  Quicksand,
  Rubik,
  Orbitron,
  Bitter,
  Cinzel,
  Cormorant_Garamond,
  Anton,
} from "next/font/google";
import { LayoutWrapper } from "@/components/organisms/LayoutWrapper";
import "@/styles/main.scss";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// IP-specific fonts
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Compassionate Design | Design That Gives a Damn",
  description:
    "Where obsessive craft meets radical empathy. We build digital products that make people's lives better.",
  keywords: [
    "design",
    "software",
    "products",
    "digital",
    "compassionate",
    "user experience",
  ],
  authors: [{ name: "Compassionate Design LLC" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Compassionate Design | Design That Gives a Damn",
    description:
      "Where obsessive craft meets radical empathy. We build digital products that make people's lives better.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compassionate Design | Design That Gives a Damn",
    description:
      "Where obsessive craft meets radical empathy. We build digital products that make people's lives better.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${spaceMono.variable} ${bangers.variable} ${quicksand.variable} ${rubik.variable} ${orbitron.variable} ${bitter.variable} ${cinzel.variable} ${cormorantGaramond.variable} ${anton.variable} antialiased bg-background text-foreground`}
      >
        {/* Noise Overlay for texture */}
        <div className="noise-overlay" />

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
