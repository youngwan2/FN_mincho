import { useState } from "react";
import { Link, useParams } from "react-router";
import { usePostsByUserIdGetQuery } from "@/hooks/queries/useQueryPosts";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

import Skeleton from "react-loading-skeleton";
import Pagination from "@/components/pagination/Pagination";
import CustomTimeAgo from "@/components/vender/timeago/CustomTimeAgo";
import { FaClock } from "react-icons/fa";

import { getPostCategoryColorByType } from "@/utils/format";



const size = 20;
export default function UserPost() {
    const [page, setPage] = useState(0);
    const { userId } = useParams();
    const { posts, totalCount, isError, isLoading } = usePostsByUserIdGetQuery(Number(userId) || -999, page, size);

    // 로딩 상태 스켈레톤 UI
    if (isLoading) {
        return (
            <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="border rounded-lg p-3">
                        <div className="flex flex-row items-center justify-between mb-2">
                            <div className="flex items-center gap-4">
                                <Skeleton width={60} height={28} className="rounded" />
                                <Skeleton width={180} height={24} />
                            </div>
                            <Skeleton width={24} height={24} circle />
                        </div>
                        <Skeleton count={2} height={18} className="mb-2" />
                    </div>
                ))}
            </div>
        );
    }

    // 에러 상태
    if (isError) {
        return (
            <div className="py-8 text-center text-red-500">
                게시글을 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    // 데이터 없음
    if (!posts || posts.length === 0) {
        return (
            <div className="py-8 text-center text-gray-400">
                작성한 게시글이 없습니다.
            </div>
        );
    }

    // 정상 렌더링 + 페이지네이션
    return (
        <div className="space-y-6">
            <p className="text-gray-700 bg-gray-100 rounded-lg p-1 pl-3">총 {totalCount} 개의 게시글이 있습니다.</p>
            {posts.map((post) => (
                <Card
                    key={post.id}
                    className="border"
                >
                    <CardHeader className="w-full relative">
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex gap-2 flex-col items-start space-y-2">
                                <div className="flex items-center justify-between w-full">
                                    <Badge className={getPostCategoryColorByType(post.category?.type) + " text-2xl"} variant="secondary">
                                        {post.category?.name || "카테고리 없음"}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-gray-400 absolute right-5 text-2xl">
                                        <FaClock className="text-gray-400" />
                                        <CustomTimeAgo className="text-gray-500" date={post.createdAt} />
                                    </div>
                                </div>
                                <Link to={"/community/posts/" + post.id} className="py-1 space-y-3">
                                    <h3 className="text-gray-700 text-3xl font-semibold">{post.title}</h3>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            ))}
            {(totalCount ?? 0) > size && (
                <Pagination
                    totalPage={Math.ceil((totalCount || 0) / size)}
                    onPageChange={(selectedObj: { selected: number }) => setPage(selectedObj.selected)}
                    perPage={5}
                />
            )}
        </div>
    );
}


