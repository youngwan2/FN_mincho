// interface MypagePostProps { }

import { Link } from "react-router";

export default function MypagePost() {
    return (
        <div className="bg-gray-50 rounded-lg">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-gray-800">라벤더 재배 팁</h3>
                    <p className="text-sm text-gray-500">2023-06-01</p>
                </div>
                <Link to="" className="text-gray-600 px-2">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        보기
                    </span>
                </Link>
            </div>

            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-gray-800">민트 활용법 공유</h3>
                    <p className="text-sm text-gray-500">2023-05-28</p>
                </div>
                <button className="text-gray-600 px-2">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        보기
                    </span>
                </button>
            </div>

            <div className="p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-gray-800">로즈마리 효능에 대해</h3>
                    <p className="text-sm text-gray-500">2023-05-20</p>
                </div>
                <button className="text-gray-600 px-2">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        보기
                    </span>
                </button>
            </div>
        </div>
    )
}