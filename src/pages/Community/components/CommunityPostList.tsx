import { Post } from "../../../types/community.types"

interface CommunityPostListProps {
    posts: Post[]
}

export default function CommunityPostList({ posts }: CommunityPostListProps) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id} className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className={`
                            min-w-24 mr-4 px-3 py-1 rounded-full text-center text-sm text-white
                            ${post.categoryType === 'notice' ? 'bg-red-500' : ''}
                            ${post.categoryType === 'info' ? 'bg-[#05D182]' : ''}
                            ${post.categoryType === 'free' ? 'bg-blue-500' : ''}
                            ${post.categoryType === 'question' ? 'bg-yellow-500' : ''}
                            ${post.categoryType === 'share' ? 'bg-purple-500' : ''}
                            `}>
                        {post.category}
                    </div>

                    <div className="flex-1">
                        <div className="font-medium mb-1 hover:text-[#05D182] cursor-pointer">
                            {post.title}
                        </div>
                        <div className="flex text-sm text-gray-500">
                            <div className="mr-3">{post.author}</div>
                            <div className="mr-3">{post.date}</div>
                            <div className="text-[#05D182] font-medium">댓글 {post.commentCount}</div>
                        </div>
                    </div>

                    <div className="text-center min-w-16">
                        <div className="text-sm text-gray-500">조회 {post.viewCount}</div>
                        <div className="text-sm text-gray-500">추천 {post.likeCount}</div>
                    </div>
                </li>
            ))}
        </ul>
    )
}