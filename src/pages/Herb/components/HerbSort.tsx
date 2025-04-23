

interface HerbSortProps { 
    onSort: (sort: string, orderBy: string) => void;
}

export default function HerbSort({onSort}:HerbSortProps) {
    return (
        <div className="flex text-[12px]">
            <button onClick={()=> onSort("cntntsSj", "asc")} className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5 border-r border-[#9993]`}>이름순</button>
            <button onClick={()=> onSort("id", "desc")} className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5 border-r border-[#9993]`}>최근등록</button>
            <button onClick={()=> onSort("view","desc")} className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5`}>인기순</button>
        </div>
    )
}