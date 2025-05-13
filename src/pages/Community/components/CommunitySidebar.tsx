import { useState } from "react"
import { PostStatistics } from "../../../types/post.types"
import useResize from "../../../hooks/useResize"
import { IoListOutline } from "react-icons/io5"
import CommunityMobileSidebar from "./CommunityMobileSidebar"
import CommunityDesktopSidebar from "./CommunityDesktopSidebar"

interface CommunitySidebarProps {
    activeCategory: string
    categoryInfos: PostStatistics[]
    totalItemCount: number
    onClick: (categoryId: string) => void
}

const categoryOrder: { [key: string]: number } = {
    "all": 0,
    "notice": 1,
    "info": 2,
    "free": 3,
    "question": 4,
};

export default function CommunitySidebar({ activeCategory, categoryInfos, onClick, totalItemCount }: CommunitySidebarProps) {

    const [toggle, setToggle] = useState(false);
    const { mobile } = useResize()


    function handleToggle() {
        setToggle(prev => !prev)
    }

    // 렌더링할 때 정렬 먼저
    const sortedCategoryInfos = [...categoryInfos].sort((a, b) => {
        return (categoryOrder[a.category] ?? 999) - (categoryOrder[b.category] ?? 999);
    });


    // "전체" 카테고리 포함
    const mergedCategories = [
        { category: 'all', count: totalItemCount },
        ...sortedCategoryInfos
    ]



    return (
        <>
            {/* 모바일에서만 보이는 메뉴 토글 */}
            <button title="메뉴 아이콘" onClick={handleToggle} className={`${mobile ? 'block' : 'hidden'} fixed left-5 top-1/5 bg-white shadow-md p-2 rounded-xl hover:bg-gray-100 cursor-pointer z-[60]`}><IoListOutline /></button>

            {/* 모바일 전용 사이드바 */}
            <CommunityMobileSidebar onClick={onClick} activeCategory={activeCategory} mergedCategories={mergedCategories} mobile={mobile} active={toggle} />

            {/* 데스크톱 전용 사이드바 */}
            <CommunityDesktopSidebar onClick={onClick} activeCategory={activeCategory} mergedCategories={mergedCategories} mobile={mobile} />


        </>
    )

}