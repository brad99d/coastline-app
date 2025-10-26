// components/TemperatureChartCard.tsx

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

export default function SealevelChartCard({ title, unit, data }: { title: string; unit: string; data: Stat[]}) {
    const { range } = useTimeRange();

    // build dataset
    const chartData = Array.from(
        { length: range.end - range.start + 1 },
        (_, i) => {
            const year = range.start + i;
            const record = data.find((d) => d.year === year);
            return {
                year,
                level: record ? record.level : null,
            };
        }
    );

    return (
        <DataCard title={title} unit={unit}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="1 0" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 10]} tickCount={13} hide />
                    <Bar
                        type="monotone"
                        dataKey="level"
                        strokeWidth={2}
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </DataCard>
    );
}