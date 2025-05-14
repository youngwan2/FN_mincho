import { useState } from "react";
import CommunityHeader from "./components/CommunityHeader";
import CommunitySidebar from "./components/CommunitySidebar";
import CommunityPost from "./components/CommunityPost";
import CommunityBody from "./components/CommunityBody";
import Pagination from "../../components/pagination/Pagination";
import { usePostsGetQuery, usePostStatisticsGetQuery } from "../../hooks/queries/useQueryPosts";
import { PostFetchState, PostStatistics } from "../../types/post.types";


const pageSize = 25
export default function CommunityPage() {
    const [query, setQuery] = useState({
        type: 'content',
        value: ''
    })
    const [currentPage, setCurrentPage] = useState(0);
    // 현재 선택된 카테고리 상태
    const [activeCategory, setActiveCategory] = useState<string>('all');


    const { categoryInfos } = usePostStatisticsGetQuery(currentPage, pageSize)
    const conditions = {
        order: 'post_id',
        sort: 'desc',
        category: activeCategory,
        queryType: query.type,
        query: query.value

    }
    const { posts, isError, isLoading, status } = usePostsGetQuery(currentPage, pageSize, conditions)

    const postFetchState: PostFetchState = {
        isError,
        isLoading,
        status
    }


    // 페이지네이션 메타데이터
    const itemCount = calculateItemCount(categoryInfos, activeCategory)
    const totalItemCount = calculateTotalItems(categoryInfos)
    const perPage = pageSize;
    const totalPage = Math.ceil(itemCount / perPage) // 카테고리별 토탈 페이지

    // 카테고리 선택 함수 
    const onCategoryHandler = (categoryId: string) => {
        setActiveCategory(categoryId)

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
                <CommunityHeader onSearch={onSearch} onClick={onCategoryHandler} categoryInfos={categoryInfos} activeCategory={activeCategory} totalItemCount={totalItemCount} />

                {/* 게시판 컨테이너 */}
                <CommunityBody>
                    {/* 카테고리 사이드바 */}
                    <CommunitySidebar activeCategory={activeCategory} categoryInfos={categoryInfos} totalItemCount={totalItemCount} onClick={onCategoryHandler} />

                    <div className="flex flex-col w-full bg-white rounded-lg shadow-sm overflow-hidden py-3 min-h-screen ">
                        {/* 게시판 내용 */}
                        <CommunityPost postFetchState={postFetchState} activeCategory={activeCategory} categoryInfos={categoryInfos} posts={posts} itemCount={itemCount} />
                        {/* 페이지네이션 */}
                        <Pagination perPage={perPage} onPageChange={onPageChange} totalPage={totalPage} />
                    </div>
                </CommunityBody>
            </div>
        </section>
    )
}


// 선택된 아이템 개수 계산
function calculateItemCount(categoryInfos: PostStatistics[], activeCategory: string) {
    let totalItems = 0;

    console.log("선택한 카테고리:", activeCategory)

    // 카테고리가 all 이라면 전체 카테고리 아이템의 총 개수 반환
    if (activeCategory.includes("all")) {
        totalItems = categoryInfos.reduce((init, category) => {
            return init += category.count
        }, 0)


        return totalItems;
    }

    // all 이 외 각 카테고리별 총 개수 반환

    const filteredCategory = categoryInfos.filter(categoryInfo => {
        return categoryInfo.category === activeCategory.trim()
    })

    return filteredCategory[0].count


}


// 전체 아이템 개수 계산
function calculateTotalItems(categoryInfos: PostStatistics[]) {
    let totalItems = 0;

    categoryInfos.forEach(categoryInfo => {
        totalItems += categoryInfo.count
    })

    return totalItems

}

