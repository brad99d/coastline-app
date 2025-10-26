// components/MapOverlay.tsx
"use client";

import RangeSelector from "@/components/RangeSelector";
import TimeControls from "@/components/TimeControls";
import Chart from "@/components/Chart";
import {useTimeRange} from "@/context/TimeRangeContext";
import {useEffect, useState} from "react";
import {Stat} from "@/types/stat";
import {fetchStats} from "@/lib/api/stats";

export default function MapOverlay() {
    const { range } = useTimeRange();
    const [data, setData] = useState<Stat[]>([]);

    useEffect(() => {
        fetchStats(range).then((res) => setData(res));
    }, [range]);

    return (
        <div className="map-overlay absolute top-0 bottom-0 w-full">
            <RangeSelector />
            <TimeControls />
            <Chart data={data} />
        </div>
    )
}