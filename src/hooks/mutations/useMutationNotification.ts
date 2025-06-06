import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteNotification, updateMarkAsRead } from "../../service/notification.service";
import { showToast } from "../../components/toast/CustomToast";
import { queryKeys } from "../../config/keys";
import { handleError } from "../../config/error";


/** 알림 읽기 처리 */
export function useMarkAsReadMutation(): UseMutationResult<any, AxiosError, any> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => {
            return updateMarkAsRead(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notifications.update(), exact: false })
        },
        onError: (error) => {
            handleError(error)
        }
    })
}

/** 알림 삭제 처리 */
export function useDeleteMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => {
            return deleteNotification()
        },
        onSuccess: () => {
            showToast.success("알림을 삭제하였습니다.")
            queryClient.invalidateQueries({ queryKey: queryKeys.notifications.update(), exact: false })
        },
        onError: (error) => {
            handleError(error)
        }
    })
}
