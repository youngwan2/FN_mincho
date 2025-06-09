import { useState } from "react";
import MypageNavigation from "./MypageNavigation";
import MypagePost from "./MypagePost";
import MypageComment from "./MypageComment";
import MypageFavoriteHerb from "./MypageFavoriteHerb";
import MypageTitle from "./MypageTitle";

interface MypageContents {
    stats: {
        postCount: number;
        commentCount: number;
        bookmarkCount: number;
    };
}

export default function MypageContents({ stats }: MypageContents) {
    const [tapIndex, setTapIndex] = useState(0);

    const onClickTaps = (tabIndex: number) => {
        setTapIndex(tabIndex);
    };

    // 각 탭에 맞는 콘텐츠 컴포넌트를 배열로 관리
    const tabContents = [
        <MypagePost enabled={tapIndex === 0} totalCount={stats?.postCount} />,
        <MypageComment enabled={tapIndex === 1} totalCount={stats?.commentCount} />,
        <MypageFavoriteHerb enabled={tapIndex === 2} totalCount={stats?.bookmarkCount} />,
    ];

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <MypageTitle text="내 컨텐츠 관리" icon="contents" />

            <div className="mt-6 min-h-[300px]">
                {/* 네비게이션 탭 */}
                <MypageNavigation onClickTaps={onClickTaps} tabIndex={tapIndex} />

                {/* 선택된 탭에 맞는 콘텐츠 렌더링 */}
                <div className="py-4">
                    {tabContents[tapIndex]}
                </div>
            </div>
        </div>
    );
}
