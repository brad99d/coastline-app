// components/Map.tsx

"use client";
import { useEffect, useRef } from "react";
import type { ExpressionSpecification } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTimeRange } from "@/context/TimeRangeContext";

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const { range, currentFrame, playing } = useTimeRange();

    useEffect(() => {
        if (map.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
        const m = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/s102115825/cmfeq2x8q00a801so8plcaz2i',
            center: [145.122467, -38.141399],
            zoom: 13,
            attributionControl: false,
        });

        m.on("load", () => {
            m.addSource("coastline", {
                type: "vector",
                tiles: ['http://localhost:8080/data/coastline/{z}/{x}/{y}.pbf'],
                minzoom: 0,
                maxzoom: 14,
            });

            m.addLayer({
                id: "coastline",
                type: "line",
                source: "coastline",
                'source-layer': 'coastline',
                paint: { 'line-color': 'hsl(180, 80%, 80%)', 'line-width': 2 },
                layout: {
                    'line-sort-key': ['get', 'year']
                }
            });

            m.setFilter("coastline", [
                "all",
                [">=", ["get", "year"], range.start],
                ["<=", ["get", "year"], range.end],
            ]);
        });

        map.current = m;
    }, []);

    // show only selected range
    useEffect(() => {
        if (!map.current || !map.current.isStyleLoaded()) return;
        const m = map.current;

        const gradient: ExpressionSpecification | string =
            range.start === range.end
                ? 'hsl(180, 80%, 80%)'
                : [
            'interpolate',
            ['linear'],
            ['get', 'year'],
            range.start, 'hsl(220, 100%, 20%)',
            range.end, 'hsl(180, 80%, 80%)'
        ];

        m.setPaintProperty('coastline', 'line-color', gradient);

        m.setFilter("coastline", [
            "all",
            [">=", ["get", "year"], range.start],
            ["<=", ["get", "year"], range.end],
        ]);
    }, [range, playing]);

    useEffect(() => {
        if (!map.current || !map.current.isStyleLoaded()) return;
        const m = map.current;

        if (!playing) return;

        m.setFilter("coastline", ["==", ["get", "year"], currentFrame]);

        m.setPaintProperty(
            "coastline",
            "line-color",
            "hsl(180, 80%, 80%)"
        )
    }, [currentFrame, playing, range]);

    return <div ref={mapContainer} className="absolute top-0 left-0 w-full h-screen z-0" />;
}