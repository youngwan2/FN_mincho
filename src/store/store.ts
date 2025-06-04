import { create } from "zustand";
import { QnaSearchCondition } from "../types/qna.types";


interface PageState {
    page: number;
    setPage: (page: number) => void;
}
export const usePostPageStore = create<PageState>((set) => ({
    page: 0,
    setPage: (page: number) => set({ page })

}))

interface QnaPageState extends PageState {
    searchCondition: QnaSearchCondition;
    setSearchCondition: (condition: QnaSearchCondition) => void;
}

export const useQnaPageStore = create<QnaPageState>((set) => ({
    page: 0,
    setPage: (page: number) => set({ page }),
    searchCondition: {},
    setSearchCondition: (searchCondition: QnaSearchCondition) => set({ searchCondition })
}))