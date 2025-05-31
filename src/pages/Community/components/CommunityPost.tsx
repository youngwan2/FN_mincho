import { useNavigate } from "react-router";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Post, PostFetchState, PostStatistics } from "../../../types/post.types";
import CommunityPostList from "./CommunityPostList";
import useAuth from "../../../hooks/useAuth";


interface CommunityPostProps {
    activeCategoryId: number
    categoryInfos: PostStatistics[]
    posts: Post[]
    postFetchState: PostFetchState
    itemCount: number
}



export default function CommunityPost({ activeCategoryId, categoryInfos, posts, postFetchState }: CommunityPostProps) {

    const navigate = useNavigate();

    const isLogin = useAuth();
    const categoryInfo = categoryInfos.find(category => category.id === activeCategoryId);
    const categoryName = categoryInfo?.name
    const postCount = categoryInfo?.count || 0

    return (
        <div className="flex-1  ">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="font-semibold text-2xl">
                    {categoryName}
                    <span>{`(${postCount})`}</span>
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