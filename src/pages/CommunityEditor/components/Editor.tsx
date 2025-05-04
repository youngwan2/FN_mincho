import { useCreatePostMutation, useUpdatePostMutation } from '../../../hooks/mutations/useMutationPost'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import { useEditor, EditorContent } from '@tiptap/react'
import Typography from '@tiptap/extension-typography'

import { CategoryType, PostDetail, PostRequest } from '../../../types/post.types'
import EditorMenuBar, { EditorBubbleMenuBar } from './EditorMenuBar'
import EditorContentHeader from './EditorHeader'
import useAuth from '../../../hooks/useAuth'
import { showToast } from '../../../components/toast/CustomToast'


interface EditorProps {
    post?: PostDetail
    formType: "create" | "update" | "detail"
}

export default function Editor({ post, formType }: EditorProps) {

    const isLogin = useAuth();

    const [title, setTitle] = useState(post?.title ?? "");
    const [contents, setContents] = useState(post?.contents ?? "");
    const [category, setCategory] = useState(post?.categoryType ?? "");


    const { mutate: createPostMutate, isSuccess: createIsSuccess } = useCreatePostMutation();
    const { mutate: updatePostMutate, isSuccess: updateIsSuccess } = useUpdatePostMutation();

    const navigate = useNavigate();


    // 에디터 초기화
    const editor = useEditor({
        editable: formType !== "detail", // update, create 일 때만 수정 활성화
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Typography,
            Highlight,
            Document,
            Paragraph,
            Text,
            Image,
            Dropcursor,
        ],
        content: `
        <p>Click the button to upload an image.</p>
        `,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setContents(html)
        },
    })



    // 게시글 등록
    function handleSubmit() {
        if (!category) {
            alert("카테고리를 선택해주세요");
            return;
        }

        const newPost: PostRequest = {
            title,
            contents,
            category: category as CategoryType,
        };

        if (formType === "update" && post) {
            updatePostMutate({ postId: post.id, post: newPost });
        }

        if (formType === "create") {
            createPostMutate({ post: newPost });
        }
    }

    useEffect(() => {
        if (createIsSuccess || updateIsSuccess) {
            navigate("/community");
        }
    }, [createIsSuccess, updateIsSuccess]);


    useEffect(() => {
        if ((formType === "create" || formType === "update") && !isLogin) {
            showToast.info("로그인 후 이용 가능합니다. 로그인 페이지로 이동합니다.")

            const timeId = setTimeout(() => {
                navigate("/auth/login")
            }, 2000)

            return () => {
                clearTimeout(timeId);
            }
        }
    }, [])



    if (formType === 'detail') {
        return <section>
            <h2 className="text-4xl font-bold mb-6">{post?.title}</h2>
            <EditorContent editor={editor} className='bg-white border border-gray-200 rounded-sm  min-h-[350px]' height={350} />
        </section>
    }

    return (
        <section className='w-full h-full'>

            {/* 컨텐츠 헤더 */}
            <EditorContentHeader title={title} category={category} setTitle={setTitle} setCategory={setCategory} />

            {/* 에디터 툴 - 떠 있는 도구 */}
            {editor && <EditorBubbleMenuBar editor={editor} />}


            <div>
                <div className="pb-2 flex justify-between items-center pt-8">
                    <p>내용</p>
                    <button
                        onClick={handleSubmit}
                        className="cursor-pointer bg-primary-green text-white px-4 py-1 rounded hover:bg-hover-primary-green"
                    >
                        저장하기
                    </button>
                </div>

                {/* 에디터 툴 - 고정된 도구 */}
                <EditorMenuBar editor={editor} />

                <EditorContent onClick={() => {
                    editor?.commands.focus();

                }} editor={editor} className='prose-invert bg-white border border-gray-200 rounded-sm  min-h-[350px]' height={350} />
            </div>
        </section>
    )
}




