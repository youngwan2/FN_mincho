import { useEffect, useRef } from "react"
import { Category } from "../../types/post.types";



interface EditorContentHeaderProps {
    title: string
    category: Category | string
    postCategories: { id: number, name: string, type: string, description: string, count: number }[]
    setTitle: (value: string) => void
    setCategory: (value: string) => void
}
export default function EditorContentHeader({ title, setTitle, category, setCategory, postCategories }: EditorContentHeaderProps) {

    const selectRef = useRef<HTMLSelectElement>(null);
    const categoryType = typeof category !== 'string' ? category.type : category;
    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.value = categoryType
        }
    }, [])
    return (
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
                    ref={selectRef}
                    value={categoryType ?? postCategories[0].type}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                    className="w-full p-2 border border-gray-300 rounded"
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
        </>

    )
}
