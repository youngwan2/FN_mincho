import { FaLeaf } from 'react-icons/fa';
import { MdOutlineNaturePeople } from 'react-icons/md';

interface HerbHeaderProps {
    sort?: React.ReactNode;
    title?: React.ReactNode;
    totalCount?: number;
}

export default function HerbHeader({ sort, title, totalCount }: HerbHeaderProps) {
    return (
        <div className='flex flex-col md:flex-row justify-between items-center mb-1 gap-6'>
            <div className="text-center md:text-left">
                {title ? (
                    title
                ) : (
                    <>
                        <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)] animate-fade-right">
                            <FaLeaf className="text-white mr-2" />
                            <span className="bg-[#0ac17b] text-white font-medium">약초 도감</span>
                        </div>
                        <h1 className="flex items-center text-5xl md:text-6xl md:justify-start justify-center gap-3 font-bold text-gray-800 mb-5 md:mb-6 animate-fade-left">
                            <MdOutlineNaturePeople className="text-primary-green hidden md:block" size={48} />
                            <span>약초 사전</span>
                        </h1>
                        <div className='animate-fade-down'>
                            <strong className="text-[#05D182] text-3xl block mb-2">자연의 지혜를 나누는 약초 도감</strong>
                            <p className="text-gray-600 text-2xl md:max-w-xl">다양한 약초의 정보와 효능을 확인하세요</p>
                        </div>
                    </>
                )}
            </div>
            <div className="flex items-center gap-4">
                {totalCount !== undefined && (
                    <div className="bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-5 py-2 rounded-xl shadow-md flex items-center gap-2 cursor-default font-medium animate-fade-up">
                        <span>총 {totalCount}종</span>
                    </div>
                )}
                {sort && <div className="animate-fade-up">{sort}</div>}
            </div>
        </div>
    )
}