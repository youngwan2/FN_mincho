import { IoEye, IoThumbsUp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";

export function CommentSkeleton() {
    return (
        <div className="mt-8">
            <Skeleton height={40} className="mb-4" />
            <div className="space-y-4">
                {Array(3).fill(0).map((_, index) => (
                    <div key={index} className="flex">
                        <Skeleton circle width={32} height={32} className="mr-3" />
                        <div className="flex-1">
                            <Skeleton width={120} className="mb-2" />
                            <Skeleton count={2} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function UserActionSkeleton() {
    return (
        <div className="flex items-center justify-end py-8 mr-5 mb-4">
            <div className="flex items-center space-x-4">
                <div className="flex items-center gap-3 text-gray-600">
                    <IoEye />
                    <span className="text-2xl"><Skeleton width={20} /></span>
                </div>
                <div className="flex items-center text-gray-600">
                    <IoThumbsUp className="mr-2 h-7 w-7" />
                    <span className="text-2xl"><Skeleton width={20} /></span>
                </div>
            </div>
        </div>
    )
}