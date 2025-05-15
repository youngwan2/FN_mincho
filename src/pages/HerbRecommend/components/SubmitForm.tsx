

import { RefObject } from "react"
import { FiSend } from "react-icons/fi"


interface SubmitFormProps {
    onSend: () => void
    inputRef: RefObject<HTMLInputElement | null>
    input: string
    setInput: (input: string) => void
}
export default function SubmitForm({ onSend, inputRef, input, setInput }: SubmitFormProps) {
    return (
        <div className="border-t border-gray-300 p-3 py-6 bg-white">
            <form
                className="flex w-full items-center space-x-2 py-5"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSend();
                }}
            >

                <input
                    ref={inputRef}
                    autoFocus
                    type="search"
                    placeholder="증상이나 원하는 효능을 입력하세요(상단 주의사항 필독)..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-w-[180px] flex-1 px-3 py-3.5 border border-gray-300 0 w-auto rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-0 text-gray-700 text-2xl"
                />

                <button
                    type="submit"
                    className="cursor-pointer  hover:bg-hover-primary-green bg-primary-green text-white px-3 py-3 rounded-lg transition-colors"
                    disabled={!input.trim()}
                >
                    <FiSend className="h-9 w-9" />
                    <span className="sr-only">전송</span>
                </button>
            </form>
        </div>
    )
}