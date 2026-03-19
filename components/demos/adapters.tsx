"use client";

import type { ProjectDemoAdapter } from "@/components/demos/types";
import { AlpacaDemo } from "@/components/demos/alpaca-demo";
import { FarEastDemo } from "@/components/demos/far-east-demo";
import { KalshiDemo } from "@/components/demos/kalshi-demo";

const DEFAULT_VALIDATED_AT = "2026-02-27";

function unavailableDemo(message: string) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm text-zinc-400">
      <p className="font-medium text-white">Demo In Progress</p>
      <p className="mt-2 leading-relaxed">{message}</p>
    </div>
  );
}

function createStaticAdapter(
  adapter: Omit<ProjectDemoAdapter, "validate">,
): ProjectDemoAdapter {
  return {
    ...adapter,
    validate: async () => ({
      ok: adapter.mode !== "unavailable",
      details:
        adapter.mode !== "unavailable"
          ? ["Adapter is wired to live portfolio demo component."]
          : ["Adapter exists but interactive demo is not implemented yet."],
    }),
  };
}

const adapterRegistry: Record<string, ProjectDemoAdapter> = {
  "far-east-call-agent": createStaticAdapter({
    projectId: "far-east-call-agent",
    mode: "mock",
    supportsMock: true,
    requiredEnv: [],
    fallbackAsset: "/demos/far-east-call-agent.mp4",
    lastValidatedAt: DEFAULT_VALIDATED_AT,
    renderDemo: () => <FarEastDemo />,
  }),
  "kalshi-trading": createStaticAdapter({
    projectId: "kalshi-trading",
    mode: "mock",
    supportsMock: true,
    requiredEnv: [],
    fallbackAsset: "/demos/kalshi-trading.mp4",
    lastValidatedAt: DEFAULT_VALIDATED_AT,
    renderDemo: () => <KalshiDemo />,
  }),
  "alpaca-trading": createStaticAdapter({
    projectId: "alpaca-trading",
    mode: "mock",
    supportsMock: true,
    requiredEnv: [],
    fallbackAsset: "/demos/alpaca-trading.mp4",
    lastValidatedAt: DEFAULT_VALIDATED_AT,
    renderDemo: () => <AlpacaDemo />,
  }),
  "openclaw-dashboard": createStaticAdapter({
    projectId: "openclaw-dashboard",
    mode: "unavailable",
    supportsMock: false,
    requiredEnv: [],
    fallbackAsset: "/demos/openclaw-dashboard.mp4",
    lastValidatedAt: DEFAULT_VALIDATED_AT,
    renderDemo: () =>
      unavailableDemo(
        "OpenClaw interactive showcase is being rebuilt from the cloned repository and will replace the placeholder soon.",
      ),
  }),
  "talkmeup-features": createStaticAdapter({
    projectId: "talkmeup-features",
    mode: "unavailable",
    supportsMock: false,
    requiredEnv: [],
    fallbackAsset: "/demos/talkmeup-features.mp4",
    lastValidatedAt: DEFAULT_VALIDATED_AT,
    renderDemo: () =>
      unavailableDemo(
        "TalkMeUp demo will be connected after feature modules are unified into one runnable MVP entrypoint.",
      ),
  }),
  "temporal-crime-prediction": createStaticAdapter({
    projectId: "temporal-crime-prediction",
    mode: "unavailable",
    supportsMock: false,
    requiredEnv: [],
    fallbackAsset: "/demos/temporal-crime-prediction.mp4",
    lastValidatedAt: DEFAULT_VALIDATED_AT,
    renderDemo: () =>
      unavailableDemo(
        "Temporal Crime Prediction demo is pending the lightweight app wrapper milestone.",
      ),
  }),
  "syracuse-crime-analysis": createStaticAdapter({
    projectId: "syracuse-crime-analysis",
    mode: "unavailable",
    supportsMock: false,
    requiredEnv: [],
    fallbackAsset: "/demos/syracuse-crime-analysis.mp4",
    lastValidatedAt: DEFAULT_VALIDATED_AT,
    renderDemo: () =>
      unavailableDemo(
        "Syracuse Crime Analysis demo is pending the lightweight interactive analytics wrapper milestone.",
      ),
  }),
};

export function getDemoAdapter(projectId: string): ProjectDemoAdapter | null {
  return adapterRegistry[projectId] ?? null;
}
