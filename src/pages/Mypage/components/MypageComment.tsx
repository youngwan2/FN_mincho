import { useState } from "react";
import { useCommentsByUserGetQuery } from "../../../hooks/queries/useQueryComments";
import Pagination from "../../../components/pagination/Pagination";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";

interface MypageCommentProps {
  enabled: boolean;
  totalCount: number;
}

const PAGE_SIZE = 5;

export default function MypageComment({ enabled, totalCount }: MypageCommentProps) {
  const [page, setPage] = useState(0);

  const { comments, isLoading, isError } = useCommentsByUserGetQuery(page, PAGE_SIZE, enabled);

  // 로딩 중 처리
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 에러 발생 시 처리
  if (isError) {
    return <p className="text-center text-xl text-red-500 p-10">댓글을 불러오는 데 오류가 발생했습니다.</p>;
  }

  // 데이터가 없을 때 처리
  if (comments.length === 0) {
    return <p className="text-center text-xl text-gray-500 p-10">댓글이 없습니다.</p>;
  }

  return (
    <div className="bg-gray-50 rounded-lg">
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          className={`p-4 flex justify-between items-center min-h-[150px] ${index < comments.length - 1 ? "border-b border-gray-200" : ""}`}
        >
          {/* 콘텐츠 정보 */}
          <div>
            <h3 className="text-2xl font-medium text-gray-800">{comment.contents}</h3>
            <p className="text-xl text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
      <Pagination
        perPage={PAGE_SIZE}
        totalPage={Math.ceil(totalCount / PAGE_SIZE)}
        onPageChange={({ selected }: { selected: number }) => setPage(selected)}
      />
    </div>
  );
}
