import { EventSourcePolyfill } from 'event-source-polyfill'
import { useEffect } from 'react'
import { apiRoutes } from '../config/api'
import { getToken } from '../utils/storage'
import { receivedMessage } from '../components/toast/CustomToast'

export default function useSSE() {

    useEffect(() => {
        const token = getToken();

        if (!token) return

        const eventSource = new EventSourcePolyfill(apiRoutes.sse.connect(), {
            headers: {
                Authorization: token
            },
            heartbeatTimeout: Number.MAX_SAFE_INTEGER,
            withCredentials: true
        })

        // SSE 오픈
        eventSource.addEventListener("open", () => {
            console.log("SSE 연결 완료")

        })

        // 최초 연결 수신 테스트
        eventSource.addEventListener("connect", () => {
            console.log("최수 연결 수신 테스트")
        })


        // 메시지 수신
        eventSource.addEventListener("message", (e) => {
            const data = JSON.parse(e.data)
            console.log("새 알림:", data)

            receivedMessage(data.path, "메시지 알림", data.message)
        })

        // 에러 발생시 SSE 종료
        eventSource.addEventListener("error", (error) => {
            console.error("SSE 연결 오류:", error)
            eventSource.close();

        })

        // 디마운트 시 SSE 종료
        return () => {
            eventSource.close();
        }
    })

}