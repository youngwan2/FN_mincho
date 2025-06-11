interface HerbDetailSubTitleProps {
    children: React.ReactNode
}

export default function HerbDetailSubTitle({ children}: HerbDetailSubTitleProps) {
    return (
        <strong className={`text-[18px]`}>
            {children}
        </strong>
    )
}