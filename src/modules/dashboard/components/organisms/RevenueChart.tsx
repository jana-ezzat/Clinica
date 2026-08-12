"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { monthlyRevenue } from "../../lib/mockData";

const chartConfig = {
  revenue: {
    label: "الإيرادات",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export default function RevenueChart() {
  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <h3 className="text-lg font-bold ds-text">الإيرادات الشهرية</h3>
      <p className="mb-4 text-sm ds-text-secondary">
        تطور الإيرادات خلال الأشهر الماضية
      </p>

      <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
        <AreaChart data={monthlyRevenue} margin={{ left: -20 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.35}
              />
              <stop
                offset="95%"
                stopColor="var(--color-revenue)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              value === 0 ? "0" : `${value / 1000}k`
            }
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
