// components/Sidebar.tsx

import {useTimeRange} from "@/context/TimeRangeContext";
import {useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Sidebar({ children }: { children: React.ReactNode }) {
    const { range } = useTimeRange();
    const [open, setOpen] = useState(false);

    const title: string = range.start === range.end ? range.end.toString() : range.start + "—" + range.end;

    return (
        <div className="flex flex-col gap-4 w-100 max-h-screen p-4 pb-25">
            <div className="title text-5xl font-light text-white">{title}</div>
            <div className={`
            flex flex-col gap-2 glass rounded-[22px] w-full p-2 overflow-scroll no-scrollbar transition-transform
            ${ open ? "translate-x-0" : "-translate-x-[105%]"}
            `}>
                {children}
            </div>
            <button onClick={() => setOpen(!open)} className={`absolute top-22 ${ open ? "left-98" : "left-3" } cursor-pointer`}>
                { open ? <ChevronLeft className="text-white" /> : <ChevronRight className="text-white"/> }
            </button>
        </div>
    );
}