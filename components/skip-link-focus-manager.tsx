"use client";

import { useEffect } from "react";

const MAIN_CONTENT_HASH = "#main-content";

export function SkipLinkFocusManager() {
  useEffect(() => {
    const getMainContent = () => document.getElementById("main-content");
    let retryCount = 0;
    let mutationObserver: MutationObserver | null = null;

    const isMainContentHash = () => {
      const hash = window.location.hash;
      if (!hash) {
        return false;
      }
      try {
        return decodeURIComponent(hash) === MAIN_CONTENT_HASH;
      } catch {
        return hash === MAIN_CONTENT_HASH;
      }
    };

    const clearSkipTargetState = () => {
      getMainContent()?.removeAttribute("data-skip-target-active");
    };

    const focusMainContent = () => {
      if (!isMainContentHash()) {
        clearSkipTargetState();
        mutationObserver?.disconnect();
        mutationObserver = null;
        return;
      }

      const mainContent = getMainContent();
      if (!mainContent) {
        if (!mutationObserver) {
          mutationObserver = new MutationObserver(() => {
            if (!isMainContentHash()) {
              mutationObserver?.disconnect();
              mutationObserver = null;
              return;
            }
            if (getMainContent()) {
              mutationObserver?.disconnect();
              mutationObserver = null;
              focusMainContent();
            }
          });
          mutationObserver.observe(document.body, { childList: true, subtree: true });
        }
        if (retryCount < 8) {
          retryCount += 1;
          window.requestAnimationFrame(focusMainContent);
        }
        return;
      }
      retryCount = 0;
      mutationObserver?.disconnect();
      mutationObserver = null;

      try {
        mainContent.focus({ preventScroll: true });
      } catch {
        mainContent.focus();
      }
      if (document.activeElement === mainContent) {
        mainContent.setAttribute("data-skip-target-active", "true");
      }
    };

    const syncFromHistoryNavigation = () => {
      focusMainContent();
    };

    const syncSkipTargetStateFromFocus = (event: FocusEvent) => {
      const mainContent = getMainContent();
      if (!mainContent) {
        return;
      }

      const nextFocused = event.target instanceof Node ? event.target : null;
      if (nextFocused && mainContent.contains(nextFocused)) {
        mainContent.setAttribute("data-skip-target-active", "true");
      } else {
        clearSkipTargetState();
      }
    };
    const syncSkipTargetStateFromPointer = (event: PointerEvent) => {
      const mainContent = getMainContent();
      if (!mainContent) {
        return;
      }

      const target = event.target instanceof Node ? event.target : null;
      if (!target || !mainContent.contains(target)) {
        clearSkipTargetState();
      }
    };

    let rafId = 0;
    const handleSkipLinkActivation = () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        focusMainContent();
      });
    };
    const handleSkipLinkKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Spacebar" && event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      const skipLink = event.currentTarget as HTMLAnchorElement;
      skipLink.click();
    };
    const handleMainContentShortcut = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        return;
      }
      const hasAltShortcut = event.altKey && (event.key === "m" || event.key === "M");
      if (!hasAltShortcut) {
        return;
      }

      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      if (window.location.hash !== MAIN_CONTENT_HASH) {
        window.history.replaceState(window.history.state, "", MAIN_CONTENT_HASH);
      }
      focusMainContent();
    };

    const skipLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(`a[data-skip-link='main-content']`),
    );
    skipLinks.forEach((skipLink) => {
      skipLink.addEventListener("click", handleSkipLinkActivation);
      skipLink.addEventListener("keydown", handleSkipLinkKeyDown);
    });

    focusMainContent();
    window.addEventListener("hashchange", focusMainContent);
    window.addEventListener("popstate", syncFromHistoryNavigation);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        focusMainContent();
      } else {
        clearSkipTargetState();
      }
    };

    window.addEventListener("pageshow", focusMainContent);
    window.addEventListener("pagehide", clearSkipTargetState);
    window.addEventListener("beforeunload", clearSkipTargetState);
    window.addEventListener("keydown", handleMainContentShortcut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("focusin", syncSkipTargetStateFromFocus);
    document.addEventListener("pointerdown", syncSkipTargetStateFromPointer);

    return () => {
      mutationObserver?.disconnect();
      window.removeEventListener("hashchange", focusMainContent);
      window.removeEventListener("popstate", syncFromHistoryNavigation);
      window.removeEventListener("pageshow", focusMainContent);
      window.removeEventListener("pagehide", clearSkipTargetState);
      window.removeEventListener("beforeunload", clearSkipTargetState);
      window.removeEventListener("keydown", handleMainContentShortcut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("focusin", syncSkipTargetStateFromFocus);
      document.removeEventListener("pointerdown", syncSkipTargetStateFromPointer);
      skipLinks.forEach((skipLink) => {
        skipLink.removeEventListener("click", handleSkipLinkActivation);
        skipLink.removeEventListener("keydown", handleSkipLinkKeyDown);
      });
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
