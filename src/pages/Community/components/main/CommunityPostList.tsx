import { Link } from "react-router"
import { EmptyItemMessageCard } from "@/components/card/ErrorMessageCard"
import { Post, PostFetchState } from "@/types/post.types"
import Skeleton from 'react-loading-skeleton'
import { getPostCategoryColorByType } from "@/utils/format"
import { Badge } from "@/components/ui/badge"
import { FiClock, FiEye, FiUser } from "react-icons/fi"
import CustomTimeAgo from "@/components/vender/timeago/CustomTimeAgo"
import { FaThumbsUp } from "react-icons/fa6"

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
        <ul className="relative min-h-104 flex flex-col gap-3 w-full ">
            {isLoading
                ? renderSkeletonItems()
                : isError
                    ? <li><EmptyItemMessageCard /></li>
                    : posts.map((post) => (
                        <li key={post.id} className="relative flex flex-col items-stretch gap-3 p-8 border hover:bg-gray-50 rounded-lg bg-white ">

                            {/* 카테고리 */}
                            <div className="flex justify-between items-center">
                                <span className={`
                                min-w-24 mr-4 px-3 py-1 rounded-full text-xl font-semibold
                             ${getPostCategoryColorByType(post.category.type)}
                            `}>
                                    {post.category.name}
                                </span>
                                <div className="flex gap-2 items-center text-gray-500 text-xl">
                                    <FiClock />
                                    <CustomTimeAgo date={post.createdAt} />
                                </div>
                            </div>

                            {/* 타이틀 */}
                            <div>
                                <Link to={`/community/posts/${post.id}`}>
                                    <div className="font-medium mb-1 hover:text-gray-700 cursor-pointer flex mt-3">
                                        <strong className="text-3xl">{post.title}</strong>
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
                                    <div className="flex justify-between mt-3">
                                        <div className="flex items-center text-2xl text-gray-500 pl-1 md:mt-0 mt-3">
                                            <FiUser /> <div className="mr-3">{post.author.nickname || '익명'}</div>
                                        </div>

                                        {/* 조회수/추천 */}

                                        <div className="flex items-center gap-4 text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <FiEye size={20} />
                                                <span className='text-2xl'>{post.viewCount || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaThumbsUp size={20} />
                                                <span className='text-2xl'>{post.likeCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </li>
                    ))
            }
        </ul>
    )
}
