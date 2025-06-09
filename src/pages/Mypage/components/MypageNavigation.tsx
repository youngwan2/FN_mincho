
import { FaPen, FaComment, FaLeaf } from 'react-icons/fa';

interface MypageNavigationProps {
    onClickTaps: (tabIndex: number) => void
    tabIndex: number
}

const tabs = [
    { id: "my-posts", label: "내 게시글", icon: <FaPen />, active: true },
    { id: "my-comments", label: "내 댓글", icon: <FaComment />, active: false },
    { id: "favorite-hub", label: "관심 약초", icon: <FaLeaf />, active: false },
];

export default function MypageNavigation({ onClickTaps, tabIndex }: MypageNavigationProps) {
    return (
        <div className="border-b border-gray-200">
            <div className="flex">
                {tabs.map((tab, index) => {
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onClickTaps(index)}
                            className={`cursor-pointer px-6 py-3 text-2xl font-medium flex items-center gap-2 transition-colors duration-300 ${tabIndex === index
                                    ? "border-b-2 border-[#05D182] text-[#05D182] bg-green-50"
                                    : "text-gray-600 hover:text-[#05D182] hover:bg-green-50"
                                }`}
                        >
                            <span className={`${tabIndex === index ? "text-[#05D182]" : "text-gray-500"}`}>
                                {tab.icon}
                            </span>
                            {tab.label}
                        </button>
                    )
                })}
            </div>
        </div >
    )
}