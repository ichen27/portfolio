"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Code, TrendingUp } from "lucide-react";

const focusAreas = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "Building production applications from frontend to backend with modern frameworks",
  },
  {
    icon: TrendingUp,
    title: "Quantitative Finance",
    description:
      "Developing automated trading systems and financial analysis tools",
  },
  {
    icon: GraduationCap,
    title: "AI & Machine Learning",
    description:
      "Creating AI agents, RAG systems, and ML-powered applications",
  },
];

const highlights = [
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "AI/ML",
  "Trading Systems",
  "RAG",
  "Data Pipelines",
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-violet-400">
            About
          </span>
        </motion.div>

        <motion.h2
          className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Passionate about building at the
          <br />
          <span className="gradient-text">intersection of tech & finance</span>
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-base leading-relaxed text-zinc-400">
              I&apos;m a junior at Syracuse University studying Computer Science
              with a minor in Finance. My work spans full-stack development,
              AI/ML systems, and quantitative finance — driven by a curiosity
              for how technology can transform financial markets.
            </p>
            <p className="text-base leading-relaxed text-zinc-400">
              From leading teams to build production-ready RAG systems to
              deploying AI voice agents handling 100+ monthly calls, I focus on
              shipping real products that solve real problems. My trading systems
              operate live on both prediction and equity markets.
            </p>

            {/* Skill highlights */}
            <div className="flex flex-wrap gap-2 pt-4">
              {highlights.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-md border border-white/5 bg-white/5 text-zinc-300"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Education + Focus Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Education card */}
            <div className="glass-card rounded-xl p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                  <GraduationCap className="size-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Syracuse University
                  </h3>
                  <p className="text-sm text-zinc-500">Junior • 2022 — 2026</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400">
                B.S. Computer Science • Minor in Finance
              </p>
            </div>

            {/* Focus areas */}
            <div className="space-y-3">
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="glass-card flex items-start gap-3 rounded-xl p-4 transition-colors"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <area.icon className="size-4 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      {area.title}
                    </h4>
                    <p className="text-xs text-zinc-500">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
