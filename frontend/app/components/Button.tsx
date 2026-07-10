export function ButtonPrimary({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className=" cursor-pointer hover:scale-105 transition-transform duration-200 p-3 bg-white rounded-full
            text-black backdrop-blur-3xl font-semibold"
        >
            {children}
        </button>
    );
}

export function ButtonSecondary({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="p-3 bg-white/1 border border-white/10  rounded-full backdrop-blur-sm  shadow-lg
             cursor-pointer hover:scale-105 transition-transform duration-200"
        >
            {children}
        </button>
    );
}