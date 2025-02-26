import { useState } from "react";
import MypageProfileForm from "./MypageProfileForm";
import PrimaryButton from "../../../components/button/PrimaryButton";
import MypageTitle from "./MyPageTitle";


export default function MypageProfile() {

    const [errors, setErrors] = useState({
        nickname: "",
        description: ""
    });

    const [formData, setFormData] = useState({
        nickname: "허브마스터",
        description: "허브와 약초에 관심이 많은 조보 가드너입니다."
    });



    const [isOpen, setIsOpen] = useState(false);


    function onOpenForm() {
        setIsOpen(prev => !prev);
        setErrors({ nickname: "", description: "" }); // 에러 초기화

    }

    return (
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-start lg:col-span-1">
            <MypageTitle text="프로필"/>

            {/* 프로필 이미지 */}
            <div className="w-full flex justify-center">
                <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
            </div>

            {isOpen ? (
                // 프로필 수정 폼
                <MypageProfileForm
                    setFormData={setFormData}
                    setErrors={setErrors}
                    setIsOpen={setIsOpen}
                    onOpenForm={onOpenForm}
                    formData={formData}
                    errors={errors}
                />

                // 프로필 정보
            ) : (
                <>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-1 mt-10">{formData.nickname}</h3>
                    <p className="text-gray-600 text-center mb-4">{formData.description}</p>
                    <PrimaryButton
                        type="button"
                        onClick={onOpenForm}
                        className="text-gray-600 border border-gray-300 rounded px-4 py-2 text-xl hover:bg-primary-light-gray"
                    >
                        프로필 수정
                    </PrimaryButton>
                </>
            )}
        </div>
    );
}
