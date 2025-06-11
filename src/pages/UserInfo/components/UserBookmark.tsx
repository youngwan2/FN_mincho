import { useState } from "react";
import { Link, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { FaSeedling, FaClock, FaBookmark } from "react-icons/fa";

import Pagination from "@/components/pagination/Pagination";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CustomTimeAgo from "@/components/vender/timeago/CustomTimeAgo";

import { useUserHerbBookmarkGetQuery } from "@/hooks/queries/useQueryHerbBookmark";
import { Bookmark } from "@/types/bookmark.types";

const size = 20;
export default function UserBookmark() {
    const [page, setPage] = useState(0);
    const { userId } = useParams();

    const { bookmarkInfo, isLoading, isError } = useUserHerbBookmarkGetQuery(Number(userId) || -999, page, size);
    const bookmarks = bookmarkInfo?.bookmarks || [];
    const totalCount = bookmarkInfo?.count || 0;

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
                북마크를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    // 데이터 없음
    if (!bookmarks || bookmarks.length === 0) {
        return (
            <div className="py-8 text-center text-gray-400">
                저장한 북마크가 없습니다.
            </div>
        );
    }

    // 정상 렌더링 + 페이지네이션
    return (
        <div className="space-y-6">
            <p className="text-gray-700 bg-gray-100 rounded-lg p-1 pl-3">총 {totalCount} 개의 북마크가 있습니다.</p>
            {bookmarks.map((bookmark: Bookmark) => (
                <Card
                    key={bookmark.id}
                    className="border"
                >
                    <CardHeader className="w-full relative">
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex gap-2 flex-col items-start space-y-2 flex-grow">
                                <div className="flex items-center justify-between w-full">
                                    <Badge className="bg-green-100 text-green-800 text-2xl flex items-center gap-1" variant="secondary">
                                        <FaSeedling /> {bookmark.bneNm || '식물'}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-gray-400 absolute right-5 text-2xl">
                                        <FaClock className="text-gray-400" />
                                        <CustomTimeAgo className="text-gray-500" date={bookmark.createdAt} />
                                    </div>
                                </div>

                                <Link to={bookmark.url || "#"} className="py-1 space-y-3">
                                    <h3 className="text-gray-700 text-3xl font-semibold">
                                        {bookmark.cntntsSj || bookmark.hbdcNm || '북마크 항목'}
                                    </h3>
                                </Link>

                                <div className="flex justify-end w-full">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="text-green-600 border-green-200 hover:bg-green-50 text-2xl flex items-center gap-2"
                                        onClick={() => window.open(bookmark.url, '_blank')}
                                    >
                                        <FaBookmark className="text-green-600" /> 바로가기
                                    </Button>
                                </div>
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