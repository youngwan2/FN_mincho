import { PostStatistics } from "../../../types/post.types"

interface CommunitySidebarProps {
    activeCategory: string
    categoryInfos: PostStatistics[]
    onClick: (categoryId: string) => void
}


export default function CommunitySidebar({ activeCategory, categoryInfos, onClick }: CommunitySidebarProps) {

    return (
        <div className="w-64 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#05D182] text-white p-4 font-semibold">
                카테고리
            </div>
            <ul>
                {categoryInfos.map((categoryInfo) => {
                    const categoryId = categoryInfo.category // 카테고리 식별자
                    const count = categoryInfo.count
                    const categoryName = categoryId === 'info' // 카테고리 식별자 별 한글명
                        ? "정보 공유"
                        : categoryId === 'notice'
                            ? "공지사항"
                            : categoryId === 'free'
                                ? "자유게시판"
                                : categoryId === 'question'
                                    ? "질문 & 답변"
                                    : "전체"


                    return (
                        <li
                            key={categoryId}
                            className={`flex justify-between items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50
                                        ${activeCategory === categoryInfo.category ? 'border-l-4 border-l-[#05D182] font-semibold' : ''}`}
                            onClick={() => onClick(categoryInfo.category)}>
                            <span>{categoryName}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${activeCategory === categoryId ? 'bg-[#05D182] text-white' : 'bg-gray-200 text-gray-700'}  `}>
                                {count}
                            </span>
                        </li>
                    )
                }

                )}
            </ul>
        </div>
    )
}