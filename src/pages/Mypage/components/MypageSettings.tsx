import { IoWalk, IoLockClosed } from "react-icons/io5";

import MypageTitle from "./MypageTitle";
import MypagePasswordResetModal from "./MypagePasswordResetModal";
import { useDeleteUserMutation, useResetPasswordMutation } from "../../../hooks/mutations/useMutationMypage";
import { useState } from "react";

import { UpdatePasswordRequest } from "../../../types/auth.types";


export default function MypageSettings() {
    const { mutate: deleteUser } = useDeleteUserMutation();
    const { mutate: resetPassword } = useResetPasswordMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        if (confirm("정말로 회원 탈퇴하시겠습니까? 탈퇴 후 복구할 수 없습니다.")) {
            deleteUser();
        }
    };

    const handlePasswordResetClick = () => {
        setIsModalOpen(true);
    };

    const handlePasswordSubmit = (passwordData: UpdatePasswordRequest) => {
        resetPassword(passwordData);
    };

    return (
        <div className="bg-gray-50 rounded-lg p-6">
            <MypageTitle text="설정/보안" />

            <div className="space-y-6 mt-4">
                {/* 비밀번호 재설정 */}
                <button
                    className="flex items-center text-gray-700 cursor-pointer border border-green-100 p-2 py-5 rounded-[3px] w-full justify-between hover:bg-green-100"
                    onClick={handlePasswordResetClick}
                >
                    <span className="text-2xl font-medium text-green-600">비밀번호 재설정</span>
                    <IoLockClosed size={22} className="text-green-600" />
                </button>

                {/* 회원 탈퇴 */}
                <button
                    className="flex items-center text-gray-700 cursor-pointer border border-red-100 p-2 py-5 rounded-[3px] w-full justify-between hover:bg-red-100"
                    onClick={handleDeleteClick}
                >
                    <span className="text-2xl font-medium text-red-400">회원 탈퇴</span>
                    <IoWalk size={22} className="text-red-400" />
                </button>
            </div>

            {/* 비밀번호 재설정 모달 */}
            <MypagePasswordResetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handlePasswordSubmit}
            />
        </div>
    );
}