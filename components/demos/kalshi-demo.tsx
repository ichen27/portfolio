"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, BarChart3 } from "lucide-react";

const strategies = {
  volatility: {
    name: "Vol Arbitrage",
    icon: Activity,
    description: "Exploits volatility mispricings across correlated markets",
    winRate: "67%",
    avgReturn: "+2.4%",
    trades: [
      { time: "14:32", market: "Fed Rate >5.25%", side: "BUY", price: "$0.34", qty: 50, pnl: "+$8.50" },
      { time: "14:28", market: "CPI >3.2%", side: "SELL", price: "$0.61", qty: 30, pnl: "+$4.20" },
      { time: "14:15", market: "GDP >2.5%", side: "BUY", price: "$0.45", qty: 40, pnl: "-$2.80" },
      { time: "14:02", market: "Unemployment <4%", side: "SELL", price: "$0.72", qty: 25, pnl: "+$6.25" },
    ],
    pnlData: [
      { t: "9:30", pnl: 0 }, { t: "10:00", pnl: 12 }, { t: "10:30", pnl: 8 },
      { t: "11:00", pnl: 24 }, { t: "11:30", pnl: 31 }, { t: "12:00", pnl: 28 },
      { t: "12:30", pnl: 45 }, { t: "13:00", pnl: 52 }, { t: "13:30", pnl: 48 },
      { t: "14:00", pnl: 61 }, { t: "14:30", pnl: 58 },
    ],
  },
  marketMaking: {
    name: "Market Making",
    icon: BarChart3,
    description: "Provides liquidity by quoting both sides of prediction markets",
    winRate: "73%",
    avgReturn: "+1.8%",
    trades: [
      { time: "14:31", market: "S&P500 >4500", side: "BUY", price: "$0.55", qty: 60, pnl: "+$3.60" },
      { time: "14:25", market: "S&P500 >4500", side: "SELL", price: "$0.58", qty: 60, pnl: "+$1.80" },
      { time: "14:18", market: "BTC >45k", side: "BUY", price: "$0.41", qty: 35, pnl: "+$5.25" },
      { time: "14:10", market: "BTC >45k", side: "SELL", price: "$0.44", qty: 35, pnl: "+$1.05" },
    ],
    pnlData: [
      { t: "9:30", pnl: 0 }, { t: "10:00", pnl: 5 }, { t: "10:30", pnl: 11 },
      { t: "11:00", pnl: 15 }, { t: "11:30", pnl: 22 }, { t: "12:00", pnl: 19 },
      { t: "12:30", pnl: 27 }, { t: "13:00", pnl: 33 }, { t: "13:30", pnl: 38 },
      { t: "14:00", pnl: 42 }, { t: "14:30", pnl: 45 },
    ],
  },
  momentum: {
    name: "Momentum",
    icon: TrendingUp,
    description: "Follows price trends in prediction markets using signal detection",
    winRate: "58%",
    avgReturn: "+3.1%",
    trades: [
      { time: "14:30", market: "Election Winner", side: "BUY", price: "$0.62", qty: 100, pnl: "+$14.00" },
      { time: "14:12", market: "Rate Cut Dec", side: "BUY", price: "$0.38", qty: 75, pnl: "+$9.75" },
      { time: "13:45", market: "Recession 2024", side: "SELL", price: "$0.25", qty: 50, pnl: "-$3.50" },
      { time: "13:20", market: "CPI <3%", side: "BUY", price: "$0.51", qty: 45, pnl: "+$7.65" },
    ],
    pnlData: [
      { t: "9:30", pnl: 0 }, { t: "10:00", pnl: -5 }, { t: "10:30", pnl: 8 },
      { t: "11:00", pnl: 18 }, { t: "11:30", pnl: 15 }, { t: "12:00", pnl: 32 },
      { t: "12:30", pnl: 28 }, { t: "13:00", pnl: 45 }, { t: "13:30", pnl: 41 },
      { t: "14:00", pnl: 62 }, { t: "14:30", pnl: 72 },
    ],
  },
};

type StrategyKey = keyof typeof strategies;

export function KalshiDemo() {
  const [activeStrategy, setActiveStrategy] = useState<StrategyKey>("volatility");
  const strat = strategies[activeStrategy];
  const Icon = strat.icon;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
            <Icon className="size-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{strat.name}</h3>
            <p className="text-xs text-zinc-500">{strat.description}</p>
          </div>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          Active Strategies: 3
        </Badge>
      </div>

      {/* Strategy tabs */}
      <Tabs
        value={activeStrategy}
        onValueChange={(v) => setActiveStrategy(v as StrategyKey)}
      >
        <TabsList className="w-full bg-white/[0.03] border border-white/5">
          <TabsTrigger value="volatility" className="flex-1 text-xs">
            Vol Arbitrage
          </TabsTrigger>
          <TabsTrigger value="marketMaking" className="flex-1 text-xs">
            Market Making
          </TabsTrigger>
          <TabsTrigger value="momentum" className="flex-1 text-xs">
            Momentum
          </TabsTrigger>
        </TabsList>

        {(Object.keys(strategies) as StrategyKey[]).map((key) => (
          <TabsContent key={key} value={key} className="mt-4 space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <p className="text-xs text-zinc-500">Win Rate</p>
                <p className="text-lg font-bold text-white">{strategies[key].winRate}</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <p className="text-xs text-zinc-500">Avg Return</p>
                <p className="text-lg font-bold text-emerald-400">{strategies[key].avgReturn}</p>
              </div>
            </div>

            {/* P&L Chart */}
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <p className="mb-2 text-xs font-medium text-zinc-400">
                Cumulative P&L ($)
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={strategies[key].pnlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="t" stroke="#444" fontSize={10} tickLine={false} />
                  <YAxis stroke="#444" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#888" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pnl"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#8b5cf6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Trade table */}
            <div className="rounded-lg border border-white/5 bg-white/[0.02]">
              <div className="border-b border-white/5 px-3 py-2">
                <p className="text-xs font-medium text-zinc-400">
                  Recent Trades
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-zinc-500">
                      <th className="px-3 py-2 text-left font-medium">Time</th>
                      <th className="px-3 py-2 text-left font-medium">Market</th>
                      <th className="px-3 py-2 text-left font-medium">Side</th>
                      <th className="px-3 py-2 text-right font-medium">Price</th>
                      <th className="px-3 py-2 text-right font-medium">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategies[key].trades.map((trade, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/[0.03] last:border-0"
                      >
                        <td className="px-3 py-2 font-mono text-zinc-500">
                          {trade.time}
                        </td>
                        <td className="px-3 py-2 text-zinc-300">
                          {trade.market}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                              trade.side === "BUY"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {trade.side}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-zinc-300">
                          {trade.price}
                        </td>
                        <td
                          className={`px-3 py-2 text-right font-mono ${
                            trade.pnl.startsWith("+")
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {trade.pnl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
