// interface MypageAnalyticsProps { }

export default function MypageAnalytics() {
    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">활동 통계</h2>
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">15</span>
                    <span className="text-lg text-gray-600">작성 게시글</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">42</span>
                    <span className="text-lg text-gray-600">작성 댓글</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">7</span>
                    <span className="text-lg text-gray-600">관심 허브</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">3</span>
                    <span className="text-lg text-gray-600">재배 중인 허브</span>
                </div>
            </div>
        </div>
    )
}