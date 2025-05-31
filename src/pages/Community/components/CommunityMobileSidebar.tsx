import { Category } from "../../../types/post.types"


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
        <div className={`${active ? 'block' : 'hidden'} w-64 bg-white rounded-lg shadow-[0_0_25px_1px_rgba(0,0,0,0.2)] overflow-hidden fixed top-1/4 z-50`}>
            <div className="bg-[#05D182] text-white p-4 font-semibold">
                카테고리
            </div>
            <ul>
                {categoryInfos.map((categoryInfo) => {
                    return (
                        <li
                            key={categoryInfo.id}
                            className={`flex justify-between items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50
                  ${activeCategoryId === categoryInfo.id ? 'border-l-4 border-l-[#05D182] font-semibold' : ''}`}
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