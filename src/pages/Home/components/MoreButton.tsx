
interface MoreButtonProps {
  onClick?: () => void

}

export default function MoreButton({ onClick }: MoreButtonProps) {
  return (
    <button onClick={onClick} className="text-[14px] font-black hover:cursor-pointer hover:bg-[#05D182] hover:text-[white] mt-5 border-[#05D182] text-[#05D182] border rounded-4xl py-1 px-4 ">
      + More
    </button>
  )
}
