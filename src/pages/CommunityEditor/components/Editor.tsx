import { useCreatePostMutation, useUpdatePostMutation } from '../../../hooks/mutations/useMutationPost'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import ImageResize from 'tiptap-extension-resize-image';
import { useEditor, EditorContent } from '@tiptap/react'

import { CategoryType, PostDetail, PostRequest } from '../../../types/post.types'
import EditorMenuBar from './EditorMenuBar'
import EditorContentHeader from './EditorHeader'
import { useAuth } from '../../../store/loginState'


interface EditorProps {
    post?: PostDetail
    formType: "create" | "update" | "detail"
}

export default function Editor({ post, formType }: EditorProps) {

    const { isLogin } = useAuth();

    const [title, setTitle] = useState(post?.title ?? "");
    const [contents, setContents] = useState(post?.contents ?? "");
    const [category, setCategory] = useState(post?.category.type ?? "");


    const { mutate: createPostMutate, isSuccess: createIsSuccess } = useCreatePostMutation();
    const { mutate: updatePostMutate, isSuccess: updateIsSuccess } = useUpdatePostMutation();

    const navigate = useNavigate();


    // 에디터 초기화
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageResize,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
        ],
        content: post?.contents,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setContents(html)
        }
    }, [])


    // 게시글 등록
    function handleSubmit() {
        if (!category) {
            alert("카테고리를 선택해주세요");
            return;
        }

        const newPost: PostRequest = {
            title,
            contents,
            categoryType: category as CategoryType,
        };

        if (formType === "update" && post) {
            updatePostMutate({ postId: post.id, post: newPost });
        }

        if (formType === "create") {
            createPostMutate({ post: newPost });
        }
    }


    useEffect(() => {
        if (editor) {
            editor.setEditable(formType !== 'detail');
        }
    }, [formType, editor]);


    useEffect(() => {
        if (createIsSuccess || updateIsSuccess) {
            navigate("/community");
        }
    }, [createIsSuccess, updateIsSuccess]);


    if (editor == null) return

    return (
        <section className='w-full h-full'>
            {/* 컨텐츠 헤더 */}
            {formType !== 'detail' ? <EditorContentHeader title={title} category={category} setTitle={setTitle} setCategory={setCategory} />
                : <h2 className='md:text-5xl text-4xl border-b border-gray-100 pb-5 mt-8 font-bold'>
                    {post?.title}
                </h2>
            }

            <div>
                {formType !== 'detail' &&
                    <div className="pb-2 flex justify-between items-center pt-8">
                        <p>내용</p>
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer bg-primary-green text-white px-4 py-1 rounded hover:bg-hover-primary-green"
                        >
                            저장하기
                        </button>
                    </div>}


                {/* 에디터 툴 - 고정된 도구 */}
                {formType !== 'detail' && <EditorMenuBar editor={editor} />}
                <EditorContent editor={editor} className={`${formType === 'detail' ? 'border-0' : 'border'} prose-invert bg-white  border-gray-200 rounded-sm  min-h-[350px]`} height={350} />
            </div>
        </section>
    )
}
