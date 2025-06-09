import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQnaListGetQuery, useQnaCategoriesQuery } from '../../hooks/queries/useQueryQna';
import { QnaSearchCondition } from '../../types/qna.types';
import { useQnaPageStore } from '@/store/store';
import {
    SearchBar,
    CategoryFilter,
    QnaList,
    ErrorComponent,
    Pagination
} from './components/main';
import useScrollTo from '@/hooks/useScrollTo';

import { GiHerbsBundle } from "react-icons/gi";
import { MdQuestionAnswer } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";


const PAGE_SIZE = 10;
export default function QnAPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const { page, setPage, searchCondition, setSearchCondition } = useQnaPageStore();
    const [searchType, setSearchType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [_, setActiveTag] = useState<string | null>(null); // 현재 활성화된 태그 필터

    // 카테고리 목록 조회
    const { categories: fetchedCategories = [], isLoading: categoriesLoading } = useQnaCategoriesQuery();


    useScrollTo();

    // 서버에서 가져온 카테고리와 '전체' 옵션을 결합
    const allCategories = [{ id: 0, name: '전체', description: '모든 카테고리' }, ...fetchedCategories];

    // 카테고리 이름 목록 추출 (카테고리가 로딩 중일 때는 '전체' 옵션만 제공)
    const categoryNames = categoriesLoading ? ['전체'] : allCategories.map(cat => cat.name);// 초기값 설정


    // QnA 목록 조회
    const { qnas = [], totalCount = 0, isLoading, isError } = useQnaListGetQuery(page, PAGE_SIZE, searchCondition);

    const filteredItems = qnas || [];

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    // 카테고리 변경 처리
    const handleCategoryChange = (categoryName: string) => {
        setSelectedCategory(categoryName);
        const category = allCategories.find(cat => cat.name === categoryName);

        // categoryId를 설정하고 검색 조건 업데이트
        if (category) {
            const categoryId = category.id === 0 ? null : category.id;
            setSelectedCategoryId(categoryId);

            // 카테고리 변경 시 바로 검색 실행
            const newCondition: QnaSearchCondition = { ...searchCondition };

            if (categoryId !== null) {
                newCondition.categoryId = categoryId;
            } else {
                delete newCondition.categoryId;
            }

            setSearchCondition(newCondition);
            setPage(0); // 카테고리 변경 시 첫 페이지로 이동
        }
    };

    // 검색 실행
    const handleSearch = () => {
        const newCondition: QnaSearchCondition = {};

        // 키워드 및 카테고리 타입 필터링
        if (searchQuery) {
            newCondition.keyword = searchQuery;
            newCondition.searchType = searchType;
        }

        // 날짜 필터링
        if (fromDate) newCondition.fromDate = fromDate;
        if (toDate) newCondition.toDate = toDate;

        // 카테고리 필터링
        if (selectedCategoryId !== null) {
            newCondition.categoryId = selectedCategoryId;
        }

        setSearchCondition(newCondition);
        setPage(0); // 검색 시 첫 페이지로 이동
    };

    // 검색 초기화
    const handleResetSearch = () => {
        setSearchQuery('');
        setSearchType('');
        setFromDate('');
        setToDate('');
        setSelectedCategory('전체');
        setSelectedCategoryId(null);
        setSearchCondition({});
        setActiveTag(null);
        setPage(0);
    };

    // 태그 클릭 핸들러
    const handleTagClick = (tag: string) => {
        // 태그 클릭 시 다른 검색 조건은 유지하면서 태그만 변경
        setSearchCondition({
            ...searchCondition,
            tag
        });
        setActiveTag(tag);
        setPage(0);
    };

    // 태그 필터 제거 핸들러
    const handleRemoveTagFilter = () => {
        const { tag, ...restCondition } = searchCondition;
        setSearchCondition(restCondition);
        setActiveTag(null);
    };

    // 페이지 변경 처리
    const handlePageChange = (page: number) => {
        setPage(page - 1); // API는 0부터 시작하므로 -1
    };

    // QnA 상세 페이지로 이동
    const handleQnaClick = (qnaId: number) => {
        navigate(`/community/qnas/${qnaId}`);
    };

    // 새 QnA 작성 페이지로 이동
    const handleCreateQna = () => {
        navigate('/community/qna/write');
    };


    // 검색 조건 초기화
    useEffect(() => {
        if (searchCondition.keyword) {
            setSearchQuery(searchCondition.keyword);
        }
        if (searchCondition.searchType) {
            setSearchType(searchCondition.searchType);
        }
        if (searchCondition.fromDate) {
            setFromDate(searchCondition.fromDate);
        }
        if (searchCondition.toDate) {
            setToDate(searchCondition.toDate);
        }

        // 태그 상태 업데이트
        if (searchCondition.tag) {
            setActiveTag(searchCondition.tag);
        } else {
            setActiveTag(null);
        }
    }, [searchCondition]);

    // 카테고리 정보가 로드된 후에만 카테고리 ID로 이름 찾기
    useEffect(() => {
        if (searchCondition.categoryId && searchCondition.categoryId > 0 && !categoriesLoading && allCategories.length > 0) {
            setSelectedCategoryId(searchCondition.categoryId);
            // 카테고리 이름 설정
            const category = allCategories.find(cat => cat.id === searchCondition.categoryId);
            if (category) {
                setSelectedCategory(category.name);
            }
        }
    }, [searchCondition.categoryId, allCategories, categoriesLoading]);





    return (
        <section className="min-h-screen p-6">
            <div className="max-w-[1200px] w-full mx-auto animate-fade-down ">
                <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-6'>
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)] animate-fade-right">
                            <MdQuestionAnswer className="text-white mr-2" />
                            <span className="bg-[#0ac17b] text-white font-medium">커뮤니티 서비스</span>
                        </div>
                        <h1 className="flex items-center text-5xl md:text-6xl md:justify-start justify-center gap-3 font-bold text-gray-800 mb-5 md:mb-6 animate-fade-left">
                            <FaRegQuestionCircle className="text-primary-green hidden md:block" size={48} />
                            <span>민초 Q&A</span>
                        </h1>
                        <div className="animate-fade-down">
                            <strong className="text-[#05D182] text-3xl block mb-2">자연의 지혜를 나누는 약초 커뮤니티</strong>
                            <p className="text-gray-600 text-2xl md:max-w-xl">약초의 효능, 재배법, 활용법에 대한 궁금증을 해결해요</p>
                        </div>
                    </div>
                    <button
                        onClick={handleCreateQna}
                        className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 cursor-pointer font-medium"
                    >
                        <GiHerbsBundle className="text-white" size={20} />
                        질문하기
                    </button>
                </div>

                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    handleSearch={handleSearch}
                    handleResetSearch={handleResetSearch}
                />

                {/* 카테고리 필터 */}
                <CategoryFilter
                    categories={categoryNames}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={handleCategoryChange}
                    isLoading={categoriesLoading}
                />

                {/* 태그 필터 표시 */}
                {searchCondition.tag && (
                    <div className="mt-4 mb-4 bg-white p-3 rounded-lg border border-gray-200 flex items-center">
                        <span className="text-2xl mr-2">현재 태그 필터링:</span>
                        <div className="flex items-center bg-gradient-to-r from-[#e8f5e9] to-[#e3f2fd] text-gray-700 px-3 py-1 rounded-full text-xl border border-gray-100">
                            <span className="text-[#05D182] mr-1">#</span>
                            {searchCondition.tag}
                        </div>
                        <button
                            className="ml-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
                            onClick={handleRemoveTagFilter}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* 에러 상태 처리 */}
                {isError && <ErrorComponent />}

                {/* Q&A 목록 */}
                <QnaList
                    isLoading={isLoading || categoriesLoading}
                    items={filteredItems}
                    handleQnaClick={handleQnaClick}
                    handleCreateQna={handleCreateQna}
                    handleTagClick={handleTagClick}
                />

                {/* 페이지네이션 */}
                {!isLoading && totalPages > 1 && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
};
