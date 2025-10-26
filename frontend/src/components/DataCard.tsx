// components/DataCard.tsx

interface DataCardProps {
    title: string;
    children: React.ReactNode;
}

export function DataCard({ title, children }: DataCardProps) {
    return (
        <div className="w-full rounded-2xl p-4 bg-white drop-shadow-xl border-1 box-border">
            <div className="font-semibold text-black">{title}</div>
            <div className="text-4xl text-black mt-2 mb-4">+1.5°C</div>
            <div className="h-50">{children}</div>
            <div className="text-xs text-gray-400">Source: NASA</div>
        </div>
    );
}