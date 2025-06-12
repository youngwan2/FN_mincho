import { faqItems } from '@/config/faq';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';


export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [openQuestions, setOpenQuestions] = useState<number[]>([]);



    // 카테고리 목록
    const categories = Array.from(new Set(faqItems.map(item => item.category)));

    // 검색 및 필터링 처리
    const filteredFAQs = faqItems.filter(item => {
        const matchesSearch = searchTerm.trim() === '' ||
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = !activeCategory || item.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    // 질문 토글 처리
    const toggleQuestion = (id: number) => {
        if (openQuestions.includes(id)) {
            setOpenQuestions(openQuestions.filter(qId => qId !== id));
        } else {
            setOpenQuestions([...openQuestions, id]);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0, behavior: 'smooth'
        })
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold text-center mb-8">자주 묻는 질문</h1>
            <p className="text-center text-gray-600 mb-10 text-2xl">
                민초 서비스에 대한 궁금증을 해결해 드립니다.
            </p>

            {/* 검색 영역 */}
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="질문 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        aria-label="질문 검색"
                    />
                    <FiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-2xl" />
                </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 rounded-full text-xl font-medium transition-all ${!activeCategory
                        ? 'bg-[#05D182] text-white shadow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    전체
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-2xl font-medium transition-all ${activeCategory === category
                            ? 'bg-[#05D182] text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* FAQ 목록 */}
            {filteredFAQs.length > 0 ? (
                <div className="space-y-4">
                    {filteredFAQs.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleQuestion(item.id)}
                                className="flex items-center justify-between w-full p-5 bg-white hover:bg-gray-50 transition-all focus:outline-none text-left"
                                aria-expanded={openQuestions.includes(item.id)}
                                aria-controls={`faq-answer-${item.id}`}
                            >
                                <span className="font-medium text-2xl">{item.question}</span>
                                {openQuestions.includes(item.id) ? (
                                    <FiChevronUp className="text-[#05D182] text-2xl" />
                                ) : (
                                    <FiChevronDown className="text-gray-400 text-2xl" />
                                )}
                            </button>
                            {openQuestions.includes(item.id) && (
                                <div
                                    id={`faq-answer-${item.id}`}
                                    className="p-5 bg-gray-50 border-t border-gray-100"
                                >
                                    <p className="text-gray-700">{item.answer}</p>
                                    <div className="mt-3 flex items-center">
                                        <span className="px-3 py-1 text-xl font-medium text-gray-600 bg-gray-200 rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-3xl text-gray-500">검색 결과가 없습니다.</p>
                    <p className="text-2xl text-gray-400 mt-2">다른 키워드로 검색하거나 카테고리를 변경해 보세요.</p>
                </div>
            )}

            {/* 문의하기 버튼 */}
            <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">원하는 답변을 찾지 못하셨나요?</p>
                <a
                    href='https://forms.gle/ApM2zdG9nonzdiSn7' target='_blank'
                    className="inline-block bg-[#05D182] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#04b06e] transition-colors shadow-sm"
                >
                    문의하기
                </a>
            </div>
        </div>
    );
}
