

interface HerbSortProps {
    onSort: (sort: string, orderBy: string) => void;
    selectedSort: string
}

export default function HerbSort({ onSort, selectedSort }: HerbSortProps) {
    console.log(selectedSort)
    return (
        <div className="flex text-[14px]">
            <button onClick={() => onSort("cntntsSj", "asc")} className={`${selectedSort === "cntntsSj" ? 'text-primary-green' : ''} hover:cursor-pointer hover:text-gray-700 p-1.5 border-r border-[#9993]`}>가나다순</button>
            <button onClick={() => onSort("latest", "desc")} className={`${selectedSort === "latest" ? 'text-primary-green' : ''} hover:cursor-pointer hover:text-gray-700 p-1.5 border-r border-[#9993]`}>최근순</button>
            <button onClick={() => onSort("views", "desc")} className={`${selectedSort === "views" ? 'text-primary-green' : ''} hover:cursor-pointer hover:text-gray-700 p-1.5`}>조회순</button>
        </div>
    )
}