// interface pageProps { }

import { useState } from "react";
import CommunityHeader from "./components/CommunityHeader";
import CommunitySidebar from "./components/CommunitySidebar";
import CommunityPost from "./components/CommunityPost";
import CommunityBody from "./components/CommunityBody";





export default function CommunityPage() {



    // 현재 선택된 카테고리 상태
    const [activeCategory, setActiveCategory] = useState<string>('info');

    const onCategoryHandler = (categoryId: string) => {
        setActiveCategory(categoryId)

    }
    return (
        <div className="min-h-screen">
            <div className="mx-auto px-4 py-6">
                {/* 헤더 */}
                <CommunityHeader />

                {/* 게시판 컨테이너 */}
                <CommunityBody>
                    {/* 카테고리 사이드바 */}
                    <CommunitySidebar activeCategory={activeCategory} onClick={onCategoryHandler} />

                    {/* 게시판 내용 */}
                    <CommunityPost activeCategory={activeCategory} />
                </CommunityBody>
            </div>
        </div>
    )
}