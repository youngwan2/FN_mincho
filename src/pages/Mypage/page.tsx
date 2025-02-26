import MypageAnalytics from "./components/MypageAnalytics";
import MypageContents from "./components/MypageContents";
import MypageHeader from "./components/MypageHeader"
import MypageProfile from "./components/MypageProfile";
import MypageSettings from "./components/MypageSettings";


export default function Mypage() {
    return (
        <div className="bg-white min-h-screen p-6">
            {/* 마이페이지 헤더 */}
            <MypageHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 프로필 섹션 */}
                <MypageProfile />

                {/* 활동 통계 및 게시물 섹션 */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 활동 통계 */}
                    <MypageAnalytics />


                    {/* 콘텐츠 목록 */}
                    <MypageContents />


                    {/* 설정 섹션 */}
                    <MypageSettings />
                </div>
            </div>
        </div>
    );
};

