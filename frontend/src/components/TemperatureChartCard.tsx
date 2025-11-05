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
    Cell,
} from "recharts";
import { DataCard } from "@/components/DataCard";
import { useTimeRange } from "@/context/TimeRangeContext";
import { Stat } from "@/types/stat";

export default function TemperatureChartCard({ title, unit, data }: { title: string; unit: string; data: Stat[]}) {
    const { range, playing, currentFrame } = useTimeRange();
    const singleYear = range.start === range.end;

    const minYear = 1980;
    const maxYear = 2030;

    const filledData = Array.from({ length: maxYear - minYear + 1}, (_, i) => {
        const year = minYear + i;
        const record = data.find((d) => d.year === year);
        return {
            year,
            temperature: record ? record.temperature : null,
        };
    });

    const chartData = singleYear
        ? filledData
        : filledData.filter((d) => d.year >= range.start && d.year <= range.end);

    return (
        <DataCard title={title} unit={unit}>
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
                    >
                        {chartData.map((entry) => {
                            let fill = "hsl(0, 0%, 0%)";

                            // single year
                            if (singleYear && entry.year !== range.start) fill = "hsl(0, 0%, 70%)";

                            // animation
                            if (playing && entry.year !== currentFrame) fill = "hsl(0, 0%, 70%)";

                            return <Cell
                                key={entry.year}
                                fill={fill}
                            />
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </DataCard>
    );
}