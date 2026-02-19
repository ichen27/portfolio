"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const portfolioData = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 10420 },
  { date: "Mar", value: 10180 },
  { date: "Apr", value: 10850 },
  { date: "May", value: 11200 },
  { date: "Jun", value: 10950 },
  { date: "Jul", value: 11680 },
  { date: "Aug", value: 12100 },
  { date: "Sep", value: 11890 },
  { date: "Oct", value: 12450 },
  { date: "Nov", value: 13020 },
  { date: "Dec", value: 13480 },
];

const recentTrades = [
  { symbol: "AAPL", side: "BUY", qty: 15, price: "$178.32", time: "2h ago", return: "+2.1%" },
  { symbol: "NVDA", side: "SELL", qty: 8, price: "$492.15", time: "4h ago", return: "+5.8%" },
  { symbol: "MSFT", side: "BUY", qty: 10, price: "$371.44", time: "6h ago", return: "+1.3%" },
  { symbol: "AMZN", side: "BUY", qty: 12, price: "$151.28", time: "8h ago", return: "-0.4%" },
  { symbol: "META", side: "SELL", qty: 6, price: "$355.90", time: "1d ago", return: "+3.7%" },
];

const metrics = [
  { label: "Win Rate", value: "64%", trend: "up" },
  { label: "Avg Return", value: "+2.8%", trend: "up" },
  { label: "Sharpe Ratio", value: "1.42", trend: "up" },
  { label: "Max Drawdown", value: "-4.2%", trend: "down" },
];

export function AlpacaDemo({ onClose }: { onClose: () => void }) {
  const portfolioReturn = (
    ((portfolioData[portfolioData.length - 1].value - portfolioData[0].value) /
      portfolioData[0].value) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
            <TrendingUp className="size-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Alpaca Portfolio Dashboard
            </h3>
            <p className="text-xs text-zinc-500">
              Swing trading strategy performance
            </p>
          </div>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          Strategy Active
        </Badge>
      </div>

      {/* Portfolio value chart */}
      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-zinc-500">Portfolio Value</p>
            <p className="text-2xl font-bold text-white">
              ${portfolioData[portfolioData.length - 1].value.toLocaleString()}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-emerald-400">
            <ArrowUpRight className="size-4" />+{portfolioReturn}% YTD
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={portfolioData}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" stroke="#444" fontSize={10} tickLine={false} />
            <YAxis stroke="#444" fontSize={10} tickLine={false} domain={["dataMin - 500", "dataMax + 500"]} />
            <Tooltip
              contentStyle={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
              labelStyle={{ color: "#888" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#portfolioGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
          >
            <p className="text-xs text-zinc-500">{m.label}</p>
            <div className="flex items-center gap-1">
              <p className="text-lg font-bold text-white">{m.value}</p>
              {m.trend === "up" ? (
                <ArrowUpRight className="size-3 text-emerald-400" />
              ) : (
                <ArrowDownRight className="size-3 text-red-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent trades */}
      <div className="rounded-lg border border-white/5 bg-white/[0.02]">
        <div className="border-b border-white/5 px-3 py-2">
          <p className="text-xs font-medium text-zinc-400">Recent Trades</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500">
                <th className="px-3 py-2 text-left font-medium">Symbol</th>
                <th className="px-3 py-2 text-left font-medium">Side</th>
                <th className="px-3 py-2 text-right font-medium">Qty</th>
                <th className="px-3 py-2 text-right font-medium">Price</th>
                <th className="px-3 py-2 text-right font-medium">Return</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade) => (
                <tr
                  key={trade.symbol + trade.time}
                  className="border-b border-white/[0.03] last:border-0"
                >
                  <td className="px-3 py-2 font-mono font-medium text-white">
                    {trade.symbol}
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
                  <td className="px-3 py-2 text-right font-mono text-zinc-400">
                    {trade.qty}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-zinc-300">
                    {trade.price}
                  </td>
                  <td
                    className={`px-3 py-2 text-right font-mono ${
                      trade.return.startsWith("+")
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {trade.return}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
