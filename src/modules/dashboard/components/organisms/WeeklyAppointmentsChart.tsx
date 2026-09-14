"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useTranslations } from "next-intl";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { weeklyAppointments } from "../../lib/mockData";

export default function WeeklyAppointmentsChart() {
  const t = useTranslations("dashboard.home");

  const chartConfig = {
    count: {
      label: t("weeklyChart.series"),
      color: "var(--ds-button-primary)",
    },
  } satisfies ChartConfig;

  const dayLabel = (key: string) => t(`weekdays.${key}`);

  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <Title size="sm" className="p-0 font-bold">
        {t("weeklyChart.title")}
      </Title>
      <Text size="sm" className="mb-4">
        {t("weeklyChart.subtitle")}
      </Text>

      <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
        <BarChart data={weeklyAppointments} margin={{ left: -20 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="dayKey"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={dayLabel}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => dayLabel(String(label))}
              />
            }
          />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[6, 6, 6, 6]}
            barSize={18}
            background={{ fill: "var(--ds-bg-grey)", radius: 6 }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
