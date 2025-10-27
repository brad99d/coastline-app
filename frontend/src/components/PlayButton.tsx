"use client";
import { useEffect, useRef } from "react";
import { useTimeRange } from "@/context/TimeRangeContext";
import { Play, Square } from "lucide-react";

export function PlayButton() {
    const { range, currentFrame, setCurrentFrame, playing, setPlaying } = useTimeRange();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startLoop = () => {
        setCurrentFrame(range.start);

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setCurrentFrame(prev => {
                const next = prev + 1;
                return next > range.end ? range.start : next;
            });
        }, 200)
    }

    const handleToggle = () => {
        if (playing) {
            setPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            setCurrentFrame(range.start);
        } else {
            setPlaying(true);
            startLoop();
        }
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <button
            onClick={handleToggle}
            className={`
            absolute bottom-30 right-4 z-10 glass text-black rounded-full p-3 transition
            ${range.start === range.end ? "hidden" : ""}
            `}
        >
            {playing ? <Square /> : <Play />}
        </button>
    )
}