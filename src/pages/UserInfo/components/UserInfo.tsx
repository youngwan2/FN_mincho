import { useState } from "react"
import AvatarContainer from "./AvatarContainer"
import UserProfile from "./UserProfile"
import UserPost from "./UserPost"
import { useParams } from "react-router"
import { useProfilePublicGetQuery } from "@/hooks/queries/useQueryProfile"
import UserQna from "./UserQna"
import UserBookmark from "./UserBookmark"


const tabs = ["게시물", "질문답변", "관심약초"]
export default function UserInfo() {

    const [activeTab, setActiveTab] = useState("게시물")

    const { userId } = useParams<{ userId: string }>();
    const { profileInfo, isError, isLoading } = useProfilePublicGetQuery(Number(userId));


    return (
        <div className="min-h-screen">
            {/* 헤더 */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-green-100">
                <div className="w-full mx-auto py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <AvatarContainer avatarUrl={profileInfo.avatarUrl} isLoading={isLoading} />
                            <UserProfile profileInfo={profileInfo} isError={isError} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 탭 */}
            <div className="bg-white/60 backdrop-blur-sm border-b border-green-100">
                <div className="w-full mx-auto">
                    <div className="flex gap-8 px-6 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-3 border-b-3 transition-all duration-200 whitespace-nowrap ${activeTab === tab
                                    ? "border-green-500 text-green-600 font-semibold"
                                    : "border-transparent text-gray-600 hover:text-green-600 hover:border-green-300"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 내용 */}
            <div className="w-full mx-auto py-6">
                {activeTab === "게시물" && <UserPost />}
                {activeTab === "질문답변" && <UserQna />}
                {activeTab === "관심약초" && <UserBookmark />}
            </div>
        </div >
    )
}
