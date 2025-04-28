import { IoWalk } from "react-icons/io5";

import MypageTitle from "./MypageTitle";
import { useDeleteUserMutation } from "../../../hooks/mutations/useMutationMypage";

export default function MypageSettings() {

    const { mutate: deleteUser } = useDeleteUserMutation();

    const handleDeleteClick = () => {
        if (confirm("정말로 회원 탈퇴하시겠습니까? 탈퇴 후 복구할 수 없습니다.")) {
            deleteUser();
        }
    };
    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <MypageTitle text="설정/보안" />

            <div className="space-y-6 mt-4">
                {/* 알림 설정 */}
                {/* <div className="flex items-center justify-between p-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                        <IoNotificationsOutline size={22} className="text-green-600 mr-3" />
                        <span className="text-2xl font-medium">알림 설정</span>
                    </div>
                    <div className="w-12 h-6 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer">
                        <div className="bg-white w-5 h-5 rounded-full shadow-md transform translate-x-6 transition-transform" />
                    </div>
                </div> */}

                {/* 관심 주제 설정 */}
                {/* <div className="flex items-center justify-between p-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                        <IoHeartOutline size={22} className="text-green-600 mr-3" />
                        <span className="text-2xl font-medium">관심 주제 설정</span>
                    </div>
                    <IoChevronForwardOutline size={20} className="text-gray-400" />
                </div> */}

                {/* 계정 설정 */}
                <div className="flex items-center justify-between p-3">

                    <button className="flex items-center text-gray-700 cursor-pointer border border-red-100 p-2 py-5 rounded-[3px] w-full justify-between hover:bg-red-100" onClick={handleDeleteClick}
                    >
                        <IoWalk size={22} className="text-red-400" />
                        <span className="text-2xl font-medium text-red-400">회원 탈퇴</span>

                    </button>
                </div>
            </div>
        </div>
    );
}
