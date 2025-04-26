import { useState } from "react"
import { useHerbBookmarkGetQuery } from "../../../hooks/queries/useQueryHerbBookmark";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router";
import Pagination from "../../../components/pagination/Pagination";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";

interface MypageFavoriteHerbProps {
  enabled: boolean
  totalCount: number
}

const PAGE_SIZE = 5;

export default function MypageFavoriteHerb({ enabled, totalCount }: MypageFavoriteHerbProps) {

  const [page, setPage] = useState(0)

  const { bookmarkInfo, isLoading, isError } = useHerbBookmarkGetQuery(page, PAGE_SIZE, enabled)

  // 로딩 상태 처리
  if (isLoading) {
    return <LoadingSpinner />
  }

  // 에러 상태 처리
  if (isError) {
    return <p className="text-center text-xl text-red-500 p-10">데이터를 불러오는 데 오류가 발생했습니다.</p>
  }

  // 데이터가 없을 때 처리
  if (bookmarkInfo.bookmarks.length === 0) {
    return <p className="text-center text-xl text-gray-500 p-10">관심 약초가 없습니다.</p>;
  }

  return (
    <div className="bg-gray-50 rounded-lg">
      {/* 데이터가 없을 때 처리 */}
      {bookmarkInfo.bookmarks.map((bookmark, index) => (
        <div
          key={bookmark.id}
          className={`p-4 flex justify-between items-center min-h-[150px] ${index < bookmarkInfo.bookmarks.length - 1 ? "border-b border-gray-200" : ""}`}
        >
          {/* 콘텐츠 정보 */}
          <div>
            <span className="text-xl text-gray-500">{bookmark.bneNm}</span>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-medium text-gray-800">{bookmark.cntntsSj}</h3>
              <p className="text-xl text-gray-600">{bookmark.hbdcNm}</p>
            </div>
            <p className="text-xl text-gray-500">{new Date(bookmark.createdAt).toLocaleString()}</p>
          </div>
          {/* 바로가기 아이콘 */}
          <Link title="콘텐츠 바로가기" className="flex items-center gap-3 hover:text-hover-primary-green" to={bookmark.url}><IoEye />보기</Link>
        </div>
      ))
      }
      <Pagination perPage={PAGE_SIZE} onPageChange={({ selected }: { selected: number }) => setPage(selected)} totalPage={Math.ceil(totalCount / PAGE_SIZE)} />
    </div>
  )
}
