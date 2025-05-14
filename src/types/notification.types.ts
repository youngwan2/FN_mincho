

export interface Notification {
    createdAt: string
    id: number
    isRead: boolean
    message: string
    path: string
    type: string
}

export interface NotificationReadStatus {
    isAllRead: boolean
}