import { deleteNotificationFetch, getNotificationsFetch, getUnreadNotificationFetch, updateMarkAsReadFetch } from "../apis/notificaiton.api";
import { apiRoutes } from "../config/api";



/** 알림 목록 조회 */
export const getNotifications = async (page: number, size: number) => {
    const { data } = await getNotificationsFetch(apiRoutes.notifications.getAll(page, size))
    return data;
}


/** 알림 읽음 처리 */
export const updateMarkAsRead = async (id: number) => {
    const { data } = await updateMarkAsReadFetch(apiRoutes.notifications.markAsRead(id))
    return data;
}

/** 알림 삭제 처리 */
export const deleteNotification = async () => {
    const { data } = await deleteNotificationFetch(apiRoutes.notifications.deleteAllByIsRead())
    return data;
}

/** 읽지 않은 알림이 하나라도 존재하는가? */
export const getUnreadNotification = async () => {
    const { data } = await getUnreadNotificationFetch(apiRoutes.notifications.getUnreadStatus())
    return data
}