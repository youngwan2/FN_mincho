import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'; // 스켈레톤 CSS 추가
import { IoEye, IoThumbsUp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { usePostDetailGetQuery } from "../../hooks/queries/useQueryPosts";
import CommunityComment from "./components/comment/CommunityComment";
import { useTogglePostLikeMutation } from "../../hooks/mutations/useMutationPostLike";
import { useCommentGetQuery } from "../../hooks/queries/useQueryComments";
import CommunityEditor from "../CommunityEditor/components/CommunityEditor";
import { useDeletePostMutation } from "../../hooks/mutations/useMutationPost";
import noProfile from '../../assets/profile.png'

const PAGE_SIZE = 10;
export default function CommunityDetailPage() {

  const navigate = useNavigate();
  const [page, _] = useState(0)
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
        {detailLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img className="rounded-2xl w-full h-full mix-blend-luminosity" src={`https://picsum.photos/seed/picsum/${window.innerWidth}/350`} alt="" />
        )}
      </div>

      {/* 포스트 내용 */}
      <div className="p-4 mt-10">

        {/* 작성자, 작성일 */}
        <div className="flex items-center mb-4">
          {detailLoading ? (
            <Skeleton circle width={40} height={40} className="mr-3" />
          ) : (
            <div className="w-[40px] h-[40px] mr-2">
              <img className="w-[40px] h-[40px] object-contain rounded-full border border-gray-300" src={post.author.profileImage} alt="사용자 프로필 이미지" onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = noProfile

              }} />
            </div>
          )}
          <div className="w-full">
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">
                {detailLoading ? <Skeleton width={120} /> : post.author?.nickname || '익명'}
              </h2>
              {!detailLoading && post.isMine && (
                <div className="flex gap-3">
                  {formType.includes('detail')
                    ? <button onClick={() => setFormType('update')} className="text-gray-600 text-2xl hover:text-hover-primary-green cursor-pointer">수정</button>
                    : <button onClick={() => setFormType('detail')} className="text-gray-600 text-2xl hover:text-hover-primary-green cursor-pointer">취소</button>
                  }
                  <button onClick={handlePostDelete} className="text-gray-600 text-2xl hover:text-hover-primary-green cursor-pointer">삭제</button>
                </div>
              )}
            </div>
            {/* 작성일 */}
            <p className="text-xl text-gray-500">
              {detailLoading ? <Skeleton width={200} /> : new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* 제목, 내용 */}
        {detailLoading ? (
          <div className="mb-8">
            <Skeleton height={50} className="mb-4" /> {/* 제목 스켈레톤 */}
            <Skeleton count={5} height={20} /> {/* 내용 스켈레톤 */}
          </div>
        ) : (
          <CommunityEditor post={post} formType={formType} />
        )}

        {formType === 'detail' && !detailLoading ? (
          <>
            <div className="flex items-center justify-end py-8 mr-5 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <IoEye />
                  <span className="text-2xl">{post.viewCount || 0}</span>
                </div>
                <button onClick={handleLikeToggle} className="flex items-center text-gray-600 hover:text-blue-600">
                  <IoThumbsUp className="mr-2 h-7 w-7" />
                  <span className="text-2xl">{post.likeCount || 0}</span>
                </button>
              </div>
            </div>
            {/* 댓글 */}
            {commentLoading ? (
              <div className="mt-8">
                <Skeleton height={40} className="mb-4" /> {/* 댓글 입력창 스켈레톤 */}
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, index) => (
                    <div key={index} className="flex">
                      <Skeleton circle width={32} height={32} className="mr-3" />
                      <div className="flex-1">
                        <Skeleton width={120} className="mb-2" />
                        <Skeleton count={2} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <CommunityComment
                postId={Number(postId)}
                comments={commentInfo?.comments || []}
                totalCount={commentInfo?.totalCount || 0}
              />
            )}
          </>
          // 댓글 로딩 및 상세 페이지일 때 스켈레톤
        ) : formType === 'detail' && detailLoading ? (
          <>
            <div className="flex items-center justify-end py-8 mr-5 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <IoEye />
                  <span className="text-2xl"><Skeleton width={20} /></span>
                </div>
                <div className="flex items-center text-gray-600">
                  <IoThumbsUp className="mr-2 h-7 w-7" />
                  <span className="text-2xl"><Skeleton width={20} /></span>
                </div>
              </div>
            </div>
            {/* 댓글 스켈레톤 */}
            <div className="mt-8">
              <Skeleton height={40} className="mb-4" /> {/* 댓글 입력창 스켈레톤 */}
              <div className="space-y-4">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="flex">
                    <Skeleton circle width={32} height={32} className="mr-3" />
                    <div className="flex-1">
                      <Skeleton width={120} className="mb-2" />
                      <Skeleton count={2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}