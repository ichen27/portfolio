import type { ReactNode } from "react";

export type DemoMode = "live" | "mock" | "fallback" | "unavailable";

export interface DemoValidationResult {
  ok: boolean;
  details: string[];
}

export interface ProjectDemoAdapter {
  projectId: string;
  mode: DemoMode;
  supportsMock: boolean;
  requiredEnv: string[];
  fallbackAsset?: string;
  lastValidatedAt: string;
  validate: () => Promise<DemoValidationResult>;
  renderDemo: () => ReactNode;
}
