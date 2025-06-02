import Pagination from "@/components/pagination/Pagination";
import { usePostsGetQuery } from "@/hooks/queries/useQueryPosts";
import { usePostPageStore } from "@/store/store";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { Post } from "@/types/post.types";
import { FaRegEye, FaRegThumbsUp } from "react-icons/fa6";
import { getPostCategoryColorByType } from "@/utils/format";

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
        <div className="space-y-6 border rounded-xl p-5 mt-10 ">
            <h2 className="font-bold mb-10">총 {`${totalCount} 개의 게시글이 있습니다.`}</h2>
            <div className="mb-10">
                {posts.map((post: Post) => {
                    const isCurrent = String(post.id) === String(postId);
                    return (
                        <div
                            key={post.id}
                            className={

                                `border-gray-300 border-b-1 py-5 ${isCurrent ? 'font-semibold' : ''} transition-colors`}
                        >
                            <div className="flex flex-row items-center justify-between mb-2">
                                <div className="flex items-center gap-4">
                                    <span className={"text-gary-700 font-semibold text-xl p-1 px-1.5 rounded-md " + getPostCategoryColorByType(post.category.type)}>
                                        {post.category?.name ?? '카테고리'}
                                    </span>

                                    <a
                                        href={`/community/posts/${post.id}`}
                                        className={" text-gray-800 py-1 hover:underline text-2xl "}
                                    >
                                        {post.title ?? '제목 없음'}
                                    </a>
                                    <span className="text-xl text-gray-400 ml-2">by {post.author?.nickname ?? post.nickname ?? '익명'}</span>
                                </div>
                                <span className={"text-xl text-gray-400"}>
                                    {post.createdAt?.slice(0, 10) ?? ''}
                                </span>
                            </div>
                            <div className={"text-gray-500 text-xl line-clamp-2 flex gap-6 items-center"}>
                                {/* 댓글/조회/좋아요 카운트 */}
                                <span className="flex items-center gap-1"><FaRegEye className="text-2xl" /> {post.viewCount}</span>
                                <span className="flex items-center gap-1"><FaRegThumbsUp className="text-2xl" /> {post.likeCount}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            {totalCount > size && <Pagination perPage={size} onPageChange={onPageChange} totalPage={Math.ceil(totalCount / size)} />}

        </div>
    )
}