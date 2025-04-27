import { useNavigate } from "react-router";
import MypageViewButton from "./MypageViewButton";
import { usePostsByUserGetQuery } from "../../../hooks/queries/useQueryPosts";
import { useState } from "react";
import Pagination from "../../../components/pagination/Pagination";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";

interface MypagePostProps {
    totalCount: number;
    enabled: boolean;
}

const PAGE_SIZE = 5;

export default function MypagePost({ totalCount, enabled }: MypagePostProps) {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);

    const { posts, isLoading, isError } = usePostsByUserGetQuery(page, PAGE_SIZE, enabled);

    function handleNavigate(path: string) {
        navigate(path);
    }

    // 로딩 중 처리
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // 에러 발생 시 처리
    if (isError) {
        return <p className="text-center text-xl text-red-500 p-10">데이터를 불러오는 데 오류가 발생했습니다.</p>;
    }

    // 데이터가 없을 때 처리
    if (posts.length === 0) {
        return <p className="text-center text-xl text-gray-500 p-10">작성한 글이 없습니다.</p>;
    }

    return (
        <div className="bg-gray-50 rounded-lg">
            {posts.map((post, index) => (
                <div
                    key={post.id}
                    className={`p-4 flex justify-between items-center min-h-[60px] ${index < posts.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                    {/* 콘텐츠 정보 */}
                    <div>
                        <h3 className="text-2xl font-medium text-gray-800">{post.title}</h3>
                        <p className="text-xl text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                    {/* 페이지 이동 버튼 */}
                    <MypageViewButton onNavigate={() => handleNavigate(`/community/${post.id}`)} />
                </div>
            ))}
            <Pagination perPage={PAGE_SIZE} totalPage={Math.ceil(totalCount / PAGE_SIZE)} onPageChange={({ selected }: { selected: number }) => setPage(selected)} />
        </div>
    );
}
