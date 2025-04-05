import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useCreatePostMutation } from "../../../hooks/mutations/useMutationPost";
import { CategoryType, PostRequest } from "../../../types/post.types";


export default function CommunityEditor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const { quill, quillRef } = useQuill({ placeholder: "여러분의 지식을 공유해보세요!" });

    const { mutate: createPostMutate } = useCreatePostMutation();


    // 게시글 등록
    const handleSubmit = async () => {

        if (category === "") {
            alert("카테고리를 선택해주세요")
            return
        }

        const post: PostRequest = {
            title: title,
            contents: content,
            category: category as CategoryType,
        }

        createPostMutate({ post })

    };


    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setContent(quillRef.current.firstChild.innerHTML)
            });

        }
    }, [quill]);

    return (
        <div className="w-full mx-auto py-4 h-[100vh] mt-10 ">
            {/* 제목 */}
            <div>
                <label>제목</label>
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 카테고리 */}
            <div className=" pt-3">
                <label>카테고리</label>
                <select onChange={(e) => setCategory(e.currentTarget.value)} className="w-full p-2 border border-gray-300 rounded">
                    <option defaultChecked value="">=선택=</option>
                    <option value="info">정보공유</option>
                    <option value="free">자유</option>
                    <option value="question">질문&응답</option>
                    <option value="question">질문&응답</option>
                </select>
            </div>


            {/* 내용 */}
            <div className="w-full h-[500px] pt-10">
                <div className="pb-2 flex justify-between items-center">
                    <p>내용</p>
                    <button
                        onClick={handleSubmit}
                        className="cursor-pointer bg-primary-green text-white px-4 py-1 rounded hover:bg-hover-primary-green"
                    >
                        저장하기
                    </button>
                </div>
                <div ref={quillRef} />
            </div>
        </div>
    )
}