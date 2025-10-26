// components/MapOverlay.tsx
"use client";

import RangeSelector from "@/components/RangeSelector";
import {useEffect, useState} from "react";
import {Stat} from "@/types/stat";
import {fetchStats} from "@/lib/api/stats";
import TemperatureChartCard from "@/components/TemperatureChartCard";
import {Sidebar} from "@/components/Sidebar";
import {ProfileButton} from "@/components/ProfileButton";

import {UserRound} from "lucide-react";
import SealevelChartCard from "@/components/SealevelChartCard";

export default function MapOverlay() {
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

    return (
        <div className="map-overlay absolute top-0 bottom-0 w-full">
            <Sidebar>
                <TemperatureChartCard title={"Global Temperature"} unit={"+1.5°C"} data={temperature} />
                <SealevelChartCard title={"Global Sea Level"} unit={"+10.0cm"} data={sealevel} />
            </Sidebar>
            <RangeSelector />
            <ProfileButton><UserRound /></ProfileButton>
        </div>
    )
}