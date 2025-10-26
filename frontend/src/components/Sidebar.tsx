// components/Sidebar.tsx

import {useTimeRange} from "@/context/TimeRangeContext";

export function Sidebar({ children }: { children: React.ReactNode }) {
    const { range } = useTimeRange();

    const title: string = range.start === range.end ? range.end.toString() : range.start + "—" + range.end;

    return (
        <div className="flex flex-col gap-4 w-100 max-h-screen p-4 pb-25">
            <div className="title text-5xl font-light">{title}</div>
            <div className="flex flex-col gap-2 glass rounded-[22px] w-full p-2 overflow-scroll no-scrollbar">
                {children}
            </div>
        </div>
    );
}