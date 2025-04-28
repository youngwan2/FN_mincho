import { FormEvent, useRef } from "react"
import { IoAddCircleOutline } from "react-icons/io5"

interface CommentSubmitFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => any
}

export default function CommentSubmitForm({ onSubmit }: CommentSubmitFormProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    return (
        <form onSubmit={(e) => {
            if (onSubmit(e) === true) {
                if (textAreaRef.current) {
                    textAreaRef.current.value = ''
                }
            }
        }
        } className="flex items-center mb-4 space-x-3" >
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-grow relative flex items-center">
                <textarea
                    ref={textAreaRef}
                    name="contents"
                    placeholder="댓글을 남겨주세요"
                    className="h-[65.47px] text-gray-700 w-full border border-gray-300 rounded-2xl px-5 py-2 outline-primary-green transition-colors "
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    title="댓글 등록"
                    type="submit"
                >
                    <IoAddCircleOutline className="hover:text-blue-500 cursor-pointer w-8 h-8 text-hover-primary-green" />
                </button>
            </div>
        </form >
    )
}