import instance from "../config/axios"



/** 알림 목록 조회 요청 */
export const getNotificationsFetch = (url: string) => {
    return instance.get(url)
}

/** 알림 읽음 처리 */
export const updateMarkAsReadFetch = (url: string) => {
    return instance.patch(url)
}

/** 알림 삭제 처리 */
export const deleteNotificationFetch = (url: string) => {
    return instance.delete(url)
}
