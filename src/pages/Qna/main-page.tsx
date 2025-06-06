import { useState, useEffect, useRef } from 'react';
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
import { FaLeaf } from 'react-icons/fa6';


const PAGE_SIZE = 10;
export default function QnAPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const { page, setPage, searchCondition, setSearchCondition } = useQnaPageStore();
    const [searchType, setSearchType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);    // 카테고리 목록 조회
    const { categories: fetchedCategories = [], isLoading: categoriesLoading } = useQnaCategoriesQuery();


    const sectionRef = useRef<HTMLElement>(null);

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
        setPage(0);
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


    useEffect(() => {
        // 페이지가 로드될 때 스크롤을 최상단으로 이동
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [])

    return (
        <section ref={sectionRef} className="min-h-screen p-6">
            <div className="max-w-[1200px] w-full mx-auto ">
                {/* 헤더 */}
                <div className='flex justify-between items-center mb-12'>
                    <div >
                        <h1 className="flex text-4xl gap-3 font-bold text-gray-900 mb-2"><FaLeaf color='green' /> Q&A 게시판</h1>
                        <p className="text-gray-600">약초 관련 질문과 답변을 공유하는 공간입니다.</p>
                    </div>
                    <button
                        onClick={handleCreateQna}
                        className="bg-primary-green text-white px-12 py-4 rounded-2xl shadow-[inset_-2px_-2px_3px_rgba(0,0,0,0.3)] hover:bg-hover-primary-green transition-colors flex items-center gap-2 cursor-pointer"
                    >
                        나도 질문하기
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

                {/* 에러 상태 처리 */}
                {isError && <ErrorComponent />}

                {/* Q&A 목록 */}
                <QnaList
                    isLoading={isLoading || categoriesLoading}
                    items={filteredItems}
                    handleQnaClick={handleQnaClick}
                    handleCreateQna={handleCreateQna}
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
