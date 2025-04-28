import { deleteNotificationFetch, getNotificationsFetch, updateMarkAsReadFetch } from "../apis/notificaiton";
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
export const deleteNotification = async (ids: number[]) => {
    const { data } = await deleteNotificationFetch(apiRoutes.notifications.delete(ids))
    return data;
}
