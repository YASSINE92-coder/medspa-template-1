import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import content from "@/content";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(content.seo.siteUrl),
  title: {
    default: content.seo.defaultTitle,
    template: content.seo.titleTemplate,
  },
  description: content.seo.defaultDescription,
  openGraph: {
    title: content.seo.defaultTitle,
    description: content.seo.defaultDescription,
    images: [{ url: content.seo.ogImage.src, alt: content.seo.ogImage.alt }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
