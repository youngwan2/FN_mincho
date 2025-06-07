import { IoClose, IoEllipse } from "react-icons/io5";

export default function ChatConnectStatus() {
    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-2 flex items-center justify-end text-gray-700 border-b border-gray-200">
            {navigator.onLine
                ? <div className="flex items-center gap-1.5 text-[#05D182] text-2xl font-medium">
                    <div className="relative">
                        <IoEllipse className="animate-pulse" />
                        <div className="absolute inset-0 bg-[#05D182]/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                    <span className="text-gray-700">(이용가능)</span>
                </div>
                : <div className="flex items-center gap-1.5 text-red-500 text-2xl font-medium">
                    <IoClose size={20} className="animate-pulse" />
                    <span className="text-gray-700">(이용불가)</span>
                </div>
            }
        </div>
    )
}