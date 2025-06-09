
import { GiHerbsBundle } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa';

export default function MypageHeader() {
    return (
        <div className="mb-10">
            <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)] animate-fade-right">
                <FaUser className="text-white mr-2" />
                <span className="bg-[#0ac17b] text-white font-medium">회원정보</span>
            </div>
            <h1 className="flex items-center text-5xl md:text-6xl gap-3 font-bold text-gray-800 mb-4 animate-fade-left">
                <GiHerbsBundle className="text-primary-green" size={48} />
                <span>마이페이지</span>
            </h1>
            <p className="text-[#05D182] text-3xl animate-fade-down">내 약초 활동 관리하기</p>
        </div>
    )
}