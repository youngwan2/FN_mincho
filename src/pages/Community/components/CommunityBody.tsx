interface CommunityBodyProps {
    children: React.ReactNode
}

export default function CommunityBody({ children }: CommunityBodyProps) {
    return (
        <div className="flex gap-6 mb-6 h-full w-full">
            {children}
        </div>
    )
}