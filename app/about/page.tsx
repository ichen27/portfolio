import { PortfolioShell } from "@/components/portfolio-shell";
export const metadata = { title: "About me — Ivan Chen" };
export default function AboutPage() {
  return <PortfolioShell active="About me"><header className="page-intro"><h1>About me</h1><p>Away from work and school.</p></header>
    <section id="about" className="about-story" aria-labelledby="golf-heading"><h2 id="golf-heading">Golf</h2>
      <p>I love to golf. I picked up the game in 2024 and reached a 15 handicap two years later.</p>
      <div className="golf-milestones"><p><span>2024</span>Picked up the game</p><p><span>2026</span>15 handicap</p></div>
    </section>
  </PortfolioShell>;
}
