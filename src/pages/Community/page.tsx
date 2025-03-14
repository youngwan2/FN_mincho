import { useState } from "react";
import CommunityHeader from "./components/CommunityHeader";
import CommunitySidebar from "./components/CommunitySidebar";
import CommunityPost from "./components/CommunityPost";
import CommunityBody from "./components/CommunityBody";
import { usePostsGetQuery, usePostStatisticsGetQuery } from "../../hooks/queries/useQueryPosts";
import { PostFetchState } from "../../types/post.types";

const pageSize = 10
export default function CommunityPage() {

    const [page, setPage] = useState(0);
    // 현재 선택된 카테고리 상태
    const [activeCategory, setActiveCategory] = useState<string>('free');


    const { categoryInfos } = usePostStatisticsGetQuery(page, pageSize)
    const conditions = {
        orderBy: 'asc',
        category: activeCategory

    }
    const { posts, isError, isLoading, status } = usePostsGetQuery(page, pageSize, conditions)

    const postFetchState:PostFetchState = {
        isError,
        isLoading,
        status
    }

    const onCategoryHandler = (categoryId: string) => {
        setActiveCategory(categoryId)

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

                    {/* 게시판 내용 */}
                    <CommunityPost postFetchState={postFetchState} activeCategory={activeCategory} categoryInfos={categoryInfos} posts={posts} />
                </CommunityBody>
            </div>
        </div>
    )
}