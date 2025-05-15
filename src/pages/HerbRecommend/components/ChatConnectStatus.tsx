import { IoClose, IoEllipse } from "react-icons/io5";

export default function ChatConnectStatus() {
    return (
        <div className="bg-gray-50 px-4 py-2 flex items-center justify-end text-gray-700 border-b border-gray-200">
            {navigator.onLine
                ? <div className="flex items-center text-hover-primary-green text-2xl font-medium animate-pulse"><IoEllipse /> (이용가능) </div>
                : <div className=" flex items-center text-red-400 text-2xl font-medium animate-pulse"> <IoClose size={20} /> (이용불가) </div>
            }
        </div>
    )
}