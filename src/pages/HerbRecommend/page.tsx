import { Link } from "react-router"

import { useState, useRef, useEffect } from "react"
import { useHerbRecommendGetQuery } from "../../hooks/queries/useQueryHerbs"

import SuggestionBox from "./components/SuggestionBox"
import SubmitForm from "./components/SubmitForm"
import HerbRecommendHeader from "./components/HerbRecommendHeader"
import ChatHeader from "./components/ChatHeader"
import ChatConnectStatus from "./components/ChatConnectStatus"

import { RecommendHerbResponse } from "../../types/herb.types"
import { GiHerbsBundle } from "react-icons/gi"
import ChatLayout from "./components/ChatLayout"
import ChatLoadingSpinner from "./components/ChatLoadingSpinner"


export default function HerbRecommendPage() {


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

  }, [isSuccess, isLoading])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  return (
    <>
      {/* 페이지 헤더 */}
      <HerbRecommendHeader />

      <ChatLayout>
        <ChatHeader />
        <ChatConnectStatus />

        {/* 메시지 내역 */}
        <div className="h-[560px] overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} transition-all animate-fade-down`} ref={messagesEndRef}>
                <div
                  className={`flex items-start gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
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
    </>
  )
}


/** 봇 프로필 아이콘 */
function Bot() {

  return <div className="w-8 h-8 rounded-full bg-hover-primary-green flex items-center justify-center text-white text-sm font-medium shrink-0">
    <GiHerbsBundle className="w-4 h-4" />
  </div>
}

/** 사용자 프로필 아이콘 */
function Me() {
  return <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium shrink-0">
    ME
  </div>
}


interface ResponseMessageProps {
  message: RecommendHerbResponse
}

/** 응답 */
function ChatResponseMessage({ message }: ResponseMessageProps) {

  return (
    <div className="flex flex-col">
      <div
        className={`rounded-2xl px-4 py-2 ${message.sender === "user"
          ? "bg-[#05D182]/10 text-gray-800 border border-[#05D182]/20"
          : "bg-white shadow-sm border border-gray-100 text-gray-800"
          }`}
      >
        <p className="text-2xl leading-relaxed whitespace-pre-line">{message.answer}</p>
        {/* 추천 약초 응답 */}
        {message.recommendHerbs?.map((recommend, index) => {
          if (-999 === Number(recommend.id)) {
            return (
              <p>{recommend.answer}</p>
            )
          }
          return (
            <div key={recommend.id} className="p-2 mb-3">
              <h3 className="font-semibold py-1.5">

                {index + 1}. {recommend.priority === '1' ? <span className="text-primary-green">(추천) </span> : null}{recommend.herbName}</h3>
              <div className="">
                <p>{recommend.answer}</p>
                <div className="w-full flex justify-end">
                  <Link target="_blank" className="text-right text-hover-primary-green border-b border-primary-green hover:border-hover-primary-green max-w-[60px]" to={recommend.url}>상세보기</Link>
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