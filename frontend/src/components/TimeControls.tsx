// components/TimeControls.tsx
"use client";
import { useTimeRange } from "@/context/TimeRangeContext";
// import { addYears, parseISO, formatISO } from "date-fns";

export default function TimeControls() {
    const { range, setRange } = useTimeRange();

    const moveRange = (years: number) => {
        setRange({
            start: range.start + years,
            end: range.end + years,
        });
    };
    return (
        <div className="flex gap-2 items-center">
            <button type="button" onClick={() => moveRange(-1)}>
                Previous
            </button>
            <span>
                {range.start} to {range.end}
            </span>
            <button type="button" onClick={() => moveRange(1)}>
                Next
            </button>
        </div>
    );
}