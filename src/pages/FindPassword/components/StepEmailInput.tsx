import { IoAlertCircle, IoMail } from 'react-icons/io5';
import { Link } from 'react-router';

interface Props {
    email: string;
    isLoading: boolean;
    error: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
}

export default function StepEmailInput({ email, isLoading, error, onChange, onSubmit }: Props) {
    return (
        <>
            <h3 className="text-3xl font-medium text-gray-900 mb-3">이메일 입력</h3>
            <p className="text-2xl text-gray-600 mb-6">
                계정에 등록된 이메일 주소를 입력해주세요. 인증 코드를 보내드립니다.
            </p>
            <label htmlFor="email" className="block text-2xl font-medium text-gray-700">이메일</label>
            <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="your-email@example.com"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-2xl border-gray-300 rounded-md h-10 border p-2 py-7"
                />
            </div>
            {error && (
                <div className="mt-2 text-2xl text-red-600 flex items-center">
                    <IoAlertCircle className="h-4 w-4 mr-1" />
                    {error}
                </div>
            )}
            <div className="mt-10 flex items-center w-full gap-3 flex-col">
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={onSubmit}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  md:text-[16px] text-[15px]  font-medium text-white ${isLoading ? 'bg-blue-400' : 'bg-primary-green hover:bg-hover-primary-green'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center`}
                >
                    {isLoading ? '처리 중...' : '다음으로 가기'}
                </button>
                <Link
                    to={'/auth/login'}
                    className={`mt-2 w-full flex justify-center py-2 px-4 rounded-md md:text-[16px] text-[15px] font-medium text-gray-700  hover:bg-gray-100
                        items-center`}
                >
                    {'로그인 하러가기'}
                </Link>
            </div>
        </>
    );
}
