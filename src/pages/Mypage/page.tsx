import { useUserStatsGetQuery } from "../../hooks/queries/useQueryMypage";
import { useNavigate } from "react-router";
import { useProfileGetQuery } from "../../hooks/queries/useQueryProfile";

import MypageAnalytics from "./components/MypageAnalytics";
import MypageContents from "./components/MypageContents";
import MypageHeader from "./components/MypageHeader"
import MypageProfile from "./components/MypageProfile";
import MypageSettings from "./components/MypageSettings";
import useAuth from "@/hooks/useAuth";
import { FaRegMessage } from "react-icons/fa6";



export default function Mypage() {
    const isAuth = useAuth();
    const { profileInfo, isError: isProfileError, isLoading: isProfileLoading } = useProfileGetQuery(isAuth);
    const { stats, isLoading } = useUserStatsGetQuery();
    const navigate = useNavigate()

    if (!isAuth) {
        return (
            <div className=" min-h-screen flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md mx-4">
                    <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)]">
                        <FaRegMessage className="text-white mr-2" />
                        <span className="text-white font-medium">민초 마이페이지</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">로그인이 필요합니다</h1>
                    <p className="text-2xl mb-8 text-gray-600">마이페이지는 로그인 후에 이용하실 수 있습니다</p>
                    <button
                        onClick={() => navigate("/auth/login")}
                        className="px-8 py-4 bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white text-xl rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
                    >
                        로그인하러 가기
                    </button>
                </div>
            </div>
        )
    } return (
        <div className=" min-h-screen py-8 px-4 md:px-10 lg:px-12 pb-10">

            {/* 마이페이지 헤더 */}
            <MypageHeader />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* 프로필 섹션 */}
                <div>
                    <MypageProfile profileInfo={profileInfo} isLoading={isProfileLoading} isError={isProfileError} />
                </div>

                {/* 활동 통계 및 게시물 섹션 */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 활동 통계 */}
                    <MypageAnalytics stats={stats} isLoading={isLoading} />

                    {/* 콘텐츠 목록 */}
                    <MypageContents stats={stats} />

                    {/* 설정 섹션 */}
                    <MypageSettings isSocial={profileInfo.isSocial || false} />
                </div>
            </div>
        </div>
    );
};

