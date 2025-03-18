import { useState } from "react";
import CommunityHeader from "./components/CommunityHeader";
import CommunitySidebar from "./components/CommunitySidebar";
import CommunityPost from "./components/CommunityPost";
import CommunityBody from "./components/CommunityBody";
import Pagination from "../../components/pagination/Pagination";
import { usePostsGetQuery, usePostStatisticsGetQuery } from "../../hooks/queries/useQueryPosts";
import { PostFetchState, PostStatistics } from "../../types/post.types";


const pageSize = 10
export default function CommunityPage() {

    const [currentPage, setCurrentPage] = useState(0);
    // 현재 선택된 카테고리 상태
    const [activeCategory, setActiveCategory] = useState<string>('free');


    const { categoryInfos } = usePostStatisticsGetQuery(currentPage, pageSize)
    const conditions = {
        orderBy: 'asc',
        category: activeCategory

    }
    const { posts, isError, isLoading, status } = usePostsGetQuery(currentPage, pageSize, conditions)

    const postFetchState: PostFetchState = {
        isError,
        isLoading,
        status
    }

    // 페이지네이션 메타데이터
    const totalItems = calculateTotalItems(categoryInfos)
    const perPage = pageSize;
    const totalPage = Math.ceil(totalItems / perPage)

    // 카테고리 선택 함수 
    const onCategoryHandler = (categoryId: string) => {
        setActiveCategory(categoryId)

    }

    // 페이지 변경 함수
    const onPageChange = ({selected}:{selected:number}) => {
        console.log("이동 페이지:", selected)
        setCurrentPage(selected)

    }
    return (
        <div className="min-h-screen">
            <div className="mx-auto px-4 py-6">
                {/* 헤더 */}
                <CommunityHeader />

                {/* 게시판 컨테이너 */}
                <CommunityBody>
                    {/* 카테고리 사이드바 */}
                    <CommunitySidebar activeCategory={activeCategory} categoryInfos={categoryInfos} onClick={onCategoryHandler} />

                    <div className="flex flex-col w-full bg-white rounded-lg shadow-sm overflow-hidden py-3 ">
                        {/* 게시판 내용 */}
                        <CommunityPost postFetchState={postFetchState} activeCategory={activeCategory} categoryInfos={categoryInfos} posts={posts} />
                        {/* 페이지네이션 */}
                        <Pagination perPage={perPage} onPageChange={onPageChange} totalPage={totalPage} />
                    </div>
                </CommunityBody>
            </div>
        </div>
    )
}


function calculateTotalItems(categoryInfos: PostStatistics[]) {

    let totalItems = 0;
    categoryInfos.forEach(categoryInfo => {
        totalItems += categoryInfo.count
    })

    return totalItems

}