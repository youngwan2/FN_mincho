import { useNavigate } from "react-router";
import MypageViewButton from "./MypageViewButton";
import { usePostsByUserGetQuery } from "../../../hooks/queries/useQueryPosts";
import { useState } from "react";
import Pagination from "../../../components/pagination/Pagination";


interface MypagePostProps {
    totalCount: number
    enabled: boolean
}

const PAGE_SIZE = 5;
export default function MypagePost({ totalCount, enabled }: MypagePostProps) {
    const navigate = useNavigate();

    const [page, setPage] = useState(0)


    const { posts, isLoading, isError } = usePostsByUserGetQuery(page, PAGE_SIZE, enabled)


    function handleNavigate(path: string) {
        navigate(path)
    }



    // TODO: 로딩 스피너 추가해야 함
    return (
        <div className="bg-gray-50 rounded-lg">
            {posts.map((post, index) => (
                <div
                    key={post.id}
                    className={`p-4 flex justify-between items-center ${index < posts.length - 1 ? "border-b border-gray-200" : ""
                        }`}
                >
                    {/* 콘텐츠 정보 */}
                    <div>
                        <h3 className="text-2xl font-medium text-gray-800">{post.title}</h3>
                        <p className="text-xl text-gray-500">{post.createdAt}</p>
                    </div>
                    {/* 페이지 이동 버튼 */}
                    <MypageViewButton onNavigate={() => handleNavigate("/")} />
                </div>
            ))}
            <Pagination perPage={PAGE_SIZE} totalPage={Math.ceil(totalCount / PAGE_SIZE)} onPageChange={({ selected }: { selected: number }) => setPage(selected)} />
        </div>
    )
}