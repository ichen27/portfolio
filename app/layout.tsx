import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl, siteConfig } from "@/lib/site-config";
import { SkipLinkFocusManager } from "@/components/skip-link-focus-manager";

const siteUrl = getSiteUrl();
const metadataBase = new URL(siteUrl);
const githubHandle = siteConfig.githubUrl.split("/").filter(Boolean).at(-1) ?? "";

export const metadata: Metadata = {
  metadataBase,
  applicationName: `${siteConfig.name} Portfolio`,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    title: `${siteConfig.name} Portfolio`,
  },
  alternates: {
    canonical: "/",
  },
  title: `${siteConfig.name} — CS & Finance @ Syracuse`,
  description: siteConfig.description,
  creator: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  category: "technology",
  keywords: [
    siteConfig.name,
    "software engineer",
    "Syracuse University",
    "CS",
    "finance",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — Portfolio`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Portfolio`,
    description: siteConfig.description,
    images: ["/og-image.svg"],
    creator: githubHandle ? `@${githubHandle}` : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="skip-link"
          aria-label="Skip navigation and jump to main content"
          aria-keyshortcuts="Alt+M"
          accessKey="m"
          data-skip-link="main-content"
        >
          Skip to main content
        </a>
        <SkipLinkFocusManager />
        {children}
      </body>
    </html>
  );
}
