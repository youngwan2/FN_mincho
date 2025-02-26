interface MypageProfileFormProps {
    formData: ProfileFormData
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>
    onOpenForm: () => void
    errors: ProfileFormData
    setErrors: React.Dispatch<React.SetStateAction<ProfileFormData>>
}

import { FormEvent } from "react";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { ProfileFormData } from "../../../types/mypage.types";

export default function MypageProfileForm({ setIsOpen, setFormData, formData, setErrors, errors, onOpenForm }: MypageProfileFormProps) {


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }


    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        let newErrors = { nickname: "", description: "" };

        if (!formData.nickname) {
            newErrors.nickname = "닉네임을 입력해주세요.";
        } else if (formData.nickname.length < 3) {
            newErrors.nickname = "닉네임은 최소 3글자 이상이어야 합니다.";
        }

        if (!formData.description) {
            newErrors.description = "소개를 입력해주세요.";
        } else if (formData.description.length < 10) {
            newErrors.description = "소개는 최소 10글자 이상이어야 합니다.";
        }

        setErrors(newErrors);

        if (!newErrors.nickname && !newErrors.description) {
            setIsOpen(false); // 수정 완료 후 닫기
        }
    }
    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="block text-gray-700 text-xl font-semibold mb-1">닉네임</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-gray-700 text-xl"
                />
                {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
            </div>

            <div className="mb-3 mt-5">
                <label className="block text-gray-700 text-xl font-semibold mb-1">소개</label>
                <textarea
                    rows={300}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-gray-700 h-20 text-xl resize-none h-[30vh]"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="flex justify-between">
                <PrimaryButton
                    type="button"
                    onClick={onOpenForm}
                    className=" border border-gray-300 rounded bg-white text-gray-600"
                >
                    취소
                </PrimaryButton>

                <PrimaryButton
                    type="submit"
                    className=" bg-primary-green hover:bg-hover-primary-green text-white"
                >
                    저장
                </PrimaryButton>
            </div>
        </form>
    )
}