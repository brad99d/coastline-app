// components/MapOverlay.tsx
"use client";

import RangeSelector from "@/components/RangeSelector";
import {useTimeRange} from "@/context/TimeRangeContext";
import {useEffect, useState, useMemo} from "react";
import {Stat} from "@/types/stat";
import {fetchStats} from "@/lib/api/stats";
import BarChartCard from "@/components/BarChartCard";
import {Sidebar} from "@/components/Sidebar";
import {ProfileButton} from "@/components/ProfileButton";

import {UserRound} from "lucide-react";

export default function MapOverlay() {
    const { range } = useTimeRange();
    const [data, setData] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats({ start: 1980, end: 2030 })
            .then((res) => setData(res))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredData = useMemo(
        () => data.filter((d: Stat) => d.year >= range.start && d.year <= range.end),
        [data, range]
    );

    return (
        <div className="map-overlay absolute top-0 bottom-0 w-full">
            <Sidebar>
                <BarChartCard title={"Global Temperature"} data={filteredData} />
                <BarChartCard title={"Global Temperature"} data={filteredData} />
                <BarChartCard title={"Global Temperature"} data={filteredData} />
            </Sidebar>
            <RangeSelector />
            <ProfileButton><UserRound /></ProfileButton>
        </div>
    )
}