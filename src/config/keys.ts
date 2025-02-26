


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

    }
}