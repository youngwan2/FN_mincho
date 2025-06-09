import { useState } from "react";





const searchOptions = [
    { label: '전체', value: 'all' },
    { label: '제목', value: 'title' },
    { label: '내용', value: 'content' },
    { label: '작성자', value: 'author' },
]


interface SearchFormProps {
    onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
    const [queryType, setSearchType] = useState('all')

    return (
        <form onSubmit={onSearch} className="bg-white p-6 rounded-lg border md:gap-2 gap-3 flex md:flex-row flex-col md:justify-normal justify-center w-full">
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
                className="px-4 py-2 border  border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-[#05D182] md:rounded-none rounded-md placeholder:text-gray-500 bg-white"
            />

            {/* 검색 버튼 */}
            <button
                type="submit"
                className="bg-[#0e9c66] min-w-32 text-white px-4 py-2 md:rounded-r-md rounded-md hover:cursor-pointer hover:bg-hover-primary-green"
            >
                검색
            </button>
        </form>
    )
}