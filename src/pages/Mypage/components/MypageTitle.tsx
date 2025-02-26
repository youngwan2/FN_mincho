

interface MyPageTitleProps {
    text:string
 }

export default function MypageTitle({text}:MyPageTitleProps) {
    return (
        <h2 className="text-[17px] font-semibold text-gray-700 mb-4">
            {text}
        </h2>
    )
}