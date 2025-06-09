import { Post, PostFetchState } from "@/types/post.types";
import CommunityPostList from "./CommunityPostList";


interface CommunityPostProps {
    posts: Post[]
    postFetchState: PostFetchState
    itemCount: number
}



export default function CommunityPost({ posts, postFetchState }: CommunityPostProps) {

    return (
        <div className="flex-1 overflow-hidden h-full min-h-1/6">
            {/* 게시글 목록 */}
            <CommunityPostList posts={posts} postFetchState={postFetchState} />
        </div>
    )
}