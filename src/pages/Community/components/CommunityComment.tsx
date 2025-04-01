import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { IoAdd, IoThumbsUp } from "react-icons/io5";

interface CommunityCommentProps {
    postId:number



 }
  
export default function CommunityComment({postId}:CommunityCommentProps) {

      const [comments, setComments] = useState([
        {
          id: 1,
          author: '건강러버',
          content: '저는 6개월째 홍삼 농축액 섭취 중인데 면역력이 확실히 좋아졌어요!',
          likes: 12,
          timestamp: '1시간 전'
        },
        {
          id: 2,
          author: '인삼전문가',
          content: '생인삼과 홍삼은 효과가 조금 다르니 본인에게 맞는 형태를 찾는 게 중요해요.',
          likes: 24,
          timestamp: '2시간 전'
        }
      ]);
    
      const [newComment, setNewComment] = useState('');
    
    
    // 댓글 추가
      const handleAddComment = () => {
        if (newComment.trim()) {
          const comment = {
            id: comments.length + 1,
            author: '익명',
            content: newComment,
            likes: 0,
            timestamp: '방금 전'
          };
          setComments([comment, ...comments]);
          setNewComment('');
        }
      };
    
return (
    <div className="mt-15">
    <div className="flex items-center mb-4">
      <h2 className="text-3xl font-bold flex-grow">댓글 {comments.length}</h2>
      <button className="text-sm text-blue-600">최신순</button>
    </div>

    {/* 댓글 입력창 */}
    <div className="flex items-center mb-4 space-x-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="flex-grow relative">
        <input
          type="text"
          placeholder="댓글을 남겨주세요"
          className="w-full border border-gray-300 rounded-full px-4 py-2 "
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <IoAdd />
        </button>
      </div>
    </div>

    {/*댓글 목록 */}
    {comments.map((comment) => (
      <div key={comment.id} className="border-b py-3 border-gray-300">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
          <div className="flex-grow">
            <h3 className="font-bold text-[15px]">{comment.author}</h3>
            <p className="text-xl text-gray-500">{comment.timestamp}</p>
          </div>
          <button>
            <IoMdMore />
          </button>
        </div>
        <p className=" text-gray-700 mb-2">{comment.content}</p>
        <div className="flex items-center space-x-4">
          <button className="flex items-centder text-gray-600 hover:text-blue-600">
            <IoThumbsUp />
            <span className="ml-1 text-xl">{comment.likes}</span>
          </button>
          <button className=" text-gray-600 hover:text-blue-600">답글</button>
        </div>
      </div>
    ))}
  </div>
)}