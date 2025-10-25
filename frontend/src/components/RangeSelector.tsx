// components/RangeSelector.tsx

"use client";

import { useState, useRef, useEffect } from "react";
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
    const [dragging, setDragging] = useState<"none" | "start" | "end" | "range" | "single" | "create">("none");
    const trackRef = useRef<HTMLDivElement>(null);
    const [anchorYear, setAnchorYear] = useState<number | null>(null);
    const totalYears = maxYear - minYear;
    const singleThreshold = 1;

    const yearToPercent = (y: number) => ((y - minYear) / totalYears) * 100;

    const posToYear = (x: number) => {
        if (!trackRef.current) return minYear;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.min(Math.max((x - rect.left) / rect.width, 0), 1);
        return Math.round(minYear + ratio * totalYears);
    };

    const isSingle = range.start === range.end;

    const onMouseDown = (
        e: React.MouseEvent,
        type: "start" | "end" | "range" | "track"
    ) => {
        e.preventDefault();
        const year = posToYear(e.clientX);
        setAnchorYear(year);
        if (type === "track") {
            // create a range
            setRange({ start: year, end: year });
            setDragging("create");
        } else if (isSingle) {
            setDragging("single");
        } else {
            setDragging(type);
        }
    };

    const onMouseMove = (e: MouseEvent) => {
        if (dragging === "none" || !trackRef.current || anchorYear == null) return;
        const year = posToYear(e.clientX);

        if (dragging === "single") {
            const clamped = Math.min(Math.max(year, minYear), maxYear);
            setRange({ start: clamped, end: clamped });
        } else if (dragging === "create") {
            setRange({
                start: Math.min(anchorYear, year),
                end: Math.max(anchorYear, year),
            });
        } else if (dragging === "start") {
            setRange({
                start: Math.min(year, range.end),
                end: range.end,
            });
        } else if (dragging === "end") {
            setRange({
                start: range.start,
                end: Math.max(year, range.start),
            });
        } else if (dragging === "range") {
            const width = range.end - range.start;
            let start = year - width / 2;
            let end = year + width / 2;
            if (start < minYear) {
                start = minYear;
                end = start + width;
            } else if (end > maxYear) {
                end = maxYear;
                start = end - width;
            }
            setRange({
                start: Math.round(start),
                end: Math.round(end),
            });
        }
    };

    const onMouseUp = () => {
        setDragging("none");
        setAnchorYear(null);
    };

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    });

    return (
        <div className="glass fixed bottom-0 left-0 right-0 max-w-full bg-white rounded-[22px] m-4">
            <div className="max-w-full mx-[22px] select-none">
                <div
                    className="absolute left-0 right-0 h-full w-full z-2"
                    onMouseDown={(e) => onMouseDown(e, "track")}
                ></div>
                <div ref={trackRef} className="relative h-17 mt-0">
                    {/* Track */}
                    <div className="relative z-10 drop-shadow-xl">
                        {/* Active range */}
                        <div className="absolute mt-2 top-1/2 h-7 bg-black transform cursor-grab"
                             style={{
                                 left: `${yearToPercent(range.start)}%`,
                                 width: `${yearToPercent(range.end) - yearToPercent(range.start)}%`,
                             }}
                             onMouseDown={(e) =>
                                 isSingle ? onMouseDown(e, "start") : onMouseDown(e, "range")
                             }
                        ></div>

                        {/* Start handle */}
                        <div
                            className="absolute mt-2 top-1/2 w-7 h-7 bg-white rounded-full border-4 border-black transform -translate-x-1/2 cursor-pointer"
                            style={{ left: `${yearToPercent(range.start)}%` }}
                            onMouseDown={(e) => onMouseDown(e, "start")}
                        ></div>

                        {/* End handle */}
                        {!isSingle && (
                            <div
                                className="absolute mt-2 top-1/2 w-7 h-7 bg-white rounded-full border-4 border-black transform -translate-x-1/2 cursor-pointer"
                                style={{ left: `${yearToPercent(range.end)}%` }}
                                onMouseDown={(e) => onMouseDown(e, "end")}
                            ></div>
                        )}
                    </div>

                    {/* Notches */}
                    <div className="relative flex justify-between text-xs text-gray-600">
                        {Array.from({ length: totalYears + 1 }, (_, i) => {
                            const year = minYear + i;
                            const isMajor = year % 10 === 0;
                            return (
                                <div key={year} className="relative flex flex-col items-center h-17">
                                    <div className={`w-0.25 ${isMajor ? "h-11 bg-glass-indent-lg" : "h-14 bg-glass-indent"}`}></div>
                                    {isMajor && <div className="glass-indent absolute top-11 text-[14px] select-none">{year}</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </div>
    );
}