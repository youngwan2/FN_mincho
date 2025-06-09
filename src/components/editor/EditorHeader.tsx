import { KeyboardEvent, useEffect, useRef } from "react"
import { Category } from "../../types/post.types";



interface EditorContentHeaderProps {
    title: string
    category: Category | string
    postCategories: { id: number, name: string, type: string, description: string, count: number }[]
    tags: string[]
    setTitle: (value: string) => void
    setCategory: (value: string) => void
    setTags: (tags: string[]) => void
}
export default function EditorContentHeader({ tags, setTags, title, setTitle, category, setCategory, postCategories }: EditorContentHeaderProps) {



    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const categoryType = typeof category !== 'string' ? category.type : category;


    // 태그 추가
    function handleTagInput(e: KeyboardEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;

        if (e.code === 'Space' || e.code === 'Enter') {
            if (tags.includes(value.trim())) {
                alert("이미 존재하는 태그입니다.");
                return;
            }

            if (value.trim()) {
                const newTag = value.trim();
                setTags([...tags, newTag]);
                // 입력 필드 초기화
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            }
        } else {
            if (e.code === 'Backspace' && value === '' && tags.length > 0) {
                // 마지막 태그 삭제
                setTags([...tags].slice(0, -1));
            }
        }
    }

    //태그 삭제
    function handleRemoveTag(index: number) {
        setTags([...tags].filter((_, i) => i !== index))
    }


    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.value = categoryType
        }
    }, [])
    return (
        <>
            <div className="mb-12">
                <label className="font-semibold">제목
                    <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    className="bg-white w-full mb-4 px-4 py-4 border border-gray-300 rounded-2xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-12">
                <label className="font-semibold">카테고리
                    <span className="text-red-400">*</span>

                </label>
                <select
                    ref={selectRef}
                    value={categoryType ?? postCategories[0].type}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                    className="bg-white w-full mb-4 px-4 py-5 border border-gray-300 rounded-2xl"
                >
                    <option value="" disabled>카테고리를 선택하세요</option>
                    {postCategories.map(category => {
                        if (category.type === 'NOTICE') return null; // ALL 카테고리는 제외
                        return (
                            <option key={category.id} value={category.type}>
                                {category.name} ({category.description})
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="mb-12 flex flex-col items-start">
                <label className="font-semibold">태그</label>

                <div className="flex">
                    <div>
                        {tags.map((tag, index) => {
                            return (
                                <div className="inline-block items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 mr-2 mb-2" key={index}>
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(index)}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )

                        })}
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        className="py-1 px-3"
                        placeholder="태그 입력 (스페이스, 엔터로 추가)"
                        onKeyUp={handleTagInput} />
                </div>
            </div>
        </>

    )
}
