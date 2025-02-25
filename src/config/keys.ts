


export const queryKeys = {
    herbs: {
        getAll: (page: number, size: number) => ["herbs", page, size],
        getById: (herbId: number) => ["herbs", herbId],
        getRandom: (herbId: number) => ["herbs", "random", herbId],
        getMonth: (month: string) => ["herbs","blooming",month]
    }
}