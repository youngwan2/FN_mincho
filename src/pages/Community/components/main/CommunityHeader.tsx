import { MdQuestionAnswer } from 'react-icons/md'
import useAuth from '@/hooks/useAuth'
import { Link } from 'react-router'
import { FaUserGroup } from 'react-icons/fa6'


export default function CommunityHeader() {

    const isAuth = useAuth()
    return (
        <div className='flex justify-between items-center md:flex-row flex-col'>
            <div className="text-center md:text-left">
                <div className="inline-flex items-center bg-[#0ac17b] px-4 py-1.5 rounded-full mb-4 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.05)]  animate-fade-right">
                    <MdQuestionAnswer className="text-white mr-2" />
                    <span className="bg-[#0ac17b] text-white font-medium">커뮤니티 서비스</span>
                </div>
                <h1 className="flex items-center text-5xl md:text-6xl md:justify-start justify-center gap-3 font-bold text-gray-800 mb-5 md:mb-6  animate-fade-left">
                    <FaUserGroup className="text-primary-green hidden md:block" size={48} />
                    <span>만남의 장</span>
                </h1>
                <div className='animate-fade-down'>
                    <strong className="text-[#05D182] text-3xl block mb-2">자연의 지혜를 나누는 약초 커뮤니티</strong>
                    <p className="text-gray-600 text-2xl md:max-w-xl">다양한 관심사를 공유해보세요!</p>
                </div>
            </div>
            {isAuth &&
                <Link to={"/community/post/write"} className="md:mt-0 mt-6 bg-gradient-to-r from-[#05D182] to-[#03A77F] text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 cursor-pointer font-medium ">
                    글쓰기
                </Link>}

        </div>
    )
}
