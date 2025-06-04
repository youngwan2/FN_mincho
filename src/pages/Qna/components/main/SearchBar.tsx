import { FiSearch, FiPlus, FiCalendar } from 'react-icons/fi';

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
    handleCreateQna: () => void;
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
        handleResetSearch,
        handleCreateQna
    }: SearchBarProps
) {
    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
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
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">제목+내용</option>
                        <option value="title">제목만</option>
                        <option value="content">내용만</option>
                        <option value="writer">작성자</option>
                    </select>
                    <button
                        onClick={handleCreateQna}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <FiPlus size={18} />
                        질문하기
                    </button>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" />
                        <span className="text-2xl text-gray-600">기간:</span>
                    </div>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-400">~</span>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleResetSearch}
                        className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-300 transition-colors mr-2"
                    >
                        초기화
                    </button>
                    <button
                        onClick={handleSearch}
                        className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        검색
                    </button>
                </div>
            </div>
        </div>
    );
};
