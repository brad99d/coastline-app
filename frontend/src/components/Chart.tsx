// components/Chart.tsx

"use client";
import { Stat } from "@/types/stat";

export default function Chart({ data }: { data: Stat[]}) {
    return (
        <div>
            {data.map((d) => (
                <div key={d.year}>
                    {d.year}: {d.value}
                </div>
            ))}
        </div>
    );
}