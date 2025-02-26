
// interface MypageProfileProps { }

import { Link } from "react-router";

export default function MypageProfile() {
    return (
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">프로필</h2>
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">허브마스터</h3>
            <p className="text-blue-500 mb-4">herb@example.com</p>
            <p className="text-gray-600 text-center mb-4">허브와 약초에 관심이 많은 조보 가드너입니다.</p>
            <Link to={"/users/me/profile-edit"} className="text-gray-600 border border-gray-300 rounded px-4 py-2 text-sm">프로필 수정</Link>
        </div>
    )
}