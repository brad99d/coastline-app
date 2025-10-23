// components/Chart.tsx

"use client";
import { useTimeRange } from "@/context/TimeRangeContext";
import { Stat } from "@/types/stat";

export default function Chart({ data }: { data: Stat[]}) {
    const { range } = useTimeRange();
    const allYears = Array.from(
        { length: range.end - range.start + 1 },
        (_, i) => range.start + i
    );

    return (
        <div>
            {allYears.map((year) => {
                const record = data.find((d) => d.year === year);
                return (
                    <div key={year}>
                        {year}: {record ? record.temperature : ""}
                    </div>
                )
            })}
        </div>
    );
}