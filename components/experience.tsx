"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Briefcase } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
}

const experiences: Experience[] = [
  {
    company: "TalkMeUp AI",
    role: "Software Engineering Intern",
    period: "Summer 2024",
    bullets: [
      "Led a 6-person team to design and ship production-ready RAG Systems for enterprise clients",
      "Built internal analytics dashboards and customer-facing applications from concept to deployment",
      "Developed LLM-powered systems with sophisticated data pipelines using Agile methodology",
      "Architected document ingestion and vector search infrastructure for real-time knowledge retrieval",
    ],
    tech: ["RAG", "LLMs", "Python", "Data Pipelines", "Agile"],
  },
  {
    company: "Rebellion Rebellion",
    role: "Software Engineering Intern",
    period: "2024",
    bullets: [
      "Built large-scale data pipeline integrating OHLC price data with SEC 13F institutional filings",
      "Developed AI-driven trading signal agent using portfolio optimization models",
      "Managed and processed millions of financial records with SQL-based infrastructure",
      "Created automated workflows for ingesting and analyzing institutional trading data",
    ],
    tech: ["Python", "SQL", "AI Agents", "Portfolio Optimization", "SEC Filings"],
  },
  {
    company: "ASRS",
    role: "Software Engineering Intern",
    period: "2023",
    bullets: [
      "Collaborated in an 8-person team to design a comprehensive data pipeline and reporting platform",
      "Translated stakeholder requirements into UML diagrams and technical specifications",
      "Designed system architecture for scalable data processing and visualization",
      "Implemented end-to-end features from requirements gathering through deployment",
    ],
    tech: ["System Design", "UML", "Data Pipelines", "Architecture"],
  },
];

function TimelineItem({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="relative pl-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
        <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
      </div>

      {/* Card */}
      <div className="glass-card rounded-xl p-5 transition-all">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
            <p className="text-sm text-zinc-400">{exp.role}</p>
          </div>
          <span className="shrink-0 rounded-md bg-white/5 px-2.5 py-1 text-xs text-zinc-500">
            {exp.period}
          </span>
        </div>

        {/* Expand/collapse button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-sm text-violet-400 transition-colors hover:text-violet-300"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show details"}
          <ChevronDown
            className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-zinc-400"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="rounded-md border border-white/5 bg-white/5 text-xs text-zinc-400"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Experience
          </span>
        </motion.div>

        <motion.h2
          className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Where I&apos;ve{" "}
          <span className="gradient-text">made impact</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-[13px] top-0 w-px bg-gradient-to-b from-violet-500/30 via-white/10 to-transparent" />

          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
