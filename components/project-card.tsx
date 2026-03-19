"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoShell } from "@/components/demos/demo-shell";
import type { DemoMode } from "@/components/demos/types";
import {
  Github,
  X,
  Play,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  stats?: { label: string; value: string }[];
  github?: string;
  featured?: boolean;
  demo?: React.ReactNode;
  demoMode?: DemoMode;
  demoLastValidatedAt?: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  stats,
  github,
  featured,
  demo,
  demoMode,
  demoLastValidatedAt,
}: ProjectCardProps) {
  const [showDemo, setShowDemo] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const headingId = useId();
  const descriptionId = useId();
  const keyboardHintId = useId();
  const getDialogFocusableElements = () => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return [] as HTMLElement[];
    }

    return Array.from(
      dialogElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => {
      if (element.hasAttribute("disabled")) {
        return false;
      }
      if (element.getAttribute("aria-disabled") === "true") {
        return false;
      }
      if (element.getAttribute("aria-hidden") === "true") {
        return false;
      }
      if (element.closest("[inert]")) {
        return false;
      }
      if (element instanceof HTMLInputElement && element.type === "hidden") {
        return false;
      }
      return element.getClientRects().length > 0;
    });
  };
  const focusFirstDialogElement = () => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }
    const [firstElement] = getDialogFocusableElements();
    (firstElement ?? closeRef.current ?? dialogElement).focus();
  };
  const focusLastDialogElement = () => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }
    const focusableElements = getDialogFocusableElements();
    const lastElement = focusableElements[focusableElements.length - 1];
    (lastElement ?? closeRef.current ?? dialogElement).focus();
  };

  useEffect(() => {
    if (!showDemo) {
      return;
    }

    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousBodyOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const overlayElement = overlayRef.current;
    const bodyChildrenToMask = Array.from(document.body.children).filter((child) => child !== overlayElement);
    const previousBodyChildrenState = bodyChildrenToMask.map((child) => ({
      child,
      inert: child.getAttribute("inert"),
      ariaHidden: child.getAttribute("aria-hidden"),
    }));
    const bodyScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const triggerElement = triggerRef.current;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialogElement = dialogRef.current;

    previousBodyChildrenState.forEach(({ child }) => {
      child.setAttribute("inert", "");
      child.setAttribute("aria-hidden", "true");
    });

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "contain";
    document.documentElement.style.overflow = "hidden";
    if (bodyScrollbarWidth > 0) {
      document.body.style.paddingRight = `${bodyScrollbarWidth}px`;
    }

    const focusableElements = getDialogFocusableElements();
    const initialFocusTarget = closeRef.current ?? focusableElements[0] ?? dialogElement;
    initialFocusTarget?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setShowDemo(false);
        return;
      }

      if (event.key !== "Tab" || !dialogElement) {
        return;
      }

      const focusableElements = getDialogFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        closeRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!dialogElement.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      }
    };
    const handleFocusIn = (event: FocusEvent) => {
      if (!dialogElement) {
        return;
      }
      const target = event.target as Node | null;
      if (target && dialogElement.contains(target)) {
        return;
      }

      const firstFocusable = getDialogFocusableElements()[0] ?? closeRef.current ?? dialogElement;
      firstFocusable?.focus();
    };
    const preventOutsideScroll = (event: WheelEvent | TouchEvent) => {
      if (!dialogElement) {
        return;
      }
      const target = event.target as Node | null;
      if (!target || dialogElement.contains(target)) {
        return;
      }
      event.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("wheel", preventOutsideScroll, { passive: false });
    document.addEventListener("touchmove", preventOutsideScroll, { passive: false });
    return () => {
      previousBodyChildrenState.forEach(({ child, inert, ariaHidden }) => {
        if (inert === null) {
          child.removeAttribute("inert");
        } else {
          child.setAttribute("inert", inert);
        }
        if (ariaHidden === null) {
          child.removeAttribute("aria-hidden");
        } else {
          child.setAttribute("aria-hidden", ariaHidden);
        }
      });
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.touchAction = previousBodyTouchAction;
      document.body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("wheel", preventOutsideScroll);
      document.removeEventListener("touchmove", preventOutsideScroll);
      window.scrollTo({ top: scrollY });
      if (triggerElement?.isConnected) {
        triggerElement.focus();
      } else if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus();
      }
    };
  }, [showDemo]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={`glass-card group relative overflow-hidden rounded-xl p-6 transition-all ${
          featured ? "glow-purple" : ""
        }`}
      >
        {/* Featured indicator */}
        {featured && (
          <div className="absolute right-4 top-4">
            <Sparkles className="size-4 text-violet-400" />
          </div>
        )}

        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-500">
          {description}
        </p>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-sm font-bold text-white">{stat.value}</p>
                <p className="text-xs text-zinc-600">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech badges */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-md border border-white/5 bg-white/5 text-xs text-zinc-400"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {demo && (
            <Button
              ref={triggerRef}
              onClick={() => setShowDemo(true)}
              size="sm"
              className="rounded-lg bg-violet-600 text-xs text-white hover:bg-violet-700"
              aria-haspopup="dialog"
              aria-controls={dialogId}
              aria-expanded={showDemo}
            >
              <Play className="size-3" />
              Try Demo
            </Button>
          )}
          {github && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-lg text-xs text-zinc-400 hover:text-white"
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="size-3.5" />
                Code
                <ExternalLink className="size-3" />
              </a>
            </Button>
          )}
          {demoMode && (
            <span className="text-xs text-zinc-500">
              Demo: {demoMode}
            </span>
          )}
        </div>
      </motion.div>

      {/* Demo modal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showDemo && (
              <motion.div
                ref={overlayRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setShowDemo(false);
                }}
              >
                <motion.div
                  id={dialogId}
                  ref={dialogRef}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={headingId}
                  aria-describedby={`${descriptionId} ${keyboardHintId}`}
                  tabIndex={-1}
                  className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f0f] p-6"
                >
                  <span
                    tabIndex={0}
                    aria-hidden="true"
                    className="sr-only"
                    onFocus={focusLastDialogElement}
                  />
                  {/* Modal header */}
                  <div className="mb-5 flex items-center justify-between">
                    <h3
                      id={headingId}
                      className="text-lg font-semibold text-white"
                    >
                      {title}
                    </h3>
                    <button
                      type="button"
                      ref={closeRef}
                      onClick={() => setShowDemo(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                      aria-label="Close demo"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <p
                    id={descriptionId}
                    className="sr-only"
                  >
                    Interactive demo content for {title}.
                  </p>
                  <p id={keyboardHintId} className="sr-only">
                    Press Escape to close this dialog. Use Tab to move through dialog controls.
                  </p>

                  {/* Demo content */}
                  {demoMode ? (
                    <DemoShell
                      title={title}
                      mode={demoMode}
                      lastValidatedAt={demoLastValidatedAt}
                    >
                      {demo}
                    </DemoShell>
                  ) : (
                    demo
                  )}
                  <span
                    tabIndex={0}
                    aria-hidden="true"
                    className="sr-only"
                    onFocus={focusFirstDialogElement}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
