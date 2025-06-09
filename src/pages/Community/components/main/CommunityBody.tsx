interface CommunityBodyProps {
    children: React.ReactNode
    className?: string
}

export default function CommunityBody({ children, className }: CommunityBodyProps) {
    return (
        <div className={`flex gap-6 mb-6 h-full w-full ${className}`}>
            {children}
        </div>
    )
}