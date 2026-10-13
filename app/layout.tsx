import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://ivanzhchen.com"),
  title: "Ivan Chen",
  description: "Computer science at Syracuse. Research in agent evaluation, geometry and computer vision; software development; and life outside work.",
  openGraph: { title: "Ivan Chen", description: "Research, software development, and a little about me.", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
