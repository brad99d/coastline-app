// components/RangeSelector.tsx

"use client";

import { useRef } from "react";
import { useTimeRange } from "@/context/TimeRangeContext";

interface RangeSelectorProps {
    minYear?: number;
    maxYear?: number;
}

export default function RangeSelector({
    minYear = 1980,
    maxYear = 2030,
}: RangeSelectorProps) {
    const { range, setRange } = useTimeRange();
    const trackRef = useRef<HTMLDivElement>(null);
    const totalYears = maxYear - minYear;

    const handleChange = (key: "start" | "end", val: number) => {
        let newStart = range.start;
        let newEnd = range.end;
        if (key === "start") newStart = Math.min(val, range.end);
        else newEnd = Math.max(val, range.start);
        setRange({ start: newStart, end: newEnd });
    };

    const positionPercent = (year: number) => ((year - minYear) / totalYears) * 100;

    return (
        <div className="max-w-full bg-white rounded-lg m-4 px-6">
            <div className="w-full select-none">
                {/* Track */}
                <div ref={trackRef} className="relative h-6 mt-6 mb-2">
                    <div className="absolute top-1/2 h-1 w-full bg-gray-300 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 h-1 bg-blue-500 rounded-full transform -translate-y-1/2"
                         style={{
                             left: `${positionPercent(range.start)}%`,
                             width: `${positionPercent(range.end) - positionPercent(range.start)}%`,
                         }}
                    ></div>
                    {(["start", "end"] as const).map((key) => (
                        <input
                            key={key}
                            type="range"
                            min={minYear}
                            max={maxYear}
                            step={1}
                            value={range[key]}
                            onChange={(e) => handleChange(key, Number(e.target.value))}
                            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto"
                        />
                    ))}
                </div>

                {/* Notches */}
                <div className="relative flex justify-between text-xs text-gray-600">
                    {Array.from({ length: totalYears + 1 }, (_, i) => {
                        const year = minYear + i;
                        const isMajor = year % 10 === 0;
                        return (
                            <div key={year} className="relative flex flex-col items-center h-8">
                                <div className={`w-0.5 ${isMajor ? "h-2 bg-gray-400" : "h-5 bg-gray-200"}`}></div>
                                {isMajor && <div className="absolute top-3 text-[12px]">{year}</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}