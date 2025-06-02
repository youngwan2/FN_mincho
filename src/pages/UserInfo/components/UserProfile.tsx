import Skeleton from "react-loading-skeleton";

interface UserProfileProps {
    isLoading: boolean;
    isError: boolean;
    profileInfo?: {
        nickname?: string;
        introduction?: string;
    };
}
export default function UserProfile({ isLoading, isError, profileInfo }: UserProfileProps) {

    if (isLoading) {
        return (
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-800"><Skeleton width={80} /></h1>
                </div>
                <div className="flex items-center gap-4 text-2xl text-gray-500">
                    <div className="flex items-center gap-3">
                        <p><Skeleton width={200} /></p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-8 text-center text-red-500">
                사용자 정보를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-800">{profileInfo?.nickname ?? '익명'}</h1>
            </div>
            <div className="flex items-center gap-4 text-2xl text-gray-500">
                <div className="flex items-center gap-3">
                    <p>{profileInfo?.introduction || "소개 내용이 없습니다."}</p>
                </div>
            </div>
        </div>
    );
}