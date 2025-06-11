import { useState } from "react";
import { useUserQnaListGetQuery } from "@/hooks/queries/useQueryQna";
import { Link, useParams } from "react-router";

import Skeleton from "react-loading-skeleton";
import Pagination from "@/components/pagination/Pagination";
import CustomTimeAgo from "@/components/vender/timeago/CustomTimeAgo";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DOMPurify from 'dompurify';
import { FaClock } from "react-icons/fa";
import { QnaSummary } from "@/types/qna.types";


const size = 20;
export default function UserQna() {
    const [page, setPage] = useState(0);
    const { userId } = useParams();
    const { qnas, totalCount, isLoading, isError } = useUserQnaListGetQuery(Number(userId) || -999, page, size);

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
            <p className="text-gray-700 bg-gray-100 rounded-lg p-1 pl-3">총 {totalCount} 개의 질문이 있습니다.</p>
            {qnas.map((qna: QnaSummary) => (
                <Card key={qna.id} className="border">
                    <CardHeader className="w-full relative ">
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex gap-2 flex-col items-start space-y-2">
                                <div className="flex items-center justify-between w-full">
                                    <Badge className="bg-green-100 text-green-700 text-2xl" variant="secondary">
                                        QnA
                                    </Badge>
                                    <div className="flex items-center gap-1 text-gray-400 absolute right-5 text-2xl">
                                        <FaClock className="text-gray-400" />
                                        <CustomTimeAgo className="text-gray-500" date={qna.createdAt} />
                                    </div>
                                </div>
                                <Link to={`/community/qnas/${qna.id}`} className="py-1  space-y-3">
                                    <h3 className="text-gray-700 text-3xl font-semibold">{qna.title}</h3>
                                    <p className="w-full mt-2 text-gray-600 h-auto text-2xl" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(qna.content) }}>

                                    </p>
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