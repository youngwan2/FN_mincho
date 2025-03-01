


export const queryKeys = {
    // 허브 
    herbs: {
        getAll: (page: number, size: number) => ["herbs", page, size],
        getById: (herbId: number) => ["herbs", herbId],
        getRandom: (herbId: number) => ["herbs", "random", herbId],
        getMonth: (month: string) => ["herbs", "blooming", month]
    },
    // 프로필
    profile: {
        getAll: () => ["profile"],
        get: () => ["profile"],
        update: () => ["profile"]
    },
    // 북마크
    herbBookmark: {
        getAll: (page: number, size: number) => ["herbBookmark", page, size],
        getByHerbId: (herbId: number) => ["herbBookmark", herbId],
        update: (herbId: number) => ["herbBookmark", herbId],
    },
}