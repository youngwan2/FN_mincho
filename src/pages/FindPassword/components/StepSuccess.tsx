import { IoCheckbox, IoMail } from 'react-icons/io5';
import { Link } from 'react-router';

interface Props {
    email: string;
    onReset: () => void;
}

export default function StepSuccess({ email, onReset }: Props) {
    return (
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <IoCheckbox className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-medium text-gray-900 mb-2">인증이 완료되었습니다</h3>
            <p className="text-2xl text-gray-600 mb-6">
                <span className="font-medium">비밀번호가 임시번호로 재설정 되었습니다. {email} 을 확인해주세요.</span>
            </p>
            <div className="mt-6">
                <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <IoMail className="h-7 w-7 text-blue-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-2xl text-blue-700">이메일이 도착하지 않았나요? 스팸함을 확인해보세요.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex flex-col gap-3">
                <button className="md:text-[16px] text-[15px] hover:bg-hover-primary-green cursor-pointer border bg-primary-green text-white border-gray-300 p-2 rounded-sm" onClick={onReset}>
                    처음으로 돌아가기
                </button>
                <Link to={"/auth/login"} className="md:text-[16px] text-[15px] text-gray-600 hover:text-gray-700  cursor-pointer border border-gray-300 p-2 rounded-sm">
                    로그인하기
                </Link>
            </div>
        </div>
    );
}
