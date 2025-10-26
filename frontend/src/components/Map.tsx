// components/Map.tsx

"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

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
            m.addSource("coastlines", {
                type: "geojson",
                data: `/api/coastline` // ?in_bbox=minx,miny,maxx,maxy
            });

            m.addLayer({
                id: "coastlines-layer",
                type: "line",
                source: "coastlines",
                paint: {
                    "line-color": "#ffffff",
                    "line-width": 1.0,
                },
            });
        });

        map.current = m;
    }, []);

    return <div ref={mapContainer} className="absolute top-0 left-0 w-full h-screen z-0" />;
}