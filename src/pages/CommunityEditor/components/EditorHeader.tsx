import { useEffect, useRef } from "react"

interface EditorContentHeaderProps {
    title: string
    category: string
    setTitle: (value: string) => void
    setCategory: (value: string) => void
}
export default function EditorContentHeader({ title, setTitle, category, setCategory }: EditorContentHeaderProps) {

    const selectRef = useRef<HTMLSelectElement>(null);

    console.log(category)

    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.value = category
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

    )
}
