import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bllumo.com"),
  title: {
    default: "Bllumo — AI That Builds Around Your Life",
    template: "%s | Bllumo",
  },
  description:
    "Bllumo is building a personalized AI platform designed around your goals, preferences, and changing real-world needs. Join the waitlist for early access.",
  keywords: [
    "Bllumo",
    "Personal AI",
    "Adaptive AI",
    "AI platform",
    "Personalized systems",
    "Goal achievement",
    "Early access waitlist",
  ],
  authors: [{ name: "Bllumo Team" }],
  creator: "Bllumo",
  publisher: "Bllumo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bllumo.com",
    siteName: "Bllumo",
    title: "Bllumo — Personalized AI for Your Life",
    description:
      "One intelligent platform designed to understand your goals and build personalized experiences around you.",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Bllumo — AI That Builds Around Your Life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bllumo — Personalized AI for Your Life",
    description:
      "One intelligent platform designed to understand your goals and build personalized experiences around you.",
    images: ["/icon.svg"],
    creator: "@bllumo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://bllumo.com",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bllumo",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web, Cross-platform",
    description:
      "A personalized AI platform that understands what you want to achieve, creates an experience around your needs, and adapts as your life changes.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
    },
    creator: {
      "@type": "Organization",
      name: "Bllumo",
      url: "https://bllumo.com",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#070A12] text-[#F8FAFC] antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
