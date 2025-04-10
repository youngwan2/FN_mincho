import { useState } from "react";
import { useCommentsByUserGetQuery } from "../../../hooks/queries/useQueryComments";
import Pagination from "../../../components/pagination/Pagination";

interface MypageCommentProps {
  enabled: boolean
  totalCount: number
}


const PAGE_SIZE = 5;
export default function MypageComment({ enabled, totalCount }: MypageCommentProps) {

  const [page, setPage] = useState(0)

  const { comments, isLoading, isError } = useCommentsByUserGetQuery(page, PAGE_SIZE, enabled)


  // TODO: 로딩 스피너 추가해야 함
  return (
    <div className="bg-gray-50 rounded-lg">
      {comments.map((comment, index) => {
        return (
          <div
            key={comment.id}
            className={`p-4 flex justify-between items-center ${index < comments.length - 1 ? "border-b border-gray-200" : ""
              }`}
          >
            {/* 콘텐츠 정보 */}
            <div>
              <h3 className="text-2xl font-medium text-gray-800">{comment.contents}</h3>
              <p className="text-xl text-gray-500">{comment.createdAt}</p>
            </div>
          </div>)
      })}
      <Pagination perPage={PAGE_SIZE} onPageChange={({ selected }: { selected: number }) => setPage(selected)} totalPage={Math.ceil(totalCount / PAGE_SIZE)} />
    </div>
  )
}