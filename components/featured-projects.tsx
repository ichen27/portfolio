"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { FarEastDemo } from "@/components/demos/far-east-demo";
import { KalshiDemo } from "@/components/demos/kalshi-demo";
import { AlpacaDemo } from "@/components/demos/alpaca-demo";
import { SkillPulseDemo } from "@/components/demos/skillpulse-demo";
import { QuantPrepDemo } from "@/components/demos/quantprep-demo";

const projects = [
  {
    title: "Far-East-Call-Agent",
    description:
      "AI voice agent deployed in a live restaurant, autonomously handling customer calls, taking orders, and managing inquiries with natural conversation.",
    tech: ["JavaScript", "Twilio", "OpenAI"],
    stats: [
      { label: "calls/month", value: "100+" },
      { label: "hours saved", value: "10+/mo" },
    ],
    github: "https://github.com/ichen27/far-east-call-agent",
    featured: true,
    demoKey: "fareast" as const,
  },
  {
    title: "Kalshi Trading System",
    description:
      "Automated trading strategies on prediction markets including volatility arbitrage, market making, and momentum-based signal detection.",
    tech: ["TypeScript", "Kalshi API", "Node.js"],
    stats: [
      { label: "strategies", value: "3 Active" },
    ],
    github: "https://github.com/ichen27/kalshi-trading",
    featured: true,
    demoKey: "kalshi" as const,
  },
  {
    title: "Alpaca Trading System",
    description:
      "Automated stock trading platform implementing swing trading strategies with real-time market data analysis and portfolio management.",
    tech: ["TypeScript", "Alpaca API", "Market Data"],
    stats: [
      { label: "win rate", value: "64%" },
      { label: "sharpe", value: "1.42" },
    ],
    github: "https://github.com/ichen27/alpaca-trading",
    featured: true,
    demoKey: "alpaca" as const,
  },
  {
    title: "SkillPulse RAG Platform",
    description:
      "Enterprise RAG system with LLM-powered analytics for document Q&A, built with a production-grade ingestion pipeline and vector search.",
    tech: ["Python", "RAG", "LLMs", "Vector DB"],
    stats: [
      { label: "team", value: "Led 6-person" },
      { label: "status", value: "Production" },
    ],
    featured: false,
    demoKey: "skillpulse" as const,
  },
  {
    title: "QuantPrep",
    description:
      "Interactive coding interview preparation platform with 7 topics and 40+ problems, featuring in-browser code execution and syntax highlighting.",
    tech: ["JavaScript", "Pyodide", "CodeMirror"],
    github: "https://github.com/ichen27/interview_prep_platform",
    featured: false,
    demoKey: "quantprep" as const,
  },
];

function getDemoComponent(key: string) {
  const noop = () => {};
  switch (key) {
    case "fareast":
      return <FarEastDemo onClose={noop} />;
    case "kalshi":
      return <KalshiDemo onClose={noop} />;
    case "alpaca":
      return <AlpacaDemo onClose={noop} />;
    case "skillpulse":
      return <SkillPulseDemo onClose={noop} />;
    case "quantprep":
      return <QuantPrepDemo onClose={noop} />;
    default:
      return null;
  }
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Projects
          </span>
        </motion.div>

        <motion.h2
          className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Featured{" "}
          <span className="gradient-text">work</span>
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* First card spans full width */}
          <div className="md:col-span-2">
            <ProjectCard
              {...projects[0]}
              demo={getDemoComponent(projects[0].demoKey)}
            />
          </div>

          {/* Remaining cards in 2-col grid */}
          {projects.slice(1).map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
              demo={getDemoComponent(project.demoKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
