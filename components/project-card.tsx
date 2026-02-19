"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  X,
  Play,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  stats?: { label: string; value: string }[];
  github?: string;
  featured?: boolean;
  demo?: React.ReactNode;
}

export function ProjectCard({
  title,
  description,
  tech,
  stats,
  github,
  featured,
  demo,
}: ProjectCardProps) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={`glass-card group relative overflow-hidden rounded-xl p-6 transition-all ${
          featured ? "glow-purple" : ""
        }`}
      >
        {/* Featured indicator */}
        {featured && (
          <div className="absolute right-4 top-4">
            <Sparkles className="size-4 text-violet-400" />
          </div>
        )}

        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-500">
          {description}
        </p>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-sm font-bold text-white">{stat.value}</p>
                <p className="text-xs text-zinc-600">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech badges */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-md border border-white/5 bg-white/5 text-xs text-zinc-400"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {demo && (
            <Button
              onClick={() => setShowDemo(true)}
              size="sm"
              className="rounded-lg bg-violet-600 text-xs text-white hover:bg-violet-700"
            >
              <Play className="size-3" />
              Try Demo
            </Button>
          )}
          {github && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-lg text-xs text-zinc-400 hover:text-white"
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="size-3.5" />
                Code
                <ExternalLink className="size-3" />
              </a>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Demo modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowDemo(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f0f] p-6"
            >
              {/* Modal header */}
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <button
                  onClick={() => setShowDemo(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close demo"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Demo content */}
              {demo}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
