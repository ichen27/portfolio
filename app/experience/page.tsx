import Link from "next/link";
import { PortfolioShell } from "@/components/portfolio-shell";
const experience = [
  ["Cloudflare", "Product Manager", "May–Aug 2026", "Internal analytics and forecasting tools for Professional Services."],
  ["Handshake AI", "AI Fellow", "2026–present", "Coding-agent benchmarks, reference solutions, and reproducible evaluation."],
  ["Slice Consulting", "Technical Project Manager", "2025–present", "Leading a four-person team building internal software and AI integrations."],
  ["Advance Student Resource Systems", "Software Engineering Intern", "2025–2026", "Reporting, surveys, data visualization, and LLM-assisted insights."],
  ["Rebellion Research", "Quantitative Research Intern", "2025", "Model fine-tuning and data pipelines for quantitative research."],
  ["TalkMeUp AI", "AI Engineering Intern", "2025", "Led a six-engineer team working on AI-native platform architecture."],
];

export const metadata = { title: "Experience — Ivan Chen" };
export default function ExperiencePage() { return <PortfolioShell active="Experience"><header className="page-intro"><h1>Experience</h1><p>Computer science at Syracuse University. Work across AI evaluation, software engineering, and product development.</p></header>      <section id="experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="sr-only">Roles</h2>
        <div className="experience-list">
          {experience.map(([company, role, date, description]) => (
            <div className="experience" key={company}>
              <div className="experience-top"><h3>{company}</h3><span className="date">{date}</span></div>
              <p className="role">{role}</p><p>{description}</p>
              {company === "Handshake AI" && <p className="small-links"><Link href="/work/handshake-benchmarks/">Benchmark methods & results ↗</Link></p>}
              {company === "Cloudflare" && <p className="small-links"><Link href="/work/cloudflare-metrics/">Business metrics ↗</Link><Link href="/work/cloudflare-forecasting/">Forecasting ↗</Link></p>}
            </div>
          ))}
        </div>
      </section>
</PortfolioShell>; }
