import { PostStatistics } from "../../../types/post.types"

interface CommunitySidebarProps {
    activeCategory: string
    categoryInfos: PostStatistics[]
    onClick: (categoryId: string) => void
}

const categoryOrder: { [key: string]: number } = {
    "all": 0,
    "notice": 1,
    "info": 2,
    "free": 3,
    "question": 4,
};

export default function CommunitySidebar({ activeCategory, categoryInfos, onClick }: CommunitySidebarProps) {



    // 렌더링할 때 정렬 먼저
    const sortedCategoryInfos = [...categoryInfos].sort((a, b) => {
        return (categoryOrder[a.category] ?? 999) - (categoryOrder[b.category] ?? 999);
    });

    return (
        <div className="w-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#05D182] text-white p-4 font-semibold">
                카테고리
            </div>
            <ul>
                {sortedCategoryInfos.map((categoryInfo) => {
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
                            <span className={`px-2 py-1 rounded-full text-xs ${activeCategory === categoryId ? 'bg-[#05D182] text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {count}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )

}