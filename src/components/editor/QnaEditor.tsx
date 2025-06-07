import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageResize from "tiptap-extension-resize-image"
import Placeholder from "@tiptap/extension-placeholder"
import EditorMenuBar from "./EditorMenuBar"
import { FiImage, FiInfo, FiSend, FiTrash2, FiX } from "react-icons/fi"
import { useQnaEditor, EditorType, UseQnaEditorReturn } from "../../hooks/useQnaEditor"
import { useState } from "react"
import useLoginStatus from "@/hooks/useLoginStatus"
import { Link } from "react-router"
import { useQnaCategoriesQuery } from "../../hooks/queries/useQueryQna"

interface QnaEditorProps {
    qnaId?: number;
    answerId?: number;
    initTitle?: string;
    initCategoryType?: string;
    initContents?: string;
    initImageUrls?: string[]; // 초기 이미지 URL 목록 추가
    type?: EditorType; // "question" | "edit-question" | "answer" | "edit-answer";
    isPrivate?: boolean;
    onSubmitSuccess?: () => void;
    onClose?: () => void;
}

const MAX_CONTENT_LENGTH = 5000; // 최대 글자 수
const MIN_CONTENT_LENGTH = 20; // 최소 글자 수
const MIN_TITLE_LENGTH = 8; // 제목 최소 글자 수
const MAX_TITLE_LENGTH = 50; // 제목 최대 글자 수

