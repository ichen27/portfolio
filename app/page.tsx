import Link from "next/link";
import { work } from "@/lib/work";

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
        <nav aria-label="On this page"><a href="#experience">Experience</a><a href="#work">Work</a><a href="mailto:ivanzhchen@gmail.com">Email ↗</a></nav>
        <h1>Ivan Chen</h1>
        <p className="lede">I’m a senior studying computer science at Syracuse University, with a minor in finance.</p>
        <p>I’m interested in AI and the systems that make it useful. Lately, that’s meant building agent tools, working through geometry problems, and testing how models behave when they have to do more than produce a good answer.</p>
        <div className="contact"><a href="mailto:ivanzhchen@gmail.com">Email</a><a href="https://github.com/ichen27">GitHub</a><a href="https://www.linkedin.com/in/ivanzhchen/">LinkedIn</a><a href="/resume.pdf">Résumé ↗</a></div>
      </header>

      <section id="experience" aria-labelledby="experience-heading">
        <div className="section-heading"><h2 id="experience-heading">Experience</h2><span>A few places I’ve learned by building.</span></div>
        <div className="experience-list">
          {experience.map(([company, role, date, description]) => (
            <div className="experience" key={company}>
              <div className="experience-top"><h3>{company}</h3><time>{date}</time></div>
              <p className="role">{role}</p>
              <p>{description}</p>
              {company === "Cloudflare" && <p className="small-links"><Link href="/work/cloudflare-metrics">Business metrics ↗</Link><Link href="/work/cloudflare-forecasting">Forecasting ↗</Link></p>}
            </div>
          ))}
        </div>
      </section>

      <section id="work" aria-labelledby="work-heading">
        <div className="section-heading"><h2 id="work-heading">Selected work</h2><span>Working software, experiments, and open questions.</span></div>
        <div className="work-list">
          {work.map((item, index) => (
            <article className="work-row" key={item.slug}>
              <span className="work-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="work-meta">{item.area} <span>·</span> {item.status}</div>
                <h3><Link href={`/work/${item.slug}`}>{item.title}<span aria-hidden="true"> ↗</span></Link></h3>
                <p>{item.summary}</p>
                <Link className="read-link" href={`/work/${item.slug}`}>Notes & evidence <span aria-hidden="true">→</span><span className="sr-only"> for {item.title}</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="personal" aria-labelledby="outside-heading">
        <h2 id="outside-heading">Why I like building</h2>
        <p>My parents built a restaurant from the ground up. Building tools for their work made software feel personal: something I could use to give back. That’s still the part I care about—learning enough to make something useful.</p>
        <p>If you’re working on a problem in this neighborhood, <a href="mailto:ivanzhchen@gmail.com">I’d like to hear about it</a>.</p>
      </section>
      <footer><span>Ivan Chen</span><span>Last updated October 2026</span><a href="#main">Back to top ↑</a></footer>
    </main>
  );
}
