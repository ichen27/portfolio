"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    name: "Languages",
    color: "from-violet-500/20 to-violet-600/5",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"],
  },
  {
    name: "Frontend",
    color: "from-blue-500/20 to-blue-600/5",
    skills: ["Next.js", "React", "Vue.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    name: "Backend",
    color: "from-cyan-500/20 to-cyan-600/5",
    skills: ["Node.js", "Express", "Prisma"],
  },
  {
    name: "AI / ML",
    color: "from-purple-500/20 to-purple-600/5",
    skills: ["RAG Systems", "AI Agents", "MCP", "scikit-learn", "OpenAI"],
  },
  {
    name: "Data",
    color: "from-amber-500/20 to-amber-600/5",
    skills: ["Pandas", "NumPy", "Matplotlib", "PostgreSQL", "SQLite"],
  },
  {
    name: "Finance",
    color: "from-emerald-500/20 to-emerald-600/5",
    skills: [
      "Kalshi API",
      "Alpaca API",
      "SEC Filings",
      "Portfolio Optimization",
    ],
  },
  {
    name: "Tools",
    color: "from-rose-500/20 to-rose-600/5",
    skills: ["Git", "Docker", "Agile", "OpenClaw"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Skills
          </span>
        </motion.div>

        <motion.h2
          className="mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technologies &{" "}
          <span className="gradient-text">expertise</span>
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card group relative overflow-hidden rounded-xl p-5"
            >
              {/* Gradient accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 transition-opacity group-hover:opacity-100`}
              />
              <div className="relative">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:bg-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
