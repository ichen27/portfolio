import Link from "next/link";
import { developmentWork } from "@/lib/work";
import { PortfolioShell } from "@/components/portfolio-shell";
export const metadata = { title: "Development — Ivan Chen" };
export default function DevelopmentPage() {
  return <PortfolioShell active="Development">
    <header className="page-intro"><h1>Development</h1><p>Applications and systems I’m building: from tools I use myself to housing discovery and software for my parents’ restaurant.</p></header>
    <section id="development" aria-label="Development projects" className="project-list">
      {developmentWork.map(item => <article className="project-entry" key={item.slug}>
        {item.image && <figure className="project-image">
          <Link href={`/work/${item.slug}/`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} />
          </Link><figcaption>{item.image.caption}</figcaption>
        </figure>}
        <div className="project-copy"><p className="work-meta">{item.area} · {item.status}</p><h2><Link href={`/work/${item.slug}/`}>{item.title}</Link></h2>
        <p>{item.summary}</p><Link className="read-link" href={`/work/${item.slug}/`}>Read about the project →<span className="sr-only"> {item.title}</span></Link></div>
      </article>)}
    </section>
  </PortfolioShell>;
}
