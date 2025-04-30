

interface HerbSortProps {
    onSort: (sort: string, orderBy: string) => void;
}

export default function HerbSort({ onSort }: HerbSortProps) {
    return (
        <div className="flex text-[12px]">
            <button onClick={() => onSort("cntntsSj", "asc")} className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5 border-r border-[#9993]`}>가나다순</button>
            <button onClick={() => onSort("latest", "desc")} className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5 border-r border-[#9993]`}>최근순</button>
            <button onClick={() => onSort("views", "desc")} className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5`}>조회순</button>
        </div>
    )
}