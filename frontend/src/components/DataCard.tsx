// components/DataCard.tsx

interface DataCardProps {
    title: string;
    children: React.ReactNode;
}

export function DataCard({ title, children }: DataCardProps) {
    return (
        <div className="w-full rounded-2xl p-4 bg-white drop-shadow-xl border-1 box-border">
            <div className="text-lg font-semibold text-black">{title}</div>
            <div className="h-70">{children}</div>
        </div>
    );
}