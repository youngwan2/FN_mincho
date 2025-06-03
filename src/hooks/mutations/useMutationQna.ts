import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createQna, updateQna, deleteQna } from "../../service/qna.service";
import { handleError } from "../../config/error";

/** QnA 생성 */
export function useCreateQnaMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (qnaData: any) => createQna(qnaData),
        onSuccess: () => {
            toast.success("QnA가 등록되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["qna"] });
        },
        onError: handleError,
    });
}

/** QnA 수정 */
export function useUpdateQnaMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ qnaId, qnaData }: { qnaId: number; qnaData: any }) => updateQna(qnaId, qnaData),
        onSuccess: () => {
            toast.success("QnA가 수정되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["qna"] });
        },
        onError: handleError,
    });
}

/** QnA 삭제 */
export function useDeleteQnaMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (qnaId: number) => deleteQna(qnaId),
        onSuccess: () => {
            toast.success("QnA가 삭제되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["qna"] });
        },
        onError: handleError,
    });
}
