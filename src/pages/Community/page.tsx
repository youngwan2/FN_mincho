import { useState } from "react";
import CommunityHeader from "./components/CommunityHeader";
import CommunitySidebar from "./components/CommunitySidebar";
import CommunityPost from "./components/CommunityPost";
import CommunityBody from "./components/CommunityBody";
import Pagination from "../../components/pagination/Pagination";
import { usePostsGetQuery, usePostStatisticsGetQuery } from "../../hooks/queries/useQueryPosts";
import { PostFetchState, PostStatistics } from "../../types/post.types";
import { usePostPageStore } from "@/store/store";


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
        <section className="min-h-screen w-full">
            <div className="mx-auto py-6">
                {/* 헤더 */}
                <CommunityHeader onSearch={onSearch} onClick={onCategoryHandler} categoryInfos={categoryInfos} activeCategoryId={activeCategoryId} />

                {/* 게시판 컨테이너 */}
                <CommunityBody>
                    {/* 카테고리 사이드바 */}
                    <CommunitySidebar activeCategoryId={activeCategoryId} categoryInfos={categoryInfos} totalItemCount={totalCount} onClick={onCategoryHandler} />

                    <div className="flex flex-col w-full bg-white rounded-lg shadow-sm overflow-hidden py-3 min-h-screen ">
                        {/* 게시판 내용 */}
                        <CommunityPost postFetchState={postFetchState} activeCategoryId={activeCategoryId} categoryInfos={categoryInfos} posts={posts} itemCount={itemCount} />
                        {/* 페이지네이션 */}
                        <Pagination perPage={perPage} onPageChange={onPageChange} totalPage={totalPage} />
                    </div>
                </CommunityBody>
            </div>
        </section>
    )
}


// 선택된 아이템 개수 계산
function calculateItemCount(categoryInfos: PostStatistics[], activeCategoryId: number) {
    const filteredCategory = categoryInfos.filter(categoryInfo => {
        return categoryInfo.id === activeCategoryId
    })
    return filteredCategory[0]?.count
}


