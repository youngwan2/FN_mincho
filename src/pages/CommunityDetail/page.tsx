import { useState } from "react";
import { IoArrowBack, IoSearch, IoThumbsUp } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { useParams } from "react-router";
import { usePostDetailGetQuery } from "../../hooks/queries/useQueryPosts";
import CommunityComment from "./components/comment/CommunityComment";
import { useTogglePostLikeMutation } from "../../hooks/mutations/useMutationPostLike";
import { useCommentGetQuery } from "../../hooks/queries/useQueryComments";


const PAGE_SIZE = 10;
export default function CommunityDetailPage() {

  const [page, setPage] = useState(0)
  const { postId } = useParams();

  // 데이터 페칭
  const { isLoading: detailLoading, post, status: detailStatus } = usePostDetailGetQuery(Number(postId) || 0);
  const { commentInfo, isError: commentIsError, isLoading: commentLoading, status: commentStatus } = useCommentGetQuery({ page, size: PAGE_SIZE, postId: Number(postId) || 0, sortby: 'desc' })

  // 뮤테이션
  const { mutate: postLikeMutate } = useTogglePostLikeMutation(Number(postId) || 0);

  // 좋아요 토글
  function handleLikeToggle() {
    postLikeMutate(Number(postId) || 0);
  }

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <header className="flex items-center p-4 border-b border-gray-200">
        <IoArrowBack className="mr-4 text-gray-600" />
        <h1 className="text-xl font-bold flex-grow">커뮤니티</h1>
        <div className="flex space-x-3">
          <IoSearch className="text-gray-600" />
          <IoMdMore />
        </div>
      </header>

      {/* 포스트 내용 */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
          <div>
            <h2 className="font-bold text-2xl">{post.author?.nickname || '민초패밀리'}</h2>
            <p className="text-xl text-gray-500">{post.createdAt}</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 mt-15">{post.title}</h1>

        <div className="mb-4">
          <p className="text-[16px] text-gray-700 mb-4">
            {post.contents}
          </p>
        </div>

        {/* 사용자 액션 */}
        <div className="flex items-center justify-between border-y border-gray-200 py-3 mb-4">
          <div className="flex items-center space-x-4">
            <button onClick={handleLikeToggle} className="flex items-center text-gray-600 hover:text-blue-600">
              <IoThumbsUp className="mr-2 h-5 w-5" />
              <span>{post.likeCount}</span>
            </button>
          </div>
        </div>

        {/* 댓글 */}
        <CommunityComment postId={Number(postId)} comments={commentInfo?.comments || []} totalCount={commentInfo?.totalCount || 0} />
      </div>
    </div>
  );






  //   return (
  //     <div>
  //       <DetailHeader />


  // {/* 헤더, 콘텐츠, 댓글 */}
  //       <DetailBody>
  //         ''
  //         {/* 타이틀 */}

  //         {/* 상세 내용 */}

  //         {/* 액션 버튼  */}

  //         {/* 댓글 */}


  //       </DetailBody>
  //       <DetailFooter/>

  //     </div>
  //   )
}


