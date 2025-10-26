// components/MapOverlay.tsx
"use client";

import RangeSelector from "@/components/RangeSelector";
import {useEffect, useState} from "react";
import {Stat, YearRange} from "@/types/stat";
import {fetchStats} from "@/lib/api/stats";
import TemperatureChartCard from "@/components/TemperatureChartCard";
import {Sidebar} from "@/components/Sidebar";
import {ProfileButton} from "@/components/ProfileButton";

import {UserRound} from "lucide-react";
import SealevelChartCard from "@/components/SealevelChartCard";
import {useTimeRange} from "@/context/TimeRangeContext";

export default function MapOverlay() {
    const { range } = useTimeRange();
    const [temperature, setTemperature] = useState<Stat[]>([]);
    const [sealevel, setSealevel] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetchStats("temperature", { start: 1980, end: 2030 }),
            fetchStats("sealevel", { start: 1980, end: 2030 }),
        ])
            .then(([temp, sea]) => {
                setTemperature(temp);
                setSealevel(sea);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    function latestValue(data: Stat[], key: keyof Stat, range: YearRange) {
        const visible = data.filter(d => d.year >= range.start && d.year <= range.end);
        return visible.length ? visible[visible.length -1][key] ?? null : null;
    }

    const tempValue = latestValue(temperature, "temperature", range)?.toFixed(2);
    const levelValue = latestValue(sealevel, "level", range)?.toFixed(2);

    const tempUnit = tempValue != null ? `+${tempValue}°C` : "—";
    const levelUnit = levelValue != null ? `+${levelValue}cm` : "—";

    return (
        <div className="map-overlay absolute top-0 bottom-0 w-full">
            <Sidebar>
                <TemperatureChartCard title={"Global Temperature"} unit={tempUnit} data={temperature} />
                <SealevelChartCard title={"Global Sea Level"} unit={levelUnit} data={sealevel} />
            </Sidebar>
            <RangeSelector />
            <ProfileButton><UserRound /></ProfileButton>
        </div>
    )
}