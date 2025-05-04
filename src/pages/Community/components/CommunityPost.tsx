import { useNavigate } from "react-router";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Post, PostFetchState, PostStatistics } from "../../../types/post.types";
import { getCategoryName } from "../../../utils/formatter";
import CommunityPostList from "./CommunityPostList";
import useAuth from "../../../hooks/useAuth";


interface CommunityPostProps {
    activeCategory: string
    categoryInfos: PostStatistics[]
    posts: Post[]
    postFetchState: PostFetchState
    itemCount: number
}



export default function CommunityPost({ activeCategory, categoryInfos, posts, postFetchState, itemCount }: CommunityPostProps) {

    const navigate = useNavigate();

    const isLogin = useAuth();

    return (
        <div className="flex-1  ">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="font-semibold text-2xl">
                    {getCategoryName(categoryInfos, activeCategory)}
                    <span>{`(${itemCount})`}</span>
                </h2>
                {isLogin && <PrimaryButton onClick={() => navigate("/community/write")} type="button" className="bg-[#05D182] text-white px-4 py-2 rounded-md hover:bg-hover-primary-green">
                    글쓰기
                </PrimaryButton>}

            </div>

            {/* 게시글 목록 */}
            <CommunityPostList posts={posts} postFetchState={postFetchState} />
        </div>
    )
}