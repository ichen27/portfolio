export const siteConfig = {
  name: "Ivan Chen",
  siteUrl: "https://ichen27.github.io/portfolio",
  headline: "Computer Science & Finance @ Syracuse University",
  description:
    "Portfolio of Ivan Chen, a Computer Science major and Finance minor at Syracuse University. Building at the intersection of technology and finance.",
  email: "ivanzhchen@gmail.com",
  phoneE164: "+16466393128",
  phoneDisplay: "(646) 639-3128",
  githubUrl: "https://github.com/ichen27",
  social: {
    github: "https://github.com/ichen27",
  },
  heroStats: [
    { target: 8, suffix: "+ Projects" },
    { target: 3, suffix: "+ Internships" },
    { target: 100, suffix: "+ AI Calls Automated" },
  ],
  sectionLinks: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],
} as const;

const LOCAL_FALLBACK_SITE_URL = "http://localhost:3001";

function sanitizeSiteUrl(candidate: string | undefined): string | null {
  if (!candidate) {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return (
    sanitizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    sanitizeSiteUrl(siteConfig.siteUrl) ??
    LOCAL_FALLBACK_SITE_URL
  );
}
