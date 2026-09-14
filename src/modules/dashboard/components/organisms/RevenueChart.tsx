"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { monthlyRevenue } from "../../lib/mockData";

export default function RevenueChart() {
  const t = useTranslations("dashboard.home");

  const chartConfig = {
    revenue: {
      label: t("revenueChart.series"),
      color: "#22c55e",
    },
  } satisfies ChartConfig;

  const monthLabel = (key: string) => t(`months.${key}`);

  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <Title size="sm" className="p-0 font-bold">
        {t("revenueChart.title")}
      </Title>
      <Text size="sm" className="mb-4">
        {t("revenueChart.subtitle")}
      </Text>

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
            dataKey="monthKey"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthLabel}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              value === 0 ? "0" : `${value / 1000}k`
            }
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => monthLabel(String(label))}
              />
            }
          />
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
