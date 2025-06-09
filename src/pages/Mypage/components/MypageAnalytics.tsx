import Skeleton from 'react-loading-skeleton';
import MypageTitle from "./MypageTitle";
import { FaPen, FaComment, FaLeaf } from 'react-icons/fa';

interface MypageAnalyticsProps {
    isLoading: boolean
    stats: {
        postCount: number
        commentCount: number
        bookmarkCount: number
    }
}

export default function MypageAnalytics({ isLoading, stats }: MypageAnalyticsProps) {

    const renderStatBox = (value: number | undefined, label: string, icon: React.ReactNode) => (
        <div className="flex flex-col items-center bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="bg-green-100 rounded-full p-3 mb-3">
                {icon}
            </div>
            <span className="text-4xl font-bold text-green-700 mb-2">{value}</span>
            <span className="text-2xl text-gray-600">{label}</span>
        </div>
    );

    const renderSkeletonBox = () => (
        <div className="flex flex-col items-center bg-white rounded-2xl p-6 border border-gray-100">
            <Skeleton circle width={48} height={48} className="mb-3" />
            <Skeleton width={60} height={40} className="mb-2" />
            <Skeleton width={100} height={24} />
        </div>
    );

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <MypageTitle text="나의 활동 통계" icon="analytics" />
            <div className="grid grid-cols-3 gap-6 mt-8">
                {isLoading ? (
                    <>
                        {renderSkeletonBox()}
                        {renderSkeletonBox()}
                        {renderSkeletonBox()}
                    </>
                ) : (
                    <>
                        {renderStatBox(stats?.postCount, '작성 게시글', <FaPen className="text-green-600" size={20} />)}
                        {renderStatBox(stats?.commentCount, '작성 댓글', <FaComment className="text-green-600" size={20} />)}
                        {renderStatBox(stats?.bookmarkCount, '관심 약초', <FaLeaf className="text-green-600" size={20} />)}
                    </>
                )}
            </div>
        </div>
    );
}
