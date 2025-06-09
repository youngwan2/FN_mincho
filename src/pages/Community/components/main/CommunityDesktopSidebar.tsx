import { Category } from "../../../../types/post.types"

interface CommunityDesktopSidebarProps {
    mobile: boolean
    categoryInfos: Category[]
    activeCategoryId: number
    onClick: (categoryId: number) => void
}

export default function CommunityDesktopSidebar({ mobile, categoryInfos, activeCategoryId, onClick }: CommunityDesktopSidebarProps) {
    return (
        <div className={`${mobile ? 'hidden' : 'block'} w-[250px] px-3 bg-white rounded-lg border overflow-hidden `}>
            <div className="text-black p-4 font-semibold">
                카테고리
            </div>
            <ul className="space-y-4 pl-5 ">
                <li
                    className={`flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50
                  ${activeCategoryId === 0 ? ' font-semibold' : ''}`}
                    onClick={() => onClick(0)}
                >
                    <span>전체</span>
                    <span className={`px-4 py-0.5 rounded-[8px] text-xl flex items-center justify-center ${activeCategoryId === 0 ? 'bg-hover-primary-green text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {categoryInfos.reduce((acc, category) => acc + Number(category.count || 0), 0)}
                    </span>
                </li>
                {categoryInfos.map((categoryInfo) => {
                    const categoryId = categoryInfo.id
                    const categoryName = categoryInfo.name
                    const count = categoryInfo.count
                    return (
                        <li
                            key={categoryInfo.id}
                            className={`flex justify-between items-center p-3  cursor-pointer hover:bg-gray-50
                  ${activeCategoryId === categoryId ? 'border-l-4 border-l-[#05D182] font-semibold' : ''}`}
                            onClick={() => onClick(categoryId)}
                        >
                            <span>{categoryName}</span>
                            <span className={`px-4 py-0.5 rounded-[8px] text-xl flex items-center justify-center ${activeCategoryId === categoryId ? 'bg-hover-primary-green text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {count}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}