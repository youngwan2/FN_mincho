import { useState } from "react"
import { Category } from "@/types/post.types"
import useResize from "@/hooks/useResize"
import { IoListOutline } from "react-icons/io5"
import CommunityMobileSidebar from "./CommunityMobileSidebar"
import CommunityDesktopSidebar from "./CommunityDesktopSidebar"

interface CommunitySidebarProps {
    activeCategoryId: number
    categoryInfos: Category[]
    totalItemCount: number
    onClick: (categoryId: number) => void
}

export default function CommunitySidebar({ activeCategoryId, categoryInfos, onClick }: CommunitySidebarProps) {

    const [toggle, setToggle] = useState(false);
    const { mobile } = useResize()


    function handleToggle() {
        setToggle(prev => !prev)
    }



    return (
        <>
            {/* 모바일에서만 보이는 메뉴 토글 */}
            <button title="메뉴 아이콘" onClick={handleToggle} className={`${mobile ? 'block' : 'hidden'} fixed left-5 top-1/5 bg-white shadow-md p-2 rounded-xl hover:bg-gray-100 cursor-pointer z-[60]`}><IoListOutline /></button>

            {/* 모바일 전용 사이드바 */}
            <CommunityMobileSidebar onClick={onClick} activeCategoryId={activeCategoryId} categoryInfos={categoryInfos} mobile={mobile} active={toggle} />

            {/* 데스크톱 전용 사이드바 */}
            <CommunityDesktopSidebar onClick={onClick} activeCategoryId={activeCategoryId} categoryInfos={categoryInfos} mobile={mobile} />


        </>
    )

}