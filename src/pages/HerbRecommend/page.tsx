import { Link } from "react-router"

import { useState, useRef, useEffect } from "react"
import { useHerbRecommendGetQuery } from "../../hooks/queries/useQueryHerbs"

import SuggestionBox from "./components/SuggestionBox"
import SubmitForm from "./components/SubmitForm"
import HerbRecommendHeader from "./components/HerbRecommendHeader"
import ChatHeader from "./components/ChatHeader"
import ChatConnectStatus from "./components/ChatConnectStatus"
import InfoModal from "./components/InfoModal"

import { RecommendHerbResponse } from "../../types/herb.types"
import { GiHerbsBundle } from "react-icons/gi"
import ChatLayout from "./components/ChatLayout"
import ChatLoadingSpinner from "./components/ChatLoadingSpinner"


export default function HerbRecommendPage() {
  // 채팅창 표시 여부 상태
  const [showChat, setShowChat] = useState(false)
  // 정보 모달 표시 상태
  const [showInfoModal, setShowInfoModal] = useState(false)


  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }


  const [message, setMessage] = useState('');
  const { recommendList, isLoading, isSuccess } = useHerbRecommendGetQuery(message)
  const [messages, setMessages] = useState<RecommendHerbResponse[]>([
    {
      answer:
        "안녕하세요! 약초 추천 서비스를 담당하는 AI민초야 입니다. 어떤 증상이나 효능에 관심이 있으신가요? 적합한 약초와 활용법을 추천해 드릴게요.",
      sender: "bot",
      recommendHerbs: [],
      createdAt: formatTime(new Date()),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)



  // 메시지 응답 요청
  const handleSend = () => {
    if (!input.trim()) return

    setMessage(input)

    setMessages(prev => ([
      ...prev,
      {
        answer: input,
        sender: "user",
        recommendHerbs: [],
        createdAt: formatTime(new Date()),
      },
    ]))


  }

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMessage('')
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

      if (inputRef.current) {
        inputRef.current.value = '';
        setInput('')
      }
      setMessages(prev => ([
        ...prev,
        {
          sender: recommendList.sender,
          createdAt: recommendList.createdAt,
          recommendHerbs: recommendList.recommendHerbs
        },
      ]))
    }

  }, [isSuccess, isLoading]);


  useEffect(() => {
    if (showChat)
      window.scrollTo({
        top: 0, behavior: 'smooth'
      })
  }, [showChat])

  return (
    <section className="px-4 md:px-10 lg:px-12 pb-10 animate-fade-down">
      {/* 페이지 헤더 */}
      <HerbRecommendHeader
        onStartService={() => setShowChat(true)}
        showInfo={!showChat}
      />

      {showChat && (
        <div className="animate-fade-down">
          <ChatLayout className="max-w-[1200px] mx-auto shadow-xl">
            <ChatHeader onToggleInfoModal={() => setShowInfoModal(true)} />
            <ChatConnectStatus />

            {/* 메시지 내역 */}
            <div className="h-[600px] overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-5 max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} transition-all animate-fade-down`}
                    ref={index === messages.length - 1 ? messagesEndRef : undefined}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[90%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                      {
                        message.sender === "bot" ? <Bot /> : <Me />
                      }
                      <ChatResponseMessage message={message} />
                    </div>
                  </div>
                ))}

                {/* 로딩 중일 때 Spinner 표시 */}
                <ChatLoadingSpinner isLoading={isLoading} />
              </div>
            </div>

            {/* 추천 주제 선택 박스*/}
            <SuggestionBox setInput={setInput} />

            {/* 입력 폼 */}
            <SubmitForm input={input} inputRef={inputRef} onSend={handleSend} setInput={setInput} />
          </ChatLayout>
        </div>
      )}

      {/* 정보 모달 */}
      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </section>
  )
}


/** 봇 프로필 아이콘 */
function Bot() {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#05D182] to-[#03A77F] flex items-center justify-center text-white text-sm font-medium shrink-0 shadow-md shadow-[#05D182]/20">
      <GiHerbsBundle className="w-5 h-5" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
  );
}

/** 사용자 프로필 아이콘 */
function Me() {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 text-sm font-medium shrink-0 shadow-md border border-gray-100">
      <span className="font-medium">ME</span>
    </div>
  );
}


interface ResponseMessageProps {
  message: RecommendHerbResponse
}

/** 응답 */
function ChatResponseMessage({ message }: ResponseMessageProps) {

  return (
    <div className="flex flex-col">
      <div
        className={`rounded-2xl px-4 py-3 ${message.sender === "user"
          ? "bg-[#05D182]/10 text-gray-800 border border-[#05D182]/20"
          : "bg-white shadow-md border border-gray-100 text-gray-800"
          }`}
      >
        <p className="text-2xl leading-relaxed whitespace-pre-line">{message.answer}</p>
        {/* 추천 약초 응답 */}
        {message.recommendHerbs?.map((recommend, index) => {
          if (-999 === Number(recommend.id)) {
            return (
              <p className="italic text-gray-600 mt-2">{recommend.answer}</p>
            )
          }
          return (
            <div key={recommend.id} className="p-3 mb-3 mt-2 border-t border-gray-100 hover:bg-gray-50 transition-colors rounded-lg">
              <h3 className="font-semibold py-1.5 flex items-center">
                <span className="bg-gray-100 text-gray-700 h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  {index + 1}
                </span>
                {recommend.priority === '1' ?
                  <span className="bg-[#05D182]/10 text-primary-green px-2 py-0.5 rounded-md mr-2 text-2xl font-medium">추천</span>
                  : <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md mr-2 text-xl font-medium">연관</span>}
                <span className="text-gray-800">{recommend.herbName}</span>
              </h3>
              <div className="pl-8">
                <p className="text-gray-600">{recommend.answer}</p>
                <div className="w-full flex justify-end mt-2">
                  <Link
                    target="_blank"
                    className="text-right text-white hover:text-hover-primary-green border bg-[#05D182] hover:border-hover-primary-green px-3 py-1 rounded-full text-2xl transition-colors"
                    to={recommend.url}
                  >
                    상세보기
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <span className="text-xl p-1.5 pl-2 text-gray-500">{message.createdAt}</span>
    </div>

  )
}