import { FormEvent, useState } from "react";
import { UpdatePasswordRequest } from "../../../types/auth.types";
import { IoInformation, IoLockOpen } from "react-icons/io5";


interface PasswordResetModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: ({ currentPassword, newPassword }: UpdatePasswordRequest) => void
}

// 비밀번호 재설정 모달 컴포넌트
export default function MypagePasswordResetModal({ isOpen, onClose, onSubmit }: PasswordResetModalProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // 비밀번호 유효성 검사
        if (newPassword.length < 8) {
            setError("비밀번호는 8자 이상이어야 합니다.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        const updatePasswordData: UpdatePasswordRequest = {
            currentPassword,
            newPassword
        }

        onSubmit(updatePasswordData);
        onClose();
    };

    return (
        <div aria-hidden={isOpen ? 'false' : 'true'} className={`${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 transition-all`}>
            <div className="bg-white rounded-lg px-8 py-10 w-full  max-w-[768px]">
                <div className=" mb-8 ">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><IoLockOpen className="h-8 w-8 text-primary-green" /> 비밀번호 재설정</h2>
                    <p className="justify-end text-gray-700 mt-1 pl-10 flex items-center gap-2"><IoInformation className="bg-primary-green rounded-full text-white" /> 보안을 위해 비밀번호 변경 시, 재로그인 해야 합니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div >
                        <label className="block text-2xl font-medium text-gray-700 mb-1">현재 비밀번호</label>
                        <input
                            type="password"
                            value={currentPassword}
                            placeholder="변경 전 비밀번호"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-2xl font-medium text-gray-700 mb-1">새 비밀번호</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="특수문자 1개 이상 포함 8자 이상 15자 이하"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-2xl font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호 재확인"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-2xl">{error}</p>}

                    <div className="flex justify-end space-x-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary-green text-white rounded-md hover:bg-green-700"
                        >
                            변경하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
