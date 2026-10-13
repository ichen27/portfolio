import Link from "next/link";
import { researchWork } from "@/lib/work";
import { PortfolioShell } from "@/components/portfolio-shell";
export default function ResearchPage() {
  return <PortfolioShell active="Research">
    <header className="page-intro"><h1>Research</h1>
      <p>I study how agents fail, where decision models help, and how to build dependable 3D systems. These experiments connect measured results to the larger problems I’m working on.</p>
    </header>
    <section id="research" aria-label="Research studies"><span id="work" aria-hidden="true" />
      <div className="research-list">{researchWork.map(item => <article className="research-row" key={item.slug}>
        <Link className="research-figure" href={`/work/${item.slug}/`} aria-label={`Read ${item.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image!.src} alt={item.image!.alt} width={item.image!.width} height={item.image!.height} />
        </Link>
        <div className="research-description">
          <p className="work-meta">{item.area}</p>
          <h2><Link href={`/work/${item.slug}/`}>{item.title}</Link></h2>
          <p className="research-summary">{item.summary}</p><p className="finding">{item.finding}</p>
          <div className="research-links"><Link href={`/work/${item.slug}/`}>Methods & comparisons →</Link><a href={item.evidence!.download}>Data ↗<span className="sr-only"> for {item.title}</span></a></div>
        </div>
      </article>)}</div>
    </section>
  </PortfolioShell>;
}
