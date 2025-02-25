import { IoShareOutline, IoHeart, IoHeartOutline, IoBookmarkOutline, IoBookmark } from "react-icons/io5";


// interface InteractionPanelProps { }


export default function InteractionPanel() {
    return (
        <div className="flex gap-3 p-2 mt-5">
            <button title="좋아요" className="text-3xl flex items-center mr-2"><IoHeartOutline/><span>0</span> </button>
            <button title="공유하기" className="text-3xl flex items-center mr-2"><IoShareOutline/><span>0</span> </button>
            <button title="즐겨찾기" className="text-3xl flex items-center mr-2"><IoBookmarkOutline/><span>0</span></button>
        </div>
    )
}