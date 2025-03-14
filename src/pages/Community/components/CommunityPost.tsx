interface CommunityPostProps {
    activeCategory: string
    categoryInfos: PostStatistics[]
    posts:Post[]
    postFetchState: PostFetchState
}

import PrimaryButton from "../../../components/button/PrimaryButton";
import { Post, PostFetchState, PostStatistics } from "../../../types/post.types";
import { getCategoryName } from "../../../utils/formatter";
import CommunityPostList from "./CommunityPostList";

export default function CommunityPost({ activeCategory, categoryInfos, posts, postFetchState}: CommunityPostProps) {


    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="font-semibold text-2xl">
                    {getCategoryName(categoryInfos, activeCategory)}
                </h2>
                <PrimaryButton type="button" className="bg-[#05D182] text-white px-4 py-2 rounded-md hover:bg-hover-primary-green">
                    글쓰기
                </PrimaryButton>
            </div>

            {/* 게시글 목록 */}
            <CommunityPostList posts={posts} postFetchState={postFetchState} />

            {/* 페이지네이션 */}
            <div className="flex justify-center my-12">
                <ul className="flex">
                    <li className="mx-1">
                        <a href="#" className="inline-block px-3 py-1 border border-gray-300 rounded-md">
                            &lt;
                        </a>
                    </li>
                    <li className="mx-1">
                        <a href="#" className="inline-block px-3 py-1 border border-gray-300 rounded-md">
                            1
                        </a>
                    </li>
                    <li className="mx-1">
                        <a href="#" className="inline-block px-3 py-1 bg-[#05D182] text-white border border-[#05D182] rounded-md">
                            2
                        </a>
                    </li>
                    <li className="mx-1">
                        <a href="#" className="inline-block px-3 py-1 border border-gray-300 rounded-md">
                            3
                        </a>
                    </li>
                    <li className="mx-1">
                        <a href="#" className="inline-block px-3 py-1 border border-gray-300 rounded-md">
                            4
                        </a>
                    </li>
                    <li className="mx-1">
                        <a href="#" className="inline-block px-3 py-1 border border-gray-300 rounded-md">
                            5
                        </a>
                    </li>
                    <li className="mx-1">
                        <a href="#" className="inline-block px-3 py-1 border border-gray-300 rounded-md">
                            &gt;
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}