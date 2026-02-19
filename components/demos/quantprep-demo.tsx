"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, CheckCircle2 } from "lucide-react";

const sampleProblem = {
  title: "Two Sum",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
  code: `def two_sum(nums: list[int], target: int) -> list[int]:
    """Find two indices that sum to target."""
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Example
print(two_sum([2, 7, 11, 15], 9))
# Output: [0, 1]`,
};

const topics = [
  { name: "Arrays & Hashing", count: 8, color: "text-blue-400" },
  { name: "Two Pointers", count: 5, color: "text-violet-400" },
  { name: "Sliding Window", count: 4, color: "text-cyan-400" },
  { name: "Stack", count: 6, color: "text-amber-400" },
  { name: "Binary Search", count: 5, color: "text-emerald-400" },
  { name: "Linked List", count: 7, color: "text-rose-400" },
  { name: "Trees", count: 6, color: "text-purple-400" },
];

export function QuantPrepDemo({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"problem" | "topics">("problem");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
            <BookOpen className="size-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">QuantPrep</h3>
            <p className="text-xs text-zinc-500">
              Interactive coding interview prep
            </p>
          </div>
        </div>
        <div className="flex gap-1 rounded-lg bg-white/[0.03] p-0.5">
          <button
            onClick={() => setActiveTab("problem")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "problem"
                ? "bg-white/10 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Problem
          </button>
          <button
            onClick={() => setActiveTab("topics")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "topics"
                ? "bg-white/10 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Topics
          </button>
        </div>
      </div>

      {activeTab === "problem" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Problem description */}
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">
                {sampleProblem.title}
              </h4>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                {sampleProblem.difficulty}
              </Badge>
            </div>
            <p className="text-xs text-zinc-500">{sampleProblem.category}</p>
            <div className="mt-3 whitespace-pre-line text-xs leading-relaxed text-zinc-400">
              {sampleProblem.description}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-600/30">
                <Play className="size-3" />
                Run Code
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/10">
                <CheckCircle2 className="size-3" />
                Submit
              </button>
            </div>
          </div>

          {/* Code editor mockup */}
          <div className="overflow-hidden rounded-lg border border-white/5 bg-[#0d0d0d]">
            {/* Editor header */}
            <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-zinc-600">solution.py</span>
            </div>
            {/* Code content */}
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
              <code>
                {sampleProblem.code.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 inline-block w-5 select-none text-right text-zinc-700">
                      {i + 1}
                    </span>
                    <span className="text-zinc-300">
                      {colorize(line)}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      ) : (
        /* Topics grid */
        <div className="space-y-2">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${topic.color}`}>
                  {topic.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500">
                  {topic.count} problems
                </span>
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-violet-500/50"
                    style={{ width: `${(topic.count / 8) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
            <p className="text-sm font-semibold text-white">
              40+ Problems
            </p>
            <p className="text-xs text-zinc-500">across 7 topics</p>
          </div>
        </div>
      )}
    </div>
  );
}

function colorize(line: string): React.ReactNode {
  // Simple syntax highlighting
  if (line.trimStart().startsWith("#")) {
    return <span className="text-zinc-600">{line}</span>;
  }
  if (line.trimStart().startsWith('"""') || line.trimStart().startsWith("'''")) {
    return <span className="text-emerald-600">{line}</span>;
  }
  return line
    .replace(/(def |return |for |in |if )/g, "§KW§$1§/KW§")
    .replace(/(print)/g, "§FN§$1§/FN§")
    .split(/§(KW|FN|\/KW|\/FN)§/)
    .reduce<{ inKw: boolean; inFn: boolean; nodes: React.ReactNode[] }>(
      (acc, part) => {
        if (part === "KW") return { ...acc, inKw: true };
        if (part === "/KW") return { ...acc, inKw: false };
        if (part === "FN") return { ...acc, inFn: true };
        if (part === "/FN") return { ...acc, inFn: false };
        if (acc.inKw) {
          acc.nodes.push(
            <span key={acc.nodes.length} className="text-violet-400">
              {part}
            </span>
          );
        } else if (acc.inFn) {
          acc.nodes.push(
            <span key={acc.nodes.length} className="text-blue-400">
              {part}
            </span>
          );
        } else {
          acc.nodes.push(<span key={acc.nodes.length}>{part}</span>);
        }
        return acc;
      },
      { inKw: false, inFn: false, nodes: [] }
    ).nodes;
}
