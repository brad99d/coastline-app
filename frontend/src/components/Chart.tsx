// components/Chart.tsx

"use client";
import { useTimeRange } from "@/context/TimeRangeContext";
import { Stat } from "@/types/stat";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Chart({ data }: { data: Stat[]}) {
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
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="1 0" vertical={false} />
                    <XAxis dataKey="year" />
                    <YAxis dataKey="temperature" />
                    <Tooltip />
                    <Bar
                        type="monotone"
                        dataKey="temperature"
                        strokeWidth={2}
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}