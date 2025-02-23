

// interface HerbSortProps { }

export default function HerbSort() {
    return (
        <div className="flex text-[12px]">
            <button className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5 border-r border-[#9993]`}>이름순</button>
            <button className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5 border-r border-[#9993]`}>최근등록</button>
            <button className={` hover:cursor-pointer hover:text-hover-primary-green p-1.5`}>인기순</button>
        </div>
    )
}