import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://ivanzhchen.com"),
  title: "Ivan Chen",
  description: "Computer science at Syracuse. Work on agent systems, CAD and geometry, computer vision, and model evaluation.",
  openGraph: { title: "Ivan Chen", description: "Selected work, experiments, and engineering notes.", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
