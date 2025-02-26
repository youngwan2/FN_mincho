import { MouseEventHandler } from "react";

interface MypageNavigationProps {
    onClickTaps: MouseEventHandler
    tapIndex:number
}

const tabs = [
    { id: "my-posts", label: "내 게시글", active: true },
    { id: "my-comments", label: "내 댓글", active: false },
    { id: "favorite-hub", label: "관심 허브", active: false },
    { id: "my-garden", label: "내 정원", active: false },
];

export default function MypageNavigation({ onClickTaps, tapIndex }: MypageNavigationProps) {


    return (
        <div className="border-b border-gray-200">
            <div className="flex">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={onClickTaps}
                        className={`px-4 py-2 text-lg font-medium ${tab.active
                            ? "border-b-2 border-green-500 text-green-600"
                            : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    )
}