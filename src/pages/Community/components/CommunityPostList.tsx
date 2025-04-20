import { Link } from "react-router"
import { EmptyItemMessageCard } from "../../../components/card/ErrorMessageCard"
import { Post, PostFetchState } from "../../../types/post.types"
import Skeleton from 'react-loading-skeleton'

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
                        <li key={post.id} className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50">

                            {/* 카테고리 */}
                            <div className={`
                            min-w-24 mr-4 px-3 py-1 rounded-full text-center text-xl text-white
                            ${post.category === 'notice' ? 'bg-red-500' : ''}
                            ${post.category === 'info' ? 'bg-[#05D182]' : ''}
                            ${post.category === 'free' ? 'bg-blue-500' : ''}
                            ${post.category === 'question' ? 'bg-yellow-500' : ''}
                            `}>
                                {post.category}
                            </div>

                            {/* 타이틀 */}
                            <div className="flex-1">
                                <Link to={`/community/${post.id}`}>
                                    <div className="font-medium mb-1 hover:text-[#05D182] cursor-pointer">
                                        {post.title}
                                    </div>
                                    <div className="flex text-xl text-gray-500">
                                        <div className="mr-3">{post.author?.nickname}</div>
                                        <div className="mr-3">{post.createdAt}</div>
                                        {/* <div className="text-[#05D182] font-medium">댓글 {post.commentCount}</div> */}
                                    </div>
                                </Link>
                            </div>

                            {/* 조회수/추천 */}
                            <div className="text-center min-w-16">
                                {/* <div className="text-xl text-gray-500">조회 {post.viewCount}</div> */}
                                <div className="text-xl text-gray-500">추천 {post.likeCount}</div>
                            </div>
                        </li>
                    ))
            }
        </ul>
    )
}