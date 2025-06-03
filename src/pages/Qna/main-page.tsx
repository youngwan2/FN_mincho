import React, { useState } from 'react';
import { FiPlus, FiEye, FiMessageCircle, FiSearch } from 'react-icons/fi';

interface QnAItem {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    category: string;
    categoryColor: string;
    views: number;
    replies: number;
    isAnswered: boolean;
}

export default function QnAPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');

    const categories = ['전체', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', '기타'];

    const qnaItems: QnAItem[] = [
        {
            id: 1,
            title: 'React에서 useState와 useEffect의 차이점이 무엇인가요?',
            description: 'React Hooks를 공부하고 있는데 useState와 useEffect의 차이점과 각각 언제 사용해야 하는지 궁금합니다.',
            author: '김개발',
            date: '2024-01-15',
            category: 'React',
            categoryColor: 'bg-blue-100 text-blue-800',
            views: 245,
            replies: 3,
            isAnswered: true
        },
        {
            id: 2,
            title: 'Next.js App Router에서 서버 컴포넌트와 클라이언트 컴포넌트 구분하는 방법',
            description: 'Next.js 13+ App Router를 사용할 때 서버 컴포넌트와 클라이언트 컴포넌트를 어떻게 구분해서 사용해야 하나요?',
            author: '이프론트',
            date: '2024-01-14',
            category: 'Next.js',
            categoryColor: 'bg-gray-100 text-gray-800',
            views: 189,
            replies: 2,
            isAnswered: true
        },
        {
            id: 3,
            title: 'TypeScript에서 Generic 타입을 언제 사용하나요?',
            description: 'TypeScript를 배우고 있는데 Generic 타입의 개념과 실제 사용 사례를 알고 싶습니다.',
            author: '박타입',
            date: '2024-01-13',
            category: 'TypeScript',
            categoryColor: 'bg-blue-100 text-blue-800',
            views: 156,
            replies: 1,
            isAnswered: false
        },
        {
            id: 4,
            title: 'CSS Grid와 Flexbox 중 어떤 것을 선택해야 할까요?',
            description: '레이아웃을 구성할 때 CSS Grid와 Flexbox 중 어떤 것을 언제 사용하는 것이 좋은지 조언 부탁드립니다.',
            author: '최스타일',
            date: '2024-01-12',
            category: 'CSS',
            categoryColor: 'bg-pink-100 text-pink-800',
            views: 203,
            replies: 0,
            isAnswered: false
        },
        {
            id: 5,
            title: 'JavaScript 비동기 처리 방법들의 차이점',
            description: 'Promise, async/await, callback의 차이점과 각각의 장단점을 알고 싶습니다.',
            author: '정자바',
            date: '2024-01-11',
            category: 'JavaScript',
            categoryColor: 'bg-yellow-100 text-yellow-800',
            views: 312,
            replies: 5,
            isAnswered: true
        }
    ];

    const filteredItems = qnaItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1200px] w-full mx-auto">
                {/* 헤더r */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Q&A 게시판</h1>
                    <p className="text-gray-600">약초 관련 질문과 답변을 공유하는 공간입니다.</p>
                </div>

                {/* 검색 및 질문하기 버튼 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="질문을 검색하세요..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                            <FiPlus size={18} />
                            질문하기
                        </button>
                    </div>
                </div>

                {/* 카테고리 필터*/}
                <div className="mb-6">
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-xl font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Q&A 목록 */}
                <div className="space-y-4">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xl font-medium ${item.categoryColor}`}>
                                            {item.category}
                                        </span>
                                        {item.isAnswered && (
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xl font-medium">
                                                답변완료
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="flex items-center justify-between text-xl text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span>{item.author}</span>
                                        <span>{item.date}</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <FiEye size={16} />
                                            <span>{item.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiMessageCircle size={16} />
                                            <span>{item.replies}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-2 text-gray-500 hover:text-gray-700">이전</button>

                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg font-medium ${currentPage === page
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <span className="px-3 py-2 text-gray-500">다음</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
