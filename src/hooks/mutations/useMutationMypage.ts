import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../service/user";
import { Profile } from "../../types/user.types";
import { queryKeys } from "../../config/keys";


export function useUpdateProfileMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newProfile: Profile) => {
            return updateProfile(newProfile)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.profile.update() })
        },
        onError: (error) => {
            // 에러가 발생했을 때 처리 (예: 에러 메시지 표시 등)
            console.error('Error adding todo:', error)
        }

    })
}