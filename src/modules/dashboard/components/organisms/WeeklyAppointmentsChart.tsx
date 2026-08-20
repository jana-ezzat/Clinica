"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import { weeklyAppointments } from "../../lib/mockData";

const chartConfig = {
  count: {
    label: "المواعيد",
    color: "var(--ds-button-primary)",
  },
} satisfies ChartConfig;

export default function WeeklyAppointmentsChart() {
  return (
    <div className="rounded-xl border ds-border-gray ds-bg-card p-5 ds-shadow-sm">
      <Title size="sm" className="p-0 font-bold">
        المواعيد الأسبوعية
      </Title>
      <Text size="sm" className="mb-4">
        عدد المواعيد لكل يوم
      </Text>

      <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
        <BarChart data={weeklyAppointments} margin={{ left: -20 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
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
