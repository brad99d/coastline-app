// app/dashboard/page.tsx

"use client";
import { useEffect, useState } from "react";
import { Stat } from "@/types/stat";
import { useTimeRange } from "@/context/TimeRangeContext";
import { fetchStats } from "@/lib/api/stats";
import TimeControls from "@/components/TimeControls";
import Chart from "@/components/Chart";

export default function Page() {
    const { range } = useTimeRange();
    const [data, setData] = useState<Stat[]>([]);

    useEffect(() => {
        fetchStats(range).then((res) => setData(res.values));
    }, [range]);

    return (
        <main>
            <TimeControls />
            <Chart data={data} />
        </main>
    );
}