import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadQnaImages, uploadAnswerImages, deleteQnaImage, deleteAnswerImage } from "../../service/qna-image.service";
import { handleError } from "../../config/error";
import { queryKeys } from "../../config/keys";

/** QnA 이미지 업로드 Mutation */
export function useUploadQnaImagesMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation<any, any, FormData>({
        mutationFn: (formData: FormData) => uploadQnaImages(qnaId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.qna.getById(qnaId) });
        },
        onError: handleError,
    });
}

/** 답변 이미지 업로드 Mutation */
export function useUploadAnswerImagesMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation<any, any, { answerId: number; formData: FormData }>({
        mutationFn: ({ answerId, formData }: { answerId: number; formData: FormData }) =>
            uploadAnswerImages(qnaId, answerId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.qna.getById(qnaId) });
        },
        onError: handleError,
    });
}

/** QnA 이미지 삭제 Mutation */
export function useDeleteQnaImageMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (imageId: number) => deleteQnaImage(qnaId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.qna.getById(qnaId) });
        },
        onError: handleError,
    });
}

/** 답변 이미지 삭제 Mutation */
export function useDeleteAnswerImageMutation(qnaId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ answerId, imageId }: { answerId: number; imageId: number }) =>
            deleteAnswerImage(answerId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.qna.getById(qnaId) });
        },
        onError: handleError,
    });
}
