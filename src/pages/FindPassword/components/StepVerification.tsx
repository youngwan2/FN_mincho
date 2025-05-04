import { IoAlertCircle, IoArrowForwardCircle, IoHandRight, IoKey } from 'react-icons/io5';

interface Props {
    email: string;
    code: string;
    error: string;
    isLoading: boolean;
    onChange: (val: string) => void;
    onSubmit: () => void;
    onBack: () => void;
}

export default function StepVerification({ email, code, error, isLoading, onChange, onSubmit, onBack }: Props) {
    return (
        <>
            <h3 className="text-3xl font-medium text-gray-900 mb-4">이메일 인증</h3>
            <p className="text-2xl text-gray-600 mb-6">
                <span className="font-medium">{email}</span>로 전송된 5자리 인증 코드를 입력해주세요.
            </p>
            <label htmlFor="code" className="block text-2xl font-medium text-gray-700">인증 코드</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoKey className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="5자리 코드 입력"
                    maxLength={5}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-8 sm:text-2xl border-gray-300 rounded-md h-10 border p-2"
                />
            </div>
            {error && (
                <div className="mt-2 text-2xl text-red-600 flex items-center">
                    <IoAlertCircle className="h-4 w-4 mr-1" />
                    {error}
                </div>
            )}
            <div className="mt-10">
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={onSubmit}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  md:text-[16px] text-[15px] font-medium text-white ${isLoading ? 'bg-blue-400' : 'bg-primary-green hover:bg-hover-primary-green'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center`}
                >
                    {isLoading ? '처리 중...' : '다음으로 가기'}
                </button>
            </div>
            <div className="mt-4 text-center">
                <button
                    type="button"
                    className=" md:text-[16px] text-[15px] pt-3 text-gray-600  hover:text-gray-800 cursor-pointer"
                    onClick={onBack}
                >
                    다른 이메일 사용하기
                </button>
            </div>
        </>
    );
}
