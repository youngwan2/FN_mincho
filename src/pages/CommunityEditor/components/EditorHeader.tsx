import { useEffect, useRef } from "react"
import { Category } from "../../../types/post.types";

const postCategories = [
    {
        id: 2,
        name: "일상 이야기",
        type: "DAILY",
        description: "약초와 관련된 일상, 소소한 이야기, 자유 수다",
        count: 0
    },
    {
        id: 3,
        name: "약초 경험담",
        type: "EXPERIENCE",
        description: "복용 후 효과, 부작용, 민간요법 등의 실제 경험 공유",
        count: 0
    },
    {
        id: 4,
        name: "정보 공유",
        type: "INFO",
        description: "책, 방송, 기사, 유튜브 등에서 얻은 약초 관련 정보 공유",
        count: 0
    },
    {
        id: 5,
        name: "채집/재배 팁",
        type: "CULTIVATION",
        description: "직접 채집한 경험, 재배 방법, 계절별 관리 팁 공유",
        count: 0
    },
    {
        id: 6,
        name: "부작용/주의사항",
        type: "CAUTION",
        description: "복용 후 부작용 사례, 주의해야 할 약초 공유",
        count: 0
    },
    {
        id: 7,
        name: "이벤트/모임",
        type: "EVENT",
        description: "오프라인 약초 모임, 산행 정보, 커뮤니티 이벤트 등",
        count: 0
    },
    {
        id: 8,
        name: "자유 주제",
        type: "ETC",
        description: "기타 카테고리에 속하지 않는 이야기들",
        count: 0
    }
];


interface EditorContentHeaderProps {
    title: string
    category: Category | string
    setTitle: (value: string) => void
    setCategory: (value: string) => void
}
export default function EditorContentHeader({ title, setTitle, category, setCategory }: EditorContentHeaderProps) {

    const selectRef = useRef<HTMLSelectElement>(null);
    const categoryType = typeof category !== 'string' ? category.type : ''
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
