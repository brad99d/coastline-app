// components/BarChartCard.tsx

"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { DataCard } from "@/components/DataCard";
import { useTimeRange } from "@/context/TimeRangeContext";
import { Stat } from "@/types/stat";

export default function BarChartCard({ title, data }: { title: string; data: Stat[]}) {
    const { range } = useTimeRange();

    // build dataset
    const chartData = Array.from(
        { length: range.end - range.start + 1 },
        (_, i) => {
            const year = range.start + i;
            const record = data.find((d) => d.year === year);
            return {
                year,
                temperature: record ? record.temperature : null,
            };
        }
    );

    return (
        <DataCard title={title}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="1 0" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 1.5]} tickCount={4} hide />
                    <Bar
                        type="monotone"
                        dataKey="temperature"
                        strokeWidth={2}
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </DataCard>
    );
}