import { Link } from "react-router"
import { EmptyItemMessageCard } from "@/components/card/ErrorMessageCard"
import { Post, PostFetchState } from "@/types/post.types"
import Skeleton from 'react-loading-skeleton'
import { getPostCategoryColorByType } from "@/utils/format"
import { Badge } from "@/components/ui/badge"

interface CommunityPostListProps {
    posts: Post[]
    postFetchState: PostFetchState
}

export default function CommunityPostList({ posts, postFetchState }: CommunityPostListProps) {
    const { isError, isLoading } = postFetchState

    // 로딩 스켈레톤 렌더링 함수
    const renderSkeletonItems = () => {
        return Array(5).fill(0).map((_, index) => (
            <li key={`skeleton-${index}`} className="flex items-center p-4 border-b border-gray-100">
                {/* 카테고리 스켈레톤 */}
                <div className="min-w-24 mr-4">
                    <Skeleton width={80} height={32} borderRadius={20} />
                </div>

                {/* 타이틀 스켈레톤 */}
                <div className="flex-1">
                    <div className="font-medium mb-1">
                        <Skeleton width="80%" height={24} />
                    </div>
                    <div className="flex text-xl text-gray-500">
                        <div className="mr-3">
                            <Skeleton width={80} height={20} />
                        </div>
                        <div className="mr-3">
                            <Skeleton width={120} height={20} />
                        </div>
                    </div>
                </div>

                {/* 조회수/추천 스켈레톤 */}
                <div className="text-center min-w-16">
                    <Skeleton width={60} height={20} />
                </div>
            </li>
        ))
    }

    return (
        <ul className="relative min-h-104">
            {isLoading
                ? renderSkeletonItems()
                : isError
                    ? <li><EmptyItemMessageCard /></li>
                    : posts.map((post) => (
                        <li key={post.id} className="relative flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-3 p-4 border-b border-gray-100 hover:bg-gray-50">

                            {/* 카테고리 */}
                            <div className={`
                                min-w-24 mr-4 px-3 py-1 rounded-full text-center text-xl text-white
                             ${getPostCategoryColorByType(post.category.type) || 'bg-gray-400'}
                            `}>
                                {post.category.name}
                            </div>

                            {/* 타이틀 */}
                            <div className="flex-1">
                                <Link to={`/community/posts/${post.id}`}>
                                    <div className="font-medium mb-1 hover:text-[#05D182] cursor-pointer flex">
                                        <span className="p-1 px-2 bg-gray-200 rounded-xl mr-2 text-xl">{post.id}</span>
                                        <p>{post.title}</p>
                                        {post.newPost ?
                                            <Badge className="bg-green-100 text-green-800 text-xl ml-2 animate-pulse" variant="destructive">
                                                새글
                                            </Badge>
                                            : null}
                                        {post.isMine ?
                                            <Badge className="bg-green-100 text-green-800 text-xl ml-2 animate-pulse" variant="destructive">
                                                내글
                                            </Badge>
                                            : null}
                                    </div>
                                    <div className="flex text-xl text-gray-500 md:pl-15 pl-1 md:mt-0 mt-3">
                                        <div className="mr-3">{post.nickname || '익명'}</div>
                                        <div className="mr-3">{post.createdAt ? new Date(post.createdAt).toLocaleString() : null}</div>
                                    </div>
                                </Link>
                            </div>

                            {/* 조회수/추천 */}
                            <div className="text-center min-w-16 md:static absolute right-0 ">
                                <div className="text-xl text-gray-500">조회 {post.viewCount}</div>
                                <div className="text-xl text-gray-500">추천 {post.likeCount}</div>
                            </div>
                        </li>
                    ))
            }
        </ul>
    )
}
