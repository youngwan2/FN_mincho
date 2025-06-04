import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQnaListGetQuery } from '../../hooks/queries/useQueryQna';
import { QnaSearchCondition } from '../../types/qna.types';
import { useQnaPageStore } from '@/store/store';
import {
    SearchBar,
    CategoryFilter,
    QnaList,
    ErrorComponent,
    Pagination
} from './components/main';


const PAGE_SIZE = 10;
export default function QnAPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const { page, setPage, searchCondition, setSearchCondition } = useQnaPageStore();
    const [searchType, setSearchType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // 초기값 설정
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
    }, []);

    // QnA 목록 조회
    const { qnas = [], totalCount = 0, isLoading, isError } = useQnaListGetQuery(page, PAGE_SIZE, searchCondition);

    // 카테고리 목록 (추후 API로 대체 가능)
    const categories = ['전체', '약초', '레시피', '효능', '부작용', '재배', '기타'];    // 검색 필터링 - 서버에서 처리하도록 수정
    const filteredItems = qnas || [];

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

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

        setSearchCondition(newCondition);
        setPage(0); // 검색 시 첫 페이지로 이동
    };

    // 검색 초기화
    const handleResetSearch = () => {
        setSearchQuery('');
        setSearchType('');
        setFromDate('');
        setToDate('');
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
        navigate('/community/qnas/create');
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1200px] w-full mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Q&A 게시판</h1>
                    <p className="text-gray-600">약초 관련 질문과 답변을 공유하는 공간입니다.</p>
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
                    handleCreateQna={handleCreateQna}
                />

                {/* 카테고리 필터 */}
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                {/* 에러 상태 처리 */}
                {isError && <ErrorComponent />}

                {/* Q&A 목록 */}
                <QnaList
                    isLoading={isLoading}
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
        </div>
    );
};
