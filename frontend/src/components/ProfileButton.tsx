// components/ProfileButton.tsx

export function ProfileButton({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute top-0 right-0 p-4">
            <div className="glass rounded-full aspect-square text-black p-1">
                {children}
            </div>
        </div>
    );
}