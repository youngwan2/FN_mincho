import { useRef, useState } from "react"
import {
    CiTextAlignLeft,
    CiTextAlignCenter,
    CiTextAlignRight,
    CiTextAlignJustify,
} from "react-icons/ci"
import { BubbleMenu, Editor as EditorType } from '@tiptap/react'
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu"
import { FaBold, FaItalic, FaStrikethrough, FaHighlighter } from "react-icons/fa"
import { MdImage } from 'react-icons/md'
import { IoImage } from "react-icons/io5"
import { generatePresignedUrl } from "../../service/post.service"
import axios, { AxiosError } from "axios"


const buttonStyle =
    "p-2 rounded hover:bg-gray-200 transition-all duration-150 text-3xl"
const activeStyle = "bg-gray-300"



export default function EditorMenuBar({ editor, type }: { editor: EditorType | null, type?: "qna" | "post" }) {
    if (!editor) return null
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [__, setIsUpload] = useState(false)
    const [_, setProgress] = useState(0);

    // 이미지 첨부
    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }


    // 이미지 업로드
    // axios config reference: https://github.com/axios/axios?tab=readme-ov-file#example
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUpload(true)
        const file = e.target.files?.[0];
        if (!file || !editor) return;

        // // 미리보기
        // const preview = URL.createObjectURL(file);
        // editor.chain().focus().setImage({ src: preview }).run();

        // FormData로 파일 자체 전달(프리사인드 URL 요청)
        const formData = new FormData();
        formData.append('file', file);

        const presignedUrl = await generatePresignedUrl(formData)

        if (!presignedUrl) {
            return
        }

        // presigned URL로 S3 직접 업로드
        try {
            const response = await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.progress) {
                        setProgress(Number((progressEvent.progress * 100).toFixed(2))) // 업로드 진행률 추적
                        console.log("업로드 진행률:", progressEvent.progress)
                    }
                }
            })

            // 최종 이미지 URL 삽입
            if (response.status > 199 && response.status < 400) {
                const imageUrl = presignedUrl.split('?')[0];
                editor.chain().focus().setImage({ src: imageUrl }).run();
            } else {
                throw new AxiosError("이미지 업로드 실패")
            }
        } catch (error) {
            console.error(error)
            alert("이미지 업로드 실패")

        } finally {
            setIsUpload(false)
        }
    };

    return (
        <div className="w-full border border-gray-200 rounded-md px-3 py-2 mt-8 flex flex-wrap gap-2 items-center bg-white">
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${buttonStyle} ${editor.isActive("heading", { level: 1 }) ? activeStyle : ""}`}
                title="제목1"
            >
                <LuHeading1 />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${buttonStyle} ${editor.isActive("heading", { level: 2 }) ? activeStyle : ""}`}
                title="제목2"
            >
                <LuHeading2 />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`${buttonStyle} ${editor.isActive("heading", { level: 3 }) ? activeStyle : ""}`}
                title="제목3"
            >
                <LuHeading3 />
            </button>


            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${buttonStyle} ${editor.isActive("bold") ? activeStyle : ""}`}
                title="Bold(글자 굵게)"
            >
                <FaBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${buttonStyle} ${editor.isActive("italic") ? activeStyle : ""}`}
                title="Italic(글자 기울이기)"
            >
                <FaItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`${buttonStyle} ${editor.isActive("strike") ? activeStyle : ""}`}
                title="Strike(중간에 줄긋기)"
            >
                <FaStrikethrough />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={`${buttonStyle} ${editor.isActive("highlight") ? activeStyle : ""}`}
                title="Highlight(텍스트 강조하기)"
            >
                <FaHighlighter />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={`${buttonStyle} ${editor.isActive({ textAlign: "left" }) ? activeStyle : ""}`}
                title="Align Left"
            >
                <CiTextAlignLeft />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className={`${buttonStyle} ${editor.isActive({ textAlign: "center" }) ? activeStyle : ""}`}
                title="Align Center"
            >
                <CiTextAlignCenter />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className={`${buttonStyle} ${editor.isActive({ textAlign: "right" }) ? activeStyle : ""}`}
                title="Align Right"
            >
                <CiTextAlignRight />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                className={`${buttonStyle} ${editor.isActive({ textAlign: "justify" }) ? activeStyle : ""}`}
                title="Justify"
            >
                <CiTextAlignJustify />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* 이미지 업로드1 */}
            {type !== "qna" && (
                <div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={buttonStyle}
                        title="이미지 업로드"
                    >
                        <MdImage />
                    </button>
                    <input
                        multiple={true}
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            )}

            {/* 이미지 업로드2 */}
            {type !== "qna" && <button className="flex items-center justify-center flex-col hover:bg-gray-200 p-1 px-2" onClick={addImage}><IoImage /> <span className="text-lg">URL</span> </button>}


            <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
                <div className='border border-gray-300 bg-white shadow-md'>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`${buttonStyle} ${editor.isActive("bold") ? activeStyle : ""}`}
                        title="Bold(글자 굵게)"
                    >
                        <FaBold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`${buttonStyle} ${editor.isActive("italic") ? activeStyle : ""}`}
                        title="Italic(글자 기울이기)"
                    >
                        <FaItalic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`${buttonStyle} ${editor.isActive("strike") ? activeStyle : ""}`}
                        title="Strike(중간에 줄긋기)"
                    >
                        <FaStrikethrough />
                    </button>
                </div>
            </BubbleMenu>
        </div >
    )
}

