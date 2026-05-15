import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://maharishi-leadership.vercel.app";
const siteTitle =
  "Maharishi Center for Leadership | Transcendental Meditation for Executive Performance";
const siteDescription =
  "A four-month executive development programme that uses Transcendental Meditation to strengthen clarity, creativity, resilience, health, and sustained leadership performance.";

const bodyFont = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maharishi Center for Leadership",
    template: "%s | Maharishi Center for Leadership",
  },
  description: siteDescription,
  applicationName: "Maharishi Center for Leadership",
  keywords: [
    "Maharishi Center for Leadership",
    "Transcendental Meditation",
    "executive leadership programme",
    "stress reduction",
    "resilience training",
    "brain coherence",
    "leadership performance",
  ],
  authors: [{ name: "Maharishi Center for Leadership" }],
  creator: "Maharishi Center for Leadership",
  publisher: "Maharishi Center for Leadership",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteTitle,
    description: siteDescription,
    siteName: "Maharishi Center for Leadership",
    images: [
      {
        url: "/images/man-leader.webp",
        width: 1200,
        height: 630,
        alt: "Maharishi Center for Leadership",
      },
    ],    
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/man-leader.webp"],
  },
  robots: {
    index: true,
    follow: true,
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
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full bg-background`}
    >
    <Head>
      <meta name="google-site-verification" content="AuSHddI7bhNIDIvKB_X3iHHBe2bEMGY8nY4IvUn7O6o" />
    </Head>
      <body className="min-h-full flex flex-col text-foreground antialiased">

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9G7N260J6H"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9G7N260J6H');
          `}
        </Script>
        {/* <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        /> */}

        {/* <Script id="calendly-badge-init" strategy="afterInteractive">
          {`
            window.onload = function () {
              if (window.Calendly && window.Calendly.initBadgeWidget) {
                window.Calendly.initBadgeWidget({
                  url: 'https://calendly.com/maharishileadership/30min',
                  text: 'Schedule time with me',
                  color: '#0069ff',
                  textColor: '#ffffff',
                  branding: true
                });
              }
            };
          `}
        </Script> */}
        {children}
      </body>
    </html>
  );
}
