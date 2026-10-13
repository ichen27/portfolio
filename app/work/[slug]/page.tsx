import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allWork } from "@/lib/work";

export const dynamicParams = false;
export function generateStaticParams() { return allWork.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = allWork.find((entry) => entry.slug === slug);
  return { title: item ? `${item.title} — Ivan Chen` : "Not found — Ivan Chen", description: item?.summary };
}
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = allWork.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return (
    <main id="main" className="case-study">
      <nav aria-label="Breadcrumb"><Link href="/#work">← Ivan Chen / Work</Link></nav>
      <header>
        <p className="work-meta">{item.area} · {item.status}</p>
        <h1>{item.title}</h1>
        <p className="question">{item.question}</p>
      </header>
      {item.image && <figure>
        {/* Evidence images retain their original framing. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} />
        <figcaption>{item.image.caption}</figcaption>
      </figure>}
      {item.flow && <figure className="flow-figure">
        <ol className="flow">{item.flow.map((step) => <li key={step}>{step}</li>)}</ol>
        <figcaption>{item.status === "Design in progress" ? "Proposed workflow." : "A simplified view of the workflow described below."}</figcaption>
      </figure>}
      <div className="prose">{item.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
      {item.links && <section className="sources"><h2>Explore the work</h2><ul>{item.links.map((link) => <li key={link.href}><a href={link.href}>{link.label} ↗</a></li>)}</ul></section>}
      <footer><Link href="/#work">← All work</Link><a href="mailto:ivanzhchen@gmail.com">Get in touch ↗</a></footer>
    </main>
  );
}
