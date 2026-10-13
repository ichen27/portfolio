import Link from "next/link";
import { researchWork } from "@/lib/work";

const experience = [
  ["Cloudflare", "Product Manager", "May–Aug 2026", "Internal analytics and forecasting tools for Professional Services."],
  ["Handshake AI", "AI Fellow", "2026–present", "Coding-agent benchmarks, reference solutions, and reproducible evaluation."],
  ["Slice Consulting", "Technical Project Manager", "2025–present", "Leading a four-person team building internal software and AI integrations."],
  ["Advance Student Resource Systems", "Software Engineering Intern", "2025–2026", "Reporting, surveys, data visualization, and LLM-assisted insights."],
  ["Rebellion Research", "Quantitative Research Intern", "2025", "Model fine-tuning and data pipelines for quantitative research."],
  ["TalkMeUp AI", "AI Engineering Intern", "2025", "Led a six-engineer team working on AI-native platform architecture."],
];

export default function Home() {
  return (
    <main id="main" className="home">
      <header className="intro">
        <nav aria-label="On this page"><a href="#work">Research</a><a href="#experience">Experience</a><a href="mailto:ivanzhchen@gmail.com">Email ↗</a></nav>
        <h1>Ivan Chen</h1>
        <p className="lede">Computer science at Syracuse University.</p>
        <p>I’m interested in how agents make decisions, how geometry can be verified, and how images become 3D representations. These are notes from my experiments: the questions, the methods, and what the results actually show.</p>
        <div className="contact"><a href="mailto:ivanzhchen@gmail.com">Email</a><a href="https://github.com/ichen27">GitHub</a><a href="https://www.linkedin.com/in/ivanzhchen/">LinkedIn</a><a href="/resume.pdf">Résumé ↗</a></div>
      </header>

      <section id="work" aria-labelledby="work-heading">
        <div className="section-heading"><h2 id="work-heading">Research & experiments</h2><span>Methods, results, and open questions.</span></div>
        <div className="research-list">
          {researchWork.map(item => (
            <article className="research-row" key={item.slug}>
              <Link className="research-figure" href={`/work/${item.slug}/`} aria-label={`Read ${item.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image!.src} alt={item.image!.alt} width={item.image!.width} height={item.image!.height} />
              </Link>
              <div className="research-description">
                <p className="work-meta">{item.area}</p>
                <h3><Link href={`/work/${item.slug}/`}>{item.title}</Link></h3>
                <p className="research-summary">{item.summary}</p>
                <p className="finding">{item.finding}</p>
                <div className="research-links"><Link href={`/work/${item.slug}/`}>Study & results →</Link><a href={item.evidence!.download}>Data ↗<span className="sr-only"> for {item.title}</span></a></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-heading">
        <div className="section-heading"><h2 id="experience-heading">Experience</h2></div>
        <div className="experience-list">
          {experience.map(([company, role, date, description]) => (
            <div className="experience" key={company}>
              <div className="experience-top"><h3>{company}</h3><span className="date">{date}</span></div>
              <p className="role">{role}</p><p>{description}</p>
              {company === "Cloudflare" && <p className="small-links"><Link href="/work/cloudflare-metrics/">Business metrics ↗</Link><Link href="/work/cloudflare-forecasting/">Forecasting ↗</Link></p>}
            </div>
          ))}
        </div>
      </section>
      <footer><span>Ivan Chen</span><span>October 2026</span><a href="mailto:ivanzhchen@gmail.com">Get in touch ↗</a></footer>
    </main>
  );
}
