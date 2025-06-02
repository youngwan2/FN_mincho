import { useState } from "react";
import { useUserQnaListGetQuery } from "@/hooks/queries/useQueryQna";
import { Link, useParams } from "react-router";

import Skeleton from "react-loading-skeleton";
import Pagination from "@/components/pagination/Pagination";

import { Card, CardHeader } from "@/components/ui/card";


const size = 20;
export default function UserQna() {
    const [page, setPage] = useState(0);
    const { userId } = useParams();
    const { qnas, totalCount, isLoading, isError } = useUserQnaListGetQuery(Number(userId) || -999, page, size);

    console.log(qnas, totalCount)

    if (isLoading) {
        return (
            <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-sm border-green-100 shadow-sm rounded p-6">
                        <div className="flex flex-row items-center justify-between mb-2">
                            <Skeleton width={120} height={28} className="rounded mb-2" />
                        </div>
                        <Skeleton count={2} height={18} className="mb-2" />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-8 text-center text-red-500">
                QnA를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    if (!qnas || qnas.length === 0) {
        return (
            <div className="py-8 text-center text-gray-400">
                작성한 QnA가 없습니다.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {qnas.map((qna: any) => (
                <Card key={qna.id} className="bg-white/80 backdrop-blur-sm border-green-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <Link to={`/community/qna/${qna.id}`} className="font-semibold text-gray-800 py-1 text-lg">
                                {qna.title || qna.subject || "제목 없음"}
                            </Link>
                            <div className="text-gray-500 text-sm line-clamp-2">
                                {qna.content || qna.body || "내용 없음"}
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