

import { RefObject } from "react"
import { FiSend } from "react-icons/fi"
import { IoLeafOutline } from "react-icons/io5"

interface SubmitFormProps {
    onSend: () => void
    inputRef: RefObject<HTMLInputElement | null>
    input: string
    setInput: (input: string) => void
}
export default function SubmitForm({ onSend, inputRef, input, setInput }: SubmitFormProps) {
    return (
        <div className="border-t border-gray-200 p-4 py-6 bg-white">
            <form
                className="flex w-full items-center space-x-3 py-2 max-w-4xl mx-auto"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSend();
                }}
            >                <div className="relative flex-1">
                    <IoLeafOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        ref={inputRef}
                        autoFocus
                        type="search"
                        placeholder="증상이나 원하는 효능을 입력하세요(상단 주의사항 필독)..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-w-[180px] flex-1 pl-12 pr-4 py-4 border border-gray-200 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05D182] focus:border-transparent text-gray-700 text-2xl shadow-sm transition-all duration-300"
                    />
                </div>

                <button
                    type="submit"
                    className={`cursor-pointer bg-primary-green text-white px-5 py-4 rounded-xl transition-all duration-300 shadow-md ${input.trim()
                        ? 'hover:bg-hover-primary-green hover:shadow-lg transform hover:-translate-y-0.5'
                        : 'opacity-60 cursor-not-allowed'}`}
                    disabled={!input.trim()}
                >
                    <FiSend className="h-6 w-6" />
                    <span className="sr-only">전송</span>
                </button>
            </form>
        </div>
    )
}