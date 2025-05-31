import { Category } from "../../../types/post.types"

interface CommunityDesktopSidebarProps {
    mobile: boolean
    categoryInfos: Category[]
    activeCategoryId: number
    onClick: (categoryId: number) => void
}

export default function CommunityDesktopSidebar({ mobile, categoryInfos, activeCategoryId, onClick }: CommunityDesktopSidebarProps) {
    return (
        <div className={`${mobile ? 'hidden' : 'block'} w-64 bg-white rounded-lg shadow-sm overflow-hidden`}>
            <div className="bg-[#05D182] text-white p-4 font-semibold">
                카테고리
            </div>
            <ul>
                {categoryInfos.map((categoryInfo) => {
                    const categoryId = categoryInfo.id
                    const categoryName = categoryInfo.name
                    const count = categoryInfo.count
                    return (
                        <li
                            key={categoryInfo.id}
                            className={`flex justify-between items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50
                  ${activeCategoryId === categoryId ? 'border-l-4 border-l-[#05D182] font-semibold' : ''}`}
                            onClick={() => onClick(categoryId)}
                        >
                            <span>{categoryName}</span>
                            <span className={`px-2 py-1 rounded-full text-xl flex items-center justify-center ${activeCategoryId === categoryId ? 'bg-hover-primary-green text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {count}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}