
interface MypageNavigationProps {
    onClickTaps: (tabIndex:number)=>void
    tabIndex: number
}

const tabs = [
    { id: "my-posts", label: "내 게시글", active: true },
    { id: "my-comments", label: "내 댓글", active: false },
    { id: "favorite-hub", label: "관심 허브", active: false },
];

export default function MypageNavigation({ onClickTaps, tabIndex }: MypageNavigationProps) {


    return (
        <div className="border-b border-gray-200">
            <div className="flex">
                {tabs.map((tab, index) => {
                    return (
                        <button
                            key={tab.id}
                            onClick={()=>onClickTaps(index)}
                            className={`cursor-pointer px-4 py-2 text-2xl font-medium ${tabIndex === index
                                ? "border-b-2 border-green-500 text-green-600"
                                : "text-gray-500"
                                }`}
                        >
                            {tab.label}
                        </button>

                    )
                })}

            </div>
        </div >
    )
}