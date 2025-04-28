interface CommentEditFormProps {
    handleSubmitComment: (e: React.FormEvent<HTMLFormElement>) => void
    setSelectedCommentIndex: (commentId: number) => void
    setIsEdit: (isEdit: boolean) => void
    initialText?: string
    placeholder?: string

}

export default function CommentEditForm({ handleSubmitComment, setSelectedCommentIndex, setIsEdit, placeholder = undefined, initialText }: CommentEditFormProps) {


    function handleToggle() {
        setSelectedCommentIndex(0)
        setIsEdit(false)
    }
    return (
        <form className="flex flex-col py-5 " onSubmit={handleSubmitComment}>
            <textarea defaultValue={initialText} placeholder={"'" + (placeholder ?? '익명의민초') + "'" + '님에게 남기는 말'} name="contents" className="w-full border border-gray-200 rounded-xl p-2 outline-primary-green"></textarea>
            <div className="flex gap-3 pt-3 justify-end">
                <button onClick={handleToggle} className="rounded-md  w-20 border border-gray-300 hover:bg-gray-100">취소</button>
                <button className="hover:bg-hover-primary-green cursor-pointer px-2 rounded-md bg-primary-green text-white w-20 ">등록</button>
            </div>
        </form>
    )
}