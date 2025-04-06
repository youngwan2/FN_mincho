import { useEffect, useState } from "react";
import { IoThumbsUp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { usePostDetailGetQuery } from "../../hooks/queries/useQueryPosts";
import CommunityComment from "./components/comment/CommunityComment";
import { useTogglePostLikeMutation } from "../../hooks/mutations/useMutationPostLike";
import { useCommentGetQuery } from "../../hooks/queries/useQueryComments";
import CommunityEditor from "../CommunityEditor/components/CommunityEditor";
import { useDeletePostMutation } from "../../hooks/mutations/useMutationPost";


const PAGE_SIZE = 10;
export default function CommunityDetailPage() {

  const navigate = useNavigate();
  const [page, setPage] = useState(0)
  const [formType, setFormType] = useState<"create" | "update" | "detail">("detail")
  const { postId } = useParams();

  // 데이터 페칭
  const { isLoading: detailLoading, post } = usePostDetailGetQuery(Number(postId) || 0);
  const { commentInfo, isLoading: commentLoading } = useCommentGetQuery({ page, size: PAGE_SIZE, postId: Number(postId) || 0, sortby: 'desc' })

  // 뮤테이션
  const { mutate: postLikeMutate } = useTogglePostLikeMutation(Number(postId) || 0);
  const { mutate: postDeleteMutate, isSuccess: postDeleteIsSuccess } = useDeletePostMutation();

  // 좋아요 토글
  function handleLikeToggle() {
    postLikeMutate(Number(postId) || 0);
  }

  // 게시글 삭제
  function handlePostDelete() {
    if (confirm("정말 삭제하시겠습니까?")) {
      const text = prompt("'정말삭제'을 입력해주세요.")
      if (text !== "정말삭제") {
        alert("삭제를 취소합니다.")
        return;
      }
      postDeleteMutate(Number(postId) || 0);
    }
  }

  // 게시글 삭제 후 리다이렉트
  useEffect(() => {
    if (postDeleteIsSuccess) {
      navigate("/community")
    }
  }, [postDeleteIsSuccess])

  return (
    <div className="w-full mx-auto bg-white min-h-screen">
      <div className="h-[350px] bg-gray-200 w-full">
        <img className="rounded-2xl w-full h-full mix-blend-luminosity" src={`https://picsum.photos/seed/picsum/${window.innerWidth}/350`} alt="" />
      </div>

      {/* 포스트 내용 */}
      <div className="p-4 mt-10">

        {/* 작성자, 작성일 */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
          <div className="w-full">
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">{post.author?.nickname || '익명의민초'}</h2>
              {post.isMine ?
                <div className="flex gap-3" >
                  {formType.includes('detail')
                    ? <button onClick={() => setFormType('update')} className="text-gray-600 text-2xl hover:text-hover-primary-green cursor-pointer">수정</button>
                    : <button onClick={() => setFormType('detail')} className="text-gray-600 text-2xl hover:text-hover-primary-green cursor-pointer">취소</button>
                  }
                  <button onClick={handlePostDelete} className="text-gray-600 text-2xl hover:text-hover-primary-green cursor-pointer">삭제</button>
                </div> : null
              }

            </div>
            <p className="text-xl text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* 제목, 내용 */}
        <CommunityEditor post={post} formType={formType} />

        {formType === 'detail' ?
          <>
            <div className="flex items-center justify-end  py-8 mr-5 mb-4">
              <div className="flex items-center space-x-4">
                <button onClick={handleLikeToggle} className="flex items-center text-gray-600 hover:text-blue-600">
                  <IoThumbsUp className="mr-2 h-7 w-7" />
                  <span className="text-2xl">{post.likeCount}</span>
                </button>
              </div>
            </div>
            <CommunityComment postId={Number(postId)} comments={commentInfo?.comments || []} totalCount={commentInfo?.totalCount || 0} />

          </>
          : null
        }
      </div>
    </div>
  );
}


