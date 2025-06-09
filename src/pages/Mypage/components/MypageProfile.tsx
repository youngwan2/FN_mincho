import { useState } from "react";
import MypageProfileForm from "./MypageProfileForm";
import PrimaryButton from "../../../components/button/PrimaryButton";
import MypageTitle from "./MypageTitle";
import MypageProfileImage from "./MypageProfileImage";
import { useUpdateProfileMutation } from "../../../hooks/mutations/useMutationMypage";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { Profile } from "../../../types/user.types";



interface MypageProfileProps {
    profileInfo: Profile
    isLoading: boolean
    isError: boolean
}
export default function MypageProfile({ profileInfo, isLoading, isError }: MypageProfileProps) {
    const { mutate: profileMutate } = useUpdateProfileMutation()

    const [isOpen, setIsOpen] = useState(false);


    // 폼 생성
    function onOpenForm() {
        setIsOpen(prev => !prev);
    } return (
        <div className="rounded-xl p-8 flex flex-col items-start lg:col-span-1 relative border border-gray-200">
            <MypageTitle text="내 프로필" icon="profile" />

            {/* 프로필 이미지 */}
            <div className="w-full flex justify-center my-4">
                <MypageProfileImage profileImage={profileInfo.avatarUrl} />
            </div>

            {isLoading ? <LoadingSpinner /> : null}
            {isError ? <p className="text-red-500 text-xl mt-4">프로필 정보 조회에 실패하였습니다.</p> : null}
            {isOpen ? (
                // 프로필 수정 폼
                <MypageProfileForm
                    onFormToggle={onOpenForm}
                    profileInfo={profileInfo}
                    profileMutate={profileMutate}
                />

                // 프로필 정보
            ) : (
                <>
                    <h3 className="text-3xl font-semibold text-gray-800 mb-2 mt-6 w-full text-center">{profileInfo?.nickname || "닉네임 없음"}</h3>
                    <div className="rounded-xl p-4 mb-6 border border-gray-100 w-full">
                        <p className="text-2xl text-gray-700 text-start">{profileInfo?.introduction || "설정된 프로필 소개가 없습니다."}</p>
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <PrimaryButton
                            type="button"
                            onClick={onOpenForm}
                            className="text-white px-8 py-3 rounded-xl text-2xl font-medium flex items-center gap-2 z-10 bg-primary-green hover:bg-hover-primary-green"
                        >
                            프로필 수정하기
                        </PrimaryButton>
                    </div>
                </>
            )}
        </div>
    );
}
