import { IoMdMore } from "react-icons/io";


import CommentSubmitForm from "./CommentSubmitForm";
import CommentDropdown from "./CommentDropdown";
import CommentEditForm from "./CommentEditForm";

import { Comment, CommentCreateRequest, CommentUpdateRequest } from "../../../../types/comment.types";
import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from "../../../../hooks/mutations/useMutationComment";
import { FormEvent, useState } from "react";

import { toast } from "react-toastify";
import CustomTimeAgo from "../../../../components/CustomTimeAgo";

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
    setIsEdit(false)
  }

  return (
    <div className="mt-15">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold flex-grow">댓글 {totalCount}</h2>
        <button className="cursor-pointer text-2xl text-blue-600 hover:text-blue-400">최신순</button>
      </div>

      {/* 댓글 입력창 */}
      <CommentSubmitForm onSubmit={handleSubmitComment} />

      {/*댓글 목록 */}
      {comments.map((comment) => (
        <div key={comment.id} className="border-b py-6 border-gray-100">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
            <div className="flex-grow">
              <h3 className={comment.isDeleted ? 'text-gray-500 font-bold text-[15px]' : 'font-bold text-[15px]'} >{comment.nickname || '익명의민초'}</h3>
              <p className="text-xl text-gray-500"><CustomTimeAgo date={comment.createdAt} /></p>
            </div>

            {/* 드롭 다운(수정/삭제) */}
            {comment.isMine && !comment.isDeleted ?
              <div className="relative">
                <button
                  className="hover:text-blue-500 cursor-pointer"
                  onClick={() => {
                    handleToggleDropdown(comment.id, !isOpen)
                    setIsEdit(false)
                  }}>
                  <IoMdMore />
                </button>
                {comment.id === selectedCommentIndex ? <CommentDropdown commentId={comment.id} onDelete={handleDeleteComment} isOpen={isOpen} setIsOpen={setIsOpen} onEdit={() => setIsEdit(true)} /> : null}
              </div>
              : null}
          </div>

          {/* 댓글 내용 */}
          {comment.id === selectedCommentIndex && isEdit
            ? <CommentEditForm setIsEdit={setIsEdit} handleSubmitComment={(e: FormEvent<HTMLFormElement>) => handleUpdateSubmitComment(e, comment.id)} setSelectedCommentIndex={setSelectedCommentIndex} initialText={comment.contents} />
            : <p className={`${comment.isDeleted ? 'text-gray-400' : 'text-gray-700'}  mb-2`}>{comment.contents}</p>}

          <div className="flex items-center space-x-4">
            {!comment.isDeleted ? <button onClick={() => handleToggleWriteForm(comment.id)} className=" text-gray-600 hover:text-blue-600">답글</button> : null}
          </div>

          {/* 대댓글 */}
          {comment.replies.map((reply) => {
            return (
              <div key={reply.id} className=" py-3 pl-15">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <div className="flex-grow">
                    <h3 className={reply.isDeleted ? 'text-gray-500 font-bold text-[15px]' : 'font-bold text-[15px]'} >{reply.nickname || '익명의민초'}</h3>
                    <p className="text-xl text-gray-500"><CustomTimeAgo date={reply.createdAt} /></p>
                  </div>

                  {/* 드롭다운 */}
                  {reply.isMine ?
                    <div className="relative">
                      <button
                        className="hover:text-blue-500 cursor-pointer"
                        onClick={() => {
                          handleToggleDropdown(reply.id, !isOpen)
                          setIsEdit(false)
                        }}>
                        <IoMdMore />
                      </button>
                      {reply.id === selectedCommentIndex ? <CommentDropdown commentId={reply.id} isOpen={isOpen} setIsOpen={setIsOpen} onDelete={handleDeleteComment} onEdit={() => setIsEdit(true)} /> : null}
                    </div>
                    : null}
                </div>
                {/* 댓글 내용 */}
                {reply.id === selectedCommentIndex && isEdit
                  ? <CommentEditForm handleSubmitComment={(e: FormEvent<HTMLFormElement>) => handleUpdateSubmitComment(e, reply.id)} setIsEdit={setIsEdit} setSelectedCommentIndex={setSelectedCommentIndex} initialText={reply.contents} />
                  : <p className={`${comment.isDeleted ? 'text-gray-400' : 'text-gray-700'}  mb-2`}>{reply.contents}</p>}
                <div className="flex items-center space-x-4">

                  {!reply.isDeleted ? <button onClick={() => { handleToggleWriteForm(comment.id) }} className=" text-gray-600 hover:text-blue-600">답글</button> : null}
                </div>
                {/* 대댓글 작성 폼 */}
                {selectedCommentIndex === reply.id && isWrite ?
                  <CommentEditForm handleSubmitComment={handleSubmitComment} setIsEdit={setIsWrite} setSelectedCommentIndex={setSelectedCommentIndex} placeholder={reply.nickname || undefined} />
                  : null}
              </div>
            )
          })}
          {/* 댓글 작성 폼 */}
          {selectedCommentIndex === comment.id && isWrite ?
            <CommentEditForm handleSubmitComment={handleSubmitComment} setIsEdit={setIsWrite} setSelectedCommentIndex={setSelectedCommentIndex} placeholder={comment.nickname || undefined} />
            : null}
        </div>
      ))}
    </div>
  )
}