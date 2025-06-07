import { GiHerbsBundle } from "react-icons/gi";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface ChatHeaderProps {
    onToggleInfoModal?: () => void;
}

export default function ChatHeader({ onToggleInfoModal }: ChatHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full shadow-inner flex items-center justify-center">
                    <GiHerbsBundle className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="font-bold text-3xl tracking-tight">약초 추천 서비스</h2>
                    <p className="text-2xl mt-1 text-white/90 font-light">자연의 치유력을 경험하세요</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onToggleInfoModal}
                    className="bg-white/20 py-2 px-4 rounded-full cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-inner flex gap-2 items-center"
                >
                    <IoMdInformationCircleOutline className="w-8 h-8" />
                    <span>서비스 안내</span>
                </button>
            </div>
        </div>
    )
}