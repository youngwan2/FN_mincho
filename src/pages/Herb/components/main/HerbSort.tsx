interface HerbSortProps {
    onSort: (sort: string, orderBy: string) => void;
    selectedSort: string
}

export default function HerbSort({ onSort, selectedSort }: HerbSortProps) {
    return (
        <div className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 font-medium animate-fade-up">
            <div className="flex rounded-lg overflow-hidden">
                <button
                    onClick={() => onSort("cntntsSj", "asc")}
                    className={`${selectedSort === "cntntsSj" ? 'bg-white/30' : ''} hover:bg-white/20 px-3 py-1.5 transition-colors`}
                >
                    가나다순
                </button>
                <button
                    onClick={() => onSort("latest", "desc")}
                    className={`${selectedSort === "latest" ? 'bg-white/30' : ''} hover:bg-white/20 px-3 py-1.5 transition-colors`}
                >
                    최근순
                </button>
                <button
                    onClick={() => onSort("views", "desc")}
                    className={`${selectedSort === "views" ? 'bg-white/30' : ''} hover:bg-white/20 px-3 py-1.5 transition-colors`}
                >
                    조회순
                </button>
            </div>
        </div>
    )
}