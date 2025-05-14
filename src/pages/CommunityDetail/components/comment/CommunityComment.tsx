import { IoMdMore } from "react-icons/io";


import CommentSubmitForm from "./CommentSubmitForm";
import CommentDropdown from "./CommentDropdown";
import CommentEditForm from "./CommentEditForm";

import { Comment, CommentCreateRequest, CommentUpdateRequest } from "../../../../types/comment.types";
import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "../../../../hooks/mutations/useMutationComment";
import { FormEvent, useRef, useState } from "react";

import { toast } from "react-toastify";
import CustomTimeAgo from "../../../../components/vender/timeago/CustomTimeAgo";

interface CommunityCommentProps {
  postId: number
  comments: Comment[]
  totalCount: number
}

export default function CommunityComment({ postId, comments, totalCount }: CommunityCommentProps) {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isWrite, setIsWrite] = useState(false)
  const { mutate: commentCreateMutate } = useCreateCommentMutation(Number(postId)) // 댓글 추가
  const { mutate: commentUpdateMutate } = useUpdateCommentMutation(Number(postId)) // 댓글 수정
  const { mutate: commentDeleteMutate } = useDeleteCommentMutation(Number(postId)) // 댓글 삭제



  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null)

  // 댓글 액션창 드롭다운 토글
  function handleToggleDropdown(commentId: number, isOpen: boolean) {
    setSelectedCommentIndex(commentId)
    setIsOpen(isOpen)
    setIsEdit(false)
  }

  // 댓글 작성 폼 토글
  function handleToggleWriteForm(commentId: number) {
    setSelectedCommentIndex(commentId)
    setIsWrite(!isWrite)
  }

  // 댓글 삭제
  function handleDeleteComment(commentId: number) {
    commentDeleteMutate(commentId)
    setIsOpen(false)
  }


  // 댓글 작성
  function handleSubmitComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const contents = formData.get("contents")?.toString() || ''

    if (contents.length < 5) {
      return toast.info("댓글은 5자 이상 작성해야 합니다.")
    }

    const data: CommentCreateRequest = {
      contents,
      parentCommentId: selectedCommentIndex || null,
    }

    commentCreateMutate({ comment: data })
    return true
  }

  // 댓글 수정
  function handleUpdateSubmitComment(e: FormEvent<HTMLFormElement>, commentId: number) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const contents = formData.get("contents")?.toString() || ''

    const data: CommentUpdateRequest = {
      contents,
    }

    commentUpdateMutate({ commentId, comment: data })

    if (commentTextAreaRef.current) {
      commentTextAreaRef.current.value = ''
    }
    setIsEdit(false)

  }

  return (
    <div className="mt-15">
      {/* 헤더 */}
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold flex-grow">댓글 {totalCount}</h2>
        <button className="cursor-pointer text-2xl text-blue-600 hover:text-blue-400">최신순</button>
      </div>

      {/* 댓글 입력 폼 */}
      <CommentSubmitForm onSubmit={handleSubmitComment} />

      {/* 댓글 목록 */}
      {comments.map((comment) => {
        const isCommentEditing = comment.id === selectedCommentIndex && isEdit;

        return (
          <div key={comment.id} className="border-b py-6 border-gray-100">
            {/* 댓글 상단 (작성자, 시간, 메뉴 버튼) */}
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
              <div className="flex-grow">
                <h3 className={`${comment.isDeleted ? 'text-gray-500' : ''} font-bold text-[15px]`}>
                  {comment.nickname || '익명의민초'}
                </h3>
                <p className="text-xl text-gray-500">
                  <CustomTimeAgo date={comment.createdAt} />
                </p>
              </div>

              {/* 드롭다운 (내 댓글 && 삭제되지 않은 경우) */}
              {comment.isMine && !comment.isDeleted && (
                <div className="relative">
                  <button
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() => {
                      handleToggleDropdown(comment.id, !isOpen);
                      setIsEdit(false);
                    }}
                  >
                    <IoMdMore />
                  </button>
                  {comment.id === selectedCommentIndex && (
                    <CommentDropdown
                      commentId={comment.id}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      onDelete={handleDeleteComment}
                      onEdit={() => setIsEdit(true)}
                    />
                  )}
                </div>
              )}
            </div>

            {/* 댓글 본문 or 수정 폼 */}
            {isCommentEditing ? (
              <CommentEditForm
                ref={commentTextAreaRef}
                initialText={comment.contents}
                setIsEdit={setIsEdit}
                setSelectedCommentIndex={setSelectedCommentIndex}
                handleSubmitComment={(e) => handleUpdateSubmitComment(e, comment.id)}
              />
            ) : (
              <p className={`${comment.isDeleted ? 'text-gray-400' : 'text-gray-700'} mb-2`}>
                {comment.contents}
              </p>
            )}

            {/* 답글 버튼 */}
            {!comment.isDeleted && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleToggleWriteForm(comment.id)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  답글
                </button>
              </div>
            )}

            {/* 대댓글 목록 */}
            {comment.replies.map((reply) => {
              const isReplyEditing = reply.id === selectedCommentIndex && isEdit;

              return (
                <div key={reply.id} className="py-3 pl-15">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
                    <div className="flex-grow">
                      <h3 className={`${reply.isDeleted ? 'text-gray-500' : ''} font-bold text-[15px]`}>
                        {reply.nickname || '익명의민초'}
                      </h3>
                      <p className="text-xl text-gray-500">
                        <CustomTimeAgo date={reply.createdAt} />
                      </p>
                    </div>

                    {/* 드롭다운 (내 대댓글일 경우) */}
                    {reply.isMine && !reply.isDeleted && (
                      <div className="relative">
                        <button
                          className="hover:text-blue-500 cursor-pointer"
                          onClick={() => {
                            handleToggleDropdown(reply.id, !isOpen);
                            setIsEdit(false);
                          }}
                        >
                          <IoMdMore />
                        </button>
                        {reply.id === selectedCommentIndex && (
                          <CommentDropdown
                            commentId={reply.id}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            onDelete={handleDeleteComment}
                            onEdit={() => setIsEdit(true)}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* 대댓글 본문 or 수정 폼 */}
                  {isReplyEditing && !reply.isDeleted ? (
                    <CommentEditForm
                      ref={commentTextAreaRef}
                      initialText={reply.contents}
                      setIsEdit={setIsEdit}
                      setSelectedCommentIndex={setSelectedCommentIndex}
                      handleSubmitComment={(e) => handleUpdateSubmitComment(e, reply.id)}
                    />
                  ) : (
                    <p className={`${reply.isDeleted ? 'text-gray-400' : 'text-gray-700'} mb-2`}>
                      {reply.contents}
                    </p>
                  )}

                  {/* 답글 버튼 */}
                  {!reply.isDeleted && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleToggleWriteForm(comment.id)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        답글
                      </button>
                    </div>
                  )}

                  {/* 대댓글 작성 폼 */}
                  {selectedCommentIndex === reply.id && isWrite && (
                    <CommentEditForm
                      ref={commentTextAreaRef}
                      handleSubmitComment={handleSubmitComment}
                      setIsEdit={setIsWrite}
                      setSelectedCommentIndex={setSelectedCommentIndex}
                      placeholder={reply.nickname || undefined}
                    />
                  )}
                </div>
              );
            })}

            {/* 답글 작성 폼 */}
            {selectedCommentIndex === comment.id && isWrite && (
              <CommentEditForm
                ref={commentTextAreaRef}
                handleSubmitComment={handleSubmitComment}
                setIsEdit={setIsWrite}
                setSelectedCommentIndex={setSelectedCommentIndex}
                placeholder={comment.nickname || undefined}
              />
            )}
          </div>
        );
      })}
    </div>

  )
}