export default function QnaEditor({
    qnaId,
    answerId,
    initTitle = "",
    initCategoryType = "",
    initContents = "",
    initImageUrls = [],
    type = "answer",
    isPrivate = false,
    onSubmitSuccess,
    onClose
}: QnaEditorProps) {
    const isLoggedIn = useLoginStatus();
    const [contentLength, setContentLength] = useState(0);
    const [titleLength, setTitleLength] = useState(initTitle ? initTitle.length : 0); // 제목 길이 추적을 위한 상태

    // 카테고리 데이터를 react-query로 불러오기
    const { categories, isLoading: isLoadingCategories } = useQnaCategoriesQuery();


    // 커스텀 훅을 사용하여 에디터의 상태와 로직 관리
    const editorState = useQnaEditor({
        qnaId,
        answerId,
        initTitle,
        initCategoryType,
        initContents,
        initImageUrls,
        type,
        isPrivate,
        onSubmitSuccess: () => {
            // 에디터 초기화
            if (editor && type === 'answer') {
                editor.commands.clearContent();
                setContentLength(0);
            }
            // 부모 컴포넌트에서 전달받은 콜백 실행
            if (onSubmitSuccess) onSubmitSuccess();
        }
    }) as UseQnaEditorReturn;

    const {
        title,
        setTitle,
        setContent,
        category,
        setCategory,
        isPrivateQuestion,
        setIsPrivateQuestion,
        tags,
        setTags,
        images,
        previewImages,
        imageUrls,
        isPending,
        fileInputRef,
        handleImageUpload,
        handleImageDelete,
        handleImageUrlDelete,
        handleSubmit,
        isFormValid
    } = editorState;    // 에디터 초기화
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageResize,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Placeholder.configure({
                placeholder: type === 'question' || type === 'edit-question'
                    ? '질문 내용을 작성해주세요...'
                    : '답변 내용을 작성해주세요...',
                emptyEditorClass: 'is-editor-empty',
                emptyNodeClass: 'is-node-empty',
                showOnlyWhenEditable: true,
                showOnlyCurrent: true,
            }),
        ],
        content: initContents,

        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setContent(html)
            setContentLength(editor.getText().length)
        }
    }, [])

    if (editor == null) return null;    // 로그인하지 않은 상태에서 답변 모드인 경우, 플레이스홀더 표시
    if (!isLoggedIn && type === 'answer') {
        return (
            <div className="rounded-md px-6 py-10 bg-gray-50">
                <div className="text-center">
                    <h3 className="text-3xl font-semibold text-gray-700 mb-2 flex items-center gap-3 justify-center"><FiInfo />로그인 후 답변 작성이 가능합니다.</h3>
                    <p className="text-gray-500 mb-4">
                        현재 로그아웃 상태입니다. 질문에 대한 답변을 작성하려면 로그인이 필요합니다.
                    </p>
                    <Link to="/auth/login" className="inline-block bg-primary-green text-white px-4 py-2 rounded-md hover:bg-hover-primary-green transition-colors">
                        로그인하러 가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* only 질문 | 질문일 경우에만 제목과 카테고리 입력 필드 표시 */}
            {(type === 'question' || type === 'edit-question') && (
                <div className="mb-6 space-y-4">

                    {/* 제목 입력 */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="title" className="block text-2xl font-semibold text-gray-700">
                                제목 <span className="text-red-500">*</span>
                            </label>
                            <span className={`text-xl ${titleLength > MAX_TITLE_LENGTH || titleLength < MIN_TITLE_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                                {titleLength} / {MAX_TITLE_LENGTH} 글자
                            </span>
                        </div>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleLength(e.target.value.length);
                            }}
                            placeholder={`질문의 제목을 입력하세요 (${MIN_TITLE_LENGTH}~${MAX_TITLE_LENGTH}자)`}
                            className={`w-full pr-3 pl-4 py-3 border ${titleLength > 0 && (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH)
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                                } rounded-2xl focus:outline-none focus:ring-2`}
                            maxLength={MAX_TITLE_LENGTH + 10} // 약간의 여유 추가
                            required
                        />
                    </div>

                    {/* 카테고리 선택 */}
                    <div className="mb-12">
                        <label htmlFor="category" className="block text-2xl font-semibold text-gray-700 mb-1">
                            카테고리 <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full pr-3 pl-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={isLoadingCategories}
                        >
                            <option value="">카테고리 선택</option>
                            {isLoadingCategories ? (
                                <option value="" disabled>카테고리 로딩 중...</option>
                            ) : (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}{` - ${cat.description}`}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    {/* 태그 추가 */}
                    <div className="mb-12">
                        <label htmlFor="tags" className="block text-2xl font-semibold text-gray-700 mb-1">
                            태그
                        </label>
                        <select
                            id="tags"
                            value=""
                            onChange={(e) => {
                                if (e.currentTarget.value === "") return;
                                const newTags = [...new Set([...tags, e.target.value])]
                                setTags(newTags)
                            }}
                            className="w-full pr-3 pl-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">태그 선택</option>
                            {isLoadingCategories ? (
                                <option value="" disabled>카테고리 로딩 중...</option>
                            ) : (
                                categories.map((cat) => (
                                    <option key={`tag-${cat.id}`} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))
                            )}
                        </select>

                        {/* 선택된 태그 표시 */}
                        {tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-primary-light-gray text-gray-700 px-4 py-2 rounded-full text-xl flex items-center gap-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            className="text-gray-700 hover:text-red-700 hover:cursor-pointer"
                                            onClick={() => setTags(tags.filter(t => t !== tag))}
                                        >
                                            <FiX className="h-6 w-6" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 비공개 여부 */}
                    < div className="flex items-center mt-6" >
                        <input
                            type="checkbox"
                            id="isPrivate"
                            checked={isPrivateQuestion}
                            onChange={(e) => setIsPrivateQuestion(e.target.checked)}
                            className="h-7 w-7 text-blue-600 rounded"
                        />
                        <label htmlFor="isPrivate" className="ml-2 text-2xl text-gray-700">
                            비공개 질문으로 등록
                        </label>
                        <div />
                    </div>
                </div>
            )}

            {/* 이미지 첨부 영역 */}
            <div className="mb-12">
                <input
                    ref={fileInputRef}
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isPending}
                />
                <label
                    htmlFor="images"
                    className="inline-block px-3  border rounded-md cursor-pointer bg-primary-green hover:bg-hover-primary-green text-white"
                >
                    <FiImage className="inline-block mr-1" />
                    이미지 첨부 ({images.length}개)
                </label>

                {/* 기존 이미지 URL 표시 */}
                {imageUrls.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold mb-2">기존 이미지</h3>
                        <div className="flex flex-wrap gap-5">                            {imageUrls.map((url: string, i: number) => (
                            <div key={`url-${i}`} className="animate-fade group relative w-64 h-64 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.4)] transition-shadow overflow-hidden rounded-sm">
                                <img src={url} alt={`기존 이미지 ${i + 1}`} className="w-62 h-62 object-cover rounded" />
                                <button
                                    type="button"
                                    title={`${i + 1}번째 기존 이미지 삭제`}
                                    className="absolute top-3 right-3 text-gray-400 group-hover:text-black hover:text-red-500 rounded-full cursor-pointer flex items-center justify-center"
                                    onClick={() => handleImageUrlDelete(i)}
                                >
                                    <FiTrash2 className='h-10 w-10' />
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                )}

                {/* 새로 추가한 이미지 표시 */}
                {images.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold mb-2">새로 추가한 이미지</h3>
                        <div className="flex flex-wrap gap-5">                            {previewImages.map((img: string, i: number) => (
                            <div key={i} className="animate-fade group relative w-64 h-64 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.4)] transition-shadow overflow-hidden rounded-sm">
                                <img src={img} alt={`첨부 이미지 ${i + 1}`} className="w-62 h-62 object-cover rounded" />
                                <button
                                    type="button"
                                    title={`${i + 1}번째 이미지 삭제`}
                                    className="absolute top-3 right-3 text-gray-400 group-hover:text-black hover:text-red-500 rounded-full cursor-pointer flex items-center justify-center"
                                    onClick={() => handleImageDelete(i)}
                                >
                                    <FiTrash2 className='h-10 w-10' />
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>

            <h3 className="flex justify-between">
                <p className="font-semibold"> <span className="text-gray-700">내용</span> <span className="text-red-500">*</span></p>
                <span className={`text-xl ${contentLength > MAX_CONTENT_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                    {contentLength} / {MAX_CONTENT_LENGTH} 글자
                </span>
            </h3>

            {/* 에디터 툴 바 */}
            <EditorMenuBar editor={editor} type={'qna'} />

            {/* 에디터 컨텐츠 작성 창 */}
            <div className="tiptap-editor-container">
                <EditorContent
                    editor={editor}
                    className={`border prose-invert bg-white border-gray-200 rounded-sm ${type === 'question' || type === 'edit-question' ? 'min-h-[200px]' : 'min-h-[120px]'}`}
                />
            </div><div className="flex justify-end mt-10">

                <div className="flex items-center gap-4">
                    {/* 글자 수 표시 */}
                    <span className={`text-xl ${contentLength > MAX_CONTENT_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                        {contentLength} / {MAX_CONTENT_LENGTH} 글자</span>

                    {/*닫기 버튼  */}
                    {onClose && (
                        <button
                            onClick={() => {
                                if (confirm("작성 중인 내용이 있습니다. 정말로 닫으시겠습니까?")) {
                                    onClose()
                                }

                            }}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                            <FiTrash2 />
                            닫기
                        </button>
                    )}

                    {/* 제출 버튼 */}
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={
                            !isFormValid() ||
                            isPending ||
                            contentLength < MIN_CONTENT_LENGTH ||
                            contentLength > MAX_CONTENT_LENGTH ||
                            ((type === 'question' || type === 'edit-question') && (titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH))
                        }
                    >
                        <FiSend />
                        {type === 'question' ? '질문 등록' : type === 'edit-question' ? '질문 수정' : '답변 등록'}
                    </button>
                </div>
            </div>
        </div>
    )

}