import { FormEventHandler } from 'react'
import plant from '../../../assets/plant.png'

interface CommunityHeaderProps {
    onSearch: FormEventHandler<HTMLFormElement>
}
export default function CommunityHeader({ onSearch }: CommunityHeaderProps) {
    return (
        <div className="flex justify-center items-center mb-8 bg-primary-green h-[300px] rounded-xl flex-col relative">
            <div>
                <h2 className="text-white text-3xl z-10 relative">자연과 함께 성장하는 커뮤니티, 민초</h2>

            </div>
            <img src={plant} alt="plant 이미지" className="w-sm h-[250px] absolute top-[50%] translate-y-[-50%] right-50 z-0" width={300} height={300} />
            <div className="mt-6 relative">
                <form onSubmit={onSearch}>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#05D182] placeholder:text-gray-500 bg-white"
                    />
                    <button type='submit' className="bg-[#05D182] text-white px-4 py-2 rounded-r-md hover:cursor-pointer hover:bg-hover-primary-green">
                        검색
                    </button>
                </form>
            </div>
        </div>
    )
}