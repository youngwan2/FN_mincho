import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import QuillEditor from "./QuillEditor";

import { useCreatePostMutation, useUpdatePostMutation } from "../../../hooks/mutations/useMutationPost";
import { CategoryType, PostRequest, PostDetail } from "../../../types/post.types";

interface CommunityEditorProps {
    post?: PostDetail
    formType: "create" | "update" | "detail"
}

export default function CommunityEditor({ post, formType }: CommunityEditorProps) {
    const isDetail = formType === 'detail';

    const [title, setTitle] = useState(post?.title ?? "");
    const [contents, setContents] = useState(post?.contents ?? "");
    const [category, setCategory] = useState(post?.categoryType ?? "");

    const { mutate: createPostMutate, isSuccess: createIsSuccess } = useCreatePostMutation();
    const { mutate: updatePostMutate, isSuccess: updateIsSuccess } = useUpdatePostMutation();
    const navigate = useNavigate();

    const handleSubmit = () => {
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
        } else {
            createPostMutate({ post: newPost });
        }
    };

    useEffect(() => {
        if (createIsSuccess || updateIsSuccess) {
            navigate("/community");
        }
    }, [createIsSuccess, updateIsSuccess]);

    return (
        <div className="w-full mx-auto py-4 mt-5 h-auto">
            {isDetail ? (
                <h2 className="text-4xl font-bold mb-6">{post?.title}</h2>
            ) : (
                <>
                    <div>
                        <label>제목</label>
                        <input
                            type="text"
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="pt-3">
                        <label>카테고리</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.currentTarget.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">=선택=</option>
                            <option value="info">정보공유</option>
                            <option value="free">자유</option>
                            <option value="question">질문&응답</option>
                        </select>
                    </div>
                </>
            )}

            {/* 에디터 */}
            <div>
                {!isDetail && (
                    <div className="pb-2 flex justify-between items-center pt-8">
                        <p>내용</p>
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer bg-primary-green text-white px-4 py-1 rounded hover:bg-hover-primary-green"
                        >
                            저장하기
                        </button>
                    </div>
                )}
                <QuillEditor
                    key={formType} // formType 바뀌면 에디터 리셋됨
                    content={post?.contents}
                    isDetail={isDetail}
                    onChange={setContents}
                />
            </div>
        </div>
    );
}
