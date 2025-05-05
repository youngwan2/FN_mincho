"use client"
import { Link } from "react-router"

import { useEffect, useState } from "react"
import { useNotificationGetQuery } from "../hooks/queries/useQueryNotifications"
import { useInView } from "react-intersection-observer"
import { useMarkAsReadMutation } from "../hooks/mutations/useMutationNotification"

import StaticLoadingSpinner from "./spinner/StaticLoadingSpinner"
import CustomTimeAgo from "./vender/timeago/CustomTimeAgo"

import { IoClose, IoLeafOutline } from "react-icons/io5"
import { FaRegComment, FaRegBell } from "react-icons/fa"
import { MdOutlineArticle, MdOutlineNotificationsActive } from "react-icons/md"
import { FiBell } from "react-icons/fi"






const SIZE = 10
export default function Notification() {
  const { ref, inView } = useInView()

  const [page, _] = useState(0)
  const [isToggle, setIsToggleNotification] = useState(false)

  function handleToggle() {
    setIsToggleNotification(prev => !prev)
  }


  const { fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, totalCount, notifications, isError } = useNotificationGetQuery(page, SIZE);

  const { mutate: markAsReadMutate } = useMarkAsReadMutation();


  // 알림 읽음 처리
  function handleMarkAsRead(notificationId: number) {
    markAsReadMutate(notificationId)
  }

  useEffect(() => {
    if (notifications.length <= 9 && totalCount <= notifications.length) {
      return
    } // 9 개 미만, 전체 약초 개수 이상 조회이면 더 이상 없다는 의미이므로 추가 페치 x
    if (hasNextPage && !isError) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <>
      <button onClick={handleToggle} className="mx-2 hover:text-primary-green text-gray-500 relative">
        <FiBell size={22} />
        <span className="absolute left-1/2 -bottom-2.5 -translate-1/2  w-4 h-4 bg-green-500 rounded-full inline-block animate-fade animate-alternate animate-infinite"></span>
      </button>

      {/* 알림 모달 */}
      <div
        aria-label="알림 목록 모달"
        aria-hidden={isToggle ? 'false' : 'true'}
        className={`${isToggle ? "visible opacity-100" : "invisible opacity-0"
          } transition-all duration-200 top-[8rem] absolute border border-gray-200 shadow-[0_5px_20px_rgba(0,0,0,0.15)] max-w-[380px] max-h-[500px] w-full rounded-xl bg-white z-[1000000] overflow-hidden`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2">
            민초 알리미
          </h2>
          <button
            className="hover:bg-gray-100 hover:text-gray-700 text-gray-500 p-1.5 rounded-full transition-colors"
            title="닫기"
            onClick={handleToggle}
          >
            <IoClose className="text-[16px]" />
          </button>
        </div>

        {/* 알림 목록 컨테이너 */}
        <div className="overflow-y-auto max-h-[calc(500px-64px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {notifications.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-gray-500">
              <FaRegBell className="text-4xl mb-3 text-gray-400" />
              <p>새로운 알림이 없습니다</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                return (
                  <li
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={`p-4 hover:bg-gray-100 transition-colors ${!notification?.isRead ? "bg-gray-50" : "bg-gray-50 opacity-40"}`}
                  >
                    <Link to={notification.path}>
                      <div className="flex items-start gap-3">
                        {/* 아이콘 */}
                        <div className="mt-1 p-2 rounded-full border border-gray-300 text-xl">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* 내용 */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-2xl font-medium text-gray-900 flex items-center gap-2">
                              {typeMapping(notification.type)}
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                              )}
                            </h3>
                            <span className="text-[14px] text-gray-500">{<CustomTimeAgo date={notification.createdAt} />}</span>
                          </div>
                          <p className="text-[14px] text-gray-700 break-words">{notification.message}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}

          {/* 로딩 인디케이터 */}
          <div ref={ref} className="h-10 flex justify-center items-center">
            {isFetchingNextPage && <StaticLoadingSpinner fixed={false} />}
          </div>

          {/* 더 이상 알림이 없을 때 */}
          {notifications.length > 0 && !hasNextPage && !isFetchingNextPage && (
            <div className="text-center py-3 text-sm text-gray-500 border-t border-gray-100">
              모든 알림을 확인했습니다
            </div>
          )}
        </div>
      </div>
    </>

  )
}

function typeMapping(type: string) {
  let title = "메시지 알림"
  if (type === "post") {
    title = "게시글 알림"
  } else if (type === "comment") {
    title = "댓글 알림"
  } else if (type === "notice") {
    title = "공지사항"
  } else if (type === "herb") {
    title = "새 약초 정보"
  } else {
    title = "기타 알림"
  }

  return title
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "post":
      return <MdOutlineArticle className="text-green-600" />
    case "comment":
      return <FaRegComment className="text-blue-500" />
    case "notice":
      return <MdOutlineNotificationsActive className="text-amber-500" />
    case "herb":
      return <IoLeafOutline className="text-green-700" />
    default:
      return <FaRegBell className="text-gray-500" />
  }
}

