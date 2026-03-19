import manifestData from "@/projects/manifest.json";

export type ProjectMvpTier = "tier1" | "tier2";
export type ProjectDemoMode = "live" | "mock" | "fallback" | "unavailable";

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectManifestEntry {
  id: string;
  title: string;
  description: string;
  tech: string[];
  stats?: ProjectStat[];
  github: string | null;
  repoPath: string;
  featured: boolean;
  demoKey: string;
  mvpTier: ProjectMvpTier;
  demoMode: ProjectDemoMode;
  localRunCommand: string;
  mockRunCommand: string;
  healthCheck: string;
  evidencePaths: string[];
  portfolioCardCopy: string;
}

const VALID_MVP_TIERS: ReadonlySet<ProjectMvpTier> = new Set(["tier1", "tier2"]);
const VALID_DEMO_MODES: ReadonlySet<ProjectDemoMode> = new Set([
  "live",
  "mock",
  "fallback",
  "unavailable",
]);
const ALLOWED_ENTRY_FIELDS = new Set([
  "id",
  "title",
  "description",
  "tech",
  "stats",
  "github",
  "repoPath",
  "featured",
  "demoKey",
  "mvpTier",
  "demoMode",
  "localRunCommand",
  "mockRunCommand",
  "healthCheck",
  "evidencePaths",
  "portfolioCardCopy",
]);
const PROJECT_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DEMO_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER_COMMANDS = new Set(["n/a", "na", "none", "todo", "tbd", "-"]);
const DISALLOWED_COMMAND_TOKENS = ["|", ";", "`", "$(", "\n", "\r", ">", "<"];
const ALLOWED_COMMAND_EXECUTABLE_PREFIXES = ["npm ", "npx ", "node ", "python ", "bash ", "pnpm ", "yarn ", "uv "];
const TECH_TOKEN_PATTERN = /^[A-Za-z0-9.+#/-]+(?: [A-Za-z0-9.+#/-]+)*$/;
const SENTENCE_ENDING_PATTERN = /[.!?]$/;

function assertString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid manifest field '${fieldName}': expected non-empty string.`);
  }
  return value.trim();
}

function assertStringArray(value: unknown, fieldName: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`Invalid manifest field '${fieldName}': expected string array.`);
  }

  const normalized = value.map((item) => item.trim());
  if (new Set(normalized).size !== normalized.length) {
    throw new Error(`Invalid manifest field '${fieldName}': expected unique values.`);
  }

  return normalized;
}

function assertNonEmptyStringArray(value: unknown, fieldName: string): string[] {
  const values = assertStringArray(value, fieldName);
  if (values.length === 0) {
    throw new Error(`Invalid manifest field '${fieldName}': expected at least one value.`);
  }
  return values;
}

function assertPathArray(value: unknown, fieldName: string): string[] {
  const paths = assertStringArray(value, fieldName);
  for (const path of paths) {
    if (path.startsWith("/") || path.includes("..") || path.includes("\\") || path.length > 240) {
      throw new Error(`Invalid manifest field '${fieldName}': unsafe path '${path}'.`);
    }
    if (path.endsWith("/")) {
      throw new Error(`Invalid manifest field '${fieldName}': trailing slash is not allowed.`);
    }
    const segments = path.split("/");
    if (segments.some((segment) => segment.length === 0 || segment === ".")) {
      throw new Error(`Invalid manifest field '${fieldName}': malformed path '${path}'.`);
    }
  }
  return paths;
}

function assertBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid manifest field '${fieldName}': expected boolean.`);
  }
  return value;
}

