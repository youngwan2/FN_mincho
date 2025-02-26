// interface MypagePostProps { }

import { useNavigate } from "react-router";
import MypageViewButton from "./MypageViewButton";

export default function MypagePost() {
    const navigate = useNavigate();

    function handleNavigate(path: string) {
        navigate(path)
    }


    const posts: any[] = [
        { id: 1, title: "라벤더 재배 팁", date: "2023-06-01", link: "/posts/1" },
        { id: 2, title: "민트 활용법 공유", date: "2023-05-28" },
        { id: 3, title: "로즈마리 효능에 대해", date: "2023-05-20" },
    ];
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
                        <p className="text-xl text-gray-500">{post.date}</p>
                    </div>
                    {/* 페이지 이동 버튼 */}
                    <MypageViewButton onNavigate={() => handleNavigate("/")} />
                </div>
            ))}
        </div>
    )
}