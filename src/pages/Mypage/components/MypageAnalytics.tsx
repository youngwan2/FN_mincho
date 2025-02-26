// interface MypageAnalyticsProps { }

import MypageTitle from "./MypageTitle";



export default function MypageAnalytics() {
    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <MypageTitle text="활동 통계"/>
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-bold text-green-700">15</span>
                    <span className="text-2xl text-gray-600">작성 게시글</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-bold text-green-700">42</span>
                    <span className="text-2xl text-gray-600">작성 댓글</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-bold text-green-700">7</span>
                    <span className="text-2xl text-gray-600">관심 허브</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-bold text-green-700">3</span>
                    <span className="text-2xl text-gray-600">재배 중인 허브</span>
                </div>
            </div>
        </div>
    )
}