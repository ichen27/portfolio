"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Database, Brain, MessageSquare, ArrowRight, Zap } from "lucide-react";

const pipelineSteps = [
  {
    icon: FileText,
    label: "Document Ingestion",
    description: "PDFs, docs, and text files are parsed and chunked",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Database,
    label: "Vector Store",
    description: "Embeddings generated and stored in vector database",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Brain,
    label: "LLM Processing",
    description: "Query matched with relevant context via retrieval",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: MessageSquare,
    label: "Response Generation",
    description: "Contextual, accurate responses with source citations",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export function SkillPulseDemo({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const runAnimation = () => {
    setIsAnimating(true);
    setActiveStep(-1);
    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= pipelineSteps.length) {
        clearInterval(interval);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 800);
  };

  useEffect(() => {
    const timer = setTimeout(runAnimation, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
            <Brain className="size-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              RAG Pipeline Architecture
            </h3>
            <p className="text-xs text-zinc-500">
              Enterprise document Q&A system
            </p>
          </div>
        </div>
        <button
          onClick={runAnimation}
          disabled={isAnimating}
          className="flex items-center gap-1.5 rounded-lg bg-violet-600/20 px-3 py-1.5 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-600/30 disabled:opacity-50"
        >
          <Zap className="size-3" />
          Replay
        </button>
      </div>

      {/* Pipeline visualization */}
      <div className="space-y-3">
        {pipelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= activeStep;

          return (
            <div key={step.label}>
              <motion.div
                initial={{ opacity: 0.3, x: -10 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  x: isActive ? 0 : -10,
                }}
                transition={{ duration: 0.4 }}
                className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                  isActive
                    ? `${step.border} ${step.bg}`
                    : "border-white/5 bg-white/[0.01]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? step.bg : "bg-white/5"
                  }`}
                >
                  <Icon
                    className={`size-5 ${isActive ? step.color : "text-zinc-600"}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-medium ${
                        isActive ? "text-white" : "text-zinc-600"
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isActive && index === activeStep && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                      />
                    )}
                  </div>
                  <p
                    className={`text-xs ${isActive ? "text-zinc-400" : "text-zinc-700"}`}
                  >
                    {step.description}
                  </p>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-mono text-emerald-400"
                  >
                    OK
                  </motion.div>
                )}
              </motion.div>

              {/* Arrow between steps */}
              {index < pipelineSteps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowRight
                    className={`size-4 rotate-90 transition-colors ${
                      index < activeStep ? "text-violet-500/50" : "text-zinc-800"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
          <p className="text-lg font-bold text-white">6</p>
          <p className="text-xs text-zinc-500">Team Members</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
          <p className="text-lg font-bold text-violet-400">Prod</p>
          <p className="text-xs text-zinc-500">Deployment</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
          <p className="text-lg font-bold text-emerald-400">&lt;2s</p>
          <p className="text-xs text-zinc-500">Response Time</p>
        </div>
      </div>
    </div>
  );
}
