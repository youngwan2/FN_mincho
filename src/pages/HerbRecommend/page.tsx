import { useState, useRef, useEffect } from "react"
import { FiSend } from "react-icons/fi"
import { GiHerbsBundle } from "react-icons/gi"
import { BsEmojiSmile } from "react-icons/bs"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { useHerbRecommendGetQuery } from "../../hooks/queries/useQueryHerbs"
import { RecommendHerbResponse } from "../../types/herb.types"
import SuggestionBox from "./components/SuggestionBox"
import { Link } from "react-router"
import PulseSpinner from "../../components/spinner/PulseSpinner"
import { IoWarning } from "react-icons/io5"


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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


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

  return (
    <>
      {/* 페이지 헤더 */}
      <div className="py-10">
        <h1 className="text-5xl font-bold py-2">약초 추천 서비스</h1>
        <p> 증상이나 원하는 효능을 알려주시면, 적합한 약초와 활용법을 민초에서 보유하고 있는 약초정보를 기반으로 추천해드립니다.</p>
        <ul className="border border-gray-300 rounded-sm p-5 mt-5">
          <li className="font-bold text-2xl mb-3 text-red-500">주의사항 안내(필독)</li>
          <li>① 추천된 약초 정보는 <a className="border-b border-green-400 hover:text-gray-700" href="https://www.nongsaro.go.kr/portal/ps/psz/psza/contentMain.ps?menuId=PS04103&pageUnit=8" target="_blank">농사로(https://www.nongsaro.go.kr/)</a> 민간약초 컨텐츠에 근거합니다.</li>
          <li>② 사이트 운영자가 별도로 조사한 데이터 또한 DB에 관리되어 추천 서비스에 활용될 수 있습니다.</li>
          <li>③ 앞서 ①, ②항을 고려하여 추천된 약초를 참고하시되, 정확한 복용 방법은 <mark className="bg-amber-100 px-2 rounded-md">전문가 상담</mark>이 필수입니다.</li>
        </ul>
      </div>

      <div className="flex flex-col w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">

        {/* 채팅창 헤더 */}
        <div className="bg-hover-primary-green text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <GiHerbsBundle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-2xl">약초 추천 서비스</h2>
              <p className="text-xl text-white/80">자연의 치유력을 경험하세요</p>

            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full cursor-pointer hover:bg-white/30 transition-colors">
              <IoMdInformationCircleOutline className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-gray-50 px-4 py-2 flex items-center justify-end text-xs text-gray-500 border-b border-gray-200">
          <div className="text-hover-primary-green text-xl font-medium animate-pulse">상태: ● (이용가능) </div>
        </div>

        {/* 메시지 내역 */}
        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} transition-all animate-fade-down`} ref={messagesEndRef}>
                <div
                  className={`flex items-start gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.sender === "bot" ? (
                    <div className="w-8 h-8 rounded-full bg-hover-primary-green flex items-center justify-center text-white text-sm font-medium shrink-0">
                      <GiHerbsBundle className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium shrink-0">
                      ME
                    </div>
                  )}
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
                                <Link className="text-right text-hover-primary-green border-b border-primary-green hover:border-hover-primary-green max-w-[60px]" to={recommend.url}>상세보기</Link>
                              </div>
                            </div>
                          </div>
                        )
                      })}

                    </div>

                    <span className="text-xl p-1.5 pl-2 text-gray-500">{message.createdAt}</span>
                  </div>
                </div>

              </div>
            ))}

            {/* 로딩 중일 때 Spinner 표시 */}
            {isLoading && (
              <div className="flex justify-center">
                <div className="">
                  <PulseSpinner />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 추천 주제*/}
        <div className="px-4 py-7 w-full border-t border-gray-200 flex gap-2 overflow-x-auto scrollbar-hide mx-auto">
          <SuggestionBox setInput={setInput} />
        </div>

        {/* 입력 폼 */}
        <div className="border-t border-gray-300 p-3 py-6 bg-white">
          <form
            className="flex w-full items-center space-x-2 py-5"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <button type="button" className="cursor-pointer text-gray-400 hover:text-gray-600 p-1.5">
              <BsEmojiSmile className="h-8 w-8" />
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="증상이나 원하는 효능을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-7 bg-gray-700 border-0 max-w-[90%] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-white text-2xl"
            />

            <button
              type="submit"
              className="cursor-pointer hover:bg-gray-700 bg-gray-800 text-white px-3 py-6 rounded-lg transition-colors"
              disabled={!input.trim()}
            >
              <FiSend className="h-10 w-18" />
              <span className="sr-only">전송</span>
            </button>
          </form>
        </div>
      </div >
    </>
  )
}



/**
 *            {message.sender === "bot" && (
                        <div className="flex items-center ml-2 gap-3">
                          <button
                            onClick={() => toggleLike(message.id)}
                            className="flex items-center gap-1 hover:text-[#05D182] transition-colors"
                          >
                            <FiThumbsUp className="w-3 h-3" />
                            <span>{message.likes || 0}</span>
                          </button>

                          <button
                            onClick={() => toggleSave(message.id)}
                            className={`hover:text-[#05D182] transition-colors ${message.saved ? "text-[#05D182]" : ""}`}
                          >
                            <FiBookmark className="w-3 h-3" />
                          </button>
                        </div>
                      )}
 * 
 */