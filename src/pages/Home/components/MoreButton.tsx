
interface MoreButtonProps {
  onClick?: () => void

}

export default function MoreButton({ onClick }: MoreButtonProps) {
  return (
    <button onClick={onClick} className="md:text-[14px] md:py-1 md:px-4 md:w-[70px] md:mt-5 mt-0 w-[115px]  py-0 text-[12px] font-black hover:cursor-pointer hover:bg-[#05D182] hover:text-[white] mt-5 border-[#05D182] text-[#05D182] border rounded-4xl ">
      + More
    </button>
  )
}
