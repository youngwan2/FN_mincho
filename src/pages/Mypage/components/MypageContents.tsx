import { useState } from "react";
import MypageNavigation from "./MypageNavigation";
import MypagePost from "./MypagePost";
import MypageComment from "./MypageComment";
import MypageFavoriteHerb from "./MypageFavoriteHerb";


/**TODO: 네비게이션 탭 선택에 따라 글 목록, 댓글 목록, 관심 약초 목록이 렌더링되도록 해야 함  */

interface MypageContents {
    stats:{
        postCount: number
        commentCount: number
        bookmarkCount: number
    }

}
export default function MypageContents({stats}:MypageContents) {
    const [tapIndex, setTapIndex] = useState(0);

    const onClickTaps = (tabIndex: number) => {
        setTapIndex(tabIndex)

    }

    // memo:  enabled 가  false일 때만 쿼리를 비활성화
    return (
        <div className="mt-10">
            {/* 네비게이션 탭 */}
            <MypageNavigation onClickTaps={onClickTaps} tabIndex={tapIndex} />

            {/* 콘텐츠 */}
            {tapIndex === 0
                ? <MypagePost enabled={tapIndex === 0} totalCount={stats.postCount} />
                : tapIndex === 1
                    ? <MypageComment enabled={tapIndex === 1} totalCount={stats.commentCount} />
                    : <MypageFavoriteHerb enabled={tapIndex === 2} totalCount={stats.bookmarkCount} />}

        </div>
    )
}