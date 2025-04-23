import { FormEventHandler, useState } from 'react'
import plant from '../../../assets/plant.png'

interface CommunityHeaderProps {
    onSearch: FormEventHandler<HTMLFormElement>
}

const categories = [
    { label: '전체', value: '' },
    { label: '공지사항', value: 'notice' },
    { label: '정보글', value: 'info' },
    { label: '자유글', value: 'free' },
    { label: '질문글', value: 'question' },
]

export default function CommunityHeader({ onSearch }: CommunityHeaderProps) {
    const [selectedCategory, setSelectedCategory] = useState('')

    return (
        <div className="flex justify-center items-center mb-8 bg-primary-green h-[350px] rounded-xl flex-col relative">
            <div>
                <h2 className="text-white text-4xl z-10 pb-10 relative animate-wiggle">
                    자연과 함께 성장하는 커뮤니티, 민초
                </h2>
            </div>

            {/* 카테고리 탭 */}
            <ul className="flex gap-4 mt-4 z-10 relative">
                {categories.map(({ label, value }) => (
                    <li
                        key={value}
                        className={`px-4 py-1 rounded-full cursor-pointer transition-all animate-fade-up ${
                            selectedCategory === value
                                ? 'bg-white text-primary-green font-semibold'
                                : 'bg-[#ffffff44] text-white'
                        }`}
                        onClick={() => setSelectedCategory(value)}
                    >
                        {label}
                    </li>
                ))}
            </ul>

            {/* 검색 */}
            <img
                src={plant}
                alt="plant 이미지"
                className="w-sm h-[250px] absolute top-[50%] translate-y-[-50%] right-50 z-0 animate-wiggle-more"
                width={300}
                height={300}
            />
            <div className="mt-7 relative z-10">
                <form onSubmit={onSearch} className="flex animate-fade-up animate-delay-[0.5s]">
                    <input
                        type="text"
                        name="query"
                        placeholder="검색어를 입력하세요"
                        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#05D182] placeholder:text-gray-500 bg-white"
                    />
                    <input type="hidden" name="type" value={selectedCategory} />
                    <button
                        type="submit"
                        className="bg-[#0e9c66] text-white px-4 py-2 rounded-r-md hover:cursor-pointer hover:bg-hover-primary-green"
                    >
                        검색
                    </button>
                </form>
            </div>
        </div>
    )
}
