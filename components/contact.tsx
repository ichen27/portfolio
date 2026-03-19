"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Mail, Phone, Send, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Contact
          </span>
        </motion.div>

        <motion.h2
          className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let&apos;s{" "}
          <span className="gradient-text">connect</span>
        </motion.h2>

        <motion.p
          className="mb-10 text-zinc-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Interested in working together or just want to say hello? Reach out
          through any of the channels below.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="glass-card flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Mail className="size-5 text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <p className="text-sm font-medium text-white">
                  {siteConfig.email}
                </p>
              </div>
              <ArrowUpRight className="ml-auto size-4 text-zinc-600" />
            </a>

            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="glass-card flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Phone className="size-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Phone</p>
                <p className="text-sm font-medium text-white">
                  {siteConfig.phoneDisplay}
                </p>
              </div>
              <ArrowUpRight className="ml-auto size-4 text-zinc-600" />
            </a>

            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                <Github className="size-5 text-zinc-300" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">GitHub</p>
                <p className="text-sm font-medium text-white">
                  {siteConfig.githubUrl.replace(/^https?:\/\//, "")}
                </p>
              </div>
              <ArrowUpRight className="ml-auto size-4 text-zinc-600" />
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <div className="glass-card flex h-full flex-col items-center justify-center rounded-xl p-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                  <Send className="size-5 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Message sent!
                </h3>
                <p className="text-sm text-zinc-500">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                className="glass-card space-y-4 rounded-xl p-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm text-zinc-400"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm text-zinc-400"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm text-zinc-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                    placeholder="Your message..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                >
                  <Send className="size-4" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto mt-24 max-w-3xl border-t border-white/5 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Ivan Chen. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Built with Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
