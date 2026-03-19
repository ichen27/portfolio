"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

function AnimatedCounter({
  target,
  suffix,
  reduceMotion,
}: {
  target: number;
  suffix: string;
  reduceMotion: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) {
      return;
    }
    if (reduceMotion) return;

    let start: number | null = null;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, reduceMotion, target]);

  const displayCount = reduceMotion && isInView ? target : count;

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        ref={ref}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {displayCount}
        {suffix.match(/^\+/) ? "+" : ""}
      </span>
      <span className="text-sm text-zinc-500">
        {suffix.replace(/^\+?\s*/, "")}
      </span>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [firstName, ...restNameParts] = siteConfig.name.split(" ");
  const restName = restNameParts.join(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[150px]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open to opportunities
          </div>
        </motion.div>

        <motion.h1
          className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {firstName}{" "}
          <span className="gradient-text">{restName}</span>
        </motion.h1>

        <motion.p
          className="mb-3 text-lg text-zinc-300 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {siteConfig.headline}
        </motion.p>

        <motion.p
          className="mx-auto mb-12 max-w-lg text-base text-zinc-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Building at the intersection of technology and finance
        </motion.p>

        {/* Animated stat counters */}
        <motion.div
          className="mb-12 flex items-center justify-center gap-10 sm:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {siteConfig.heroStats.map((stat, idx) => (
            <div key={stat.suffix} className="contents">
              {idx > 0 && <div className="h-8 w-px bg-white/10" />}
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                reduceMotion={Boolean(prefersReducedMotion)}
              />
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            asChild
            className="h-11 rounded-lg bg-violet-600 px-6 text-white hover:bg-violet-700"
          >
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-11 rounded-lg border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
          >
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="h-11 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <a href="#contact">
              <Mail className="size-4" />
              Contact
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 8, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ArrowDown className="size-5 text-zinc-600" />
      </motion.div>
    </section>
  );
}
