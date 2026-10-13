import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://ivanzhchen.com"),
  title: "Ivan Chen",
  description: "Computer science at Syracuse. Research and experiments in agent reliability, computational geometry, 3D representation, and computer vision.",
  openGraph: { title: "Ivan Chen", description: "Research methods, measured results, and experimental artifacts.", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
