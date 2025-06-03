import { useEffect, useState } from "react";
import { usePostDetailGetQuery } from "@/hooks/queries/useQueryPosts";
import { useCommentGetQuery } from "@/hooks/queries/useQueryComments";
import { useTogglePostLikeMutation } from "@/hooks/mutations/useMutationPostLike";
import { useDeletePostMutation } from "@/hooks/mutations/useMutationPost";
import { Link, useNavigate, useParams } from "react-router";

import Skeleton from 'react-loading-skeleton'
import Editor from "@/components/editor/Editor";
import CommunityComment from "./comment/CommunityComment";
import { CommentSkeleton, UserActionSkeleton } from "./skeleton/Skeleton";

import noProfile from '@/assets/noImage.png'
import { increasePostView } from "@/service/post.service";
import { IoEye, IoThumbsUp } from "react-icons/io5";


const PAGE_SIZE = 10;
export default function DetailPost() {
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

    // 조회수 증가
    useEffect(() => {
        if (postId) {
            increasePostView(Number(postId));
        }
    }, [postId]);

    return (
        <>
            <div className="h-[350px] bg-gradient-to-b from-gray-300 to-90% to-white w-full rounded-xl ">
                {detailLoading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <h2 className='text-6xl font-bold flex items-center justify-center h-full'>{post.title}</h2>
                )}
            </div>

            {/* 포스트 내용 */}
            <div className="pt-20 mt-10 border rounded-2xl px-5">

                {/* 작성자, 작성일 */}
                <div className="flex items-center mb-4">
                    {detailLoading ? (
                        <Skeleton circle width={40} height={40} className="mr-3" />
                    ) : (
                        <div className="w-[40px] h-[40px] mr-2">
                            <img className="w-[40px] h-[40px] object-contain rounded-full border border-gray-300" src={post.author.profileImage || noProfile} alt="사용자 프로필 이미지" onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = noProfile

                            }} />
                        </div>
                    )}
                    <div className="w-full">
                        <div className="flex justify-between">
                            <h2 className="font-bold text-2xl">
                                <Link to={`/users/${post.author?.id}`} className="text-gray-800 hover:text-hover-primary-green">
                                    {detailLoading ? <Skeleton width={120} /> : post.author?.nickname || '익명'}
                                </Link>
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

                {/* 게시글 제목, 내용 */}
                {detailLoading ? (
                    <div className="mb-8">
                        <Skeleton height={50} className="mb-4" />
                        <Skeleton count={5} height={20} />
                    </div>
                ) : (
                    <Editor formType={formType} post={post} />
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


                    </>

                    // 상세 페이지 로딩 시 유저액션(좋아요, 조회수), 댓글 스켈레톤
                ) : formType === 'detail' && detailLoading ? (
                    <>
                        <UserActionSkeleton />
                    </>
                ) : null}
            </div>
            {/* 댓글*/}
            {formType === 'detail' && !detailLoading
                ? commentLoading
                    ? <CommentSkeleton />
                    : <CommunityComment
                        postId={Number(postId)}
                        comments={commentInfo?.comments || []}
                        totalCount={commentInfo?.totalCount || 0} />
                : null
            }
        </>

    )
}