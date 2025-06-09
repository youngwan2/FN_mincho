import Pagination from "@/components/pagination/Pagination";
import { usePostsGetQuery } from "@/hooks/queries/useQueryPosts";
import { usePostPageStore } from "@/store/store";
import { Link, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { Post } from "@/types/post.types";
import { FaRegEye, FaRegThumbsUp } from "react-icons/fa6";
import { getPostCategoryColorByType } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import CustomTimeAgo from "@/components/vender/timeago/CustomTimeAgo";
import { FiVideo } from "react-icons/fi";
import { MdQuestionAnswer } from "react-icons/md";

const size = 25;
export default function RelatedPostList() {
    const { page, setPage } = usePostPageStore();
    const { postId } = useParams();

    const conditions = {
        order: 'desc',
        sort: 'post_id',
        categoryId: 0,
        queryType: '',
        query: ''

    }


    const { posts, totalCount, isError, isLoading } = usePostsGetQuery(page, size, conditions);


    function onPageChange(newPage: number) {
        setPage(newPage);
    }


    if (isLoading) {
        return (
            <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="bg-white/80 border-green-100 shadow-sm rounded p-6">
                        <div className="flex flex-row items-center justify-between mb-2">
                            <div className="flex items-center gap-4">
                                <Skeleton width={64} height={24} className="rounded" />
                                <Skeleton width={180} height={24} />
                            </div>
                            <Skeleton width={24} height={24} circle />
                        </div>
                        <Skeleton height={18} className="mb-2" />
                        <Skeleton height={18} width={"75%"} />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return <div className="py-8 text-center text-red-500">게시글을 불러오는 중 오류가 발생했습니다.</div>;
    }

    if (!posts || posts.length === 0) {
        return <div className="py-8 text-center text-gray-400">게시글이 없습니다.</div>;
    }

    return (
        <div className="space-y-6 rounded-xl mt-20 animate-fade-up animate-delay-300">
            <h2 className="font-bold mb-10 text-2xl animate-fade-left text-gray-600 bg-gray-100 rounded-md flex items-center gap-2 px-1 py-3">
                <MdQuestionAnswer />
                총 {`${totalCount} 개의 게시글이 있습니다.`}
            </h2>
            <div className="mb-10 flex flex-col items-stretch gap-3">
                {posts.map((post: Post, index: number) => {
                    const isCurrent = String(post.id) === String(postId);
                    return (
                        <div
                            key={post.id}
                            className={
                                `border rounded-lg bg-white p-5 ${isCurrent ? 'shadow-[0_0_0_1px_#00C471]' : ''} transition-colors relative animate-fade-up`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {isCurrent && <span className="flex bg-hover-primary-green absolute text-white rounded-full p-2 -left-5 -top-5"><FiVideo /></span>}
                            <div className="flex flex-col items-stretch gap-4">
                                <div className="flex justify-between items-center">
                                    <span className={"border text-xl p-1 px-1.5 rounded-md " + getPostCategoryColorByType(post.category.type)}>
                                        {post.category?.name ?? '카테고리'}
                                    </span>
                                    <span className={"text-xl text-gray-400"}>
                                        <CustomTimeAgo date={post.createdAt} />
                                    </span>
                                </div>

                                <Link
                                    to={`/community/posts/${post.id}`}
                                    className={" text-gray-800 py-1 hover:underline text-2xl "}
                                >
                                    {post.title ?? '제목 없음'}{post.newPost ?
                                        <Badge className="bg-green-100 text-green-800 text-xl ml-2 animate-pulse" variant="destructive">
                                            새글
                                        </Badge> : null}
                                </Link>

                            </div>
                            <div className={"text-gray-500 text-xl line-clamp-2 flex gap-6 items-center justify-between"}>
                                <div>
                                    <span className="text-xl text-gray-400">{post.author?.nickname ?? post.nickname ?? '익명'}</span>

                                </div>
                                {/* 댓글/조회/좋아요 카운트 */}
                                <div className="flex gap-2 items-center">
                                    <span className="flex items-center gap-1"><FaRegEye className="text-2xl" /> {post.viewCount}</span>
                                    <span className="flex items-center gap-1"><FaRegThumbsUp className="text-2xl" /> {post.likeCount}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {totalCount > size && (
                <div className="animate-fade-up animate-delay-300">
                    <Pagination perPage={size} onPageChange={onPageChange} totalPage={Math.ceil(totalCount / size)} />
                </div>
            )}

        </div >
    )
}