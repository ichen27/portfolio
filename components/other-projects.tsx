"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
}

const projects: Project[] = [
  {
    title: "Temporal Crime Prediction",
    description:
      "Random Forest classifier built for Syracuse PD to predict temporal crime patterns using historical data analysis and feature engineering.",
    tech: ["Python", "scikit-learn", "Random Forest"],
    github: "https://github.com/ichen27/crime-prediction",
  },
  {
    title: "Syracuse Crime Analysis",
    description:
      "Comprehensive data visualization and statistical analysis of crime patterns across Syracuse, NY with interactive mapping and trend analysis.",
    tech: ["Python", "Jupyter", "Matplotlib"],
    github: "https://github.com/ichen27/syracuse-crime",
  },
  {
    title: "Internet Bubble Analysis",
    description:
      "Financial data analysis examining the dot-com bubble through quantitative metrics, market indicators, and historical price data.",
    tech: ["Python", "Pandas", "Financial Analysis"],
    github: "https://github.com/ichen27/internet-bubble",
  },
];

export function OtherProjects() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            More Work
          </span>
        </motion.div>

        <motion.h2
          className="mb-10 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Other Projects
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card group relative flex flex-col rounded-xl p-5 transition-all hover:border-violet-500/20"
            >
              <div className="mb-3 flex items-center justify-between">
                <Github className="size-5 text-zinc-500" />
                <ArrowUpRight className="size-4 text-zinc-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-white">
                {project.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="rounded-md border border-white/5 bg-white/5 text-xs text-zinc-500"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
