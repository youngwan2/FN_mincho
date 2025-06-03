import { FormEventHandler, useState } from 'react'
import plant from '@/assets/plant.png'
import { Category } from '@/types/post.types'

interface CommunityHeaderProps {
    onSearch: FormEventHandler<HTMLFormElement>
    onClick: (categoryId: number) => void
    activeCategoryId: number
    categoryInfos: Category[]

}

const searchOptions = [
    { label: '전체', value: 'all' },
    { label: '제목', value: 'title' },
    { label: '내용', value: 'content' },
    { label: '작성자', value: 'author' },
]

export default function CommunityHeader({ onSearch, categoryInfos, activeCategoryId, onClick }: CommunityHeaderProps) {
    const [queryType, setSearchType] = useState('all')


    return (
        <div className="flex justify-center items-center mb-8 bg-primary-green h-[350px] rounded-xl flex-col relative">
            <h2 className="text-white md:text-4xl sm:text-3xl md:block hidden z-10 pb-10 relative animate-wiggle">
                자연과 함께 성장하는 커뮤니티, 민초
            </h2>

            {/* 카테고리 탭 */}
            <ul className="flex md:justify-normal justify-center flex-wrap gap-2 mt-4 z-10 relative">
                {categoryInfos.map((categoryInfo) => {
                    return (
                        <li
                            key={categoryInfo.id || ''}
                            className={`px-4 py-1 rounded-full cursor-pointer transition-all animate-fade-up ${activeCategoryId === categoryInfo.id
                                ? 'bg-white text-primary-green font-semibold'
                                : 'bg-[#ffffff44] text-white'
                                }`}
                            onClick={() => onClick(categoryInfo.id)}
                        >
                            {categoryInfo.name}
                        </li>
                    )
                })}
            </ul>

            {/* 검색 */}
            <img
                src={plant}
                alt="plant 이미지"
                className="w-sm h-[250px] absolute top-[50%] translate-y-[-50%] right-50 z-0 animate-wiggle-more"
                width={300}
                height={300}
            />
            <div className="mt-7 relative z-10 md:max-w-auto max-w-[90%] md:w-auto w-full">
                <form onSubmit={onSearch} className="md:gap-0 gap-3 flex md:flex-row flex-col md:justify-normal justify-center animate-fade-up animate-delay-[0.5s]">
                    {/* 검색(쿼리) 타입 */}
                    <select
                        name="type"
                        value={queryType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 bg-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#05D182] text-gray-700"
                    >
                        {searchOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* 검색창 */}
                    <input
                        type="text"
                        name="query"
                        placeholder="검색어를 입력하세요"
                        className="px-4 py-2 border  border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#05D182] md:rounded-none rounded-md placeholder:text-gray-500 bg-white"
                    />

                    {/* 검색 버튼 */}
                    <button
                        type="submit"
                        className="bg-[#0e9c66]  text-white px-4 py-2 md:rounded-r-md rounded-md hover:cursor-pointer hover:bg-hover-primary-green"
                    >
                        검색
                    </button>
                </form>
            </div>
        </div>
    )
}
