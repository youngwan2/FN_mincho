import { IoLockClosedOutline, IoPersonRemoveOutline, IoLogOut } from "react-icons/io5";
import { useDeleteUserMutation, useResetPasswordMutation } from "@/hooks/mutations/useMutationMypage";
import { useState } from "react";

import MypageTitle from "./MypageTitle";
import MypagePasswordResetModal from "./MypagePasswordResetModal";


import { UpdatePasswordRequest } from "../../../types/auth.types";
import { logout } from "../../../service/auth.service";


interface MypageSettingProps {
    isSocial: boolean;
}
export default function MypageSettings({ isSocial }: MypageSettingProps) {
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


    const handleLogoutClick = () => {
        if (confirm("정말로 로그아웃 하시겠습니까?")) {
            logout()
        }
    }
    return (
        <div className="rounded-xl p-8 border border-gray-200">
            <MypageTitle text="계정 설정" icon="settings" />

            <div className="space-y-6 mt-8">
                <button
                    className="flex items-center cursor-pointer p-5 py-6 rounded-xl w-full justify-between border border-gray-200 transition-colors"
                    onClick={handleLogoutClick}
                >
                    <span className="text-2xl font-medium text-gray-700 flex items-center">
                        <IoLogOut size={32} className="text-gray-600 mr-4" />
                        로그아웃
                    </span>
                    <span className="px-4 py-1 text-2xl text-gray-600">안전하게 로그아웃하기</span>
                </button>

                {/* 비밀번호 재설정 */}
                {!isSocial ?
                    <button
                        className="flex items-center cursor-pointer p-5 py-6 rounded-xl w-full justify-between border border-green-200 transition-colors"
                        onClick={handlePasswordResetClick}
                    >
                        <span className="text-2xl font-medium text-green-700 flex items-center">
                            <IoLockClosedOutline size={32} className="text-green-600 mr-4" />
                            비밀번호 재설정
                        </span>
                        <span className="px-4 py-1 text-2xl text-green-700">보안 강화하기</span>
                    </button>
                    : null}

                {/* 회원 탈퇴 */}
                <button
                    className="flex items-center cursor-pointer p-5 py-6 rounded-xl w-full justify-between border border-gray-200 transition-colors"
                    onClick={handleDeleteClick}
                >
                    <span className="text-2xl font-medium text-gray-700 flex items-center">
                        <IoPersonRemoveOutline size={32} className="text-gray-600 mr-4" />
                        회원 탈퇴
                    </span>
                    <span className="px-4 py-1 text-2xl text-gray-600">계정 삭제하기</span>
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