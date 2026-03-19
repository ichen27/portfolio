"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { siteConfig } from "@/lib/site-config";

export function SiteNav() {
  const [activeSectionId, setActiveSectionId] = useState<string>(siteConfig.sectionLinks[0]?.id ?? "");
  const manualSelectionRef = useRef<{ id: string; expiresAt: number } | null>(null);
  const navLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeSectionLabel = siteConfig.sectionLinks.find((link) => link.id === activeSectionId)?.label ?? "Home";

  useEffect(() => {
    const sectionIds = siteConfig.sectionLinks.map((link) => link.id as string);
    const clearManualSelection = () => {
      manualSelectionRef.current = null;
    };

    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      let normalizedHash = hash;
      try {
        normalizedHash = decodeURIComponent(hash);
      } catch {
        normalizedHash = hash;
      }
      if (normalizedHash && sectionIds.includes(normalizedHash)) {
        clearManualSelection();
        setActiveSectionId(normalizedHash);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);

    const sections = siteConfig.sectionLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return () => {
        window.removeEventListener("hashchange", syncFromHash);
        window.removeEventListener("popstate", syncFromHash);
      };
    }

    const setActiveFromViewport = () => {
      const manualSelection = manualSelectionRef.current;
      if (manualSelection && Date.now() < manualSelection.expiresAt) {
        setActiveSectionId(manualSelection.id);
        return;
      }
      clearManualSelection();

      if (window.scrollY <= 8) {
        const firstSection = sections[0];
        if (firstSection) {
          setActiveSectionId(firstSection.id);
        }
        return;
      }

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          setActiveSectionId(lastSection.id);
        }
        return;
      }

      const nearestSection = sections.reduce<{ id: string; distance: number } | null>((nearest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - 120);
        if (!nearest || distance < nearest.distance) {
          return { id: section.id, distance };
        }
        return nearest;
      }, null);

      if (nearestSection) {
        setActiveSectionId(nearestSection.id);
      }
    };

    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;
    const scheduleViewportSync = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        setActiveFromViewport();
      });
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleViewportSync();
      }
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        scheduleViewportSync();
      });
      sections.forEach((section) => resizeObserver?.observe(section));
      resizeObserver.observe(document.documentElement);
    }

    if (typeof IntersectionObserver === "undefined") {
      setActiveFromViewport();
      window.addEventListener("scroll", scheduleViewportSync, { passive: true });
      window.addEventListener("resize", scheduleViewportSync);
      window.addEventListener("orientationchange", scheduleViewportSync);
      window.addEventListener("focus", scheduleViewportSync);
      window.addEventListener("pageshow", scheduleViewportSync);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        resizeObserver?.disconnect();
        window.removeEventListener("hashchange", syncFromHash);
        window.removeEventListener("popstate", syncFromHash);
        window.removeEventListener("scroll", scheduleViewportSync);
        window.removeEventListener("resize", scheduleViewportSync);
        window.removeEventListener("orientationchange", scheduleViewportSync);
        window.removeEventListener("focus", scheduleViewportSync);
        window.removeEventListener("pageshow", scheduleViewportSync);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        if (rafId !== 0) {
          window.cancelAnimationFrame(rafId);
        }
      };
    }

    const sectionOrder = new Map(sections.map((section, index) => [section.id, index] as const));
    const visibility = new Map<string, number>();
    const calculateActiveSection = () => {
      if (visibility.size === 0) {
        scheduleViewportSync();
        return;
      }

      const nextActive = [...visibility.entries()].sort((a, b) => {
        const ratioDiff = b[1] - a[1];
        if (Math.abs(ratioDiff) > 0.01) {
          return ratioDiff;
        }

        return (sectionOrder.get(a[0]) ?? Number.MAX_SAFE_INTEGER) - (sectionOrder.get(b[0]) ?? Number.MAX_SAFE_INTEGER);
      })[0]?.[0];

      if (nextActive) {
        setActiveSectionId(nextActive);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibility.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibility.delete(entry.target.id);
          }
        });

        calculateActiveSection();
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    const handleSectionFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const focusedSection = sections.find((section) => section.contains(target));
      if (focusedSection) {
        setActiveSectionId(focusedSection.id);
      }
    };

    sections.forEach((section) => section.addEventListener("focusin", handleSectionFocusIn));
    setActiveFromViewport();
    window.addEventListener("scroll", scheduleViewportSync, { passive: true });
    window.addEventListener("resize", scheduleViewportSync);
    window.addEventListener("orientationchange", scheduleViewportSync);
    window.addEventListener("focus", scheduleViewportSync);
    window.addEventListener("pageshow", scheduleViewportSync);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      resizeObserver?.disconnect();
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("scroll", scheduleViewportSync);
      window.removeEventListener("resize", scheduleViewportSync);
      window.removeEventListener("orientationchange", scheduleViewportSync);
      window.removeEventListener("focus", scheduleViewportSync);
      window.removeEventListener("pageshow", scheduleViewportSync);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sections.forEach((section) => section.removeEventListener("focusin", handleSectionFocusIn));
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const setActiveFromClick = (sectionId: string) => {
    manualSelectionRef.current = {
      id: sectionId,
      expiresAt: Date.now() + 1200,
    };
    setActiveSectionId(sectionId);
  };
  const focusNavLinkAtIndex = (index: number) => {
    const links = navLinkRefs.current.filter((link): link is HTMLAnchorElement => Boolean(link));
    if (links.length === 0) {
      return;
    }
    const boundedIndex = ((index % links.length) + links.length) % links.length;
    links[boundedIndex]?.focus();
  };
  const handleNavLinkKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusNavLinkAtIndex(index + 1);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusNavLinkAtIndex(index - 1);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusNavLinkAtIndex(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      focusNavLinkAtIndex(siteConfig.sectionLinks.length - 1);
      return;
    }
    if (event.key === "PageDown") {
      event.preventDefault();
      focusNavLinkAtIndex(index + 1);
      return;
    }
    if (event.key === "PageUp") {
      event.preventDefault();
      focusNavLinkAtIndex(index - 1);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Current section: {activeSectionLabel}
      </p>
      <nav
        className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Primary"
      >
        <a
          href="#hero"
          aria-current={activeSectionId === "hero" ? "location" : undefined}
          className="text-sm font-semibold tracking-wide text-white transition-colors hover:text-violet-300"
          onClick={() => setActiveFromClick("hero")}
        >
          {siteConfig.name}
        </a>
        <ul className="no-scrollbar flex max-w-[60vw] items-center gap-4 overflow-x-auto py-1 sm:max-w-none">
          {siteConfig.sectionLinks.map((link, index) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeSectionId === link.id ? "location" : undefined}
                aria-label={`Jump to ${link.label}`}
                aria-controls={link.id}
                className={`text-xs uppercase tracking-wider transition-colors ${
                  activeSectionId === link.id
                    ? "text-violet-300"
                    : "text-zinc-400 hover:text-white"
                }`}
                onFocus={() => setActiveFromClick(link.id)}
                onClick={() => setActiveFromClick(link.id)}
                onKeyDown={(event) => handleNavLinkKeyDown(event, index)}
                ref={(node) => {
                  navLinkRefs.current[index] = node;
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
