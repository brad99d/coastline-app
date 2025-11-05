// app/dashboard/page.tsx

"use client";
import Map from "@/components/Map";
import MapOverlay from "@/components/MapOverlay";

export default function Page() {
    return (
        <main className="bg-cover h-screen max-h-screen w-screen max-w-screen m-0 p-0">
            <Map />
            <MapOverlay />
        </main>
    );
}