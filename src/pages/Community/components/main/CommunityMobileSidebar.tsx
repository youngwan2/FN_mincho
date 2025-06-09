import { Category } from "@/types/post.types"


interface CommunityMobileSidebar {
    mobile: boolean
    activeCategoryId: number
    categoryInfos: Category[]
    active: boolean
    onClick: (categoryId: number) => void
}

export default function CommunityMobileSidebar({ mobile, activeCategoryId, categoryInfos, active, onClick }: CommunityMobileSidebar) {
    if (!mobile) return null;
    return (
        <div className={`${active ? 'block' : 'hidden'} w-[250px] bg-white rounded-lg shadow-[0_0_25px_1px_rgba(0,0,0,0.2)] overflow-hidden fixed top-1/4 z-50`}>
            <div className="p-4 font-semibold">
                카테고리
            </div>
            <ul className="pl-4 space-y-3 overflow-y-auto h-auto">
                <li
                    className={`flex justify-between items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50
                  ${activeCategoryId === 0 ? 'font-semibold' : ''}`}
                    onClick={() => onClick(0)}
                >
                    <span>전체</span>
                    <span className={`px-2 py-1 rounded-full text-xl flex items-center justify-center ${activeCategoryId === 0 ? 'bg-hover-primary-green text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {categoryInfos.reduce((acc, category) => acc + Number(category.count || 0), 0) /* 전체 카테고리의 아이템 개수 합산 */}
                    </span>
                </li>
                {categoryInfos.map((categoryInfo) => {
                    return (
                        <li
                            key={categoryInfo.id}
                            className={`flex justify-between items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50
                  ${activeCategoryId === categoryInfo.id ? ' font-semibold' : ''}`}
                            onClick={() => onClick(categoryInfo.id)}
                        >
                            <span>{categoryInfo.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xl flex items-center justify-center ${activeCategoryId === categoryInfo.id ? 'bg-hover-primary-green text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {categoryInfo.count}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}