
interface MoreButtonProps {
  onClick?: () => void

}

export default function MoreButton({ onClick }: MoreButtonProps) {
  return (
    <button onClick={onClick} className="md:text-[16px] md:py-2 md:px-4 md:w-[80px] md:mt-5 w-[125px]  py-0 text-[15px] font-black hover:cursor-pointer hover:bg-[#05D182] hover:text-[white] mt-5 border-[#05D182] text-[#05D182] border rounded-4xl ">
      + 더보기
    </button>
  )
}
