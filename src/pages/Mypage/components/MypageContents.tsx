// interface MypageContentsProps { }

import { useState } from "react";
import MypageNavigation from "./MypageNavigation";
import MypagePost from "./MypagePost";
import MypageComment from "./MypageComment";
import MypageFavoriteHerb from "./MypageFavoriteHerb";


/**TODO: 네비게이션 탭 선택에 따라 글 목록, 댓글 목록, 관심 약초 목록이 렌더링되도록 해야 함  */
export default function MypageContents() {
    const [tapIndex, setTapIndex] = useState(0);

    const onClickTaps = (tabIndex: number) => {
        setTapIndex(tabIndex)

    }
    return (
        <div>
            {/* 네비게이션 탭 */}
            <MypageNavigation onClickTaps={onClickTaps} tabIndex={tapIndex} />

            {/* 콘텐츠 */}
            {tapIndex === 0 ? <MypagePost /> : tapIndex === 1 ? <MypageComment /> : <MypageFavoriteHerb />}

        </div>
    )
}