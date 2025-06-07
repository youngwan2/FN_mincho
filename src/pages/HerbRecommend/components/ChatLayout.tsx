

export default function ChatLayout({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col w-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white backdrop-blur-sm ${className || ''}`}>
            {children}
        </div>
    )
}