import { create } from "zustand";



interface PostPageState {
    page: number;
    setPage: (page: number) => void;
}
export const usePostPageStore = create<PostPageState>((set) => ({
    page: 0,
    setPage: (page: number) => set({ page })

}))