function assertStats(value: unknown): ProjectStat[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    throw new Error("Invalid manifest field 'stats': expected [{ label, value }].");
  }

  const stats = value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid manifest field 'stats[${index}]': expected object.`);
    }
    const record = item as Record<string, unknown>;
    return {
      label: assertString(record.label, `stats[${index}].label`),
      value: assertString(record.value, `stats[${index}].value`),
    };
  });

  if (new Set(stats.map((stat) => stat.label)).size !== stats.length) {
    throw new Error("Invalid manifest field 'stats': duplicate stat labels are not allowed.");
  }
  if (stats.length === 0) {
    throw new Error("Invalid manifest field 'stats': expected at least one stat when provided.");
  }
  if (stats.length > 4) {
    throw new Error("Invalid manifest field 'stats': expected at most four stats.");
  }
  for (const stat of stats) {
    if (stat.label.length > 32 || stat.value.length > 32) {
      throw new Error("Invalid manifest field 'stats': label/value must be 32 characters or fewer.");
    }
  }

  return stats;
}

function assertSlug(value: string, fieldName: string, pattern: RegExp): string {
  if (!pattern.test(value)) {
    throw new Error(`Invalid manifest field '${fieldName}': expected kebab-case slug.`);
  }
  return value;
}

function assertUrl(value: string, fieldName: string): string {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
    return parsed.toString();
  } catch {
    throw new Error(`Invalid manifest field '${fieldName}': expected URL.`);
  }
}

function assertGitHubUrl(value: string): string {
  const normalized = assertUrl(value, "github");
  const parsed = new URL(normalized);
  if (parsed.hostname !== "github.com") {
    throw new Error("Invalid manifest field 'github': expected github.com URL.");
  }
  const pathSegments = parsed.pathname.split("/").filter(Boolean);
  if (pathSegments.length !== 2 || !/^\/[^/]+\/[^/]+$/.test(parsed.pathname)) {
    throw new Error("Invalid manifest field 'github': expected canonical /owner/repo path.");
  }
  if (parsed.search || parsed.hash) {
    throw new Error("Invalid manifest field 'github': query/hash is not allowed.");
  }
  return normalized;
}

function assertHealthCheckUrl(value: string): string {
  const normalized = assertUrl(value, "healthCheck");
  const parsed = new URL(normalized);
  if (parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1") {
    throw new Error("Invalid manifest field 'healthCheck': expected localhost URL.");
  }
  if (!parsed.port) {
    throw new Error("Invalid manifest field 'healthCheck': explicit port is required.");
  }
  if (parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error("Invalid manifest field 'healthCheck': auth/query/hash is not allowed.");
  }
  return parsed.toString();
}

function assertRepoPath(value: string): string {
  if (!value.startsWith("projects/")) {
    throw new Error("Invalid manifest field 'repoPath': expected path under projects/.");
  }
  if (value.includes("..") || value.startsWith("/")) {
    throw new Error("Invalid manifest field 'repoPath': path traversal is not allowed.");
  }
  if (value.includes("//") || value.endsWith("/")) {
    throw new Error("Invalid manifest field 'repoPath': malformed slash pattern.");
  }
  if (value.length > 180) {
    throw new Error("Invalid manifest field 'repoPath': expected 180 characters or fewer.");
  }
  const segments = value.split("/").filter(Boolean);
  if (segments.length < 2) {
    throw new Error("Invalid manifest field 'repoPath': expected a project subdirectory.");
  }
  return value;
}

function assertCommand(value: string, fieldName: string): string {
  const normalized = value.trim();
  if (PLACEHOLDER_COMMANDS.has(normalized.toLowerCase())) {
    throw new Error(`Invalid manifest field '${fieldName}': placeholder command is not allowed.`);
  }
  if (normalized.length > 220) {
    throw new Error(`Invalid manifest field '${fieldName}': command is too long.`);
  }
  if (!normalized.startsWith("cd projects/")) {
    throw new Error(`Invalid manifest field '${fieldName}': command must start in projects/.`);
  }
  if (!normalized.includes(" && ")) {
    throw new Error(`Invalid manifest field '${fieldName}': command must chain with '&&'.`);
  }
  for (const token of DISALLOWED_COMMAND_TOKENS) {
    if (normalized.includes(token)) {
      throw new Error(`Invalid manifest field '${fieldName}': disallowed token '${token}'.`);
    }
  }
  return normalized;
}

function assertCommandRepoPath(command: string, repoPath: string, fieldName: string): string {
  const match = /^cd\s+([^\s]+)\s+&&\s+(.+)$/.exec(command);
  if (!match) {
    throw new Error(`Invalid manifest field '${fieldName}': missing 'cd <path> &&' prefix.`);
  }
  const [, commandPath, commandSuffixRaw] = match;
  const commandSuffix = commandSuffixRaw.trim();
  if (commandPath !== repoPath && !commandPath.startsWith(`${repoPath}/`)) {
    throw new Error(
      `Invalid manifest field '${fieldName}': command path must be '${repoPath}' or a child path.`,
    );
  }
  if (commandSuffix.length === 0) {
    throw new Error(`Invalid manifest field '${fieldName}': command suffix cannot be empty.`);
  }
  if (commandSuffix.startsWith("cd ")) {
    throw new Error(`Invalid manifest field '${fieldName}': nested cd chaining is not allowed.`);
  }
  if (commandSuffix.includes("&&")) {
    throw new Error(`Invalid manifest field '${fieldName}': expected a single executable command.`);
  }
  if (!ALLOWED_COMMAND_EXECUTABLE_PREFIXES.some((prefix) => commandSuffix.startsWith(prefix))) {
    throw new Error(
      `Invalid manifest field '${fieldName}': command suffix must start with a supported executable.`,
    );
  }
  return command;
}

function parseManifestEntry(entry: unknown, index: number): ProjectManifestEntry {
  if (!entry || typeof entry !== "object") {
    throw new Error(`Invalid manifest entry at index ${index}: expected object.`);
  }

  const record = entry as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (!ALLOWED_ENTRY_FIELDS.has(key)) {
      throw new Error(`Invalid manifest field '${key}' at index ${index}: unsupported field.`);
    }
  }

  const mvpTier = assertString(record.mvpTier, "mvpTier");
  const demoMode = assertString(record.demoMode, "demoMode");
  if (!VALID_MVP_TIERS.has(mvpTier as ProjectMvpTier)) {
    throw new Error(`Invalid manifest field 'mvpTier': '${mvpTier}' is not supported.`);
  }
  if (!VALID_DEMO_MODES.has(demoMode as ProjectDemoMode)) {
    throw new Error(`Invalid manifest field 'demoMode': '${demoMode}' is not supported.`);
  }

  const stats = assertStats(record.stats);

  const github = record.github;
  if (github !== null && github !== undefined && typeof github !== "string") {
    throw new Error("Invalid manifest field 'github': expected string or null.");
  }

  const repoPath = assertRepoPath(assertString(record.repoPath, "repoPath"));
  const localRunCommand = assertCommandRepoPath(
    assertCommand(assertString(record.localRunCommand, "localRunCommand"), "localRunCommand"),
    repoPath,
    "localRunCommand",
  );
  const mockRunCommand = assertCommandRepoPath(
    assertCommand(assertString(record.mockRunCommand, "mockRunCommand"), "mockRunCommand"),
    repoPath,
    "mockRunCommand",
  );
  const healthCheckRaw = assertString(record.healthCheck, "healthCheck");
  const healthCheck = healthCheckRaw === "n/a" ? "n/a" : assertHealthCheckUrl(healthCheckRaw);
  if (demoMode === "live" && healthCheck === "n/a") {
    throw new Error("Invalid manifest state: live demos must include a healthCheck URL.");
  }

  const portfolioCardCopy = assertString(record.portfolioCardCopy, "portfolioCardCopy");
  if (portfolioCardCopy.length < 24) {
    throw new Error("Invalid manifest field 'portfolioCardCopy': expected at least 24 characters.");
  }
  if (portfolioCardCopy.length > 180) {
    throw new Error("Invalid manifest field 'portfolioCardCopy': expected 180 characters or fewer.");
  }
  if (!SENTENCE_ENDING_PATTERN.test(portfolioCardCopy)) {
    throw new Error("Invalid manifest field 'portfolioCardCopy': expected sentence-ending punctuation.");
  }

  const id = assertSlug(assertString(record.id, "id"), "id", PROJECT_ID_PATTERN);
  const demoKey = assertSlug(assertString(record.demoKey, "demoKey"), "demoKey", DEMO_KEY_PATTERN);
  if (id.length < 3 || id.length > 48) {
    throw new Error("Invalid manifest field 'id': expected length between 3 and 48 characters.");
  }
  if (demoKey.length < 3 || demoKey.length > 32) {
    throw new Error("Invalid manifest field 'demoKey': expected length between 3 and 32 characters.");
  }
  if (!github && demoMode !== "unavailable") {
    throw new Error(`Invalid manifest state: project '${id}' requires github URL when demo is available.`);
  }
  const evidencePaths = assertPathArray(record.evidencePaths, "evidencePaths");
  if (evidencePaths.length === 0) {
    throw new Error("Invalid manifest field 'evidencePaths': at least one path is required.");
  }
  const tech = assertNonEmptyStringArray(record.tech, "tech");
  const normalizedTechSet = new Set(tech.map((item) => item.toLowerCase()));
  if (normalizedTechSet.size !== tech.length) {
    throw new Error("Invalid manifest field 'tech': duplicate values are not allowed.");
  }
  if (tech.length > 8) {
    throw new Error("Invalid manifest field 'tech': expected at most eight values.");
  }
  for (const techToken of tech) {
    if (techToken.length > 24 || !TECH_TOKEN_PATTERN.test(techToken)) {
      throw new Error("Invalid manifest field 'tech': values must use a safe compact label format.");
    }
  }

  const title = assertString(record.title, "title");
  if (title.length > 80) {
    throw new Error("Invalid manifest field 'title': expected 80 characters or fewer.");
  }

  const description = assertString(record.description, "description");
  if (description.length > 220) {
    throw new Error("Invalid manifest field 'description': expected 220 characters or fewer.");
  }
  if (!SENTENCE_ENDING_PATTERN.test(description)) {
    throw new Error("Invalid manifest field 'description': expected sentence-ending punctuation.");
  }
  if (description.toLowerCase() === portfolioCardCopy.toLowerCase()) {
    throw new Error("Invalid manifest state: 'description' and 'portfolioCardCopy' must not be identical.");
  }

  return {
    id,
    title,
    description,
    tech,
    stats: stats as ProjectStat[] | undefined,
    github: github ? assertGitHubUrl(github) : null,
    repoPath,
    featured: assertBoolean(record.featured, "featured"),
    demoKey,
    mvpTier: mvpTier as ProjectMvpTier,
    demoMode: demoMode as ProjectDemoMode,
    localRunCommand,
    mockRunCommand,
    healthCheck,
    evidencePaths,
    portfolioCardCopy,
  };
}

function loadProjectManifest(): ProjectManifestEntry[] {
  if (!Array.isArray(manifestData)) {
    throw new Error("Manifest must be an array.");
  }

  const manifest = manifestData.map((entry, index) => parseManifestEntry(entry, index));
  const idSet = new Set<string>();
  const demoKeySet = new Set<string>();
  const titleSet = new Set<string>();
  const repoPathSet = new Set<string>();
  const evidencePathSet = new Set<string>();
  const portfolioCardCopySet = new Set<string>();
  const healthCheckUrlSet = new Set<string>();
  let tier1Count = 0;
  let tier2Count = 0;
  let availableDemoCount = 0;

  for (const entry of manifest) {
    if (idSet.has(entry.id)) {
      throw new Error(`Duplicate project id in manifest: '${entry.id}'.`);
    }
    if (demoKeySet.has(entry.demoKey)) {
      throw new Error(`Duplicate demoKey in manifest: '${entry.demoKey}'.`);
    }
    const normalizedTitle = entry.title.toLowerCase();
    if (titleSet.has(normalizedTitle)) {
      throw new Error(`Duplicate project title in manifest: '${entry.title}'.`);
    }
    if (repoPathSet.has(entry.repoPath)) {
      throw new Error(`Duplicate repoPath in manifest: '${entry.repoPath}'.`);
    }
    if (entry.github) {
      const githubRepoSlug = new URL(entry.github).pathname.split("/").filter(Boolean)[1] ?? "";
      const repoPathSlug = entry.repoPath.split("/").filter(Boolean).at(-1) ?? "";
      if (githubRepoSlug.toLowerCase() !== repoPathSlug.toLowerCase()) {
        throw new Error(
          `Invalid manifest state: github repo '${githubRepoSlug}' must align with repoPath slug '${repoPathSlug}' for '${entry.id}'.`,
        );
      }
    }
    if (entry.featured && entry.mvpTier !== "tier1") {
      throw new Error(`Invalid manifest state: featured project '${entry.id}' must be tier1.`);
    }
    if (!entry.featured && entry.mvpTier === "tier1") {
      throw new Error(`Invalid manifest state: non-featured project '${entry.id}' cannot be tier1.`);
    }
    if (entry.demoMode !== "unavailable" && entry.healthCheck === "n/a") {
      throw new Error(
        `Invalid manifest state: demoMode '${entry.demoMode}' for '${entry.id}' must include a healthCheck URL.`,
      );
    }
    if (entry.demoMode === "unavailable" && entry.healthCheck !== "n/a") {
      throw new Error(
        `Invalid manifest state: demoMode 'unavailable' for '${entry.id}' must use healthCheck 'n/a'.`,
      );
    }
    if (entry.healthCheck !== "n/a") {
      if (healthCheckUrlSet.has(entry.healthCheck)) {
        throw new Error(`Duplicate healthCheck URL in manifest: '${entry.healthCheck}'.`);
      }
      healthCheckUrlSet.add(entry.healthCheck);
    }
    const normalizedCardCopy = entry.portfolioCardCopy.toLowerCase();
    if (portfolioCardCopySet.has(normalizedCardCopy)) {
      throw new Error(`Duplicate portfolioCardCopy in manifest: '${entry.id}'.`);
    }
    for (const evidencePath of entry.evidencePaths) {
      if (!evidencePath.startsWith(entry.repoPath)) {
        throw new Error(
          `Invalid manifest field 'evidencePaths': '${evidencePath}' must be under '${entry.repoPath}'.`,
        );
      }
      if (evidencePathSet.has(evidencePath)) {
        throw new Error(`Duplicate evidence path in manifest: '${evidencePath}'.`);
      }
      evidencePathSet.add(evidencePath);
    }
    idSet.add(entry.id);
    demoKeySet.add(entry.demoKey);
    titleSet.add(normalizedTitle);
    repoPathSet.add(entry.repoPath);
    portfolioCardCopySet.add(normalizedCardCopy);
    if (entry.mvpTier === "tier1") {
      tier1Count += 1;
    } else {
      tier2Count += 1;
    }
    if (entry.demoMode !== "unavailable") {
      availableDemoCount += 1;
    }
  }

  if (tier1Count === 0 || tier2Count === 0) {
    throw new Error("Invalid manifest state: expected both tier1 and tier2 projects.");
  }
  if (availableDemoCount === 0) {
    throw new Error("Invalid manifest state: expected at least one available (non-unavailable) demo mode.");
  }

  return manifest;
}

export const projectManifest = loadProjectManifest();
const projectById = new Map(projectManifest.map((project) => [project.id, project]));
const projectByDemoKey = new Map(projectManifest.map((project) => [project.demoKey, project]));

export const featuredProjects = projectManifest.filter((project) => project.featured);
export const otherProjects = projectManifest.filter((project) => !project.featured);

if (featuredProjects.length === 0) {
  throw new Error("Invalid manifest state: at least one featured project is required.");
}

if (otherProjects.length === 0) {
  throw new Error("Invalid manifest state: at least one non-featured project is required.");
}

export function getProjectById(id: string): ProjectManifestEntry | undefined {
  return projectById.get(id);
}

export function getProjectByDemoKey(demoKey: string): ProjectManifestEntry | undefined {
  return projectByDemoKey.get(demoKey);
}
