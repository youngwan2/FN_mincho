


export const queryKeys = {
    herbs: {
        getAll: (page: number, size: number) => ["herbs", page, size],
        getDetail: (herbId: number) => ["herbs", herbId]
    }
}