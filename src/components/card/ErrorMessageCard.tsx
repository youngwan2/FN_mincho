
import { IoCloseCircle } from "react-icons/io5";
interface ErrorMessageCardProps {
  text?: string
}

export default function ErrorMessageCard({ text="데이터 조회에 실패하였습니다." }: ErrorMessageCardProps) {
  return (
    <div className="mt-10 md:max-w-[768px] py-10 w-full flex justify-center flex-col items-center mx-auto rounded-2xl bg-white shadow-xl">
      <IoCloseCircle className="text-red-600 text-[10rem]"/>
      <h2 className="text-red-600 text-3xl font-bold">Error</h2>
      <p className="mt-3"> {text}</p>
      
    </div>
  )
}