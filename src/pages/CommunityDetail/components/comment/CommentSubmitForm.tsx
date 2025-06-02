import { FormEvent, useRef, useState } from "react"
import { FiSend } from "react-icons/fi";

interface CommentSubmitFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => any
}

const MAX_LENGTH = 500;

export default function CommentSubmitForm({ onSubmit }: CommentSubmitFormProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [textLength, setTextLength] = useState(0);

    const isMaxLengthExceeded = textLength >= MAX_LENGTH;

    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        if (value.length <= MAX_LENGTH) {
            setTextLength(value.length);
        } else {
            // 1200자 초과 시 잘라서 입력
            e.target.value = value.slice(0, MAX_LENGTH);
            setTextLength(MAX_LENGTH);
        }
    }

    return (
        <form onSubmit={(e) => {
            if (onSubmit(e) === true) {
                if (textAreaRef.current) {
                    textAreaRef.current.value = ''
                    setTextLength(0);
                }
            }
        }} className="flex items-stretch mb-4 space-x-3 flex-col " >
            <div className="flex-grow relative flex flex-col items-end">
                <textarea
                    ref={textAreaRef}
                    name="contents"
                    placeholder="댓글을 남겨주세요"
                    maxLength={MAX_LENGTH}
                    onInput={handleInput}
                    className="h-[80.47px] text-gray-700 w-full border border-gray-300 rounded-2xl px-5 py-1 outline-primary-gray transition-colors "
                />

            </div>
            <div className="w-full flex gap-3 items-center justify-end">
                <span aria-label={`텍스트 길이 제한 ${textLength + "/" + MAX_LENGTH}`} className={`text-xl text-gray-400`}>{isMaxLengthExceeded ? "글자수 제한 초과 (500/500)" : textLength + "/" + MAX_LENGTH} </span>
                <div className=" flex  items-center gap-2 bg-primary-green hover:bg-hover-primary-green rounded-md p-1 my-2 text-white px-3">
                    <FiSend />
                    <button
                        className=""
                        title="댓글 등록"
                        type="submit"
                        disabled={textLength === 0 || textLength > MAX_LENGTH}
                    >
                        코멘트 남기기
                    </button>
                </div>
            </div>
        </form >
    )
}