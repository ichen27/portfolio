import Link from "next/link";
export type PortfolioTab = "Research" | "Development" | "Experience" | "About me";
const tabs: { label: PortfolioTab; href: string }[] = [
  { label: "Research", href: "/research/" },
  { label: "Development", href: "/development/" },
  { label: "Experience", href: "/experience/" },
  { label: "About me", href: "/about/" },
];
export function PortfolioShell({ active, children }: { active: PortfolioTab; children: React.ReactNode }) {
  return <main id="main" className="portfolio-page">
    <header className="site-header">
      <div className="masthead"><Link className="brand" href="/">Ivan Chen</Link>
        <div className="header-links"><a href="mailto:ivanzhchen@gmail.com">Email</a><a href="https://github.com/ichen27">GitHub</a><a href="https://www.linkedin.com/in/ivanzhchen/">LinkedIn</a><a href="/resume.pdf">Résumé ↗</a></div>
      </div>
      <nav className="section-tabs" aria-label="Portfolio sections">
        {tabs.map(tab => <Link key={tab.href} href={tab.href} aria-current={active === tab.label ? "page" : undefined}>{tab.label}</Link>)}
      </nav>
    </header>
    {children}
    <footer><span>Ivan Chen</span><span>October 2026</span><a href="mailto:ivanzhchen@gmail.com">Get in touch ↗</a></footer>
  </main>;
}
