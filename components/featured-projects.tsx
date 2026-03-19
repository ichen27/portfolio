"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { getDemoAdapter } from "@/components/demos/adapters";
import { featuredProjects } from "@/lib/projects";

export function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;
  const primaryProject = featuredProjects[0];
  const primaryDemoAdapter = getDemoAdapter(primaryProject.id);

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
              title={primaryProject.title}
              description={primaryProject.description}
              tech={primaryProject.tech}
              stats={primaryProject.stats}
              github={primaryProject.github ?? undefined}
              featured={primaryProject.featured}
              demo={primaryDemoAdapter?.renderDemo() ?? undefined}
              demoMode={primaryDemoAdapter?.mode}
              demoLastValidatedAt={primaryDemoAdapter?.lastValidatedAt}
            />
          </div>

          {/* Remaining cards in 2-col grid */}
          {featuredProjects.slice(1).map((project) => {
            const demoAdapter = getDemoAdapter(project.id);
            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
                stats={project.stats}
                github={project.github ?? undefined}
                featured={project.featured}
                demo={demoAdapter?.renderDemo() ?? undefined}
                demoMode={demoAdapter?.mode}
                demoLastValidatedAt={demoAdapter?.lastValidatedAt}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
