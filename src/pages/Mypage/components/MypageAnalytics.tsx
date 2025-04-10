import Skeleton from 'react-loading-skeleton';
import MypageTitle from "./MypageTitle";


interface MypageAnalyticsProps {
    isLoading: boolean
    stats: {
        postCount: number
        commentCount: number
        bookmarkCount: number
    }
}
export default function MypageAnalytics({ isLoading, stats }: MypageAnalyticsProps) {

    const renderStatBox = (value: number | undefined, label: string) => (
        <div className="flex flex-col items-center">
            <span className="text-[16px] font-bold text-green-700">{value}</span>
            <span className="text-2xl text-gray-600">{label}</span>
        </div>
    );

    const renderSkeletonBox = () => (
        <div className="flex flex-col items-center">
            <Skeleton width={40} height={24} />
            <Skeleton width={80} height={28} style={{ marginTop: 8 }} />
        </div>
    );

    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <MypageTitle text="활동 통계" />
            <div className="grid grid-cols-3 gap-4">
                {isLoading ? (
                    <>
                        {renderSkeletonBox()}
                        {renderSkeletonBox()}
                        {renderSkeletonBox()}
                    </>
                ) : (
                    <>
                        {renderStatBox(stats?.postCount, '작성 게시글')}
                        {renderStatBox(stats?.commentCount, '작성 댓글')}
                        {renderStatBox(stats?.bookmarkCount, '관심 허브')}
                    </>
                )}
            </div>
        </div>
    );
}
