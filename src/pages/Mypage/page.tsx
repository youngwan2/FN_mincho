import { useEffect } from "react";
import { useUserStatsGetQuery } from "../../hooks/queries/useQueryMypage";
import { useNavigate } from "react-router";
import { useProfileGetQuery } from "../../hooks/queries/useQueryProfile";

import MypageAnalytics from "./components/MypageAnalytics";
import MypageContents from "./components/MypageContents";
import MypageHeader from "./components/MypageHeader"
import MypageProfile from "./components/MypageProfile";
import MypageSettings from "./components/MypageSettings";
import { getToken } from "../../utils/storage";
import useAuth from "@/hooks/useAuth";



export default function Mypage() {
    const isAuth = useAuth();
    const { profileInfo, isError: isProfileError, isLoading: isProfileLoading } = useProfileGetQuery(isAuth);
    const { stats, isLoading } = useUserStatsGetQuery();
    const navigate = useNavigate()

    useEffect(() => {
        if (!getToken()) {
            navigate("/auth/login")
        }
    }, [])


    return (
        <div className="bg-white min-h-screen py-6">
            {/* 마이페이지 헤더 */}
            <MypageHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                {/* 프로필 섹션 */}
                <MypageProfile profileInfo={profileInfo} isLoading={isProfileLoading} isError={isProfileError} />

                {/* 활동 통계 및 게시물 섹션 */}
                <div className="lg:col-span-2 space-y-6">
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

