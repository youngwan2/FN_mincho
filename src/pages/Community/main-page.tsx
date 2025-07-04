import { useState } from "react";
import CommunityHeader from "./components/main/CommunityHeader";
import CommunitySidebar from "./components/main/CommunitySidebar";
import CommunityPost from "./components/main/CommunityPost";
import CommunityBody from "./components/main/CommunityBody";
import Pagination from "../../components/pagination/Pagination";
import { usePostsGetQuery, usePostStatisticsGetQuery } from "../../hooks/queries/useQueryPosts";
import { PostFetchState, PostStatistics } from "../../types/post.types";
import { usePostPageStore } from "@/store/store";
import SearchForm from "./components/main/SearchForm";


const pageSize = 25
export default function CommunityPage() {
    const [query, setQuery] = useState({
        type: 'content',
        value: ''
    })

    const { page: currentPage, setPage: setCurrentPage } = usePostPageStore();
    const [activeCategoryId, setActiveCategoryId] = useState(0);


    const { categoryInfos } = usePostStatisticsGetQuery(currentPage, pageSize)
    const conditions = {
        order: 'desc',
        sort: 'post_id',
        categoryId: activeCategoryId,
        queryType: query.type,
        query: query.value
    }
    const { posts, totalCount, isError, isLoading, status } = usePostsGetQuery(currentPage, pageSize, conditions)

    const postFetchState: PostFetchState = {
        isError,
        isLoading,
        status
    }


    // 페이지네이션 메타데이터
    const itemCount = calculateItemCount(categoryInfos, activeCategoryId)
    const perPage = pageSize;
    const totalPage = Math.ceil(itemCount / perPage) // 카테고리별 토탈 페이지


    // 카테고리 선택 함수 
    const onCategoryHandler = (categoryId: number) => {
        setActiveCategoryId(categoryId)

    }

    // 검색 함수
    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const type = formData.get("type")?.toString() ?? ''
        const query = formData.get("query")?.toString() ?? ''

        setQuery(prev => ({
            ...prev,
            type: type,
            value: query
        }))
    }

    // 페이지 변경 함수
    const onPageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)

    }
    return (
        <section className="min-h-1/3 w-full px-4 md:px-10 lg:px-12 pb-10 animate-fade-down ">
            <div className="mx-auto py-6">
                {/* 헤더 */}
                <CommunityHeader />

                {/* 게시판 컨테이너 */}
                <CommunityBody className="mt-12">
                    {/* 카테고리 사이드바 */}
                    <CommunitySidebar activeCategoryId={activeCategoryId} categoryInfos={categoryInfos} totalItemCount={totalCount} onClick={onCategoryHandler} />


                    <div className="flex flex-col w-full gap-4 items-stretch overflow-hidden min-h-1/4 h-full ">
                        {/* 검색 폼 */}
                        <SearchForm onSearch={onSearch} />

                        {/* 게시판 내용 */}
                        <CommunityPost postFetchState={postFetchState} posts={posts} itemCount={itemCount} />

                        {/* 페이지네이션 */}
                        {itemCount > 0 &&
                            <Pagination perPage={perPage} onPageChange={onPageChange} totalPage={totalPage} />
                        }
                    </div>
                </CommunityBody>
            </div>
        </section>
    )
}


// 선택된 아이템 개수 계산
function calculateItemCount(categoryInfos: PostStatistics[], activeCategoryId: number) {

    // 전체 카테고리 선택 시 모든 카테고리의 합계 반환
    if (activeCategoryId === 0) {

        return categoryInfos.reduce((total, categoryInfo) => total + categoryInfo.count, 0);
    }

    const filteredCategory = categoryInfos.filter(categoryInfo => {
        return categoryInfo.id === activeCategoryId
    })
    return filteredCategory[0]?.count
}


