import { useRef } from "react"
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


const buttonStyle =
    "p-2 rounded hover:bg-gray-200 transition-all duration-150 text-3xl"
const activeStyle = "bg-gray-300"



export default function EditorMenuBar({ editor }: { editor: EditorType | null }) {
    if (!editor) return null
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    // 이미지 첨부
    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }



    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !editor) return

        const reader = new FileReader()
        reader.onload = () => {
            const base64 = reader.result
            if (typeof base64 === "string") {
                editor.chain().focus().setImage({ src: base64 }).run()
            }
        }
        reader.readAsDataURL(file)
    }

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
            <div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className={buttonStyle}
                    title="이미지 업로드"
                >
                    <MdImage />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            {/* 이미지 */}
            <button onClick={addImage}>URL</button>

        </div>
    )
}

export function EditorBubbleMenuBar({ editor }: { editor: EditorType | null }) {

    if (editor == null) return

    return (
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

    )

}
