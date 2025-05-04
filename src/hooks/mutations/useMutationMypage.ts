import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword, updateProfile } from "../../service/user";
import { Profile } from "../../types/user.types";
import { queryKeys } from "../../config/keys";
import { AxiosError } from "axios";
import { handleError } from "../../config/error";
import { useNavigate } from "react-router";
import { deleteUser, logout } from "../../service/auth";
import { showToast } from "../../components/toast/CustomToast";
import { UpdatePasswordRequest } from "../../types/auth.types";


// 프로필 수정
export function useUpdateProfileMutation(): UseMutationResult<Profile, AxiosError, Profile> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newProfile: Profile) => {
            return updateProfile(newProfile)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.profile.update() })
        },
        onError: (error) => {
            handleError(error)
        }

    })
}

// 회원탈퇴
export function useDeleteUserMutation() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            showToast.success("회원 탈퇴가 완료되었습니다.");
            logout()
            navigate("/"); // 홈으로 이동
        },
        onError: (error) => {
            handleError(error)
        }
    });
}

// 비밀번호 재설정 훅 추가
export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: (passwordData: UpdatePasswordRequest) => updatePassword(passwordData),
        onError: (error) => {
            if (error instanceof AxiosError) {
                const message = error.message
                if (message) {
                    showToast.error(message)

                } else {
                    handleError(error)
                }
            }
        },
    }
    );
};