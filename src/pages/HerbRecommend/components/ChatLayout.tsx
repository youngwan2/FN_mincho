

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
            {children}
        </div>
    )
}