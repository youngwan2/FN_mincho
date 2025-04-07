import { useUserStatsGetQuery } from "../../../hooks/queries/useQueryMypage";
import MypageTitle from "./MypageTitle";



// TODO: 로딩 스피너 추가해야 함
export default function MypageAnalytics() {

    const {stats, isLoading, isError, status} = useUserStatsGetQuery();


    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <MypageTitle text="활동 통계"/>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-bold text-green-700">{stats.postCount}</span>
                    <span className="text-2xl text-gray-600">작성 게시글</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-bold text-green-700">{stats.commentCount}</span>
                    <span className="text-2xl text-gray-600">작성 댓글</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-bold text-green-700">{stats.bookmarkCount}</span>
                    <span className="text-2xl text-gray-600">관심 허브</span>
                </div>
            </div>
        </div>
    )
}