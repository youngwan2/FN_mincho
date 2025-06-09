interface MypageProfileFormProps {
    profileInfo: Profile
    onFormToggle: () => void
    profileMutate: UseMutateFunction<any, Error, Profile, unknown>
}

import { FormEvent, useState } from "react";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Profile } from "../../../types/user.types"
import { profileFormValidateField } from "../../../utils/validator";
import { UseMutateFunction } from "@tanstack/react-query";

export default function MypageProfileForm({ profileInfo, onFormToggle, profileMutate }: MypageProfileFormProps) {

    const [newProfileInfo, setNewProfileInfo] = useState({
        nickname: profileInfo.nickname ?? '',
        introduction: profileInfo.introduction ?? '',
    })

    const [formErrors, setFormErrors] = useState({
        nickname: '',
        introduction: ''
    })

    // 사용자 입력값 처리
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;

        setNewProfileInfo(prev => ({
            ...prev,
            [name]: value
        }));

        setFormErrors(prev => ({
            ...prev,
            ...profileFormValidateField(name, value)
        }));
    }

    // 사용자 프로필 서버 전송
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        profileMutate(newProfileInfo)
        onFormToggle();

    }

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="block text-gray-700 text-2xl font-semibold mb-1">닉네임</label>
                <input
                    type="text"
                    name="nickname"
                    defaultValue={profileInfo.nickname || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 text-2xl focus:outline-hover-primary-green"
                />
                {profileInfo.nickname && <p className="text-red-500 text-sm">{formErrors.nickname}</p>}
            </div>

            <div className="mb-3 mt-5">
                <label className="block text-gray-700 text-2xl font-semibold mb-1">소개</label>
                <textarea
                    rows={300}
                    name="introduction"
                    defaultValue={profileInfo.introduction || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 text-2xl resize-none h-[30vh] focus:outline-hover-primary-green"
                />
                {profileInfo.introduction && <p className="text-red-500 text-sm">{formErrors.introduction}</p>}
            </div>

            <div className="flex justify-between">
                <PrimaryButton
                    type="button"
                    onClick={onFormToggle}
                    className=" border border-gray-300 rounded bg-white text-gray-600 text-2xl"
                >
                    취소
                </PrimaryButton>

                <PrimaryButton
                    type="submit"
                    className=" bg-primary-green hover:bg-hover-primary-green text-white text-2xl"
                >
                    저장
                </PrimaryButton>
            </div>
        </form>
    )
}