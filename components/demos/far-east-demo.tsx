"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "ai" | "caller";
  text: string;
}

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

const conversationScript: Message[] = [
  { role: "ai", text: "Thank you for calling Far East Restaurant! How can I help you today?" },
  { role: "caller", text: "Hi, I'd like to place an order for pickup." },
  { role: "ai", text: "Of course! What would you like to order?" },
  { role: "caller", text: "Can I get two orders of General Tso's Chicken?" },
  { role: "ai", text: "Two General Tso's Chicken, got it! Anything else?" },
  { role: "caller", text: "Yes, one Vegetable Lo Mein and three Spring Rolls please." },
  { role: "ai", text: "One Vegetable Lo Mein and three Spring Rolls. Would you like anything to drink?" },
  { role: "caller", text: "No, that's everything." },
  { role: "ai", text: "Let me confirm your order: 2x General Tso's Chicken, 1x Vegetable Lo Mein, and 3x Spring Rolls. Your total is $42.85. It'll be ready in about 20 minutes!" },
  { role: "caller", text: "Perfect, thank you!" },
  { role: "ai", text: "Thank you for your order! See you soon." },
];

const orderItems: OrderItem[] = [
  { name: "General Tso's Chicken", qty: 2, price: 14.95 },
  { name: "Vegetable Lo Mein", qty: 1, price: 11.95 },
  { name: "Spring Rolls", qty: 3, price: 3.0 },
];

const orderRevealIndex = [3, 5, 5]; // message index when each item appears

export function FarEastDemo() {
  const [callState, setCallState] = useState<"idle" | "ringing" | "active" | "ended">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleOrders, setVisibleOrders] = useState<OrderItem[]>([]);

  const advanceConversation = useCallback(() => {
    if (currentIndex >= conversationScript.length) {
      setCallState("ended");
      return;
    }
    setMessages((prev) => [...prev, conversationScript[currentIndex]]);
    // Check if we should reveal order items
    orderRevealIndex.forEach((revealAt, idx) => {
      if (currentIndex === revealAt) {
        setVisibleOrders((prev) => {
          if (prev.find((o) => o.name === orderItems[idx].name)) return prev;
          return [...prev, orderItems[idx]];
        });
      }
    });
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex]);

  useEffect(() => {
    if (callState !== "active") return;
    if (currentIndex >= conversationScript.length) {
      const timer = setTimeout(() => setCallState("ended"), 2000);
      return () => clearTimeout(timer);
    }
    const delay = currentIndex === 0 ? 1000 : 1500 + Math.random() * 1000;
    const timer = setTimeout(advanceConversation, delay);
    return () => clearTimeout(timer);
  }, [callState, currentIndex, advanceConversation]);

  const startCall = () => {
    setCallState("ringing");
    setTimeout(() => setCallState("active"), 2000);
  };

  const total = visibleOrders.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Phone interface */}
      <div className="flex-1">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
          {/* Phone header */}
          <div className="border-b border-white/5 bg-white/[0.02] px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
                  <Bot className="size-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Far East AI</p>
                  <p className="text-xs text-zinc-500">
                    {callState === "idle" && "Tap to call"}
                    {callState === "ringing" && "Ringing..."}
                    {callState === "active" && "Connected"}
                    {callState === "ended" && "Call ended"}
                  </p>
                </div>
              </div>
              {callState === "active" && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              )}
            </div>
          </div>

          {/* Messages area */}
          <div className="h-72 space-y-3 overflow-y-auto p-4">
            {callState === "idle" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-zinc-600">
                  Start the demo to see the AI in action
                </p>
              </div>
            )}
            {callState === "ringing" && (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/20"
                >
                  <Phone className="size-6 text-violet-400" />
                </motion.div>
                <p className="text-sm text-zinc-400">Connecting...</p>
              </div>
            )}
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "caller" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                      msg.role === "caller"
                        ? "rounded-br-md bg-violet-600 text-white"
                        : "rounded-bl-md bg-white/[0.06] text-zinc-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Phone actions */}
          <div className="border-t border-white/5 p-4">
            {callState === "idle" && (
              <Button
                onClick={startCall}
                className="w-full rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Phone className="size-4" />
                Start Demo Call
              </Button>
            )}
            {(callState === "ringing" || callState === "active") && (
              <Button
                onClick={() => setCallState("ended")}
                className="w-full rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                <PhoneOff className="size-4" />
                End Call
              </Button>
            )}
            {callState === "ended" && (
              <Button
                onClick={() => {
                  setCallState("idle");
                  setMessages([]);
                  setCurrentIndex(0);
                  setVisibleOrders([]);
                }}
                variant="outline"
                className="w-full rounded-xl border-white/10 text-zinc-300"
              >
                Restart Demo
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Order summary panel */}
      <div className="w-full lg:w-64">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <h4 className="mb-3 text-sm font-semibold text-white">
            Live Order Summary
          </h4>
          {visibleOrders.length === 0 ? (
            <p className="text-xs text-zinc-600">
              Order items will appear as they&apos;re mentioned...
            </p>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {visibleOrders.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-zinc-400">
                      {item.qty}x {item.name}
                    </span>
                    <span className="font-mono text-zinc-300">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {visibleOrders.length > 0 && (
                <div className="mt-3 border-t border-white/10 pt-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-white">Total</span>
                    <span className="font-mono text-violet-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
