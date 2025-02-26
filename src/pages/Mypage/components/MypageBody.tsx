interface MypageBodyProps {
    children: React.ReactNode
}

export default function MypageBody({ children }: MypageBodyProps) {
    return (
        <div>
            {children}
        </div>
    )
}