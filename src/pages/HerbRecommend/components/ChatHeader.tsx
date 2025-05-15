import { GiHerbsBundle } from "react-icons/gi";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function ChatHeader() {
    return (
        <div className="bg-hover-primary-green text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full">
                    <GiHerbsBundle className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="font-bold text-3xl">약초 추천 서비스</h2>
                    <p className="text-2xl mt-2 text-white/80">자연의 치유력을 경험하세요</p>

                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full cursor-pointer hover:bg-white/30 transition-colors">
                    <IoMdInformationCircleOutline className="w-4 h-4" />
                </div>
            </div>
        </div>
    )
}