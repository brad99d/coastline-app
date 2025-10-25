// app/dashboard/page.tsx

"use client";
import { useEffect, useState } from "react";
import { Stat } from "@/types/stat";
import { useTimeRange } from "@/context/TimeRangeContext";
import { fetchStats } from "@/lib/api/stats";
import TimeControls from "@/components/TimeControls";
import Chart from "@/components/Chart";
import RangeSelector from "@/components/RangeSelector";

export default function Page() {
    const { range } = useTimeRange();
    const [data, setData] = useState<Stat[]>([]);

    useEffect(() => {
        fetchStats(range).then((res) => setData(res));
    }, [range]);

    return (
        <main className="bg-cover min-h-screen m-0 p-0 top-0" style={{ backgroundImage: "url('/images/ariungoo-batzorig-xWRo5J3xQH8-unsplash.jpg')" }}>
            <RangeSelector />
            <TimeControls />
            <Chart data={data} />

        </main>
    );
}