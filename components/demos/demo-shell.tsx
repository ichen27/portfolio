import type { ReactNode } from "react";
import type { DemoMode } from "@/components/demos/types";

interface DemoShellProps {
  title: string;
  mode: DemoMode;
  lastValidatedAt?: string;
  children: ReactNode;
}

function modeLabel(mode: DemoMode): string {
  switch (mode) {
    case "live":
      return "Live";
    case "mock":
      return "Mock";
    case "fallback":
      return "Fallback";
    case "unavailable":
      return "Unavailable";
    default:
      return mode;
  }
}

export function DemoShell({
  title,
  mode,
  lastValidatedAt,
  children,
}: DemoShellProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-white">{title} Demo</p>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-300">
            {modeLabel(mode)}
          </span>
        </div>
        {lastValidatedAt && (
          <p className="mt-1 text-xs text-zinc-500">
            Last validated: {lastValidatedAt}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
