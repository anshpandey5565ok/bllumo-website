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

const SITE_HOSTNAME = "https://www.bllumo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_HOSTNAME),
  title: {
    default: "Bllumo — Turn Personal Goals Into Plans That Fit Your Life",
    template: "%s | Bllumo",
  },
  description:
    "Bllumo is building an AI platform that turns your goals, preferences, and practical constraints into personalized plans that adapt as circumstances change.",
  keywords: [
    "Bllumo",
    "Personal AI",
    "Adaptive Planning",
    "Goal Planning AI",
    "Adaptive Productivity",
    "Personalized Routines",
    "Early Access Waitlist",
  ],
  authors: [{ name: "Bllumo" }],
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
    url: SITE_HOSTNAME,
    siteName: "Bllumo",
    title: "Bllumo — Turn Personal Goals Into Plans That Fit Your Life",
    description:
      "Bllumo is building an AI platform that turns your goals, preferences, and practical constraints into personalized plans.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bllumo — Personal AI · In Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bllumo — Turn Personal Goals Into Plans That Fit Your Life",
    description:
      "Bllumo is building an AI platform that turns your goals, preferences, and practical constraints into personalized plans.",
    images: ["/og-image.png"],
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
    canonical: SITE_HOSTNAME,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Bllumo",
        url: SITE_HOSTNAME,
        logo: `${SITE_HOSTNAME}/android-chrome-512x512.png`,
        description: "Adaptive personal AI platform under active development.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Bllumo",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web, Cross-platform",
        description:
          "An AI platform designed to turn goals, preferences, and practical constraints into personalized plans.",
        creator: {
          "@type": "Organization",
          name: "Bllumo",
          "url": SITE_HOSTNAME,
        },
      },
    ],
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
        {/* Accessible Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold"
        >
          Skip to main content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
