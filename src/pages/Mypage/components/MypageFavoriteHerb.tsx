import { useState } from "react"
import { useHerbBookmarkGetQuery } from "../../../hooks/queries/useQueryHerbBookmark";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router";
import Pagination from "../../../components/pagination/Pagination";

interface MypageFavoriteHerbProps {
  enabled: boolean
  totalCount: number
}


const PAGE_SIZE = 5;
export default function MypageFavoriteHerb({ enabled, totalCount }: MypageFavoriteHerbProps) {

  const [page, setPage] = useState(0)

  const { bookmarkInfo, isLoading, isError } = useHerbBookmarkGetQuery(page, PAGE_SIZE, enabled)


  return (
    <div className="bg-gray-50 rounded-lg">
      {bookmarkInfo.bookmarks.map((bookmark, index) => (
        <div
          key={bookmark.id}
          className={`p-4 flex justify-between items-center ${index < bookmarkInfo.bookmarks.length - 1 ? "border-b border-gray-200" : ""
            }`}
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
          <Link title="콘텐츠 바로가기" className="flex items-center  gap-3 hover:text-hover-primary-green" to={bookmark.url}><IoEye />보기</Link>
        </div>
      ))}
      <Pagination perPage={PAGE_SIZE} onPageChange={({ selected }: { selected: number }) => setPage(selected)} totalPage={Math.ceil(totalCount / PAGE_SIZE)} />
    </div>
  )
}