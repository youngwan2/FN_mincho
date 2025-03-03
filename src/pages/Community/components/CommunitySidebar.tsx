import { communityCategories } from "../../../config/categories"

interface CommunitySidebarProps {
    activeCategory: string
    onClick: (categoryId: string) => void
}


export default function CommunitySidebar({ activeCategory, onClick }: CommunitySidebarProps) {

    return (
        <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#05D182] text-white p-4 font-semibold">
                카테고리
            </div>
            <ul>
                {communityCategories.map((category) => (
                    <li
                        key={category.id}
                        className={`
    flex justify-between items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50
    ${activeCategory === category.id ? 'border-l-4 border-l-[#05D182] font-semibold' : ''}
  `}
                        onClick={() => onClick(category.id)}
                    >
                        <span>{category.name}</span>
                        <span className={`
    px-2 py-1 rounded-full text-xs
    ${activeCategory === category.id ? 'bg-[#05D182] text-white' : 'bg-gray-200 text-gray-700'}
  `}>
                            {category.count}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}