interface HerbHeaderProps {
    title: React.ReactNode
    sort: React.ReactNode
}

export default function HerbHeader({ title, sort }: HerbHeaderProps) {
    return (
        <div title="약초 페이지 헤더" className="flex justify-between items-center py-5">
            {title}
            {sort}
        </div>
    )
}