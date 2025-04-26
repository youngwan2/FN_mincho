import { useState } from "react";
import MypageProfileForm from "./MypageProfileForm";
import PrimaryButton from "../../../components/button/PrimaryButton";
import MypageTitle from "./MypageTitle";
import { useProfileGetQuery } from "../../../hooks/queries/useQueryProfile";
import MypageProfileImage from "./MypageProfileImage";
import { useUpdateProfileMutation } from "../../../hooks/mutations/useMutationMypage";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";


export default function MypageProfile() {

    const { profileInfo, isError, isLoading } = useProfileGetQuery();

    const { mutate: profileMutate } = useUpdateProfileMutation()

    const [isOpen, setIsOpen] = useState(false);


    // 폼 생성
    function onOpenForm() {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-start lg:col-span-1 relative">
            <MypageTitle text="프로필" />

            {/* 프로필 이미지 */}
            <MypageProfileImage profileImage={profileInfo.avatarUrl} />
            {isLoading ? <LoadingSpinner /> : null}
            {isError ? <p>프로필 정보 조회에 실패하였습니다.</p> : null}
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
                    <h3 className="text-2xl font-semibold text-gray-800 mb-1 mt-10">{profileInfo?.nickname || "닉네임 없음"}</h3>
                    <p className="text-gray-600 text-center mb-4">{profileInfo?.introduction || "설정된 프로필 소개가 없습니다."}</p>
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
