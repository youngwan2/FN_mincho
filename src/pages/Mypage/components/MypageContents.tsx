// interface MypageContentsProps { }

import { ChangeEvent, MouseEvent, useState } from "react";
import MypageNavigation from "./MypageNavigation";
import MypagePost from "./MypagePost";


/**TODO: 네비게이션 탭 선택에 따라 글 목록, 댓글 목록, 관심 약초 목록이 렌더링되도록 해야 함  */
export default function MypageContents() {
    const [tapIndex, setTapIndex] = useState(0);

    const onClickTaps = (e: MouseEvent<HTMLButtonElement>) => {

        const tapIndex = Number(e.currentTarget.textContent)

        setTapIndex(tapIndex)

    }
    return (
        <div>

            {/* 네비게이션 탭 */}
            <MypageNavigation onClickTaps={onClickTaps} tapIndex={tapIndex} />

            {/* 콘텐츠 */}

            <MypagePost />
            {/* <MypageComment />
            <MypageFavoriteHerb /> */}
        </div>
    )
}