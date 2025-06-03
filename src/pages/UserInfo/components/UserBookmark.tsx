import { useState } from "react";
import { Link, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { FaSeedling } from "react-icons/fa";

import Pagination from "@/components/pagination/Pagination";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
                    <div key={idx} className="bg-white/80 backdrop-blur-sm border-green-100 shadow-sm rounded p-6">
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
            {bookmarks.map((bookmark: Bookmark) => (
                <Card
                    key={bookmark.id}
                    className="bg-white/80 backdrop-blur-sm border-green-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2 flex-col items-start">
                                <Badge className="bg-green-100 text-green-800 text-2xl" variant="secondary">
                                    <FaSeedling className="mr-1" /> {bookmark.bneNm || '식물'}
                                </Badge>
                                <Link to={bookmark.url || "#"} className="font-semibold text-gray-800 py-1 hover:underline">
                                    {bookmark.cntntsSj || bookmark.hbdcNm || '북마크 항목'}
                                </Link>
                                <span className="text-xl text-gray-400">
                                    저장일: {new Date(bookmark.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-green-600 border-green-200 hover:bg-green-50 text-xl"
                            onClick={() => window.open(bookmark.url, '_blank')}
                        >
                            바로가기
                        </Button>
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