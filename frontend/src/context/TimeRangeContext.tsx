// context/TimeRangeContext.tsx

"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { YearRange } from "../types/stat";

interface TimeRangeContextType {
    range: YearRange;
    setRange: (r: YearRange) => void;
    currentFrame: number;
    setCurrentFrame: (frame: number) => void;
    playing: boolean;
    setPlaying: (value: boolean) => void;
}

const TimeRangeContext = createContext<TimeRangeContextType | undefined>(undefined);

export function TimeRangeProvider({ children }: { children: ReactNode }) {
    const [range, setRange] = useState<YearRange>({ start: 2024, end: 2024 });
    const [currentFrame, setCurrentFrame] = useState<number>(range.start);
    const [playing, setPlaying] = useState(false);
    return (
        <TimeRangeContext.Provider value={{ range, setRange, currentFrame, setCurrentFrame, playing, setPlaying }}>
            {children}
        </TimeRangeContext.Provider>
    );
}

export function useTimeRange(): TimeRangeContextType {
    const ctx = useContext(TimeRangeContext);
    if (!ctx) throw new Error("useTimeRange must be used within TimeRangeProvider");
    return ctx;
}