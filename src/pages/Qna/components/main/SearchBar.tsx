import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchType: string;
    setSearchType: (type: string) => void;
    fromDate: string;
    setFromDate: (date: string) => void;
    toDate: string;
    setToDate: (date: string) => void;
    handleSearch: () => void;
    handleResetSearch: () => void;
}

export default function SearchBar(
    {
        searchQuery,
        setSearchQuery,
        searchType,
        setSearchType,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        handleSearch,
        handleResetSearch
    }: SearchBarProps
) {
    return (
        <div className="bg-white rounded-2xl border px-6 py-8 mb-12">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="질문을 검색하세요..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">제목+내용</option>
                        <option value="title">제목만</option>
                        <option value="content">내용만</option>
                        <option value="writer">작성자</option>
                    </select>

                </div>
                <div className="flex gap-4 md:items-center md:flex-row flex-col items-start">
                    {/* 날짜 입력창 */}
                    <div className='flex'>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="px-2 py-1 border md:w-full w-1/2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="text-gray-400 w-auto">~</span>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="px-2 py-1 border md:w-full w-1/2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* 사용자 액션 */}
                    <div className='flex gap-2 w-full'>
                        <button
                            title='검색 조건 초기화'
                            onClick={handleResetSearch}
                            className="bg-gray-200 md:w-auto w-1/2 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-300 transition-colors mr-2"
                        >
                            초기화
                        </button>
                        <button
                            title='조건 검색 '
                            onClick={handleSearch}
                            className="bg-primary-green md:w-auto w-1/2 text-white px-4 py-1 rounded-lg hover:bg-hover-primary-green transition-colors"
                        >
                            검색
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
