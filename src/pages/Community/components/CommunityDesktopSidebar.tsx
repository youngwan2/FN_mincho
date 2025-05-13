interface CommunityDesktopSidebarProps {
    mobile: boolean
    mergedCategories: { category: string, count: number }[]
    activeCategory: string
    onClick: (categoryId: string) => void
}

export default function CommunityDesktopSidebar({ mobile, mergedCategories, activeCategory, onClick }: CommunityDesktopSidebarProps) {
    return (
        <div className={`${mobile ? 'hidden' : 'block'} w-64 bg-white rounded-lg shadow-sm overflow-hidden`}>
            <div className="bg-[#05D182] text-white p-4 font-semibold">
                카테고리
            </div>
            <ul>
                {mergedCategories.map((categoryInfo) => {
                    const categoryId = categoryInfo.category;
                    const count = categoryInfo.count;
                    const categoryName = categoryId === 'info'
                        ? "정보 공유"
                        : categoryId === 'notice'
                            ? "공지사항"
                            : categoryId === 'free'
                                ? "자유게시판"
                                : categoryId === 'question'
                                    ? "질문 & 답변"
                                    : "전체";

                    return (
                        <li
                            key={categoryId}
                            className={`flex justify-between items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50
                  ${activeCategory === categoryId ? 'border-l-4 border-l-[#05D182] font-semibold' : ''}`}
                            onClick={() => onClick(categoryId)}
                        >
                            <span>{categoryName}</span>
                            <span className={`px-2 py-1 rounded-full text-xl flex items-center justify-center ${activeCategory === categoryId ? 'bg-hover-primary-green text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {count}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}